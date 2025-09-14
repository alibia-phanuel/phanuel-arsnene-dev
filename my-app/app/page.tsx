// app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/pages-sections/hero";
import Competences from "@/components/competences";
import SoftSkills from "@/components/SoftSkills";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import ResponsiveNav from "@/components/nar-bar/ResponsiveNav";
import Projets from "@/components/Projets";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<{
    [key: string]: HTMLElement | null;
  }>({
    accueil: null,
    competences: null,
    projets: null, // Ajout
    softSkills: null,
    temoignages: null,
    contact: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Déclenche quand 50% de la section est visible
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <ResponsiveNav activeSection={activeSection} />
      <div className="overflow-hidden">
        <section
          id="accueil"
          ref={(el) => {
            sectionRefs.current.accueil = el;
          }}
        >
          <Hero />
        </section>
        <section
          id="competences"
          ref={(el) => {
            sectionRefs.current.competences = el;
          }}
        >
          <Competences />
        </section>

        <section
          id="projets"
          ref={(el) => {
            sectionRefs.current.projets = el;
          }}
        >
          <Projets />
        </section>
        <section
          id="soft-skills"
          ref={(el) => {
            sectionRefs.current.softSkills = el;
          }}
        >
          <SoftSkills />
        </section>
        <section
          className="h"
          id="temoignages"
          ref={(el) => {
            sectionRefs.current.temoignages = el;
          }}
        >
          <Testimonials />
        </section>
        <section
          id="contact"
          ref={(el) => {
            sectionRefs.current.contact = el;
          }}
        >
          <ContactSection />
        </section>
      </div>
    </>
  );
}
