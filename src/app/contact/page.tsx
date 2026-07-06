import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, PageTransition } from "@/components/motion-wrapper";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Open to internships, graduate roles, and junior developer opportunities.`,
  path: "/contact",
});

const socialLinks = [
  {
    href: siteConfig.github,
    label: "GitHub",
    icon: Github,
    description: "View my code and contributions",
  },
  {
    href: siteConfig.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    description: "Connect professionally",
  },
  {
    href: `mailto:${siteConfig.email}`,
    label: "Email",
    icon: Mail,
    description: siteConfig.email,
  },
] as const;

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="section-padding !pt-28 sm:!pt-32">
        <div className="container-width">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-10">
              <FadeIn>
                <SectionHeader
                  label="Contact"
                  title="Let's connect"
                  description="Have a question, opportunity, or just want to say hello? Fill out the form or reach out directly — I'd love to hear from you."
                />
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {socialLinks.map(({ href, label, icon: Icon, description }) => (
                    <a
                      key={label}
                      href={href}
                      target={label === "Email" ? undefined : "_blank"}
                      rel={label === "Email" ? undefined : "noopener noreferrer"}
                      className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 transition-all hover:border-border hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-accent">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <Button size="lg" asChild>
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail className="h-4 w-4" />
                    Email me directly
                  </a>
                </Button>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-8">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
