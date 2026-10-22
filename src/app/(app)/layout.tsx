import type { Metadata } from "next";
import { AppHeader } from "@/components/app/app-header";
import { requireOnboardedUser } from "@/lib/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireOnboardedUser();

  return (
    <>
      <AppHeader user={user} />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
    </>
  );
}
