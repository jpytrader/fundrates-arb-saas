// supabase-saas/client/RotateKeyDialog.tsx
//
// Thin React modal that consumers of @vireson/supabase-saas can drop into
// their settings page to let users rotate exchange API keys without secrets
// ever round-tripping to a custom backend.
//
// Wire to the `rotate-exchange-key` edge function shipped in this package.
// The host app must provide a configured `supabase` client.

import { useState, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

export type Exchange = 'hyperliquid' | 'okx';

interface RotateKeyDialogProps {
  supabase: SupabaseClient;
  exchange: Exchange;
  open: boolean;
  onClose: () => void;
  onRotated?: (rotatedAt: string) => void;
}

interface RotateResponse {
  ok?: boolean;
  rotatedAt?: string;
  error?: unknown;
}

export function RotateKeyDialog({
  supabase,
  exchange,
  open,
  onClose,
  onRotated,
}: RotateKeyDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setApiKey('');
    setApiSecret('');
    setWalletAddress('');
    setErr(null);
    setBusy(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (apiKey.trim().length < 8 || apiSecret.trim().length < 8) {
      setErr('API key and secret must each be at least 8 characters.');
      return;
    }

    setBusy(true);
    const { data, error } = await supabase.functions.invoke<RotateResponse>(
      'rotate-exchange-key',
      {
        body: {
          exchange,
          apiKey: apiKey.trim(),
          apiSecret: apiSecret.trim(),
          extra: exchange === 'hyperliquid' && walletAddress
            ? { walletAddress: walletAddress.trim() }
            : undefined,
        },
      },
    );
    setBusy(false);

    if (error || !data?.ok) {
      setErr(
        (error?.message as string | undefined) ??
          (typeof data?.error === 'string' ? data.error : 'Rotation failed'),
      );
      return;
    }

    onRotated?.(data.rotatedAt ?? new Date().toISOString());
    reset();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'var(--background, #fff)',
          color: 'var(--foreground, #111)',
          padding: 24,
          borderRadius: 8,
          width: 'min(420px, 92vw)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Rotate {exchange} key</h3>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>
          New credentials are smoke-tested before being written to Vault. The
          previous key is replaced atomically.
        </p>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13 }}>API key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            autoComplete="off"
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13 }}>API secret</span>
          <input
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            autoComplete="off"
            required
          />
        </label>

        {exchange === 'hyperliquid' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13 }}>Wallet address (optional)</span>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x…"
              autoComplete="off"
            />
          </label>
        )}

        {err && (
          <div style={{ color: 'crimson', fontSize: 13 }} role="alert">
            {err}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="submit" disabled={busy}>
            {busy ? 'Rotating…' : 'Rotate key'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RotateKeyDialog;
