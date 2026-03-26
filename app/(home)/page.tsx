"use client";

import Link from "next/link";
import { useState } from "react";

const stages = [
  {
    number: 1,
    letter: "I",
    name: "Identify",
    tagline: "Find real pain worth solving",
    question: "Is the pain real?",
    color: "var(--stage-1)",
    modules: [
      { name: "Friction Scan", desc: "Detect repeated friction in daily work" },
      {
        name: "Truth Interviews",
        desc: "Surface past behavior, not polite opinions",
      },
      {
        name: "Buyer Definition",
        desc: "Map who decides and pays",
      },
    ],
    href: "/docs/stage-1-identify",
  },
  {
    number: 2,
    letter: "D",
    name: "Diagnose",
    tagline: "Prove the problem is urgent and not already owned",
    question: "Is it worth solving?",
    color: "var(--stage-2)",
    modules: [
      { name: "Risk Map", desc: "Name the assumption that could kill the idea" },
      { name: "Problem Proof", desc: "Score the pain with evidence" },
      {
        name: "Alternatives Scan",
        desc: "Map competitors, substitutes, and DIY",
      },
    ],
    href: "/docs/stage-2-diagnose",
  },
  {
    number: 3,
    letter: "E",
    name: "Earn",
    tagline: "Test commitment, price, and channel",
    question: "Will anyone pay?",
    color: "var(--stage-3)",
    modules: [
      { name: "Offer Test", desc: "Earn a real yes before you build" },
      { name: "Price Check", desc: "Find a price people will actually pay" },
      { name: "Channel Probe", desc: "Find a simple way to reach buyers" },
    ],
    href: "/docs/stage-3-earn",
  },
  {
    number: 4,
    letter: "A",
    name: "Assess",
    tagline: "Turn commitment into repeat use",
    question: "Do they come back?",
    color: "var(--stage-4)",
    modules: [
      { name: "MVP Sprint", desc: "Run the smallest test that proves demand" },
      { name: "Fit Signals", desc: "Measure repeat use and early retention" },
      { name: "Fit Fixes", desc: "Fix what blocks fit, not what is shiny" },
    ],
    href: "/docs/stage-4-assess",
  },
  {
    number: 5,
    letter: "L",
    name: "Lock",
    tagline: "Commit or walk away with clarity",
    question: "Should I go all in?",
    color: "var(--stage-5)",
    modules: [
      {
        name: "Decision Gate",
        desc: "Make the go / pivot / stop call on evidence",
      },
      { name: "Founder Fit", desc: "Test insight, access, and credibility" },
      {
        name: "Momentum OS",
        desc: "Install the weekly rhythm that keeps you honest",
      },
    ],
    href: "/docs/stage-5-lock",
  },
];

const evidenceLadder = [
  { level: "Repeat Use", strength: "Strongest", width: "100%" },
  { level: "Commitment", strength: "Strong", width: "80%" },
  { level: "Behavior", strength: "Moderate", width: "60%" },
  { level: "Compliments", strength: "Weak", width: "40%" },
];

const personas = [
  {
    label: "I have a vague idea",
    headline: "Pressure-test it before you invest",
    description:
      "Run the Friction Scan to see if the pain is real, then test your riskiest assumption.",
    cta: "Start at Stage 1",
    href: "/docs/stage-1-identify/friction-scan",
  },
  {
    label: "I have no idea yet",
    headline: "Find one worth your time",
    description:
      "Begin with observation, not invention. The playbook helps you detect friction and let the idea emerge from evidence.",
    cta: "Start at the Introduction",
    href: "/docs",
  },
  {
    label: "I am already building",
    headline: "Audit your evidence gaps",
    description:
      "Use the IDEAL stages to check which assumptions you skipped. Fill the gaps before they become expensive.",
    cta: "Read the Executive Summary",
    href: "/docs/overview/executive-summary",
  },
];

const pullQuotes = [
  "Hope is cheap. Proof is earned.",
  "If there is no action, it is not proof yet.",
  "Decisions are the unit of progress.",
];

