import { projects, type Project } from "@/lib/projects-data";

/** Skills whose name differs from the technology label shown on project cards */
const SKILL_TO_PROJECT_TECH: Record<string, string> = {
  "REST APIs": "REST API",
};

function normalizeTechnology(value: string): string {
  return value.trim().toLowerCase();
}

export function getAllProjectTechnologies(): string[] {
  const values = new Set<string>();
  for (const project of projects) {
    for (const technology of project.technologies) {
      values.add(technology);
    }
  }
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

export function getProjectTechnologyForSkill(skillName: string): string | null {
  const projectTechnologies = getAllProjectTechnologies();
  const normalizedProjectTech = new Map(
    projectTechnologies.map((tech) => [normalizeTechnology(tech), tech])
  );

  if (normalizedProjectTech.has(normalizeTechnology(skillName))) {
    return normalizedProjectTech.get(normalizeTechnology(skillName)) ?? null;
  }

  const alias = SKILL_TO_PROJECT_TECH[skillName];
  if (alias && normalizedProjectTech.has(normalizeTechnology(alias))) {
    return normalizedProjectTech.get(normalizeTechnology(alias)) ?? null;
  }

  return null;
}

export function skillHasProjectExample(skillName: string): boolean {
  return getProjectTechnologyForSkill(skillName) !== null;
}

export function getSkillProjectExampleHref(skillName: string): string | null {
  const technology = getProjectTechnologyForSkill(skillName);
  if (!technology) {
    return null;
  }

  return `/projects?tech=${encodeURIComponent(technology)}`;
}

export function filterProjectsByTechnology(technology: string): Project[] {
  const normalized = normalizeTechnology(technology);

  return projects.filter((project) =>
    project.technologies.some(
      (tech) => normalizeTechnology(tech) === normalized
    )
  );
}

export function resolveProjectTechnologyParam(
  technology: string | undefined
): string | null {
  if (!technology?.trim()) {
    return null;
  }

  const normalized = normalizeTechnology(technology);
  const match = getAllProjectTechnologies().find(
    (tech) => normalizeTechnology(tech) === normalized
  );

  return match ?? null;
}
