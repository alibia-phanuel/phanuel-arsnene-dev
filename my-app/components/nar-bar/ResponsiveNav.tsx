"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import MobilNav from "./MobilNav";
const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      <Nav openNav={openNavHandler} />
      <MobilNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  );
};

export default ResponsiveNav;
