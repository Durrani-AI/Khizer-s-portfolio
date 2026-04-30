import { useState, type FormEvent } from "react";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Thanks — I'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            04 — Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <WordReveal text="Get in Touch" />
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            <WordReveal text="Open to internship opportunities, collaborations, and conversations." stagger={40} />
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <SectionReveal delay={100}>
            <div className="space-y-4">
              <a
                href="mailto:kahmeddurrani@gmail.com"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Email</p>
                  <p className="truncate text-sm text-foreground">kahmeddurrani@gmail.com</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                  <Linkedin className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">LinkedIn</p>
                  <p className="truncate text-sm text-foreground">Connect with me</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>

              <a
                href="https://github.com/Durrani-AI"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-primary">
                  <Github className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">GitHub</p>
                  <p className="truncate text-sm text-foreground">github.com/Durrani-AI</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={180}>
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8"
            >
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about a role, an idea, or just say hi."
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_4px_var(--primary-glow)]"
              >
                Send Message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
