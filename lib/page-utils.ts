type StageInfo = {
  stageNumber: number;
  stageName: string;
  stageColor: string;
  moduleNumber?: number;
  modulesInStage?: number;
  globalModuleNumber?: number;
  totalModules: number;
  pageLabel: string;
};

const stageColors: Record<number, string> = {
  1: "var(--stage-1)",
  2: "var(--stage-2)",
  3: "var(--stage-3)",
  4: "var(--stage-4)",
  5: "var(--stage-5)",
};

const stageNames: Record<number, string> = {
  1: "Identify",
  2: "Diagnose",
  3: "Earn",
  4: "Assess",
  5: "Lock",
};

const stageModulePages: Record<number, string[]> = {
  1: ["friction-scan", "truth-signals", "buyer-definition"],
  2: ["risk-map", "problem-proof", "alternatives-scan"],
  3: ["offer-test", "price-check", "channel-probe"],
  4: ["mvp-sprint", "fit-signals", "fit-fixes"],
  5: ["decision-gate", "founder-fit", "momentum-os"],
};

const stageFolders: Record<string, number> = {
  "stage-1-identify": 1,
  "stage-2-diagnose": 2,
  "stage-3-earn": 3,
  "stage-4-assess": 4,
  "stage-5-lock": 5,
};

export function getStageInfo(slug?: string[]): StageInfo | null {
  if (!slug || slug.length === 0) return null;

  const folder = slug[0];
  const page = slug[1];
  const stageNum = stageFolders[folder];

  if (!stageNum) {
    if (folder === "extensions") {
      const extNum = page === "positioning-and-edge" ? 1 : 2;
      return {
        stageNumber: 0,
        stageName: "Extensions",
        stageColor: "var(--accent-warm)",
        totalModules: 15,
        pageLabel: `Extension ${extNum} of 2`,
      };
    }
    return null;
  }

  const color = stageColors[stageNum];
  const name = stageNames[stageNum];

  if (!page || page === "index") {
    return {
      stageNumber: stageNum,
      stageName: name,
      stageColor: color,
      totalModules: 15,
      pageLabel: `Stage ${stageNum} of 5`,
    };
  }

  if (page === "stage-review") {
    return {
      stageNumber: stageNum,
      stageName: name,
      stageColor: color,
      totalModules: 15,
      pageLabel: `Stage ${stageNum} Review`,
    };
  }

  const modules = stageModulePages[stageNum];
  const moduleIdx = modules.indexOf(page);
  if (moduleIdx === -1) return null;

  const globalModule = (stageNum - 1) * 3 + moduleIdx + 1;

  return {
    stageNumber: stageNum,
    stageName: name,
    stageColor: color,
    moduleNumber: moduleIdx + 1,
    modulesInStage: 3,
    globalModuleNumber: globalModule,
    totalModules: 15,
    pageLabel: `Module ${globalModule} of 15`,
  };
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
