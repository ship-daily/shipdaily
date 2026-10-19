const PROMISES = [
  { title: "Free core community", body: "Joining, sharing and helping each other stays free." },
  { title: "Open source", body: "The whole platform is AGPL licensed and built in public." },
  { title: "Shaped by members", body: "We build what founders here actually ask for." },
];

// Deterministic jagged edge so server and client render the same path.
function tornEdge(width: number, height: number, step: number, flip = false) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const points: string[] = [];
  for (let x = 0; x <= width; x += step) {
    const y = height * (0.15 + rand() * 0.85);
    points.push(`${x},${flip ? height - y : y}`);
  }
  return flip
    ? `M0,0 L${points.join(" L")} L${width},0 Z`
    : `M0,${height} L${points.join(" L")} L${width},${height} Z`;
}

const TOP_EDGE = tornEdge(1600, 22, 14);
const BOTTOM_EDGE = tornEdge(1600, 16, 18, true);

export function Vision() {
  return (
    <section className="relative mt-4 w-full text-ink drop-shadow-[0_-8px_18px_rgb(0_0_0/0.35)]">
      <svg aria-hidden viewBox="0 0 1600 22" preserveAspectRatio="none" className="block h-[22px] w-full">
        <path d={TOP_EDGE} fill="#ebe7da" />
      </svg>
      <div className="bg-[#ebe7da] bg-[linear-gradient(180deg,rgb(0_0_0/0.04),transparent_30%,rgb(0_0_0/0.03))]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
          <p className="font-hand text-2xl text-ink/60">The bigger picture</p>
          <h2 className="mt-2 max-w-3xl font-display text-[2.1rem] leading-[1.1] font-semibold tracking-tight md:text-5xl">
            More than a launch platform. A place where founders discover products, solve problems, swap resources and
            grow together.
          </h2>
          <dl className="mt-10 grid gap-8 border-t border-dashed border-ink/20 pt-8 md:grid-cols-3">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <dt className="font-display text-xl font-semibold tracking-tight">{p.title}</dt>
                <dd className="mt-1 font-hand text-xl leading-snug text-ink/70">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <svg aria-hidden viewBox="0 0 1600 16" preserveAspectRatio="none" className="block h-4 w-full">
        <path d={BOTTOM_EDGE} fill="#ebe7da" />
      </svg>
    </section>
  );
}
