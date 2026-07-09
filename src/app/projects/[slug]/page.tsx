import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Lightbulb } from "lucide-react";
import { FadeIn, PageTransition } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects-data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    image: project.image,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <PageTransition>
      <article className="section-padding header-offset">
        <div className="container-width space-y-12">
          <FadeIn>
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to projects
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.1}>
            <header className="mx-auto max-w-3xl space-y-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Badge variant="muted">{project.year}</Badge>
                {project.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.longDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Button asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </header>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-muted">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card className="mx-auto max-w-3xl border-border/50 bg-card/50">
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <Lightbulb
                      className="h-5 w-5 text-amber-500"
                      aria-label="Lessons learned icon"
                    />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Lessons Learned
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.lessonsLearned.map((lesson) => (
                    <li
                      key={lesson}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </article>
    </PageTransition>
  );
}
