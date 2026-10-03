import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">404 - Not found</h1>
      <p className="mt-2">We couldn&apos;t find that page or dish.</p>
      <Link href="/menu" className="mt-4 inline-block underline">
        Back to the menu
      </Link>
    </main>
  );
}