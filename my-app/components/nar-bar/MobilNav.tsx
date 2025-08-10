import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
type Props = {
  showNav: boolean;
  closeNav: () => void;
};

/*******  1b935ba7-23a1-4a90-8acb-967340d26361  *******/
const MobilNav = ({ showNav, closeNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-full";
  return (
    <div>
      {/* backdrop */}
      <div
        className={`fixed insert-0 ${navOpen} transform transition-all right-0 duration-500 z-[10002] bg-black opacity-70 w-full h-screen`}
      ></div>
      {/* navlinks */}
      <div
        className={`text-white gap-16 fixed justify-center ${navOpen} flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-cyan-800 z-[10003] right-0`}
      >
        {NavLinks.map((link) => (
          <div key={link.id}>
            <Link
              href={link.url}
              className="text-white  w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]"
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
