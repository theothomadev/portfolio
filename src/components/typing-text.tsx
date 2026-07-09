"use client";

import { useEffect, useRef, useState } from "react";
import {
  typographyClassName,
  typographyStyle,
  type TypographyVariant,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
  variant?: TypographyVariant;
  speed?: number;
  startDelay?: number;
}

export function TypingText({
  text,
  className,
  variant = "display",
  speed = 75,
  startDelay = 0,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    clearTimers();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      setShowCursor(false);
      return clearTimers;
    }

    setDisplayed("");
    setShowCursor(startDelay > 0);

    const characters = [...text];
    let index = 0;

    const schedule = (callback: () => void, delay: number) => {
      const timerId = setTimeout(callback, delay);
      timersRef.current.push(timerId);
    };

    const typeNext = () => {
      if (cancelled) {
        return;
      }

      if (index === 0) {
        setDisplayed("");
        setShowCursor(true);
      }

      if (index < characters.length) {
        index += 1;
        setDisplayed(characters.slice(0, index).join(""));
        schedule(typeNext, speed);
      } else {
        setShowCursor(false);
      }
    };

    schedule(typeNext, startDelay);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [text, speed, startDelay]);

  return (
    <span
      className={cn(
        "block w-full max-w-full break-words text-balance max-sm:leading-tight",
        "sm:inline sm:max-w-none sm:whitespace-nowrap sm:text-wrap",
        typographyClassName(variant),
        className
      )}
      style={typographyStyle(variant)}
    >
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
