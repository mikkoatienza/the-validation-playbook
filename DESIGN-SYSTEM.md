# Design System: The Validation Playbook Doc Site

This document captures every design decision, pattern, and convention used across the site. Follow these guidelines when adding new pages, sections, or components to keep the experience cohesive.

---

## Brand Identity

**Product name**: The Validation Playbook
**Tagline**: Find the Idea Worth Building
**Voice**: Direct, honest, no-hype. The book speaks to early-stage founders with clarity and urgency. The site should feel like a trusted mentor, not a marketing brochure.
**Metaphor**: The site evokes a "published book" feel -- warm, editorial, tactile -- rather than a typical SaaS docs page.

---

## Color System

All colors are defined as CSS custom properties in `app/global.css` using HSL values (without the `hsl()` wrapper, following Fumadocs convention).

### Core Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--fd-primary` | Navy `222.2 47.4% 11.2%` | Near-white `210 40% 98%` | Primary text, default button fill in docs |
| `--fd-primary-foreground` | Near-white `210 40% 98%` | Navy `222.2 47.4% 11.2%` | Text on primary backgrounds |
| `--fd-muted` | Light gray `210 40% 96.1%` | Dark gray `217.2 32.6% 17.5%` | Muted backgrounds (card alt, empty states) |
| `--fd-muted-foreground` | Mid-gray `215.4 16.3% 46.9%` | Light gray `215 20.2% 65.1%` | Secondary text, descriptions, captions |
| `--fd-accent` | Light gray `210 40% 96.1%` | Dark gray `217.2 32.6% 17.5%` | Hover states, subtle highlights |

### Warm Accent (Brand Color)

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--accent-warm` | Amber `38 92% 50%` | Bright amber `43 96% 56%` | Primary CTA buttons, section labels, icon color, focus rings, hover borders |
| `--accent-warm-foreground` | Dark brown `26 83% 14%` | Same | Text on amber backgrounds |

**Rule**: Amber is the *only* non-neutral color used in the landing page and marketing surfaces. It signals action and warmth. Do not introduce additional brand colors.

### Stage Colors (IDEAL progression)

Each IDEAL stage has a unique hue that creates a warm-to-cool gradient across the framework, reinforcing the sense of a journey.

| Token | Light Mode | Dark Mode | Stage |
|-------|-----------|-----------|-------|
| `--stage-1` | Amber `38 92% 50%` | `43 96% 56%` | Identify |
| `--stage-2` | Orange `25 95% 53%` | `30 95% 58%` | Diagnose |
| `--stage-3` | Red-orange `15 90% 50%` | `20 90% 55%` | Earn |
| `--stage-4` | Rose `350 80% 50%` | `350 80% 60%` | Assess |
| `--stage-5` | Purple `262 60% 50%` | `262 60% 65%` | Lock |

**Rule**: Stage colors are used *only* in the IDEAL stepper/journey component and stage-specific accents. They should not leak into general UI elements.

### How to Use Colors

```tsx
// Tailwind utility classes (defined in global.css @layer utilities)
className="text-accent-warm"        // amber text
className="bg-accent-warm"          // amber background
className="border-accent-warm"      // amber border

// Fumadocs semantic classes (always available)
className="text-fd-muted-foreground" // secondary text
className="bg-fd-card"               // card background
className="border-fd-border"         // standard border

// Stage colors via inline styles (dynamic)
style={{ color: `hsl(${stage.color})` }}
style={{ backgroundColor: `hsl(${stage.color} / 0.04)` }}
style={{ borderColor: `hsl(${stage.color} / 0.3)` }}
```

---

## Typography

### Font Stack

| Role | Font | Weight | CSS Variable | Usage |
|------|------|--------|-------------|-------|
| Display | Instrument Serif | 400 (regular) | `--font-display` | Hero headings, section titles, pull quotes, stat callouts |
| Body | Inter | 400-700 | Default (applied via `className` on `<html>`) | All body text, UI labels, descriptions, navigation |

Both fonts are loaded from Google Fonts in `app/layout.tsx`.

### Display Font Usage

Apply with the utility class `font-display` (defined in `global.css`):

```tsx
<h1 className="font-display text-4xl">...</h1>
<blockquote className="font-display text-2xl italic">...</blockquote>
<p className="font-display text-lg">...</p>
```

**Rule**: Use Instrument Serif for *all* display headings on marketing/landing pages, pull quotes, and stat callouts. Never use it for body text, UI labels, or documentation content. The docs layout uses Inter exclusively.

### Type Scale

| Context | Size | Line Height | Example |
|---------|------|-------------|---------|
| Hero headline | `text-4xl` / `md:text-[3.5rem]` | `leading-[1.15]` / `md:leading-[1.12]` | "Every founder starts with a story..." |
| Section title | `font-display text-2xl md:text-3xl` | default | "Five stages from uncertainty to conviction" |
| Section label | `text-sm uppercase tracking-widest` | default | "THE IDEAL FRAMEWORK" |
| Stat callout | `font-display text-4xl md:text-5xl` | default | "74%" |
| Card heading | `text-sm font-semibold` or `font-display text-xl` | default | "Friction Scan" |
| Body / description | `text-sm` or `text-lg` | `leading-relaxed` | Paragraph text |
| Caption / metadata | `text-xs` | default | Stage labels, module descriptions |

### Section Label Pattern

Every major section uses a consistent label + title pattern:

```tsx
<p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
  Section label here
