#!/usr/bin/env node
/**
 * Modular environment-driven downloader for private/public dependencies.
 * Uses native fetch to handle secure cross-domain AWS S3 redirects properly.
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

// FIX: Prioritize explicit commit SHA to permanently bypass GitHub's stale cache
const ref   = process.env.ARB_TAG || 'v0.1.0';

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log('Step 2: Downloading tarball archive via GitHub API...');
  const targetDir = 'node_modules/@jpytrader/' + repo;
  
  // Isolate and prepare the target node_modules directories cleanly
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  const tarballUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/tarball/' + ref;
  console.log('Target API Download Location resolved to: ' + tarballUrl);
  
  // FIX: Use native Node fetch to cleanly handle the download and auto-strip headers on redirect
  const response = await fetch(tarballUrl, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json'
    }
  });

  if (!response.ok) {
    throw new Error('GitHub API responded with status ' + response.status);
  }

  // Stream the response directly to the tar.gz file destination
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
