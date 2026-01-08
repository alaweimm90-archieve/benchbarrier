# Deployment Checklist (Canonical)

**BenchBarrier E-Commerce Platform**  
**Version:** 1.0.0  
**Last Updated:** January 5, 2026

This checklist ensures safe, reliable deployments to production.

---

## Pre-Deployment Checklist

### Environment Configuration
- [ ] All environment variables set in Vercel dashboard
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` (production value)
  - [ ] `STRIPE_SECRET_KEY` (live mode)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live mode)
  - [ ] `STRIPE_WEBHOOK_SECRET` (production webhook)
  - [ ] `NEXT_PUBLIC_SENTRY_DSN`
  - [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - [ ] `RESEND_API_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL` (production URL)

### Database
- [ ] Supabase production project created
- [ ] Database schema applied
  - [ ] `orders` table created
  - [ ] `order_items` table created
  - [ ] Row-level security (RLS) policies configured
- [ ] Database migrations tested in staging
- [ ] Backup strategy configured

### Stripe Configuration
- [ ] Stripe account in live mode
- [ ] All 8 products created in Stripe Dashboard
  - [ ] Bench Cover Pro (`prod_TjQzKdRKzHKZHE`)
  - [ ] Standard Bench Cover (`prod_TjQzVakXR16wzn`)
  - [ ] Elite Mat Protector (`prod_TjR0zg0mMVhkjK`)
  - [ ] Quick-Clean Mat Shield (`prod_TjR03Oqbrt0uVm`)
  - [ ] Portable Gym Towel Set (`prod_TjR1Y1WfDbEOEW`)
  - [ ] Premium Gym Bag Bundle (`prod_TjR2fmozAGj7mw`)
  - [ ] Team Bundle (5-pack) (`prod_TjR27zz2qyZCIt`)
  - [ ] Premium Protection Package (`prod_TjR3qFxTiFQg7r`)
- [ ] Webhook endpoint configured
  - URL: `https://benchbarrier.vercel.app/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Webhook secret saved to environment variables
- [ ] Test webhook delivery (Stripe CLI or test purchase)

### Monitoring & Analytics
- [ ] Sentry project created
- [ ] Sentry DSN added to environment variables
- [ ] Source maps enabled in build configuration
- [ ] Google Analytics 4 property created
- [ ] GA4 measurement ID added to environment variables
- [ ] Uptime monitor configured (UptimeRobot or Vercel Analytics)
  - [ ] Monitor: `/` (homepage)
  - [ ] Monitor: `/products` (collection page)
  - [ ] Monitor: `/api/health` (health check)

### Code Quality
- [ ] All tests passing (`npm run test` if applicable)
- [ ] TypeScript compilation successful (`npm run type-check`)
- [ ] ESLint passing with 0 warnings (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] No console errors in browser
- [ ] No console warnings in browser

### SEO & Meta
- [ ] `robots.txt` configured for production
- [ ] `sitemap.xml` generated
- [ ] Open Graph meta tags added
- [ ] Twitter Card meta tags added
- [ ] Canonical URLs configured
- [ ] Structured data (JSON-LD) added for products

### Security
- [ ] No secrets committed to repository
- [ ] `.env.local` in `.gitignore`
- [ ] Service role key never exposed to client
- [ ] Stripe webhook signature verification enabled
- [ ] CORS configured correctly
- [ ] Rate limiting considered for API routes

---

## Deployment Process

### 1. Create Preview Deployment
```bash
# Push to feature branch
git push origin feature/your-feature

# Vercel automatically creates preview deployment
# URL: https://benchbarrier-git-feature-your-feature.vercel.app
```

### 2. QA Testing (Preview Environment)
- [ ] Homepage loads correctly
- [ ] Product pages load correctly
- [ ] Add to cart works
- [ ] Cart drawer opens and displays items
- [ ] Checkout redirects to Stripe
- [ ] Complete test purchase (use Stripe test card: `4242 4242 4242 4242`)
- [ ] Verify order saved to database
- [ ] Verify webhook received and processed
- [ ] Check Sentry for errors
- [ ] Check GA4 for events

