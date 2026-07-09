"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { HeroBackground } from "@/components/hero-background";
import {
  computeSkillsTechIconPlacements,
  getSkillsIconPulseDelay,
  getSkillsIconPulseDuration,
  getSkillsTechIconDarkOpacity,
  skillsTechIconFilter,
  skillsTechIconFilterDark,
  type LayoutRect,
  type SkillsTechIconPlacement,
} from "@/lib/skills-background-layout";

interface SkillsPageBackgroundProps {
  pageRef: RefObject<HTMLElement | null>;
}

function collectForbiddenRects(container: HTMLElement): LayoutRect[] {
  const containerRect = container.getBoundingClientRect();
  const selectors = [
    "[data-skill-card]",
    "[data-skills-intro]",
    "[data-skills-category-heading]",
  ];

  const elements = selectors.flatMap((selector) =>
    Array.from(container.querySelectorAll<HTMLElement>(selector))
  );

  return elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top - containerRect.top,
      left: rect.left - containerRect.left,
      width: rect.width,
      height: rect.height,
    };
  });
}

export function SkillsPageBackground({ pageRef }: SkillsPageBackgroundProps) {
  const [icons, setIcons] = useState<SkillsTechIconPlacement[]>([]);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updatePlacements = useCallback(() => {
    const container = pageRef.current;
    if (!container) {
      return;
    }

    const { width, height } = container.getBoundingClientRect();
    const forbiddenRects = collectForbiddenRects(container);
    const placements = computeSkillsTechIconPlacements(
      width,
      height,
      forbiddenRects
    );

    setIcons(placements);
    setReady(true);
  }, [pageRef]);

  useLayoutEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updatePlacements();
      });
    };

    scheduleUpdate();

    const container = pageRef.current;
    if (!container) {
      return;
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(container);

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [pageRef, updatePlacements]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    >
      <HeroBackground patternId="skills-pixel-grid" />

      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.size,
            height: icon.size,
            rotate: `${icon.rotation}deg`,
          }}
        >
          <div
            className="skills-tech-icon-pulse h-full w-full"
            style={
              {
                "--pulse-delay": `${getSkillsIconPulseDelay(icon.id)}s`,
                "--pulse-duration": `${getSkillsIconPulseDuration(icon.id)}s`,
              } as CSSProperties
            }
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.size}
              height={icon.size}
              className="h-full w-full object-contain dark:hidden"
              style={{ filter: skillsTechIconFilter, opacity: icon.opacity }}
              draggable={false}
            />
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.size}
              height={icon.size}
              className="hidden h-full w-full object-contain dark:block"
              style={{
                filter: skillsTechIconFilterDark,
                opacity: getSkillsTechIconDarkOpacity(icon.opacity),
              }}
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
