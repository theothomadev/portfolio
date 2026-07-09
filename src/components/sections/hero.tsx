"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion-wrapper";
import { HeroBackground } from "@/components/hero-background";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/typing-text";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-x-hidden">
      <HeroBackground />

      <div className="container-width section-padding w-full !pb-16 !pt-0">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-8 text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              Available for opportunities
            </span>
          </Reveal>

          <Reveal
            as="h1"
            className="w-full max-w-none"
            delay={0.1}
            aria-label={siteConfig.name}
          >
            <TypingText text={siteConfig.name} variant="display" startDelay={0} />
          </Reveal>

          <Reveal as="p" className="text-xl font-medium text-muted-foreground sm:text-2xl" delay={0.2}>
            {siteConfig.role}
          </Reveal>

          <Reveal as="p" className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg" delay={0.3}>
            {siteConfig.tagline}
          </Reveal>

          <Reveal className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row" delay={0.4}>
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
