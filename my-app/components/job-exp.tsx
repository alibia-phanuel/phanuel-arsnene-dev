"use client";

// Make sure to install animate.css: `npm install animate.css`
// Make sure to install react-icons: `npm install react-icons`
// Make sure to install react-country-flag: `npm install react-country-flag`
import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

const JobExp = () => {
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialiser isVisible avec la bonne taille en fonction des expériences
  useEffect(() => {
    setIsVisible(new Array(experiences.length).fill(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (entry.isIntersecting && index !== -1) {
            setIsVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2 } // Augmenter légèrement le seuil pour une meilleure détection
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const experiences = [
    // Votre tableau d'expériences reste inchangé
    {
      title: "Développement full-stack mobile",
      company: "FORTIBTECH",
      description:
        "En tant que développeur indépendant, je conçois des interfaces utilisateur modernes et performantes avec React Native et Expo, et je développe des API robustes avec Express.js pour répondre aux besoins spécifiques des entreprises et particuliers.",
      duration: "De avr. 2025 à aujourd’hui ·",
      country: "France",
      countryCode: "FR",
      workArrangement: "· À distance",
      socialLinks: {
        linkedin:
          "https://www.linkedin.com/company/fortibtech/posts/?feedView=all",
        instagram: "https://www.instagram.com/fortibtech?igsh=eXh1eXVwbnkzM2sz",
      },
    },
    {
      title: "Développeur Web & Mobile Freelance",
      company: "Chris Gargo Internationale",
      description:
        "Développement d’une première version d’un SaaS pour la gestion de l’import/export de colis entre la Chine et l’Afrique. La solution a été développée pour l’entreprise et est en cours d’amélioration pour intégrer un système d’abonnement destiné à d’autres clients (multi-plateforme : web et mobile).",
      duration: "Août. 2025 - novembre. 2025 · 4 mois",
      country: "Chine",
      countryCode: "CN",
      workArrangement: "À distance · Freelance",
      socialLinks: {
        facebook: "https://www.facebook.com/profile.php?id=100078607974251",
      },
    },
    {
      title: "Développeur Web Freelance",
      company: "Client privé (projet personnel)",
      description:
        "Développement d'une application de planification et de gestion de budget (front-end Next.js, back-end Express.js). Projet réalisé à distance sur 3 mois. Témoignage disponible dans la section Témoignages.",
      duration: "Mai. 2025 - Juil. 2025 · 3 mois",
      country: "Canada",
      countryCode: "CA",
      workArrangement: "À distance · Freelance",
      socialLinks: {
        facebook: "https://www.facebook.com/karine.chahbi",
      },
    },

    {
      title: "Développeur Fullstack Freelance",
      company: "Tout a un Prix",
      description:
        "Développement d’une application Web (Next.js) et Mobile (React Native) pour automatiser la gestion des prospects Facebook avec réponses automatiques sur WhatsApp. Backend Express.js avec MySQL (Sequelize). Projet réalisé à distance sur 2 mois.",
      duration: "Juil. 2025 - Sep. 2025 · 2 mois",
      country: "Cameroun",
      countryCode: "CM",
      workArrangement: "À distance · Freelance",
      socialLinks: {
        facebook: "https://www.facebook.com/profile.php?id=100064194244599",
      },
    },
    {
      title: "Front-End Developer",
      company: "La Passerrel",
      description:
        "Création d'une landing page moderne et responsive, visible sur mobile (iOS & Android). Mission réalisée en collaboration avec l'équipe de La Passerrel à distance, en mettant l’accent sur le design et l’expérience utilisateur.",
      duration: "Aout-sept. 2025 - 1 mois",
      country: "Cameroun",
      countryCode: "CM",
      workArrangement: "À distance · Freelance",
      socialLinks: {
        facebook: "https://la-passerelle.co/",
      },
    },
    {
      title: "Front-End Developer",
      company: "IS Dev Experts S.A.S",
      description:
        "En tant qu’employé, j’ai participé au développement d’applications web et mobiles front-end, en concevant et implémentant des interfaces interactives et en intégrant les données via des API fiables.",
      duration: "janv. 2024 - mars. 2025 · 1 an 3 mois",
      country: "Cameroun",
      countryCode: "CM",
      workArrangement: "Hybride · Temps plein",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/isdevexperts/",
      },
    },
    {
      title: "Technicien Informatique ",
      company: "General Stores Sarl",
      description:
        "Maintenance et réparation de matériel informatique (PC, périphériques) et support technique aux utilisateurs pour assurer le bon fonctionnement des équipements informatiques.",
      duration: "Aout 2021 - Sept 2022",
      country: "Cameroun",
      countryCode: "CM",
      workArrangement: "Au bureau · Temps plein 1 an",
      socialLinks: {
        facebook: "https://www.facebook.com/generalstores.net/",
      },
    },
    {
      title: "Fondateur & Développeur",
      company: "Alibia Tech",
      description:
        "Projet personnel professionnel visant à renforcer mes compétences en développement web et mobile, communication et marketing. Conception et développement d’applications, gestion de la stratégie de communication et supervision de la croissance du projet.",
      duration: "janv. 2020 - aujourd’hui · 5 ans 9 mois",
      country: "Cameroun",
      countryCode: "CM",
      workArrangement: "Indépendant",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/phanuel-tsopze-8a33a52a4/",
        facebook: "https://www.facebook.com/alibia2023/",
      },
    },
  ];

  return (
    <div className="py-12 bg-[#010104]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Mes Expériences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el; // Assigner la référence pour chaque carte
              }}
              className={`bg-gray-900 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isVisible[index]
                  ? "animate__animated animate__fadeInUp"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-2">
                <ReactCountryFlag
                  countryCode={exp.countryCode}
                  svg
                  style={{
                    width: "2rem",
                    height: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                  title={exp.country}
                />
                <h3 className="text-xl font-semibold text-white">
                  {exp.title}
                </h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">{exp.company}</p>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                <span>{exp.country}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <FaBriefcase className="w-4 h-4 mr-1" />
                <span>{exp.workArrangement}</span>
              </div>
              <div className="flex space-x-4 mb-4">
                {exp.socialLinks.linkedin && (
                  <a
                    href={exp.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`LinkedIn de ${exp.company}`}
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {exp.socialLinks.facebook && (
                  <a
                    href={exp.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Facebook de ${exp.company}`}
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                )}
                {exp.socialLinks.instagram && (
                  <a
                    href={exp.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Instagram de ${exp.company}`}
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-400">{exp.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobExp;
