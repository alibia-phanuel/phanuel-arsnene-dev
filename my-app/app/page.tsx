import Hero from "@/components/pages-sections/hero";
import Competences from "@/components/competences";
import SoftSkills from "@/components/SoftSkills";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
// https://www.youtube.com/watch?v=_ZkpvMjX9O8
export default function Home() {
  return (
    <div className="overflow-hidden ">
      <Hero />
      <Competences />
      <SoftSkills />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
