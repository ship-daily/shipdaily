import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Heart, Sparkle, Star, Underline } from "@/components/marketing/doodles";
import { configuredOAuthProviders } from "@/lib/auth";
import { getSession, safeRedirectPath } from "@/lib/session";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Log in · ShipDaily",
};

const PERKS = [
  "Launch in a small weekly cohort that actually sees you",
  "Real founders try your product and tell you the truth",
  "Every update you ship fills your ship graph",
];

// A believable-looking ship graph teaser: 7 rows × 18 weeks, filled more towards recent weeks.
const WEEKS = 18;
const SHIP_GRAPH = Array.from({ length: 7 * WEEKS }, (_, i) => {
  const week = Math.floor(i / 7);
  const noise = ((i * 37 + 11) % 23) / 23;
  const chance = 0.15 + (week / WEEKS) * 0.55;
  if (noise > chance) return 0;
  return noise < chance * 0.35 ? 3 : noise < chance * 0.7 ? 2 : 1;
});
const SQUARE_STYLES = ["border border-chalk/20", "bg-mint/35", "bg-mint/65", "bg-mint"];

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const { next, error } = await searchParams;
  const redirectTo = safeRedirectPath(next);

  if (await getSession()) redirect(redirectTo);

  return (
    <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pt-6">
      {/* Pitch, written on the board */}
      <section className="relative">
        <p className="chalk-text flex items-center gap-2 text-xl text-mint">
          <Sparkle aria-hidden className="chalk-rough size-4" />
          Founders helping founders
        </p>
        <h1 className="mt-4 font-display text-[3rem] leading-[1.02] font-semibold tracking-tight sm:text-[3.6rem] lg:text-[4.4rem]">
          <span className="chalk block">Pull up a chair.</span>
          <span className="relative inline-block">
            <span className="chalk">Let&apos;s ship.</span>
            <Underline aria-hidden className="absolute -bottom-2 -left-[2%] h-4 w-[104%] md:h-5" />
          </span>
        </h1>
        <p className="chalk-text mt-7 max-w-md text-xl leading-snug text-chalk-dim">
          Log in or create your account. Same buttons either way, no passwords to remember.
        </p>

        <ul className="mt-10 hidden flex-col gap-4 sm:flex">
          {PERKS.map((perk) => (
            <li key={perk} className="chalk-text flex items-start gap-3 text-xl leading-snug text-chalk">
              <Star aria-hidden className="chalk-rough mt-1 size-5 shrink-0 text-[#f6d365]/90" />
              {perk}
            </li>
          ))}
        </ul>

        <div aria-hidden className="relative mt-12 hidden w-fit lg:block">
          <div className="grid grid-flow-col grid-rows-7 gap-[5px] -rotate-2">
            {SHIP_GRAPH.map((level, i) => (
              <span key={i} className={`size-[11px] rounded-[3px] ${SQUARE_STYLES[level]}`} />
            ))}
          </div>
          <p className="chalk absolute -right-44 -bottom-1 rotate-[-4deg] font-hand text-[22px] leading-tight text-chalk/90">
            your ship graph,
            <br />
            one square per ship
          </p>
        </div>
      </section>

      {/* The sign-in note, with a second note peeking out behind it */}
      <section className="relative mx-auto w-full max-w-[26rem]">
        <div
          aria-hidden
          className="note absolute inset-0 translate-x-1 translate-y-3 rotate-[3deg] bg-note-lilac opacity-90 sm:translate-x-3 sm:rotate-[5deg]"
        />
        <Heart aria-hidden className="chalk-rough absolute -top-10 -right-8 hidden size-9 rotate-12 text-[#f5a3b8]/85 sm:block" />
        <SignInForm
          providers={configuredOAuthProviders()}
          redirectTo={redirectTo}
          oauthError={typeof error === "string" ? error : undefined}
          isDev={process.env.NODE_ENV !== "production"}
          emailsLogged={!process.env.RESEND_API_KEY}
        />
      </section>
    </div>
  );
}
