# Vercel Deployment Fix - Final Resolution

## Problem Summary

**Error:** `The pattern 'api/**/*.ts' defined in 'functions' doesn't match any Serverless Functions inside the 'api' directory.`

**Root Cause:** The `vercel.json` configuration file had conflicting and incorrect settings:
1. Configured for **Vite** framework (`"framework": "vite"`)
2. Referenced a non-existent root-level `api` directory
3. Included SPA rewrites incompatible with Next.js
4. This is a **Next.js 16 App Router** application, not a Vite SPA

## What Was Fixed

### 1. Updated `vercel.json` Configuration

**Before:**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**After:**
```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096"
    }
  },
  "headers": [...],
  "regions": ["iad1"]
}
```

**Changes:**
- ✅ Removed `"framework": "vite"` (Vercel auto-detects Next.js)
- ✅ Removed `"buildCommand"` and `"outputDirectory"` (Next.js defaults)
- ✅ Removed SPA `rewrites` (Next.js handles routing)
- ✅ Removed `functions` configuration (Next.js API routes in `app/api/`)
- ✅ Kept security headers and caching rules
- ✅ Kept memory optimization settings

### 2. Fixed Webhook Route Build Error

**Problem:** The webhook route imported Stripe client at module level, causing build failures when environment variables were missing.

**Solution:** Implemented lazy initialization inside the POST handler:

```typescript
// Before: Top-level import
import { stripe } from '@/lib/stripe'

// After: Lazy initialization
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  })
}

export async function POST(request: NextRequest) {
  const stripe = getStripe() // Only called at runtime
  // ...
}
```

### 3. Updated Stripe API Version

**Changed:** `2024-12-18.acacia` → `2025-12-15.clover`

This matches the latest Stripe TypeScript SDK requirements.

## Verification Results

### Build Status: ✅ SUCCESS

```bash
$ npm run build

▲ Next.js 16.1.1 (Turbopack)
✓ Compiled successfully in 3.7s
✓ Generating static pages (10/10) in 264.4ms

Route (app)
├ ○ /                        # Homepage
├ ○ /about                   # About page
├ ƒ /api/webhooks/stripe     # Webhook handler (dynamic)
├ ○ /cart                    # Shopping cart
├ ○ /checkout/success        # Success page
├ ○ /products                # Product catalog
├ ○ /student-discount        # Student discount
└ ○ /team-orders             # Team orders

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### Type Check: ✅ PASSED

```bash
$ npm run type-check
> tsc --noEmit
(No errors)
```

## Deployment Instructions

### Step 1: Commit and Push Changes

```bash
git add vercel.json app/api/webhooks/stripe/route.ts
git commit -m "fix: remove invalid functions config from vercel.json and fix webhook route"
git push origin main
```

### Step 2: Verify Environment Variables in Vercel

Go to: **Vercel Dashboard → Settings → Environment Variables**

Ensure these are set for **Production, Preview, and Development**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ylfgahoeddxynelezlhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_test_51SliTfDJGc3SYHjN...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SliTfDJGc3SYHjN...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://benchbarrier.vercel.app
```

### Step 3: Wait for Automatic Deployment

Vercel will automatically:
1. Detect the push to `main` branch
2. Install dependencies with `npm install`
3. Build with `npm run build` (Next.js auto-detected)
4. Deploy to production

**Expected deployment time:** 2-3 minutes

### Step 4: Verify Deployment

Visit: https://benchbarrier.vercel.app/

**Expected result:**
- ✅ Brutalist design (stone-950 background, blue-500 accents)
- ✅ Product catalog with 8 products
- ✅ Shopping cart functionality
- ✅ Stripe checkout integration

**NOT:**
- ❌ Old Vite fitness training app
- ❌ Light background
- ❌ 404 errors

## Technical Details

### Why the Error Occurred

Vercel's build process validates the `vercel.json` configuration **before** building the application. When it saw:

```json
"functions": {
  "api/**/*.ts": { ... }
}
```

It looked for a root-level `api/` directory containing TypeScript files. Since this is a Next.js App Router application, the API routes are in `app/api/`, not a root `api/` directory.

### Next.js API Routes vs. Vercel Functions

**Next.js App Router (what we have):**
- API routes: `app/api/webhooks/stripe/route.ts`
- Automatically deployed as serverless functions
- No `functions` config needed in `vercel.json`

**Legacy Vercel Functions (what the config expected):**
- Functions: `api/hello.ts` (root-level `api/` directory)
- Requires explicit `functions` config in `vercel.json`
- Not used in modern Next.js applications

### Why Lazy Initialization Was Needed

During the Next.js build process, all modules are imported to:
1. Analyze dependencies
2. Generate static pages
3. Optimize bundles

If a module throws an error during import (like missing env vars), the build fails. By moving initialization inside the request handler, we ensure:
- Build succeeds without environment variables
- Runtime errors only occur when the endpoint is actually called
- Vercel can deploy the application and inject env vars at runtime

## Files Modified

1. **vercel.json** - Removed invalid Vite/functions configuration
2. **app/api/webhooks/stripe/route.ts** - Lazy initialization of Stripe client

## Summary

| **Issue** | Invalid `functions` config in `vercel.json` |
|-----------|---------------------------------------------|
| **Cause** | Vite configuration in Next.js project |
| **Fix** | Removed Vite config, let Vercel auto-detect Next.js |
| **Build** | ✅ Successful (3.7s) |
| **Type Check** | ✅ Passed (0 errors) |
| **Status** | ✅ Ready to deploy |

**Date:** January 4, 2026  
**Framework:** Next.js 16.1.1 (App Router)  
**Deployment Platform:** Vercel  
**Status:** ✅ **DEPLOYMENT READY**
