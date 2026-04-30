import { useEffect, useRef, type ElementType } from "react";

/**
 * Splits text into words and animates each word in (blur + slide up + fade)
 * every time the element enters the viewport on scroll. Replays on every
 * re-entry for an extra-engaging feel.
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("wr-in");
          } else {
            el.classList.remove("wr-in");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    // If already in view on mount, reveal immediately.
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) * 0.95 &&
      rect.bottom > 0;
    if (inView) el.classList.add("wr-in");

    return () => io.disconnect();
  }, []);

  const tokens = text.split(/(\s+)/).filter(Boolean);
  const Component = Tag as any;
  let wordIndex = 0;

  return (
    <Component ref={ref as any} className={`word-reveal ${className}`} aria-label={text}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={i} className="wr-space" aria-hidden="true">
              {token}
            </span>
          );
        }

        const delay = startDelay + wordIndex * stagger;
        wordIndex += 1;

        return (
          <span key={i} className="wr-word" aria-hidden="true">
            <span className="wr-inner" style={{ transitionDelay: `${delay}ms` }}>
              {token}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
