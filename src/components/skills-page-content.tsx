"use client";

import { useEffect, useMemo, useState } from "react";
import { FadeIn } from "@/components/motion-wrapper";
import { SkillCard } from "@/components/skill-card";
import { Input } from "@/components/ui/input";
import {
  countVisibleSkills,
  filterSkillCategories,
  isSkillsFilterActive,
  skillCategoryOptions,
  skillLevelOptions,
  type SkillCategoryFilter,
  type SkillLevel,
} from "@/lib/skills-filter";
import { skillCategories } from "@/lib/skills-data";
import { cn } from "@/lib/utils";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-border bg-accent text-foreground"
          : "border-border/50 bg-card/50 text-muted-foreground hover:border-border hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function toggleSetValue<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

function SkillsSearchEmptyState({
  query,
  levels,
  categories,
  onClear,
}: {
  query: string;
  levels: Set<SkillLevel>;
  categories: Set<SkillCategoryFilter>;
  onClear: () => void;
}) {
  const trimmedQuery = query.trim();
  const activeLevelLabels = skillLevelOptions
    .filter(({ value }) => levels.has(value))
    .map(({ label }) => label);
  const activeCategoryLabels = skillCategoryOptions
    .filter(({ value }) => categories.has(value))
    .map(({ label }) => label);

  return (
    <FadeIn>
      <div
        className="rounded-2xl border border-border/50 bg-card/50 px-6 py-12 text-center sm:px-10 sm:py-14"
        role="status"
        aria-live="polite"
        data-skills-search-empty
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <h2 className="mt-5 text-lg font-semibold tracking-tight">
          No skills found
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {trimmedQuery ? (
            <>
              Nothing matched{" "}
              <span className="font-medium text-foreground">&ldquo;{trimmedQuery}&rdquo;</span>
              {(activeLevelLabels.length > 0 || activeCategoryLabels.length > 0) &&
                " with your current filters"}
              . Try a different search term or adjust your filters.
            </>
          ) : (
            <>No skills match your current filters. Try removing a filter or clear everything to see all skills.</>
          )}
        </p>
        {(activeLevelLabels.length > 0 || activeCategoryLabels.length > 0) && (
          <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
            {activeLevelLabels.map((label) => (
              <span
                key={`level-${label}`}
                className="rounded-lg border border-border/50 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {label}
              </span>
            ))}
            {activeCategoryLabels.map((label) => (
              <span
                key={`category-${label}`}
                className="rounded-lg border border-border/50 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onClear}
          className="mt-6 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          Clear search and filters
        </button>
      </div>
    </FadeIn>
  );
}

export function SkillsPageContent() {
  const [query, setQuery] = useState("");
  const [levels, setLevels] = useState<Set<SkillLevel>>(new Set());
  const [categories, setCategories] = useState<Set<SkillCategoryFilter>>(new Set());

  const filterState = useMemo(
    () => ({ query, levels, categories }),
    [query, levels, categories]
  );

  const filteredCategories = useMemo(
    () => filterSkillCategories(skillCategories, filterState),
    [filterState]
  );

  const filtering = isSkillsFilterActive(filterState);
  const visibleCount = countVisibleSkills(filteredCategories);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [filteredCategories, filtering, visibleCount]);

  const clearFilters = () => {
    setQuery("");
    setLevels(new Set());
    setCategories(new Set());
  };

  return (
    <div className="container-width space-y-16">
      <FadeIn>
        <div className="space-y-6" data-skills-intro>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Skills
          </span>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Tools &amp; technologies
            </h1>

            <div className="relative w-full shrink-0 sm:mt-1 sm:w-72 lg:w-80">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search skills…"
                aria-label="Search skills"
                className="h-10 border-border/50 bg-card/50 pl-10 text-sm shadow-none placeholder:text-muted-foreground/80"
              />
            </div>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A comprehensive overview of the technologies I&apos;m learning and using to
            build modern web applications.
          </p>

          <div
            className="space-y-3 rounded-2xl border border-border/50 bg-card/50 p-4 sm:p-5"
            data-skills-filter-panel
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Level
              </span>
              {skillLevelOptions.map(({ value, label }) => (
                <FilterChip
                  key={value}
                  label={label}
                  active={levels.has(value)}
                  onClick={() => setLevels((current) => toggleSetValue(current, value))}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Category
              </span>
              {skillCategoryOptions.map(({ value, label }) => (
                <FilterChip
                  key={value}
                  label={label}
                  active={categories.has(value)}
                  onClick={() =>
                    setCategories((current) => toggleSetValue(current, value))
                  }
                />
              ))}
            </div>
            {filtering && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {visibleCount === 0
                    ? "No skills match your search."
                    : `${visibleCount} skill${visibleCount === 1 ? "" : "s"} shown`}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {filtering && visibleCount === 0 ? (
        <SkillsSearchEmptyState
          query={query}
          levels={levels}
          categories={categories}
          onClear={clearFilters}
        />
      ) : (
        filteredCategories.map((category) => (
          <section key={category.title} className="space-y-8">
            <FadeIn>
              <div className="space-y-2" data-skills-category-heading>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} showProjectExample />
              ))}
            </div>
          </section>
        ))
      )}

      <div
        data-skills-bottom-spacer
        className="min-h-24 sm:min-h-28"
        aria-hidden="true"
      />
    </div>
  );
}
