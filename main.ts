import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "Project Atlas’s Jira board auto-assigned the Q3 audit to the office plant, citing his 100% uptime and zero ticket closures.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/** Fails hard (non-zero exit) unless the entry is 1-200 characters. */
function validateEntry(entry: string): void {
  const chars = [...entry].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    console.error(
      `ERROR: entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
    process.exit(1);
  }
}

/** Creates the output directory if it does not already exist. */
function ensureOutputDir(): void {
  mkdirSync(OUT_DIR, { recursive: true });
}

/** Writes the entry as UTF-8 with no trailing newline. */
function writeEntry(entry: string): void {
  writeFileSync(OUT_FILE, entry, { encoding: "utf8" });
}

/** Reads the written file back and prints characters, bytes and SHA-256. */
function reportEntry(): void {
  const bytes = readFileSync(OUT_FILE);
  const chars = [...bytes.toString("utf8")].length;
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  console.log(`wrote ${OUT_FILE}`);
  console.log(`characters: ${chars}`);
  console.log(`bytes: ${bytes.length}`);
  console.log(`sha256: ${sha256}`);
}

function main(): void {
  validateEntry(JOKE);
  ensureOutputDir();
  writeEntry(JOKE);
  reportEntry();
}

main();
