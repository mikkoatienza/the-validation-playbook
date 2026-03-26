"use client";

import type { Separator } from "fumadocs-core/page-tree";

const stageColors: Record<string, string> = {
  "Stage 1: Identify": "hsl(var(--stage-1))",
  "Stage 2: Diagnose": "hsl(var(--stage-2))",
  "Stage 3: Earn": "hsl(var(--stage-3))",
  "Stage 4: Assess": "hsl(var(--stage-4))",
  "Stage 5: Lock": "hsl(var(--stage-5))",
  Extensions: "hsl(var(--accent-warm))",
};

export function SidebarSeparator({ item }: { item: Separator }) {
  const text = typeof item.name === "string" ? item.name : "";
  const color = stageColors[text];

  return (
    <p className="mb-1 mt-5 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground first:mt-0">
      {color && (
        <span
          className="sidebar-stage-dot"
          style={{ backgroundColor: color }}
        />
      )}
      {item.name}
    </p>
  );
}
