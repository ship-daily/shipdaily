import type { SVGProps } from "react";

type DoodleProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Star(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={2.2}
        d="M24 5 C25.5 11, 27 15, 28.5 18.5 C33 18.6, 38 18.4, 43 18.8 C39 22, 35.5 25, 32.2 27.6 C33.4 32.4, 35 37.6, 36.2 42.4 C32.1 39.6, 28 36.8, 24.2 34.1 C20.1 36.9, 16.2 39.8, 11.9 42.7 C13.3 37.9, 14.7 33, 16.1 27.9 C12.5 25, 8.9 22.1, 5.2 19 C10.2 18.6, 15 18.6, 19.6 18.5 C21 14.2, 22.4 9.7, 24 5"
      />
    </svg>
  );
}

export function Smiley(props: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M40 22 C51 21.5, 59.5 30, 59 41 C58.6 51.5, 50 59.4, 39.6 58.8 C29 58.2, 21.2 50, 21.6 39.6 C22 29.4, 30 22.4, 40.6 22.2" />
        <path d="M33 36 L33.2 39" />
        <path d="M46.5 35.8 L46.6 38.8" />
        <path d="M31 46 C35 51.5, 45 51.5, 49.5 45.5" />
        <path d="M40 8 L40.4 14" />
        <path d="M17.5 17 L22 21.4" />
        <path d="M62.5 17.4 L58 21.8" />
        <path d="M8 38.5 L14 39" />
        <path d="M66 39 L72 38.4" />
      </g>
    </svg>
  );
}

export function CurlyArrow(props: DoodleProps) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.2}>
        <path d="M6 18 C30 6, 58 8, 66 26 C72 40, 54 50, 48 40 C42 30, 62 22, 78 34 C90 43, 98 54, 108 66" />
        <path d="M95 64 L109 67.5 L106 53" />
      </g>
    </svg>
  );
}

export function SwoopArrow(props: DoodleProps) {
  return (
    <svg viewBox="0 0 80 90" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.2}>
        <path d="M14 10 C46 10, 66 30, 60 56 C57 68, 46 78, 34 82" />
        <path d="M44 84 L33 82.5 L39 72" />
      </g>
    </svg>
  );
}

export function ArrowLeft(props: DoodleProps) {
  return (
    <svg viewBox="0 0 110 50" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.2}>
        <path d="M104 14 C80 6, 50 8, 30 22 C24 26, 18 30, 10 36" />
        <path d="M22 38 L9 37 L13 25" />
      </g>
    </svg>
  );
}

export function Underline(props: DoodleProps) {
  return (
    <svg viewBox="0 0 320 30" preserveAspectRatio="none" aria-hidden {...props}>
      <path
        className="draw"
        fill="var(--mint)"
        d="M4 21 C60 13, 150 8, 236 8.5 C270 8.7, 296 10, 314 12.5 C318 13.2, 318 17, 314 17 C290 15.6, 262 15, 232 15.4 C150 16.6, 70 21.5, 12 27.5 C5 28.2, 0 22.6, 4 21 Z"
      />
    </svg>
  );
}

export function Sparkle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={1.8}
        d="M12 2.5 C12.6 8, 14 10.6, 21 12 C14 13.4, 12.6 16, 12 21.5 C11.4 16, 10 13.4, 3 12 C10 10.6, 11.4 8, 12 2.5 Z"
      />
    </svg>
  );
}

export function SmallUnderline(props: DoodleProps) {
  return (
    <svg viewBox="0 0 160 14" preserveAspectRatio="none" aria-hidden {...props}>
      <path {...stroke} strokeWidth={2.4} d="M3 9 C40 4, 100 4, 157 7" />
    </svg>
  );
}

/* Feature icons */

export function ChatIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M6 8 C6 5, 8 4, 11 4 L36 4.4 C39 4.4, 40.5 6, 40.5 9 L40.2 24 C40.2 27, 38.6 28.4, 35.6 28.4 L18 28.4 L10 35 L11.2 28.4 C8 28.4, 6.2 27, 6.2 24 Z" />
        <path d="M45 18 L54 18.2 C57 18.2, 58.4 19.8, 58.4 22.8 L58.2 37 C58.2 40, 56.6 41.4, 53.6 41.4 L51.6 41.4 L52.6 48 L45 41.4 L30 41.4 C27 41.4, 25.4 40, 25.4 37 L25.4 33" />
        <path d="M14 13.6 L32 13.4" />
        <path d="M14 19.6 L26 19.4" />
      </g>
    </svg>
  );
}

