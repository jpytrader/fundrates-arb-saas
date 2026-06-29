#!/usr/bin/env node
// 🌟 Using explicit node: prefixes instructs oxlint that these are core system utilities!
import { join } from "node:path";
import { existsSync } from "node:fs";

const entryPoint = join(process.cwd(), "edge-functions/_shared/packages/fundrates-arb/dist/esm/index.js");
const outMapFile = join(process.cwd(), "edge-functions/_shared/packages/fundrates-arb/index.js");

console.log("Verifying pre-staged distribution package parameters...");
if (!existsSync(entryPoint)) {
  console.error(`Fatal: Pre-staged entrypoint missing at path: ${entryPoint}`);
  process.exit(1);
}

console.log("Flattening async chunk fragments into a unified standalone ESM file...");
const result = await Bun.build({
  entrypoints: [entryPoint],
  target: "browser", // Generates standard, web-compliant module tracks
  format: "esm",     // Strictly generates modern import/export syntax for Deno
  minify: false,      // Safely retains minification properties
});

if (!result.success) {
  console.error("Bundler failed:", result.logs);
  process.exit(1);
}

// 🌟 Safely write exactly ONE flat file asset out of memory down to disk
// ...completely destroys the possibility of external code-splitting chunks leaking to branch.
const compiledCodeText = await result.outputs[0].text();
Bun.write(outMapFile, compiledCodeText);

console.log("Bundle compiled successfully! Standalone index.js created.");
