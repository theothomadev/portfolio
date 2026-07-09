interface HeroBackgroundProps {
  patternId?: string;
}

export function HeroBackground({ patternId = "hero-pixel-grid" }: HeroBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#ADD8E6] via-[#6495ED] to-[#0F52BA] opacity-[0.16] dark:opacity-[0.24]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ADD8E6_0%,transparent_65%)] opacity-[0.14] dark:opacity-[0.1]" />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="8" height="8" fill="#6495ED" fillOpacity="0.14" />
            <rect
              x="16"
              y="16"
              width="8"
              height="8"
              fill="#0F52BA"
              fillOpacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.35" />
      </svg>

      <div className="absolute -left-6 top-24 opacity-[0.12] dark:opacity-[0.18]">
        <div className="grid grid-cols-3 gap-1">
          <div className="size-3 bg-[#6495ED]" />
          <div className="size-3 bg-[#ADD8E6]" />
          <div className="size-3 bg-[#0F52BA]" />
          <div className="size-3 bg-[#0F52BA]" />
          <div className="size-3 bg-[#6495ED]" />
        </div>
      </div>

      <div className="absolute -right-4 bottom-28 opacity-[0.12] dark:opacity-[0.18]">
        <div className="grid grid-cols-4 gap-1">
          <div className="size-2 bg-[#ADD8E6]" />
          <div className="size-2 bg-[#6495ED]" />
          <div className="size-2 bg-[#6495ED]" />
          <div className="size-2 bg-[#0F52BA]" />
          <div className="col-span-2 size-2 bg-[#0F52BA]" />
          <div className="size-2 bg-[#ADD8E6]" />
          <div className="size-2 bg-[#6495ED]" />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6495ED] opacity-[0.08] blur-3xl" />
    </div>
  );
}
