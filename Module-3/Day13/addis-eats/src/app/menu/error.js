"use client";

export default function Error({ error, reset }) {
  return (
    <main className="p-8">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 border rounded"
      >
        Try again
      </button>
    </main>
  );
}