#!/usr/bin/env node
import { execSync } from 'node:child_process';

const token = process.env.GH_DEP_TOKEN;
if (!token) {
  console.error('CRITICAL: GH_DEP_TOKEN environment variable is not defined.');
  process.exit(1);
}

try {
  console.log('Installing fundrates-arb release artifact via native env injection...');
  execSync('bun install', { stdio: 'inherit' });
} catch (error) {
  console.error('Installation execution context halted:', error.message);
  process.exit(1);
}