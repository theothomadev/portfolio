import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { createMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects-data";
import {
  filterProjectsByTechnology,
  resolveProjectTechnologyParam,
} from "@/lib/skill-project-links";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: `Browse projects by ${siteConfig.name} — web applications, dashboards, and experiments built with modern technologies.`,
  path: "/projects",
});

interface ProjectsPageProps {
  searchParams: Promise<{ tech?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { tech: techParam } = await searchParams;
  const activeTechnology = resolveProjectTechnologyParam(techParam);
  const visibleProjects = activeTechnology
    ? filterProjectsByTechnology(activeTechnology)
    : projects;

  return (
    <PageTransition>
      <div className="section-padding header-offset">
        <div className="container-width space-y-12">
          <FadeIn>
            {activeTechnology ? (
              <div className="space-y-4">
                <SectionHeader
                  label="Projects"
                  title={`Projects using ${activeTechnology}`}
                  description={`Showing projects that include ${activeTechnology} in their tech stack.`}
                />
                <Link
                  href="/projects"
                  className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all projects
                </Link>
              </div>
            ) : (
              <SectionHeader
                label="Projects"
                title="Things I've built"
                description="A collection of projects that reflect my learning journey — from first experiments to polished applications."
              />
            )}
          </FadeIn>

          {visibleProjects.length === 0 ? (
            <FadeIn>
              <div
                className="rounded-2xl border border-border/50 bg-card/50 px-6 py-12 text-center"
                role="status"
              >
                <p className="text-muted-foreground">
                  No projects found for{" "}
                  <span className="font-medium text-foreground">
                    {techParam ?? "this technology"}
                  </span>
                  .
                </p>
                <Link
                  href="/projects"
                  className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  View all projects
                </Link>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-6 md:grid-cols-2">
              {visibleProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
