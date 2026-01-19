"use client";
import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"; // Assurez-vous que shadcn Badge est installé
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  gitUrl: string;
  demoUrl: string;
  category: "web" | "mobile" | "web-mobile" | "ai";
}

const Projets = () => {
  const projects: Project[] = [
    {
      id: 0,
      title:
        "RAG Assistant → Chatbot Intelligent avec IA sur vos Documents PDF 🤖",
      description:
        "Application RAG moderne permettant d'interroger intelligemment vos documents PDF grâce à la génération augmentée par récupération (Retrieval-Augmented Generation). Technologies : Next.js, Google Gemini, embeddings vectoriels, Neon + pgvector, HNSW.",
      imageUrl: "ProjectWeb/images/rag-assistant.png", // ← Remplace par ta vraie image !
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
      gitUrl: "https://github.com/alibia-phanuel/boot-ia-cours", // ← Mets ton vrai repo
      demoUrl: "https://boot-ia-cours.vercel.app/chat", // ← Mets le lien Vercel/Netlify si déployé
      category: "ai",
    },
    {
      id: 1,
      title:
        "Christ Cargo International  → Application de Suivi et Gestion de Colis Internationale 🌍 ",
      description:
        "Une solution complète développée pour Chrisht Cargo, entreprise spécialisée dans le transport de marchandises entre la Chine et l’Afrique.L’application permet un suivi précis des colis, une gestion fluide des envois et une communication transparente avec les clients, le tout à travers une interface moderne et performante.   ",
      imageUrl: "ProjectWeb/images/colis.png",
      tags: [
        "Next.js (frontend)",
        "Express.js (backend REST API)",
        "React Native (Expo)",
        "Prisma · PostgreSQL · JWT Auth",
        "shadcn/ui",
      ],
      gitUrl: "",
      demoUrl: "",
      category: "web-mobile",
    },

    {
      id: 2,
      title: "Plateforme Web & Mobile d’Automatisation Facebook → WhatsApp",
      description:
        "Développement d’une solution SaaS permettant d’automatiser la gestion des prospects générés par Pages et Publicités Facebook, avec une intégration directe sur WhatsApp..",
      imageUrl: "ProjectWeb/images/7.jpg",
      tags: [
        "Next.js 15",
        "shadcn/ui",
        "React Native (Expo)",
        "Node.js · Express",
        "MySQL · Sequelize",
        "Facebook Graph API",
        "WPPConnect",
      ],
      gitUrl: "https://github.com/alibia-phanuel/whatsapp-automation",
      demoUrl: "https://github.com/alibia-phanuel/whatsapp-automation",
      category: "web-mobile",
    },
    {
      id: 4,
      title:
        "FortibTech  →  App Mobile  de Mise en Relation Entre Particuliers et Commerçants 💼",
      description:
        "Développement frontend de l’application mobile FortibOne, une plateforme qui relie particuliers et professionnels locaux.Contribution à la création des interfaces React Native / Expo, à l’intégration API NestJS via Axios, et à la mise en place d’une expérience utilisateur fluide et cohérente sur l’ensemble de l’app.",
      imageUrl: "ProjectWeb/images/fortibone.png",
      tags: [
        "React Native · Expo",
        "TypeScript · Axios",
        "NestJS (backend) · JWT Auth",
        "Code non public — projet réalisé ",
      ],
      gitUrl: "",
      demoUrl: "",
      category: "mobile",
    },
    {
      id: 5,
      title:
        "FortibTech  → Hodos Application Mobile de Parcours Découverte et Fidélisation Locale 📍",
      description:
        "Développement frontend de l’app mobile Hodos, une application française de parcours découverte et fidélisation locale. Contribution à la conception UI/UX et à la création d’interfaces React Native modernes et interactives, intégrant Google Maps, défis gamifiés et récompenses commerçants.",
      imageUrl: "ProjectWeb/images/hodos.png",
      tags: [
        "React Native · Expo",
        "TypeScript · Axios",
        "Code non public — projet réalisé ",
      ],
      gitUrl: "",
      demoUrl: "",
      category: "mobile",
    },
    {
      id: 6,
      title: "ALIBIA → E-commerce Platform",
      description:
        "Développement d’un site e-commerce moderne pour produits électroniques, alliant performance (Next.js 15, shadcn/ui), backend dynamique (API Wix Studios) et outils marketing (Google Analytics, Pixel Facebook, GPT). Fonctionnalités : navigation intuitive, commandes fluides, suivi analytique, et intégration WhatsApp pour simplifier les ventes.",
      imageUrl: "ProjectWeb/images/1.png",
      tags: [
        "Next.js",
        "wix studio",
        "shadcn/ui",
        "Tailwind CSS",
        "Google Analytics",
        "Pixel Facebook",
        "GPT",
        "Facebook Ads",
      ],
      gitUrl: "https://github.com/alibia-phanuel/alibia-officiel-2024",
      demoUrl: "https://alibia.tech/",
      category: "web",
    },
    {
      id: 7,
      title: "La passerelle → linding page pour app mobile ios & android",
      description:
        "Site vitrine professionnel pour l’entreprise La Passerelle, développé avec Next.js, offrant une version mobile ios et android a téléchargeable.",
      imageUrl: "ProjectWeb/images/2.png",
      tags: [
        "Next.js 15",
        "Tailwind CSS",
        "Shadcn/ui",
        "TypeScript",
        "Google Analytics",
      ],
      gitUrl: "https://github.com/alibia-phanuel/passerelle-site",
      demoUrl: "https://www.la-passerelle.co/",
      category: "web",
    },
    {
      id: 8,
      title: "Reproduction de l’interface YouTube",
      description:
        "Cloné YouTube avec React.js en intégrant RapidAPI via Axios. Ce projet met en avant mes compétences en intégration d’API, gestion et affichage dynamique des données. J’y ai implémenté des fonctionnalités clés comme la recherche et la lecture de vidéos, tout en assurant une interface moderne, réactive et performante.",
      imageUrl: "ProjectWeb/images/3.png",
      tags: ["React", "Material UI", "RapidAPI", "Axios"],
      gitUrl: "https://github.com/alibia-phanuel/nextjs15ProjectWeb/tree/main",
      demoUrl: "https://nextjs15-project-web.vercel.app/",
      category: "web",
    },
    {
      id: 9,
      title: "Clonage du site de présentation de l'iPhone 15 Pro",
      description:
        "J'ai cloné le site officiel de l'iPhone 15 Pro en utilisant React, Three.js et GSAP, mettant en valeur mes compétences en développement interactif et en animations 3D. Ce projet montre ma maîtrise des interfaces complexes avec des éléments 3D immersifs et des animations fluides.",
      imageUrl: "ProjectWeb/images/4.png",
      tags: ["React", "Three.js", "GSAP"],
      gitUrl: "https://github.com/alibia-phanuel/IphoneClone3d",
      demoUrl: "https://iphone-clone3d.vercel.app/",
      category: "web",
    },
    {
      id: 10,
      title: "site web moderne",
      description:
        "J'ai développé un site web moderne avec React JS et Tailwind CSS, mettant en valeur une interface utilisateur dynamique, un design responsive et une performance optimisée. Ce projet illustre ma capacité à créer des interfaces interactives tout en assurant une expérience utilisateur fluide. J'ai également utilisé Tailwind CSS ,SASS ",
      imageUrl: "ProjectWeb/images/5.png",
      tags: ["React", "Tailwind CSS", "SASS"],
      gitUrl: "https://github.com/alibia-phanuel/IphoneClone3d", // ← À corriger si besoin
      demoUrl: "https://iphone-clone3d.vercel.app/", // ← À corriger si besoin
      category: "web",
    },

    {
      id: 11,
      title: "Application pokemon via API",
      description:
        " j'ai développé une application Pokédex connectée à l'API PokéAPI. Elle affiche une liste de Pokémon avec recherche par nom ou numéro. Ce projet a renforcé mes compétences en gestion d'états, consommation d'API REST et optimisation des performances.",
      imageUrl: "ProjectWeb/images/6.jpg",
      tags: ["React native", "expo", "typescript"],
      gitUrl: "https://github.com/alibia-phanuel/PokeMonApp",
      demoUrl:
        "https://expo.dev/preview/update?message=remove&updateRuntimeVersion=1.0.0&createdAt=2024-12-01T18%3A19%3A52.235Z&slug=exp&projectId=5ee48caa-12c4-45ed-8772-f1f8c1e0c9b2&group=55a3db02-b47a-4b1f-968c-cbafe70286cc",
      category: "mobile",
    },

    // ── NOUVEAU PROJET AI ──
  ];

  const [filter, setFilter] = useState("tous");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === "tous") return true;
    return project.category === filter;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  return (
    <div className="py-12 bg-[#010104]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Projets
        </h2>
        {/* Filtres */}
        <div className="flex justify-center mb-8 space-x-4 flex-wrap">
          {["tous", "web", "mobile", "web-mobile", "ai"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 my-1 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat === "tous"
                ? "Tous"
                : cat === "web"
                  ? "Projet Web"
                  : cat === "mobile"
                    ? "Projet Mobile"
                    : cat === "web-mobile"
                      ? "Web & Mobile"
                      : "IA / AI"}
            </button>
          ))}
        </div>
        {/* Grille des projets */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`bg-gray-900 border-gray-800 text-gray-300 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden ${
                isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay description au hover */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 animate__animated animate__fadeIn">
                    <p className="text-white text-center text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl text-white font-bold">
                  {project.title}
                </CardTitle>
                {/* Badges technologies */}
                <div className="flex flex-wrap gap-2 mt-2">
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
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {/* Boutons */}
                <div className="flex space-x-4">
                  {project.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Démo</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projets;
