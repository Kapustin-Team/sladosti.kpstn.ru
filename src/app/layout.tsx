import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Сладости и Радости — Меню и рецепты",
  description: "Кофейня Сладости и Радости в Рыбинске. Меню, рецепты, десерты и кофе.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
