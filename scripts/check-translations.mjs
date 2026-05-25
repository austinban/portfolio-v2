/**
 * Translation completeness checker.
 * Run: node scripts/check-translations.mjs
 *
 * Checks every locale file against English (the source of truth) and reports:
 *   - Missing keys (key in EN but absent in locale)
 *   - Untranslated values (value identical to EN — likely a copy-paste miss)
 *   - Placeholder mismatches ({name}, {austin}, {n}, {max} tokens)
 *
 * Exit code 1 if any errors found — safe to run in CI.
 */

import { createRequire } from "module";
import { pathToFileURL } from "url";
import { readdir } from "fs/promises";
import path from "path";

// We need tsx/ts-node or to use the compiled output. Since Astro compiles TS,
// we'll import via the TypeScript source using a simple inline approach.
// Run with: npx tsx scripts/check-translations.mjs
// Or add to package.json: "check:i18n": "tsx scripts/check-translations.mjs"

const localesDir = new URL("../src/i18n/locales/", import.meta.url);

// Dynamically import all locale files
async function loadLocales() {
  const files = await readdir(localesDir);
  const locales = {};
  for (const file of files.filter((f) => f.endsWith(".ts"))) {
    const name = file.replace(".ts", "");
    const mod = await import(new URL(file, localesDir).href);
    locales[name] = mod[name]; // export const en = ..., export const es = ..., etc.
  }
  return locales;
}

function flattenObject(obj, prefix = "") {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(val)) {
      result[fullKey] = val; // keep arrays as-is for placeholder checking
    } else if (val && typeof val === "object") {
      Object.assign(result, flattenObject(val, fullKey));
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}

function extractPlaceholders(str) {
  return (str.match(/\{[^}]+\}/g) ?? []).sort();
}

function checkPlaceholders(enVal, localeVal, key) {
  if (typeof enVal !== "string" || typeof localeVal !== "string") return [];
  const enPH = extractPlaceholders(enVal);
  const localePH = extractPlaceholders(localeVal);
  const missing = enPH.filter((p) => !localePH.includes(p));
  const extra = localePH.filter((p) => !enPH.includes(p));
  const issues = [];
  if (missing.length)
    issues.push(`  placeholder missing ${missing.join(", ")}`);
  if (extra.length) issues.push(`  placeholder extra ${extra.join(", ")}`);
  return issues;
}

const SKIP_UNTRANSLATED_KEYS = new Set([
  "locale",
  // These are proper nouns / brand names that intentionally stay the same
]);

// Keys that are expected to be identical across locales (proper nouns, etc.)
const ALLOWED_IDENTICAL =
  /^(locale|eggs\.(austin|ban|marianne|goldie|callie))$/;

async function main() {
  let locales;
  try {
    locales = await loadLocales();
  } catch (e) {
    console.error(
      "Failed to load locales. Make sure to run with: npx tsx scripts/check-translations.mjs",
    );
    console.error(e.message);
    process.exit(1);
  }

  const en = locales["en"];
  if (!en) {
    console.error("English locale (en.ts) not found.");
    process.exit(1);
  }

  const enFlat = flattenObject(en);
  const nonEnLocales = Object.entries(locales).filter(
    ([name]) => name !== "en",
  );

  if (nonEnLocales.length === 0) {
    console.warn("No non-English locales found. Nothing to check.");
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const [localeName, localeData] of nonEnLocales) {
    const localeFlat = flattenObject(localeData);
    const errors = [];
    const warnings = [];

    for (const [key, enVal] of Object.entries(enFlat)) {
      const localeVal = localeFlat[key];

      // Missing key
      if (localeVal === undefined) {
        errors.push(`  MISSING  ${key}`);
        continue;
      }

      // Placeholder mismatch (only for string values)
      const phIssues = checkPlaceholders(enVal, localeVal, key);
      phIssues.forEach((issue) =>
        errors.push(`  PLACEHOLDER  ${key}: ${issue.trim()}`),
      );

      // Identical to English (possibly untranslated) — warn, not error
      if (
        typeof enVal === "string" &&
        typeof localeVal === "string" &&
        enVal === localeVal &&
        !ALLOWED_IDENTICAL.test(key)
      ) {
        warnings.push(`  UNTRANSLATED  ${key}`);
      }
    }

    // Extra keys in locale not in EN (stale translations)
    for (const key of Object.keys(localeFlat)) {
      if (enFlat[key] === undefined) {
        warnings.push(`  STALE  ${key}  (not in EN, may be safe to remove)`);
      }
    }

    if (errors.length || warnings.length) {
      console.log(
        `\n── ${localeName.toUpperCase()} ────────────────────────────`,
      );
      errors.forEach((e) => console.error(e));
      warnings.forEach((w) => console.warn(w));
      totalErrors += errors.length;
      totalWarnings += warnings.length;
    } else {
      console.log(`✓  ${localeName.toUpperCase()} — complete`);
    }
  }

  console.log(`\n────────────────────────────────────────`);
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log("All locales complete. No issues found.");
  } else {
    if (totalErrors)
      console.error(`${totalErrors} error(s) found across all locales.`);
    if (totalWarnings)
      console.warn(`${totalWarnings} warning(s) found across all locales.`);
  }

  if (totalErrors > 0) process.exit(1);
}

main();