export function BulbIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4} stroke="#f6d365">
        <path d="M32 14 C42 14, 48 21, 48 29 C48 35, 44.6 38.6, 41.4 42 C39.6 44, 39 46, 39 48.6 L25 48.6 C25 46, 24.4 44, 22.6 42 C19.4 38.6, 16 35, 16 29 C16 21, 22 14, 32 14" />
        <path d="M25.6 53.4 L38.4 53.2" />
        <path d="M27.6 58 L36.4 57.8" />
        <path d="M32 3 L32 7.4" />
        <path d="M11 12 L14.4 15.2" />
        <path d="M53 12 L49.6 15.2" />
        <path d="M5 29.4 L9.4 29.2" />
        <path d="M54.6 29.2 L59 29.4" />
        <path d="M28 40 L28 32 C28 30, 36 30, 36 32 L36 40" />
      </g>
    </svg>
  );
}

export function PeopleIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 72 56" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M36 8 C41 8, 44 11.6, 44 16 C44 20.6, 40.6 24, 36 24 C31.4 24, 28 20.6, 28 16 C28 11.6, 31.2 8, 36.2 8" />
        <path d="M22 46 C22 36, 28 30, 36 30 C44 30, 50 36, 50 46" />
        <path d="M16 14 C19.6 14, 22 16.6, 22 20 C22 23.4, 19.4 26, 16 26 C12.6 26, 10 23.4, 10 20 C10 16.8, 12.4 14, 16.2 14" />
        <path d="M4 44 C4 36.6, 8.6 31.6, 16 31.6 C18.4 31.6, 20.4 32.2, 22 33.2" />
        <path d="M56 14 C59.6 14, 62 16.6, 62 20 C62 23.4, 59.4 26, 56 26 C52.6 26, 50 23.4, 50 20 C50 16.8, 52.4 14, 56.2 14" />
        <path d="M68 44 C68 36.6, 63.4 31.6, 56 31.6 C53.6 31.6, 51.6 32.2, 50 33.2" />
      </g>
    </svg>
  );
}

export function RocketIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M52 6 C40 7, 30 14, 23 25 L18.6 32.4 L31.6 45.4 L39 41 C50 34, 57 24, 58 12 C58.2 8.4, 55.6 5.8, 52 6" />
        <path d="M43.4 17 C45.6 17, 47.2 18.6, 47.2 20.8 C47.2 23, 45.6 24.6, 43.4 24.6 C41.2 24.6, 39.6 23, 39.6 20.8 C39.6 18.6, 41.2 17, 43.4 17" />
        <path d="M23 25 L13 25.4 L6 33 L18.6 32.4" />
        <path d="M39 41 L38.6 51 L31 58 L31.6 45.4" />
        <path d="M17 41 C12 43, 9.6 48, 9 55 C16 54.4, 21 52, 23 47" />
      </g>
    </svg>
  );
}

export function MegaphoneIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M8 22 C8 20, 9 19, 11 19 L20 19 L44 7 C46 6, 48 7, 48 9.4 L48.2 42.6 C48.2 45, 46 46, 44 45 L20 33.4 L11 33.4 C9 33.4, 8 32.4, 8 30.4 Z" />
        <path d="M20 19.4 L20.2 33" />
        <path d="M14 33.6 L18.6 47 C19.2 49, 21 50, 23 49.4 L25.6 48.6 C27.4 48, 28 46.4, 27.4 44.6 L23.6 35.4" />
        <path d="M54 17 L59 13.6" />
        <path d="M55 26.4 L61 26.6" />
        <path d="M54 36 L59 39.4" />
      </g>
    </svg>
  );
}

export function CompassIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M32 6 C46.6 6, 58 17.6, 58 32 C58 46.6, 46.4 58, 32 58 C17.4 58, 6 46.4, 6 32 C6 17.6, 17.8 6.2, 32.4 6" />
        <path d="M41.6 22.4 L36 36 L22.4 41.6 L28 28 Z" />
        <path d="M32 10.6 L32 13.6" />
        <path d="M32 50.4 L32 53.4" />
        <path d="M10.6 32 L13.6 32" />
        <path d="M50.4 32 L53.4 32" />
      </g>
    </svg>
  );
}

export function ToolboxIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M6 20 C6 18, 7 17, 9 17 L55 17.2 C57 17.2, 58 18.2, 58 20.2 L57.8 47 C57.8 49, 56.8 50, 54.8 50 L9.2 50 C7.2 50, 6.2 49, 6.2 47 Z" />
        <path d="M22 17 L22.4 10 C22.4 8, 23.6 7, 25.6 7 L38.4 7 C40.4 7, 41.6 8, 41.6 10 L42 17" />
        <path d="M6.4 30 L57.6 30.2" />
        <path d="M27 26.4 L27 34 L37 34 L37 26.4" />
      </g>
    </svg>
  );
}

