import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href="/" className="text-xl font-bold">Addis Eats</Link>
      <nav className="flex gap-4">
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}