#!/usr/bin/env node
/**
 * Dynamic environment-driven downloader for private dependencies.
 * Bypasses branch filesystem tracking state conflicts completely.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

// Read variables injected directly from the workflow runtime state environment
const owner = process.env.ARB_OWNER || 'jpytrader';
const repo  = process.env.ARB_REPO  || 'fundrates-arb';
const tag   = process.env.ARB_TAG   || 'v0.1.0';

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log(`Step 2: Downloading private tarball archive (${tag}) via GitHub API...`);
  const targetDir = `node_modules/@jpytrader/${repo}`;
  
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  // FIXED: Explicit leading $ sign added right before {owner} on character 40
  const tarballUrl = `https://github.com/${owner}/${repo}/tarball/${tag}`;
  
  execSync(
    `curl -sL -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github+json" "${tarballUrl}" -o "${repo}.tar.gz"`,
    { stdio: 'inherit' }
  );

  console.log('Step 3: Extracting package contents into target node_modules scope...');
  execSync(`tar -xzf "${repo}.tar.gz" -C "${targetDir}" --strip-components=1`, { stdio: 'inherit' });

  fs.unlinkSync(`${repo}.tar.gz`);
  console.log('SUCCESS: Private dependency successfully resolved and mounted!');

} catch (error) {
  console.error('CRITICAL ERROR: Failed to resolve private repository bundle:', error.message);
  process.exit(1);
}
