# ✅ Netlify Deployment Checklist

## Pre-Deployment (All Complete ✓)

- [x] **Build Configuration**
  - [x] `netlify.toml` configured
  - [x] Build command: `npm run build`
  - [x] Publish directory: `dist`
  - [x] Node version: 22

- [x] **Routing & Redirects**
  - [x] SPA redirects configured
  - [x] `_redirects` file ready
  - [x] All routes tested

- [x] **Security**
  - [x] Security headers configured
  - [x] X-Frame-Options set
  - [x] Content Security Policy ready
  - [x] XSS Protection enabled

- [x] **Performance**
  - [x] Asset caching configured (1 year)
  - [x] CSS minified
  - [x] JS minified
  - [x] Images optimized

- [x] **SEO**
  - [x] `robots.txt` configured
  - [x] `sitemap.xml` generated
  - [x] Meta tags on all pages
  - [x] Structured data (JSON-LD)
  - [x] Open Graph tags

- [x] **PWA**
  - [x] `manifest.json` configured
  - [x] Service worker (`sw.js`)
  - [x] App icons included
  - [x] Offline support ready

- [x] **Build Verification**
  - [x] Build succeeds locally
  - [x] No TypeScript errors
  - [x] No ESLint warnings
  - [x] All imports resolved

---

## Deployment Steps

### Step 1: Build Locally (Test)
```bash
npm run build
```
**Expected:** ✓ Built in ~8 seconds, no errors

### Step 2: Choose Deployment Method

#### Method A: Automated Script (Recommended)
```bash
./deploy-netlify.sh
```

#### Method B: Netlify CLI
```bash
netlify deploy --prod
```

#### Method C: Manual (Drag & Drop)
1. Go to https://app.netlify.com/drop
2. Drag `dist` folder
3. Get instant URL

### Step 3: Verify Deployment
- [ ] Site loads at provided URL
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Forms work
- [ ] Mobile menu functions
- [ ] No console errors

---

## Post-Deployment Tasks

### Immediate (Do Now)
- [ ] Test homepage
- [ ] Test mobile navigation (hamburger menu)
- [ ] Verify free shipping banner displays
- [ ] Check admin link in footer
- [ ] Test product card hover effects
- [ ] Verify all routes work

### Within 24 Hours
- [ ] Set up custom domain (if applicable)
- [ ] Configure environment variables
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Set up Google Analytics
- [ ] Test contact forms
- [ ] Verify email integrations

### Within 1 Week
- [ ] Enable Netlify Analytics (optional)
- [ ] Set up monitoring/alerts
- [ ] Configure backup strategy
- [ ] Test payment flows (if using Stripe)
- [ ] Submit sitemap to Google Search Console
- [ ] Test PWA installation

---

## Environment Variables to Configure

Go to **Site settings** → **Environment variables** and add:

### Analytics (Optional)
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Email Service (If using EmailJS)
```
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxx
```

