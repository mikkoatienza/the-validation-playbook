import { readFileSync } from "fs";
import { execSync } from "child_process";
import { writeFileSync } from "fs";

const MANUSCRIPT = "/Users/trilogy/Documents/trilogy-project/manuscript";
const CONTENT = "/Users/trilogy/Documents/validation-playbook-docs/content/docs";

const mapping = [
  { src: "front-matter/intro.md", dest: "index.mdx" },
  { src: "front-matter/Foundation.md", dest: "overview/executive-summary.mdx" },
  { src: "stages/stage-1-opening.md", dest: "stage-1-identify/index.mdx" },
  { src: "chapters/chapter-1.md", dest: "stage-1-identify/friction-scan.mdx" },
  { src: "chapters/chapter-2.md", dest: "stage-1-identify/truth-signals.mdx" },
  { src: "chapters/chapter-3.md", dest: "stage-1-identify/buyer-definition.mdx" },
  { src: "stages/stage-1-closing.md", dest: "stage-1-identify/stage-review.mdx" },
  { src: "stages/stage-2-opening.md", dest: "stage-2-diagnose/index.mdx" },
  { src: "chapters/chapter-4.md", dest: "stage-2-diagnose/risk-map.mdx" },
  { src: "chapters/chapter-5.md", dest: "stage-2-diagnose/problem-proof.mdx" },
  { src: "chapters/chapter-6.md", dest: "stage-2-diagnose/alternatives-scan.mdx" },
  { src: "stages/stage-2-closing.md", dest: "stage-2-diagnose/stage-review.mdx" },
  { src: "stages/stage-3-opening.md", dest: "stage-3-earn/index.mdx" },
  { src: "chapters/chapter-7.md", dest: "stage-3-earn/offer-test.mdx" },
  { src: "chapters/chapter-8.md", dest: "stage-3-earn/price-check.mdx" },
  { src: "chapters/chapter-9.md", dest: "stage-3-earn/channel-probe.mdx" },
  { src: "stages/stage-3-closing.md", dest: "stage-3-earn/stage-review.mdx" },
  { src: "stages/stage-4-opening.md", dest: "stage-4-assess/index.mdx" },
  { src: "chapters/chapter-10.md", dest: "stage-4-assess/mvp-sprint.mdx" },
  { src: "chapters/chapter-11.md", dest: "stage-4-assess/fit-signals.mdx" },
  { src: "chapters/chapter-12.md", dest: "stage-4-assess/fit-fixes.mdx" },
  { src: "stages/stage-4-closing.md", dest: "stage-4-assess/stage-review.mdx" },
  { src: "stages/stage-5-opening.md", dest: "stage-5-lock/index.mdx" },
  { src: "chapters/chapter-13.md", dest: "stage-5-lock/decision-gate.mdx" },
  { src: "chapters/chapter-14.md", dest: "stage-5-lock/founder-fit.mdx" },
  { src: "chapters/chapter-15.md", dest: "stage-5-lock/momentum-os.mdx" },
  { src: "stages/stage-5-closing.md", dest: "stage-5-lock/stage-review.mdx" },
  { src: "extensions/extension-1.md", dest: "extensions/positioning-and-edge.mdx" },
  { src: "extensions/extension-2.md", dest: "extensions/momentum-loops.mdx" },
  { src: "back-matter/closing.md", dest: "closing/thirty-day-proof-plan.mdx" },
];

function stripSourceHeader(text) {
  const lines = text.split("\n");
  let i = 0;
  if (lines[i]?.startsWith("# ")) i++;
  if (lines[i]?.trim() === "") i++;
  if (lines[i]?.startsWith("*") && lines[i]?.endsWith("*")) i++;
  if (lines[i]?.trim() === "") i++;
  return lines.slice(i).join("\n").trimEnd() + "\n";
}

function stripMdxFrontmatter(text) {
  const lines = text.split("\n");
  let i = 0;
  if (lines[i] === "---") {
    i++;
    while (i < lines.length && lines[i] !== "---") i++;
    i++; // skip closing ---
  }
  if (lines[i]?.trim() === "") i++;
  return lines.slice(i).join("\n").trimEnd() + "\n";
}

let totalPass = 0;
let totalFail = 0;
const failures = [];

for (const pair of mapping) {
  const srcRaw = readFileSync(`${MANUSCRIPT}/${pair.src}`, "utf-8");
  const destRaw = readFileSync(`${CONTENT}/${pair.dest}`, "utf-8");

  const srcBody = stripSourceHeader(srcRaw);
  const destBody = stripMdxFrontmatter(destRaw);

  const tmpSrc = "/tmp/audit_src.txt";
  const tmpDest = "/tmp/audit_dest.txt";
  writeFileSync(tmpSrc, srcBody);
  writeFileSync(tmpDest, destBody);

  try {
    execSync(`diff "${tmpSrc}" "${tmpDest}"`, { encoding: "utf-8" });
    console.log(`PASS  ${pair.src} → ${pair.dest}`);
    totalPass++;
  } catch (e) {
    const diffOutput = e.stdout || "";
    const diffLines = diffOutput.split("\n").filter(l => l.length > 0).length;
    console.log(`FAIL  ${pair.src} → ${pair.dest}  (${diffLines} diff lines)`);
    if (diffLines <= 20) {
      console.log(diffOutput);
    } else {
      console.log(diffOutput.split("\n").slice(0, 20).join("\n"));
      console.log(`  ... (${diffLines - 20} more diff lines)`);
    }
    totalFail++;
    failures.push({ pair, diffLines, diffOutput });
  }
}

console.log(`\n=== PASS 1 SUMMARY ===`);
console.log(`Total: ${mapping.length} | Pass: ${totalPass} | Fail: ${totalFail}`);
if (failures.length > 0) {
  console.log(`\nFailed files:`);
  failures.forEach(f => console.log(`  - ${f.pair.src} → ${f.pair.dest} (${f.diffLines} diff lines)`));
}