</p>
<p className="mb-14 text-center font-display text-2xl md:text-3xl">
  Section title here
</p>
```

---

## Spacing and Layout

### Content Width

| Context | Max Width | Class |
|---------|----------|-------|
| Primary content | 1280px | `max-w-5xl` |
| Hero grid | 1152px | `max-w-6xl` |
| Pull quotes | 896px | `max-w-4xl` |
| Narrow content (forms, CTAs) | 672px | `max-w-2xl` |
| Form inputs | 384px | `max-w-sm` |

### Section Padding

| Context | Padding | Class |
|---------|---------|-------|
| Standard section | 96px/112px | `py-24 md:py-28` |
| Hero section | 112px/144px | `py-28 md:py-36` |
| Breathing section (IDEAL stepper) | 96px/128px | `py-24 md:py-32` |
| Pull quotes | 80px/96px | `py-20 md:py-24` |
| Footer | 64px | `py-16` |

**Rule**: Generous vertical padding is intentional. It creates breathing room between sections and reinforces the editorial/book feel. Do not compress sections below `py-20`.

### Horizontal Padding

All sections use `px-6` for consistent edge spacing on mobile.

---

## Component Patterns

### Buttons

**Primary CTA** (amber, high contrast):
```tsx
<Link className="rounded-lg bg-accent-warm px-7 py-3 text-sm font-semibold text-[hsl(var(--accent-warm-foreground))] transition-opacity hover:opacity-90">
  Start the Playbook
</Link>
```

**Secondary CTA** (outlined):
```tsx
<Link className="rounded-lg border border-fd-border px-7 py-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent">
  Read the 2-minute summary
</Link>
```

**Rule**: Primary CTAs use amber background. Secondary CTAs use outlined style. Never place two amber buttons side by side.

### Cards

**Standard content card**:
```tsx
<div className="rounded-xl border border-fd-border bg-fd-background p-5">
  ...
</div>
```

**Interactive/linkable card** (hover border change):
```tsx
<Link className="group rounded-2xl border border-fd-border bg-fd-background p-6 transition-all hover:border-accent-warm hover:shadow-sm">
  ...
  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
</Link>
```

**Stage-tinted card** (dynamic color):
```tsx
<div
  className="rounded-2xl border p-8"
  style={{
    borderColor: `hsl(${stage.color} / 0.3)`,
    backgroundColor: `hsl(${stage.color} / 0.04)`,
  }}
>
```

### Icons

Icons use inline SVGs from [Heroicons](https://heroicons.com/) (outline style, 24x24 viewBox).

```tsx
<svg className="h-8 w-8 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>
```

**Rule**: Icons are amber (`text-accent-warm`), 32px (`h-8 w-8`), outline style with `strokeWidth={1.5}`. Do not use filled icons or mix icon libraries.

### Section Backgrounds

Sections alternate between two background patterns:

| Pattern | Class | Usage |
|---------|-------|-------|
| Default (transparent) | none | Hero, IDEAL stepper, pull quotes, final CTA |
| Card background | `bg-fd-card` | Cost section, persona cards, artifact grid |

**Rule**: Alternating backgrounds create visual rhythm. Adjacent sections should not share the same background type.

### Borders Between Sections

| Pattern | Class | Usage |
|---------|-------|-------|
| Top border | `border-t border-fd-border` | Separating sections with different backgrounds |
| Top + bottom border | `border-y border-fd-border` | Full separation (Cost section) |
| No border | none | Between same-background sections |

---

## Texture and Effects

### Grain Overlay

Applied via `hero-grain` class (defined in `global.css`). Uses an SVG noise pattern at very low opacity (3% light / 6% dark) for a "printed paper" tactile feel.

```tsx
<section className="hero-grain hero-gradient relative ...">
  <div className="relative z-10">
    {/* Content must have z-10 to sit above the grain pseudo-element */}
  </div>
