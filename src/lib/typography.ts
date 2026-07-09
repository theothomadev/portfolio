import type { CSSProperties } from "react";

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
} as const;

export const fluidFontSizes = {
  /** Hero typing line — larger on mobile, wraps to ~2 lines */
  display: "clamp(1.5rem, calc(4vw + 0.75rem), 4.5rem)",
  /** Larger hero display — up to ~96px */
  displayLg: "clamp(2rem, 5vw + 1rem, 6rem)",
  /** Section headings */
  heading: "clamp(1.875rem, 2.5vw + 1rem, 3rem)",
  /** Subheadings */
  subheading: "clamp(1.125rem, 1vw + 0.875rem, 1.5rem)",
  /** Body copy */
  body: "clamp(1rem, 0.25vw + 0.9375rem, 1.125rem)",
} as const;

export type FontSize = keyof typeof fontSizes;
export type FluidFontSize = keyof typeof fluidFontSizes;

export type TypographyVariant =
  | "display"
  | "displayLg"
  | "heading"
  | "subheading"
  | "body"
  | "bodySm"
  | "caption";

export interface TypographyToken {
  fontSize: string;
  lineHeight: number | string;
  letterSpacing?: string;
  className?: string;
}

export const typography: Record<TypographyVariant, TypographyToken> = {
  display: {
    fontSize: fluidFontSizes.display,
    lineHeight: 1.15,
    letterSpacing: "-0.025em",
    className: "font-semibold tracking-tight",
  },
  displayLg: {
    fontSize: fluidFontSizes.displayLg,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    className: "font-semibold tracking-tight",
  },
  heading: {
    fontSize: fluidFontSizes.heading,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    className: "font-semibold tracking-tight",
  },
  subheading: {
    fontSize: fluidFontSizes.subheading,
    lineHeight: 1.3,
    className: "font-medium",
  },
  body: {
    fontSize: fluidFontSizes.body,
    lineHeight: 1.625,
  },
  bodySm: {
    fontSize: fontSizes.sm,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: fontSizes.xs,
    lineHeight: 1.4,
    letterSpacing: "0.05em",
    className: "font-medium uppercase",
  },
};

export function typographyStyle(variant: TypographyVariant): CSSProperties {
  const token = typography[variant];

  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    letterSpacing: token.letterSpacing,
  };
}

export function typographyClassName(variant: TypographyVariant): string {
  return typography[variant].className ?? "";
}
