// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["100", "200", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Phanuel | Développeur Intégration IA, React & Next.js | Full-stack JS",
  description:
    "Portfolio de Phanuel, développeur Full-stack JavaScript expert en React, Next.js, React Native et intégration d’IA. Disponible pour missions freelance et emploi remote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#010104]`}>
        {children}
      </body>
    </html>
  );
}
