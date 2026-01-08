# BenchBarrier E-Commerce Platform

> Clinical-grade gym equipment protection with brutalist design aesthetic

## 🎨 Design Philosophy

**Brutalist E-Commerce** - A high-performance Next.js application featuring:
- **Stone-950 backgrounds** (near black)
- **Blue-500 accents** (Cobalt #3b82f6)
- **Monospace typography** (JetBrains Mono)
- **Zero rounded corners** - Sharp, clinical aesthetic
- **High contrast** - Technical precision

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase and Stripe keys to .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (Brutalist customization)
- **UI Components:** shadcn/ui (customized, no rounding)
- **Backend:** Supabase (PostgreSQL)
- **Payments:** Stripe Checkout
- **State:** React Context API + LocalStorage
- **Language:** TypeScript

## 🏗️ Project Structure

```
benchbarrier/
├── app/
│   ├── actions/
│   │   └── stripe.ts          # Server actions for Stripe
│   ├── about/
│   │   └── page.tsx           # About page
│   ├── cart/
│   │   └── page.tsx           # Shopping cart
│   ├── products/
│   │   └── page.tsx           # Product catalog
│   ├── student-discount/
│   │   └── page.tsx           # Student discount (20% off)
│   ├── team-orders/
│   │   └── page.tsx           # Team/bulk orders
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Brutalist design system
├── components/
│   ├── navbar.tsx             # Burger menu navigation
│   ├── footer.tsx             # Split-color logo footer
│   ├── product-card.tsx       # Product display card
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── products.ts            # Product catalog (8 SKUs)
│   ├── cart-context.tsx       # Cart state management
│   ├── stripe.ts              # Stripe initialization
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Utility functions
├── public/
│   └── media/                 # Images and videos
├── supabase-schema.sql        # Database schema
├── CONFIGURATION_GUIDE.md     # Full configuration docs
├── QUICK_REFERENCE.md         # Quick reference card
└── DEPLOYMENT_GUIDE.md        # Deployment instructions
```

## 🛍️ Features

### Core E-Commerce
- ✅ 8 SKU product catalog
- ✅ Shopping cart with LocalStorage persistence
- ✅ Stripe Checkout integration
- ✅ Real-time cart totals
- ✅ Quantity management

### Special Pages
- ✅ Student discount (20% off with .edu email)
- ✅ Team/bulk orders with volume pricing
- ✅ About page with mission and specs

### Design Features
- ✅ Video backgrounds on homepage
- ✅ Burger menu navigation
- ✅ Responsive grid layouts
- ✅ High-contrast brutalist aesthetic
- ✅ Zero rounded corners (enforced globally)

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ylfgahoeddxynelezlhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**See `CONFIGURATION_GUIDE.md` for full setup instructions.**

### Database Setup

1. Go to Supabase SQL Editor
2. Run `supabase-schema.sql`
3. Verify tables created

### Stripe Products

8 products configured in Stripe Dashboard:

| Product | Price | Stripe ID |
|---------|-------|-----------|
| Bench Cover Pro | $49.99 | prod_TjQzKdRKzHKZHE |
| Standard Bench Cover | $34.99 | prod_TjQzVakXR16wzn |
| Elite Mat Protector | $79.99 | prod_TjR0zg0mMVhkjK |
| Quick-Clean Mat Shield | $59.99 | prod_TjR03Oqbrt0uVm |
| Portable Gym Towel Set | $39.99 | prod_TjR1Y1WfDbEOEW |
| Premium Gym Bag Bundle | $89.99 | prod_TjR2fmozAGj7mw |
| Team Bundle - 5 Covers | $199.99 | prod_TjR27zz2qyZCIt |
| Premium Protection Package | $299.99 | prod_TjR3qFxTiFQg7r |

## 🧪 Testing

### Test Stripe Checkout

Use these test card numbers:

```
Visa:       4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
Amex:       3782 822463 10005

CVC: Any 3 digits
Expiry: Any future date
```

### Run Tests

```bash
npm run build        # Build for production
npm run type-check   # TypeScript validation
npm run lint         # ESLint
```

## 📝 NPM Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Import to Vercel**
3. **Add environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. **Deploy**

**See `DEPLOYMENT_GUIDE.md` for detailed instructions.**

## 🎨 Design System

### Colors
```css
Background: stone-950 (#0c0a09)
Accent: blue-500 (#3b82f6)
Text: stone-50 (#fafaf9)
Border: stone-800 (#292524)
```

### Typography
```css
Font Family: JetBrains Mono (monospace)
Headings: UPPERCASE, BOLD, TRACKING-TIGHT
Body: UPPERCASE
```

### Layout
```css
Borders: 2-4px solid
Corners: ZERO ROUNDING (rounded-none)
Spacing: Consistent 4/8/16/24px grid
Contrast: HIGH (WCAG AAA)
```

## 📚 Documentation

- **`QUICK_REFERENCE.md`** - Quick reference card with API keys and commands
- **`CONFIGURATION_GUIDE.md`** - Complete Supabase and Stripe setup
- **`DEPLOYMENT_GUIDE.md`** - Deployment instructions for Vercel
- **`PROJECT_SUMMARY.md`** - Detailed feature list and architecture
- **`IMPLEMENTATION_COMPLETE.md`** - Implementation checklist
- **`docs/DEPLOYMENT_INVESTIGATION.md`** - 🔍 **NEW!** Comprehensive deployment diagnostic tool
- **`docs/DEPLOYMENT_INVESTIGATION_USAGE.md`** - Quick start guide for investigation tool
- **`docs/DEPLOYMENT_INVESTIGATION_QUICK_REFERENCE.md`** - Quick reference for common issues

## 🔒 Security

- ✅ Environment variables for sensitive keys
- ✅ Server-side Stripe operations
- ✅ Supabase Row Level Security (RLS)
- ✅ Client-side cart validation
- ✅ HTTPS enforced in production

## 🐛 Troubleshooting

### Deployment Issues? Use Our Investigation Tool! 🔍

If your site deploys successfully but doesn't work, run our comprehensive diagnostic tool:

```bash
# Quick investigation
npm run investigate

# Production site investigation
npm run investigate:production

# Custom domain/platform
./scripts/deployment-investigation.sh yourdomain.com vercel
```

The tool checks 10 critical areas:
- ✅ Deployment verification & build artifacts
- ✅ Network connectivity & DNS
- ✅ Application runtime & processes
- ✅ Database & data layer
- ✅ Infrastructure & platform config
- ✅ Frontend & static assets
- ✅ Configuration & code structure
- ✅ Monitoring & observability
- ✅ Security & access control
- ✅ Dependencies & vulnerabilities

**Full documentation:** `docs/DEPLOYMENT_INVESTIGATION.md`

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Loading

```bash
# Restart dev server after changing .env.local
npm run dev
```

### Supabase Connection Error

- Verify URL and anon key in `.env.local`
- Check Supabase project is active
- Verify RLS policies

### Stripe Checkout Error

- Verify secret key in `.env.local`
- Check you're in test mode
- Use test card numbers

## 📦 Product Catalog

### Protection (4 products)
- Bench Cover Pro ($49.99)
- Standard Bench Cover ($34.99)
- Elite Mat Protector ($79.99)
- Quick-Clean Mat Shield ($59.99)

### Accessories (1 product)
- Portable Gym Towel Set ($39.99)

### Bundles (3 products)
- Premium Gym Bag Bundle ($89.99)
- Team Bundle - 5 Covers ($199.99)
- Premium Protection Package ($299.99)

## 🌐 Architecture

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

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run build && npm run type-check`
5. Submit a pull request

## 📞 Support

- **Documentation:** See `/docs` folder
- **Issues:** GitHub Issues
- **Email:** contact@benchbarrier.com

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** January 4, 2026  
**Framework:** Next.js 16.1.1 (App Router)  
**Design:** Brutalist E-Commerce Platform
