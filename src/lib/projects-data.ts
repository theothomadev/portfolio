export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  lessonsLearned: string[];
  image: string;
  year: string;
}

export const projects: Project[] = [
  {
    slug: "portfolio-website",
    title: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    longDescription:
      "This portfolio website showcases my work and skills as an aspiring web developer. Built with the latest web technologies, it features smooth animations, dark/light mode, and a fully responsive design optimised for performance and accessibility.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/theothomasabeng/portfolio",
    liveUrl: "https://theo-thomas-abeng.vercel.app",
    featured: true,
    lessonsLearned: [
      "Learned to structure a Next.js App Router project with clean component architecture",
      "Implemented theme switching with next-themes for seamless dark/light mode",
      "Gained experience with Framer Motion for subtle, performant animations",
      "Practised SEO best practices including metadata, sitemap, and Open Graph tags",
    ],
    image: "/projects/placeholder.svg",
    year: "2025",
  },
  {
    slug: "task-manager-app",
    title: "Task Manager",
    description:
      "A clean task management application with drag-and-drop functionality and local storage persistence.",
    longDescription:
      "A productivity-focused task manager that helps users organise their daily work. Features include task categorisation, priority levels, drag-and-drop reordering, and persistent storage using localStorage. The UI is designed for clarity and ease of use.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage"],
    githubUrl: "https://github.com/theothomasabeng/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
    featured: true,
    lessonsLearned: [
      "Implemented drag-and-drop with HTML5 Drag API",
      "Managed complex state with React hooks and context",
      "Designed a clean, intuitive UI focused on user experience",
      "Handled data persistence with browser localStorage",
    ],
    image: "/projects/placeholder.svg",
    year: "2025",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "A real-time weather dashboard fetching data from a public API with location search and forecasts.",
    longDescription:
      "An interactive weather dashboard that displays current conditions and multi-day forecasts for any location. Built by consuming a public weather API, it demonstrates async data fetching, error handling, and responsive data visualisation.",
    technologies: ["JavaScript", "HTML", "CSS", "REST API"],
    githubUrl: "https://github.com/theothomasabeng/weather-dashboard",
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    featured: true,
    lessonsLearned: [
      "Consumed and parsed data from a third-party REST API",
      "Handled loading states, errors, and empty results gracefully",
      "Built responsive layouts that adapt to different screen sizes",
      "Practised async/await patterns for API calls",
    ],
    image: "/projects/placeholder.svg",
    year: "2024",
  },
  {
    slug: "recipe-finder",
    title: "Recipe Finder",
    description:
      "Search and discover recipes with filtering by cuisine, dietary requirements, and cooking time.",
    longDescription:
      "A recipe discovery app that lets users search thousands of recipes, filter by dietary preferences, and save favourites. Demonstrates API integration, search functionality, and card-based responsive layouts.",
    technologies: ["React", "JavaScript", "CSS", "REST API"],
    githubUrl: "https://github.com/theothomasabeng/recipe-finder",
    liveUrl: "https://recipe-finder-demo.vercel.app",
    featured: false,
    lessonsLearned: [
      "Built dynamic search with debounced input handling",
      "Created reusable filter components for complex UI state",
      "Designed card layouts for content-heavy applications",
    ],
    image: "/projects/placeholder.svg",
    year: "2024",
  },
  {
    slug: "landing-page-clone",
    title: "SaaS Landing Page",
    description:
      "A pixel-perfect SaaS landing page clone featuring hero sections, pricing tables, and testimonials.",
    longDescription:
      "A recreation of a modern SaaS landing page to practise translating design mockups into code. Includes animated hero sections, feature grids, pricing comparison tables, and a responsive navigation bar.",
    technologies: ["HTML", "CSS", "JavaScript", "Figma"],
    githubUrl: "https://github.com/theothomasabeng/saas-landing",
    liveUrl: "https://saas-landing-demo.vercel.app",
    featured: false,
    lessonsLearned: [
      "Translated Figma designs into semantic HTML and CSS",
      "Implemented CSS Grid and Flexbox for complex layouts",
      "Added scroll-triggered animations with Intersection Observer",
    ],
    image: "/projects/placeholder.svg",
    year: "2024",
  },
  {
    slug: "blog-platform",
    title: "Developer Blog",
    description:
      "A markdown-powered blog platform with syntax highlighting and responsive typography.",
    longDescription:
      "A static blog platform built with Next.js that supports markdown content, syntax-highlighted code blocks, and optimised typography. Explores content management patterns and static site generation.",
    technologies: ["Next.js", "TypeScript", "MDX", "Tailwind CSS"],
    githubUrl: "https://github.com/theothomasabeng/dev-blog",
    liveUrl: "https://dev-blog-demo.vercel.app",
    featured: false,
    lessonsLearned: [
      "Integrated MDX for rich markdown content with React components",
      "Configured syntax highlighting for code blocks",
      "Explored static generation and dynamic routing in Next.js",
    ],
    image: "/projects/placeholder.svg",
    year: "2025",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
