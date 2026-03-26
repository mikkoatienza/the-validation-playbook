"use client";

import type { Separator, Item } from "fumadocs-core/page-tree";
import { useProgress } from "@/lib/progress";
import { readingOrder } from "@/lib/reading-order";

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

export function SidebarItem({ item }: { item: Item }) {
  const { completed, isUnlocked } = useProgress();
  const url = item.url ?? "";
  const isCompleted = completed.includes(url);
  const unlocked = isUnlocked(url);
  const isInOrder = readingOrder.includes(url);

  return (
    <a
      href={unlocked ? url : undefined}
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
        !unlocked && isInOrder
          ? "cursor-not-allowed opacity-40"
          : "hover:bg-fd-accent"
      }`}
      onClick={(e) => {
        if (!unlocked && isInOrder) e.preventDefault();
      }}
    >
      {isInOrder && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          {isCompleted ? (
            <svg
              className="h-3.5 w-3.5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : !unlocked ? (
            <svg
              className="h-3 w-3 text-fd-muted-foreground/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/30" />
          )}
        </span>
      )}
      <span className={isCompleted ? "text-fd-muted-foreground" : ""}>
        {item.name}
      </span>
    </a>
  );
}
