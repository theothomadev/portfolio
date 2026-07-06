export interface Skill {
  name: string;
  description: string;
  level: "learning" | "intermediate" | "proficient";
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Building beautiful, responsive user interfaces",
    skills: [
      {
        name: "HTML",
        description: "Semantic markup and accessible web structure",
        level: "proficient",
      },
      {
        name: "CSS",
        description: "Modern layouts, animations, and responsive design",
        level: "proficient",
      },
      {
        name: "JavaScript",
        description: "Dynamic interactivity and DOM manipulation",
        level: "intermediate",
      },
      {
        name: "TypeScript",
        description: "Type-safe JavaScript for scalable applications",
        level: "intermediate",
      },
      {
        name: "React",
        description: "Component-based UI development",
        level: "intermediate",
      },
      {
        name: "Next.js",
        description: "Full-stack React framework with App Router",
        level: "intermediate",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS for rapid UI development",
        level: "proficient",
      },
    ],
  },
  {
    title: "Backend",
    description: "Server-side logic and API development",
    skills: [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side applications",
        level: "learning",
      },
      {
        name: "Express",
        description: "Minimal web framework for Node.js APIs",
        level: "learning",
      },
      {
        name: "REST APIs",
        description: "Designing and consuming RESTful endpoints",
        level: "intermediate",
      },
    ],
  },
  {
    title: "Tools",
    description: "Development workflow and collaboration",
    skills: [
      {
        name: "Git",
        description: "Version control and branching strategies",
        level: "intermediate",
      },
      {
        name: "GitHub",
        description: "Code hosting, collaboration, and CI/CD",
        level: "intermediate",
      },
      {
        name: "VS Code",
        description: "Primary code editor with extensions",
        level: "proficient",
      },
      {
        name: "Figma",
        description: "UI/UX design and prototyping",
        level: "learning",
      },
      {
        name: "Vercel",
        description: "Deployment and hosting platform",
        level: "intermediate",
      },
    ],
  },
];

export const levelLabels: Record<Skill["level"], string> = {
  learning: "Learning",
  intermediate: "Intermediate",
  proficient: "Proficient",
};

export const levelColors: Record<Skill["level"], string> = {
  learning: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  proficient: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};
