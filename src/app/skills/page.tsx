import type { Metadata } from "next";
import { PageTransition } from "@/components/motion-wrapper";
import { SkillsPageContent } from "@/components/skills-page-content";
import { SkillsPageShell } from "@/components/skills-page-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Skills",
  description: `Explore the technical skills and tools ${siteConfig.name} uses — frontend, backend, design, and development workflow.`,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <PageTransition>
      <SkillsPageShell>
        <div className="section-padding header-offset pb-28 sm:pb-36">
          <SkillsPageContent />
        </div>
      </SkillsPageShell>
    </PageTransition>
  );
}
