"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { readingOrder } from "./reading-order";

const STORAGE_KEY = "tvp-progress";
const COOKIE_NAME = "tvp-progress";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type ProgressState = {
  completed: string[];
};

type ProgressContextValue = {
  completed: string[];
  currentIndex: number;
  isUnlocked: (path: string) => boolean;
  markCompleted: (path: string) => void;
  getLastUnlockedPath: () => string;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readFromStorage(): ProgressState {
  if (typeof window === "undefined") return { completed: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: [] };
}

function writeToStorage(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
  } catch {}
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>({ completed: [] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(readFromStorage());
    setLoaded(true);
  }, []);

  const isUnlocked = useCallback(
    (path: string) => {
      const idx = readingOrder.indexOf(path);
      if (idx === -1) return true;
      if (idx === 0) return true;
      const prevPath = readingOrder[idx - 1];
      return state.completed.includes(prevPath);
    },
    [state.completed],
  );

  const markCompleted = useCallback((path: string) => {
    setState((prev) => {
      if (prev.completed.includes(path)) return prev;
      const next = { completed: [...prev.completed, path] };
      writeToStorage(next);
      return next;
    });
  }, []);

  const getLastUnlockedPath = useCallback(() => {
    for (let i = readingOrder.length - 1; i >= 0; i--) {
      if (state.completed.includes(readingOrder[i])) {
        const nextIdx = i + 1;
        if (nextIdx < readingOrder.length) return readingOrder[nextIdx];
        return readingOrder[i];
      }
    }
    return readingOrder[0];
  }, [state.completed]);

  const currentIndex = (() => {
    for (let i = readingOrder.length - 1; i >= 0; i--) {
      if (state.completed.includes(readingOrder[i])) return i + 1;
    }
    return 0;
  })();

  const resetProgress = useCallback(() => {
    const empty = { completed: [] };
    setState(empty);
    writeToStorage(empty);
  }, []);

  if (!loaded) return <>{children}</>;

  return (
    <ProgressContext.Provider
      value={{
        completed: state.completed,
        currentIndex,
        isUnlocked,
        markCompleted,
        getLastUnlockedPath,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

const defaultValue: ProgressContextValue = {
  completed: [],
  currentIndex: 0,
  isUnlocked: () => true,
  markCompleted: () => {},
  getLastUnlockedPath: () => readingOrder[0],
  resetProgress: () => {},
};

export function useProgress() {
  const ctx = useContext(ProgressContext);
  return ctx ?? defaultValue;
}
