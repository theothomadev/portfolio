import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <SectionHeader
              label="About"
              title="Passionate about crafting thoughtful digital experiences"
              description="I'm an aspiring web developer with a keen eye for design and a drive to build accessible, performant websites. I believe great software sits at the intersection of clean code and intuitive user experience."
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8">
              <p className="leading-relaxed text-muted-foreground">
                My journey into web development started with curiosity — wanting to
                understand how the websites I used every day were built. That
                curiosity evolved into a genuine passion for creating things on
                the web.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Today, I focus on modern frontend technologies like React and
                Next.js, while continuously expanding my skills into backend
                development and design tools.
              </p>
              <Button variant="outline" asChild>
                <Link href="/about">
                  Learn more about me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
