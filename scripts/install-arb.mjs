#!/usr/bin/env node
#!/usr/bin/env node
/**
 * Direct download and extraction script for private fundrates-arb dependency.
 * Bypasses broken Bun protocol parsing loops entirely.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

const owner = 'jpytrader';
const repo = 'fundrates-arb';
const tag = 'v0.1.0';

try {
  console.log('Step 1: Installing public manifest dependencies via Bun...');
  execSync('bun install', { stdio: 'inherit' });

  console.log(`Step 2: Downloading private tarball archive (${tag}) via GitHub API...`);
  const targetDir = `node_modules/@jpytrader/${repo}`;
  
  // Clean up any stale or partial installation directories
  fs.mkdirSync('node_modules/@jpytrader', { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  // Download the private tarball using curl with proper Authorization headers and follow redirects
  const tarballUrl = `https://github.com{owner}/${repo}/tarball/${tag}`;
  execSync(
    `curl -sL -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github+json" "${tarballUrl}" -o "${repo}.tar.gz"`,
    { stdio: 'inherit' }
  );

  console.log('Step 3: Extracting package contents into target node_modules scope...');
  // Extracts the archive, strips the dynamic top-level folder prefix created by GitHub, and saves it
  execSync(`tar -xzf "${repo}.tar.gz" -C "${targetDir}" --strip-components=1`, { stdio: 'inherit' });

  // Clean up the temporary tar file from the root directory
  fs.unlinkSync(`${repo}.tar.gz`);
  console.log('SUCCESS: Private dependency successfully resolved and mounted!');

} catch (error) {
  console.error('CRITICAL ERROR: Failed to resolve private repository bundle:', error.message);
  process.exit(1);
}
