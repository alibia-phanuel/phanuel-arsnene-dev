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
  const [isVisible, setIsVisible] = useState([false, false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
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
    {
      title: "Développeur Front-End",
      company: "TechCorp France",
      description:
        "Conception d'interfaces utilisateur dynamiques avec React et Next.js.",
      duration: "Jan 2023 - Présent",
      country: "France",
      countryCode: "FR",
      workArrangement: "Au bureau",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/techcorp-france",
        facebook: "https://www.facebook.com/techcorpfrance",
        instagram: "https://www.instagram.com/techcorpfrance",
      },
    },
    {
      title: "Stagiaire Développeur Web",
      company: "WebSolutions Canada",
      description:
        "Contribution à des projets web avec HTML, CSS et JavaScript.",
      duration: "Juin 2022 - Déc 2022",
      country: "Canada",
      countryCode: "CA",
      workArrangement: "Au bureau",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/websolutions-canada",
      },
    },
    {
      title: "Freelance UI/UX Designer",
      company: "DesignWorks UK",
      description:
        "Création de maquettes et prototypes pour applications mobiles.",
      duration: "Mar 2021 - Mai 2022",
      country: "Angleterre",
      countryCode: "GB",
      workArrangement: "Hybride",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/designworks-uk",
        instagram: "https://www.instagram.com/designworksuk",
      },
    },
    {
      title: "Assistant Développeur",
      company: "CodeBase Germany",
      description: "Support technique et maintenance de sites web.",
      duration: "Sep 2020 - Fév 2021",
      country: "Allemagne",
      countryCode: "DE",
      workArrangement: "À distance",
      socialLinks: {
        linkedin: "https://www.linkedin.com/company/codebase-germany",
        facebook: "https://www.facebook.com/codebasegermany",
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
                cardRefs.current[index] = el;
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
