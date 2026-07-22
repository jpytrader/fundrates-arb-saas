---
name: Gap analysis closures (S8, S11, S14)
description: What was done to close the three actionable gaps from the spec gap analysis.
---

## S8 — Bug 1: phase stuck 'exiting' (High)
**Location:** `edge-functions/fra-engine/index.ts` inside `tickUser()`, after `engine.tick()`.

**Fix:** Added a harness-level guard that reads `updated.phase` from the MemoryStore after `engine.tick()`. If it equals `'exiting'`, the write-back to `fra_state` is skipped and a structured `warn` is emitted (`skipped_write_phase_exiting`). Execution events are still mirrored. The DB row is never corrupted with a stuck phase.

**Why:** Core Bug 1 fix (catch block resets phase to `'monitoring'`) may be absent in the installed version of `@jpytrader/fundrates-arb`. The harness guard is defence-in-depth regardless of whether core carries the fix.

## S11 — Bug 4: duplicate close orders (High)
**Location:** `edge-functions/close-all-positions/index.ts` (new function).

**Fix:** Acquires `fra-tick:<user_id>` lock (same key as the cron tick) before doing anything. Returns 409 if the lock is held (cron in progress). Sets `is_running = false` in the DB before running `engine.stop()` — the cron tick's existing mid-tick stop guard then prevents any overlap. Events are mirrored into `fra_events`.

**Why:** The per-tenant DB lock in `fra-engine` only protects server↔server races. A client-triggered close call arriving while a cron tick is running needed the same lock mechanism to prevent duplicate live exchange orders.

**Deploy:** `supabase functions deploy close-all-positions`

## S14 — Admin clearPersistedState endpoint (Medium)
**Location:** `edge-functions/admin-clear-state/index.ts` (new function).

**Fix:** POST `{ user_id: "<uuid>" }` with an admin JWT. Admin check reads `user.app_metadata.role === 'admin'` (set server-side only via service role — cannot be spoofed). Deletes `fra_state` row for the target user; ON DELETE CASCADE removes `fra_positions` + `fra_pnl_history`. Action is logged with hashed IDs.

**How to grant admin:** `supabase.auth.admin.updateUserById(userId, { app_metadata: { role: 'admin' } })`

**Deploy:** `supabase functions deploy admin-clear-state`

## Remaining low-priority gaps (not implemented — by design)
- **S12** (WebSocket streaming): Postgres Realtime at ~1s latency is sufficient for 60s tick intervals. Implement only if sub-second funding-rate streaming is explicitly required.
- **S9** (Bug 3 stop() phase ordering): Must be verified/fixed in the core package; harness cannot enforce call ordering inside `persistNow()`.
