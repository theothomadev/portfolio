"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isHome) {
      setProgress(0);
      return;
    }

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <div
      className="h-2.5 w-full shrink-0 overflow-hidden bg-[#ADD8E6]/60 dark:bg-[#0F52BA]/40"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-[#6495ED] shadow-[0_0_14px_rgba(100,149,237,0.85)] transition-[width] duration-150 ease-out dark:bg-[#ADD8E6] dark:shadow-[0_0_14px_rgba(173,216,230,0.7)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
