import { Community } from "@/components/marketing/community";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Join } from "@/components/marketing/join";
import { Nav } from "@/components/marketing/nav";
import { Pillars } from "@/components/marketing/pillars";
import { Showcase } from "@/components/marketing/showcase";
import { Vision } from "@/components/marketing/vision";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <Pillars />
        <Showcase />
        <Community />
        <HowItWorks />
        <Vision />
        <Join />
      </main>
      <Footer />
    </>
  );
}
