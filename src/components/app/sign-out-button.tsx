"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={`${buttonStyles.outline} px-3 py-2`}>
      <LogOut className="size-4" aria-hidden />
      <span className="hidden sm:inline">{pending ? "Signing out…" : "Sign out"}</span>
    </button>
  );
}
