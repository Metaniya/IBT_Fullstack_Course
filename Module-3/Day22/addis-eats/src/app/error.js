"use client";

export default function GlobalError({ error, reset }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-600">
        The request was refused or failed. Nothing was changed.
      </p>
      <button onClick={() => reset()} className="mt-4 rounded border px-4 py-2">
        Try again
      </button>
    </main>
  );
}