import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCTA } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { LearningJourney } from "@/components/sections/learning-journey";
import { SkillsPreview } from "@/components/sections/skills-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <FeaturedProjects />
      <LearningJourney />
      <ContactCTA />
    </>
  );
}
