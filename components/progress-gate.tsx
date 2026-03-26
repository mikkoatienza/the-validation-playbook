"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/progress";
import { readingOrder } from "@/lib/reading-order";
import Link from "next/link";

export function ProgressGate({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const { isUnlocked, getLastUnlockedPath } = useProgress();
  const router = useRouter();
  const unlocked = isUnlocked(path);

  useEffect(() => {
    if (!unlocked) {
      router.replace(getLastUnlockedPath());
    }
  }, [unlocked, router, getLastUnlockedPath]);

  if (!unlocked) {
    const lastPath = getLastUnlockedPath();
    const idx = readingOrder.indexOf(path);
    const currentIdx = readingOrder.indexOf(lastPath);

    return (
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fd-muted">
          <svg
            className="h-8 w-8 text-fd-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div>
          <p className="font-display text-xl">This page is locked</p>
          <p className="mt-2 max-w-md text-sm text-fd-muted-foreground">
            Complete the previous {idx - currentIdx > 1 ? `${idx - currentIdx} pages` : "page"} first.
            The playbook is designed to be read in order -- each module builds on the last.
          </p>
        </div>
        <Link
          href={lastPath}
          className="rounded-lg bg-accent-warm px-6 py-2.5 text-sm font-semibold text-[hsl(var(--accent-warm-foreground))] transition-opacity hover:opacity-90"
        >
          Continue where you left off
        </Link>
        <p className="text-xs text-fd-muted-foreground">
          Page {currentIdx + 1} of {readingOrder.length}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export function ReadingTracker({ path }: { path: string }) {
  const { markCompleted, completed } = useProgress();

  useEffect(() => {
    if (completed.includes(path)) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0 || scrollTop / docHeight >= 0.85) {
        markCompleted(path);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path, markCompleted, completed]);

  return null;
}
