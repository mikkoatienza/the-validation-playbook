import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const MANUSCRIPT = "/Users/trilogy/Documents/trilogy-project/manuscript";
const CONTENT = "/Users/trilogy/Documents/validation-playbook-docs/content/docs";

const mapping = [
  {
    src: "front-matter/intro.md",
    dest: "index.mdx",
    title: "Introduction",
    description:
      "Find the Idea Worth Building. A system for replacing hope with evidence so you build the right idea, not just the exciting one.",
  },
  {
    src: "front-matter/Foundation.md",
    dest: "overview/executive-summary.mdx",
    title: "Executive Summary",
    description:
      "What this playbook is, who it is for, and how the IDEAL framework turns guesswork into evidence-backed decisions.",
  },

  // Stage 1: Identify
  {
    src: "stages/stage-1-opening.md",
    dest: "stage-1-identify/index.mdx",
    title: "Stage 1: Identify",
    description:
      "Find real pain worth solving. Earn proof that the problem exists before you build anything.",
  },
  {
    src: "chapters/chapter-1.md",
    dest: "stage-1-identify/friction-scan.mdx",
    title: "Friction Scan",
    description:
      "Find problems people will pay to fix by detecting real friction in their daily work.",
  },
  {
    src: "chapters/chapter-2.md",
    dest: "stage-1-identify/truth-signals.mdx",
    title: "Truth Signals",
    description:
      "Run truth interviews that expose what people actually do, what they have tried, and what it costs them.",
  },
  {
    src: "chapters/chapter-3.md",
    dest: "stage-1-identify/buyer-definition.mdx",
    title: "Buyer Definition",
    description:
      "Identify who decides and pays. Define your Ideal Customer Profile and map the buyer path.",
  },
  {
    src: "stages/stage-1-closing.md",
    dest: "stage-1-identify/stage-review.mdx",
    title: "Stage 1 Review",
    description:
      "Checklist, readiness gate, and retrospective for Stage 1: Identify.",
  },

  // Stage 2: Diagnose
  {
    src: "stages/stage-2-opening.md",
    dest: "stage-2-diagnose/index.mdx",
    title: "Stage 2: Diagnose",
    description:
      "Prove the problem is urgent and not already owned. Score the pain with evidence, not enthusiasm.",
  },
  {
    src: "chapters/chapter-4.md",
    dest: "stage-2-diagnose/risk-map.mdx",
    title: "Risk Map",
    description:
      "Name your riskiest assumptions and test them before they become expensive mistakes.",
  },
  {
    src: "chapters/chapter-5.md",
    dest: "stage-2-diagnose/problem-proof.mdx",
    title: "Problem Proof",
    description:
      "Score the pain with evidence using a problem scorecard. Prove the problem is frequent and costly.",
  },
  {
    src: "chapters/chapter-6.md",
    dest: "stage-2-diagnose/alternatives-scan.mdx",
    title: "Alternatives Scan",
    description:
      "Map what people already use: competitors, substitutes, and DIY workarounds. Find your wedge.",
  },
  {
    src: "stages/stage-2-closing.md",
    dest: "stage-2-diagnose/stage-review.mdx",
    title: "Stage 2 Review",
    description:
      "Checklist, readiness gate, and retrospective for Stage 2: Diagnose.",
  },

  // Stage 3: Earn
  {
    src: "stages/stage-3-opening.md",
    dest: "stage-3-earn/index.mdx",
    title: "Stage 3: Earn",
    description:
      "Test commitment, price, and channel. Earn real commitment before building anything heavy.",
  },
  {
    src: "chapters/chapter-7.md",
    dest: "stage-3-earn/offer-test.mdx",
    title: "Offer Test",
    description:
      "Turn your validated problem into a testable offer and ask for real commitment before you build.",
  },
  {
    src: "chapters/chapter-8.md",
    dest: "stage-3-earn/price-check.mdx",
    title: "Price Check",
    description:
      "Find a price people will actually pay by testing willingness to pay in the simplest way possible.",
  },
  {
    src: "chapters/chapter-9.md",
    dest: "stage-3-earn/channel-probe.mdx",
    title: "Channel Probe",
    description:
      "Find a simple way to reach buyers. Test 2-3 channels quickly and find predictable access to your ICP.",
  },
  {
    src: "stages/stage-3-closing.md",
    dest: "stage-3-earn/stage-review.mdx",
    title: "Stage 3 Review",
    description:
      "Checklist, readiness gate, and retrospective for Stage 3: Earn.",
  },

  // Stage 4: Assess
  {
    src: "stages/stage-4-opening.md",
    dest: "stage-4-assess/index.mdx",
    title: "Stage 4: Assess",
    description:
      "Build minimal proof, measure signal. Run the smallest experiment that tests the riskiest assumption.",
  },
  {
    src: "chapters/chapter-10.md",
    dest: "stage-4-assess/mvp-sprint.mdx",
    title: "MVP Sprint",
    description:
      "Build the smallest thing that tests the riskiest assumption. Ship it in days, not months.",
  },
  {
    src: "chapters/chapter-11.md",
    dest: "stage-4-assess/fit-signals.mdx",
    title: "Fit Signals",
    description:
      "Measure early product-market fit with real usage data, repeat behavior, and organic signals.",
  },
  {
    src: "chapters/chapter-12.md",
    dest: "stage-4-assess/fit-fixes.mdx",
    title: "Fit Fixes",
    description:
      "Fix the gaps between your MVP and real fit. Prioritize fixes by signal strength, not feature requests.",
  },
  {
    src: "stages/stage-4-closing.md",
    dest: "stage-4-assess/stage-review.mdx",
    title: "Stage 4 Review",
    description:
      "Checklist, readiness gate, and retrospective for Stage 4: Assess.",
  },

  // Stage 5: Lock
  {
    src: "stages/stage-5-opening.md",
    dest: "stage-5-lock/index.mdx",
    title: "Stage 5: Lock",
    description:
      "Commit or walk away with clarity. Review the signal, confirm founder fit, and install the rhythm.",
  },
  {
    src: "chapters/chapter-13.md",
    dest: "stage-5-lock/decision-gate.mdx",
    title: "Decision Gate",
    description:
      "Make the final go/no-go decision based on evidence. Commit, pivot, or walk away with clarity.",
  },
  {
    src: "chapters/chapter-14.md",
    dest: "stage-5-lock/founder-fit.mdx",
    title: "Founder Fit",
    description:
      "Assess whether you are the right founder for this problem. Fit is earned, not assumed.",
  },
  {
    src: "chapters/chapter-15.md",
    dest: "stage-5-lock/momentum-os.mdx",
    title: "Momentum OS",
    description:
      "Install a weekly rhythm that keeps you moving. Build the operating system for sustained progress.",
  },
  {
    src: "stages/stage-5-closing.md",
    dest: "stage-5-lock/stage-review.mdx",
    title: "Stage 5 Review",
    description:
      "Checklist, readiness gate, and retrospective for Stage 5: Lock.",
  },

  // Extensions
  {
    src: "extensions/extension-1.md",
    dest: "extensions/positioning-and-edge.mdx",
    title: "Positioning and Edge",
    description:
      "Turn your validation evidence into a defensible edge. Build the wedge after proof.",
  },
  {
    src: "extensions/extension-2.md",
    dest: "extensions/momentum-loops.mdx",
    title: "Momentum Loops",
    description:
      "Build the feedback loops that compound progress. Metrics, retention, and growth after validation.",
  },

  // Closing
  {
    src: "back-matter/closing.md",
    dest: "closing/thirty-day-proof-plan.mdx",
    title: "Your 30-Day Proof Plan",
    description:
      "A disciplined 30-day sprint that turns validated ideas into evidence. One focus per week, one decision per stage.",
  },
];

function convert(entry) {
  const raw = readFileSync(`${MANUSCRIPT}/${entry.src}`, "utf-8");
  const lines = raw.split("\n");

  let startIdx = 0;

  // Strip the H1 heading line
  if (lines[0]?.startsWith("# ")) {
    startIdx = 1;
  }

  // Strip blank line after H1
  if (lines[startIdx]?.trim() === "") {
    startIdx++;
  }

  // Strip italic subtitle (e.g. *Activity: Friction Scan*)
  if (lines[startIdx]?.startsWith("*") && lines[startIdx]?.endsWith("*")) {
    startIdx++;
  }

  // Strip blank line after subtitle
  if (lines[startIdx]?.trim() === "") {
    startIdx++;
  }

  const body = lines.slice(startIdx).join("\n").trimEnd();

  const frontmatter = `---
title: "${entry.title}"
description: "${entry.description}"
---`;

  const destPath = `${CONTENT}/${entry.dest}`;
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${frontmatter}\n\n${body}\n`);
  console.log(`  ${entry.src} → ${entry.dest}`);
}

console.log(`Converting ${mapping.length} files...\n`);
mapping.forEach(convert);
console.log(`\nDone. ${mapping.length} MDX files created.`);
