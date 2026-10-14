import { Logo } from "@/components/logo";
import { APP_URL, DISCORD_URL, GITHUB_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="chalk-text flex flex-col items-center justify-between gap-6 text-lg text-chalk-dim md:flex-row">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="ml-2">Built in public. MIT licensed.</span>
        </div>
        <nav className="flex gap-6">
          <a href={APP_URL} className="hover:text-chalk">App</a>
          <a href={DISCORD_URL} className="hover:text-chalk">Discord</a>
          <a href={GITHUB_URL} className="hover:text-chalk">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
