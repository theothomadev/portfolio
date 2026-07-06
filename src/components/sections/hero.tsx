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
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent blur-3xl dark:from-foreground/[0.06]" />
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
