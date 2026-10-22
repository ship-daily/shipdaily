"use client";

import { useEffect, useRef } from "react";

/*
 * Chalkboard background built from one photo texture (public/chalkboard.webp)
 * and drawn to a canvas that spans the whole page, so it scrolls with the content.
 *
 * The photo has a scrubbed chalk frame on all four sides, so it can't simply be
 * tiled. Instead:
 *   - the top half (top frame + corners) goes at the top of the page,
 *   - the bottom half goes at the bottom of the page,
 *   - the gap is filled with bands from the middle of the photo, cycling through
 *     two bands and their left-right flips (the side frames look alike, so a
 *     flip keeps them continuous), each cross-faded into the one above.
 */

const SRC = "/chalkboard.webp";
const BANDS: [number, number][] = [
  [140, 520],
  [360, 760],
];
const FADE = 100; // max css px of cross-fade between pieces (shrinks on narrow screens)
const MAX_CANVAS_AREA = 16_000_000; // stay under iOS Safari's canvas size limit

/** A slice of the photo scaled to the page width, optionally mirrored, faded in at the top. */
function piece(img: HTMLImageElement, sy: number, sh: number, cssW: number, res: number, mirror: boolean, fade: number) {
  const scale = cssW / img.naturalWidth;
  const h = sh * scale;
  const off = document.createElement("canvas");
  off.width = Math.round(cssW * res);
  off.height = Math.round(h * res);
  const ctx = off.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(res, res);
  if (mirror) {
    ctx.translate(cssW, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, 0, sy, img.naturalWidth, sh, 0, 0, cssW, h);
  if (fade > 0) {
    ctx.setTransform(res, 0, 0, res, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, fade);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cssW, h);
    ctx.globalCompositeOperation = "source-over";
  }
  return { canvas: off, h };
}

function draw(canvas: HTMLCanvasElement, img: HTMLImageElement, cssW: number, cssH: number) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const mid = Math.floor(ih / 2);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const res = Math.min(dpr, iw / cssW, Math.sqrt(MAX_CANVAS_AREA / (cssW * cssH)));
  canvas.width = Math.round(cssW * res);
  canvas.height = Math.round(cssH * res);
  canvas.style.height = `${cssH}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(res, res);

  // Bands shrink with the page width; on phones they can be shorter than FADE, which would make the
  // fill loop below step backwards forever. Keep the fade at most a third of the shortest band.
  const scale = cssW / iw;
  const shortestBand = Math.min(...BANDS.map(([from, to]) => (to - from) * scale));
  const fade = Math.max(0, Math.min(FADE, Math.floor(shortestBand / 3)));

  const top = piece(img, 0, mid, cssW, res, false, 0);
  const bottom = piece(img, mid, ih - mid, cssW, res, false, fade);

  if (top.h + bottom.h >= cssH) {
    ctx.drawImage(img, 0, 0, cssW, cssH);
    return;
  }

  ctx.drawImage(top.canvas, 0, 0, cssW, top.h);

  const variants = [
    piece(img, BANDS[0][0], BANDS[0][1] - BANDS[0][0], cssW, res, false, fade),
    piece(img, BANDS[1][0], BANDS[1][1] - BANDS[1][0], cssW, res, true, fade),
    piece(img, BANDS[0][0], BANDS[0][1] - BANDS[0][0], cssW, res, true, fade),
    piece(img, BANDS[1][0], BANDS[1][1] - BANDS[1][0], cssW, res, false, fade),
  ];
  const bottomY = cssH - bottom.h;
  let y = top.h - fade;
  for (let i = 0; y < bottomY + fade; i++) {
    const v = variants[i % variants.length];
    ctx.drawImage(v.canvas, 0, y, cssW, v.h);
    y += Math.max(1, v.h - fade);
  }

  ctx.drawImage(bottom.canvas, 0, bottomY, cssW, bottom.h);
}

export function Chalkboard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const img = new Image();
    let drawn = { w: 0, h: 0 };
    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      if (!img.complete || !img.naturalWidth) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w !== drawn.w || h !== drawn.h) {
        drawn = { w, h };
        draw(canvas, img, w, h);
      }
    };

    img.onload = update;
    img.src = SRC;

    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(update, 150);
    });
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      img.onload = null;
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full" />
      {/* Calms the texture behind content; fades out near the edges so the chalk frame stays crisp. */}
      <div className="board-calm absolute inset-0" />
    </div>
  );
}
