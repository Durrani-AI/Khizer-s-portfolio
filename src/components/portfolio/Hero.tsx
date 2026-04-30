import { ArrowRight } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { SectionReveal } from "./SectionReveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionReveal>
          <div></div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl">
            <span className="font-serif-italic text-foreground/95">Khizer A Durrani</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={160}>
          <div className="mt-6 h-8 text-lg text-muted-foreground sm:text-xl">
            <Typewriter />
          </div>
        </SectionReveal>

        

        <SectionReveal delay={320}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
