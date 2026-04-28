import { useEffect, useState } from "react";

const PHRASES = [
  "Full Stack Developer",
  "CS Student at Middlesex University London",
];

export function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    const atFull = !deleting && text === current;
    const atEmpty = deleting && text === "";

    if (atFull) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (atEmpty) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }

    const speed = deleting ? 28 : 55;
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  return (
    <span className="inline-flex items-baseline text-foreground/90">
      <span className="font-serif-italic text-primary">{text}</span>
      <span className="caret" aria-hidden />
    </span>
  );
}
