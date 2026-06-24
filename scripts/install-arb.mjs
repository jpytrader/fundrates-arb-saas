#!/usr/bin/env node
/**
 * Direct runtime credential injection script for fundrates-arb installation.
 * Bypasses file modification and utilizes safe process-level overrides.
 */
import { execSync } from 'node:child_process';

function detectBranch() {
  if (process.env.ARB_BRANCH) return process.env.ARB_BRANCH;
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' }).toString().trim();
  } catch {
    return 'main';
  }
}

function resolveRef(branch) {
  switch (branch) {
    case 'dev':  return 'dev';
    case 'test': return 'test';
    case 'main': return process.env.ARB_PINNED_SHA || 'main';
    default:     return 'dev';
  }
}

// Validation Checks
const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

let owner = (process.env.ARB_OWNER || '').trim();
if (!owner && process.env.GITHUB_REPOSITORY) {
  owner = process.env.GITHUB_REPOSITORY.split('/')[0];
}
if (!owner) {
  owner = (process.env.GITHUB_REPOSITORY_OWNER || '').trim();
}

const repo = process.env.ARB_REPO || 'fundrates-arb';
if (!owner) {
  console.error('CRITICAL: Repository owner context could not be resolved.');
  process.exit(1);
}

const branch = detectBranch();
const ref    = resolveRef(branch);

// FIX: Embed token inside an Authenticated Tarball Download URL
// The GitHub API allows personal access tokens to be supplied natively via basic auth user blocks
const authenticatedTarballUrl = `https://x-access-token:${token}@api.github.com/repos/${owner}/${repo}/tarball/${ref}`;

let installFailed = false;

try {
  console.log(`Installing ${repo} from target ref: [ ${ref} ] on branch: ( ${branch} )`);
  
  // Inject the authenticated URL using Bun's runtime variable overlay hook
  execSync('bun install --frozen-lockfile', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      [`BUN_DEPENDENCY_OVERRIDE_${repo.toUpperCase().replace(/-/g, '_')}`]: authenticatedTarballUrl
    }
  });

} catch (error) {
  installFailed = true;
  console.error('Installation context execution halted:', error.message);
}

process.exit(installFailed ? 1 : 0);
