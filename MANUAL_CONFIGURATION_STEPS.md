# Manual Configuration Steps for BenchBarrier

This document outlines the manual configuration steps required to complete the BenchBarrier production setup as outlined in `COPILOT_SUPERPROMPT.md`.

## Completed Code Changes ✅

The following have been implemented in code:

1. **Student Verification Flow** - Enhanced to persist data to Supabase
   - Created server action `/app/actions/student.ts` to save student verifications
   - Updated `/app/student-discount/page.tsx` to:
     - Verify .edu email and save to `student_verifications` table
     - Generate and display unique discount code
     - Allow checkout with 20% discount after verification

2. **Team Orders Flow** - Enhanced to persist data to Supabase
   - Created server action `/app/actions/team-orders.ts` to save team order requests
   - Updated `/app/team-orders/page.tsx` to:
     - Save team order requests to `team_orders` table
     - Display proper error messages
     - Confirm submission success

## Required Manual Configuration Steps

### PRIORITY 1: Configure Vercel Environment Variables ⚠️ CRITICAL

**Required:** You must manually configure these in the Vercel dashboard for the application to work.

1. Go to: https://vercel.com/dashboard
2. Select the `benchbarrier` project
3. Navigate to: Settings → Environment Variables
4. Add the following variables for **ALL environments** (Production, Preview, Development):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ylfgahoeddxynelezlhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmdhaG9lZGR4eW5lbGV6bGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzE5OTMsImV4cCI6MjA4MzA0Nzk5M30.gE0Of9-Rz4f72OMWobXuIeoyZHkfFN84HlzfrM9D5dI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmdhaG9lZGR4eW5lbGV6bGh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzQ3MTk5MywiZXhwIjoyMDgzMDQ3OTkzfQ.N5UBlcegjz2g-jLka490EkSPY1ISPmhypq9Ue3RHOEA

# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_51SliTfDJGc3SYHjNWoJnNTFL1tKqP6ECnaR0qfzndNLYzdwC8wvOk8s1wZYinm9Nh9SbJuyT5CkQ1to4Eg8TS4q0000TmkpFwy
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SliTfDJGc3SYHjNRlsUMZwsxOTxORAG9uoY8wLyZxtr0yatL4eiXDykfbGqi6sfEVKJZubBQTnaJCKE170sM1o400MhS95vc0
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER_REPLACE_AFTER_WEBHOOK_SETUP

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://benchbarrier.vercel.app
NODE_VERSION=24.x
```

5. Click "Save" for each variable
6. Trigger a new deployment (Vercel will auto-redeploy when you push code)

**Verification:**
- Visit https://benchbarrier.vercel.app/
- Should see brutalist design (black background, blue accents)
- No runtime errors in browser console related to missing environment variables

---

### PRIORITY 2: Apply Supabase Database Schema ⚠️ CRITICAL

**Required:** The database tables must exist for the application to save orders, student verifications, and team requests.

1. Go to: https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw/sql
2. Open the file `supabase-schema.sql` in this repository
3. Copy the entire SQL content
4. Paste into Supabase SQL Editor
5. Click "Run" to execute

**What This Creates:**
- `orders` table (stores customer orders)
- `order_items` table (stores individual items per order)
- `student_verifications` table (for student discount verification)
- `team_orders` table (for bulk team orders)
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-update triggers

**Verification:**
Run this in Supabase SQL Editor to verify:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output: `order_items`, `orders`, `student_verifications`, `team_orders`

---

### PRIORITY 3: Configure Stripe Webhook ⚠️ CRITICAL

**Required:** Without the webhook, orders won't be saved to database after payment.

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter endpoint URL: `https://benchbarrier.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Update Vercel environment variable:
   - Go to Vercel Dashboard → Environment Variables
   - Find `STRIPE_WEBHOOK_SECRET`
   - Replace `whsec_PLACEHOLDER_REPLACE_AFTER_WEBHOOK_SETUP` with actual secret
   - Save and redeploy

