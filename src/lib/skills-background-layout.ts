export const skillsTechIconFiles = [
  "11229114.png",
  "1125008.png",
  "1258409.png",
  "18968905.png",
  "18968909.png",
  "5105234.png",
  "721778.png",
  "721790.png",
  "721791.png",
  "733609.png",
  "9496648.png",
] as const;

export const skillsTechIconAlts: Record<
  (typeof skillsTechIconFiles)[number],
  string
> = {
  "11229114.png": "JavaScript file icon",
  "1125008.png": "React logo",
  "1258409.png": "React logo",
  "18968905.png": "TypeScript logo",
  "18968909.png": "TypeScript file icon",
  "5105234.png": "HTML file icon",
  "721778.png": "CSS3 logo",
  "721790.png": "HTML5 logo",
  "721791.png": "JavaScript logo",
  "733609.png": "Rocket icon",
  "9496648.png": "CSS file icon",
};

export function getSkillsTechIconAlt(file: string): string {
  return (
    skillsTechIconAlts[file as keyof typeof skillsTechIconAlts] ??
    "Technology icon"
  );
}

export interface SkillsTechIconPlacement {
  id: string;
  src: string;
  alt: string;
  top: number;
  left: number;
  size: number;
  rotation: number;
  opacity: number;
}

export interface LayoutRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const EDGE_MARGIN_PX = 24;
const ICON_GAP_PX = 16;
const CARD_PADDING_PX = 20;
const PLACEMENT_ATTEMPTS = 160;
const GRID_STEP_PX = 44;
/** Extra clearance below the intro / filter block before icons may appear */
const INTRO_BOTTOM_CLEARANCE_PX = 40;
/** Max scale during pulse — collision bounds must include this headroom */
export const SKILLS_ICON_PULSE_SCALE = 1.06;

function seededUnit(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const value = Math.sin(hash) * 10000;
  return value - Math.floor(value);
}

function range(seed: string, min: number, max: number): number {
  return min + seededUnit(seed) * (max - min);
}

/** Tilted only — never flat (0°) or vertical (±90°). */
export function tiltRotation(seed: string): number {
  const magnitude = range(`${seed}-rot`, 12, 84);
  return seededUnit(`${seed}-sign`) > 0.5 ? magnitude : -magnitude;
}

function iconBounds(
  centerX: number,
  centerY: number,
  size: number
): LayoutRect {
  const radius = size * 0.58 * SKILLS_ICON_PULSE_SCALE;
  return {
    top: centerY - radius,
    left: centerX - radius,
    width: radius * 2,
    height: radius * 2,
  };
}

function rectsOverlap(a: LayoutRect, b: LayoutRect, gap: number): boolean {
  return !(
    a.left + a.width + gap <= b.left ||
    b.left + b.width + gap <= a.left ||
    a.top + a.height + gap <= b.top ||
    b.top + b.height + gap <= a.top
  );
}

function overlapsAny(
  rect: LayoutRect,
  obstacles: LayoutRect[],
  gap: number
): boolean {
  return obstacles.some((obstacle) => rectsOverlap(rect, obstacle, gap));
}

function isInsideContainer(
  bounds: LayoutRect,
  containerWidth: number,
  containerHeight: number
): boolean {
  return (
    bounds.left >= EDGE_MARGIN_PX &&
    bounds.top >= EDGE_MARGIN_PX &&
    bounds.left + bounds.width <= containerWidth - EDGE_MARGIN_PX &&
    bounds.top + bounds.height <= containerHeight - EDGE_MARGIN_PX
  );
}

function buildIconPool(): string[] {
  const pool: string[] = [];
  for (let repeat = 0; repeat < 8; repeat += 1) {
    for (const file of skillsTechIconFiles) {
      pool.push(file);
    }
  }
  pool.push(
    skillsTechIconFiles[0],
    skillsTechIconFiles[2],
    skillsTechIconFiles[4],
    skillsTechIconFiles[6],
    skillsTechIconFiles[8],
    skillsTechIconFiles[10],
    skillsTechIconFiles[3]
  );
  return pool;
}

function shufflePool(pool: string[], salt: string): string[] {
  return [...pool].sort(
    (a, b) => seededUnit(`${salt}-${a}`) - seededUnit(`${salt}-${b}`)
  );
}

function tryPlaceIcon(
  file: string,
  id: string,
  seed: string,
  sizeMin: number,
  sizeMax: number,
  centerX: number,
  centerY: number,
  containerWidth: number,
  containerHeight: number,
  obstacles: LayoutRect[],
  placedRects: LayoutRect[]
): SkillsTechIconPlacement | null {
  const size = range(`${seed}-size`, sizeMin, sizeMax);
  const bounds = iconBounds(centerX, centerY, size);

  if (!isInsideContainer(bounds, containerWidth, containerHeight)) {
    return null;
  }

  if (overlapsAny(bounds, obstacles, ICON_GAP_PX)) {
    return null;
  }

  if (overlapsAny(bounds, placedRects, ICON_GAP_PX)) {
    return null;
  }

  placedRects.push(bounds);

  return {
    id,
    src: `/skills/tech-icons/${file}`,
    alt: getSkillsTechIconAlt(file),
    top: centerY,
    left: centerX,
    size,
    rotation: tiltRotation(seed),
    opacity: range(`${seed}-opacity`, 0.2, 0.5),
  };
}

function buildGridCandidates(
  containerWidth: number,
  containerHeight: number,
  minY = EDGE_MARGIN_PX
): Array<{ x: number; y: number }> {
  const candidates: Array<{ x: number; y: number }> = [];

  for (let y = minY; y <= containerHeight - EDGE_MARGIN_PX; y += GRID_STEP_PX) {
    for (let x = EDGE_MARGIN_PX; x <= containerWidth - EDGE_MARGIN_PX; x += GRID_STEP_PX) {
      candidates.push({ x, y });
    }
  }

  return candidates.sort(
    (a, b) =>
      seededUnit(`grid-${a.x}-${a.y}`) - seededUnit(`grid-${b.x}-${b.y}`)
  );
}

