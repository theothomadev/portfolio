import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ExternalLink, GraduationCap, Heart, Target, User } from "lucide-react";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { workExperience } from "@/lib/experience-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name} — background, journey into web development, education, goals, and interests.`,
  path: "/about",
});

const aboutSections = [
  {
    icon: User,
    title: "Introduction",
    content: `Hi, I'm ${siteConfig.name} — a web developer based in the UK with a passion for building clean, accessible, and performant websites. I combine a design-conscious mindset with a growing technical skill set to create digital experiences that feel polished and purposeful.`,
  },
  {
    icon: GraduationCap,
    title: "Journey into Web Development",
    content:
      "My path into web development began with a simple question: how do websites work? What started as experimenting with HTML and CSS quickly grew into a deep interest in JavaScript, React, and the entire modern web ecosystem. I've since built multiple projects — from API-driven dashboards to full-stack Next.js applications — each one teaching me something new.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    content:
      "I'm actively building my skills through a combination of self-directed learning, online courses, and hands-on project work. I focus on understanding fundamentals deeply before moving to advanced topics, ensuring a solid foundation in computer science concepts, web standards, and software engineering best practices.",
  },
  {
    icon: Target,
    title: "Goals",
    content:
      "My goal is to land a role as a junior web developer where I can contribute to meaningful projects while continuing to grow. I'm particularly interested in frontend development, design systems, and building products that prioritise user experience. Long term, I aim to become a well-rounded full-stack developer.",
  },
  {
    icon: Heart,
    title: "Interests",
    content:
      "Outside of coding, I enjoy exploring UI/UX design trends, contributing to open-source projects, and staying up to date with the latest in web technology. I'm fascinated by how companies like Vercel, Linear, and Stripe approach design and engineering — and I draw inspiration from their attention to craft.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="section-padding !pt-28 sm:!pt-32">
        <div className="container-width space-y-16">
          <FadeIn>
            <SectionHeader
              label="About Me"
              title={`Hi, I'm ${siteConfig.name.split(" ")[0]}`}
              description={siteConfig.tagline}
            />
          </FadeIn>

          <FadeIn>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Work Experience
                  </h2>
                </div>

                {workExperience.map((entry) => (
                  <article key={entry.company} className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold">{entry.role}</h3>
                        <p className="text-sm font-medium text-foreground/90">
                          {entry.company}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.period}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{entry.location}</span>
                      <Link
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        dontpanicprojects.com
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>

                    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </CardContent>
            </Card>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {aboutSections.map((section) => (
              <StaggerItem key={section.title}>
                <Card className="h-full border-border/50 bg-card/50 transition-colors hover:border-border">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <section.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
