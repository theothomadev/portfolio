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
      aria-label="Rocket scroll indicator"
      role="img"
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

function getScrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  return maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
}

export function ScrollProgressBar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const applyProgress = (progress: number) => {
      progressRef.current = progress;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress})`;
      }

      if (rocketRef.current && barRef.current) {
        const barWidth = barRef.current.offsetWidth;
        const rocketX = progress * barWidth - ROCKET_FILL_OVERLAP_PX;

        rocketRef.current.style.transform = `translate3d(${rocketX}px, -50%, 0)`;
        rocketRef.current.style.opacity = progress > 0 ? "1" : "0";
      }

      if (barRef.current) {
        barRef.current.setAttribute(
          "aria-valuenow",
          String(Math.round(progress * 100))
        );
      }
    };

    const markMoving = () => {
      setIsMoving(true);
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
      movingTimeoutRef.current = setTimeout(() => setIsMoving(false), 180);
    };

    const updateProgress = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyProgress(getScrollProgress());
        markMoving();
      });
    };

    applyProgress(getScrollProgress());

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    window.visualViewport?.addEventListener("resize", updateProgress);
    window.visualViewport?.addEventListener("scroll", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.visualViewport?.removeEventListener("resize", updateProgress);
      window.visualViewport?.removeEventListener("scroll", updateProgress);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="pointer-events-none absolute inset-x-0 top-full z-[60] h-2.5 overflow-visible"
    >
      <div
        ref={fillRef}
        className="h-2.5 w-full origin-left bg-[#6495ED] shadow-[0_0_14px_rgba(100,149,237,0.85)] will-change-transform dark:bg-[#ADD8E6] dark:shadow-[0_0_14px_rgba(173,216,230,0.7)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={rocketRef}
        className="absolute left-0 top-1/2 h-8 w-8 will-change-transform"
        style={{ transform: "translate3d(0, -50%, 0)", opacity: 0 }}
        aria-hidden="true"
      >
        <ProgressRocket wiggle={isMoving} />
      </div>
    </div>
  );
}
