import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Skill } from "@/lib/skills-data";
import { levelColors, levelLabels } from "@/lib/skills-data";
import { getSkillProjectExampleHref } from "@/lib/skill-project-links";
import {
  getSkillIconRotation,
  skillIconColors,
  skillIcons,
} from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  className?: string;
  showProjectExample?: boolean;
}

function SkillIconBackdrop({ skillName }: { skillName: string }) {
  const Icon = skillIcons[skillName];
  const color = skillIconColors[skillName];

  if (!Icon) {
    return null;
  }

  const rotation = getSkillIconRotation(skillName);
  const useForeground = color === "#FFFFFF";

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-0 w-2/5 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -bottom-4 -right-2 transition-transform duration-500 ease-out",
          "group-hover:-bottom-1 group-hover:-right-0 group-hover:scale-[1.18]"
        )}
      >
        <Icon
          aria-label={`${skillName} icon`}
          className={cn(
            "h-[5.75rem] w-[5.75rem] opacity-[0.12] transition-[opacity,filter] duration-500 ease-out",
            "group-hover:opacity-[0.38] group-hover:drop-shadow-[0_0_18px_currentColor]",
            useForeground && "text-foreground"
          )}
          style={{
            color: useForeground ? undefined : color,
            rotate: `${rotation}deg`,
          }}
        />
      </div>
    </div>
  );
}

export function SkillCard({
  skill,
  className,
  showProjectExample = false,
}: SkillCardProps) {
  const exampleHref = showProjectExample
    ? getSkillProjectExampleHref(skill.name)
    : null;

  return (
    <Card
      data-skill-card
      className={cn(
        "group relative overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <SkillIconBackdrop skillName={skill.name} />
      <CardContent className="relative z-10 flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 flex-1 font-semibold leading-none tracking-tight">
            {skill.name}
          </h3>
          <div className="relative z-20 flex shrink-0 items-center gap-1">
            <Badge
              variant="outline"
              className={cn(
                "inline-flex h-5 shrink-0 items-center px-1.5 py-0 text-[9px] leading-none uppercase tracking-wide",
                levelColors[skill.level]
              )}
            >
              {levelLabels[skill.level]}
            </Badge>
            {exampleHref ? (
              <Link
                href={exampleHref}
                className="inline-flex shrink-0 items-center leading-none"
              >
                <Badge
                  variant="outline"
                  className="inline-flex h-5 shrink-0 items-center border-[#6495ED]/55 bg-[#6495ED]/20 px-1.5 py-0 text-[9px] font-semibold leading-none uppercase tracking-[0.12em] text-[#2f5fb0] transition-colors hover:border-[#6495ED]/70 hover:bg-[#6495ED]/30 dark:border-[#ADD8E6]/50 dark:bg-[#ADD8E6]/18 dark:text-[#d8ecf7] dark:hover:border-[#ADD8E6]/65 dark:hover:bg-[#ADD8E6]/28"
                >
                  View example
                </Badge>
              </Link>
            ) : null}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>
      </CardContent>
    </Card>
  );
}
