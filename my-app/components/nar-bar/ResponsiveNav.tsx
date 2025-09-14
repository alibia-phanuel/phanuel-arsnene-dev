// components/nar-bar/ResponsiveNav.tsx
"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import MobilNav from "./MobilNav";

type Props = {
  activeSection: string; // Nouvelle prop
};

const ResponsiveNav = ({ activeSection }: Props) => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      <Nav openNav={openNavHandler} activeSection={activeSection} />
      <MobilNav
        showNav={showNav}
        closeNav={closeNavHandler}
        activeSection={activeSection}
      />
    </div>
  );
};

export default ResponsiveNav;
