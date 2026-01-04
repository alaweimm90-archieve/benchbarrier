# Stripe Webhook Setup Guide

## 🎯 Overview

This guide walks you through setting up Stripe webhooks to automatically save orders to Supabase after successful payments.

---

## 📋 Prerequisites

- ✅ BenchBarrier deployed to Vercel
- ✅ Stripe account (test or live mode)
- ✅ Supabase database with schema deployed
- ✅ Environment variables configured

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Webhook URL

Your webhook endpoint is:
```
https://your-domain.vercel.app/api/webhooks/stripe
```

**Example:**
```
https://benchbarrier.vercel.app/api/webhooks/stripe
```

---

### Step 2: Create Webhook in Stripe Dashboard

1. **Go to Stripe Dashboard:**
   - Test Mode: https://dashboard.stripe.com/test/webhooks
   - Live Mode: https://dashboard.stripe.com/webhooks

2. **Click "Add endpoint"**

3. **Enter Endpoint URL:**
   ```
   https://your-domain.vercel.app/api/webhooks/stripe
   ```

4. **Select Events to Listen:**
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`

5. **Click "Add endpoint"**

6. **Copy Webhook Signing Secret:**
   - Click on the newly created endpoint
   - Click "Reveal" next to "Signing secret"
   - Copy the secret (starts with `whsec_...`)

---

### Step 3: Add Webhook Secret to Vercel

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/your-username/benchbarrier/settings/environment-variables
   ```

2. **Add Environment Variable:**
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_your_secret_here` (paste the secret from Step 2)
   - **Environment:** Production (and Preview if needed)

3. **Click "Save"**

4. **Redeploy:**
   ```bash
   # Trigger a new deployment
   git commit --allow-empty -m "Add webhook secret"
   git push origin main
   ```

---

### Step 4: Test the Webhook

1. **Make a Test Purchase:**
   - Go to your site: https://your-domain.vercel.app
   - Add a product to cart
   - Proceed to checkout
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

2. **Verify Webhook Received:**
   - Go to Stripe Dashboard → Webhooks
   - Click on your endpoint
   - Check "Events" tab
   - You should see `checkout.session.completed` event

3. **Verify Order Saved:**
   - Go to Supabase Dashboard
   - Open SQL Editor
   - Run:
     ```sql
     SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
     ```
   - You should see your test order

---

## 🧪 Local Testing (Optional)

### Using Stripe CLI

1. **Install Stripe CLI:**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   
   # Linux
   # Download from: https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```

3. **Forward Webhooks to Local:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy Webhook Secret:**
   - The CLI will output a webhook secret
   - Add to `.env.local`:
     ```env
     STRIPE_WEBHOOK_SECRET=whsec_...
     ```

5. **Test Webhook:**
   ```bash
   # In another terminal
   stripe trigger checkout.session.completed
   ```

6. **Check Logs:**
   - Watch the Stripe CLI output
   - Check your local server logs
   - Verify order saved to Supabase

---

## 🔍 Troubleshooting

### Webhook Not Receiving Events

**Problem:** Webhook endpoint shows no events

**Solutions:**
1. Verify webhook URL is correct
2. Check that endpoint is deployed
3. Ensure webhook is enabled in Stripe Dashboard
4. Check Vercel deployment logs

**Test Endpoint:**
```bash
curl https://your-domain.vercel.app/api/webhooks/stripe
# Should return: {"error":"Missing stripe-signature header"}
```

---

### Signature Verification Failed

**Problem:** Webhook returns 400 error

**Solutions:**
1. Verify `STRIPE_WEBHOOK_SECRET` is correct
2. Check that secret matches the endpoint in Stripe Dashboard
3. Ensure secret is in Vercel environment variables
4. Redeploy after adding secret

**Check Environment Variable:**
```bash
# In Vercel Dashboard
vercel env ls
# Should show STRIPE_WEBHOOK_SECRET
```

---

### Order Not Saving to Supabase

**Problem:** Webhook receives event but order not in database

**Solutions:**
1. Check Vercel function logs:
   ```
   Vercel Dashboard → Deployments → [Latest] → Functions
   ```

2. Verify Supabase credentials:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_key_here
   ```

3. Check RLS policies:
   ```sql
   -- Service role should bypass RLS
   -- Verify in Supabase Dashboard → Authentication → Policies
   ```

4. Check database schema:
   ```sql
   -- Verify tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

---

### Webhook Timeout

**Problem:** Webhook times out (504 error)

**Solutions:**
1. Optimize webhook handler (already optimized)
2. Check Supabase connection
3. Verify database indexes exist
4. Check Vercel function logs for slow queries

---

## 📊 Monitoring Webhooks

### Stripe Dashboard

1. **View Webhook Events:**
   - Go to: Developers → Webhooks
   - Click on your endpoint
   - View "Events" tab

2. **Check Event Details:**
   - Click on any event
   - View request/response
   - Check status code

3. **Retry Failed Events:**
   - Click "Retry" on failed events
   - Check error message

### Vercel Logs

1. **View Function Logs:**
   ```
   Vercel Dashboard → Deployments → [Latest] → Functions
   ```

2. **Filter by Function:**
   - Select: `/api/webhooks/stripe`
   - View real-time logs

3. **Check Errors:**
   - Look for error messages
   - Check stack traces

### Supabase Logs

1. **View Database Logs:**
   ```
   Supabase Dashboard → Logs → Database
   ```

2. **Check Queries:**
   - View INSERT queries
   - Check for errors

---

## 🔒 Security Best Practices

### 1. Verify Webhook Signatures
✅ Already implemented in webhook handler

### 2. Use HTTPS Only
✅ Vercel provides HTTPS by default

### 3. Keep Secrets Secure
- ✅ Never commit webhook secret to git
- ✅ Use environment variables
- ✅ Rotate secrets periodically

### 4. Monitor Webhook Activity
- ✅ Check Stripe Dashboard regularly
- ✅ Set up alerts for failed webhooks
- ✅ Review Vercel function logs

---

## 📝 Webhook Event Details

### checkout.session.completed

**Triggered:** When a customer completes checkout

**Data Saved:**
- Order ID (Stripe session ID)
- Customer email
- Customer name
- Total amount
- Currency
- Shipping address
- Payment status

**Order Items:**
- Product ID
- Product name
- Quantity
- Unit price
- Total price

### payment_intent.succeeded

**Triggered:** When payment is successful

**Action:** Log success (order already saved)

### payment_intent.payment_failed

**Triggered:** When payment fails

**Action:** Update order status to "failed"

---

## 🎯 Success Criteria

Your webhook is working correctly when:

✅ Webhook receives events in Stripe Dashboard  
✅ Orders appear in Supabase `orders` table  
✅ Order items appear in `order_items` table  
✅ No errors in Vercel function logs  
✅ Test checkout completes successfully  
✅ Success page displays order confirmation  

---

## 📚 Additional Resources

- **Stripe Webhooks Docs:** https://stripe.com/docs/webhooks
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **Vercel Functions:** https://vercel.com/docs/functions
- **Supabase RLS:** https://supabase.com/docs/guides/auth/row-level-security

---

## 🆘 Need Help?

### Stripe Support
- Dashboard: https://dashboard.stripe.com/support
- Docs: https://stripe.com/docs

### Vercel Support
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs

### Supabase Support
- Dashboard: https://supabase.com/dashboard/support
- Docs: https://supabase.com/docs

---

**Last Updated:** January 4, 2026  
**Status:** Production Ready  
**Webhook Endpoint:** `/api/webhooks/stripe`  
**Events:** 3 (checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed)
