import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  // cookies() reads the request, so this line forces the route to be dynamic.
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-2">
        {session
          ? `Signed in as ${session.value}.`
          : "You are checking out as a guest."}
      </p>
      <CheckoutForm />
    </main>
  );
}