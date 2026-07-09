"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex flex-col transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <nav
        className="h-16 w-full shrink-0"
        aria-label="Main navigation"
      >
        <div className="container-width flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-1/4 min-w-0 shrink items-center">
            <Link
              href="/"
              aria-label="Home"
              className="group flex min-w-0 items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
            >
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3.5 5.5H9.5V7H5.75V18.5H4.25V7H3.5V5.5ZM13.5 5.5H19.5V7H15.75V18.5H14.25V7H13.5V5.5Z" />
                </svg>
              </span>
              <span className="hidden truncate sm:inline">
                {siteConfig.title.split(" | ")[0].split(" ")[0]}
              </span>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 shrink items-center justify-center md:flex">
            <ul className="flex min-w-0 items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href} className="min-w-0 shrink">
                    <Link
                      href={link.href}
                      className={cn(
                        "relative block truncate rounded-lg px-2 py-2 text-sm font-medium transition-colors lg:px-3.5",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-2 -bottom-px h-px bg-foreground"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 flex-1 shrink md:hidden" aria-hidden="true" />

          <div className="flex w-1/4 min-w-0 shrink items-center justify-end gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-xl md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <ScrollProgressBar />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm top-[4.625rem] md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass absolute inset-x-4 top-[calc(4.625rem+0.5rem)] z-50 rounded-2xl p-4 shadow-lg md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
