// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  weight: ["100", "200", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://phanuel-alibia.com";
const GA_MEASUREMENT_ID = "G-EMWSR5B6NL";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Phanuel | Développeur Intégration IA, React & Next.js | Full-stack JS",
    template: "%s | Phanuel",
  },
  description:
    "Portfolio de Phanuel, développeur Full-stack JavaScript expert en React, Next.js, React Native et intégration d'IA. Disponible pour missions freelance et emploi remote.",
  keywords: [
    "Phanuel",
    "développeur full-stack",
    "React Next.js développeur",
    "React Native ",
    "intégration IA",
    "développeur freelance",
    "portfolio développeur JavaScript",
  ],
  authors: [{ name: "Phanuel" }],
  creator: "Phanuel",
  publisher: "Phanuel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Phanuel — Portfolio",
    title:
      "Phanuel | Développeur Intégration IA, React & Next.js | Full-stack JS",
    description:
      "Portfolio de Phanuel, développeur Full-stack JavaScript expert en React, Next.js, React Native et intégration d'IA.",
    images: [
      {
        url: "/images/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Phanuel — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Phanuel | Développeur Intégration IA, React & Next.js | Full-stack JS",
    description:
      "Portfolio de Phanuel, développeur Full-stack JavaScript expert en React, Next.js, React Native et intégration d'IA.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010104",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#010104]`}>
        {children}

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
