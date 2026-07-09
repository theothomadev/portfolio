import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Skill } from "@/lib/skills-data";
import { levelColors, levelLabels } from "@/lib/skills-data";
import {
  getSkillIconRotation,
  skillIconColors,
  skillIcons,
} from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  className?: string;
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

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <SkillIconBackdrop skillName={skill.name} />
      <CardContent className="relative z-10 flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-semibold tracking-tight">{skill.name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "relative z-20 shrink-0 text-[10px] uppercase tracking-wide",
              levelColors[skill.level]
            )}
          >
            {levelLabels[skill.level]}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>
      </CardContent>
    </Card>
  );
}
