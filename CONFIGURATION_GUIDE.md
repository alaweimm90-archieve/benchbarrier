# BenchBarrier Configuration Guide

## Overview

This guide covers the complete configuration of BenchBarrier's Supabase backend and Stripe payment integration.

---

## 1. Supabase Configuration

### Project Details
- **Project ID:** `ylfgahoeddxynelezlhw`
- **Project URL:** `https://ylfgahoeddxynelezlhw.supabase.co`
- **Region:** East US (AWS)

### API Keys

#### Anon Key (Client-side safe)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmdhaG9lZGR4eW5lbGV6bGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzE5OTMsImV4cCI6MjA4MzA0Nzk5M30.gE0Of9-Rz4f72OMWobXuIeoyZHkfFN84HlzfrM9D5dI
```

#### Service Role Key (Server-side only)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmdhaG9lZGR4eW5lbGV6bGh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzQ3MTk5MywiZXhwIjoyMDgzMDQ3OTkzfQ.N5UBlcegjz2g-jLka490EkSPY1ISPmhypq9Ue3RHOEA
```

### Database Setup

1. **Navigate to Supabase SQL Editor:**
   - Go to https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw/sql
   
2. **Run the schema:**
   - Copy the contents of `supabase-schema.sql`
   - Paste into the SQL Editor
   - Click "Run"

3. **Verify tables created:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

### Row Level Security (RLS)

RLS is enabled on all tables. Policies ensure:
- Users can only view their own orders
- Student verifications are private
- Team orders are restricted to the contact email

**To bypass RLS (server-side operations):**
Use the service role key via `getServiceSupabase()` in `lib/supabase.ts`

---

## 2. Stripe Configuration

### Test Mode Keys (Currently Active)

#### Publishable Key (Client-side safe)
```
pk_test_51SliTfDJGc3SYHjNRlsUMZwsxOTxORAG9uoY8wLyZxtr0yatL4eiXDykfbGqi6sfEVKJZubBQTnaJCKE170sM1o400MhS95vc0
```

#### Secret Key (Server-side only)
```
sk_test_51SliTfDJGc3SYHjNWoJnNTFL1tKqP6ECnaR0qfzndNLYzdwC8wvOk8s1wZYinm9Nh9SbJuyT5CkQ1to4Eg8TS4q0000TmkpFwy
```

### Product Catalog

All 8 products are created in Stripe Dashboard:

| Product Name | Product ID | Price | Category |
|-------------|-----------|-------|----------|
| Bench Cover Pro | `prod_TjQzKdRKzHKZHE` | $49.99 | Protection |
| Standard Bench Cover | `prod_TjQzVakXR16wzn` | $34.99 | Protection |
| Elite Mat Protector | `prod_TjR0zg0mMVhkjK` | $79.99 | Protection |
| Quick-Clean Mat Shield | `prod_TjR03Oqbrt0uVm` | $59.99 | Protection |
| Portable Gym Towel Set | `prod_TjR1Y1WfDbEOEW` | $39.99 | Accessories |
| Premium Gym Bag Bundle | `prod_TjR2fmozAGj7mw` | $89.99 | Bundles |
| Team Bundle - 5 Covers | `prod_TjR27zz2qyZCIt` | $199.99 | Bundles |
| Premium Protection Package | `prod_TjR3qFxTiFQg7r` | $299.99 | Bundles |

### Checkout Flow

The application uses **dynamic product creation** in checkout sessions:

```typescript
// From app/actions/stripe.ts
price_data: {
  currency: 'usd',
  product_data: {
    name: item.name,
    description: item.description,
    images: [item.image],
  },
  unit_amount: Math.round(item.price * 100),
}
```

**Benefits:**
- No need to create price IDs for each variant
- Flexible pricing (student discounts, bulk pricing)
- Simplified product management

### Webhook Configuration (Optional)

For production order tracking:

