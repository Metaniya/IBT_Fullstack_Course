import { notFound } from "next/navigation";
import { getDishes, getDish } from "../dishes";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import AddToCartButton from "./AddToCartButton";

// Every dish id is known at build time, so one static page per dish.
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id); // cached: same call as the page below
  if (!dish) return { title: "Dish not found", robots: { index: false } };

  const description = `${dish.name}: ${dish.summary} ${dish.price} ETB, delivered across Addis Ababa.`;
  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    // openGraph replaces the layout's openGraph, so repeat the shared fields.
    openGraph: {
      title: `${dish.name} · ${SITE_NAME}`,
      description,
      url: `/menu/${dish.id}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_ET",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.summary,
    url: `${SITE_URL}/menu/${dish.id}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p className="mt-2">{dish.summary}</p>
      <p className="mt-2">
        {dish.category} · {dish.price} ETB
      </p>
      <AddToCartButton dish={{ id: dish.id, name: dish.name, price: dish.price }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}