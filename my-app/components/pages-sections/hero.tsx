"use client";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

import Image from "next/image";
import Typewriter from "typewriter-effect";
import ParticlesHero from "./ParticleBackground";
const Hero = () => {
  return (
    <div className="text-white relative h-screen  items-center justify-center overflow-hidden flex">
      <ParticlesHero />
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/phanuel.jpg"
          alt="Phanuel Arsene - développeur full-stack"
          width={150}
          height={150}
          className="rounded-full border-8 border-[#0c0c4a]"
        />
        <h1 className="text-2xl my-2 sm:text-4xl md:text-5xl lg:text-6xl text-center">
          – Développeur – <br />
          <span className="text-cyan-200  relative top-4">
            JavaScript | TypeScript | Node.js | IA
          </span>
        </h1>
        <h2 className="mt-5 text-sm px-2 text-center sm:text-2xl font-medium flex items-center justify-center flex-wrap">
          Salut, je suis{" "}
          <strong className="text-cyan-200 px-2">Phanuel Arsene</strong>,
          spécialiste en&nbsp;
          <span className="text-cyan-200 pl-2 whitespace-nowrap">
            <Typewriter
              options={{
                strings: [
                  "React",
                  "Next.js",
                  "express",
                  "wix studio",
                  // "Intégration IA & automatisation",
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                wrapperClassName: "",
              }}
            />
          </span>
        </h2>
        <div className="mt-6 flex space-x-8 text-cyan-200 text-3xl">
          <a
            href="https://facebook.com/phanuelarsene"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-cyan-400 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/alibia-phanuel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-cyan-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/phanuel-tsopze-8a33a52a4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-cyan-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
