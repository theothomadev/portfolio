import type { Metadata } from "next";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { SkillsPageShell } from "@/components/skills-page-shell";
import { createMetadata } from "@/lib/metadata";
import { skillCategories } from "@/lib/skills-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description: `Explore the technical skills and tools ${siteConfig.name} uses — frontend, backend, design, and development workflow.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <PageTransition>
      <SkillsPageShell>
        <div className="section-padding header-offset pb-32 sm:pb-44">
          <div className="container-width space-y-16">
            <FadeIn>
              <div data-skills-intro>
                <SectionHeader
                  label="Skills"
                  title="Tools & technologies"
                  description="A comprehensive overview of the technologies I'm learning and using to build modern web applications."
                />
              </div>
            </FadeIn>

            {skillCategories.map((category) => (
              <section key={category.title} className="space-y-8">
                <FadeIn>
                  <div className="space-y-2" data-skills-category-heading>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </FadeIn>

                <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <SkillCard skill={skill} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>
            ))}
          </div>
        </div>
      </SkillsPageShell>
    </PageTransition>
  );
}
