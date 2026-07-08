#!/usr/bin/env node
/**
 * Modular environment-driven downloader for private/public dependencies.
 * Uses native fetch with explicit error terminations and robust redirect mapping.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

// Safely extract environment values passed directly from the GitHub Actions runner
const owner = process.env.ARB_OWNER || 'jpytrader';
const repo  = process.env.ARB_REPO  || 'fundrates-arb';

// FIX: Target your active moving branch pointer to natively break the release tag cache
const ref   = process.env.ARB_BRANCH || process.env.ARB_TAG || 'main';

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log('Step 2: Downloading tarball archive via GitHub API...');
  const targetDir = 'node_modules/@jpytrader/' + repo;
  
  // Isolate and prepare the target node_modules directories cleanly
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  // ALTERNATIVE HIGH-STABILITY ARCHIVE ROUTE
  const tarballUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/tarball/' + ref;
  console.log('Target API Download Location resolved to: ' + tarballUrl);
  
  const response = await fetch(tarballUrl, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json'
    }
  });

  // FIX: Force hard script termination here so the workflow doesn't fail silently or run blind steps
  if (!response.ok) {
    console.error('CRITICAL ERROR: GitHub API validation failed with status: ' + response.status);
    console.error('This means GH_DEP_TOKEN lacks access permissions to ' + owner + '/' + repo + ' or the branch "' + ref + '" does not exist.');
    process.exit(1);
  }

  // Stream the response body securely into the localized target file
  const fileStream = fs.createWriteStream(repo + '.tar.gz');
  await finished(Readable.fromWeb(response.body).pipe(fileStream));

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
