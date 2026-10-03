import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { signOut } from "../auth-actions";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  // getSession() reads cookies, so this route is dynamic. That is correct.
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-2">
        Signed in as {user.name}.{" "}
        <form action={signOut} className="inline">
          <button className="underline">Sign out</button>
        </form>
      </p>
      <CheckoutForm />
    </main>
  );
}