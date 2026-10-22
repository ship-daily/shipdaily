import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center px-5 pt-6 sm:px-8">
        <Link href="/" aria-label="ShipDaily home">
          <Logo />
        </Link>
      </header>
      <main className="relative z-10 flex flex-1 flex-col overflow-x-clip">{children}</main>
    </>
  );
}