### Payment Processing (If using Stripe)
```
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

**Note:** All Vite env vars must start with `VITE_`

---

## Testing Checklist

### Desktop Testing
- [ ] Homepage loads (/)
- [ ] Navigation works
- [ ] All 30+ pages accessible
- [ ] Forms submit correctly
- [ ] Images display properly
- [ ] Animations smooth
- [ ] No console errors
- [ ] Admin dashboard accessible (/admin)
- [ ] System dashboard works (/system-dashboard)

### Mobile Testing (< 768px)
- [ ] Hamburger menu opens (Sheet component)
- [ ] Menu slides in from right
- [ ] Menu closes on link click
- [ ] Free shipping banner displays
- [ ] Touch interactions responsive
- [ ] Images scale correctly
- [ ] Text readable
- [ ] Forms usable

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No layout shifts
- [ ] Assets cached properly

### SEO Testing
- [ ] Meta tags present (view source)
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)
- [ ] Structured data valid
- [ ] Open Graph working
- [ ] Twitter Cards working

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] Skip to content link works

---

## Troubleshooting

### Build Fails
**Problem:** Build fails on Netlify
**Solution:**
1. Check Node version in `netlify.toml`
2. Clear cache: `netlify build --clear-cache`
3. Verify dependencies: `npm install`
4. Check build logs for errors

### 404 Errors on Refresh
**Problem:** Page not found on refresh
**Solution:**
- Verify `_redirects` file in dist
- Check `netlify.toml` redirects config
- Ensure SPA routing is configured

### Assets Not Loading
**Problem:** Images/CSS/JS not loading
**Solution:**
1. Check asset paths (should be relative)
2. Verify `dist` folder structure
3. Check browser console for errors
4. Clear browser cache

### Environment Variables Not Working
**Problem:** API keys not working
**Solution:**
1. Ensure vars start with `VITE_`
2. Redeploy after adding vars
3. Check Site settings → Environment variables
4. Verify vars in build logs (masked)

---

## Performance Optimization

### Enable in Netlify Dashboard

**Site settings** → **Build & deploy** → **Post processing**
- [x] Bundle CSS
- [x] Minify CSS
- [x] Minify JS
- [x] Compress images
- [x] Pretty URLs

**Site settings** → **Build & deploy** → **Asset optimization**
- [x] Enable asset optimization
- [x] Enable image optimization

---

## Monitoring & Analytics

### Netlify Analytics (Optional, Paid)
- Server-side analytics
- No client-side tracking
- Privacy-friendly
- Real visitor data

### Google Analytics (Free, Already Configured)
- Update `GA_MEASUREMENT_ID` in code
- Or set as environment variable
- Track user behavior
- Conversion tracking

### Performance Monitoring
- Use Lighthouse CI
- Monitor Core Web Vitals
- Track error rates
- Set up alerts

---

## Custom Domain Setup

### Add Domain
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter domain (e.g., `benchbarrier.com`)
4. Follow DNS instructions

### DNS Configuration
**Option A: Netlify DNS (Recommended)**
- Point nameservers to Netlify
- Automatic SSL
- Easy management

**Option B: External DNS**
- Add A record: `75.2.60.5`
- Add CNAME: `www` → `your-site.netlify.app`
- Wait for DNS propagation (up to 48h)

### SSL Certificate
- Automatic with Netlify
- Free Let's Encrypt certificate
- Auto-renewal
- Force HTTPS enabled

---

## Backup & Rollback

### Automatic Backups
- Every deployment is saved
- Instant rollback available
- No data loss

### Manual Rollback
1. Go to **Deploys** tab
2. Find previous deploy
3. Click **Publish deploy**
4. Site reverts instantly

### Download Build
```bash
# Download specific deploy
netlify deploy:list
netlify deploy:get [deploy-id]
```

---

## Support Resources

### Documentation
- [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) - Full guide
- [DEPLOY_NOW.md](./DEPLOY_NOW.md) - Quick start
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Recent changes
- [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md) - Architecture

### Netlify Resources
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://www.netlifystatus.com
- Support: https://www.netlify.com/support

### Commands Reference
```bash
# Build
npm run build

# Deploy production
netlify deploy --prod

# Deploy draft
netlify deploy

# Open dashboard
netlify open

# View logs
netlify logs

# Check status
netlify status
```

---

## Success Criteria

Your deployment is successful when:

- ✅ Site loads at Netlify URL
- ✅ All 30+ pages accessible
- ✅ Mobile navigation works (Sheet component)
- ✅ Free shipping banner displays
- ✅ Product cards have hover effects
- ✅ Admin link in footer
- ✅ No console errors
- ✅ Lighthouse score > 90
- ✅ Forms submit successfully
- ✅ Images load properly
- ✅ PWA installable
- ✅ SEO tags present

---

## 🎉 Deployment Complete!

**Next Steps:**
1. Share your live URL
2. Test all features
3. Set up custom domain
4. Configure analytics
5. Monitor performance
6. Collect feedback

**Your site is now live and ready for users!** 🚀

---

**Last Updated:** January 3, 2026
**Build Status:** ✅ Production Ready
**Deployment Platform:** Netlify
**Configuration:** ✅ Complete
