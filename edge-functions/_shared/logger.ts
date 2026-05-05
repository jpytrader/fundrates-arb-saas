// _shared/logger.ts
//
// Tiny structured-JSON logger for SaaS edge functions.
// Goals:
//   * Log lines parsable as JSON by Supabase log drains / Datadog / Loki.
//   * Never log PII — user_id is hashed with SHA-256.
//   * Zero runtime deps.

type Level = 'debug' | 'info' | 'warn' | 'error';

async function hashUserId(userId: string | null | undefined): Promise<string | null> {
  if (!userId) return null;
  const data = new TextEncoder().encode(userId);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function createLogger(fn: string) {
  function emit(level: Level, event: string, fields: Record<string, unknown> = {}) {
    const line = JSON.stringify({
      level,
      ts: new Date().toISOString(),
      fn,
      event,
      ...fields,
    });
    if (level === 'error') console.error(line);
    else if (level === 'warn') console.warn(line);
    else console.log(line);
  }

  return {
    debug: (event: string, f?: Record<string, unknown>) => emit('debug', event, f),
    info: (event: string, f?: Record<string, unknown>) => emit('info', event, f),
    warn: (event: string, f?: Record<string, unknown>) => emit('warn', event, f),
    error: (event: string, f?: Record<string, unknown>) => emit('error', event, f),
    hashUserId,
  };
}
