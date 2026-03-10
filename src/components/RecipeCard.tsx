"use client";

import { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <button
      onClick={() => onClick(recipe)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left w-full cursor-pointer border border-stone-100 hover:border-amber-200"
    >
      <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center overflow-hidden">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {getCategoryEmoji(recipe.category)}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-700">
          {recipe.price} ₽
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-stone-500">
          {recipe.weight}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
          {recipe.category}
        </div>
        <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    "Кофе": "☕",
    "Десерты": "🍰",
    "Выпечка": "🥐",
    "Завтраки": "🍳",
    "Напитки": "🧃",
    "Сэндвичи": "🥪",
  };
  return map[category] || "🍽️";
}
