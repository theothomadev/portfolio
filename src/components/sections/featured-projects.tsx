import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects-data";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width space-y-12">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              label="Projects"
              title="Featured work"
              description="Selected projects that showcase my approach to building modern web applications."
            />
            <Button variant="outline" asChild className="shrink-0">
              <Link href="/projects">
                View all projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} featured={index === 0} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
