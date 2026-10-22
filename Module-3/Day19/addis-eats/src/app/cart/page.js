import CartView from "./CartView";

export const metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Cart</h1>
      <CartView />
    </main>
  );
}