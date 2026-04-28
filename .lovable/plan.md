# Khizer Durrani — Developer Portfolio

A single-page, dark, minimal, "senior dev built this" portfolio. Deep near-black background, sharp white type, one electric-cyan accent, soft glow vignette behind the hero, refined italic accent in the headline (mirroring the reference screenshot). Smooth scroll, subtle scroll-in animations, fully responsive.

> Stack note: this project runs on **TanStack Start (React 19 + TypeScript + Tailwind v4 + Vite)**, not Next.js 14. Same modern React + TS + Tailwind foundation — visually and functionally identical to what you described. The Next-specific bits (App Router, etc.) aren't needed for a portfolio site.

---

## Visual direction

- **Background**: near-black `#0A0A0B` with a soft radial glow behind the hero (cyan, very low opacity) — matches the vignette in your reference.
- **Text**: pure white headings, muted gray body (`#A1A1AA`).
- **Accent**: electric cyan `#22D3EE` used sparingly — Featured badge, link underlines on hover, focus rings, button glow.
- **Type**: Inter for body + UI, Instrument Serif italic for the accent words in the hero ("Full Stack Developer" style emphasis), mirroring the reference's italic treatment.
- **Surfaces**: project cards use `#111114` with a 1px `#1F1F23` border; on hover, border shifts to cyan/30 and a subtle cyan glow appears.
- **Motion**: `scroll-behavior: smooth`, fade-up entrance on each section via IntersectionObserver, hero typed/rotating phrase animation.
- **Layout rhythm**: generous vertical spacing (sections breathe), max-width ~1100px, centered.

---

## Sections

**1. Hero (full viewport)**
- Floating pill nav at top: left logo mark, center links (Projects · About · Contact), right small icon. Sticky with backdrop blur.
- Small "DEV PORTFOLIO" pill chip.
- Headline: **Khizer Durrani** (large, tight tracking).
- Rotating/typed sub-headline cycling through: *Full Stack Developer* → *CS Student at Middlesex University London* (typewriter effect with blinking caret).
- One-liner: "I build production grade systems that solve real problems."
- Two buttons side-by-side: **View My Work** (scrolls to #projects), **Get In Touch** (scrolls to #contact). Primary button has a soft cyan glow on hover.
- Soft radial glow behind everything.

**2. About**
- 2–3 sentence intro (verbatim from spec).
- Skill categories as grouped pill tags: Languages · Backend · Frontend · Databases · AI & ML · DevOps & Tools · Data · Spoken Languages. Each category gets a small uppercase label and a wrapped row of pills.

**3. Projects** (the centerpiece)
- Three large dark cards, stacked on mobile, 1-col on tablet, can be a tighter grid on desktop. Each card:
  - Project name (large)
  - Short description
  - Tech stack as small tags
  - GitHub link button (with arrow icon)
  - **Terra Scenik** — full project copy as specified
  - **Codeverse** — with cyan **Featured** badge
  - **LockeIn** — with **In Development** badge (muted amber/cyan outline)
- Hover: border glows cyan, card lifts subtly, tags brighten.
- Note: your spec left the LockeIn description blank — I'll use a tasteful placeholder ("AI-powered focus and productivity platform combining LLM agents with structured workflows.") and you can edit one line after.

**4. Certifications**
- Compact 2-column (desktop) / 1-column (mobile) list of small badge rows. Each row: small cyan dot + cert name + issuer in muted text. All 7 certs included. Section is intentionally short.

**5. Contact**
- Heading "Get In Touch" + line "Open to internship opportunities, collaborations, and conversations."
- Split layout (stacks on mobile):
  - Left: email `kahmeddurrani@gmail.com`, LinkedIn, GitHub `github.com/Durrani-AI` — each as an icon + label row.
  - Right: form with Name, Email, Message, Send button. Visual only in v1 (button shows a toast on submit so it doesn't feel dead).

**Footer**: thin line, © Khizer Durrani 2026, small "Built from scratch" note.

---

## Technical notes

- Single route `/` (TanStack Start `src/routes/index.tsx`) with sections as components in `src/components/portfolio/` (Hero, About, Projects, Certifications, Contact, Nav, Footer).
- Smooth in-page scroll via anchor IDs (`#about`, `#projects`, `#contact`) — appropriate exception to the "separate routes" rule because this is a true single-scroll portfolio.
- `head()` metadata: title "Khizer Durrani — Full Stack Developer", description, OG tags.
- Tailwind v4 theme tokens added to `src/styles.css`: dark background, cyan accent, card surface, border tone.
- Fonts loaded via Google Fonts `<link>` in root head (Inter + Instrument Serif).
- Reusable `<SectionReveal>` wrapper using IntersectionObserver for fade-up on scroll.
- Typewriter component: pure React state + `setInterval`, no library.
- Form uses controlled inputs + zod validation client-side; submit shows a sonner toast ("Thanks — I'll get back to you shortly.") since no backend is requested in v1.
- Fully responsive via Tailwind breakpoints; tested mental model: 360px → 1440px.

---

## GitHub connection

I can't click the Connectors panel for you. After the build finishes, open **Connectors → GitHub → Connect project** in the Lovable sidebar and authorize. From then on, every change syncs both ways automatically.

---

## Out of scope for v1
- Functional contact form backend (visual + toast only).
- Blog/articles route.
- Light mode.

Ready to build on approval.