export interface WorkExperience {
  role: string;
  company: string;
  url: string;
  location: string;
  period: string;
  highlights: string[];
}

export const workExperience: WorkExperience[] = [
  {
    role: "Web Developer",
    company: "Don't Panic Events",
    url: "https://dontpanicprojects.com",
    location: "Manchester, UK",
    period: "2025 – Present",
    highlights: [
      "Develop and maintain websites for award ceremonies, conferences, and live events across the Don't Panic Events portfolio.",
      "Build responsive, accessible pages using HTML, CSS, JavaScript, and modern front-end frameworks.",
      "Collaborate with event and marketing stakeholders to deliver web updates aligned with campaign timelines and client requirements.",
      "Improve site performance, content structure, and usability to support high-profile industry events and brand websites.",
    ],
  },
];
