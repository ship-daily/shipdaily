import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmallUnderline, Sparkle } from "@/components/marketing/doodles";
import { Logo } from "@/components/ui/logo";
import { DISCORD_URL, NAV_LINKS } from "@/lib/site";

export function Nav() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8">
      <Link href="/" aria-label="ShipDaily home">
        <Logo />
      </Link>

      <nav className="chalk-text hidden items-center gap-9 text-xl text-chalk-dim md:flex">
        {NAV_LINKS.map((link, i) => (
          <a key={link.label} href={link.href} className="group relative flex items-center gap-9 transition-colors hover:text-chalk">
            {i > 0 && <Sparkle aria-hidden className="absolute -left-[26px] size-3 text-chalk/50" />}
            {link.label}
            <SmallUnderline className="absolute -bottom-2 left-0 h-2 w-full scale-x-0 text-mint transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <a
        href={DISCORD_URL}
        className="group inline-flex items-center gap-1.5 rounded-lg bg-mint px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_3px_0_var(--mint-deep),0_10px_20px_-8px_rgb(0_0_0/0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_0_var(--mint-deep),0_14px_24px_-8px_rgb(0_0_0/0.6)] active:translate-y-0.5 active:shadow-[0_1px_0_var(--mint-deep)]"
      >
        Join Discord
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </header>
  );
}
