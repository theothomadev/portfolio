"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ROCKET_SIZE_PX = 32;
/** How much of the rocket width sits over the fill bar (from the tail side) — ~30% */
const ROCKET_FILL_OVERLAP_PX = ROCKET_SIZE_PX * 0.3;
const ROCKET_VIEWBOX_CENTER = 15.765;

function ProgressRocket({
  className,
  wiggle,
}: {
  className?: string;
  wiggle?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 31.53 31.529"
      fill="currentColor"
      className={cn(
        "h-8 w-8 shrink-0 text-black dark:text-white",
        wiggle && "animate-rocket-wiggle",
        className
      )}
      aria-hidden="true"
    >
      <g transform={`rotate(90 ${ROCKET_VIEWBOX_CENTER} ${ROCKET_VIEWBOX_CENTER})`}>
        <path d="M6.188,29.909c0.156,0.42,0.54,0.713,0.986,0.752c0.446,0.04,0.876-0.18,1.105-0.566c0.676-1.144,1.726-2.43,3.231-3.029c-1.354-2.993-2.159-5.658-2.635-7.826C7.083,20.553,3.939,23.87,6.188,29.909z" />
        <path d="M22.678,19.256c-0.478,2.164-1.281,4.826-2.636,7.814c1.494,0.604,2.537,1.885,3.211,3.022c0.228,0.388,0.658,0.605,1.104,0.566c0.446-0.041,0.829-0.334,0.985-0.754C27.58,23.897,24.47,20.585,22.678,19.256z" />
        <path d="M22.148,13.369c0.067-6.654-3.565-11.104-5.422-12.941C16.446,0.151,16.065-0.003,15.669,0c-0.394,0.004-0.771,0.165-1.047,0.448c-1.799,1.847-5.284,6.291-5.218,12.92c0,0-0.332,6.124,3.832,14.534h2.497h0.086h2.497C22.479,19.492,22.148,13.369,22.148,13.369z M14.115,8.009c-0.061,0.1-1.148,1.951-0.695,4.878c0.101,0.658-0.351,1.273-1.009,1.375c-0.061,0.009-0.122,0.014-0.184,0.014c-0.584,0-1.097-0.425-1.189-1.02c-0.6-3.88,0.969-6.42,1.035-6.526c0.356-0.562,1.101-0.73,1.663-0.375C14.293,6.708,14.465,7.448,14.115,8.009z M15.173,2.329c0.74,0,1.341,0.6,1.341,1.342s-0.602,1.343-1.341,1.343c-0.743,0-1.344-0.601-1.344-1.343S14.43,2.329,15.173,2.329z" />
        <rect x="12.195" y="29.331" width="7.254" height="2.198" />
      </g>
    </svg>
  );
}

export function ScrollProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const markMoving = () => {
      setIsMoving(true);
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
      movingTimeoutRef.current = setTimeout(() => setIsMoving(false), 180);
    };

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0
      );
      markMoving();
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
    };
  }, [pathname]);

  return (
    <div className="relative h-2.5 w-full shrink-0 overflow-visible">
      <div
        className="h-2.5 w-full overflow-hidden bg-[#ADD8E6]/60 dark:bg-[#0F52BA]/40"
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
      <div
        className="pointer-events-none absolute top-1/2 z-10 h-8 w-8 -translate-y-1/2 transition-[left,opacity] duration-150 ease-out"
        style={{
          left: `calc(${progress * 100}% - ${ROCKET_FILL_OVERLAP_PX}px)`,
          opacity: progress > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <ProgressRocket wiggle={isMoving} />
      </div>
    </div>
  );
}
