export default function CategoryBar({ categories }) {
  return (
    <div className="flex gap-2">
      {categories.map((c) => (
        <span key={c} className="px-3 py-1 border rounded-full text-sm">
          {c}
        </span>
      ))}
    </div>
  );
}