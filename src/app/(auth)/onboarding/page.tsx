import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { suggestHandle } from "@/lib/handles";
import { requireUser } from "@/lib/session";
import { OnboardingForm } from "./onboarding-form";

export const metadata: Metadata = {
  title: "Pick your handle · ShipDaily",
};

export default async function OnboardingPage() {
  const user = await requireUser();
  if (user.handle) redirect("/home");

  return (
    <OnboardingForm defaultName={user.name} defaultHandle={suggestHandle(user.name, user.email)} image={user.image} />
  );
}
