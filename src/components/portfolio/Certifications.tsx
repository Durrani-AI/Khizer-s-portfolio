import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

const CERTS = [
  { name: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
  { name: "Human Skills in the Age of AI", issuer: "Microsoft & LinkedIn" },
  { name: "Artificial Intelligence Foundations: Thinking Machines", issuer: "LinkedIn Learning" },
  { name: "Introduction to Artificial Intelligence", issuer: "LinkedIn Learning" },
  { name: "Responsible AI Foundations", issuer: "LinkedIn Learning" },
  { name: "Amplify Your Critical Thinking with Generative AI", issuer: "LinkedIn Learning" },
  { name: "Programming Foundations: Beyond the Fundamentals", issuer: "LinkedIn Learning" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            03 — Credentials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <WordReveal text="Certifications" />
          </h2>
        </SectionReveal>

        <SectionReveal delay={120}>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
            {CERTS.map((c) => (
              <li
                key={c.name}
                className="flex items-start gap-3 border-b border-border/40 py-3"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                <div>
                  <p className="text-sm text-foreground/90">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
