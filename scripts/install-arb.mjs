#!/usr/bin/env node
/**
 * Modular environment-driven downloader for private/public dependencies.
 * Uses explicit string concatenation to bypass editor template variable mutations.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

// Safely extract environment values passed directly from the GitHub Actions runner
const owner = process.env.ARB_OWNER || 'jpytrader';
const repo  = process.env.ARB_REPO  || 'fundrates-arb';
const tag   = process.env.ARB_TAG   || 'v0.1.0';

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log('Step 2: Downloading tarball archive via GitHub API...');
  const targetDir = 'node_modules/@jpytrader/' + repo;
  
  // Isolate and prepare the target node_modules directories cleanly
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  // FIXED: Explicitly includes the required forward slash and repos directory segment
  const tarballUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/tarball/' + tag;
  console.log('Target API Download Location resolved to: ' + tarballUrl);
  
  // Download using curl with explicit header mapping structures targeting the API
  execSync(
    'curl -sL -H "Authorization: Bearer ' + token + '" -H "Accept: application/vnd.github+json" "' + tarballUrl + '" -o "' + repo + '.tar.gz"',
    { stdio: 'inherit' }
  );

  console.log('Step 3: Extracting package contents into target node_modules scope...');
  // Extract archive and safely strip top-level directories created by GitHub
  execSync('tar -xzf "' + repo + '.tar.gz" -C "' + targetDir + '" --strip-components=1', { stdio: 'inherit' });

  // Clear up archive remnants
  fs.unlinkSync(repo + '.tar.gz');
  console.log('SUCCESS: Dependency successfully resolved and mounted!');

} catch (error) {
  console.error('CRITICAL ERROR: Failed to resolve repository bundle:', error.message);
  process.exit(1);
}