const artifacts = [
  {
    name: "Friction Inventory",
    desc: "20 raw frictions organized into testable patterns",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    name: "Problem Scorecard",
    desc: "Pain scored on frequency, intensity, spend, and workarounds",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Offer Thesis",
    desc: "A clear promise tested with real commitment",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    name: "Price Ladder Results",
    desc: "Tested price range with buyer reactions and objections",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Decision Gate Statement",
    desc: "Go, pivot, or stop -- written in one sentence with evidence",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "30-Day Proof Plan",
    desc: "A week-by-week sprint with pass lines and decisions",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

export default function HomePage() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <main className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <section className="hero-grain hero-gradient relative flex flex-col items-center justify-center px-6 py-28 md:py-36">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-accent-warm">
              The Validation Playbook
            </p>
            <h1 className="font-display text-4xl leading-[1.15] md:text-[3.5rem] md:leading-[1.12]">
              Every founder starts with a story they want to be true.
              <span className="mt-2 block text-fd-muted-foreground">
                That vision is powerful -- but it is also dangerous.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-fd-muted-foreground md:text-xl">
              This playbook replaces hope with evidence, so you build the right
              idea -- not just the exciting one.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 max-md:justify-center">
              <Link
                href="/docs"
                className="rounded-lg bg-accent-warm px-7 py-3 text-sm font-semibold text-[hsl(var(--accent-warm-foreground))] transition-opacity hover:opacity-90"
              >
                Start the Playbook
              </Link>
              <Link
                href="/docs/overview/executive-summary"
                className="rounded-lg border border-fd-border px-7 py-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
              >
                Read the 2-minute summary
              </Link>
            </div>
          </div>

          {/* Evidence Ladder */}
          <div className="hidden flex-col gap-2 md:flex">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
              The Evidence Ladder
            </p>
            {evidenceLadder.map((rung, i) => (
              <div key={rung.level} className="flex items-center gap-3">
                <div
                  className="flex h-10 items-center rounded-md px-3 text-xs font-medium text-white/90"
                  style={{
                    width: rung.width,
                    backgroundColor: `hsl(var(--accent-warm) / ${1 - i * 0.2})`,
                  }}
                >
                  {rung.level}
                </div>
                <span className="whitespace-nowrap text-xs text-fd-muted-foreground">
                  {rung.strength}
                </span>
              </div>
            ))}
            <p className="mt-1 text-xs text-fd-muted-foreground">
              Climb higher before you build.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Cost ── */}
      <section className="border-y border-fd-border bg-fd-card px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
            The cost of building without proof
          </p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              {
                stat: "74%",
                text: "of startups fail from scaling too early, not from building too little.",
              },
              {
                stat: "11 months",
                text: "is the average time a failed founder spends building the wrong thing before discovering it.",
              },
              {
                stat: "\u201CCool idea!\u201D",
                text: "Compliments feel like traction. They are not. Behavior is the only proof.",
              },
            ].map((item) => (
              <div key={item.stat} className="text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl">{item.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive IDEAL Journey ── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
            The IDEAL Framework
          </p>
          <p className="mb-14 text-center font-display text-2xl md:text-3xl">
            Five stages from uncertainty to conviction
          </p>

          {/* Desktop stepper */}
          <div className="hidden md:block">
            {/* Letter nodes */}
            <div className="mb-8 flex items-center justify-between">
              {stages.map((stage, i) => (
                <button
                  key={stage.number}
                  onClick={() => setActiveStage(i)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all"
                    style={{
                      backgroundColor:
                        activeStage === i
                          ? `hsl(${stage.color})`
                          : "hsl(var(--fd-muted))",
                      color:
                        activeStage === i
                          ? "white"
                          : "hsl(var(--fd-muted-foreground))",
                      transform:
                        activeStage === i ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {stage.letter}
                  </div>
                  <span
                    className="text-xs font-medium transition-colors"
                    style={{
                      color:
                        activeStage === i
                          ? `hsl(${stage.color})`
                          : "hsl(var(--fd-muted-foreground))",
                    }}
                  >
                    {stage.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Expanded detail */}
            <div
              className="rounded-2xl border border-fd-border p-8 transition-all"
              style={{
                borderColor: `hsl(${stages[activeStage].color} / 0.3)`,
                backgroundColor: `hsl(${stages[activeStage].color} / 0.04)`,
              }}
            >
              <div className="mb-1 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                Stage {stages[activeStage].number}
              </div>
              <h3 className="font-display text-2xl">
                {stages[activeStage].name}
              </h3>
              <p className="mt-1 text-fd-muted-foreground">
                {stages[activeStage].tagline}
              </p>
              <p
                className="mt-3 font-display text-lg italic"
                style={{ color: `hsl(${stages[activeStage].color})` }}
              >
                &ldquo;{stages[activeStage].question}&rdquo;
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {stages[activeStage].modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="rounded-lg border border-fd-border bg-fd-background p-4"
                  >
                    <p className="text-sm font-semibold">{mod.name}</p>
                    <p className="mt-1 text-xs text-fd-muted-foreground">
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={stages[activeStage].href}
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                  style={{ color: `hsl(${stages[activeStage].color})` }}
                >
                  Read Stage {stages[activeStage].number}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile accordion */}
          <div className="flex flex-col gap-3 md:hidden">
            {stages.map((stage, i) => (
              <div key={stage.number}>
                <button
                  onClick={() =>
                    setActiveStage(activeStage === i ? -1 : i)
                  }
                  className="flex w-full items-center gap-4 rounded-xl border border-fd-border p-4 text-left transition-colors"
                  style={{
                    borderColor:
                      activeStage === i
                        ? `hsl(${stage.color} / 0.4)`
                        : undefined,
                    backgroundColor:
                      activeStage === i
                        ? `hsl(${stage.color} / 0.04)`
                        : undefined,
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      backgroundColor: `hsl(${stage.color})`,
                    }}
                  >
                    {stage.letter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{stage.name}</p>
                    <p className="truncate text-xs text-fd-muted-foreground">
                      {stage.tagline}
                    </p>
                  </div>
                  <svg
                    className="h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform"
                    style={{
                      transform:
                        activeStage === i ? "rotate(180deg)" : "rotate(0)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeStage === i && (
                  <div className="mt-2 rounded-xl border border-fd-border bg-fd-background p-4">
                    <p
                      className="mb-3 font-display text-base italic"
                      style={{ color: `hsl(${stage.color})` }}
                    >
                      &ldquo;{stage.question}&rdquo;
                    </p>
                    <div className="flex flex-col gap-3">
                      {stage.modules.map((mod) => (
                        <div
                          key={mod.name}
                          className="rounded-lg border border-fd-border p-3"
                        >
                          <p className="text-sm font-semibold">{mod.name}</p>
                          <p className="mt-0.5 text-xs text-fd-muted-foreground">
                            {mod.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={stage.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                      style={{ color: `hsl(${stage.color})` }}
                    >
                      Read Stage {stage.number}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section className="border-t border-fd-border bg-fd-card px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
            Who this is for
          </p>
          <p className="mb-14 text-center font-display text-2xl md:text-3xl">
            Start where you are
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {personas.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group rounded-2xl border border-fd-border bg-fd-background p-6 transition-all hover:border-accent-warm hover:shadow-sm"
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent-warm">
                  {p.label}
                </p>
                <h3 className="font-display text-xl">{p.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                  {p.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-warm">
                  {p.cta}
                  <span
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull Quotes ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
          {pullQuotes.map((q) => (
            <blockquote
              key={q}
              className="border-t border-fd-border pt-10 text-center font-display text-2xl italic text-fd-muted-foreground md:text-3xl"
            >
              &ldquo;{q}&rdquo;
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── What You Will Build ── */}
      <section className="border-t border-fd-border bg-fd-card px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
            What you will build
          </p>
          <p className="mb-14 text-center font-display text-2xl md:text-3xl">
            Six artifacts you walk away with
          </p>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {artifacts.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-fd-border bg-fd-background p-5"
              >
                <svg
                  className="mb-3 h-8 w-8 text-accent-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={a.icon}
                  />
                </svg>
                <h3 className="text-sm font-semibold">{a.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="hero-grain hero-gradient relative px-6 py-24 text-center md:py-28">
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="font-display text-3xl md:text-4xl">
            Most founders do not need more ideas.
            <span className="mt-1 block text-fd-muted-foreground">
              They need the right idea.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs"
              className="rounded-lg bg-accent-warm px-8 py-3 text-sm font-semibold text-[hsl(var(--accent-warm-foreground))] transition-opacity hover:opacity-90"
            >
              Start the Playbook
            </Link>
            <Link
              href="/docs/closing/thirty-day-proof-plan"
              className="rounded-lg border border-fd-border px-8 py-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              See the 30-Day Plan
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-fd-border px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_auto_auto]">
          {/* Newsletter */}
          <div>
            <p className="font-display text-lg">Get the weekly evidence brief</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Short lessons on validation, delivered every Thursday.
            </p>
            <form
              className="mt-4 flex max-w-sm gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-warm"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-accent-warm px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-warm-foreground))] transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
              Playbook
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/overview/executive-summary"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Executive Summary
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/stage-1-identify"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Stage 1: Identify
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/extensions/positioning-and-edge"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Extensions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
              Resources
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/docs/closing/thirty-day-proof-plan"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  30-Day Proof Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/stage-3-earn/offer-test"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Offer Test Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/stage-5-lock/decision-gate"
                  className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  Decision Gate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl border-t border-fd-border pt-6 text-center text-xs text-fd-muted-foreground">
          The Validation Playbook -- Find the Idea Worth Building
        </div>
      </footer>
    </main>
  );
}
