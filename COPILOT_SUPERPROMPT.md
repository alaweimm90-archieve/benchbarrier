# 🚀 BenchBarrier E-Commerce Platform - Copilot Superprompt

## 📋 Project Overview

**Project Name:** BenchBarrier  
**Type:** Next.js 16 E-Commerce Platform (Brutalist Design)  
**Framework:** Next.js 16.1.1 (App Router + Turbopack)  
**Language:** TypeScript + React 19  
**Styling:** Tailwind CSS (Brutalist aesthetic)  
**Backend:** Supabase (PostgreSQL)  
**Payments:** Stripe (Test Mode)  
**Deployment:** Vercel  
**Repository:** https://github.com/alaweimm90-archieve/benchbarrier  
**Branch:** `main` (clean, all merged)  

---

## 🎯 Current Status

✅ **COMPLETED:**
- Next.js 16 application fully built and configured
- Supabase backend integration (client + schema)
- Stripe payment integration (8 products configured)
- Checkout flow (cart → Stripe → success page)
- Webhook handler for order persistence
- Product catalog (8 products with SVG placeholders)
- ESLint configuration (flat config for ESLint 9)
- TypeScript configuration
- Build verification (all passing)
- Git repository cleaned (main branch only)

⚠️ **PENDING ISSUES:**
1. **Environment Variables Not Set in Vercel**
2. **Supabase Database Schema Not Applied**
3. **Stripe Webhook Not Configured**
4. **Product Images Are Placeholders**
5. **Student Verification Flow Not Implemented**
6. **Team Orders Flow Not Implemented**

---

## 🔧 Your Mission

Fix all pending issues and ensure the application is **100% production-ready** on Vercel.

---

## 📝 Detailed Task List

### **PRIORITY 1: Vercel Environment Variables** ⚠️ CRITICAL

**Problem:** Environment variables are not configured in Vercel Dashboard, causing runtime errors.

**Action Required:**
1. Go to: https://vercel.com/dashboard → Select `benchbarrier` project → Settings → Environment Variables
2. Add the following for **ALL environments** (Production, Preview, Development):

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

3. Click "Save" for each variable
4. Trigger a new deployment (Vercel will auto-redeploy)

**Verification:**
- Visit https://benchbarrier.vercel.app/
- Should see brutalist design (black background, blue accents)
- No runtime errors in browser console

---

### **PRIORITY 2: Supabase Database Setup** ⚠️ CRITICAL

**Problem:** Database tables don't exist, causing order persistence to fail.

**Action Required:**
1. Go to: https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw/sql
2. Open the file `supabase-schema.sql` in the repository
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
```sql
-- Run this in Supabase SQL Editor to verify
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output: `order_items`, `orders`, `student_verifications`, `team_orders`

---

### **PRIORITY 3: Stripe Webhook Configuration** ⚠️ CRITICAL

**Problem:** Stripe webhook is not configured, so orders aren't saved to database after payment.

**Action Required:**
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

### **PRIORITY 4: Replace Placeholder Images** 🎨

**Problem:** Product images are SVG placeholders, not real product photos.

**Current Placeholders:**
```
public/media/
├── bench-barrier-product-shot.svg
├── bench-cover-standard.svg
├── mat-protector-elite.svg
├── mat-shield-quick.svg
├── towel-set-portable.svg
├── gym-bag-premium.svg
├── team-bundle-5pack.svg
└── premium-protection-package.svg
```

**Action Required:**
1. Obtain real product photos (JPG/PNG format, 1200x1200px recommended)
2. Replace SVG files with actual images
3. Update `lib/products.ts` if file extensions change:

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

### **PRIORITY 5: Implement Student Verification Flow** 🎓

**Problem:** Student discount feature is referenced in database schema but not implemented in UI.

**Action Required:**
1. Create student verification form at `/student-discount` page
2. Implement email verification (check for `.edu` domain)
3. Generate unique discount codes
4. Store verification in `student_verifications` table
5. Apply discount at checkout

**Implementation Guide:**

**File:** `app/student-discount/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';

