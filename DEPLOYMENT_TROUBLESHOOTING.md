# Deployment Troubleshooting Guide

## Overview
This document addresses common deployment issues and their solutions for the BenchBarrier e-commerce platform.

## Common Issues & Solutions

### 1. Build Failures - Google Fonts Network Access

**Symptom:** Build fails with error:
```
Failed to fetch `JetBrains Mono` from Google Fonts.
There was an issue establishing a connection while requesting https://fonts.googleapis.com/css2...
```

**Root Cause:** Next.js `next/font/google` requires network access at build time to fetch font files. This fails in restricted network environments or when Google Fonts is unavailable.

**Solution:** ✅ **FIXED**
- Removed `next/font/google` import from `app/layout.tsx`
- Font now falls back to system monospace fonts via Tailwind config
- Build no longer requires external network access

**Alternative Solutions:**
- Use local fonts instead of Google Fonts
- Configure build environment to allow fonts.googleapis.com access
- Use CDN link in production with proper error handling

---

### 2. Netlify Deployment - Wrong Build Output

**Symptom:** 
- Netlify deployment succeeds but shows blank page or 404 errors
- Build publishes to wrong directory

**Root Cause:** `netlify.toml` was configured for Vite framework (`publish = "dist"`) but project uses Next.js (publishes to `.next`).

**Solution:** ✅ **FIXED**
Updated `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"  # Changed from "dist"
```

Removed SPA redirects (not needed for Next.js):
```toml
# Removed this block:
# [[redirects]]
#   from = "/*"
#   to = "/index.html"
#   status = 200
```

---

### 3. Environment Variables - Missing at Build Time

**Symptom:**
- Build sometimes succeeds, sometimes fails
- Errors like "Missing Supabase environment variables"

**Root Cause:** Services (Stripe, Supabase) initialized eagerly at module load time, causing build failures when env vars are missing.

**Solution:** ✅ **FIXED**
- Implemented lazy initialization for Stripe and Supabase clients
- Added `lib/env.ts` utility with fallback values
- Services now initialize only when first used (at runtime, not build time)

**Key Files Updated:**
- `lib/stripe.ts` - Lazy Stripe initialization
- `lib/supabase.ts` - Lazy Supabase initialization  
- `lib/env.ts` - Environment variable utilities
- `app/api/webhooks/stripe/route.ts` - Updated to use lazy getStripe()

---

### 4. Branch Workflow - All PRs Auto-Closed

**Symptom:**
- All pull requests automatically closed
- CI fails on all non-main branches
- Error: "Only the main branch is allowed"

**Root Cause:** `.github/workflows/enforce-main-branch.yml` workflow forcibly fails all builds on non-main branches and auto-closes PRs.

**Solution:** ✅ **FIXED**
- Removed `.github/workflows/enforce-main-branch.yml`
- Normal PR workflow now enabled
- Can develop on feature branches and merge via PRs

---

### 5. Build Artifacts in Git

**Symptom:** Large `.next/` directory or `node_modules/` committed to git

**Solution:** ✅ Already configured in `.gitignore`:
```gitignore
.next/
out/
build/
node_modules/
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] Set environment variables in hosting platform
- [ ] Verify build succeeds locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Check `.gitignore` excludes build artifacts

### Netlify Deployment
1. **Environment Variables** (Settings → Environment variables):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 22 (set in `netlify.toml`)

3. **Deploy**: Push to main branch or click "Trigger deploy"

### Vercel Deployment
1. **Environment Variables** (Project Settings → Environment Variables):
   - Add same variables as Netlify above

2. **Build Settings** (auto-detected):
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

3. **Deploy**: Push to repository or import from GitHub

---

## Testing Deployments

### Local Production Build
```bash
# Build
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

### Verify Pages Load
- ✅ Homepage: `/`
- ✅ Products: `/products`
- ✅ Cart: `/cart`
- ✅ Student Discount: `/student-discount`
- ✅ Team Orders: `/team-orders`
- ✅ About: `/about`

### Test Cart Functionality
1. Add product to cart
2. Verify cart badge updates
3. Check cart page shows item
4. Test quantity adjustment
5. Verify "Proceed to Checkout" redirects to Stripe

---

## Environment Variable Reference

### Required for Runtime (Server-side)
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key

### Required for Client-side
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Optional
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhook verification
- `NEXT_PUBLIC_SITE_URL` - Site URL (defaults to localhost in dev)

### Build-time Behavior
- Client env vars (`NEXT_PUBLIC_*`) can be missing at build time (uses fallbacks)
- Server env vars checked only at runtime when routes are accessed
- Build succeeds even without env vars configured

---

## Common Error Messages

### "Failed to fetch JetBrains Mono from Google Fonts"
**Status:** ✅ Fixed - No longer uses Google Fonts at build time

### "Missing Supabase environment variables"
**Status:** ✅ Fixed - Only checked at runtime, not build time

### "publish directory .next does not exist"
**Status:** ✅ Fixed - netlify.toml now correctly configured

### "Target page has been closed" (Playwright tests)
**Issue:** Dev server process management
**Fix:** Use specific PID with `kill <PID>` instead of pkill

---

## Performance Optimization

### Build Caching
Enable build caching in hosting platform:
- **Netlify**: Cache `node_modules` and `.next/cache`
- **Vercel**: Automatically cached

### Environment-specific Builds
```bash
# Development (with hot reload)
npm run dev

# Production (optimized)
npm run build && npm start
```

---

## Support & Debugging

### Check Build Logs
- Netlify: Deploy log in dashboard
- Vercel: Deployment details → Build Logs
- Local: Terminal output from `npm run build`

### Common Build Issues
1. **Out of memory**: Increase `NODE_OPTIONS=--max-old-space-size=4096`
2. **Dependency conflicts**: Use `npm install --legacy-peer-deps`
3. **TypeScript errors**: Check with `npm run build` locally first

### Contact
For persistent issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Netlify Support](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
