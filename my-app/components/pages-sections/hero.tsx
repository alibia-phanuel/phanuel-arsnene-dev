"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import ParticlesHero from "./ParticleBackground";

const Hero = () => {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden text-white">
      <ParticlesHero />

      <div className="relative z-10 flex flex-col items-center px-4">
        <Image
          src="/phanuel.jpg"
          alt="Phanuel Arsene"
          width={150}
          height={150}
          className="rounded-full border-8 border-[#0c0c4a]"
        />

        <h1 className="mt-6 text-center text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {" "}
          Développeur Full-Stack & IA <br />{" "}
          <span className="relative top-3 text-cyan-200 text-2xl sm:text-4xl">
            {" "}
            Web • Mobile • SaaS • Automatisation{" "}
          </span>{" "}
        </h1>
        <p className="mt-12 max-w-4xl text-center text-base leading-relaxed sm:text-xl md:text-2xl">
          {" "}
          Salut, je suis{" "}
          <strong className="text-cyan-200">Phanuel Arsene</strong>. J&apos;aide
          les entreprises, startups et particuliers à{" "}
          <span className="inline-block text-cyan-200">
            {" "}
            <Typewriter
              options={{
                strings: [
                  "transformer une idée en application",
                  "créer des applications Web & Mobile",
                  "développer des plateformes SaaS",
                  "intégrer l'IA dans leurs applications",
                  "automatiser leurs processus métier",
                  "digitaliser leur activité",
                  "créer des outils adaptés à leurs besoins",
                ],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 35,
              }}
            />{" "}
          </span>{" "}
        </p>

        <div className="mt-10 flex space-x-8 text-3xl text-cyan-200">
          <a
            href="https://github.com/alibia-phanuel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-cyan-400"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/phanuel-tsopze-8a33a52a4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-cyan-400"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
