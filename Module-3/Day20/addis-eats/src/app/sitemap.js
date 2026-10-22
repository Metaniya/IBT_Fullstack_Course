import { getDishes } from "@/app/menu/dishes";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  const dishes = await getDishes();

  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.9 },
    { url: `${SITE_URL}/menu/browse`, priority: 0.5 },
    ...dishes.map((d) => ({
      url: `${SITE_URL}/menu/${d.id}`,
      priority: 0.8,
    })),
  ];
}