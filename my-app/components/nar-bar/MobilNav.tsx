// components/nar-bar/MobilNav.tsx
import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";

type Props = {
  showNav: boolean;
  closeNav: () => void;
  activeSection: string;
};

const MobilNav = ({ showNav, closeNav, activeSection }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-full";

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const targetId = url.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      closeNav(); // Ferme le menu après le clic
    }
  };

  return (
    <div>
      {/* backdrop */}
      <div
        className={`fixed inset-0 ${navOpen} transform transition-all right-0 duration-500 z-[10002] bg-black opacity-70 w-full h-screen`}
      ></div>
      {/* navlinks */}
      <div
        className={`text-white gap-16 fixed justify-center ${navOpen} flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-cyan-800 z-[10003] right-0`}
      >
        {NavLinks.map((link) => (
          <div key={link.id}>
            <Link
              href={link.url}
              className={`text-white w-fit text-xl ml-12 border-b-[1.5px] pb-1 sm:text-[30px] ${
                activeSection === link.url.slice(1)
                  ? "text-blue-400 border-blue-400"
                  : "border-white"
              }`}
              onClick={(e) => handleLinkClick(e, link.url)}
            >
              {link.label}
            </Link>
          </div>
        ))}
        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[0.7rem] cursor-pointer sm:w-8 sm:h-8 w-6 h-6"
        />
      </div>
    </div>
  );
};

export default MobilNav;
