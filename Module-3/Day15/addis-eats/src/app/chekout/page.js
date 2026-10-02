import Link from "next/link";
import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  // cookies() reads the request, so this line forces the route to be dynamic.
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {session ? (
        <>
          <p className="mt-2">Signed in as {session.value}.</p>
          <CheckoutForm />
        </>
      ) : (
        <p className="mt-2">
          Please sign in first. For this demo, visit{" "}
          <Link href="/api/dev-login/abel" className="underline">
            /api/dev-login/abel
          </Link>
          , then come back.
        </p>
      )}
    </main>
  );
}