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

## Docs Layout and Page Template

The documentation pages use Fumadocs' `DocsLayout` with significant custom enhancements.

### Page Header
- **Stage-colored left border**: `docs-page-header` class with `borderLeftColor` set dynamically from stage color
- **Instrument Serif H1**: page title rendered via `docs-title` class (the only use of Instrument Serif in docs)
- **Progress badge**: "Module X of 15" or "Stage N of 5" rendered by `PageMeta` component in stage color
- **Reading time**: estimated from ToC section count, shown as "X min read"
- **Progress bar**: thin colored line showing position in the 15-module journey

### Stage Color Mapping
Computed by `lib/page-utils.ts` based on the URL slug:
- `stage-1-identify/*` -- Stage 1 color (amber)
- `stage-2-diagnose/*` -- Stage 2 color (orange)
- `stage-3-earn/*` -- Stage 3 color (red-orange)
- `stage-4-assess/*` -- Stage 4 color (rose)
- `stage-5-lock/*` -- Stage 5 color (purple)
- `extensions/*` -- accent-warm (amber)
- Other pages -- no stage accent

### Scroll Progress
Fixed 2px bar at the very top of the viewport, colored with the stage accent. Only appears on stage/module pages.

### Enhanced MDX Components
The `components/mdx-enhanced.tsx` file overrides the default `strong` element to auto-detect manuscript patterns:
- **Callout patterns** (e.g. "Output for this module", "Stage Rules", "Closing line"): rendered with amber highlight background
- **Exercise patterns** (e.g. "Exercise: 20 Frictions"): rendered with pencil icon in amber
- **Template patterns** (e.g. "Friction log template", "Scorecard template"): rendered with clipboard icon

Detection is regex-based -- do not change the bold label text in the manuscript content without updating the patterns in `mdx-enhanced.tsx`.

### Bottom Navigation
Custom prev/next cards replace Fumadocs default (`footer: { enabled: false }`):
- Previous: left-aligned, standard border, shows title + description
- Next: right-aligned, stage-colored border and title, shows title + description
- Both have `hover:-translate-y-0.5` lift effect
- Order follows `lib/reading-order.ts`, NOT `source.getPages()` filesystem order

### Sidebar Customization
- `SidebarSeparator`: stage section headings get colored dots matching IDEAL stage colors
- `SidebarItem`: shows progress state icons (green checkmark, lock, dot)
- `defaultOpenLevel: 1`: stage folders expanded by default
- Locked items are visually dimmed (`opacity-40`) and non-clickable

### Progress Gating System
Sequential reading enforced via `ProgressProvider` context:
- **Storage**: localStorage key `tvp-progress` + cookie `tvp-progress` (1-year max-age)
- **Unlock rule**: completing page N (85% scroll) unlocks page N+1
- **Gate behavior**: `ProgressGate` component shows lock icon + message, then redirects via `router.replace()`
- **Tracking**: `ReadingTracker` component monitors `window.scrollY / docHeight >= 0.85`
- **First page**: `/docs` (Introduction) is always unlocked
- **Reset**: `resetProgress()` available from `useProgress()` hook

### Content Page Editing Patterns
When editing or creating MDX content pages:

**Use Fumadocs components for visual richness:**
```mdx
<Callout type="idea" title="Key concept">
  Content that deserves visual emphasis.
</Callout>

<Cards>
  <Card title="Card title" description="Card description" href="/docs/..." />
</Cards>
```

**Callout types available**: `idea` (lightbulb), `info` (blue circle), `warn` (yellow), `error` (red), `success` (green)

**Do not:**
- Duplicate the frontmatter title as an H1 or H2 in the body
- Include publisher metadata (back cover copy, pitches, author structural notes)
- Use em dashes
- Start list items with `# ` (interpreted as heading)

**Do:**
- Use `full: true` in frontmatter when using Cards or wide layouts
- Wrap wide content in `<div className="mx-auto max-w-3xl">` for optimal reading width in full mode
- Link to other pages with relative paths: `[Stage 1](/docs/stage-1-identify)`
- Keep bold labels matching the patterns in `mdx-enhanced.tsx` for auto-styling

---

## File Map

| File | Purpose |
|------|---------|
| `app/global.css` | CSS custom properties, utility classes, grain/gradient effects, docs styles |
| `app/layout.tsx` | Root layout: fonts (Inter + Instrument Serif), metadata, RootProvider |
| `app/(home)/layout.tsx` | Home layout wrapper (Fumadocs HomeLayout with nav title) |
| `app/(home)/page.tsx` | Landing page: all sections + footer |
| `app/docs/layout.tsx` | Docs layout: DocsLayout with ProgressProvider, sidebar config |
| `app/docs/[[...slug]]/page.tsx` | Docs page renderer: stage accent, progress, gate, nav |
| `app/docs/sidebar-components.tsx` | Client components: SidebarSeparator, SidebarItem with progress |
| `lib/source.ts` | Fumadocs content loader |
| `lib/reading-order.ts` | Canonical 30-page reading sequence |
| `lib/page-utils.ts` | Stage color mapping, module index, reading time |
| `lib/progress.tsx` | ProgressProvider context, localStorage + cookie persistence |
| `components/mdx.tsx` | Base MDX component overrides |
| `components/mdx-enhanced.tsx` | Pattern-detecting enhanced strong component |
| `components/docs-components.tsx` | ScrollProgress bar, PageMeta badge (client) |
| `components/progress-gate.tsx` | ProgressGate (redirects) + ReadingTracker (scroll) |

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

Styled as `font-display text-3xl italic text-fd-muted-foreground md:text-4xl` with `border-t border-fd-border pt-10` as visual separator.

---

## Standing Rule: Continuous Documentation

After implementing any visual, structural, or UX change, ALWAYS update:
1. This file (`DESIGN-SYSTEM.md`) with comprehensive details
2. `.cursor/rules/design-system.mdc` with the quick reference
3. `.cursor/rules/project-conventions.mdc` with any new structural/technical patterns

This ensures all future work stays cohesive and aligned. Never skip this step.

---

## Checklist for New Landing Page Sections

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

## Checklist for Editing Content Pages

- [ ] No duplicate H1 (frontmatter title handles it)
- [ ] No publisher/internal metadata (back cover, pitches, author notes)
- [ ] Uses `<Callout>` for key concepts and rules
- [ ] Uses `<Cards>` + `<Card>` for navigation grids and overviews
- [ ] Bold labels follow manuscript patterns for auto-detection
- [ ] Links to other pages use relative paths (`/docs/stage-1-identify/friction-scan`)
- [ ] `full: true` in frontmatter if using Cards or wide layouts
- [ ] No em dashes
- [ ] Tested visually in browser after changes
- [ ] Design decisions documented in this file and `.cursor/rules/`
