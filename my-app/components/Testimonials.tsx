"use client";

import { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Phone, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const testimonials = [
  {
    name: "Karine Chahbi ",
    role: "Client",
    feedback:
      "Alibia a livré notre projet à temps avec une qualité exceptionnelle. Toujours à l'écoute et force de proposition.",
    photo: "/t1.jpg",
    phone: "+18196907992",
    whatsapp: "+18196907992",
    facebook: "https://www.facebook.com/karine.chahbi",
    countryCode: "ca", // 🇫🇷 canada
  },
  {
    name: "Christ Cargo International ",
    role: "Client",
    feedback:
      "Alibia a créé pour nous une appli de tracking de colis claire, efficace et fiable. Toujours réactif et professionnel.",
    photo: "/t2.jpg",
    phone: "+237698391185",
    whatsapp: "+237698391185",
    facebook: "https://www.facebook.com/profile.php?id=100078607974251",
    countryCode: "cm", // 🇸🇳 Sénégal
  },
  {
    name: "Daboufatou Ayatolla",
    role: "Client",
    feedback:
      "Toujours professionnel, réactif et passionné. Je recommande vivement Alibia pour tout projet tech.",
    photo: "/t3.jpg",
    phone: "+237 650701567",
    whatsapp: "+237 50701567",
    facebook: "https://www.facebook.com/profile.php?id=100064194244599",
    countryCode: "cm", // 🇲🇱 Mali
  },
  {
    name: "la passerelle",
    role: "Cheffe de projet",
    feedback:
      "Son sens du travail en équipe est exceptionnel. Il sait motiver et guider tout le monde.",
    photo: "/t4.jpg",
    phone: "+237691813478",
    whatsapp: "+237691813478",
    facebook:
      "https://www.facebook.com/people/La-Passerelle-corp/61566527031895",
    countryCode: "cm", // 🇨🇲 Cameroun
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Vérifier la taille initiale
    handleResize();

    // Ajouter un écouteur pour les redimensionnements
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  // Gestion du drag (souris)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const distance = currentX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDistance > 50) {
      prev();
    } else if (dragDistance < -50) {
      next();
    }
    setDragDistance(0);
  };

  // Gestion du swipe (tactile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const distance = currentX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDistance > 50) {
      prev();
    } else if (dragDistance < -50) {
      next();
    }
    setDragDistance(0);
  };

  // Fonction pour générer le lien WhatsApp avec un message par défaut
  const getWhatsAppUrl = (phone: string) => {
    const message = encodeURIComponent(
      `Bonjour ${testimonials[current].name}, je vous contacte concernant votre témoignage pour Alibia.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <section className="py-8 sm:py-12 bg-[#010104] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Témoignages
        </h2>

        <div className="relative flex flex-col items-center">
          {/* Flèche gauche */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {/* Carte Témoignage */}
          <Card
            ref={cardRef}
            className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] bg-gray-900 border-gray-800 text-gray-300 transition-all duration-500 ease-in-out select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(${dragDistance}px)`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <img
                src={testimonials[current].photo}
                alt={testimonials[current].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover"
              />
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg sm:text-xl text-white">
                  {testimonials[current].name}
                </CardTitle>
                <ReactCountryFlag
                  countryCode={testimonials[current].countryCode}
                  svg
                  style={{ width: "1.2em", height: "1.2em" }}
                />
              </div>
              <CardDescription className="text-gray-400 text-sm sm:text-base">
                <p className="italic text-center">
                  “{testimonials[current].feedback}”
                </p>
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center gap-2 sm:gap-4 flex-wrap">
              <a
                href={`tel:${testimonials[current].phone}`}
                className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" /> Appeler
              </a>
              <a
                href={getWhatsAppUrl(testimonials[current].whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition text-sm sm:text-base"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={testimonials[current].facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
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
            className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {/* Bulles indicateurs */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  index === current ? "bg-white" : "bg-gray-600"
                } transition-all duration-300`}
              ></div>
            ))}
          </div>

          {/* Message d'instruction */}
          <p className="mt-3 text-xs sm:text-sm text-gray-400 text-center">
            {isMobile
              ? "Swipez pour voir plus de témoignages"
              : "Glissez ou cliquez sur les flèches pour voir plus"}
          </p>
        </div>
      </div>
    </section>
  );
}