export default function StudentDiscountPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [discountCode, setDiscountCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Validate .edu email
    if (!email.endsWith('.edu')) {
      setStatus('error');
      alert('Please use a valid .edu email address');
      return;
    }

    try {
      const supabase = createBrowserClient();
      
      // Generate unique discount code
      const code = `STUDENT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Save to database
      const { error } = await supabase
        .from('student_verifications')
        .insert({
          email,
          discount_code: code,
          status: 'pending',
        });

      if (error) throw error;

      setDiscountCode(code);
      setStatus('success');
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-blue-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold mb-8 border-4 border-blue-500 p-4">
          STUDENT DISCOUNT
        </h1>

        {status === 'success' ? (
          <div className="border-4 border-blue-500 p-8 bg-stone-900">
            <h2 className="text-2xl font-bold mb-4">✓ VERIFICATION PENDING</h2>
            <p className="mb-4">Your discount code:</p>
            <div className="bg-stone-950 border-2 border-blue-500 p-4 font-mono text-xl">
              {discountCode}
            </div>
            <p className="mt-4 text-sm">
              Check your email for verification link. Once verified, use this code at checkout for 15% off.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border-4 border-blue-500 p-8 bg-stone-900">
            <label className="block mb-4">
              <span className="font-bold mb-2 block">STUDENT EMAIL (.edu)</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
                placeholder="student@university.edu"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 text-stone-950 font-bold py-4 px-8 border-4 border-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              {status === 'loading' ? 'VERIFYING...' : 'GET DISCOUNT CODE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

**Verification:**
1. Visit https://benchbarrier.vercel.app/student-discount
2. Enter a `.edu` email address
3. Should receive discount code
4. Check Supabase `student_verifications` table for new record

---

### **PRIORITY 6: Implement Team Orders Flow** 👥

**Problem:** Team orders feature is referenced in database schema but not implemented in UI.

**Action Required:**
1. Create team order request form at `/team-orders` page
2. Collect team information (name, size, contact)
3. Store request in `team_orders` table
4. Send notification email (optional)

**Implementation Guide:**

**File:** `app/team-orders/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';

export default function TeamOrdersPage() {
  const [formData, setFormData] = useState({
    teamName: '',
    contactEmail: '',
    contactPhone: '',
    teamSize: '',
    productInterest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const supabase = createBrowserClient();
      
      const { error } = await supabase
        .from('team_orders')
        .insert({
          team_name: formData.teamName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          team_size: parseInt(formData.teamSize),
          product_interest: formData.productInterest,
          message: formData.message,
          status: 'pending',
        });

      if (error) throw error;

      setStatus('success');
      setFormData({
        teamName: '',
        contactEmail: '',
        contactPhone: '',
        teamSize: '',
        productInterest: '',
        message: '',
      });
    } catch (error) {
      console.error('Team order error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-blue-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold mb-8 border-4 border-blue-500 p-4">
          TEAM ORDERS
        </h1>

        {status === 'success' ? (
          <div className="border-4 border-blue-500 p-8 bg-stone-900">
            <h2 className="text-2xl font-bold mb-4">✓ REQUEST SUBMITTED</h2>
            <p>We'll contact you within 24 hours with a custom quote for your team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border-4 border-blue-500 p-8 bg-stone-900 space-y-4">
            <label className="block">
              <span className="font-bold mb-2 block">TEAM NAME</span>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                required
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              />
            </label>

            <label className="block">
              <span className="font-bold mb-2 block">CONTACT EMAIL</span>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                required
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              />
            </label>

            <label className="block">
              <span className="font-bold mb-2 block">CONTACT PHONE</span>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              />
            </label>

            <label className="block">
              <span className="font-bold mb-2 block">TEAM SIZE</span>
              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                required
                min="5"
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              />
            </label>

            <label className="block">
              <span className="font-bold mb-2 block">PRODUCT INTEREST</span>
              <select
                value={formData.productInterest}
                onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                required
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              >
                <option value="">Select product...</option>
                <option value="bench_covers">Bench Covers</option>
                <option value="mat_protectors">Mat Protectors</option>
                <option value="mixed">Mixed Products</option>
              </select>
            </label>

            <label className="block">
              <span className="font-bold mb-2 block">MESSAGE</span>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-stone-950 border-2 border-blue-500 p-4 font-mono text-blue-500"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 text-stone-950 font-bold py-4 px-8 border-4 border-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              {status === 'loading' ? 'SUBMITTING...' : 'REQUEST QUOTE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

**Verification:**
1. Visit https://benchbarrier.vercel.app/team-orders
2. Fill out team order form
3. Submit request
4. Check Supabase `team_orders` table for new record

---

## 🧪 Testing Checklist

After completing all tasks, verify the following:

### **Functional Testing:**
- [ ] Homepage loads without errors
- [ ] Product catalog displays all 8 products
- [ ] Add to cart functionality works
- [ ] Cart page shows correct items and totals
- [ ] Checkout redirects to Stripe
- [ ] Test payment with card `4242 4242 4242 4242` succeeds
- [ ] Success page displays after payment
- [ ] Order is saved to Supabase `orders` table
- [ ] Student discount form works
- [ ] Team orders form works

### **Visual Testing:**
- [ ] Brutalist design (black background, blue accents)
- [ ] JetBrains Mono font loads correctly
- [ ] Sharp borders (no rounded corners)
- [ ] Responsive on mobile devices
- [ ] Product images display correctly

### **Technical Testing:**
- [ ] No console errors in browser
- [ ] No 404 errors for assets
- [ ] Stripe webhook delivers successfully
- [ ] Database queries execute without errors
- [ ] Environment variables are set correctly

---

## 📚 Documentation Reference

All documentation is in the repository:

- **CONFIGURATION_GUIDE.md** - Complete setup guide
- **QUICK_REFERENCE.md** - Quick reference card
- **WEBHOOK_SETUP_GUIDE.md** - Stripe webhook setup
- **VERCEL_DEPLOYMENT_FIX_FINAL.md** - Deployment troubleshooting
- **supabase-schema.sql** - Database schema

---

## 🚨 Common Issues & Solutions

### Issue: "Supabase client error"
**Solution:** Verify environment variables are set in Vercel Dashboard

### Issue: "Stripe webhook failed"
**Solution:** Check webhook signing secret matches Vercel environment variable

### Issue: "Orders not saving to database"
**Solution:** Verify database schema is applied in Supabase SQL Editor

### Issue: "Product images not loading"
**Solution:** Check file paths in `lib/products.ts` match files in `public/media/`

### Issue: "Build fails on Vercel"
**Solution:** Check build logs, ensure all dependencies are in `package.json`

---

## 🎯 Success Criteria

The project is **100% production-ready** when:

✅ All environment variables are configured in Vercel  
✅ Database schema is applied in Supabase  
✅ Stripe webhook is configured and delivering successfully  
✅ All 8 products display with real images (not placeholders)  
✅ Checkout flow works end-to-end (cart → Stripe → success → database)  
✅ Student discount form is functional  
✅ Team orders form is functional  
✅ No console errors on any page  
✅ All tests pass (functional, visual, technical)  
✅ Application is live at https://benchbarrier.vercel.app/  

---

## 📞 Support Resources

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw
- **Stripe Dashboard:** https://dashboard.stripe.com/test
- **GitHub Repository:** https://github.com/alaweimm90-archieve/benchbarrier
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs

---

## 🏁 Final Notes

- **Current Branch:** `main` (clean, all merged)
- **Build Status:** ✅ Passing (4.0s)
- **Type Check:** ✅ Passing (0 errors)
- **ESLint:** ✅ Passing (0 errors)
- **Dependencies:** ✅ Installed (405 packages, 0 vulnerabilities)
- **Git Status:** ✅ Clean (no uncommitted changes)

**You have everything you need to complete this project. Good luck! 🚀**

---

**Generated:** January 4, 2026  
**Framework:** Next.js 16.1.1 (App Router + Turbopack)  
**Status:** Ready for final implementation  
