import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCTA } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { SkillsPreview } from "@/components/sections/skills-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <FeaturedProjects />
      <Experience />
      <ContactCTA />
    </>
  );
}
