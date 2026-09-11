// app/not-found.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "Cette page n'existe pas (ou plus). Retour à l'accueil du portfolio de Phanuel Arsene.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#010104] px-6 py-20 text-white">
      {/* Halos d'ambiance, cohérents avec la charte du site */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#193cb8] opacity-25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#a2f4fd] opacity-10 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Illustration pixel art */}
        <div className="relative mb-10">
          <div className="absolute -inset-6 rounded-full bg-[#a2f4fd] opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-[#193cb8]/50 shadow-2xl shadow-[#193cb8]/40">
            <Image
              src="/images/hello-world-pixel.gif"
              alt="Illustration pixel art : un ordinateur portable affichant « Hello World! »"
              width={320}
              height={320}
              unoptimized
              priority
              className="pixelated h-56 w-56 sm:h-72 sm:w-72"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010104]/70 via-transparent to-transparent" />
          </div>
        </div>

        <p className="mb-3 font-mono text-sm tracking-[0.35em] text-[#a2f4fd]/70">
          ERREUR 404
        </p>

        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Hello World, <span className="text-[#a2f4fd]">pas cette page</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-[#e0f7ff]/70 sm:text-lg">
          L&apos;adresse demandée n&apos;existe pas — ou plus. Pas de panique :
          tout le reste fonctionne, et j&apos;ai sûrement mieux à te montrer.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#193cb8] to-[#0d1128] px-7 py-3.5 font-medium text-[#e0f7ff] shadow-lg shadow-[#193cb8]/30 transition-all duration-300 hover:scale-105 hover:shadow-[#193cb8]/60"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/#projets"
            className="inline-flex items-center justify-center rounded-full border border-[#193cb8]/60 px-7 py-3.5 font-medium text-[#a2f4fd] transition-all duration-300 hover:border-[#a2f4fd] hover:bg-[#193cb8]/20"
          >
            Voir mes projets
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium text-[#e0f7ff]/70 transition-colors duration-300 hover:text-[#a2f4fd]"
          >
            <Mail className="h-5 w-5" />
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
