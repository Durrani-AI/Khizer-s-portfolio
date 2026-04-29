import { useState } from "react";
import { Code2, Server, Layout, Database, Sparkles, Wrench, BarChart3, Globe } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

type Category = {
  key: string;
  label: string;
  icon: typeof Code2;
  blurb: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    key: "languages",
    label: "Languages",
    icon: Code2,
    blurb: "Day-to-day languages I reach for across the stack.",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C#", "HTML", "CSS"],
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: Layout,
    blurb: "Building fast, accessible interfaces with modern React.",
    items: ["Next.js 14", "React", "Tailwind CSS", "AJAX"],
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    blurb: "API design, auth, and the boring-but-critical infrastructure.",
    items: ["FastAPI", "Express.js", "Node.js", "RESTful APIs", "JWT Auth", "Rate Limiting", "CORS"],
  },
  {
    key: "databases",
    label: "Databases",
    icon: Database,
    blurb: "Modeling data and writing queries that don't bite later.",
    items: ["PostgreSQL", "MongoDB Atlas", "SQL"],
  },
  {
    key: "ai",
    label: "AI & ML",
    icon: Sparkles,
    blurb: "Wiring LLMs into real products end to end.",
    items: ["Groq API", "Ollama", "Generative AI Integration", "ML Fundamentals"],
  },
  {
    key: "devops",
    label: "DevOps & Tools",
    icon: Wrench,
    blurb: "Shipping, deploying, and keeping things alive.",
    items: ["Git", "GitHub CI/CD", "Linux", "Render", "Vercel", "Neon", "Docker"],
  },
  {
    key: "data",
    label: "Data",
    icon: BarChart3,
    blurb: "Cleaning, exploring, and making sense of messy datasets.",
    items: ["Pandas", "NumPy", "Excel"],
  },
  {
    key: "spoken",
    label: "Spoken",
    icon: Globe,
    blurb: "Languages I speak fluently outside of code.",
    items: ["English", "Arabic", "Urdu"],
  },
];

export function About() {
  const [active, setActive] = useState<string>("frontend");
  const current = CATEGORIES.find((c) => c.key === active) ?? CATEGORIES[0];

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-foreground/[0.04] blur-3xl" />
        <div className="animate-float-slow-2 absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-foreground/[0.03] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-foreground">01</span> — About
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <WordReveal text="A second-year CS student shipping real systems alongside the degree." />
          </h2>
        </SectionReveal>

        <SectionReveal delay={120}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <WordReveal
              text="I'm a second-year Computer Science student at Middlesex University London who builds and ships real production systems alongside my degree. My focus is backend development, AI integration, and full-stack engineering. Currently seeking internship opportunities where I can contribute technically from day one."
              stagger={25}
            />
          </p>
        </SectionReveal>

        {/* Skills explorer */}
        <SectionReveal delay={200}>
          <div className="mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Toolkit
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Pick a category.
                </h3>
              </div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                {String(CATEGORIES.findIndex((c) => c.key === active) + 1).padStart(2, "0")} /{" "}
                {String(CATEGORIES.length).padStart(2, "0")}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Skill categories"
                className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1.5"
              >
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.key === active;
                  return (
                    <button
                      key={cat.key}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(cat.key)}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                        isActive
                          ? "border-foreground/30 bg-foreground/[0.06] text-foreground"
                          : "border-border/60 bg-card/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[2px] origin-top transition-transform duration-300 ${
                          isActive ? "scale-y-100 bg-foreground/70" : "scale-y-0 bg-foreground/40 group-hover:scale-y-100"
                        }`}
                      />
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 font-medium">{cat.label}</span>
                      <span className="text-[10px] tabular-nums text-muted-foreground/70">
                        {String(cat.items.length).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Panel */}
              <div
                key={current.key}
                className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur"
              >
                <div className="pointer-events-none absolute inset-0 noise-bg opacity-[0.07]" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40">
                      <current.icon className="h-4 w-4 text-foreground" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Category
                      </p>
                      <p className="text-base font-semibold text-foreground">{current.label}</p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {current.blurb}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {current.items.map((item, i) => (
                      <span
                        key={`${current.key}-${item}`}
                        className="animate-slide-in-left rounded-full border border-border/70 bg-background/50 px-3.5 py-1.5 text-xs text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-foreground/[0.05]"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
