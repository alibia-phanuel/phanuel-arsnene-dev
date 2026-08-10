"use client";
import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { FaGithub, FaExternalLinkAlt, FaBook, FaRocket } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "web" | "mobile" | "web-mobile" | "ai";

interface RoadmapItem {
  icon: "done" | "progress" | "locked";
  label: string;
}

interface ProjectLink {
  href: string;
  label: string;
  icon: "github" | "demo" | "docs" | "landing";
  variant: "primary" | "secondary";
}

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  tags: string[];
  links: ProjectLink[];
  category: Category;
  featured?: boolean;
  current?: boolean; // 👈 projet en cours (poste actuel)
  roadmap?: RoadmapItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROADMAP_ICON: Record<RoadmapItem["icon"], string> = {
  done: "✔",
  progress: "⏳",
  locked: "🔒",
};

const CATEGORY_LABELS: Record<string, string> = {
  tous: "Tous",
  web: "Projet Web",
  mobile: "Projet Mobile",
  "web-mobile": "Web & Mobile",
  ai: "IA / AI",
};

const FILTER_CATEGORIES = ["tous", "web", "mobile", "web-mobile", "ai"];

// ─── Sub-components ───────────────────────────────────────────────────────────

const RoadmapBadge = ({ items }: { items: RoadmapItem[] }) => (
  <div className="px-3 py-2 bg-gray-800/80 rounded-lg border border-gray-700/60">
    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-semibold">
      🚧 En développement
    </p>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {items.map(({ icon, label }) => (
        <span
          key={label}
          className="text-[11px] text-gray-300 whitespace-nowrap"
        >
          {ROADMAP_ICON[icon]} {label}
        </span>
      ))}
    </div>
  </div>
);

const ProjectLinks = ({ links }: { links: ProjectLink[] }) => {
  const baseClass =
    "flex-1 text-center px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium";

  const getIcon = (type: ProjectLink["icon"]) => {
    if (type === "github") return <FaGithub className="w-4 h-4" />;
    if (type === "docs") return <FaBook className="w-4 h-4" />;
    if (type === "landing") return <FaRocket className="w-4 h-4" />;
    return <FaExternalLinkAlt className="w-4 h-4" />;
  };

  return (
    <div className="flex space-x-3">
      {links.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClass} ${
              link.variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {getIcon(link.icon)}
            <span>{link.label}</span>
          </a>
        ) : (
          <span
            key={link.label}
            className={`${baseClass} bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-60`}
          >
            {getIcon(link.icon)}
            <span>{link.label} — bientôt</span>
          </span>
        ),
      )}
    </div>
  );
};

// ─── Featured Hero Card ───────────────────────────────────────────────────────

