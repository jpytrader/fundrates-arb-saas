import React, { useEffect, useState, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useSubscription } from './use-subscription';
import { styles } from './SubscriptionGateStyles';

interface SubscriptionGateProps {
  supabase: SupabaseClient;
  userId: string | null;
  priceId: string;
  autoRedirect?: boolean;
  children: ReactNode;
}

export function SubscriptionGate({
  supabase,
  userId,
  priceId,
  autoRedirect = false,
  children,
}: SubscriptionGateProps) {
  const sub = useSubscription(supabase, userId);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!autoRedirect || !userId || sub.loading || sub.isActive) return;
    void sub.redirectToCheckout(priceId).catch((err) => {
      console.error('[SubscriptionGate] checkout redirect failed', err);
    });
  }, [autoRedirect, userId, sub.loading, sub.isActive, sub, priceId]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setIsAuthModalOpen(false);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        void sub.redirectToCheckout(priceId);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication processing error.');
    } finally {
      setAuthLoading(false);
    }
  };

  const openModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthError(null);
    setEmail('');
    setPassword('');
    setIsAuthModalOpen(true);
  };

  // 1. UNAUTHENTICATED LANDING PRESENTATION
  if (!userId) {
    return (
      <div style={styles.landingContainer}>
        <header style={styles.header}>
          <div style={styles.logo}>Fundrates Arb</div>
          <button type="button" style={styles.navLink} onClick={() => openModal('signin')}>
            Sign In
          </button>
        </header>

        <main style={styles.heroSection}>
          <h1 style={styles.title}>Automated Funding Rate Arbitrage</h1>
          <p style={styles.subtitle}>
            Maximize yields by capturing market inefficiencies across centralized and decentralized perpetual exchanges. 
            Our automated execution engine tracks, balances, and locks delta-neutral premiums 24/7 with zero manual overhead.
          </p>
          
          <div style={styles.ctaGroup}>
            <button type="button" style={styles.primaryBtn} onClick={() => openModal('signup')}>
              Get Started (Subscribe)
            </button>
            <button type="button" style={styles.secondaryBtn} onClick={() => openModal('signin')}>
              Access Workspace
            </button>
          </div>
        </main>

        <section style={styles.featureSection}>
          <div style={styles.featureCard}>
            <h3 style={styles.cardTitle}>Delta-Neutral Execution</h3>
            <p style={styles.cardBody}>Simultaneously balance spot and perpetual positions to extract funding payouts without exposing capital to asset price direction fluctuations.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.cardTitle}>Realtime Persistence</h3>
            <p style={styles.cardBody}>Connected directly to Supabase clusters for persistent multi-account state tracking, engine revision history logging, and live balance monitoring.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.cardTitle}>Stripe Payment Resilience</h3>
            <p style={styles.cardBody}>Secure usage gateways managed via automated webhooks, custom webhook verification routines, and seamless checkout portals.</p>
          </div>
        </section>

        {isAuthModalOpen && (
          <div style={styles.modalOverlay} onClick={() => setIsAuthModalOpen(false)}>
            <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.modalTitle}>
                {authMode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p style={styles.modalSubtitle}>
                {authMode === 'signin' 
                  ? 'Enter your credentials to access the arbitrage dashboard.' 
                  : 'Register now to proceed securely to Stripe subscription checkout.'}
              </p>

              <form onSubmit={handleAuthAction} style={styles.form}>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                
                {authError && <p style={styles.errorText}>{authError}</p>}

                <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                  {authLoading ? 'Processing…' : authMode === 'signin' ? 'Sign In' : 'Sign Up & Subscribe'}
                </button>
              </form>

              <div style={styles.toggleModeBlock}>
                {authMode === 'signin' ? (
                  <p>Don't have an account? <span style={styles.toggleLink} onClick={() => openModal('signup')}>Sign up here</span></p>
                ) : (
                  <p>Already have an account? <span style={styles.toggleLink} onClick={() => openModal('signin')}>Sign in here</span></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. AUTHENTICATED BUT MISSING ACTIVE SUBSCRIPTION
  if (sub.loading) {
    return (
      <div style={styles.center}>
        <p style={{ color: '#94a3b8' }}>Verifying subscription lifecycle status…</p>
      </div>
    );
  }

  if (!sub.isActive) {
    return (
      <div style={styles.center}>
        <h2 style={{ marginBottom: 8, color: '#f8fafc' }}>Subscription Required</h2>
        <p style={{ marginBottom: 20, color: '#94a3b8', maxWidth: 420, lineHeight: 1.5 }}>
          Your account is active, but you do not have an active Funding Rate Arbitrage subscription profile.
        </p>
        <button
          type="button"
          style={styles.primaryBtn}
          onClick={() => void sub.redirectToCheckout(priceId)}
        >
          Subscribe to Continue
        </button>
        {sub.error && <p style={styles.errorText}>{sub.error}</p>}
      </div>
    );
  }

  // 3. ACCESS GRANTED
  return <>{children}</>;
}

const styles: Record<string, React.CSSProperties> = {
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