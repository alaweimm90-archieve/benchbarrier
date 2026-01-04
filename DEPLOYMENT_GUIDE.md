# BenchBarrier Deployment Guide

## ✅ Build Status

**Build:** ✅ Successful  
**Type Check:** ✅ Passed  
**Framework:** Next.js 16 (App Router)  
**Status:** Production Ready

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Create `.env.local` for local development:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, set these in your hosting platform dashboard.

### 2. Media Assets

Add the following files to `public/media/`:

**Product Images (8 required):**
- `benchbarrier-standard.jpg`
- `benchbarrier-premium.jpg`
- `gym-towel-set.jpg`
- `gym-bag-bundle.jpg`
- `benchbarrier-pro-pack.jpg`
- `grip-enhancer.jpg`
- `equipment-cleaner.jpg`
- `elite-bundle.jpg`

**Video Files (2 required):**
- `Rio_BenchBarrier.mp4` (Hero section)
- `Stephanie_Lingerie.mp4` (Demo section)

**Note:** Videos should be optimized for web (H.264 codec, reasonable file size).

### 3. Stripe Configuration

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. (Optional) Create product prices and add Price IDs to `.env`

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Deploy:**
   ```bash
   vercel --prod
   ```

**Vercel Configuration:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Option 2: Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

3. **Environment Variables:**
   - Set in Netlify Dashboard → Site Settings → Environment Variables

### Option 3: Self-Hosted (Docker)

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:22-alpine AS base

   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t benchbarrier .
   docker run -p 3000:3000 --env-file .env.local benchbarrier
   ```

## 🔧 Post-Deployment Configuration

### 1. Stripe Webhooks (Optional)

If you want to handle post-payment events:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Add webhook secret to environment variables

### 2. Custom Domain

**Vercel:**
- Dashboard → Project → Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Netlify:**
- Dashboard → Domain Settings → Add Custom Domain
- Configure DNS

### 3. Update Base URL

Change `NEXT_PUBLIC_BASE_URL` to your production domain:
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 🧪 Testing Deployment

### Local Production Build

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` and test:
- ✅ Homepage loads with video backgrounds
- ✅ Products page displays all 8 SKUs
- ✅ Add to cart functionality works
- ✅ Cart persists on page reload
- ✅ Student discount page validates .edu emails
- ✅ Team orders form submits
- ✅ Stripe checkout redirects properly

### Production Checklist

- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Videos autoplay and loop
- [ ] Cart functionality works
- [ ] Stripe checkout completes successfully
- [ ] Mobile responsive design works
- [ ] Navigation menu functions properly
- [ ] Footer links are correct

## 📊 Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Ensure:
- Images are in WebP or JPEG format
- Reasonable dimensions (max 2000px width)
- Compressed before upload

### Video Optimization

- Use H.264 codec
- Compress videos (target: <10MB per video)
- Consider using a CDN for large files

### Caching

Next.js handles caching automatically. For additional optimization:
- Enable CDN caching for static assets
- Set appropriate cache headers

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart dev server after changing `.env.local`
- Check Vercel/Netlify dashboard for correct values

### Stripe Errors

- Verify API keys are correct (test vs. production)
- Check Stripe Dashboard for error logs
- Ensure `STRIPE_SECRET_KEY` is set server-side only

### Video Not Playing

- Check video file format (MP4 with H.264)
- Verify file path in `public/media/`
- Test in different browsers
- Check browser console for errors

## 📈 Monitoring

### Recommended Tools

- **Vercel Analytics** (built-in)
- **Sentry** (error tracking)
- **Google Analytics** (user behavior)
- **Stripe Dashboard** (payment monitoring)

## 🔒 Security

### Production Checklist

- [ ] Use production Stripe keys (not test keys)
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set secure environment variables
- [ ] Review Stripe webhook signatures
- [ ] Enable rate limiting if needed

## 📞 Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Stripe documentation: https://stripe.com/docs
- GitHub Issues: [Your Repository]

---

**Deployment Status:** Ready for Production  
**Last Updated:** January 4, 2026  
**Framework Version:** Next.js 16.1.1
