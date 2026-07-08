"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/typing-text";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Gaming-inspired background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ADD8E6] via-[#6495ED] to-[#0F52BA] opacity-[0.16] dark:opacity-[0.24]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ADD8E6_0%,transparent_65%)] opacity-[0.14] dark:opacity-[0.1]" />

        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-pixel-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="8"
                height="8"
                fill="#6495ED"
                fillOpacity="0.14"
              />
              <rect
                x="16"
                y="16"
                width="8"
                height="8"
                fill="#0F52BA"
                fillOpacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pixel-grid)" opacity="0.35" />
        </svg>

        <div className="absolute -left-6 top-24 opacity-[0.12] dark:opacity-[0.18]">
          <div className="grid grid-cols-3 gap-1">
            <div className="size-3 bg-[#6495ED]" />
            <div className="size-3 bg-[#ADD8E6]" />
            <div className="size-3 bg-[#0F52BA]" />
            <div className="size-3 bg-[#0F52BA]" />
            <div className="size-3 bg-[#6495ED]" />
          </div>
        </div>

        <div className="absolute -right-4 bottom-28 opacity-[0.12] dark:opacity-[0.18]">
          <div className="grid grid-cols-4 gap-1">
            <div className="size-2 bg-[#ADD8E6]" />
            <div className="size-2 bg-[#6495ED]" />
            <div className="size-2 bg-[#6495ED]" />
            <div className="size-2 bg-[#0F52BA]" />
            <div className="col-span-2 size-2 bg-[#0F52BA]" />
            <div className="size-2 bg-[#ADD8E6]" />
            <div className="size-2 bg-[#6495ED]" />
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6495ED] opacity-[0.08] blur-3xl" />
      </div>

      <div className="container-width section-padding w-full !pb-16 !pt-32 sm:!pt-36">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            aria-label={siteConfig.name}
          >
            <span aria-hidden="true">
              <TypingText text={siteConfig.name} />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl font-medium text-muted-foreground sm:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
