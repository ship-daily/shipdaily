import Link from "next/link";
import { SmallUnderline, Sparkle } from "@/components/marketing/doodles";
import { Logo } from "@/components/ui/logo";
import { SignOutButton } from "./sign-out-button";

const LINKS = [
  { label: "Home", href: "/home", live: true },
  { label: "Launch Weeks", href: "/launches", live: false },
  { label: "Products", href: "/products", live: false },
];

type Props = { user: { name: string; handle: string; image?: string | null } };

export function AppHeader({ user }: Props) {
  const initial = (user.name || user.handle).charAt(0).toUpperCase();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pt-6 sm:px-8">
      <Link href="/home" aria-label="ShipDaily home">
        <Logo size="sm" />
      </Link>

      <nav className="chalk-text hidden items-center gap-9 text-xl text-chalk-dim md:flex">
        {LINKS.map((link, i) =>
          link.live ? (
            <Link key={link.label} href={link.href} className="group relative flex items-center text-chalk transition-colors">
              {i > 0 && <Sparkle aria-hidden className="absolute -left-[26px] size-3 text-chalk/50" />}
              {link.label}
              <SmallUnderline className="absolute -bottom-2 left-0 h-2 w-full text-mint" />
            </Link>
          ) : (
            <span key={link.label} className="relative flex items-center gap-2 text-chalk-dim/60" title="Coming soon">
              {i > 0 && <Sparkle aria-hidden className="absolute -left-[26px] size-3 text-chalk/50" />}
              {link.label}
              <span className="rounded bg-chalk/10 px-1.5 py-0.5 font-sans text-[10px] font-semibold tracking-wide text-chalk-dim uppercase">
                Soon
              </span>
            </span>
          ),
        )}
      </nav>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2.5">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- avatars come from OAuth providers on arbitrary hosts
            <img src={user.image} alt="" className="size-9 rounded-full border-2 border-chalk/40 object-cover" />
          ) : (
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-full border-2 border-dashed border-chalk/50 font-display text-lg font-semibold text-chalk"
            >
              {initial}
            </span>
          )}
          <span className="chalk-text hidden text-lg text-chalk sm:inline">@{user.handle}</span>
        </span>
        <SignOutButton />
      </div>
    </header>
  );
}
