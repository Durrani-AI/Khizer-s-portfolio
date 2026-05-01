import { ArrowUpRight, Github } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

type Project = {
  name: string;
  description: string;
  stack: string[];
  github: string;
  badge?: { label: string; tone: "featured" | "wip" };
};

const PROJECTS: Project[] = [
  {
    name: "Terra Scenik",
    description:
      "A full-stack social media platform with authentication, follows, feeds, likes, search, and full post management, built end to end from database to frontend.",
    stack: ["Express.js", "MongoDB Atlas", "AJAX", "Multer", "Node.js"],
    github: "https://github.com/Durrani-AI",
  },
  {
    name: "Codeverse",
    description:
      "An AI-powered technical interview platform where users practice coding questions in specific programming languages. The AI generates questions, evaluates answers, and provides personalized feedback in real time.",
    stack: ["FastAPI", "Next.js 14", "PostgreSQL", "Groq API", "Ollama", "TypeScript", "Tailwind CSS", "CI/CD"],
    github: "https://github.com/Durrani-AI",
    badge: { label: "Featured", tone: "featured" },
  },
  {
    name: "LockedIn",
    description:
      "An internship and graduate application tracker built for students pursuing roles in finance, tech, law, and consulting. It combines curated listings, status tracking (Saved → Applying → Interviewing → Offer), deadlines, and notes in a single workspace. A standout feature is AI-powered application tailoring that generates cover letters and CV edits from any job page using a saved voice profile, with every tailored document linked to the role it was written for.",
    stack: ["Next.js 14", "FastAPI", "Supabase", "Groq API", "LangChain", "Python"],
    github: "https://github.com/Durrani-AI",
    badge: { label: "In Development", tone: "wip" },
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            02 — My Projects
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <WordReveal text="Projects I've shipped." />
          </h2>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6">
          {PROJECTS.map((p, i) => (
            <SectionReveal key={p.name} delay={i * 100}>
              <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_var(--primary-glow)] sm:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {p.name}
                      </h3>
                      {p.badge && (
                        <span
                          className={
                            p.badge.tone === "featured"
                              ? "rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-primary"
                              : "rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                          }
                        >
                          {p.badge.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-[11px] text-foreground/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-secondary/60 px-4 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
