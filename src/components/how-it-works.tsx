import { Crown, CurlyArrow, Squiggle } from "@/components/doodles";

const STEPS = [
  { title: "Join the Discord", body: "Say hi, share what you're building and what you're stuck on." },
  { title: "Add your product", body: "Create its page on the showcase wall with your story and links." },
  { title: "Share every launch", body: "Post launch links, updates and blogs as you ship. The community shows up." },
  { title: "Help someone else", body: "Give feedback, answer a question, pass on a tool. That's the deal." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto w-full max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 md:py-24">
      <Crown aria-hidden className="chalk-rough absolute top-20 -left-14 hidden h-8 w-11 -rotate-12 text-[#f6d365]/85 xl:block" />
      <h2 className="chalk font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight md:text-[3.4rem]">
        How it works
      </h2>
      <Squiggle aria-hidden className="chalk-rough mt-3 h-4 w-32 text-mint/80" />

      <ol className="relative mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="chalk block font-display text-6xl font-semibold text-mint">{i + 1}</span>
            <h3 className="chalk mt-3 font-display text-xl font-semibold">{step.title}</h3>
            <p className="chalk-text mt-2 text-lg leading-snug text-chalk-dim">{step.body}</p>
            {i < STEPS.length - 1 && (
              <CurlyArrow
                aria-hidden
                className="chalk-rough absolute top-2 -right-6 hidden h-10 w-16 -rotate-12 text-chalk/50 md:block"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
