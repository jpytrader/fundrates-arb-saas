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
type AuthStep = 'credentials' | 'otp_verify' | 'forgot' | 'reset_sent' | 'new_password';

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
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        // Supabase returns an empty identities array when the email is already registered.
        if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
          throw new Error(`An account with this email already exists. Please sign in instead.`);
        }
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

  // Listen for PASSWORD_RECOVERY event (user clicked the reset link in their email).
  // Supabase exchanges the token automatically and fires this event with a live session,
  // so we just need to open the "set new password" step.
  useEffect(() => {
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthStep('new_password');
        setNewPassword('');
        setConfirmPassword('');
        setAuthError(null);
        setIsAuthModalOpen(true);
      }
    });
    return () => authSub.unsubscribe();
  }, [supabase]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) throw error;
      setAuthStep('reset_sent');
    } catch (err: any) {
      setAuthError(err.message || 'Could not send reset email. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (newPassword.length < 8) {
      setAuthError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      // Session is already live; closing the modal lets the gate re-evaluate auth state.
      setIsAuthModalOpen(false);
      setAuthStep('credentials');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Could not update password. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const openModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthError(null);
    setEmail('');
    setPassword('');
    setAuthStep('credentials');
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
                {authStep === 'credentials' && (authMode === 'signin' ? 'Welcome Back' : 'Create Deltametrician')}
                {authStep === 'otp_verify'   && 'Verify OTP'}
                {authStep === 'forgot'       && 'Reset Password'}
                {authStep === 'reset_sent'   && 'Check Your Inbox'}
                {authStep === 'new_password' && 'Set New Password'}
              </h2>

              {/* STEP 1: Email + Password */}
              {authStep === 'credentials' && (
                <form onSubmit={handleAuthAction} style={styles.form}>
                  <p style={styles.modalSubtitle}>
                    {authMode === 'signin'
                      ? 'Enter your credentials to access the Metrics dashboard.'
                      : 'Create your Deltametrician securely with Stripe.'}
                  </p>
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
                  {authMode === 'signin' && (
                    <span
                      style={{ ...styles.toggleLink, fontSize: 13, textAlign: 'right', cursor: 'pointer' }}
                      onClick={() => { setAuthStep('forgot'); setAuthError(null); }}
                    >
                      Forgot password?
                    </span>
                  )}
                  <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                    {authLoading ? 'Processing…' : authMode === 'signin' ? 'Sign In' : 'Sign Up & Subscribe'}
                  </button>
                </form>
              )}

              {/* STEP 2: OTP verification */}
              {authStep === 'otp_verify' && (
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

              {/* STEP 3: Forgot password — email input */}
              {authStep === 'forgot' && (
                <form onSubmit={handleForgotPassword} style={styles.form}>
                  <p style={styles.modalSubtitle}>
                    Enter the email address linked to your account and we'll send a reset link.
                  </p>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                    {authLoading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthStep('credentials'); setAuthError(null); }}
                    style={styles.toggleBtn}
                  >
                    ← Back to sign in
                  </button>
                </form>
              )}

              {/* STEP 4: Reset link sent — confirmation */}
              {authStep === 'reset_sent' && (
                <div style={{ textAlign: 'center' }}>
                  <p style={styles.modalSubtitle}>
                    A password reset link has been sent to <strong>{email}</strong>.<br />
                    Click the link in the email to set a new password.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setAuthStep('credentials'); setAuthError(null); }}
                    style={styles.toggleBtn}
                  >
                    ← Back to sign in
                  </button>
                </div>
              )}

              {/* STEP 5: Set new password (after clicking email reset link) */}
              {authStep === 'new_password' && (
                <form onSubmit={handleSetNewPassword} style={styles.form}>
                  <p style={styles.modalSubtitle}>Choose a new password for your account.</p>
                  <input
                    type="password"
                    placeholder="New password (min 8 characters)"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" disabled={authLoading} style={styles.submitBtn}>
                    {authLoading ? 'Saving…' : 'Set Password'}
                  </button>
                </form>
              )}

              {authError && <p style={styles.errorText}>{authError}</p>}

              {/* Sign in / Sign up toggle — only relevant on the credentials step */}
              {authStep === 'credentials' && (
                <div style={styles.toggleModeBlock}>
                  {authMode === 'signin' ? (
                    <p>Don't have an account?{' '}
                      <span style={styles.toggleLink} onClick={() => openModal('signup')}>Sign up here</span>
                    </p>
                  ) : (
                    <p>Already have an account?{' '}
                      <span style={styles.toggleLink} onClick={() => openModal('signin')}>Sign in here</span>
                    </p>
                  )}
                </div>
              )}
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
