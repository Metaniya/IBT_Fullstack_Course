import { loadOrderFor, trackingOf, isFinished } from "@/lib/tracking";

export const dynamic = "force-dynamic"; // never prerender a stream

const open = (globalThis.__openStreams ??= { n: 0 });

export async function GET(request, { params }) {
  const { id } = await params;
  const { order, fail } = await loadOrderFor(id);
  if (fail) return fail;

  const encoder = new TextEncoder();
  let timer;

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      open.n++;
      console.log("[sse] opened", id, "open now:", open.n);

      const stop = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        open.n--;
        console.log("[sse] closed", id, "open now:", open.n);
        try {
          controller.close();
        } catch {}
      };

      const send = () => {
        if (closed) return;
        const data = trackingOf(order);
        try {
          // "data: " + payload + TWO newlines. One newline and the browser waits forever.
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          stop();
          return;
        }
        if (isFinished(data.status)) stop(); // close deliberately on delivery
      };

      request.signal.addEventListener("abort", stop); // the person navigated away
      send(); // the current state goes out immediately
      if (!closed) timer = setInterval(send, 2000);
    },
    cancel() {
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}