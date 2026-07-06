import type { Metadata } from "next";
import { PageTransition } from "@/components/motion-wrapper";
import { StatsLookup } from "@/components/rocket-league/stats-lookup";
import { SectionHeader } from "@/components/section-header";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Rocket League Stats",
  description:
    "Look up Rocket League player stats by username and platform via RapidAPI.",
  path: "/rocket-league",
});

export default function RocketLeaguePage() {
  return (
    <PageTransition>
      <div className="section-padding !pt-28 sm:!pt-32">
        <div className="container-width space-y-10">
          <SectionHeader
            label="Rocket League"
            title="Player stats lookup"
            description="Search any Rocket League player by username and platform to view ranks, MMR, and lifetime stats."
          />
          <StatsLookup />
        </div>
      </div>
    </PageTransition>
  );
}
