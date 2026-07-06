import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { workExperience } from "@/lib/experience-data";

export function Experience() {
  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width space-y-12">
        <FadeIn>
          <SectionHeader
            label="Experience"
            title="Work experience"
            description="Professional web development experience building and maintaining sites for live events and award brands."
          />
        </FadeIn>

        <StaggerContainer className="space-y-6">
          {workExperience.map((entry) => (
            <StaggerItem key={entry.company}>
              <article className="rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-border sm:p-8">
                <header className="space-y-3 border-b border-border/50 pb-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {entry.role}
                      </h3>
                      <p className="text-base font-medium text-foreground/90">
                        {entry.company}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {entry.period}
                    </p>
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
                </header>

                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
