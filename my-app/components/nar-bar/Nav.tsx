"use client";

// Make sure to install animate.css: `npm install animate.css`
// Make sure to install react-icons: `npm install react-icons`
// Make sure to install shadcn/ui dialog and card: `npx shadcn-ui@latest add dialog card`
import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaFacebook, FaYoutube, FaGlobe } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BiShow } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import "animate.css";

type Props = {
  openNav: () => void;
};

export default function Nav({ openNav }: Props) {
  const [navBg, setNavBg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardAnimated, setIsCardAnimated] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      // Trigger initial animation when modal opens with a slight delay
      const timer = setTimeout(() => {
        setIsCardAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsCardAnimated(false);
      setScrollOffset(0); // Reset scroll offset when modal closes
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleModalScroll = () => {
      if (dialogContentRef.current) {
        const scrollTop = dialogContentRef.current.scrollTop;
        // Move card upward (max -50px) based on scroll, then ease back
        const offset = Math.min(scrollTop * 0.5, 50) * -1;
        setScrollOffset(offset);
      }
    };

    const dialogContent = dialogContentRef.current;
    if (dialogContent) {
      dialogContent.addEventListener("scroll", handleModalScroll);
    }

    return () => {
      if (dialogContent) {
        dialogContent.removeEventListener("scroll", handleModalScroll);
      }
    };
  }, [isModalOpen]);

  return (
    <div
      className={`transition-all ${
        navBg ? "bg-[#0f142ed9] shadow-md" : "fixed"
      } duration-200 h-[12vh] z-[10000] fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] mx-auto">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-col">
            <FaCode className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl hidden sm:block md:text-2xl text-white font-bold">
            Phanuel Arsene
          </h1>
        </div>
        {/* nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {NavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-white hover:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* button */}
        <div className="flex items-center space-x-4">
          <button
            className="px-8 py-3.5 text-sm cursor-pointer rounded-lg bg-blue-800 hover:bg-blue-600 transition-all duration-300 text-white flex items-center space-x-2"
            onClick={() => setIsModalOpen(true)}
          >
            <BiShow className="w-5 h-5" />
            <span>Voir projet personnel</span>
          </button>
        </div>
        {/* Burger Menu */}
        <HiBars3BottomRight
          onClick={openNav}
          className="w-8 h-8 cursor-pointer text-white lg:hidden"
        />
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="bg-gray-900 text-gray-300 max-w-3xl"
          ref={dialogContentRef}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-white text-center">
              Projet Personnel
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              👋 Bonjour, je suis Phanuel Arsène, développeur d’applications web
              et mobile passionné, avec plus de 3 ans de formation et plus d’un
              an d’expérience en entreprise. 🚀 J’ai acquis un solide
              savoir-faire en développement full-stack, couvrant aussi bien la
              création de sites web que le développement mobile performant. 📱
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Card
              className={`bg-gray-900 border-gray-800 text-gray-300 max-w-md w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isCardAnimated
                  ? "animate__animated animate__fadeInUp"
                  : "opacity-0"
              }`}
              style={{ transform: `translateY(${scrollOffset}px)` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-white">Alibia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Découvrez nos produits technologiques de qualité avec des
                  offres exclusives et un service client réactif. Une plateforme
                  complète incluant une page Facebook, un site e-commerce et une
                  chaîne YouTube, me permettant de rester à la pointe des
                  technologies et des bonnes pratiques. Ce projet m’a également
                  permis de développer des compétences en marketing digital et
                  communication.
                </p>
              </CardContent>
              <CardFooter className="flex justify-start space-x-4">
                <a
                  href="https://www.facebook.com/alibia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Page Facebook d'Alibia"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/alibia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Chaîne YouTube d'Alibia"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.alibia.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Site web d'Alibia"
                >
                  <FaGlobe className="w-5 h-5" />
                </a>
              </CardFooter>
              <CardFooter className="text-sm text-gray-400">
                Projet en cours, 2023 - Présent
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
