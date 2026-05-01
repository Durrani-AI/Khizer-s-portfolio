export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Khizer Durrani</p>
        <p>Built from scratch · Designed & engineered with care.</p>
      </div>
    </footer>
  );
}
