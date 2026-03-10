"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            active === cat
              ? "bg-amber-500 text-white shadow-md shadow-amber-200"
              : "bg-white text-stone-600 hover:bg-amber-50 hover:text-amber-700 border border-stone-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
