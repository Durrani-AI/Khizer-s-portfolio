import { SectionReveal } from "./SectionReveal";

const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C#", "HTML", "CSS"] },
  { label: "Backend", items: ["FastAPI", "Express.js", "Node.js", "RESTful API Design", "JWT Auth", "Rate Limiting", "CORS"] },
  { label: "Frontend", items: ["Next.js 14", "React", "Tailwind CSS", "AJAX"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB Atlas", "SQL"] },
  { label: "AI & ML", items: ["Groq API", "Ollama", "Generative AI Integration", "ML Fundamentals"] },
  { label: "DevOps & Tools", items: ["Git", "GitHub CI/CD", "Linux", "Render", "Vercel", "Neon", "Docker"] },
  { label: "Data", items: ["Pandas", "NumPy", "Excel"] },
  { label: "Spoken", items: ["English", "Arabic", "Urdu"] },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            01 — About
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            A second-year CS student <span className="font-serif-italic text-muted-foreground">shipping real systems</span> alongside the degree.
          </h2>
        </SectionReveal>

        <SectionReveal delay={120}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I am a second-year Computer Science student at Middlesex University London who builds and ships real production systems alongside my degree. My focus is backend development, AI integration, and full-stack engineering. I am currently seeking internship opportunities where I can contribute technically from day one.
          </p>
        </SectionReveal>

        <SectionReveal delay={200}>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SKILLS.map((group) => (
              <div key={group.label} className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
