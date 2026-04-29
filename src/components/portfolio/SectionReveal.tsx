import { useEffect, useRef, type ReactNode, type ElementType } from "react";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => el.classList.add("is-visible"), delay);
          } else {
            if (timeout) clearTimeout(timeout);
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);

    // Reveal immediately if already in viewport on mount.
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;
    if (inView) {
      timeout = setTimeout(() => el.classList.add("is-visible"), delay);
    }

    return () => {
      io.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [delay]);

  const Component = Tag as any;
  return (
    <Component ref={ref as any} className={`reveal ${className}`}>
      {children}
    </Component>
  );
}