</section>
```

**Rule**: Grain overlay is used *only* on the hero and final CTA sections. Do not apply to every section -- overuse kills the effect.

### Gradient Background

Applied via `hero-gradient` class. Uses two radial gradients: warm amber from top-center and purple from bottom-right.

```css
.hero-gradient {
  background: radial-gradient(
    ellipse 80% 60% at 50% 0%,
    hsl(var(--accent-warm) / 0.06), transparent
  ),
  radial-gradient(
    ellipse 60% 50% at 80% 100%,
    hsl(var(--stage-5) / 0.04), transparent
  );
}
```

**Rule**: Gradient is subtle and never competes with text. Dark mode uses slightly higher opacity values.

---

## Interactive Patterns

### IDEAL Stepper (Desktop)

Five circular letter nodes (`I-D-E-A-L`) in a horizontal row. Active node scales to 1.15x and fills with its stage color. Clicking a node expands its detail panel below.

**State management**: `useState(0)` -- default is Stage 1 expanded. On desktop, one stage is always expanded.

### IDEAL Accordion (Mobile)

Vertical stack of tappable cards. Each card shows stage letter, name, and tagline. Tapping expands to reveal question, modules, and "Read Stage N" link.

**State management**: Same `activeStage` state. On mobile, tapping the active stage collapses it (toggle behavior via `setActiveStage(activeStage === i ? -1 : i)`).

---

## Footer Pattern

Three-column layout on desktop (`md:grid-cols-[1fr_auto_auto]`):
1. **Newsletter** (left, flexible width): heading, description, email input + submit button
2. **Playbook links** (center, auto width): Introduction, Executive Summary, Stage 1, Extensions
3. **Resources links** (right, auto width): 30-Day Plan, Offer Test, Decision Gate

Below: a thin `border-t` separator and centered brand line.

**Rule**: Footer links should surface the most important entry points, not replicate the full sidebar. Limit to 3-4 links per column.

---

## Dark Mode

All custom colors have explicit dark mode overrides in `global.css` under `.dark { ... }`. Key differences:
- Amber accent is slightly brighter in dark mode (higher lightness)
- Stage colors are boosted by 5-10% lightness for readability on dark backgrounds
- Grain overlay opacity doubles (3% to 6%) to remain visible
- Gradient backgrounds use higher opacity (0.06 to 0.1) to maintain the warmth

**Rule**: Always test new sections in both light and dark mode. The warm amber on dark slate is the site's signature visual.

---

## Docs Layout (Separate from Landing)

The documentation pages use Fumadocs' built-in `DocsLayout` with minimal customization:
- Nav title: "The Validation Playbook" in `font-semibold tracking-tight`
- Sidebar: auto-generated from `meta.json` page trees
- Content: rendered via `DocsPage` with `DocsTitle`, `DocsDescription`, `DocsBody`
- No custom theme overrides on docs pages -- Fumadocs neutral theme handles it

**Rule**: Do not apply landing page styles (grain, gradient, amber accents) to documentation content pages. The docs should feel clean and readable. The visual personality lives on the landing page and marketing surfaces.

---

## File Map

| File | Purpose |
|------|---------|
| `app/global.css` | CSS custom properties, utility classes, grain/gradient effects |
| `app/layout.tsx` | Root layout: fonts (Inter + Instrument Serif), metadata, RootProvider |
| `app/(home)/layout.tsx` | Home layout wrapper (Fumadocs HomeLayout with nav title) |
| `app/(home)/page.tsx` | Landing page: all 7 sections + footer |
| `app/docs/layout.tsx` | Docs layout: DocsLayout with sidebar tree |
| `app/docs/[[...slug]]/page.tsx` | Docs page renderer: title, description, body, ToC |

---

## Content Conventions

### Section Structure (Landing Page)

Every landing page section follows this template:

```tsx
<section className="[border] [bg] px-6 py-24 md:py-28">
  <div className="mx-auto max-w-5xl">
    <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
      Section label
    </p>
    <p className="mb-14 text-center font-display text-2xl md:text-3xl">
      Section title
    </p>
    {/* Section content */}
  </div>
</section>
```

### Copy Source

All user-facing copy on the landing page is derived from the manuscript (primarily `front-matter/intro.md` and `front-matter/Foundation.md`). Do not invent new marketing language -- pull from the book's own voice.

### Pull Quotes

Sourced from the manuscript. Current selections:
- "Hope is cheap. Proof is earned."
- "If there is no action, it is not proof yet."
- "Decisions are the unit of progress."

Styled as `font-display text-2xl italic text-fd-muted-foreground md:text-3xl` with `border-t border-fd-border pt-10` as visual separator.

---

## Checklist for New Sections

When adding a new section to the landing page or a new marketing surface:

- [ ] Uses `max-w-5xl` content width
- [ ] Has `px-6` horizontal padding
- [ ] Has `py-24 md:py-28` minimum vertical padding
- [ ] Uses the label + title pattern (uppercase label, `font-display` title)
- [ ] Alternates background with adjacent sections
- [ ] Uses only the defined color tokens (no one-off hex values)
- [ ] Display text uses `font-display` (Instrument Serif)
- [ ] Body text uses Inter (default, no explicit class needed)
- [ ] CTAs follow the primary/secondary button pattern
- [ ] Cards use `rounded-xl border border-fd-border bg-fd-background p-5`
- [ ] Icons are Heroicons outline, 32px, amber
- [ ] Tested in both light and dark mode
- [ ] Copy is derived from manuscript, not invented
