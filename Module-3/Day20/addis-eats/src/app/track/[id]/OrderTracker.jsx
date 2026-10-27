"use client";

import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { etb, when, clock } from "@/lib/format";

const FINISHED = ["delivered", "cancelled"];

const INDICATOR = {
  connecting: "Connecting…",
  live: "● Live",
  reconnecting: "Reconnecting…",
  polling: "Live updates unavailable. Checking every 5 seconds.",
  finished: "Finished. Updates stopped.",
};

export default function OrderTracker({ id, initial }) {
  const [data, setData] = useState(initial); // seeded from the server render
  const [conn, setConn] = useState(FINISHED.includes(initial.status) ? "finished" : "connecting");

  useEffect(() => {
    if (FINISHED.includes(initial.status)) return; // nothing left to stream

    let es;
    let poll;
    let failures = 0;

    const apply = (next) => {
      setData(next);
      if (FINISHED.includes(next.status)) {
        setConn("finished");
        es?.close(); // close deliberately on delivery
        clearInterval(poll);
      }
    };

    const startPolling = () => {
      setConn("polling");
      const tick = async () => {
        try {
          const res = await fetch(`/api/orders/${id}/track`);
          if (res.ok) apply(await res.json());
        } catch {}
      };
      tick();
      poll = setInterval(tick, 5000);
    };

    es = new EventSource(`/api/orders/${id}/stream`);
    es.onopen = () => {
      failures = 0;
      setConn("live");
    };
    es.onmessage = (e) => apply(JSON.parse(e.data));
    es.onerror = () => {
      failures += 1;
      if (failures >= 3 || es.readyState === EventSource.CLOSED) {
        es.close();
        startPolling(); // fall back to polling
      } else {
        setConn("reconnecting"); // the browser retries by itself
      }
    };

    return () => {
      es.close(); // without this, every visit leaves a connection open
      clearInterval(poll);
    };
  }, [id, initial.status]);

  const percent = Math.round(data.progress * 100);

  return (
    <div className="mt-6">
      <p role="status" className="mb-3 text-sm font-medium">
        {INDICATOR[conn]}
      </p>

      <MapPanel
        origin={data.origin}
        destination={data.destination}
        courier={data.courier}
        area={data.area}
        status={data.status}
      />

      {/* The same information in words, for anyone who cannot use the map. */}
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="font-semibold">Status</dt>
        <dd>{data.status}</dd>
        <dt className="font-semibold">Delivering to</dt>
        <dd>{data.area}</dd>
        <dt className="font-semibold">Courier</dt>
        <dd>
          {data.status === "delivered"
            ? "Arrived"
            : data.status === "cancelled"
              ? "Order cancelled"
              : `${percent}% of the way from the kitchen to ${data.area}`}
        </dd>
        <dt className="font-semibold">Placed</dt>
        <dd>{when(data.placedAt)}</dd>
        <dt className="font-semibold">Estimated arrival</dt>
        <dd>{clock(data.etaAt)} (Addis Ababa time)</dd>
        <dt className="font-semibold">Total</dt>
        <dd>{etb(data.total)}</dd>
        <dt className="font-semibold">Last update</dt>
        <dd>{clock(data.updatedAt)}</dd>
      </dl>
    </div>
  );
}