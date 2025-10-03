"use client";

import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { FaReact, FaBrain, FaFileAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiMeta,
  SiNodedotjs,
  SiExpress,
  SiJest,
  SiPostman,
  SiGoogleanalytics,
  SiDocker,
} from "react-icons/si";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Technologi = () => {
  const technologies = [
    // Frontend
    {
      name: "React",
      icon: <FaReact className="w-12 h-12 text-blue-400" />,
      description: "Création d'interfaces utilisateur dynamiques et réactives.",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-12 h-12 text-white" />,
      description:
        "Développement de sites web performants avec SSR et SSG, ainsi que la création d’API intégrées pour une gestion complète du backend.",
      category: "Frontend",
    },
    {
      name: "React Native",
      icon: <SiReact className="w-12 h-12 text-blue-400" />,
      description: "Applications mobiles multiplateformes fluides.",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-12 h-12 text-blue-400" />,
      description:
        "JavaScript typé pour des applications robustes et évolutives.",
      category: "Frontend",
    },
    // Backend
    {
      name: "Node.js",
      icon: <SiNodedotjs className="w-12 h-12 text-green-400" />,
      description:
        "Exécution JavaScript côté serveur pour des applications performantes.",
      category: "Backend",
    },

    {
      name: "Express",
      icon: <SiExpress className="w-12 h-12 text-gray-400" />,
      description: "Framework minimaliste pour des API rapides et flexibles.",
      category: "Backend",
    },
    {
      name: "Intégration IA",
      icon: <FaBrain className="w-12 h-12 text-purple-400" />,
      description:
        "Création de fonctionnalités intelligentes et interactives avec GPT, LangChain, Grok et autres outils IA pour apps web et mobiles.",
      category: "IA",
    },
    {
      name: "Jest",
      icon: <SiJest className="w-12 h-12 text-pink-500" />,
      description:
        "Tests unitaires et d'intégration pour garantir la fiabilité du code.",
      category: "Outils",
    },
    // Outils
    {
      name: "Swagger UI",
      icon: <FaFileAlt className="w-12 h-12 text-green-500" />,
      description:
        "Documentation interactive et test des API REST pour une meilleure collaboration.",
      category: "Outils",
    },

    {
      name: "Docker",
      icon: <SiDocker className="w-12 h-12 text-blue-500" />,
      description:
        "Conteneurisation et déploiement d’applications pour un environnement stable et portable.",
      category: "Outils",
    },
    {
      name: "Google Analytics",
      icon: <SiGoogleanalytics className="w-12 h-12 text-yellow-400" />,
      description:
        "Suivi et analyse des interactions utilisateurs pour optimiser les applications web et mobiles.",
      category: "Outils",
    },
    {
      name: "Facebook Ads",
      icon: <SiMeta className="w-12 h-12 text-blue-600" />,
      description:
        "Mise en place et gestion de campagnes publicitaires pour rediriger efficacement vers des sites web et applications mobiles.",
      category: "Marketing",
    },
    // IA
  ];

  const [isVisible, setIsVisible] = useState(false);
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

  const handleMouseMove = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
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

  return (
    <div className="py-12 bg-[#010104]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Technologies & outils de travail
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {technologies.map((tech, index) => (
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologi;
