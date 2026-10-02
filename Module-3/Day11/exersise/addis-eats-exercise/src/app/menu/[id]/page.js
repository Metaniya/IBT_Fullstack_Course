export default async function DishPage({ params }) {
  const { id } = await params; // e.g. "kitfo"
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dish: {id}</h1>
    </main>
  );
}