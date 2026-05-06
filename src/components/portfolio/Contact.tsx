import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SectionReveal } from "./SectionReveal";
import { WordReveal } from "./WordReveal";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_MESSAGE_MIN_LENGTH = 20;
const CONTACT_MESSAGE_MIN_WORDS = 4;
const CONTACT_MESSAGE_MIN_LETTERS = 12;
const CONTACT_MESSAGE_MAX_REPEAT_RUN = 7;
const CONTACT_COOLDOWN_MS = 60_000;
const CONTACT_COOLDOWN_STORAGE_KEY = "contact_form_last_sent_at";
const CONTACT_EMAIL = "kahmeddurrani@gmail.com";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

function getMessageValidationError(message: string) {
  if (message.length < CONTACT_MESSAGE_MIN_LENGTH) {
    return `Message must be at least ${CONTACT_MESSAGE_MIN_LENGTH} characters.`;
  }

  const meaningfulWords = message.match(/[A-Za-z]{2,}/g) ?? [];
  const letterCount = (message.match(/[A-Za-z]/g) ?? []).length;

  if (meaningfulWords.length < CONTACT_MESSAGE_MIN_WORDS || letterCount < CONTACT_MESSAGE_MIN_LETTERS) {
    return "Please write a clear message with a few words about why you're reaching out.";
  }

  if (new RegExp(`(.)\\1{${CONTACT_MESSAGE_MAX_REPEAT_RUN},}`).test(message)) {
    return "Please remove repeated characters and write a clear message.";
  }

  return null;
}

function openMailFallback(name: string, email: string, message: string) {
  if (typeof window === "undefined") return;

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

function getEmailjsFailureMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "text" in error && typeof error.text === "string") {
    if (error.text.toLowerCase().includes("service id not found")) {
      return "The contact form is temporarily unavailable. Opening your email app instead.";
    }
  }

  return "Couldn't send the form here. Opening your email app instead.";
}

function getContactTitle(message: string) {
  const normalized = message.replace(/\s+/g, " ").trim();
  if (!normalized) return "Portfolio contact";

  return normalized.length > 60 ? `${normalized.slice(0, 57)}...` : normalized;
}

function getCooldownRemainingMs() {
  if (typeof window === "undefined") return 0;

  const raw = window.localStorage.getItem(CONTACT_COOLDOWN_STORAGE_KEY);
  const lastSentAt = Number(raw || "0");
  if (!Number.isFinite(lastSentAt) || lastSentAt <= 0) return 0;

  return Math.max(0, lastSentAt + CONTACT_COOLDOWN_MS - Date.now());
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const messageValidationError = getMessageValidationError(message);
    if (messageValidationError) {
      toast.error(messageValidationError);
      return;
    }

    const remainingCooldownMs = getCooldownRemainingMs();
    if (remainingCooldownMs > 0) {
      const remainingSeconds = Math.ceil(remainingCooldownMs / 1000);
      toast.error(`Please wait ${remainingSeconds}s before sending another message.`);
      return;
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      toast.error("Contact form is not configured yet. Add EmailJS environment variables.");
      return;
    }

    try {
      setIsSubmitting(true);
      const title = getContactTitle(message);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          title,
          from_name: name,
          from_email: email,
          message,
          reply_to: email,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      if (typeof window !== "undefined") {
        window.localStorage.setItem(CONTACT_COOLDOWN_STORAGE_KEY, String(Date.now()));
      }

      toast.success("Thanks - I'll get back to you shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS send failed", error);
      toast.error(getEmailjsFailureMessage(error));
      openMailFallback(name, email, message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            04 — Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <WordReveal text="Get in Touch" />
          </h2>
          <div className="mt-3 h-px w-67 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
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
                href="https://www.linkedin.com/in/khizer-ahmed-durrani-997947356/"
                target="_blank"
                rel="noopener noreferrer"
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
                rel="noopener noreferrer"
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
                  required
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
                  required
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
                  minLength={CONTACT_MESSAGE_MIN_LENGTH}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about a role, an idea, or just say hi."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_4px_var(--primary-glow)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
