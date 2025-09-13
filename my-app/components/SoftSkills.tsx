"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaCog,
  FaCompass,
  FaPeopleCarry,
} from "react-icons/fa";

const SoftSkills = () => {
  const softSkills = [
    {
      name: "Adaptabilité",
      icon: <FaCompass className="w-12 h-12 text-blue-400" />,
      description:
        "Capacité à évoluer rapidement entre différents environnements et technologies.",
    },
    {
      name: "Communication",
      icon: <FaHandshake className="w-12 h-12 text-green-400" />,
      description:
        "Échanges clairs et efficaces avec les clients, collègues et partenaires.",
    },
    {
      name: "Leadership",
      icon: <FaUsers className="w-12 h-12 text-yellow-400" />,
      description:
        "Coordination d'équipes et accompagnement des développeurs dans leurs missions.",
    },
    {
      name: "Travail en équipe",
      icon: <FaPeopleCarry className="w-12 h-12 text-pink-400" />,
      description:
        "Collaboration fluide avec des équipes multidisciplinaires pour atteindre des objectifs communs.",
    },
    {
      name: "Résolution de problèmes",
      icon: <FaCog className="w-12 h-12 text-gray-400" />,
      description:
        "Analyse rapide et mise en place de solutions concrètes face aux blocages.",
    },
    {
      name: "Vision long terme",
      icon: <FaLightbulb className="w-12 h-12 text-purple-400" />,
      description:
        "Anticipation et planification stratégique pour construire des projets durables.",
    },
  ];

  return (
    <div className="py-12 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Soft Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill, index) => (
            <Card
              key={index}
              className="bg-gray-900 border-gray-800 text-gray-300 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex justify-center">
                {skill.icon}
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-xl text-white mb-2">
                  {skill.name}
                </CardTitle>
                <p className="text-gray-300 text-sm">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;
