// scripts/bundle-arb-edge.mjs
import { join } from "path";

const entryPoint = join(process.cwd(), "node_modules/@jpytrader/fundrates-arb/dist/esm/index.js");
const outDir = join(process.cwd(), "edge-functions/_shared/packages/fundrates-arb");

console.log("Flattening async chunk fragments into a unified standalone ESM file...");

const result = await Bun.build({
  entrypoints: [entryPoint],
  outdir: outDir,
  target: "browser", // Outputs standard, clean web-compliant module tracks
  format: "esm",     // Strictly generates modern import/export syntax for Deno
  minify: true,      // Safely retains minification properties
});

if (!result.success) {
  console.error("Bundler failed:", result.logs);
  process.exit(1);
}

console.log(`Bundle compiled successfully! index.js bundle created in ${outdir}.`);