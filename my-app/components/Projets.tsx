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
  category: "web" | "mobile" | "ia" | "web-mobile";
}

const Projets = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Une plateforme e-commerce full-stack avec panier dynamique et intégration de paiements sécurisés. Développée pour optimiser les ventes en ligne.",
      imageUrl:
        "https://www.capconnect.com/blog/wp-content/uploads/2021/11/site-ecommerce.jpg",
      tags: ["React", "Next.js", "Node.js"],
      gitUrl: "https://github.com/user/ecommerce-platform",
      demoUrl: "https://demo.ecommerce-platform.com",
      category: "web",
    },
    {
      id: 2,
      title: "Mobile Fitness App",
      description:
        "Application mobile pour le suivi des entraînements et des progrès fitness, avec synchronisation cloud et notifications push.",
      imageUrl:
        "https://via.placeholder.com/400x250/10B981/FFFFFF?text=Fitness+App",
      tags: ["React Native", "TypeScript"],
      gitUrl: "https://github.com/user/fitness-app",
      demoUrl: "https://demo.fitness-app.com",
      category: "mobile",
    },
    {
      id: 3,
      title: "AI Chatbot Assistant",
      description:
        "Chatbot intelligent intégré avec IA pour assistance client, utilisant des modèles NLP pour des réponses contextuelles.",
      imageUrl:
        "https://via.placeholder.com/400x250/A855F7/FFFFFF?text=AI+Chatbot",
      tags: ["NestJS", "Intégration IA"],
      gitUrl: "https://github.com/user/ai-chatbot",
      demoUrl: "https://demo.ai-chatbot.com",
      category: "ia",
    },
    {
      id: 4,
      title: "Hybrid Web-Mobile Dashboard",
      description:
        "Tableau de bord hybride pour gestion de projets, accessible web et mobile avec sync en temps réel et IA pour prédictions.",
      imageUrl:
        "https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Dashboard",
      tags: ["React", "React Native", "Next.js", "Intégration IA"],
      gitUrl: "https://github.com/user/hybrid-dashboard",
      demoUrl: "https://demo.hybrid-dashboard.com",
      category: "web-mobile",
    },
    // Ajoutez plus de projets ici si nécessaire
  ];

  const [filter, setFilter] = useState("tous");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === "tous") return true;
    if (filter === "web") return project.category === "web";
    if (filter === "mobile") return project.category === "mobile";
    if (filter === "ia") return project.category === "ia";
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
          {["tous", "web", "mobile", "ia", "web-mobile"].map((cat) => (
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
                : cat === "ia"
                ? "IA"
                : "Web & Mobile + IA"}
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
