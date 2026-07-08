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

const owner = process.env.ARB_OWNER || 'jpytrader';
const repo  = process.env.ARB_REPO  || 'fundrates-arb';

// MODIFIED: Use the precise runtime commit SHA passed from your workflow step
const ref = process.env.GH_COMMIT_SHA;
if (!ref) {
  console.error('CRITICAL: GH_COMMIT_SHA environment variable is missing.');
  process.exit(1);
}

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log('Step 2: Extracting tarball archive cleanly via Native Git Remote Engine...');
  const targetDir = 'node_modules/@jpytrader/' + repo;
  
  // Isolate and prepare the target node_modules directories cleanly
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  // Build an authenticated HTTPS repository clone URL matching standard Git credentials
  const repoUrl = 'https://x-access-token:' + token + '@github.com/' + owner + '/' + repo + '.git';
  
  // MODIFIED: Completely bypass curl/API layers. Fetch live commits instantly without cache proxy bugs.
  // 1. Fetch the exact runtime commit object into a shallow temporary scratch space
  execSync('git clone --depth 1 --no-checkout "' + repoUrl + '" temp_scratch_clone', { stdio: 'ignore' });
  
  // 2. Navigate inside, isolate the exact SHA context, and create the tarball snapshot stream
  execSync('git -C temp_scratch_clone fetch --depth 1 origin ' + ref, { stdio: 'ignore' });
  execSync('git -C temp_scratch_clone archive --format=tar.gz ' + ref + ' --output=../' + repo + '.tar.gz', { stdio: 'ignore' });
  
  // Clean up the temporary structural clone tracking workspace
  fs.rmSync('temp_scratch_clone', { recursive: true, force: true });

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
