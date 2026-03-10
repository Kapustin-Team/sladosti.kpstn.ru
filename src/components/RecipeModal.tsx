"use client";

import { StrapiMenuItem, getPhotoUrl } from "@/lib/api";
import { useEffect } from "react";
import Image from "next/image";

interface RecipeModalProps {
  item: StrapiMenuItem | null;
  onClose: () => void;
}

export default function RecipeModal({ item, onClose }: RecipeModalProps) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [item, onClose]);

  if (!item) return null;

  const photoUrl = getPhotoUrl(item, "large");

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden rounded-t-3xl">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">
                {getCategoryEmoji(item.menu_category?.name)}
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-white transition-all cursor-pointer shadow-sm"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-700 shadow-sm">
              {item.price} ₽
            </span>
            {item.volume && (
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-stone-500">
                {item.volume}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
            {item.menu_category?.name}
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            {item.name}
          </h2>

          {item.description && (
            <p className="text-stone-600 leading-relaxed mb-5">
              {item.description}
            </p>
          )}

          {item.method && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">
                Приготовление
              </h3>
              <div className="bg-amber-50 rounded-xl p-4 text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {item.method}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
