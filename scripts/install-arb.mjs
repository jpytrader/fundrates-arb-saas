#!/usr/bin/env node
/**
 * Rewrites the `fundrates-arb` git dependency in package.json to the ref
 * appropriate for the current branch, embeds a short-lived auth token,
 * runs `bun install`, then restores the clean (token-less) form.
 *
 * Branch -> ref:
 *   dev   -> #dev   (HEAD of arb's dev branch, source built via prepare script)
 *   test  -> #test  (HEAD of arb's test branch, already compiled)
 *   main  -> exact SHA from $ARB_PINNED_SHA (captured when test -> main PR opened)
 *           falls back to #main if ARB_PINNED_SHA is unset.
 *
 * Required env:
 *   GH_DEP_TOKEN  Fine-grained PAT with contents:read on the arb repo.
 *   ARB_OWNER     GitHub org/user that owns fundrates-arb. Defaults to repo owner.
 *   ARB_REPO      Repo name. Defaults to 'fundrates-arb'.
 *   ARB_BRANCH    Override branch detection (otherwise uses GITHUB_REF_NAME
 *                 or `git rev-parse --abbrev-ref HEAD`).
 *   ARB_PINNED_SHA  Required for the main branch path.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PKG_PATH = new URL('../package.json', import.meta.url);
const DEP_NAME = 'fundrates-arb';

function detectBranch() {
  if (process.env.ARB_BRANCH) return process.env.ARB_BRANCH;
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function resolveRef(branch) {
  switch (branch) {
    case 'dev':  return 'dev';
    case 'test': return 'test';
    case 'main': return process.env.ARB_PINNED_SHA || 'main';
    default:
      // PRs and feature branches: build against arb's dev to match Lovable.
      return 'dev';
  }
}

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('GH_DEP_TOKEN is not set; cannot install private git dependency.');
  process.exit(1);
}

const owner = process.env.ARB_OWNER
  || (process.env.GITHUB_REPOSITORY_OWNER ?? '').trim();
const repo  = process.env.ARB_REPO  || 'fundrates-arb';
if (!owner) {
  console.error('ARB_OWNER (or GITHUB_REPOSITORY_OWNER) must be set.');
  process.exit(1);
}

const branch = detectBranch();
const ref    = resolveRef(branch);
const cleanSpec = `github:${owner}/${repo}#${ref}`;
const authSpec  = `git+https://x-access-token:${token}@github.com/${owner}/${repo}.git#${ref}`;

const original = readFileSync(PKG_PATH, 'utf8');
const pkg = JSON.parse(original);
pkg.dependencies = pkg.dependencies || {};
pkg.dependencies[DEP_NAME] = authSpec;
writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');

let installFailed = false;
try {
  console.log(`Installing ${DEP_NAME} from ${owner}/${repo}#${ref} (branch=${branch})`);
  execSync('bun install', { stdio: 'inherit' });
} catch (e) {
  installFailed = true;
  console.error(e.message);
} finally {
  // Restore the clean, token-less spec so nothing leaks into commits or logs.
  pkg.dependencies[DEP_NAME] = cleanSpec;
  writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
}

process.exit(installFailed ? 1 : 0);