/** Dark mode: lift opacity while keeping light-mode values unchanged */
export function getSkillsTechIconDarkOpacity(opacity: number): number {
  return Math.min(opacity + 0.28, 0.78);
}

export function getSkillsIconPulseDelay(id: string): number {
  return 0.2 + seededUnit(`${id}-pulse-delay`) * 3.2;
}

export function getSkillsIconPulseDuration(id: string): number {
  return 3 + seededUnit(`${id}-pulse-duration`) * 2.5;
}

export function computeSkillsTechIconPlacements(
  containerWidth: number,
  containerHeight: number,
  forbiddenRects: LayoutRect[]
): SkillsTechIconPlacement[] {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return [];
  }

  const obstacles = forbiddenRects.map((rect) => ({
    top: rect.top - CARD_PADDING_PX,
    left: rect.left - CARD_PADDING_PX,
    width: rect.width + CARD_PADDING_PX * 2,
    height: rect.height + CARD_PADDING_PX * 2,
  }));

  const minX = EDGE_MARGIN_PX;
  const maxX = containerWidth - EDGE_MARGIN_PX;
  const minY = EDGE_MARGIN_PX;
  const maxY = containerHeight - EDGE_MARGIN_PX;

  if (minX >= maxX || minY >= maxY) {
    return [];
  }

  const pool = shufflePool(buildIconPool(), "primary");
  const placed: SkillsTechIconPlacement[] = [];
  const placedRects: LayoutRect[] = [];
  let poolIndex = 0;

  const placeFromPool = (
    file: string,
    id: string,
    attemptSeed: string,
    sizeMin: number,
    sizeMax: number,
    centerX: number,
    centerY: number
  ) => {
    const icon = tryPlaceIcon(
      file,
      id,
      attemptSeed,
      sizeMin,
      sizeMax,
      centerX,
      centerY,
      containerWidth,
      containerHeight,
      obstacles,
      placedRects
    );

    if (icon) {
      placed.push(icon);
    }
  };

  // Phase 1 — seeded random scatter
  for (let index = 0; index < pool.length; index += 1) {
    const file = pool[index];

    for (let attempt = 0; attempt < PLACEMENT_ATTEMPTS; attempt += 1) {
      const seed = `random-${file}-${index}-${attempt}`;
      const centerX = range(`${seed}-x`, minX, maxX);
      const centerY = range(`${seed}-y`, minY, maxY);
      const before = placed.length;

      placeFromPool(
        file,
        `${file}-r-${index}`,
        seed,
        36,
        68,
        centerX,
        centerY
      );

      if (placed.length > before) {
        break;
      }
    }
  }

  // Phase 2 — grid fill across the full body
  const gridCandidates = buildGridCandidates(containerWidth, containerHeight);
  for (const point of gridCandidates) {
    const file = pool[poolIndex % pool.length];
    poolIndex += 1;
    const seed = `grid-${point.x}-${point.y}-${poolIndex}`;

    placeFromPool(
      file,
      `${file}-g-${poolIndex}`,
      seed,
      32,
      58,
      point.x + range(`${seed}-jx`, -10, 10),
      point.y + range(`${seed}-jy`, -10, 10)
    );
  }

  // Phase 3 — dense bottom fill below the last pill/header block
  const lastObstacleBottom =
    obstacles.length > 0
      ? Math.max(...obstacles.map((rect) => rect.top + rect.height))
      : containerHeight * 0.5;

  const bottomMinY = Math.min(
    Math.max(lastObstacleBottom + INTRO_BOTTOM_CLEARANCE_PX, containerHeight * 0.45),
    containerHeight - EDGE_MARGIN_PX - 40
  );

  const bottomCandidates = buildGridCandidates(
    containerWidth,
    containerHeight,
    bottomMinY
  ).sort((a, b) => b.y - a.y || seededUnit(`b-${a.x}`) - seededUnit(`b-${b.x}`));

  for (const point of bottomCandidates) {
    const file = pool[poolIndex % pool.length];
    poolIndex += 1;
    const seed = `bottom-${point.x}-${point.y}-${poolIndex}`;

    placeFromPool(
      file,
      `${file}-b-${poolIndex}`,
      seed,
      34,
      62,
      point.x + range(`${seed}-jx`, -8, 8),
      point.y + range(`${seed}-jy`, -8, 8)
    );
  }

  // Phase 4 — random fill only below the lowest content block (never mid-page)
  const lowerStart = lastObstacleBottom + INTRO_BOTTOM_CLEARANCE_PX;

  if (lowerStart < maxY) {
    for (let index = 0; index < pool.length; index += 1) {
      const file = pool[index];

      for (let attempt = 0; attempt < 80; attempt += 1) {
        const seed = `lower-${file}-${index}-${attempt}`;
        const centerX = range(`${seed}-x`, minX, maxX);
        const centerY = range(`${seed}-y`, lowerStart, maxY);

        placeFromPool(
          file,
          `${file}-l-${index}-${attempt}`,
          seed,
          30,
          56,
          centerX,
          centerY
        );
      }
    }
  }

  return placed;
}

/** Blue palette tint to match hero / skills background */
export const skillsTechIconFilter =
  "brightness(0.92) sepia(0.45) saturate(2.6) hue-rotate(186deg) contrast(1.05)";

export const skillsTechIconFilterDark =
  "brightness(1.28) sepia(0.42) saturate(3.2) hue-rotate(184deg) contrast(1.12)";
