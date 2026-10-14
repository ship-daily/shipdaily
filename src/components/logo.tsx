import { useId } from "react";

const INK = "#0d2a1a";
const YELLOW = "#f6d365";

// Tile origins in the 3×3 grid (viewBox units).
const CELLS = [2, 38, 74];

/** The ShipDaily mark: a 3×3 grid of chalk tiles with rocket, spark and idea tiles lit up. */
export function LogoMark({ className }: { className?: string }) {
  const hatch = useId();
  const lit = new Set(["2,0", "1,1", "0,2"]);

  return (
    <svg viewBox="0 0 126 104" aria-hidden className={className}>
      <defs>
        <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--chalk)" strokeWidth="1.4" opacity="0.32" />
        </pattern>
      </defs>

      {/* Chalk outline tiles */}
      <g className="chalk-rough">
        {CELLS.map((y, row) =>
          CELLS.map((x, col) =>
            lit.has(`${col},${row}`) ? null : (
              <rect
                key={`${col},${row}`}
                x={x}
                y={y}
                width="28"
                height="28"
                rx="6"
                fill={`url(#${hatch})`}
                stroke="var(--chalk)"
                strokeWidth="2.6"
              />
            ),
          ),
        )}
      </g>

      {/* Rocket — top right */}
      <rect x="74" y="2" width="28" height="28" rx="6" fill="var(--mint)" />
      <svg x="79" y="7" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill={INK} />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>

      {/* Spark — centre */}
      <rect x="38" y="38" width="28" height="28" rx="6" fill="var(--mint)" />
      <path d="M52 43 C53 49.5 54.6 51 61 52 C54.6 53 53 54.6 52 61 C51 54.6 49.4 53 43 52 C49.4 51 51 49.5 52 43 Z" fill={INK} />

      {/* Idea — bottom left */}
      <rect x="2" y="74" width="28" height="28" rx="6" fill={YELLOW} />
      <svg x="7" y="79" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>

      {/* Launch sparks */}
      <g stroke="var(--mint)" strokeWidth="3.4" strokeLinecap="round" className="chalk-rough">
        <path d="M104 4 L110 -4" transform="translate(0 6)" />
        <path d="M108 12 L119 8" />
        <path d="M106 21 L118 22" />
      </g>
    </svg>
  );
}

/** Mark + "ShipDaily.ai" wordmark. */
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const small = size === "sm";
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={small ? "h-8 w-auto" : "h-11 w-auto"} />
      <span className={`relative font-display leading-none font-bold tracking-tight ${small ? "text-xl" : "text-[26px]"}`}>
        <span className="chalk">ShipDaily</span>
        <span className="chalk text-mint">.ai</span>
        {!small && (
          <svg viewBox="0 0 160 12" preserveAspectRatio="none" aria-hidden className="chalk-rough absolute -bottom-2.5 left-[8%] h-2 w-[80%]">
            <path d="M2 9 L10 5 L6 9 C50 4, 110 3, 158 5" fill="none" stroke="var(--mint)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  );
}
