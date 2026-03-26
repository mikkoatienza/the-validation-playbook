"use client";

import { useEffect, useState } from "react";

export function ScrollProgress({ color }: { color?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{
        width: `${progress}%`,
        backgroundColor: color || "hsl(var(--accent-warm))",
      }}
    />
  );
}

export function PageMeta({
  label,
  readTime,
  progress,
  totalSteps,
  color,
}: {
  label: string;
  readTime: number;
  progress?: number;
  totalSteps?: number;
  color?: string;
}) {
  const accentColor = color || "hsl(var(--accent-warm))";

  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: `${accentColor.replace(")", " / 0.12)")}`,
            color: accentColor,
          }}
        >
          {label}
        </span>
        <span className="text-xs text-fd-muted-foreground">
          {readTime} min read
        </span>
      </div>
      {progress != null && totalSteps != null && totalSteps > 0 && (
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(progress / totalSteps) * 100}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      )}
    </div>
  );
}