### 3. Merge to Main
```bash
# Merge feature branch to main
git checkout main
git merge feature/your-feature
git push origin main

# Vercel automatically deploys to production
```

### 4. Production Smoke Tests
- [ ] Homepage loads (`https://benchbarrier.vercel.app`)
- [ ] Product page loads (`/products/bb_bench_cover_pro`)
- [ ] Add to cart works
- [ ] Checkout flow works
- [ ] Health check endpoint responds (`/api/health`)
- [ ] Webhook endpoint responds to Stripe test event

### 5. Live Purchase Test
- [ ] Complete real purchase with live Stripe (use low-cost product)
- [ ] Verify order saved to database
- [ ] Verify webhook processed correctly
- [ ] Verify email sent (if configured)
- [ ] Verify analytics event tracked

---

## Post-Deployment Verification

### Immediate (0-15 minutes)
- [ ] Check Vercel deployment logs for errors
- [ ] Check Sentry for new errors
- [ ] Check GA4 Real-Time report for traffic
- [ ] Check uptime monitor status
- [ ] Verify health check endpoint (`/api/health`)

### Short-term (15 minutes - 1 hour)
- [ ] Monitor error rate in Sentry
- [ ] Monitor Web Vitals in Vercel Analytics
- [ ] Check Stripe webhook delivery logs
- [ ] Verify database writes (orders table)

### Medium-term (1-24 hours)
- [ ] Review GA4 funnel metrics
- [ ] Review conversion rate
- [ ] Check for any user-reported issues
- [ ] Monitor server response times

---

## Rollback Plan

### Instant Rollback (Vercel)
1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find previous stable deployment
4. Click "Promote to Production"
5. Confirm rollback

**Rollback Time:** < 1 minute

### Database Rollback
- **Note:** Database migrations are forward-only
- If data corruption occurs, restore from backup
- Coordinate with Supabase support if needed

### Stripe Rollback
- **Note:** Stripe configuration changes are not rolled back
- Webhooks continue to work with previous deployment
- No action needed for Stripe

---

## Emergency Contacts

### Services
- **Vercel Support:** support@vercel.com
- **Supabase Support:** support@supabase.com
- **Stripe Support:** support@stripe.com
- **Sentry Support:** support@sentry.io

### Team
- **Technical Lead:** [Name] - [Email] - [Phone]
- **Product Owner:** [Name] - [Email] - [Phone]
- **On-Call Engineer:** [Name] - [Email] - [Phone]

---

## Deployment History

| Date | Version | Deployed By | Changes | Status |
|------|---------|-------------|---------|--------|
| 2026-01-05 | 1.0.0 | System | Initial production deployment | ✅ Success |

---

## Post-Deployment Tasks

### Within 24 Hours
- [ ] Send launch announcement email
- [ ] Post launch announcement on social media
- [ ] Monitor analytics for baseline metrics
- [ ] Document any issues encountered

### Within 1 Week
- [ ] Review error logs and fix critical issues
- [ ] Optimize slow queries (if any)
- [ ] Review Web Vitals and optimize
- [ ] Gather user feedback

### Within 1 Month
- [ ] Conduct full security audit
- [ ] Review and optimize infrastructure costs
- [ ] Plan next sprint based on user feedback
- [ ] Update documentation with learnings

---

## Success Criteria

### Technical
- ✅ Zero critical errors in first 24 hours
- ✅ p95 page load time < 2 seconds
- ✅ Uptime > 99.9%
- ✅ Checkout success rate > 90%

### Business
- ✅ At least 1 successful purchase in first 24 hours
- ✅ Analytics tracking all key events
- ✅ Email notifications working
- ✅ Customer support ready

---

**Deployment Approved By:** _________________  
**Date:** _________________  
**Signature:** _________________
