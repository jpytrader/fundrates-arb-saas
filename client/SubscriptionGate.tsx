import React, { useEffect, useState, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { type SubscriptionState } from './use-subscription';
import { styles, executeGlobalSignOut } from './supabase-utils'; 

interface SubscriptionGateProps {
  supabase: SupabaseClient;
  userId: string | null;
  priceId: string;
  autoRedirect?: boolean;
  subscription: SubscriptionState;
  children: ReactNode;
}
// Modal steps
type AuthStep = 'credentials' | 'otp_verify';

export function SubscriptionGate({
  supabase,
  userId,
  priceId,
  autoRedirect = false,
  subscription,
  children,
}: SubscriptionGateProps) {
  // const sub = useSubscription(supabase, userId);
  const sub = subscription;
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Clean parameters out on mount so they don't break subsequent site navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('fra_billing') || params.has('session_id')) {
      window.history.replaceState({}, document.title, window.location.pathname);
      // Forcefully call useSubscription built-in update hook to pull from the DB
      if (typeof sub.refresh === 'function') void sub.refresh();
    }
  }, [sub]);

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
    const params = new URLSearchParams(window.location.search);
    const isReturningFromAPI = params.has('fra_billing') || params.has('session_id');

    if (!autoRedirect || !userId || sub.loading || sub.isActive || isReturningFromAPI) return;
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
    if(e) e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      await executeGlobalSignOut(supabase);
    } catch (err) {
      setAuthError('[SubscriptionGate] Unexpected error during logout: ' + String(err));
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
