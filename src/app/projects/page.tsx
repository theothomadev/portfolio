import type { Metadata } from "next";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { createMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: `Browse projects by ${siteConfig.name} — web applications, dashboards, and experiments built with modern technologies.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="section-padding header-offset">
        <div className="container-width space-y-12">
          <FadeIn>
            <SectionHeader
              label="Projects"
              title="Things I've built"
              description="A collection of projects that reflect my learning journey — from first experiments to polished applications."
            />
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
