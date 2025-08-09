import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nar-bar/Nav";
import MobilNav from "@/components/nar-bar/MobilNav";
const inter = Inter({
  weight: ["100", "200", "300", "400", "700", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title:
    "Phanuel | Full-stack JavaScript Developer | React, Next.js, AI Integration",
  description:
    "Portfolio of Phanuel, a Full-stack JavaScript Developer specializing in React, Next.js, React Native, and AI integration. Available for remote jobs and freelance projects worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased  bg-[#0d0d1f]`}>
        <Nav />
        <MobilNav />
        {children}
      </body>
    </html>
  );
}