export function Leaf(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 64" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.2}>
        <path d="M24 4 C38 14, 44 30, 36 46 C32 54, 26 58, 22 60 C14 52, 6 40, 8 26 C10 16, 16 9, 24 4" />
        <path d="M23 12 C24 28, 23.6 44, 21.6 62" />
        <path d="M23.4 24 L31 18" />
        <path d="M23.2 33 L14 27" />
        <path d="M22.8 42 L32 35" />
        <path d="M22.4 50 L14 45" />
      </g>
    </svg>
  );
}

export function Heart(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 44" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={2.4}
        d="M24 40 C14 32, 4 24, 4.4 14 C4.8 7, 10 3.6, 15.4 4 C19.6 4.4, 22.6 7.4, 24 11 C25.6 7, 29 4, 33.4 4 C39.4 4.2, 44 8.6, 43.6 15 C43 25, 33 32.6, 24.6 40.4"
      />
    </svg>
  );
}

export function Crown(props: DoodleProps) {
  return (
    <svg viewBox="0 0 56 40" aria-hidden {...props}>
      <path {...stroke} strokeWidth={2.4} d="M6 34 L4 10 L17 22 L28 5 L39 22 L52 9.6 L50 34.4 Z M7 34 L49.6 34" />
    </svg>
  );
}

export function Burst(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M24 4 L24.6 18" />
        <path d="M24 30 L23.6 44" />
        <path d="M4 24.4 L18 24" />
        <path d="M30 23.6 L44 24.2" />
        <path d="M10 10 L19.4 19" />
        <path d="M28.6 28.8 L38 38" />
        <path d="M38.4 9.6 L29 19.2" />
        <path d="M19 28.8 L9.6 38.4" />
      </g>
    </svg>
  );
}

export function Globe(props: DoodleProps) {
  return (
    <svg viewBox="0 0 120 100" aria-hidden {...props}>
      <g {...stroke} strokeWidth={1.8}>
        <path d="M60 14 C79 14, 94 29, 94 48 C94 67, 79 82, 60 82 C41 82, 26 67, 26 48 C26 29, 41.4 14.2, 60.6 14" />
        <path d="M60 14 C48 26, 46 66, 60 82" />
        <path d="M60 14 C72 26, 74 66, 60 82" />
        <path d="M28 38 C46 34, 74 34, 92 38" />
        <path d="M28 58 C46 62, 74 62, 92 58" />
        <path d="M18 66 C2 74, 6 82, 30 78 C54 74, 92 58, 108 44 C120 34, 116 28, 100 32" />
      </g>
    </svg>
  );
}

export function Spiral(props: DoodleProps) {
  return (
    <svg viewBox="0 0 56 56" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={2.2}
        d="M28 28 C30 26, 33 28, 32 31 C31 35, 25 35, 23 31 C20 26, 24 20, 30 20 C37 20, 41 27, 39 33 C37 41, 27 44, 20 40 C12 35, 12 23, 18 17 C25 10, 38 11, 44 18 C50 25, 50 36, 46 42"
      />
    </svg>
  );
}

export function Squiggle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 120 20" aria-hidden {...props}>
      <path {...stroke} strokeWidth={2.2} d="M3 12 C10 3, 17 3, 22 11 C27 19, 35 19, 40 10 C45 2, 53 3, 58 11 C63 19, 71 19, 76 10 C81 2, 89 3, 94 11 C99 19, 107 18, 116 8" />
    </svg>
  );
}

/** Hand-drawn loop for circling text; stretch it over the target. */
export function ChalkOval(props: DoodleProps) {
  return (
    <svg viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={2.4}
        vectorEffect="non-scaling-stroke"
        d="M40 26 C90 6, 230 4, 280 30 C306 46, 296 82, 240 96 C170 112, 60 108, 20 84 C-6 66, 8 34, 60 20 C80 15, 100 13, 118 12"
      />
    </svg>
  );
}

/** Wobbly vertical chalk divider. */
export function ChalkDivider(props: DoodleProps) {
  return (
    <svg viewBox="0 0 10 200" preserveAspectRatio="none" aria-hidden {...props}>
      <path {...stroke} strokeWidth={2} vectorEffect="non-scaling-stroke" d="M5 4 C3.6 40, 6.6 80, 4.6 120 C3.4 150, 6.2 176, 5.2 196" />
    </svg>
  );
}

/** Dashed hand-drawn rectangle. */
export function ChalkBox(props: DoodleProps) {
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden {...props}>
      <path
        {...stroke}
        strokeWidth={2.2}
        strokeDasharray="10 8"
        vectorEffect="non-scaling-stroke"
        d="M6 8 C90 4, 200 6, 294 5 C296 60, 293 130, 295 194 C200 197, 100 193, 5 196 C3 130, 7 60, 6 8"
      />
    </svg>
  );
}

export function DiscordIcon(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.77 1.37 1.23 2a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}
