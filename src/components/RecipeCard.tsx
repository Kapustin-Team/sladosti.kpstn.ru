"use client";

import { StrapiMenuItem, getPhotoUrl } from "@/lib/api";
import Image from "next/image";

interface RecipeCardProps {
  item: StrapiMenuItem;
  onClick: (item: StrapiMenuItem) => void;
}

export default function RecipeCard({ item, onClick }: RecipeCardProps) {
  const photoUrl = getPhotoUrl(item, "small");

  return (
    <button
      onClick={() => onClick(item)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left w-full cursor-pointer border border-stone-100 hover:border-amber-200"
    >
      <div className="relative h-52 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {getCategoryEmoji(item.menu_category?.name)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-700 shadow-sm">
          {item.price} ₽
        </div>
        {item.volume && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-stone-500">
            {item.volume}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
          {item.menu_category?.name}
        </div>
        <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </button>
  );
}

function getCategoryEmoji(category?: string): string {
  if (!category) return "🍽️";
  const map: Record<string, string> = {
    "Напитки": "☕",
    "На десерт": "🍰",
    "Классика сладостей": "🧁",
    "Больше, чем завтраки": "🍳",
    "Паста": "🍝",
    "Бургеры": "🍔",
    "Гарниры": "🥗",
    "Каши и не только": "🥣",
    "Детское меню": "👶",
    "Sweet&Warm Menu — Еда": "🍲",
  };
  return map[category] || "🍽️";
}
