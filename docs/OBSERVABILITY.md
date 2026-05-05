# Observability

This document describes the structured logging, metrics, and dashboards for
the SaaS deployment.

## Structured logging

`supabase-saas/edge-functions/_shared/logger.ts` emits one JSON object per
log line:

```json
{ "level": "info", "ts": "...", "fn": "fra-engine", "event": "tick_complete",
  "tenants_total": 12, "tenants_eligible": 11, "errors": 0, "duration_ms": 842 }
```

- `user_id` is **never** logged in plain text — `log.hashUserId(userId)`
  returns the first 8 hex chars of SHA-256(user_id).
- All edge functions (`fra-engine`, `rotate-exchange-key`, `revoke-exchange-key`,
  `stripe-webhook-fra`, `reconcile-subscriptions`) use the same logger.

Pipe Supabase function logs into a log aggregator (Datadog / Loki / S3) and
filter on `fn` + `event` for dashboards and alerts.

## Engine metrics — `public.fra_engine_metrics`

| Column              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `tenants_total`     | All `fra_state.is_running = true` rows seen.                 |
| `tenants_eligible`  | Subset that passed Layer 7 (active subscription).            |
| `tenants_skipped`   | `total - eligible`.                                          |
| `errors`            | Count of tenants whose `tickUser` threw.                     |
| `duration_ms`       | Wall time of the whole tick.                                 |
| `sub_cache_age_ms`  | Subscription cache age at lookup.                            |
| `sub_cache_cold`    | `true` if the lookup refreshed the cache (incl. error path). |

One row per cron tick. Inspected via `<EngineMetrics />` (super-admin only).

### Suggested alerts

| Condition                                            | Severity |
| ---------------------------------------------------- | -------- |
| `errors > 0` for 3 consecutive ticks                 | warn     |
| `errors / tenants_eligible > 0.25`                   | crit     |
| `duration_ms > 45_000` (cron is 60 s)                | warn     |
| No new metric row in the last 5 min                  | crit     |
| `sub_cache_cold = true` for >90% of last 20 ticks    | warn     |

## Webhook DLQ — `public.fra_webhook_dlq`

Inspect with:

```sql
SELECT event_id, event_type, retry_count, last_error, next_attempt_at
FROM public.fra_webhook_dlq
WHERE resolved_at IS NULL
ORDER BY next_attempt_at;
```

Alert when any row exceeds `retry_count >= 8` or sits unresolved for >24 h.

## Key rotations & revocations — `public.fra_key_rotations`

`action` is now `'rotate' | 'revoke'`. Surface unusual revocation rates
(possible compromise sweep) in the admin UI.