1. **Create webhook endpoint:**
   - URL: `https://benchbarrier.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

2. **Add webhook handler:**
   ```typescript
   // app/api/webhooks/stripe/route.ts
   import { stripe } from '@/lib/stripe'
   import { getServiceSupabase } from '@/lib/supabase'
   
   export async function POST(req: Request) {
     const body = await req.text()
     const sig = req.headers.get('stripe-signature')!
     
     const event = stripe.webhooks.constructEvent(
       body,
       sig,
       process.env.STRIPE_WEBHOOK_SECRET!
     )
     
     if (event.type === 'checkout.session.completed') {
       const session = event.data.object
       // Save order to Supabase
       const supabase = getServiceSupabase()
       await supabase.from('orders').insert({
         stripe_session_id: session.id,
         customer_email: session.customer_email,
         total_amount: session.amount_total,
         status: 'completed'
       })
     }
     
     return new Response(JSON.stringify({ received: true }))
   }
   ```

---

## 3. Environment Variables

### Local Development (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ylfgahoeddxynelezlhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_51SliTfDJGc3SYHjN...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SliTfDJGc3SYHjN...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel Production

Add these environment variables in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard/project/settings/environment-variables
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to `https://benchbarrier.vercel.app`)

3. Redeploy after adding variables

---

## 4. Testing

### Test Stripe Checkout

Use these test card numbers:

| Card Type | Number | CVC | Expiry |
|-----------|--------|-----|--------|
| Visa | 4242 4242 4242 4242 | Any 3 digits | Any future date |
| Mastercard | 5555 5555 5555 4444 | Any 3 digits | Any future date |
| Amex | 3782 822463 10005 | Any 4 digits | Any future date |

### Test Supabase Connection

```typescript
import { supabase } from '@/lib/supabase'

// Test query
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .limit(10)

console.log('Orders:', data)
```

---

## 5. Production Checklist

### Before Going Live:

- [ ] Switch Stripe to live mode keys
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Configure Stripe webhook endpoint
- [ ] Test checkout flow end-to-end
- [ ] Verify RLS policies in Supabase
- [ ] Add error tracking (Sentry already configured)
- [ ] Test student discount email validation
- [ ] Test team order form submission
- [ ] Verify all product images are uploaded to `/public/media/`
- [ ] Test mobile responsiveness
- [ ] Run `npm run build` and verify no errors

### Stripe Live Mode:

1. **Get live keys from Stripe Dashboard:**
   - Publishable: `pk_live_...`
   - Secret: `sk_live_...`

2. **Update environment variables:**
   ```env
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

3. **Verify products exist in live mode:**
   - Products must be recreated in live mode
   - Or continue using dynamic product creation

---

## 6. Architecture Overview

```
┌─────────────────────────────────────────────┐
│         BENCHBARRIER ARCHITECTURE           │
├─────────────────────────────────────────────┤
│                                             │
│  Frontend (Next.js 16 + React)             │
│  └─ Deployed on: Vercel                    │
│     URL: benchbarrier.vercel.app           │
│                                             │
│  Backend (Supabase PostgreSQL)             │
│  └─ Project: ylfgahoeddxynelezlhw          │
│     URL: ylfgahoeddxynelezlhw.supabase.co  │
│     Region: East US (AWS)                  │
│                                             │
│  Payments (Stripe)                         │
│  └─ Mode: Test (switch to live for prod)  │
│     Products: 8 SKUs configured            │
│                                             │
│  Error Tracking (Sentry)                   │
│  └─ Org: alawein                           │
│     Project: sentry-alawein-team           │
│                                             │
│  Analytics (Plausible)                     │
│  └─ Domain: benchbarrier.com               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 7. Troubleshooting

### Supabase Connection Issues

**Error:** "Invalid API key"
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Check that URL matches project URL

**Error:** "Row Level Security policy violation"
- Use service role key for server-side operations
- Verify RLS policies are correctly configured

### Stripe Checkout Issues

**Error:** "No such product"
- Verify product IDs match Stripe Dashboard
- Check that you're in the correct mode (test/live)

**Error:** "Invalid API key"
- Verify `STRIPE_SECRET_KEY` is correct
- Check that key matches mode (test/live)

### Build Errors

**Error:** "Module not found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

**Error:** "Environment variable not defined"
- Copy `.env.example` to `.env.local`
- Fill in all required values

---

## 8. Support

- **Supabase Dashboard:** https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw
- **Stripe Dashboard:** https://dashboard.stripe.com/test/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentation:** See `README.md` and `DEPLOYMENT_GUIDE.md`

---

**Last Updated:** January 4, 2026  
**Status:** ✅ Fully Configured (Test Mode)