**Verification:**
1. Make a test purchase using card: `4242 4242 4242 4242`
2. Check Stripe Dashboard → Webhooks → Recent deliveries
3. Should see successful webhook delivery (200 status)
4. Check Supabase → Table Editor → `orders` table
5. Should see new order record

---

### PRIORITY 4: Replace Placeholder Images 🎨

**Optional but Recommended:** Product images are currently SVG placeholders.

**Current Placeholders:**
```
public/media/
├── bench-barrier-product-shot.svg
├── benchbarrier-standard.svg
├── mat-protector-elite.svg
├── mat-shield-quick-clean.svg
├── gym-towel-set.svg
├── gym-bag-bundle.svg
├── team-bundle-5pack.svg
└── elite-bundle.svg
```

**To Replace:**
1. Obtain real product photos (JPG/PNG format, 1200x1200px recommended)
2. Replace SVG files in `public/media/` directory
3. If you change file extensions, update `lib/products.ts`:
   ```typescript
   // Example: Change from .svg to .jpg
   image: "/media/bench-barrier-product-shot.jpg"
   ```
4. Optimize images for web (use tools like TinyPNG, ImageOptim)
5. Commit and push changes

**Verification:**
- Visit https://benchbarrier.vercel.app/products
- Should see real product photos instead of SVG placeholders

---

## Testing Checklist

After completing all manual configuration steps, verify:

### Functional Testing:
- [ ] Homepage loads without errors
- [ ] Product catalog displays all 8 products
- [ ] Add to cart functionality works
- [ ] Cart page shows correct items and totals
- [ ] Checkout redirects to Stripe
- [ ] Test payment with card `4242 4242 4242 4242` succeeds
- [ ] Success page displays after payment
- [ ] Order is saved to Supabase `orders` table
- [ ] Student discount flow:
  - [ ] Visit /student-discount
  - [ ] Enter .edu email
  - [ ] Click "Verify Student Email"
  - [ ] Discount code displayed
  - [ ] Verification saved to `student_verifications` table
  - [ ] Can checkout with 20% discount
- [ ] Team orders flow:
  - [ ] Visit /team-orders
  - [ ] Fill out form
  - [ ] Submit request
  - [ ] Request saved to `team_orders` table
  - [ ] Success message displayed

### Visual Testing:
- [ ] Brutalist design (black background, blue accents)
- [ ] JetBrains Mono font loads correctly
- [ ] Sharp borders (no rounded corners)
- [ ] Responsive on mobile devices
- [ ] Product images display correctly

### Technical Testing:
- [ ] No console errors in browser
- [ ] No 404 errors for assets
- [ ] Stripe webhook delivers successfully
- [ ] Database queries execute without errors
- [ ] Environment variables are set correctly

---

## Database Verification Queries

Run these in Supabase SQL Editor to verify data persistence:

**Check student verifications:**
```sql
SELECT * FROM student_verifications ORDER BY created_at DESC LIMIT 10;
```

**Check team orders:**
```sql
SELECT * FROM team_orders ORDER BY created_at DESC LIMIT 10;
```

**Check orders:**
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

---

## Support Resources

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw
- **Stripe Dashboard:** https://dashboard.stripe.com/test
- **GitHub Repository:** https://github.com/alaweimm90-archieve/benchbarrier
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs

---

## Summary

**Code Changes Completed:**
- ✅ Student verification flow saves to database
- ✅ Team orders flow saves to database
- ✅ Error handling implemented
- ✅ TypeScript type checking passes

**Manual Configuration Required:**
- ⚠️ Vercel environment variables (CRITICAL)
- ⚠️ Supabase database schema (CRITICAL)
- ⚠️ Stripe webhook configuration (CRITICAL)
- 🎨 Product images replacement (RECOMMENDED)

Once you complete the manual configuration steps, the application will be fully production-ready!
