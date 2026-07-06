"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

export function TypingText({
  text,
  className,
  speed = 75,
  startDelay = 600,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      setShowCursor(false);
      return;
    }

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index += 1;
        timeoutId = setTimeout(typeNext, speed);
      } else {
        setShowCursor(false);
      }
    };

    timeoutId = setTimeout(typeNext, startDelay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, startDelay]);

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {showCursor ? (
        <span
          className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] animate-pulse bg-current align-middle"
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
