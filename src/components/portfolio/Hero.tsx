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
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
            Dev Portfolio
          </span>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Khizer <span className="font-serif-italic text-foreground/95">Durrani</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={160}>
          <div className="mt-6 h-8 text-lg text-muted-foreground sm:text-xl">
            <Typewriter />
          </div>
        </SectionReveal>

        <SectionReveal delay={240}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build production-grade systems that solve real problems.
          </p>
        </SectionReveal>

        <SectionReveal delay={320}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_0_0_var(--primary-glow)] transition-all duration-300 hover:shadow-[0_0_30px_4px_var(--primary-glow)]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
            >
              Get In Touch
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
