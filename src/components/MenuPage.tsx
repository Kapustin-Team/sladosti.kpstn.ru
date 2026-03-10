"use client";

import { useState, useMemo } from "react";
import { StrapiMenuItem } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";

interface MenuPageProps {
  items: StrapiMenuItem[];
  categories: string[];
}

export default function MenuPage({ items, categories }: MenuPageProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedItem, setSelectedItem] = useState<StrapiMenuItem | null>(null);

  const allCategories = ["Все", ...categories];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "Все" ||
        item.menu_category?.name === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.method && item.method.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [items, search, activeCategory]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-gradient-to-b from-amber-50 to-stone-50 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-5xl mb-3">🧁</div>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Сладости и Радости
          </h1>
          <p className="text-stone-500 text-lg mb-8">
            Меню и рецепты нашей кофейни
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-md py-4 px-4 border-b border-stone-100">
        <CategoryFilter
          categories={allCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-stone-400 text-lg">
              Ничего не найдено. Попробуйте другой запрос.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-400 text-sm">
                {filtered.length}{" "}
                {declension(filtered.length, [
                  "позиция",
                  "позиции",
                  "позиций",
                ])}
              </p>
              {activeCategory !== "Все" && (
                <button
                  onClick={() => setActiveCategory("Все")}
                  className="text-amber-600 text-sm hover:text-amber-800 cursor-pointer"
                >
                  Показать все
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <RecipeCard
                  key={item.id}
                  item={item}
                  onClick={setSelectedItem}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-4 text-center text-stone-400 text-sm">
        <p>© 2026 Сладости и Радости · Рыбинск</p>
      </footer>

      {/* Modal */}
      <RecipeModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

function declension(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (lastDigit > 1 && lastDigit < 5) return forms[1];
  if (lastDigit === 1) return forms[0];
  return forms[2];
}
