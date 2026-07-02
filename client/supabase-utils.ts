// src/client/supabase-utils.ts
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Centrally manages global session clear operations across all application entry vectors.
 */
export async function executeGlobalSignOut(supabase: SupabaseClient): Promise<void> {
  const { error } = await supabase.auth.signOut({ scope: 'global' });
  if (error) {
    throw new Error(error.message);
  }
}

export const styles: Record<string, React.CSSProperties> = {
  landingContainer: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #1e293b',
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '-0.05em',
    color: '#3b82f6',
  },
  navLink: {
    background: 'transparent',
    border: '1px solid #334155',
    color: '#94a3b8',
    padding: '8px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '80px 24px 40px 24px',
    maxWidth: 800,
    margin: '0 auto',
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: 20,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '1.15rem',
    color: '#94a3b8',
    lineHeight: 1.6,
    marginBottom: 36,
  },
  ctaGroup: {
    display: 'flex',
    gap: 16,
  },
  primaryBtn: {
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
  },
  secondaryBtn: {
    padding: '12px 24px',
    borderRadius: 8,
    border: '1px solid #334155',
    background: 'transparent',
    color: '#f8fafc',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
  },
  featureSection: {
    display: 'flex',
    gap: 24,
    maxWidth: 1000,
    margin: '40px auto',
    padding: '0 24px',
    justifyContent: 'space-between',
  },
  featureCard: {
    flex: 1,
    background: '#1e293b',
    padding: 24,
    borderRadius: 12,
    border: '1px solid #334155',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#3b82f6',
  },
  cardBody: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 1.5,
    margin: 0,
  },
  center: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    background: '#1e293b',
    border: '1px solid #334155',
    padding: 40,
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 1.4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#f8fafc',
    fontSize: 15,
    outline: 'none',
  },
  submitBtn: {
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
    marginTop: 8,
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#0070f3',
    cursor: 'pointer',
    marginTop: '0.5rem',
    textAlign: 'center' as const
  },
  toggleModeBlock: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#94a3b8',
  },
  toggleLink: {
    color: '#3b82f6',
    cursor: 'pointer',
    fontWeight: 500,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    margin: '4px 0 0 0',
    textAlign: 'center',
  },
};