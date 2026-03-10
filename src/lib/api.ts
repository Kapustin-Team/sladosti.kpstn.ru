const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://sr-coffee.kpstn.ru";

export interface StrapiPhoto {
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface StrapiCategory {
  id: number;
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface StrapiMenuItem {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  price: number;
  volume: string | null;
  method: string | null;
  is_available: boolean;
  is_stop_list: boolean;
  rawPhoto: StrapiPhoto | null;
  menu_category: StrapiCategory | null;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchAllMenuItems(): Promise<StrapiMenuItem[]> {
  const items: StrapiMenuItem[] = [];
  let page = 1;
  let pageCount = 1;

  while (page <= pageCount) {
    const res = await fetch(
      `${STRAPI_URL}/api/menu-items?populate=*&pagination[pageSize]=100&pagination[page]=${page}&sort=menu_category.sort_order:asc,name:asc`,
      { next: { revalidate: 60 } }
    );
    const data: StrapiResponse<StrapiMenuItem> = await res.json();
    items.push(...data.data);
    pageCount = data.meta.pagination.pageCount;
    page++;
  }

  return items.filter((item) => item.is_available && !item.is_stop_list);
}

export function getPhotoUrl(item: StrapiMenuItem, size: "small" | "medium" | "large" | "thumbnail" = "medium"): string | null {
  if (!item.rawPhoto) return null;
  const formats = item.rawPhoto.formats;
  if (formats?.[size]) return formats[size]!.url;
  if (formats?.medium) return formats.medium.url;
  if (formats?.small) return formats.small.url;
  return item.rawPhoto.url;
}

export function extractCategories(items: StrapiMenuItem[]): string[] {
  const catMap = new Map<string, number>();
  for (const item of items) {
    if (item.menu_category && !catMap.has(item.menu_category.name)) {
      catMap.set(item.menu_category.name, item.menu_category.sort_order);
    }
  }
  return [...catMap.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([name]) => name);
}
