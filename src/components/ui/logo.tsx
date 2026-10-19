import Image from "next/image";

const MINT = "#4ae3a3"; // brighter than the site mint, matches the brand artwork

/** The ShipDaily mark: chalk 3×3 tile grid with rocket, spark and idea tiles. */
export function LogoMark({ className }: { className?: string }) {
  return <Image src="/logo-mark.webp" alt="" width={480} height={416} loading="eager" className={className} />;
}

/** Mark + "ShipDaily.ai" wordmark. */
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const small = size === "sm";
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={small ? "h-8 w-auto" : "h-11 w-auto"} />
      <span className={`relative font-display leading-none font-bold tracking-tight ${small ? "text-xl" : "text-[26px]"}`}>
        <span className="chalk">ShipDaily</span>
        <span className="chalk" style={{ color: MINT }}>.ai</span>
        {!small && (
          <svg viewBox="0 0 160 12" preserveAspectRatio="none" aria-hidden className="chalk-rough absolute -bottom-2.5 left-[8%] h-2 w-[80%]">
            <path d="M2 9 L10 5 L6 9 C50 4, 110 3, 158 5" fill="none" stroke={MINT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </span>
  );
}
