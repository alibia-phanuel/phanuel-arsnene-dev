"use client";

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // Import de l'icône WhatsApp

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Client",
    feedback:
      "Alibia a livré notre projet à temps avec une qualité exceptionnelle. Toujours à l'écoute et force de proposition.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+237600000001",
    whatsapp: "+237600000001", // Numéro WhatsApp ajouté
    facebook: "https://facebook.com/jeandupont",
    countryCode: "fr", // 🇫🇷 France
  },
  {
    name: "Sarah Ndiaye",
    role: "Collègue",
    feedback:
      "Travailler avec Alibia est un vrai plaisir. Son organisation et sa capacité à résoudre les problèmes sont remarquables.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    phone: "+237600000002",
    whatsapp: "+237600000002",
    facebook: "https://facebook.com/sarahndiaye",
    countryCode: "sn", // 🇸🇳 Sénégal
  },
  {
    name: "Mohamed Traoré",
    role: "Client",
    feedback:
      "Toujours professionnel, réactif et passionné. Je recommande vivement Alibia pour tout projet tech.",
    photo: "https://randomuser.me/api/portraits/men/74.jpg",
    phone: "+237600000003",
    whatsapp: "+237600000003",
    facebook: "https://facebook.com/mohamedtraore",
    countryCode: "ml", // 🇲🇱 Mali
  },
  {
    name: "Laura Bemba",
    role: "Cheffe de projet",
    feedback:
      "Son sens du travail en équipe est exceptionnel. Il sait motiver et guider tout le monde.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+237600000004",
    whatsapp: "+237600000004",
    facebook: "https://facebook.com/laurabemba",
    countryCode: "cm", // 🇨🇲 Cameroun
  },
  {
    name: "Ali N’Guessan",
    role: "Client",
    feedback:
      "Professionnalisme et vision long terme, j’ai beaucoup appris grâce à ce projet.",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    phone: "+237600000005",
    whatsapp: "+237600000005",
    facebook: "https://facebook.com/alignuessan",
    countryCode: "ci", // 🇨🇮 Côte d’Ivoire
  },
  {
    name: "Cynthia Mbarga",
    role: "Partenaire",
    feedback:
      "Toujours dans une logique d’innovation et de partage. Collaboration agréable.",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    phone: "+237600000006",
    whatsapp: "+237600000006",
    facebook: "https://facebook.com/cynthiambarga",
    countryCode: "cm", // 🇨🇲 Cameroun
  },
  {
    name: "Pierre Tchatchoua",
    role: "Client",
    feedback:
      "Alibia a su comprendre mes besoins et livrer une solution robuste.",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    phone: "+237600000007",
    whatsapp: "+237600000007",
    facebook: "https://facebook.com/pierretchatchoua",
    countryCode: "cm", // 🇨🇲 Cameroun
  },
  {
    name: "Aminata Diallo",
    role: "Collègue",
    feedback:
      "Alibia est une personne de confiance, toujours prête à aider l’équipe.",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    phone: "+237600000008",
    whatsapp: "+237600000008",
    facebook: "https://facebook.com/aminatadiallo",
    countryCode: "gn", // 🇬🇳 Guinée
  },
  {
    name: "Joseph Etoundi",
    role: "Client",
    feedback: "Une grande maîtrise technique et une communication très claire.",
    photo: "https://randomuser.me/api/portraits/men/87.jpg",
    phone: "+237600000009",
    whatsapp: "+237600000009",
    facebook: "https://facebook.com/josephetoundi",
    countryCode: "cm", // 🇨🇲 Cameroun
  },
  {
    name: "Fatou Kane",
    role: "Partenaire",
    feedback:
      "Toujours orienté résultats, il ne lâche rien jusqu’à ce que ce soit parfait.",
    photo: "https://randomuser.me/api/portraits/women/91.jpg",
    phone: "+237600000010",
    whatsapp: "+237600000010",
    facebook: "https://facebook.com/fatoukane",
    countryCode: "sn", // 🇸🇳 Sénégal
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  // Fonction pour générer le lien WhatsApp avec un message par défaut
  const getWhatsAppUrl = (phone: string) => {
    const message = encodeURIComponent(
      `Bonjour ${testimonials[current].name}, je vous contacte concernant votre témoignage pour Alibia.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <section className="py-12 bg-[#010104] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Témoignages</h2>

        <div className="relative flex items-center">
          {/* Flèche gauche */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute -left-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Carte Témoignage */}
          <Card className="w-full bg-gray-900 border-gray-800 text-gray-300 transition-all duration-500 ease-in-out">
            <CardHeader className="flex flex-col items-center text-center">
              <img
                src={testimonials[current].photo}
                alt={testimonials[current].name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl text-white">
                  {testimonials[current].name}
                </CardTitle>
                <ReactCountryFlag
                  countryCode={testimonials[current].countryCode}
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />
              </div>
              <CardDescription className="text-gray-400">
                <p className="italic text-center">
                  “{testimonials[current].feedback}”
                </p>
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center gap-4">
              <a
                href={`tel:${testimonials[current].phone}`}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                <Phone className="w-4 h-4" /> Appeler
              </a>
              <a
                href={getWhatsAppUrl(testimonials[current].whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={testimonials[current].facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </a>
            </CardFooter>
          </Card>

          {/* Flèche droite */}
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute -right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
