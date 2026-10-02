import CheckoutButton from "./CheckoutButton";

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Cart</h1>
      <p className="mt-2">Your cart is empty for now.</p>
      <CheckoutButton />
    </main>
  );
}