import type { Skill, SkillCategory } from "@/lib/skills-data";

export type SkillLevel = Skill["level"];

export const skillLevelOptions: { value: SkillLevel; label: string }[] = [
  { value: "proficient", label: "Proficient" },
  { value: "intermediate", label: "Intermediate" },
  { value: "learning", label: "Learning" },
];

export const skillCategoryOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "tools", label: "Tools" },
] as const;

export type SkillCategoryFilter = (typeof skillCategoryOptions)[number]["value"];

export function categoryToSlug(title: string): SkillCategoryFilter {
  return title.toLowerCase() as SkillCategoryFilter;
}

export function parseSearchTerms(query: string): string[] {
  return query
    .split(/[,\s]+/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
}

export function skillMatchesSearchTerms(skill: Skill, terms: string[]): boolean {
  if (terms.length === 0) {
    return true;
  }

  const haystack = `${skill.name} ${skill.description}`.toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

export interface SkillsFilterState {
  query: string;
  levels: Set<SkillLevel>;
  categories: Set<SkillCategoryFilter>;
}

export function isSkillsFilterActive({
  query,
  levels,
  categories,
}: SkillsFilterState): boolean {
  return query.trim().length > 0 || levels.size > 0 || categories.size > 0;
}

export function filterSkillCategories(
  categories: SkillCategory[],
  { query, levels, categories: categoryFilters }: SkillsFilterState
): SkillCategory[] {
  const terms = parseSearchTerms(query);
  const filtering = isSkillsFilterActive({ query, levels, categories: categoryFilters });

  if (!filtering) {
    return categories;
  }

  return categories
    .map((category) => {
      const slug = categoryToSlug(category.title);

      if (categoryFilters.size > 0 && !categoryFilters.has(slug)) {
        return null;
      }

      const skills = category.skills.filter((skill) => {
        if (levels.size > 0 && !levels.has(skill.level)) {
          return false;
        }

        return skillMatchesSearchTerms(skill, terms);
      });

      if (skills.length === 0) {
        return null;
      }

      return { ...category, skills };
    })
    .filter((category): category is SkillCategory => category !== null);
}

export function countVisibleSkills(categories: SkillCategory[]): number {
  return categories.reduce((total, category) => total + category.skills.length, 0);
}
