import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { learningJourney } from "@/lib/learning-data";

export function LearningJourney() {
  return (
    <section className="section-padding border-t border-border/50">
      <div className="container-width space-y-12">
        <FadeIn>
          <SectionHeader
            label="Journey"
            title="Learning & growth"
            description="Every project is a step forward. Here's how my development journey has unfolded."
          />
        </FadeIn>

        <StaggerContainer className="relative space-y-0">
          {/* Timeline line */}
          <div
            className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block"
            aria-hidden="true"
          />

          {learningJourney.map((milestone, index) => (
            <StaggerItem key={milestone.year + milestone.title}>
              <div className="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                    {index === learningJourney.length - 1 ? "→" : milestone.year.slice(2)}
                  </div>
                </div>
                <div className="flex-1 space-y-2 rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-border">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
