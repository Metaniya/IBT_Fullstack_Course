import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Addis Eats</h1>
      <p className="mt-2">Ethiopian food, delivered.</p>
      <Link href="/menu" className="mt-4 inline-block underline">
        See the menu
      </Link>
    </main>
  );
}