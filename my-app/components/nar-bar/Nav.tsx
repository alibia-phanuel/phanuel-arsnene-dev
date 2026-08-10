// components/nar-bar/Nav.tsx
"use client";

import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaFacebook, FaYoutube, FaGlobe } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BiShow } from "react-icons/bi";

import "animate.css";

type Props = {
  openNav: () => void;
  activeSection: string;
};

export default function Nav({ openNav, activeSection }: Props) {
  const [navBg, setNavBg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardAnimated, setIsCardAnimated] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) setNavBg(true);
      else setNavBg(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsCardAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsCardAnimated(false);
      setScrollOffset(0);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleModalScroll = () => {
      if (dialogContentRef.current) {
        const scrollTop = dialogContentRef.current.scrollTop;
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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const targetId = url.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
              className={`text-white hover:text-gray-300 transition-colors ${
                activeSection === link.url.slice(1)
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : ""
              }`}
              onClick={(e) => handleLinkClick(e, link.url)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* button */}
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-blue-800 hover:bg-blue-600 transition-all duration-300 text-white flex items-center space-x-2"
            onClick={() => {
              window.open(
                "https://www.facebook.com/profile.php?id=61591538277996",
                "_blank",
                "noopener,noreferrer",
              );
            }}
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
    </div>
  );
}
