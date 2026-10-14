import { Community } from "@/components/community";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Join } from "@/components/join";
import { Nav } from "@/components/nav";
import { Pillars } from "@/components/pillars";
import { Showcase } from "@/components/showcase";
import { Vision } from "@/components/vision";

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
