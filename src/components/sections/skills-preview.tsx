import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { SkillCard } from "@/components/skill-card";
import { Button } from "@/components/ui/button";
import { skillCategories } from "@/lib/skills-data";

export function SkillsPreview() {
  const previewSkills = skillCategories
    .flatMap((cat) => cat.skills)
    .slice(0, 6);

  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width space-y-12">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              label="Skills"
              title="Technologies I work with"
              description="A growing toolkit of frontend, backend, and development tools."
            />
            <Button variant="outline" asChild className="shrink-0">
              <Link href="/skills">
                View all skills
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewSkills.map((skill) => (
            <StaggerItem key={skill.name}>
              <SkillCard skill={skill} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
