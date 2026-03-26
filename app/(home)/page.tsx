import Link from "next/link";

const stages = [
  {
    number: 1,
    name: "Identify",
    tagline: "Find real pain worth solving",
    modules: ["Friction Scan", "Truth Signals", "Buyer Definition"],
  },
  {
    number: 2,
    name: "Diagnose",
    tagline: "Validate the problem with evidence",
    modules: ["Risk Map", "Problem Proof", "Alternatives Scan"],
  },
  {
    number: 3,
    name: "Earn",
    tagline: "Test willingness to pay and distribution",
    modules: ["Offer Test", "Price Check", "Channel Probe"],
  },
  {
    number: 4,
    name: "Assess",
    tagline: "Build minimal proof, measure signal",
    modules: ["MVP Sprint", "Fit Signals", "Fit Fixes"],
  },
  {
    number: 5,
    name: "Lock",
    tagline: "Commit or walk away with clarity",
    modules: ["Founder Fit", "Decision Gate", "Momentum OS"],
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center md:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
          The Validation Playbook
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl md:leading-tight">
          Find the Idea Worth Building
        </h1>
        <p className="max-w-xl text-lg text-fd-muted-foreground">
          A step-by-step guide for early-stage founders who want to stop
          guessing and start choosing. Replace hope with evidence through the
          IDEAL framework.
        </p>
        <div className="flex gap-3 pt-4">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Start Reading
          </Link>
          <Link
            href="/docs/overview/executive-summary"
            className="rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Executive Summary
          </Link>
        </div>
      </section>

      {/* IDEAL Stage Overview */}
      <section className="border-t border-fd-border bg-fd-card px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
            The IDEAL Framework
          </h2>
          <p className="mb-12 text-center text-2xl font-semibold">
            Five stages from uncertainty to conviction
          </p>
          <div className="grid gap-6 md:grid-cols-5">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="rounded-xl border border-fd-border bg-fd-background p-5"
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
                  Stage {stage.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{stage.name}</h3>
                <p className="mb-4 text-sm text-fd-muted-foreground">
                  {stage.tagline}
                </p>
                <ul className="space-y-1">
                  {stage.modules.map((m) => (
                    <li
                      key={m}
                      className="text-xs text-fd-muted-foreground"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <p className="mb-4 text-fd-muted-foreground">
          Most founders do not need more ideas. They need the right idea.
        </p>
        <Link
          href="/docs"
          className="rounded-lg bg-fd-primary px-8 py-3 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Read the Playbook
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border px-6 py-8 text-center text-sm text-fd-muted-foreground">
        <p>The Validation Playbook: Find the Idea Worth Building</p>
      </footer>
    </main>
  );
}
