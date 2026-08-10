"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaReact, FaBrain, FaFileAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiJest,
  SiGoogleanalytics,
  SiDocker,
  SiPostgresql,
  SiPrisma,
  SiMeta,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SiClaude } from "react-icons/si";
const Technologi = () => {
  const technologies = [
    // Compétence principale
    {
      name: "React",
      icon: <FaReact className="w-12 h-12 text-blue-400" />,
      description: "Création d'interfaces utilisateur dynamiques et réactives.",
      category: "Compétence principale",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-12 h-12 text-white" />,
      description:
        "Développement de sites web performants avec SSR et SSG, ainsi que la création d’API intégrées pour une gestion complète du backend.",
      category: "Compétence principale",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-12 h-12 text-blue-400" />,
      description:
        "JavaScript typé pour des applications robustes et évolutives.",
      category: "Compétence principale",
    },
    // Compétence secondaire
    {
      name: "React Native",
      icon: <SiReact className="w-12 h-12 text-blue-400" />,
      description: "Applications mobiles multiplateformes fluides.",
      category: "Compétence principale",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="w-12 h-12 text-green-400" />,
      description:
        "Exécution JavaScript côté serveur pour des applications performantes.",
      category: "Compétence principale",
    },
    {
      name: "Express",
      icon: <SiExpress className="w-12 h-12 text-gray-400" />,
      description: "Framework minimaliste pour des API rapides et flexibles.",
      category: "Compétence principale",
    },
    {
      name: "NestJS",
      icon: <SiNestjs className="w-12 h-12 text-red-500" />,
      description:
        "Framework Node.js progressif pour construire des API robustes, modulaires et évolutives avec TypeScript.",
      category: "Compétence principale",
    },
    {
      name: "Jest",
      icon: <SiJest className="w-12 h-12 text-pink-500" />,
      description:
        "Tests unitaires et d'intégration pour garantir la fiabilité du code.",
      category: "Compétence secondaire",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql className="w-12 h-12 text-blue-600" />,
      description:
        "Gestion de bases de données relationnelles robustes et performantes.",
      category: "Compétence secondaire",
    },
    {
      name: "Prisma",
      icon: <SiPrisma className="w-12 h-12 text-gray-200" />,
      description:
        "ORM moderne pour une interaction simplifiée avec les bases de données.",
      category: "Compétence secondaire",
    },
    // Intégration IA - accélère le développement et fait gagner du temps
    {
      name: "Intégration IA",
      icon: <FaBrain className="w-12 h-12 text-purple-400" />,
      description:
        "J'utilise l'IA (GPT, Grok, Claude...) au quotidien pour accélérer le développement, automatiser les tâches répétitives et livrer plus vite sans sacrifier la qualité.",
      category: "Compétence principale",
    },
    {
      name: "Swagger UI",
      icon: <FaFileAlt className="w-12 h-12 text-green-500" />,
      description:
        "Documentation interactive et test des API REST pour une meilleure collaboration.",
      category: "Soft Skills",
    },
    {
      name: "Docker",
      icon: <SiDocker className="w-12 h-12 text-blue-500" />,
      description:
        "Conteneurisation et déploiement d’applications pour un environnement stable et portable.",
      category: "Soft Skills",
    },
    {
      name: "Google Analytics",
      icon: <SiGoogleanalytics className="w-12 h-12 text-yellow-400" />,
      description:
        "Suivi et analyse des interactions utilisateurs pour optimiser les applications web et mobiles.",
      category: "Soft Skills",
    },
    {
      name: "Facebook Ads",
      icon: <SiMeta className="w-12 h-12 text-blue-600" />,
      description:
        "Mise en place et gestion de campagnes publicitaires pour rediriger efficacement vers des sites web et applications mobiles.",
      category: "Soft Skills",
    },
    {
      name: "VS Code + Claude Code",
      icon: (
        <div className="flex items-center justify-center gap-3">
          <VscVscode className="w-10 h-10 text-blue-400" />
          <SiClaude className="w-10 h-10 text-orange-400" />
          {/* ou <ClaudeIcon className="w-10 h-10 text-orange-400" /> si SiClaude n'existe pas */}
        </div>
      ),
      description:
        "Environnement de développement optimisé avec Claude Code pour coder plus vite, automatiser le refactoring et déboguer efficacement.",
      category: "Compétence principale",
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [rotations, setRotations] = useState<
    { rotateX: number; rotateY: number }[]
  >(Array(technologies.length).fill({ rotateX: 0, rotateY: 0 }));

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

  const handleMouseMove = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.width / 2;
    const cardCenterY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX - cardCenterX) / cardCenterX) * 15;
    const rotateX = -((mouseY - cardCenterY) / cardCenterY) * 15;

    setRotations((prev) => {
      const newRotations = [...prev];
      newRotations[index] = { rotateX, rotateY };
      return newRotations;
    });
  };

  const handleMouseLeave = (index: number) => {
    setRotations((prev) => {
      const newRotations = [...prev];
      newRotations[index] = { rotateX: 0, rotateY: 0 };
      return newRotations;
    });
  };

  const categories = [
    "Compétence principale",
    "Compétence secondaire",
    "Soft Skills",
  ];

  const filteredTechnologies = selectedCategory
    ? technologies.filter((tech) => tech.category === selectedCategory)
    : technologies;

  return (
    <div className="py-12 bg-[#010104]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Technologies & outils de travail
        </h2>
        <div className="flex justify-center mb-8 space-x-2 sm:space-x-4 flex-wrap gap-y-2">
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            } hover:bg-blue-500 transition-colors min-w-[80px] sm:min-w-[100px]`}
            onClick={() => setSelectedCategory(null)}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } hover:bg-blue-500 transition-colors min-w-[80px] sm:min-w-[100px]`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredTechnologies.map((tech, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`bg-gray-900 border-gray-800 text-gray-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${
                  rotations[index]?.rotateX ?? 0
                }deg) rotateY(${rotations[index]?.rotateY ?? 0}deg)`,
                animationDelay: `${index * 0.2}s`,
              }}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <CardHeader className="flex justify-center">
                {tech?.icon}
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-xl text-white mb-2">
                  {tech?.name}
                </CardTitle>
                <p className="text-gray-300 text-sm">{tech?.description}</p>
                <p className="text-gray-500 text-xs mt-2">{tech?.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologi;
const ClaudeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L2 21h4.2l1.6-4h8.4l1.6 4H22L12 2zm0 5.5L15.6 15H8.4L12 7.5z" />
  </svg>
);
