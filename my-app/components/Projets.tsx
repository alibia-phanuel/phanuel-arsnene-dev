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
  category: "web" | "mobile" | "web-mobile";
}

const Projets = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
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
      ],
      gitUrl: "https://github.com/alibia-phanuel/alibia-officiel-2024",
      demoUrl: "https://alibia.tech/",
      category: "web",
    },
    {
      id: 2,
      title: "La passerelle",
      description:
        "Site vitrine professionnel pour l’entreprise La Passerelle, développé avec Next.js, offrant une version mobile ios et android a téléchargeable.",
      imageUrl: "ProjectWeb/images/2.png",
      tags: ["Next.js 15", "Tailwind CSS", "Shadcn/ui", "TypeScript"],
      gitUrl: "https://github.com/alibia-phanuel/passerelle-site",
      demoUrl: "https://www.la-passerelle.co/",
      category: "web",
    },
    {
      id: 3,
      title: "Plateforme de Pitch de Startups",
      description:
        "j'ai développé une plateforme de pitching pour startups, intégrant une recherche pour les visiteurs et un back-end basé sur Sanity.io pour une gestion de contenu flexible. J'ai utilisé shadcn/ui pour une interface moderne et NextAuth (GitHub) pour une authentification fluide et sécurisée, mettant en œuvre des concepts avancés de Next.js et une solution de gestion de contenu moderne.",
      imageUrl: "ProjectWeb/images/3.png",
      tags: ["NestJS", "Sanity.io", "shadcn/ui"],
      gitUrl: "https://github.com/alibia-phanuel/nextjs15ProjectWeb/tree/main",
      demoUrl: "https://nextjs15-project-web.vercel.app/",
      category: "web",
    },
    {
      id: 4,
      title: "Clonage du site de présentation de l'iPhone 15 Pro",
      description:
        "J'ai cloné le site officiel de l'iPhone 15 Pro en utilisant React, Three.js et GSAP, mettant en valeur mes compétences en développement interactif et en animations 3D. Ce projet montre ma maîtrise des interfaces complexes avec des éléments 3D immersifs et des animations fluides.",
      imageUrl: "ProjectWeb/images/4.png",
      tags: ["React", "Three.js", "GSAP"],
      gitUrl: "https://github.com/alibia-phanuel/IphoneClone3d",
      demoUrl: "https://iphone-clone3d.vercel.app/",
      category: "web",
    },
    // Ajoutez plus de projets ici si nécessaire
    {
      id: 5,
      title: "site web moderne",
      description:
        "J'ai développé un site web moderne avec React JS et Tailwind CSS, mettant en valeur une interface utilisateur dynamique, un design responsive et une performance optimisée. Ce projet illustre ma capacité à créer des interfaces interactives tout en assurant une expérience utilisateur fluide. J'ai également utilisé Tailwind CSS ,SASS ",
      imageUrl: "ProjectWeb/images/5.png",
      tags: ["React", "Three.js", "GSAP"],
      gitUrl: "https://github.com/alibia-phanuel/IphoneClone3d",
      demoUrl: "https://iphone-clone3d.vercel.app/",
      category: "web",
    },

    {
      id: 6,
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
  ];

  const [filter, setFilter] = useState("tous");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === "tous") return true;
    if (filter === "web") return project.category === "web";
    if (filter === "mobile") return project.category === "mobile";
    if (filter === "web-mobile") return project.category === "web-mobile";
    return true;
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
      { threshold: 0.1 }
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
          {["tous", "web", "mobile", "web-mobile"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
                : "Web & Mobile "}
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
                  <a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>Démo</span>
                  </a>
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
