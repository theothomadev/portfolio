import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FadeIn } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 px-8 py-16 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-foreground/[0.02] via-transparent to-foreground/[0.04] dark:from-foreground/[0.04] dark:to-foreground/[0.08]"
              aria-hidden="true"
            />

            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Let&apos;s build something together
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                I&apos;m open to internships, graduate roles, apprenticeships, and
                junior developer opportunities. I&apos;d love to hear from you.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
