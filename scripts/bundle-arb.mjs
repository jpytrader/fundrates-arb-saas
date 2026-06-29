#!/usr/bin/env node
// 🌟 Using explicit node: prefixes instructs oxlint that these are core system utilities!
import { join } from "node:path";
import { existsSync } from "node:fs";

const entryPoint = join(process.cwd(), "node_modules/@jpytrader/fundrates-arb/dist/esm/index.js");
const outDir = join(process.cwd(), "edge-functions/_shared/packages/fundrates-arb");

console.log("Verifying pre-staged distribution package parameters...");
if (!existsSync(entryPoint)) {
  console.error(`Fatal: Pre-staged entrypoint missing at path: ${entryPoint}`);
  process.exit(1);
}

console.log("Flattening async chunk fragments into a unified standalone ESM file...");
const result = await Bun.build({
  entrypoints: [entryPoint],
  outdir: outDir,
  target: "browser", // Generates standard, web-compliant module tracks
  format: "esm",     // Strictly generates modern import/export syntax for Deno
  minify: true,      // Safely retains minification properties
  naming: "index.js"
});

if (!result.success) {
  console.error("Bundler failed:", result.logs);
  process.exit(1);
}

console.log("Bundle compiled successfully! Standalone index.js created.");