const FeaturedCard = ({
  project,
  isVisible,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  isVisible: boolean;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <Card
    className={`bg-gray-900 border-amber-500/30 text-gray-300 group relative overflow-hidden ring-1 ring-amber-500/25 transition-all duration-500 hover:shadow-2xl hover:ring-amber-500/50 ${
      isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
    }`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {/* Badges — Featured + Statut en cours */}
    <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
      <span className="bg-amber-500/90 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide shadow-md">
        ⭐ Featured Project
      </span>
      {project.current && (
        <span className="bg-emerald-500/90 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide shadow-md flex items-center gap-1">
          🟢 En parallèle · ~4h/jour
        </span>
      )}
    </div>

    {/* Layout horizontal : image gauche, contenu droite */}
    <div className="flex flex-col md:flex-row">
      {/* Image — pleine hauteur à gauche */}
      <div className="relative md:w-2/5 h-56 md:h-auto shrink-0 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay description au hover */}
        {hovered && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-6 animate__animated animate__fadeIn">
            <p className="text-white text-sm leading-relaxed text-center">
              {project.description}
            </p>
          </div>
        )}
        {/* Gradient de transition image → contenu sur desktop */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-gray-900" />
      </div>

      {/* Contenu — droite */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Titre + sous-titre */}
        <div>
          <CardTitle className="text-2xl text-white font-bold leading-snug">
            {project.title}
          </CardTitle>
          {project.subtitle && (
            <p className="text-sm text-amber-400/90 mt-1 font-medium">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Roadmap */}
        {project.roadmap && <RoadmapBadge items={project.roadmap} />}

        {/* Boutons — en bas */}
        {project.links.length > 0 && (
          <div className="mt-auto">
            <ProjectLinks links={project.links} />
          </div>
        )}
      </div>
    </div>
  </Card>
);

// ─── Regular Project Card ─────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  index,
  isVisible,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  index: number;
  isVisible: boolean;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <Card
    className={`bg-gray-900 text-gray-300 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden flex flex-col ${
      project.current
        ? "border-emerald-500/40 ring-1 ring-emerald-500/40 hover:ring-emerald-500/70"
        : "border-gray-800"
    } ${isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
    style={{ animationDelay: `${index * 0.15}s` }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {/* Badge "poste actuel" */}
    {project.current && (
      <span className="absolute text-white top-3 left-3 z-10 bg-emerald-500/90  text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide shadow-md flex items-center gap-1">
        🟢 Je travaille dessus
      </span>
    )}

    {/* Image */}
    <div className="relative h-44 shrink-0 overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {hovered && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 animate__animated animate__fadeIn">
          <p className="text-white text-center text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
      )}
    </div>

    {/* Corps */}
    <CardHeader className="p-4 flex-1 flex flex-col gap-2">
      <CardTitle className="text-base text-white font-bold leading-snug">
        {project.title}
      </CardTitle>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-blue-600 text-white hover:bg-blue-500 transition-colors text-[11px]"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </CardHeader>

    {/* Boutons */}
    {project.links.length > 0 && (
      <CardContent className="p-4 pt-0 shrink-0">
        <ProjectLinks links={project.links} />
      </CardContent>
    )}
  </Card>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: -1,
    title: "Alibia Commerce AI OS",
    subtitle: "Le système d'exploitation intelligent pour le commerce",
    description:
      "AI Commerce Operating System conçu pour aider les commerçants à gérer leur activité depuis une plateforme unique. Il centralise l'inventaire, les ventes, les finances, les clients, WhatsApp et les futures fonctionnalités IA dans une architecture moderne, modulaire et multi-entreprise.",
    imageUrl: "ProjectWeb/images/alibia-commerce.png",
    tags: [
      "NestJS",
      "TypeScript",
      "Next.js",
      "React Native",
      "Prisma",
      "PostgreSQL",
      "AI",
      "WhatsApp",
      "Multi-Tenant",
    ],
    links: [
      {
        href: "https://github.com/alibia-os-ia/alibia-docs",
        label: "Documentation",
        icon: "docs",
        variant: "secondary",
      },
      {
        href: "https://www.facebook.com/profile.php?id=61591538277996",
        label: "Landing Page",
        icon: "landing",
        variant: "primary",
      },
    ],
    category: "ai",
    featured: true,
    current: true,

    roadmap: [
      { icon: "done", label: "Architecture" },
      { icon: "done", label: "Auth" },
      { icon: "done", label: "Business" },
      { icon: "progress", label: "Inventaire" },
      { icon: "progress", label: "Finance" },
      { icon: "progress", label: "WhatsApp" },
      { icon: "locked", label: "IA" },
      { icon: "locked", label: "CRM" },
      { icon: "locked", label: "Analytics" },
    ],
  },
  {
    id: 5,
    title: "Nevo Market — Plateforme E-commerce 🛒",
    subtitle: "Développeur Logiciel Full-Stack — World Farm",
    description:
      "Développement, implémentation et maintenance de la plateforme e-commerce NEVO MARKET. Conception des fonctionnalités applicatives, analyse des besoins fonctionnels et techniques, maintenance corrective et évolutive, documentation et contribution à la qualité, la sécurité et la performance de la plateforme.",
    imageUrl: "ProjectWeb/images/nevo.png", // ⚠️ image temporaire — à remplacer par une vraie capture de app.nevo.market
    tags: ["Frontend", "E-commerce", "World Farm", "Cameroun", "CDD"],
    links: [
      {
        href: "https://app.nevo.market/",
        label: "Voir la plateforme",
        icon: "demo",
        variant: "primary",
      },
    ],
    category: "web",
    current: true,
  },
  {
    id: 0,
    title: "Absolute SARL — Plateforme Immigration & Services",
    description:
      "Plateforme web pour Absolute SARL : gestion des services d'immigration, prise de rendez-vous et support en temps réel.",
    imageUrl: "ProjectWeb/images/absolute.png",
    tags: [
      "Next.js 15",
      "Node.js",
      "TypeScript",
      "PostgreSQL Prisma",
      "Vercel",
      "Express.js (backend REST API)",
    ],
    links: [
      {
        href: "https://github.com/alibia-phanuel/afro_saga_client_mobil/blob/main/README.md",
        label: "Code",
        icon: "github",
        variant: "secondary",
      },
      {
        href: "https://client-absolute-sarl.vercel.app/fr",
        label: "Démo",
        icon: "demo",
        variant: "primary",
      },
    ],
    category: "web",
  },
  {
    id: 3,
    title:
      "RAG Assistant → Chatbot Intelligent avec IA sur vos Documents PDF 🤖",
    description:
      "Application RAG moderne permettant d'interroger intelligemment vos documents PDF grâce à la génération augmentée par récupération (Retrieval-Augmented Generation).",
    imageUrl: "ProjectWeb/images/rag-assistant.png",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Google Gemini",
      "text-embedding-004",
      "Neon + pgvector",
      "HNSW",
      "Vercel AI SDK",
      "RAG",
    ],
    links: [
      {
        href: "https://github.com/alibia-phanuel/boot-ia-cours",
        label: "Code",
        icon: "github",
        variant: "secondary",
      },
      {
        href: "https://boot-ia-cours.vercel.app/chat",
        label: "Démo",
        icon: "demo",
        variant: "primary",
      },
    ],
    category: "ai",
  },
  {
    id: 1,
    title: "Super cargo service→ Suivi de Colis Internationale 🌍",
    description:
      "Solution complète pour Chrisht Cargo : suivi de colis, gestion des envois et communication client entre la Chine et l'Afrique.",
    imageUrl: "ProjectWeb/images/colis.png",
    tags: [
      "Next.js (frontend)",
      "Express.js (backend REST API)",
      "React Native (Expo)",
      "Prisma · PostgreSQL · JWT Auth",
      "shadcn/ui",
      "Code non public",
    ],
    links: [],
    category: "web-mobile",
  },

  {
    id: 4,
    title:
      "FortibTech → App Mobile Mise en Relation Particuliers / Commerçants 💼",
    description:
      "Frontend mobile FortibOne : interfaces React Native / Expo, intégration API NestJS, expérience utilisateur fluide.",
    imageUrl: "ProjectWeb/images/fortibone.png",
    tags: [
      "React Native · Expo",
      "TypeScript · Axios",
      "NestJS (backend) · JWT Auth",
      "Code non public",
    ],
    links: [],
    category: "mobile",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const Projets = () => {
  const [filter, setFilter] = useState("tous");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const featuredProject = PROJECTS.find((p) => p.featured)!;
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const filteredOthers = otherProjects.filter(
    (p) => filter === "tous" || p.category === filter,
  );
  const showFeatured = filter === "tous" || filter === featuredProject.category;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="py-12 bg-[#010104]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Projets
        </h2>

        {/* Filtres */}
        <div className="flex justify-center mb-8 space-x-4 flex-wrap">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 my-1 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Hero card featured — pleine largeur */}
        {showFeatured && (
          <div className="mb-6">
            <FeaturedCard
              project={featuredProject}
              isVisible={isVisible}
              hovered={hoveredProject === featuredProject.id}
              onMouseEnter={() => setHoveredProject(featuredProject.id)}
              onMouseLeave={() => setHoveredProject(null)}
            />
          </div>
        )}

        {/* Grille projets secondaires */}
        {filteredOthers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOthers.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
                hovered={hoveredProject === project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projets;
