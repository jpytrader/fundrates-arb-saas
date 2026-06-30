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
// Modal steps
type AuthStep = 'credentials' | 'otp_verify';

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
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // When userId updates from null -> active string, the user is fully authed.
  useEffect(() => {
    if (userId) { 
      setIsAuthModalOpen(false); // Close the modal globally
      setAuthStep('credentials'); // Reset step for future use
      setOtp('');
      
      // OPTIONAL: If they just signed in/verified, automatically push them to checkout
      // void sub.redirectToCheckout(priceId);
    }
  }, [userId, priceId, sub]);

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
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // CHECK: If MFA/TOTP is enforced, Supabase does not return a full session yet
        if (!data.session) {
          setAuthStep('otp_verify');
          throw new Error(`Verification required. Please enter OTP sent to ${email} to continue.`);
        }
        setIsAuthModalOpen(false);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password, options: {
            emailRedirectTo: window.location.origin, 
          }
        });
        if (error) throw error;
        // CHECK: Email confirmation is enabled, so data.session will be null here
        if (!data.session) {
          // We throw a fresh error here to stop execution before redirectToCheckout is called
          throw new Error(`Deltametrician created! Please check ${email} to verify your account and continue.`);
        }
        void sub.redirectToCheckout(priceId);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication processing error.');
      // setIsAuthModalOpen(false); // Or keep it open with a success message state
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email' // 'totp' if using Supabase MFA app
      });

      if (error) throw error;

      if (!data.session) {
        throw new Error('Invalid or expired OTP code. Please try again.');
      }
      
      // Note: We don't manually close the modal here. 
      // The useEffect listening to sub.userId above handles it cleanly.
    } catch (err: any) {
      setAuthError(err.message || 'OTP verification failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' }); // default: local (current tab/device)
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      setAuthError('[SubscriptionGate] Unexpected error during logout:', err);
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
          <div style={styles.logo}>Deltametrician</div>
          <button type="button" style={styles.navLink} onClick={() => openModal('signin')}>
            Sign In
          </button>
        </header>

        <main style={styles.heroSection}>
          <h1 style={styles.title}>Cryptocurrency Portfolio Dashboard</h1>
          <p style={styles.subtitle}>
            Maximize yields by capturing market inefficiencies across centralized and decentralized perpetual exchanges. 
            Our automated execution engine tracks, balances, and sweeps yield premiums 24/7 with zero manual overhead.
            Simply transfer your assets to Hyperliquid (DEX) or OKX (CEX), and go live whenever paper trading gets boring.
            You only need your API keys with 'create-order' and 'transfer' permissions - No withdraw permissions needed.
          </p>
          
          <div style={styles.ctaGroup}>
            <button type="button" style={styles.primaryBtn} onClick={() => openModal('signup')}>
              Get Started
            </button>
            <button type="button" style={styles.secondaryBtn} onClick={() => openModal('signin')}>
              Enter Dashboard
            </button>
          </div>
        </main>

        <section style={styles.featureSection}>
          <div style={styles.featureCard}>
            <h3 style={styles.cardTitle}>Conservative Execution</h3>
            <p style={styles.cardBody}>Automatically balance positions and sweep yields without exposing capital to asset price direction fluctuations.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.cardTitle}>Realtime Analysis</h3>
            <p style={styles.cardBody}>Exchange's klines API is persisted to Supabase clusters for weekly analysis, engine revision history logging, and live balance monitoring.</p>
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
                {authStep === 'credentials' ? (authMode === 'signin' ? 'Welcome Back' : 'Create Deltametrician') : 'Verify OTP'}
              </h2>
              <p style={styles.modalSubtitle}>
                {authMode === 'signin' 
                  ? 'Enter your credentials to access the Metrics dashboard.' 
                  : 'Create your Deltametrician securely with Stripe.'}
              </p>

              {authStep === 'credentials' ? (
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

                  <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                    {authLoading ? 'Processing…' : authMode === 'signin' ? 'Sign In' : 'Sign Up & Subscribe'}
                  </button>
                </form>
              ) : (
                /* STEP 2: OTP CODE FORM */
                <form onSubmit={handleOtpVerify} style={styles.form}>
                  <p style={styles.modalSubtitle}>Enter verification code sent to <strong>{email}</strong>.</p>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP code"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                    {authLoading ? 'Verifying…' : 'Confirm Code'}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => { setAuthStep('credentials'); setAuthError(null); }} 
                    style={styles.toggleBtn}
                  >
                    ← Back
                  </button>
                </form>
              )}
                
              {authError && <p style={styles.errorText}>{authError}</p>}

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
          Your account is active, but you do not have an active Deltametrician subscription.
        </p>
        {sub.error && <p style={styles.errorText}>{sub.error}</p>}
        <button
          type="button"
          style={styles.primaryBtn}
          onClick={() => void sub.redirectToCheckout(priceId)}
        >
          Subscribe to Continue
        </button>
        <button 
          disabled={authLoading}
          style={styles.secondaryBtn}
          onClick={handleLogout} 
        >
          {authLoading ? 'Logging out...' : 'Sign out'}
        </button>
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