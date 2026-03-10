import { fetchAllMenuItems, extractCategories } from "@/lib/api";
import MenuPage from "@/components/MenuPage";

export default async function Home() {
  const items = await fetchAllMenuItems();
  const categories = extractCategories(items);

  return <MenuPage items={items} categories={categories} />;
}
