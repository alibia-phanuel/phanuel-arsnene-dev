// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
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
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EMWSR5B6NL"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMWSR5B6NL');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased bg-[#010104]`}>
        {children}
      </body>
    </html>
  );
}
