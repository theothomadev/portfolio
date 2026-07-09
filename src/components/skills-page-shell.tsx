"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { SkillsPageBackground } from "@/components/skills-page-background";

interface SkillsPageShellProps {
  children: ReactNode;
}

export function SkillsPageShell({ children }: SkillsPageShellProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="relative overflow-hidden" data-skills-page>
      <SkillsPageBackground pageRef={pageRef} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
