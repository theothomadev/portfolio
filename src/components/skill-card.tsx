import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Skill } from "@/lib/skills-data";
import { levelColors, levelLabels } from "@/lib/skills-data";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <Card
      className={cn(
        "group border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold tracking-tight">{skill.name}</h3>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-[10px] uppercase tracking-wide", levelColors[skill.level])}
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
