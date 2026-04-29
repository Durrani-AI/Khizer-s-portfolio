import { useEffect, useRef, type ElementType } from "react";

/**
 * Splits text into words and animates each word in (blur + slide up + fade)
 * as the element enters the viewport on scroll. A staple "scroll-aware"
 * portfolio animation.
 */
export function WordReveal({
  text,
  as: Tag = "span",
  className = "",
  stagger = 60,
  startDelay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between each word */
  stagger?: number;
  /** ms before the first word */
  startDelay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("wr-in");

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) * 0.95 &&
      rect.bottom > 0;
    if (inView) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  const Component = Tag as any;

  return (
    <Component ref={ref as any} className={`word-reveal ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="wr-word" aria-hidden="true">
          <span
            className="wr-inner"
            style={{ transitionDelay: `${startDelay + i * stagger}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
