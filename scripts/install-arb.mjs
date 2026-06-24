#!/usr/bin/env node
/**
 * Generates a temporary local .bunfig.toml config to authenticate 
 * against private GitHub endpoints, executes a locked installation, 
 * and handles secure process cleanup to safeguard API keys.
 */
import { writeFileSync, rmSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const BUNFIG_PATH = new URL('../.bunfig.toml', import.meta.url);
const PKG_PATH = new URL('../package.json', import.meta.url);

function detectBranch() {
  if (process.env.ARB_BRANCH) return process.env.ARB_BRANCH;
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' }).toString().trim();
  } catch {
    return 'main'; // Safe default if git binary is absent in minimal environments
  }
}

function resolveRef(branch) {
  switch (branch) {
    case 'dev':  return 'dev';
    case 'test': return 'test';
    case 'main': return process.env.ARB_PINNED_SHA || 'main';
    default:     return 'dev'; // Target PR / feature environments to baseline
  }
}

// 1. Validation Checks
const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

const owner = process.env.ARB_OWNER || (process.env.GITHUB_REPOSITORY_OWNER ?? '').trim();
const repo  = process.env.ARB_REPO  || 'fundrates-arb';
if (!owner) {
  console.error('CRITICAL: ARB_OWNER or GITHUB_REPOSITORY_OWNER must be defined.');
  process.exit(1);
}

const branch = detectBranch();
const ref    = resolveRef(branch);

// 2. Build Safe Configuration Layer
// Instead of writing a token to package.json, we map the registry target via .bunfig.toml
const targetTarballUrl = `https://github.com{owner}/${repo}/tarball/${ref}`;

// We construct a scoped or registry mapping block for the bun installer
const bunfigContent = `
# Automatically generated build artifact - Do not commit
[install]
cache = true

[install.scopes]
# Maps credentials specifically to your dependency endpoint safely via headers
"https://api.github.com/" = { token = "${token}" }
`;

// Helper cleanup execution method 
function secureCleanup() {
  try {
    rmSync(BUNFIG_PATH, { force: true });
  } catch (err) {
    // Fail silently during sweeping
  }
}

// Register system event interrupts to ensure credentials are wiped even if the script aborts mid-run
process.on('SIGINT', () => { secureCleanup(); process.exit(130); });
process.on('SIGTERM', () => { secureCleanup(); process.exit(143); });
process.on('uncaughtException', (err) => {
  console.error('Uncaught runner crash:', err.message);
  secureCleanup();
  process.exit(1);
});

let installFailed = false;

try {
  console.log(`Writing runtime runtime build configurations to .bunfig.toml...`);
  writeFileSync(BUNFIG_PATH, bunfigContent.trim() + '\n');

  console.log(`Installing ${repo} from target ref: [ ${ref} ] on branch: ( ${branch} )`);
  
  // --frozen-lockfile stops Bun from generating dynamic token paths inside binary lookups
  execSync(`bun install --frozen-lockfile`, { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      // We pass the dynamic URL parameter explicitly to override package defaults
      [`BUN_DEPENDENCY_OVERRIDE_${repo.toUpperCase().replace(/-/g, '_')}`]: targetTarballUrl
    }
  });

} catch (error) {
  installFailed = true;
  console.error('Installation context execution halted:', error.message);
} finally {
  console.log('Cleaning up temporary configuration records...');
  secureCleanup();
}

process.exit(installFailed ? 1 : 0);
