#!/bin/bash
# Post-merge setup — runs automatically after every task branch is merged.
# Must be: idempotent, non-interactive (stdin is /dev/null), and fast.
#
# NOTE: `bun run build` is intentionally omitted here. The build requires the
# private @jpytrader/fundrates-arb package (installed by scripts/install-arb.mjs
# using CI secrets). CI commits the compiled dist/ output to the test branch, so
# the post-merge environment always has a pre-built dist/ — no rebuild needed.
set -euo pipefail

echo "=== post-merge setup ==="

echo "Installing dependencies..."
bun install --no-save

echo "=== post-merge setup complete ==="
