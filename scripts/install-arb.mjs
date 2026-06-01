#!/usr/bin/env node
// Resolve the correct dist-tag of @OWNER/fundrates-arb based on the current branch
// and install it before the main `npm ci` / `bun install` runs in CI.
//
// Branch -> dist-tag mapping:
//   dev   -> dev
//   test  -> test
//   main  -> latest
//   * (PR/other) -> base ref if known, else 'latest'
//
// Requires env: PACKAGES_TOKEN (read:packages PAT) and OWNER (org/user).

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const OWNER = process.env.OWNER ?? 'OWNER';
const PKG = `@${OWNER}/fundrates-arb`;

const branch =
  process.env.GITHUB_HEAD_REF ||      // PR
  process.env.GITHUB_REF_NAME ||      // push
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const tag =
  branch === 'dev'  ? 'dev'  :
  branch === 'test' ? 'test' :
  branch === 'main' ? 'latest' :
  'latest';

console.log(`[install-arb] branch=${branch} -> tag=${tag}`);

// Resolve exact version from dist-tag
const version = execSync(`npm view ${PKG}@${tag} version`, {
  env: { ...process.env, npm_config_registry: 'https://npm.pkg.github.com' },
}).toString().trim();

console.log(`[install-arb] resolved ${PKG}@${tag} -> ${version}`);

// Pin the exact version into package.json so the subsequent `npm ci`/`bun install`
// gets a reproducible build for this run.
const pkgPath = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.dependencies ??= {};
pkg.dependencies[PKG] = version;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`[install-arb] pinned ${PKG}@${version} in package.json`);
