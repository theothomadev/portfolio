import type { Metadata } from "next";
import { GraduationCap, Heart, Target, User } from "lucide-react";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
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
    content: `Hi, I'm ${siteConfig.name} — an aspiring web developer based in the UK with a passion for building clean, accessible, and performant websites. I combine a design-conscious mindset with a growing technical skill set to create digital experiences that feel polished and purposeful.`,
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
