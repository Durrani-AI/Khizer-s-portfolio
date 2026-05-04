import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

type Project = {
  name: string;
  href: string;
  summary: string;
  preview: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
};

const PROJECTS: Project[] = [
  {
    name: "Terra Scenik",
    href: "https://terra-scenik.onrender.com/",
    summary: "Full-stack social platform",
    preview: {
      src: "/project-previews/terra-scenik-reference.svg",
      alt: "Terra Scenik landing page screenshot",
      objectPosition: "50% 50%",
    },
  },
  {
    name: "Codeverse",
    href: "https://ai-codeverse.vercel.app/",
    summary: "AI interview platform",
    preview: {
      src: "/project-previews/codeverse-reference.svg",
      alt: "Codeverse landing page screenshot",
      objectPosition: "50% 50%",
    },
  },
  {
    name: "LockedIn",
    href: "https://locke-in.vercel.app/",
    summary: "Application tracker with AI tailoring",
    preview: {
      src: "/project-previews/lockedin.png",
      alt: "LockedIn landing page screenshot",
      objectPosition: "50% 10%",
    },
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name}: ${project.summary}`}
      className="group block"
    >
      <figure className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/35 p-2 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/35 group-hover:shadow-[0_34px_80px_-34px_var(--primary-glow)]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.1rem] bg-black">
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            style={{ objectPosition: project.preview.objectPosition ?? "50% 10%" }}
          />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_40%,rgba(255,255,255,0.02))]" />
          <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/12 bg-black/45 text-white/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <figcaption className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-foreground">{project.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{project.summary}</p>
          </div>
          <span className="shrink-0 rounded-full border border-border/70 bg-secondary/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:border-primary/35 group-hover:text-foreground">
            Live Site
          </span>
        </figcaption>
      </figure>
    </a>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              02 — Work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              <WordReveal text="Work" />
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm text-muted-foreground">
            Click any screenshot to open the live project.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 min-[700px]:grid-cols-3 min-[700px]:gap-4 lg:gap-6">
          {PROJECTS.map((p, i) => (
            <SectionReveal key={p.name} delay={i * 90}>
              <ProjectCard project={p} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
