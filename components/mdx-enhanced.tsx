import type { ComponentPropsWithoutRef, ReactNode } from "react";
import defaultMdxComponents from "fumadocs-ui/mdx";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = node.props as Record<string, unknown>;
    return extractText(props.children as ReactNode);
  }
  return "";
}

const exercisePatterns = [
  /^exercise:/i,
  /^exercise\./i,
  /^\d+ frictions in \d+ minutes/i,
  /^run \d/i,
  /^write \d/i,
  /^score your/i,
  /^pick \d/i,
  /^build the alternatives/i,
  /^run a (tiny )?channel/i,
  /^run a price/i,
  /^run the smallest/i,
  /^ICP worksheet/i,
  /^buyer map/i,
  /^friction scan worksheet/i,
];

const templatePatterns = [
  /template$/i,
  /^template/i,
  /^simple plan$/i,
  /^scorecard template/i,
  /^interview notes$/i,
  /^friction log template/i,
  /^evidence note prompts$/i,
  /^quick cost estimate$/i,
  /^buyer map template/i,
  /^ICP template/i,
  /^offer test card$/i,
  /^test card example/i,
  /^channel bet template/i,
  /^channel test card$/i,
  /^price ladder worksheet/i,
  /^commitment log/i,
  /^channel log/i,
  /^evidence log/i,
  /^evidence summary table/i,
  /^price test summary/i,
];

const calloutPatterns = [
  /^output for this module/i,
  /^stage rules/i,
  /^stage promise/i,
  /^what this stage produces/i,
  /^evidence standard/i,
  /^pass line/i,
  /^decision at the end/i,
  /^closing line/i,
  /^closing handoff/i,
  /^signal vs noise/i,
  /^pattern sanity check/i,
  /^listening ratio/i,
  /^the no-pitch rule$/i,
  /^the core rule$/i,
  /^the silence advantage$/i,
  /^why this week matters/i,
];

function isPatternMatch(text: string, patterns: RegExp[]): boolean {
  const clean = text.trim();
  return patterns.some((p) => p.test(clean));
}

function EnhancedStrong({
  children,
  ...props
}: ComponentPropsWithoutRef<"strong">) {
  const text = extractText(children);

  if (isPatternMatch(text, calloutPatterns)) {
    return (
      <strong
        {...props}
        className="inline-block rounded bg-[hsl(var(--accent-warm)/0.08)] px-1.5 py-0.5 text-[hsl(var(--accent-warm))]"
      >
        {children}
      </strong>
    );
  }

  if (isPatternMatch(text, exercisePatterns)) {
    return (
      <strong
        {...props}
        className="inline-flex items-center gap-1.5 text-[hsl(var(--accent-warm))]"
      >
        <svg
          className="inline h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        {children}
      </strong>
    );
  }

  if (isPatternMatch(text, templatePatterns)) {
    return (
      <strong
        {...props}
        className="inline-flex items-center gap-1.5 text-fd-muted-foreground"
      >
        <svg
          className="inline h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        {children}
      </strong>
    );
  }

  return <strong {...props}>{children}</strong>;
}

export function getEnhancedMDXComponents() {
  return {
    ...defaultMdxComponents,
    strong: EnhancedStrong,
  };
}
