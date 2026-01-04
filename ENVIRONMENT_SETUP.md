# 🔐 BenchBarrier Environment Configuration Guide

## Overview

This guide explains how to configure environment variables for BenchBarrier across different deployment environments.

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Vercel Production Setup](#vercel-production-setup)
3. [Netlify Backup Setup](#netlify-backup-setup)
4. [Required Services](#required-services)
5. [Security Best Practices](#security-best-practices)

---

## 🏠 Local Development Setup

### Step 1: Copy Environment Template

```bash
cp .env.example .env.local
```

### Step 2: Fill in Required Variables

Open `.env.local` and add your development credentials:

```env
# Minimum required for local development
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ENVIRONMENT=development
VITE_APP_URL=http://localhost:5173
```

### Step 3: Start Development Server

```bash
npm install
npm run dev
```

---

## ☁️ Vercel Production Setup

### Method 1: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/alawein-team/benchbarrier/settings/environment-variables)
2. Navigate to: **Settings → Environment Variables**
3. Add each variable with appropriate scope:

#### Production Environment Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Production |
| `VITE_SUPABASE_ANON_KEY` | `your-production-anon-key` | Production |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_your_key` | Production |
| `VITE_SENTRY_DSN` | `https://your-dsn@sentry.io/id` | Production |
| `VITE_PLAUSIBLE_DOMAIN` | `benchbarrier.vercel.app` | Production |
| `VITE_ENVIRONMENT` | `production` | Production |
| `VITE_APP_URL` | `https://benchbarrier.vercel.app` | Production |
| `VITE_ENABLE_ANALYTICS` | `true` | Production |
| `VITE_ENABLE_ERROR_TRACKING` | `true` | Production |

#### Preview Environment Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Preview |
| `VITE_SUPABASE_ANON_KEY` | `your-preview-anon-key` | Preview |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_your_key` | Preview |
| `VITE_ENVIRONMENT` | `preview` | Preview |
| `VITE_ENABLE_ANALYTICS` | `false` | Preview |

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Add environment variables
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production

# Pull environment variables for local development
vercel env pull .env.local
```

### Method 3: vercel.json Configuration

Create `vercel.json` with build environment variables:

```json
{
  "env": {
    "VITE_ENVIRONMENT": "production",
    "VITE_APP_URL": "https://benchbarrier.vercel.app"
  }
}
```

---

## 🌐 Netlify Backup Setup

### Method 1: Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com/sites/benchbarrier/settings/deploys)
2. Navigate to: **Site settings → Build & deploy → Environment**
3. Add environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
VITE_ENVIRONMENT=production
VITE_APP_URL=https://benchbarrier.netlify.app
```

### Method 2: netlify.toml Configuration

Update `netlify.toml`:

```toml
[build.environment]
  VITE_ENVIRONMENT = "production"
  VITE_APP_URL = "https://benchbarrier.netlify.app"
```

---

## 🔑 Required Services

### 1. Supabase (Database & Authentication)

**Setup:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing
3. Navigate to: **Settings → API**
4. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - Anon/Public Key → `VITE_SUPABASE_ANON_KEY`

**Documentation:** https://supabase.com/docs/guides/getting-started

### 2. Stripe (Payment Processing)

**Setup:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to: **Developers → API keys**
3. Copy:
   - Publishable key → `VITE_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY` (server-side only)

**Test Mode:**
- Use `pk_test_...` for development
- Use `pk_live_...` for production

**Documentation:** https://stripe.com/docs/keys

### 3. Sentry (Error Tracking)

**Setup:**
1. Go to [Sentry Dashboard](https://sentry.io)
2. Create a new project (React)
3. Copy DSN from project settings
4. Add to `VITE_SENTRY_DSN`

**Documentation:** https://docs.sentry.io/platforms/javascript/guides/react/

### 4. Plausible Analytics (Privacy-Friendly Analytics)

**Setup:**
1. Go to [Plausible Dashboard](https://plausible.io)
2. Add your domain: `benchbarrier.vercel.app`
3. Set:
   - `VITE_PLAUSIBLE_DOMAIN=benchbarrier.vercel.app`
   - `VITE_PLAUSIBLE_API_HOST=https://plausible.io`

**Documentation:** https://plausible.io/docs

### 5. Email Service (Marketing Automation)

**Options:**

#### SendGrid
```env
VITE_EMAIL_PROVIDER=sendgrid
EMAIL_API_KEY=SG.your-api-key
```

#### Resend (Recommended)
```env
VITE_EMAIL_PROVIDER=resend
EMAIL_API_KEY=re_your-api-key
```

#### Mailgun
```env
VITE_EMAIL_PROVIDER=mailgun
EMAIL_API_KEY=your-mailgun-key
```

---

## 🔒 Security Best Practices

### 1. Never Commit Secrets

✅ **DO:**
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`
- Use `.env.example` as a template
- Store secrets in Vercel/Netlify dashboard

❌ **DON'T:**
- Commit `.env.local` to git
- Share API keys in public repositories
- Use production keys in development
- Hardcode secrets in source code

### 2. Use Different Keys Per Environment

```
Development:  pk_test_..., sk_test_...
Preview:      pk_test_..., sk_test_...
Production:   pk_live_..., sk_live_...
```

### 3. Rotate Keys Regularly

- Rotate API keys every 90 days
- Immediately rotate if compromised
- Use key rotation features when available

### 4. Limit Key Permissions

- Use read-only keys when possible
- Restrict API keys to specific domains
- Enable IP whitelisting where supported

### 5. Monitor Key Usage

- Set up alerts for unusual activity
- Review API logs regularly
- Use Sentry to track errors

---

## 🧪 Testing Environment Variables

### Verify Local Setup

```bash
# Check if variables are loaded
npm run dev

# In browser console:
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_ENVIRONMENT)
```

### Verify Vercel Setup

```bash
# Pull production environment variables
vercel env pull .env.production

# Check variables
cat .env.production
```

### Test Build

```bash
# Test production build locally
npm run build
npm run preview
```

---

## 🚨 Troubleshooting

### Variables Not Loading

**Problem:** Environment variables are `undefined`

**Solutions:**
1. Ensure variables start with `VITE_` prefix
2. Restart dev server after adding variables
3. Check `.env.local` exists and has correct syntax
4. Verify no typos in variable names

### Build Fails on Vercel

**Problem:** Build fails with missing environment variables

**Solutions:**
1. Add variables in Vercel dashboard
2. Select correct environment (Production/Preview)
3. Redeploy after adding variables
4. Check build logs for specific missing variables

### Supabase Connection Fails

**Problem:** Cannot connect to Supabase

**Solutions:**
1. Verify URL format: `https://xxx.supabase.co`
2. Check anon key is correct
3. Ensure Supabase project is active
4. Check network/firewall settings

---

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Keys](https://stripe.com/docs/keys)

---

## ✅ Quick Checklist

### Local Development
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Supabase credentials
- [ ] Add Stripe test keys
- [ ] Test `npm run dev`

### Vercel Production
- [ ] Add all production environment variables
- [ ] Use production API keys (not test keys)
- [ ] Enable analytics and monitoring
- [ ] Test deployment

### Netlify Backup
- [ ] Add environment variables to Netlify
- [ ] Verify build succeeds
- [ ] Test live site

### Security
- [ ] All secrets in dashboard (not in code)
- [ ] Different keys per environment
- [ ] `.env.local` in `.gitignore`
- [ ] Regular key rotation scheduled

---

**Last Updated:** 2026-01-04  
**Project:** BenchBarrier v1.0  
**Maintainer:** Alawein Technologies
