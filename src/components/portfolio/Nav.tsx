import { useEffect, useState } from "react";
import { Send, Code2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 transition-all duration-300 ${
          scrolled ? "bg-background/70 backdrop-blur-xl shadow-lg" : "bg-background/40 backdrop-blur-md"
        }`}
      >
        <a
          href="#hero"
          className="flex h-8 w-8 items-center justify-center rounded-full text-primary"
          aria-label="Home"
        >
          <Code2 className="h-4 w-4" />
        </a>
        <div className="mx-2 hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <a
          href="#contact"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
          aria-label="Contact"
        >
          <Send className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}
