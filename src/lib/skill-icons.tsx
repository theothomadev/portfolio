import type { IconType } from "react-icons";
import { VscVscode } from "react-icons/vsc";
import {
  SiCss,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiNextdotjs,
  SiOpenapiinitiative,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export const skillIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "REST APIs": SiOpenapiinitiative,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  Figma: SiFigma,
  Vercel: SiVercel,
};

export const skillIconColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#339933",
  Express: "#FFFFFF",
  "REST APIs": "#6BA539",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  "VS Code": "#007ACC",
  Figma: "#F24E1E",
  Vercel: "#FFFFFF",
};

/** Stable rotation per skill for varied background angles */
export function getSkillIconRotation(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return -18 + (Math.abs(hash) % 36);
}
