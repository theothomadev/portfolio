export interface LearningMilestone {
  year: string;
  title: string;
  description: string;
}

export const learningJourney: LearningMilestone[] = [
  {
    year: "2023",
    title: "First Steps into Code",
    description:
      "Discovered web development through free online resources and built my first HTML pages.",
  },
  {
    year: "2024",
    title: "JavaScript & React",
    description:
      "Dived into JavaScript fundamentals and started building interactive UIs with React.",
  },
  {
    year: "2024",
    title: "APIs & Backend Basics",
    description:
      "Learned to consume REST APIs and explored Node.js and Express for server-side logic.",
  },
  {
    year: "2025",
    title: "Next.js & TypeScript",
    description:
      "Transitioned to Next.js with TypeScript, focusing on modern full-stack patterns and deployment.",
  },
  {
    year: "Now",
    title: "Building & Growing",
    description:
      "Continuously shipping projects, refining my craft, and preparing for a career in web development.",
  },
];
