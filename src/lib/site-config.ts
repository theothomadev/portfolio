export const siteConfig = {
  name: "Theo Thomas-Abeng",
  title: "Theo Thomas-Abeng | Aspiring Web Developer",
  description:
    "Portfolio of Theo Thomas-Abeng — an aspiring web developer building responsive, modern websites while continuously learning new technologies.",
  url: "https://theo-thomas-abeng.vercel.app",
  ogImage: "/og-image.png",
  email: "theo.thomasabeng@example.com",
  github: "https://github.com/theothomasabeng",
  linkedin: "https://linkedin.com/in/theothomasabeng",
  twitter: "https://twitter.com/theothomasabeng",
  role: "Aspiring Web Developer",
  tagline:
    "Building responsive, modern websites while continuously learning new technologies and improving my development skills.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
