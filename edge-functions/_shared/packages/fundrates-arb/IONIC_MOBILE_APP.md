# Ionic Mobile Web App — Funding Rate Arbitrage

> A complete implementation guide for building a standalone Ionic/Capacitor mobile web application that renders the `@jpytrader/fundrates-arb` component behind multi-method authentication (email/password, biometric, OTP).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Project Setup](#2-project-setup)
3. [Directory Structure](#3-directory-structure)
4. [Capacitor Configuration](#4-capacitor-configuration)
5. [Theme & Styling](#5-theme--styling)
6. [Authentication — Multi-Method Login](#6-authentication--multi-method-login)
7. [Auth Guard & Protected Routes](#7-auth-guard--protected-routes)
8. [App Shell & Routing](#8-app-shell--routing)
9. [Dashboard Page](#9-dashboard-page)
10. [Auth Service](#10-auth-service)
11. [Platform Detection & Persistence](#11-platform-detection--persistence)
12. [Build & Deploy](#12-build--deploy)
13. [Environment Variables](#13-environment-variables)
14. [Security Considerations](#14-security-considerations)
15. [Push Notifications](#15-push-notifications)
16. [Offline Support](#16-offline-support)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  Ionic React App                │
│                                                 │
│  ┌───────────┐   ┌──────────────────────────┐   │
│  │ LoginPage │──▶│      AuthGuard           │   │
│  │           │   │  (session gate)           │   │
│  │ • Email   │   └─────────┬────────────────┘   │
│  │ • Biometric│            │ authenticated       │
│  │ • OTP     │            ▼                     │
│  └───────────┘   ┌──────────────────────────┐   │
│                  │    DashboardPage          │   │
│                  │  ┌────────────────────┐   │   │
│                  │  │ <FundingRateArb /> │   │   │
│                  │  │  (built-in config) │   │   │
│                  │  └────────────────────┘   │   │
│                  └──────────────────────────┘   │
│                                                 │
│  Persistence:                                   │
│  • Web → LocalStorageStore                      │
│  • Native → CapacitorFilesystemStore            │
│  Session: @capacitor/preferences (native)       │
│           localStorage (web)                    │
└─────────────────────────────────────────────────┘
```

**Key design decisions:**

- **Single `<FundingRateArb />`** component renders the full arbitrage dashboard including config, charts, positions, and event log. All engine settings (pairs, thresholds, dry-run, yield mode, exchange keys, Discord webhook) are managed via the component's built-in collapsible ConfigPanel — no separate settings modal is needed.
- **Persistence auto-detection** — the app detects whether it's running on a native device (Capacitor) or web browser and selects the appropriate state store automatically.

---

## 2. Project Setup

### 2.1 Create Ionic Project

```bash
# Install Ionic CLI globally
npm install -g @ionic/cli

# Create a blank Ionic React project
ionic start vireson-fra blank --type=react --capacitor

cd vireson-fra
```

### 2.2 Install Dependencies

```bash
# Core Ionic + Capacitor (already included by ionic start)
npm install @ionic/react @ionic/react-router ionicons

# Capacitor core + platforms
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Capacitor plugins
npm install @capacitor/filesystem @capacitor/preferences @capacitor/biometrics

# PWA elements (fallback for web)
npm install @ionic/pwa-elements

# Routing
npm install react-router-dom@^6

# The FRA component (from local workspace or npm)
npm install @jpytrader/fundrates-arb

# Dev dependencies
npm install -D typescript @types/react @types/react-dom @vitejs/plugin-react vite
```

### 2.3 Initialize Capacitor

```bash
npx cap init "Vireson FRA" "app.lovable.f1c921acfffc46f6bc2d4d7d19813908"
```

### 2.4 Scaffold Files

The following files must be created at the project root. Full listings are provided below.

#### `package.json`

```json
{
  "name": "vireson-fra",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "ionic:build": "vite build",
    "ionic:serve": "vite"
  },
  "dependencies": {
    "@capacitor/android": "^6.0.0",
    "@capacitor/biometrics": "^6.0.0",
    "@capacitor/cli": "^6.0.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/filesystem": "^6.0.0",
    "@capacitor/ios": "^6.0.0",
    "@capacitor/preferences": "^6.0.0",
    "@capacitor/push-notifications": "^6.0.0",
    "@ionic/pwa-elements": "^3.3.0",
    "@ionic/react": "^8.0.0",
    "@ionic/react-router": "^8.0.0",
    "@supabase/supabase-js": "^2.84.0",
    "@jpytrader/fundrates-arb": "^0.1.0",
    "ionicons": "^7.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.1"
  }
}
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts", "capacitor.config.ts"]
}
```

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: '::',
    port: 8100,
  },
});
```

#### `ionic.config.json`

```json
{
  "name": "vireson-fra",
  "integrations": {
    "capacitor": {}
  },
  "type": "react",
  "engines": {
    "serve": {
      "command": "vite",
      "args": ["--host", "--port", "8100"]
    },
    "build": {
      "command": "vite build"
    }
  }
}
```

#### `public/index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" content="#3b82f6" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Vireson FRA" />
  <meta name="description" content="Delta-neutral funding rate arbitrage dashboard" />

  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />

  <!-- Icons -->
  <link rel="apple-touch-icon" href="/assets/icon-192.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon-192.png" />

  <title>Vireson FRA</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

#### `public/manifest.json`

```json
{
  "name": "Vireson Funding Rate Arbitrage",
  "short_name": "Vireson FRA",
  "description": "Delta-neutral funding rate arbitrage dashboard for Hyperliquid & OKX",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#111827",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["finance", "utilities"]
}
```

---

## 3. Directory Structure

```
vireson-fra/
├── capacitor.config.ts
├── ionic.config.json
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Root with IonApp + IonReactRouter
│   ├── theme/
│   │   ├── variables.css           # Ionic CSS variables + FRA theme bridge
│   │   └── global.css              # Global overrides
│   ├── auth/
│   │   ├── AuthContext.tsx          # React context for auth state
│   │   ├── AuthGuard.tsx            # Route protection wrapper
│   │   ├── auth-service.ts          # Auth logic (generic REST)
│   │   ├── supabase-auth-service.ts # Auth logic (Supabase variant)
│   │   └── session-store.ts         # Session persistence (Preferences/localStorage)
│   ├── notifications/
│   │   └── push-notifications.ts   # Capacitor push notification setup + FRA event bridge
│   ├── pages/
│   │   ├── LoginPage.tsx            # Multi-method login (email, biometric, OTP)
│   │   └── DashboardPage.tsx        # FRA component + header
│   └── utils/
│       └── platform.ts             # Platform detection helpers
├── android/                         # (after `npx cap add android`)
└── ios/                             # (after `npx cap add ios`)
```

---

## 4. Capacitor Configuration

### `capacitor.config.ts`

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f1c921acfffc46f6bc2d4d7d19813908',
  appName: 'Vireson FRA',
  webDir: 'dist',
  server: {
    // Development: hot-reload from sandbox
    // url: 'https://f1c921ac-fffc-46f6-bc2d-4d7d19813908.lovableproject.com?forceHideBadge=true',
    // cleartext: true,

    // Production: comment out the above and use the built webDir
  },
  plugins: {
    // Biometrics plugin configuration
    BiometricAuth: {
      // No extra config needed — auto-detects Face ID / Touch ID / fingerprint
    },
  },
};

export default config;
```

> **Development tip:** Uncomment the `server.url` block to enable live-reload directly from the Lovable sandbox while developing on a physical device.

---

## 5. Theme & Styling

### `src/theme/variables.css`

This file bridges Ionic's CSS custom properties with the FRA component's `--fra-*` variables.

```css
/* ─── Ionic Core Theme ─── */
:root {
  --ion-color-primary: #3b82f6;
  --ion-color-primary-rgb: 59, 130, 246;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-shade: #2563eb;
  --ion-color-primary-tint: #60a5fa;

  --ion-color-secondary: #8b5cf6;
  --ion-color-secondary-rgb: 139, 92, 246;

  --ion-color-success: #10b981;
  --ion-color-warning: #f59e0b;
  --ion-color-danger: #ef4444;

  --ion-color-dark: #1f2937;
  --ion-color-medium: #6b7280;
  --ion-color-light: #f3f4f6;

  --ion-background-color: #f8f9fa;
  --ion-text-color: #1f2937;
  --ion-toolbar-background: #ffffff;
  --ion-toolbar-color: #1f2937;

  /* ─── FRA Light Theme Bridge ─── */
  --fra-bg: #f8f9fa;
  --fra-card: #ffffff;
  --fra-border: #d1d5db;
  --fra-heading: #1a1a2e;
  --fra-text: #2d3748;
  --fra-muted: #64748b;
  --fra-accent: #2563eb;
  --fra-track: #cbd5e1;
  --fra-thumb: #ffffff;
}

/* ─── Dark Mode ─── */
@media (prefers-color-scheme: dark) {
  :root {
    --ion-background-color: #111827;
    --ion-text-color: #f9fafb;
    --ion-toolbar-background: #1f2937;
    --ion-toolbar-color: #f9fafb;

    --ion-color-dark: #f9fafb;
    --ion-color-light: #374151;

    /* ─── FRA Dark Theme Bridge ─── */
    --fra-bg: #111827;
    --fra-card: #1f2937;
    --fra-border: #374151;
    --fra-heading: #f9fafb;
    --fra-text: #d1d5db;
    --fra-muted: #9ca3af;
    --fra-accent: #3b82f6;
    --fra-track: #374151;
    --fra-thumb: #ffffff;
  }

  ion-card {
    --background: #1f2937;
    --color: #f9fafb;
  }

  ion-item {
    --background: #1f2937;
    --color: #f9fafb;
  }
}
```

### `src/theme/global.css`

```css
/* ─── Global Overrides ─── */

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* FRA component responsive adjustments for mobile */
@media (max-width: 768px) {
  .fra-root {
    font-size: 14px;
  }

  .fra-root [style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
}

/* Ionic safe area handling */
ion-content {
  --padding-top: env(safe-area-inset-top);
  --padding-bottom: env(safe-area-inset-bottom);
}

/* Login card styling */
.login-card {
  max-width: 420px;
  margin: 2rem auto;
  border-radius: 16px;
  overflow: hidden;
}

/* OTP input grid */
.otp-grid {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 1rem 0;
}

.otp-grid ion-input {
  --padding-start: 0;
  --padding-end: 0;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  width: 48px;
  height: 56px;
  --background: var(--ion-color-light);
  border-radius: 8px;
}
```

---

## 6. Authentication — Multi-Method Login

### `src/pages/LoginPage.tsx`

The login page supports three authentication methods via a segmented control:

1. **Email/Password** — standard form
2. **Biometric** — Face ID, Touch ID, or fingerprint via `@capacitor/biometrics`
3. **OTP** — 6-digit one-time passcode

```tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  isPlatform,
} from '@ionic/react';
import { mailOutline, fingerPrintOutline, keypadOutline } from 'ionicons/icons';
import { useAuth } from '../auth/AuthContext';

type AuthMethod = 'email' | 'biometric' | 'otp';

const LoginPage: React.FC = () => {
  const { signIn, signInWithBiometrics, verifyOtp, requestOtp, isLoading, error } = useAuth();

  const [method, setMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);

  const otpRefs = useRef<(HTMLIonInputElement | null)[]>([]);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  // Check biometric availability on mount
  useEffect(() => {
    const checkBiometric = async () => {
      if (isPlatform('capacitor')) {
        try {
          const { BiometricAuth } = await import('@capacitor/biometrics');
          const result = await BiometricAuth.checkBiometry();
          setBiometricAvailable(result.isAvailable);
        } catch {
          setBiometricAvailable(false);
        }
      }
    };
    checkBiometric();
  }, []);

  /* ── Email/Password handler ── */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  /* ── Biometric handler ── */
  const handleBiometricLogin = async () => {
    await signInWithBiometrics();
  };

  /* ── OTP handlers ── */
  const handleRequestOtp = async () => {
    await requestOtp(otpEmail);
    setOtpSent(true);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.setFocus();
    }

    // Auto-submit when all 6 digits entered
    if (newCode.every((d) => d !== '')) {
      verifyOtp(otpEmail, newCode.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.setFocus();
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="5">
              {/* ── Logo / Title ── */}
              <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ion-color-primary)' }}>
                  Vireson
                </h1>
                <p style={{ color: 'var(--ion-color-medium)', fontSize: '0.875rem' }}>
                  Funding Rate Arbitrage
                </p>
              </div>

              {/* ── Method Selector ── */}
              <IonSegment
                value={method}
                onIonChange={(e) => setMethod(e.detail.value as AuthMethod)}
                style={{ marginBottom: '1rem' }}
              >
                <IonSegmentButton value="email">
                  <IonIcon icon={mailOutline} />
                  <IonLabel>Email</IonLabel>
                </IonSegmentButton>

                {biometricAvailable && (
                  <IonSegmentButton value="biometric">
                    <IonIcon icon={fingerPrintOutline} />
                    <IonLabel>Biometric</IonLabel>
                  </IonSegmentButton>
                )}

                <IonSegmentButton value="otp">
                  <IonIcon icon={keypadOutline} />
                  <IonLabel>OTP</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <IonCard className="login-card">
                <IonCardHeader>
                  <IonCardTitle>
                    {method === 'email' && 'Sign In'}
                    {method === 'biometric' && 'Biometric Login'}
                    {method === 'otp' && 'One-Time Passcode'}
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  {/* ── Error Display ── */}
                  {error && (
                    <IonText color="danger">
                      <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
                    </IonText>
                  )}

                  {/* ══════════════ EMAIL / PASSWORD ══════════════ */}
                  {method === 'email' && (
                    <form onSubmit={handleEmailLogin}>
                      <IonItem lines="inset" style={{ marginBottom: '0.75rem' }}>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonInput={(e) => setEmail(e.detail.value ?? '')}
                          placeholder="you@example.com"
                          required
                          autocomplete="email"
                        />
                      </IonItem>

                      <IonItem lines="inset" style={{ marginBottom: '1rem' }}>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput
                          type="password"
                          value={password}
                          onIonInput={(e) => setPassword(e.detail.value ?? '')}
                          placeholder="••••••••"
                          required
                          autocomplete="current-password"
                        />
                      </IonItem>

                      <IonButton
                        expand="block"
                        type="submit"
                        disabled={isLoading || !email || !password}
                        style={{ marginTop: '0.5rem' }}
                      >
                        {isLoading ? <IonSpinner name="crescent" /> : 'Sign In'}
                      </IonButton>
                    </form>
                  )}

                  {/* ══════════════ BIOMETRIC ══════════════ */}
                  {method === 'biometric' && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <IonIcon
                        icon={fingerPrintOutline}
                        style={{ fontSize: '64px', color: 'var(--ion-color-primary)', marginBottom: '1rem' }}
                      />
                      <p style={{ color: 'var(--ion-color-medium)', marginBottom: '1.5rem' }}>
                        Authenticate using Face ID, Touch ID, or your device fingerprint sensor.
                      </p>
                      <IonButton expand="block" onClick={handleBiometricLogin} disabled={isLoading}>
                        {isLoading ? <IonSpinner name="crescent" /> : 'Authenticate'}
                      </IonButton>
                    </div>
                  )}

                  {/* ══════════════ OTP ══════════════ */}
                  {method === 'otp' && (
                    <div>
                      {!otpSent ? (
                        /* Step 1: Enter email to receive OTP */
                        <>
                          <IonItem lines="inset" style={{ marginBottom: '1rem' }}>
                            <IonLabel position="stacked">Email</IonLabel>
                            <IonInput
                              type="email"
                              value={otpEmail}
                              onIonInput={(e) => setOtpEmail(e.detail.value ?? '')}
                              placeholder="you@example.com"
                              required
                            />
                          </IonItem>

                          <IonButton
                            expand="block"
                            onClick={handleRequestOtp}
                            disabled={isLoading || !otpEmail}
                          >
                            {isLoading ? <IonSpinner name="crescent" /> : 'Send Code'}
                          </IonButton>
                        </>
                      ) : (
                        /* Step 2: Enter 6-digit OTP */
                        <>
                          <p style={{
                            color: 'var(--ion-color-medium)',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            marginBottom: '1rem',
                          }}>
                            Enter the 6-digit code sent to <strong>{otpEmail}</strong>
                          </p>

                          <div className="otp-grid">
                            {otpCode.map((digit, i) => (
                              <IonInput
                                key={i}
                                ref={(el) => { otpRefs.current[i] = el; }}
                                type="tel"
                                inputmode="numeric"
                                maxlength={1}
                                value={digit}
                                onIonInput={(e) => handleOtpInput(i, e.detail.value ?? '')}
                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                style={{ textAlign: 'center' }}
                              />
                            ))}
                          </div>

                          <IonButton
                            expand="block"
                            fill="clear"
                            size="small"
                            onClick={() => { setOtpSent(false); setOtpCode(['', '', '', '', '', '']); }}
                            style={{ marginTop: '0.5rem' }}
                          >
                            Use a different email
                          </IonButton>
                        </>
                      )}
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
```

---

## 7. Auth Guard & Protected Routes

### `src/auth/AuthContext.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { isPlatform } from '@ionic/react';
import { getSession, setSession, clearSession } from './session-store';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithBiometrics: () => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setState({ isAuthenticated: true, user: { email: session.email }, isLoading: false, error: null });
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    })();
  }, []);

  const setError = (msg: string) => setState((s) => ({ ...s, error: msg, isLoading: false }));
  const setLoading = () => setState((s) => ({ ...s, isLoading: true, error: null }));

  /* ── Email / Password ── */
  const signIn = useCallback(async (email: string, password: string) => {
    setLoading();
    try {
      // Replace with your auth backend (Supabase, Firebase, custom API)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Invalid credentials');
      }

      const { token } = await res.json();
      await setSession({ email, token });
      setState({ isAuthenticated: true, user: { email }, isLoading: false, error: null });
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
    }
  }, []);

  /* ── Biometric ── */
  const signInWithBiometrics = useCallback(async () => {
    setLoading();
    try {
      if (!isPlatform('capacitor')) {
        throw new Error('Biometric auth requires a native device');
      }

      const { BiometricAuth } = await import('@capacitor/biometrics');

      // Perform biometric authentication
      await BiometricAuth.authenticate({
        reason: 'Authenticate to access your arbitrage dashboard',
        cancelTitle: 'Cancel',
      });

      // Biometric success — restore stored session or create one
      const existing = await getSession();
      if (existing) {
        setState({ isAuthenticated: true, user: { email: existing.email }, isLoading: false, error: null });
      } else {
        throw new Error('No stored session. Please sign in with email first.');
      }
    } catch (err: any) {
      setError(err.message ?? 'Biometric authentication failed');
    }
  }, []);

  /* ── OTP ── */
  const requestOtp = useCallback(async (email: string) => {
    setLoading();
    try {
      const res = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to send OTP');
      setState((s) => ({ ...s, isLoading: false }));
    } catch (err: any) {
      setError(err.message ?? 'Failed to send OTP');
    }
  }, []);

  const verifyOtp = useCallback(async (email: string, code: string) => {
    setLoading();
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Invalid OTP code');
      }

      const { token } = await res.json();
      await setSession({ email, token });
      setState({ isAuthenticated: true, user: { email }, isLoading: false, error: null });
    } catch (err: any) {
      setError(err.message ?? 'OTP verification failed');
    }
  }, []);

  /* ── Sign Out ── */
  const signOut = useCallback(async () => {
    await clearSession();
    setState({ isAuthenticated: false, user: null, isLoading: false, error: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signInWithBiometrics, requestOtp, verifyOtp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### `src/auth/AuthGuard.tsx`

```tsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import { useAuth } from './AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--ion-background-color)',
      }}>
        <IonSpinner name="crescent" style={{ width: 48, height: 48 }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
```

### `src/auth/session-store.ts`

```typescript
import { isPlatform } from '@ionic/react';

interface SessionData {
  email: string;
  token: string;
}

const SESSION_KEY = 'fra-auth-session';

/**
 * Persist session using Capacitor Preferences (native) or localStorage (web).
 */
export async function setSession(data: SessionData): Promise<void> {
  const json = JSON.stringify(data);

  if (isPlatform('capacitor')) {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key: SESSION_KEY, value: json });
  } else {
    localStorage.setItem(SESSION_KEY, json);
  }
}

export async function getSession(): Promise<SessionData | null> {
  try {
    if (isPlatform('capacitor')) {
      const { Preferences } = await import('@capacitor/preferences');
      const { value } = await Preferences.get({ key: SESSION_KEY });
      return value ? JSON.parse(value) : null;
    } else {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    }
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  if (isPlatform('capacitor')) {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.remove({ key: SESSION_KEY });
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}
```

---

## 8. App Shell & Routing

### `src/main.tsx`

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/variables.css';
import './theme/global.css';

/* PWA elements (camera, toast, etc. on web) */
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/App.tsx`

```tsx
import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AuthGuard from './auth/AuthGuard';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

setupIonicReact({
  mode: 'ios', // consistent iOS-style UI on all platforms; change to 'md' for Material Design
});

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Public route */}
          <Route exact path="/login" component={LoginPage} />

          {/* Protected route */}
          <Route exact path="/dashboard">
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          </Route>

          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
```

---

## 9. Dashboard Page

### `src/pages/DashboardPage.tsx`

The dashboard renders the `<FundingRateArb />` component inside an Ionic shell. All engine configuration is handled by the component's built-in ConfigPanel — the shell only provides the sign-out button.

```tsx
import React, { useMemo } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  isPlatform,
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { FundingRateArb, CapacitorFilesystemStore, LocalStorageStore } from '@jpytrader/fundrates-arb';
import { useAuth } from '../auth/AuthContext';

const DashboardPage: React.FC = () => {
  const { signOut, isAuthenticated } = useAuth();

  // Select persistence backend based on platform
  const stateStore = useMemo(() => {
    if (isPlatform('capacitor')) {
      return new CapacitorFilesystemStore();
    }
    return new LocalStorageStore();
  }, []);

  // Detect system theme preference
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Funding Rate Arb</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={signOut} title="Sign Out">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Funding Rate Arb</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* ── FRA component renders its own collapsible config panel ── */}
        {/* All engine settings (pairs, thresholds, dry-run, yield mode, */}
        {/* exchange keys, Discord webhook) are managed inside the        */}
        {/* component's built-in ConfigPanel — no separate settings modal */}
        {/* is needed. The gear icon in the FRA header toggles it.        */}
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12">
              <FundingRateArb
                theme={theme}
                stateStore={stateStore}
                onExecution={(event) => {
                  console.log('[FRA]', event.type, event);
                }}
                onError={(err) => {
                  console.error('[FRA Error]', err);
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
```

---

## 10. Auth Service

### 10.1 Generic Auth Service (`src/auth/auth-service.ts`)

This module extracts all `fetch`-based auth logic from `AuthContext.tsx` into a standalone service. Swap this file for `supabase-auth-service.ts` (§10.2) if using Supabase.

```typescript
// src/auth/auth-service.ts

const API_URL = import.meta.env.VITE_API_URL || '';

interface AuthResult {
  email: string;
  token: string;
}

/**
 * Email/password login against a custom REST backend.
 * Expects: POST /api/auth/login { email, password } → { token }
 */
export async function loginWithEmail(email: string, password: string): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Login failed (${res.status})`);
  }

  const { token } = await res.json();
  return { email, token };
}

/**
 * Request a 6-digit OTP to be sent to the given email.
 * Expects: POST /api/auth/otp/request { email } → 200
 */
export async function requestOtp(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/otp/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error('Failed to send OTP');
}

/**
 * Verify a 6-digit OTP code.
 * Expects: POST /api/auth/otp/verify { email, code } → { token }
 */
export async function verifyOtp(email: string, code: string): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Invalid OTP code');
  }

  const { token } = await res.json();
  return { email, token };
}

/**
 * Invalidate the current session server-side (optional).
 * Expects: POST /api/auth/logout → 200
 */
export async function logout(token: string): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Best-effort — session is cleared client-side regardless
  }
}
```

**Updated `AuthContext.tsx` usage** — replace the inline `fetch` calls with service imports:

```tsx
// In AuthContext.tsx — replace the signIn callback body:
import * as authService from './auth-service';

const signIn = useCallback(async (email: string, password: string) => {
  setLoading();
  try {
    const result = await authService.loginWithEmail(email, password);
    await setSession(result);
    setState({ isAuthenticated: true, user: { email: result.email }, isLoading: false, error: null });
  } catch (err: any) {
    setError(err.message ?? 'Login failed');
  }
}, []);

// Similarly for requestOtp and verifyOtp:
const requestOtp = useCallback(async (email: string) => {
  setLoading();
  try {
    await authService.requestOtp(email);
    setState((s) => ({ ...s, isLoading: false }));
  } catch (err: any) {
    setError(err.message ?? 'Failed to send OTP');
  }
}, []);

const verifyOtp = useCallback(async (email: string, code: string) => {
  setLoading();
  try {
    const result = await authService.verifyOtp(email, code);
    await setSession(result);
    setState({ isAuthenticated: true, user: { email: result.email }, isLoading: false, error: null });
  } catch (err: any) {
    setError(err.message ?? 'OTP verification failed');
  }
}, []);
```

### 10.2 Supabase Auth Variant — use the `supabase-saas` package

When deploying as a SaaS, **do not hand-roll a Supabase auth service**. Instead, consume
the production-ready wrapper that lives in the sibling `supabase-saas/` folder. It
bundles auth tracking, realtime engine state, the `SupabaseStateStore` persistence
adapter, AND the **mandatory Stripe subscription gate** (Stripe Sync Engine based).

#### What the package provides

| Export | Purpose |
|---|---|
| `useSupabaseFra(supabase)` | Hook returning `{ store, userId, revision, subscription }`. `store` is `null` until the user is signed in **and** has an active/trialing subscription. |
| `<SubscriptionGate priceId>` | Mandatory wrapper. Renders a sign-in prompt, a loader, or a Stripe Checkout CTA until the gate unlocks. |
| `useSubscription(supabase, userId)` | Lower-level hook: `{ status, isActive, loading, redirectToCheckout, openPortal }`, kept fresh by realtime on `public.subscriptions`. |
| `SupabaseStateStore` | `PersistenceStore` adapter writing to `fra_state` (handed to `<FundingRateArb persistenceStore={…} />`). |

#### Setup (one-time)

1. **Backend**: follow `supabase-saas/docs/BILLING.md` to install the Stripe Sync
   Engine, apply `migrations/0002_subscriptions.sql`, deploy `create-checkout` and
   `create-portal-session` (both with `--no-verify-jwt` — they auth manually via
   `supabase.auth.getUser(token)`), and create a recurring Stripe Price.
2. **Env** (`.env`):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   VITE_STRIPE_PRICE_ID=price_REPLACE_WITH_RECURRING_ID
   ```

#### Wiring inside the Ionic app

Replace `auth-service.ts` + `AuthGuard.tsx` for the FRA route with the gated hook.
The Ionic shell still owns app-wide navigation and the email/password screens
(via `supabase.auth.signInWithPassword` etc.), but the **dashboard tab** delegates
gating to `<SubscriptionGate />`:

```typescript
// src/pages/ArbDashboard.tsx
import { createClient } from '@supabase/supabase-js';
import { FundingRateArb } from '@jpytrader/fundrates-arb';
import { useSupabaseFra, SubscriptionGate } from '@vireson/supabase-saas';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export function ArbDashboard() {
  const { store, userId, revision, subscription } = useSupabaseFra(supabase);

  return (
    <SubscriptionGate
      supabase={supabase}
      userId={userId}
      priceId={import.meta.env.VITE_STRIPE_PRICE_ID}
    >
      {store && (
        <>
          <FundingRateArb
            key={revision}
            theme="dark"
            persistenceStore={store}
            defaultConfig={{ dryRun: true }}
          />
          <IonButton fill="clear" onClick={() => subscription.openPortal()}>
            Manage subscription
          </IonButton>
        </>
      )}
    </SubscriptionGate>
  );
}
```

#### Gate flow (mandatory)

```
useSupabaseFra
  ├─ tracks supabase.auth session
  ├─ calls useSubscription internally
  └─ returns store=null until subscription.isActive === true

<SubscriptionGate>
  ├─ no session     → "Please sign in"
  ├─ loading sub    → spinner
  ├─ no active sub  → CTA + auto-redirect to Stripe Checkout
  └─ active/trial   → renders <FundingRateArb />
```

When Stripe Checkout completes, the Sync Engine writes to `stripe.subscriptions`,
the `sync_stripe_to_public()` trigger mirrors the row into `public.subscriptions`,
and Supabase Realtime pushes the change to the device — the gate unlocks within ~1s
without a page reload (works identically on iOS/Android via Capacitor).

#### Mobile-specific notes

- **Deep links**: register `success_url`/`cancel_url` in `create-checkout` to point
  at your custom scheme (e.g. `fra://billing/success`) and add the matching
  `CFBundleURLSchemes` (iOS) / `intent-filter` (Android) entries so Stripe Checkout
  returns the user back into the app.
- **Customer Portal**: `subscription.openPortal()` returns a Stripe-hosted URL —
  open it via `@capacitor/browser` so cancellation happens in an in-app browser.
- **Offline**: while offline, the gate caches the last `isActive` value via the
  Preferences-backed session, but realtime updates resume on reconnect.

---

## 11. Platform Detection & Persistence

### `src/utils/platform.ts`

```typescript
import { isPlatform } from '@ionic/react';

export type RuntimePlatform = 'ios' | 'android' | 'web';

export function getRuntimePlatform(): RuntimePlatform {
  if (isPlatform('ios')) return 'ios';
  if (isPlatform('android')) return 'android';
  return 'web';
}

export function isNative(): boolean {
  return isPlatform('capacitor');
}

/**
 * Returns the appropriate FRA state store based on the runtime platform.
 *
 * Usage:
 * ```tsx
 * import { createStateStore } from '../utils/platform';
 * const store = createStateStore();
 * <FundingRateArb stateStore={store} />
 * ```
 */
export async function createStateStore() {
  if (isNative()) {
    const { CapacitorFilesystemStore } = await import(
      '@jpytrader/fundrates-arb/persistence/capacitor-filesystem-store'
    );
    return new CapacitorFilesystemStore();
  }

  const { LocalStorageStore } = await import('@jpytrader/fundrates-arb');
  return new LocalStorageStore();
}
```

---

## 12. Build & Deploy

### 12.1 Web / PWA Build

```bash
# Build the Vite/React project
npm run build

# Preview locally
npm run preview
```

The built app in `dist/` is a fully functional PWA when served over HTTPS. Users can install it via the browser's "Add to Home Screen" prompt.

### 12.2 Add Native Platforms

```bash
# Add iOS and Android
npx cap add ios
npx cap add android

# Sync web assets to native projects
npx cap sync
```

### 12.3 Run on Device / Emulator

```bash
# iOS (requires Mac with Xcode)
npx cap run ios

# Android (requires Android Studio)
npx cap run android
```

### 12.4 Development Workflow

1. **Export to GitHub** via Lovable's "Export to GitHub" button.
2. Clone and run locally:
   ```bash
   git clone <your-repo>
   cd vireson-fra
   npm install
   npx cap add ios    # or android
   npm run build
   npx cap sync
   npx cap run ios    # or android
   ```
3. For hot-reload during development, uncomment the `server.url` block in `capacitor.config.ts` pointing to the Lovable sandbox URL.

### 12.5 Production Checklist

| Item | Action |
|------|--------|
| Remove `server.url` from `capacitor.config.ts` | ✅ |
| Set proper app icons in `android/` and `ios/` | Generate from `icon-512.png` |
| Configure signing for iOS (provisioning profile) | Xcode → Signing & Capabilities |
| Configure signing for Android (keystore) | `android/app/build.gradle` |
| Enable HTTPS for PWA | Required for service worker |
| Set `Content-Security-Policy` headers | Restrict to your API domain |

---

## 13. Environment Variables

Create a `.env` file in the project root:

```bash
# Backend auth API (if using custom backend)
VITE_API_URL=https://your-api.example.com

# Supabase (if using Supabase auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...

# App metadata
VITE_APP_NAME=Vireson FRA
```

Access in code via `import.meta.env.VITE_*`.

---

## 14. Security Considerations

### Authentication

| Concern | Mitigation |
|---------|------------|
| Token storage | Use `@capacitor/preferences` (encrypted on iOS Keychain, Android EncryptedSharedPreferences) instead of plain localStorage on native |
| Biometric as sole auth | Biometric only unlocks a previously established session — never bypasses initial email/password login |
| OTP brute force | Backend must enforce rate limiting (max 5 attempts per 10 minutes) and OTP expiry (5 minutes) |
| Session expiry | Check token validity on app resume (`App.addListener('appStateChange')`) and redirect to login if expired |

### Exchange Keys

The `<FundingRateArb />` component manages exchange API keys internally via its `KeysPanel`. Keys are stored in the persistence layer (localStorage on web, Capacitor Filesystem on native). For production:

- **Web (single-tenant)**: Keys are in localStorage — acceptable for dry-run; for live trading, implement server-side key vault.
- **Native (single-tenant)**: Keys are written to the app's sandboxed Documents directory — not accessible by other apps, but not encrypted at rest. Consider wrapping with `@capacitor/secure-storage` for production live-trading deployments.
- **SaaS (multi-tenant via `@vireson/supabase-saas`)**: The client passes `exchangeKeys={{}}` and runs in dry-run on the device. Real keys live exclusively in **Supabase Vault** keyed by `auth.uid()` (e.g. `fra_hyperliquid_key_<userId>`) and are decrypted server-side by the `fra-engine` edge function — they **never** reach the browser or device. See the [SaaS user/key isolation model](#saas-user--key-isolation-model) below.

### Network

- All API calls to exchanges use HTTPS.
- WebSocket connections use WSS.
- The app does not proxy exchange traffic through your backend — connections are direct from the client to Hyperliquid/OKX APIs.

### SaaS user & key isolation model

When the app is deployed via `@vireson/supabase-saas`, every layer of the stack is partitioned by `auth.uid()` so one user's keys, state, P&L and component instance can never leak into another user's session.

| Layer | Mechanism | Effect |
|---|---|---|
| **React component** | `<FundingRateArb persistenceStore={store} />` is mounted **inside** `<SubscriptionGate>` and only when `useSupabaseFra()` returns a non-`null` `store` (auth + active sub). Each browser tab / device instantiates its own store bound to the signed-in `userId`. | Component instance is per-session, not shared. Sign-out unmounts it; sign-in remounts a fresh one. |
| **Persisted state** | `SupabaseStateStore` writes/reads `public.fra_state` rows. RLS policies on `0001_init.sql` allow `SELECT/INSERT/UPDATE/DELETE` only `WHERE auth.uid() = user_id`. | A user can only ever read or mutate their own JSONB state blob. The Supabase JS client uses the user's JWT, so RLS is enforced server-side regardless of client behaviour. |
| **Realtime** | The hook subscribes to `postgres_changes` filtered by `user_id=eq.${userId}`, and Supabase Realtime additionally re-applies RLS to every change event. | Other tenants' state writes are not delivered to this client at all. |
| **Subscription gate** | `public.subscriptions` is RLS-scoped (`auth.uid() = user_id`); `useSubscription()` queries by `user_id` and listens to filtered realtime events. | One user cannot see or unlock the gate using another user's subscription row. |
| **Exchange API keys** | Stored in **Supabase Vault** under user-scoped names (e.g. `fra_hyperliquid_key_<uuid>`). The client passes `exchangeKeys={{}}` and runs dry-run; the `fra-engine` edge function decrypts the relevant Vault entry **per-tenant** during its tick using the service role. | Keys never leave the server. Even a fully compromised client device exposes only its own dry-run state, never live keys for any user. |
| **Server-side engine tick** | `fra-engine` iterates rows where `is_running = true`, processes each `user_id` independently, and writes back via service role. The function never accepts a `user_id` from the request body — it derives ownership from the row it loaded. | Server-side liveness (funding accrual, exit checks) is per-tenant and cannot be hijacked by request payloads. |
| **Edge function auth** | `create-checkout` and `create-portal-session` validate the `Authorization: Bearer <jwt>` header via `supabase.auth.getUser(token)` and use the resolved `user.id` as the **only** identity source — request bodies cannot specify a different user. | Stripe Checkout sessions and Customer Portal links are bound to the authenticated user. Stripe metadata `supabase_user_id` is set server-side, not by the client. |

> **Net result:** a single deployment of the FRA component services many tenants concurrently, where each user sees only their own positions, P&L history, events, exchange keys, and subscription status, with isolation enforced at four independent layers (RLS, Realtime filters, Vault scoping, and edge-function JWT validation).

---

## 15. Push Notifications

Native push notifications for funding rate opportunities, position events, and margin warnings via `@capacitor/push-notifications`.

### 15.1 Installation

```bash
npm install @capacitor/push-notifications
npx cap sync
```

### 15.2 iOS Configuration

Add the Push Notifications capability in Xcode:

1. Open `ios/App/App.xcworkspace` in Xcode.
2. Select the **App** target → **Signing & Capabilities** → **+ Capability** → **Push Notifications**.
3. Create an APNs key in [Apple Developer Console](https://developer.apple.com/account/resources/authkeys/list) and upload it to your push notification service (e.g., Firebase Cloud Messaging or your own backend).

### 15.3 Android Configuration

Add Firebase Cloud Messaging:

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Download `google-services.json` and place it in `android/app/`.
3. The Capacitor plugin auto-registers the service — no `AndroidManifest.xml` changes needed.

### 15.4 Push Notification Service (`src/notifications/push-notifications.ts`)

This module initializes push notifications, handles registration, and bridges FRA `ExecutionEvent`s to local notifications.

```typescript
// src/notifications/push-notifications.ts
import { isPlatform } from '@ionic/react';
import type { ExecutionEvent } from '@jpytrader/fundrates-arb';

/**
 * Initialize push notification registration and listeners.
 * Call once at app startup (e.g., in App.tsx useEffect).
 *
 * Returns a cleanup function to remove listeners.
 */
export async function initPushNotifications(): Promise<() => void> {
  if (!isPlatform('capacitor')) {
    console.log('[Push] Skipping — not running on native device');
    return () => {};
  }

  const { PushNotifications } = await import('@capacitor/push-notifications');

  // Request permission
  const permResult = await PushNotifications.requestPermissions();
  if (permResult.receive !== 'granted') {
    console.warn('[Push] Permission denied');
    return () => {};
  }

  // Register with APNs / FCM
  await PushNotifications.register();

  // Listen for registration token
  const regListener = await PushNotifications.addListener('registration', (token) => {
    console.log('[Push] Device token:', token.value);
    // TODO: Send token.value to your backend for server-initiated pushes
    // e.g., fetch('/api/push/register', { method: 'POST', body: JSON.stringify({ token: token.value }) })
  });

  // Listen for registration errors
  const regErrorListener = await PushNotifications.addListener('registrationError', (err) => {
    console.error('[Push] Registration error:', err.error);
  });

  // Listen for received notifications (foreground)
  const receivedListener = await PushNotifications.addListener(
    'pushNotificationReceived',
    (notification) => {
      console.log('[Push] Received in foreground:', notification);
      // Optionally show an in-app toast or Ionic alert
    }
  );

  // Listen for notification tap (background → foreground)
  const actionListener = await PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (action) => {
      console.log('[Push] Notification tapped:', action.notification);
      // Navigate to relevant page based on action.notification.data
      const eventType = action.notification.data?.eventType;
      if (eventType === 'position_opened' || eventType === 'position_closed') {
        window.location.hash = '#/dashboard';
      }
    }
  );

  // Cleanup function
  return () => {
    regListener.remove();
    regErrorListener.remove();
    receivedListener.remove();
    actionListener.remove();
  };
}

/**
 * Map of FRA ExecutionEvent types to human-readable notification content.
 */
const EVENT_NOTIFICATION_MAP: Record<string, { title: string; bodyFn: (data: Record<string, unknown>) => string }> = {
  position_opened: {
    title: '🟢 Position Opened',
    bodyFn: (d) => `${d.pair} — $${Number(d.sizeUsd ?? 0).toLocaleString()} on ${d.exchange}`,
  },
  position_closed: {
    title: '🔴 Position Closed',
    bodyFn: (d) => `${d.pair} — P&L: $${Number(d.realizedPnl ?? 0).toFixed(2)}`,
  },
  funding_collected: {
    title: '💰 Funding Collected',
    bodyFn: (d) => `${d.pair} — +$${Number(d.amount ?? 0).toFixed(4)}`,
  },
  margin_warning: {
    title: '⚠️ Margin Warning',
    bodyFn: (d) => `${d.pair} health at ${Number(d.marginHealthPct ?? 0).toFixed(1)}%`,
  },
  error: {
    title: '❌ Engine Error',
    bodyFn: (d) => `${d.message ?? 'Unknown error'}`,
  },
  rebalance: {
    title: '🔄 Position Rebalanced',
    bodyFn: (d) => `${d.pair} rebalanced on ${d.exchange}`,
  },
  reconciliation_drift: {
    title: '⚠️ Position Drift Detected',
    bodyFn: (d) => `${d.pair} — internal vs exchange size mismatch`,
  },
};

/**
 * Send a local push notification for an FRA ExecutionEvent.
 * Call this from the DashboardPage's `onExecution` callback.
 *
 * Only fires on native devices. On web, this is a no-op
 * (the FRA component's Discord webhook handles web notifications).
 */
export async function notifyForEvent(event: ExecutionEvent): Promise<void> {
  if (!isPlatform('capacitor')) return;

  const mapping = EVENT_NOTIFICATION_MAP[event.type];
  if (!mapping) return; // Not a notifiable event (e.g., scan_heartbeat, scan_noop)

  const { LocalNotifications } = await import('@capacitor/local-notifications');

  await LocalNotifications.schedule({
    notifications: [
      {
        id: Date.now(),
        title: mapping.title,
        body: mapping.bodyFn(event.data),
        schedule: { at: new Date() },
        extra: {
          eventType: event.type,
          ...event.data,
        },
      },
    ],
  });
}
```

> **Note:** `notifyForEvent` uses `@capacitor/local-notifications` to show alerts when the app is in the foreground or background. For server-initiated pushes (e.g., when the app is killed), implement a backend push service that sends FCM/APNs messages using the device token from the `registration` listener.

### 15.5 Install Local Notifications Plugin

```bash
npm install @capacitor/local-notifications
npx cap sync
```

### 15.6 Integration with DashboardPage

Update `DashboardPage.tsx` to initialize push notifications and bridge FRA events:

```tsx
// Add to DashboardPage.tsx imports:
import { useEffect } from 'react';
import { initPushNotifications, notifyForEvent } from '../notifications/push-notifications';

// Inside the DashboardPage component, add:
useEffect(() => {
  let cleanup: (() => void) | undefined;

  initPushNotifications().then((fn) => {
    cleanup = fn;
  });

  return () => {
    cleanup?.();
  };
}, []);

// Update the FundingRateArb onExecution callback:
<FundingRateArb
  theme={theme}
  persistenceStore={stateStore}
  defaultConfig={{ dryRun }}
  onExecution={(event) => {
    console.log('[FRA]', event.type, event);
    // Bridge to native push notifications
    notifyForEvent(event);
  }}
  onError={(err) => {
    console.error('[FRA Error]', err);
  }}
/>
```

### 15.7 Notification Behavior Summary

| Event Type | Native Push | Discord Webhook | Notes |
|---|---|---|---|
| `position_opened` | ✅ 🟢 | ✅ Green embed | Both channels fire independently |
| `position_closed` | ✅ 🔴 | ✅ Red embed | Includes realized P&L |
| `funding_collected` | ✅ 💰 | ❌ | High frequency — Discord skips these |
| `margin_warning` | ✅ ⚠️ | ✅ Red embed | Informational — no auto-exit |
| `rebalance` | ✅ 🔄 | ❌ | |
| `reconciliation_drift` | ✅ ⚠️ | ❌ | Informational drift alert |
| `error` | ✅ ❌ | ✅ Red embed | Critical errors |
| `scan_heartbeat` | ❌ | ❌ | Too frequent, suppressed |
| `scan_noop` | ❌ | ❌ | No action taken, suppressed |
| `pnl_snapshot` | ❌ | ✅ Blue embed (daily) | 24h summary via Discord only |

---

## Quick Start Summary

```bash
# 1. Create project
ionic start vireson-fra blank --type=react --capacitor
cd vireson-fra

# 2. Install deps
npm install @capacitor/filesystem @capacitor/preferences @capacitor/biometrics \
  @capacitor/push-notifications @capacitor/local-notifications \
  @ionic/pwa-elements @jpytrader/fundrates-arb

# 3. Copy the files from this guide into src/

# 4. Build & run
npm run build
npx cap sync
npx cap run ios   # or android
```

---

## 16. Offline Support

The mobile app should gracefully handle intermittent connectivity — queueing user actions while offline, resuming when back online, and caching critical data for read-only access.

### 16.1 Dependencies

```bash
npm install @capacitor/network
npx cap sync
```

### 16.2 Network Status Detection

Create `src/services/network-status.ts`:

```typescript
import { Network, ConnectionStatus } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

type NetworkListener = (online: boolean) => void;

class NetworkStatusService {
  private listeners = new Set<NetworkListener>();
  private _online = true;
  private initialized = false;

  get online(): boolean {
    return this._online;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    if (Capacitor.isNativePlatform()) {
      const status = await Network.getStatus();
      this._online = status.connected;

      Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
        this._online = status.connected;
        this.listeners.forEach((fn) => fn(this._online));
      });
    } else {
      // Web fallback
      this._online = navigator.onLine;
      window.addEventListener('online', () => this.setOnline(true));
      window.addEventListener('offline', () => this.setOnline(false));
    }
  }

  private setOnline(value: boolean): void {
    this._online = value;
    this.listeners.forEach((fn) => fn(value));
  }

  subscribe(fn: NetworkListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const networkStatus = new NetworkStatusService();
```

### 16.3 React Hook

Create `src/hooks/useNetworkStatus.ts`:

```typescript
import { useState, useEffect } from 'react';
import { networkStatus } from '../services/network-status';

export function useNetworkStatus() {
  const [online, setOnline] = useState(networkStatus.online);

  useEffect(() => {
    networkStatus.init();
    return networkStatus.subscribe(setOnline);
  }, []);

  return online;
}
```

Usage in components:

```tsx
import { useNetworkStatus } from '../hooks/useNetworkStatus';

function StatusBanner() {
  const online = useNetworkStatus();

  if (online) return null;

  return (
    <div style={{
      background: 'var(--fra-danger)',
      color: '#fff',
      padding: '4px 12px',
      fontSize: 11,
      textAlign: 'center',
    }}>
      Offline — actions will be queued and sent when reconnected
    </div>
  );
}
```

### 16.4 Offline Action Queue

Create `src/services/offline-queue.ts`:

```typescript
import { Preferences } from '@capacitor/preferences';
import { networkStatus } from './network-status';

const QUEUE_KEY = 'fra-offline-queue';

export interface QueuedAction {
  id: string;
  type: 'close_position' | 'update_config' | 'rebalance';
  payload: unknown;
  createdAt: number;
  retries: number;
}

type ActionExecutor = (action: QueuedAction) => Promise<void>;

class OfflineQueue {
  private queue: QueuedAction[] = [];
  private executor: ActionExecutor | null = null;
  private processing = false;

  /** Register callback that actually performs the action */
  setExecutor(fn: ActionExecutor): void {
    this.executor = fn;
  }

  async init(): Promise<void> {
    const { value } = await Preferences.get({ key: QUEUE_KEY });
    this.queue = value ? JSON.parse(value) : [];

    // Flush when connectivity returns
    networkStatus.subscribe((online) => {
      if (online) this.flush();
    });
  }

  /** Enqueue an action. If online, execute immediately; else persist. */
  async enqueue(action: Omit<QueuedAction, 'id' | 'createdAt' | 'retries'>): Promise<void> {
    const full: QueuedAction = {
      ...action,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      retries: 0,
    };

    if (networkStatus.online && this.executor) {
      try {
        await this.executor(full);
        return; // Success — no need to queue
      } catch {
        // Fall through to queue
      }
    }

    this.queue.push(full);
    await this.persist();
  }

  /** Process all queued actions in FIFO order */
  async flush(): Promise<void> {
    if (this.processing || !this.executor || this.queue.length === 0) return;
    this.processing = true;

    const failed: QueuedAction[] = [];

    while (this.queue.length > 0) {
      const action = this.queue.shift()!;
      try {
        await this.executor(action);
      } catch {
        action.retries += 1;
        if (action.retries < 5) {
          failed.push(action);
        }
        // Actions with 5+ retries are silently dropped
      }
    }

    this.queue = failed;
    await this.persist();
    this.processing = false;
  }

  /** Number of pending actions (for UI badge) */
  get pendingCount(): number {
    return this.queue.length;
  }

  private async persist(): Promise<void> {
    await Preferences.set({
      key: QUEUE_KEY,
      value: JSON.stringify(this.queue),
    });
  }
}

export const offlineQueue = new OfflineQueue();
```

### 16.5 Integrating the Queue with the Engine

Wire the queue executor to the arb engine in `DashboardPage.tsx`:

```tsx
import { useEffect } from 'react';
import { offlineQueue } from '../services/offline-queue';
import { networkStatus } from '../services/network-status';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

// Inside DashboardPage component:
const online = useNetworkStatus();

useEffect(() => {
  networkStatus.init();
  offlineQueue.init();

  offlineQueue.setExecutor(async (action) => {
    switch (action.type) {
      case 'close_position':
        // Forward to engine
        await engineRef.current?.closePosition(action.payload as string);
        break;
      case 'update_config':
        engineRef.current?.updateConfig(action.payload as Partial<ArbConfig>);
        break;
      case 'rebalance':
        await engineRef.current?.rebalance();
        break;
    }
  });
}, []);

// Example: queue-aware close
const handleClosePosition = (positionId: string) => {
  offlineQueue.enqueue({ type: 'close_position', payload: positionId });
};
```

### 16.6 Service Worker Configuration (PWA)

For web/PWA deployments, configure Workbox caching in `vite.config.ts`:

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            // Cache exchange API responses for 5 minutes
            urlPattern: /^https:\/\/api\.(hyperliquid|okx)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'exchange-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
            },
          },
          {
            // Cache funding rate snapshots for offline chart viewing
            urlPattern: /\/api\/funding-rates/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'funding-rates-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 3600 },
            },
          },
          {
            // App shell & static assets — cache first
            urlPattern: /\.(js|css|woff2?|png|svg|jpg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 30 },
            },
          },
        ],
      },
      manifest: {
        name: 'Funding Rate Arbitrage',
        short_name: 'FRA',
        theme_color: '#0d1117',
        background_color: '#0d1117',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
```

### 16.7 Offline-Aware UI Patterns

Key patterns for a smooth offline experience:

| Scenario | Behaviour |
|---|---|
| **View positions** | Served from persisted `LocalStorageStore` / `CapacitorFilesystemStore` — always available |
| **View funding rates** | Last-fetched rates remain visible; stale indicator shown |
| **Close position** | Queued via `offlineQueue`; UI shows "pending" badge |
| **Update config** | Applied locally immediately; synced on reconnect |
| **PnL chart** | Rendered from persisted `pnlHistory` snapshots |
| **Engine start/stop** | Queued; engine resumes from persisted `isRunning` state on reconnect |

---

## 17. Headless Background Tick (F1 — `ArbEngine` + `manualTick`)

The package now exports `ArbEngine` (the same class that powers
`<FundingRateArb />`) so non-React hosts — Capacitor `BackgroundRunner`,
Node/Deno cron, integration tests — can drive ticks without mounting any
UI. **No host backend is introduced**: the engine still talks directly to
the exchange and persists to a `StateStore` on the device.

### 17.1 New surface

| Export | Purpose |
|---|---|
| `ArbEngine` | The engine class (was internal). Construct it the same way the React hook does. |
| `new ArbEngine(config, adapter, store, { manualTick: true })` | F1 opt-out flag: `start()` restores state and emits `phase: 'scanning'` but does **not** create the internal `setInterval`. The caller drives ticks. |
| `engine.tick()` | One scan/exec/accrual cycle. Renamed promotion of the previously-private `scan()`; identical semantics. |
| `createHyperliquidAdapter` / `createOKXAdapter` (and their `createDryRun*` variants) | Already shipped — re-exported from the barrel for convenience. |

UI consumers (`<FundingRateArb />`, `useArbEngine`) keep using the
internal timer path — nothing changes for them.

### 17.2 Capacitor `BackgroundRunner` example

```ts
// background.ts — registered as a Capacitor BackgroundRunner task.
import {
  ArbEngine,
  CapacitorFilesystemStore,
  createHyperliquidAdapter,
  DEFAULT_CONFIG,
} from '@jpytrader/fundrates-arb';

export const tick = async () => {
  const store = new CapacitorFilesystemStore();
  const persisted = await store.load();
  const config = { ...DEFAULT_CONFIG, ...(persisted?.config ?? {}) };

  const adapter = createHyperliquidAdapter(
    {
      apiKey: process.env.HL_API_KEY!,
      apiSecret: process.env.HL_API_SECRET!,
      walletPrivateKey: process.env.HL_WALLET_PRIVATE_KEY!,
    },
    config,
  );

  const engine = new ArbEngine(config, adapter, store, { manualTick: true });
  await engine.start();   // restore from CapacitorFilesystemStore, no timer
  await engine.tick();    // one cycle: scan → accrue → exit checks → entries
  engine.teardown();      // release any timers (defensive)
};
```

Schedule it from the host app:

```ts
import { BackgroundRunner } from '@capacitor/background-runner';

await BackgroundRunner.schedule({
  label: 'fra-tick',
  src: 'background.ts',
  event: 'tick',
  repeat: true,
  interval: 15, // minutes — matches iOS/Android background limits
});
```

### 17.3 Why this matters for the multi-tenant deployment

The same `ArbEngine` class is consumed by the SaaS edge function
`supabase-saas/edge-functions/fra-engine` (also `manualTick: true`). There
is exactly one engine implementation across browser, Capacitor background
task, and Supabase Edge — eliminating the drift risk of a separate
"server accrual" stub.

> **Reference**: For more details on Capacitor mobile development with Lovable, see the [Lovable Mobile Development Guide](https://docs.lovable.dev/tips-tricks/mobile-development).

