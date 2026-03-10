"use client";

import { Recipe } from "@/data/recipes";
import { useEffect } from "react";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  useEffect(() => {
    if (recipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [recipe]);

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
          <span className="text-8xl">{getCategoryEmoji(recipe.category)}</span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-white transition-all cursor-pointer"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-700">
              {recipe.price} ₽
            </span>
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-stone-500">
              {recipe.weight}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
            {recipe.category}
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            {recipe.title}
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            {recipe.description}
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">
              Состав
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-amber-50 text-amber-800 text-sm px-3 py-1.5 rounded-full border border-amber-100"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">
              Теги
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-stone-100 text-stone-500 text-sm px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
