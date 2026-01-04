# BenchBarrier Quick Reference Card

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:3000
```

---

## 🔑 API Keys (Test Mode)

### Supabase
```
URL: https://ylfgahoeddxynelezlhw.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmdhaG9lZGR4eW5lbGV6bGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzE5OTMsImV4cCI6MjA4MzA0Nzk5M30.gE0Of9-Rz4f72OMWobXuIeoyZHkfFN84HlzfrM9D5dI
```

### Stripe
```
Publishable: pk_test_51SliTfDJGc3SYHjNRlsUMZwsxOTxORAG9uoY8wLyZxtr0yatL4eiXDykfbGqi6sfEVKJZubBQTnaJCKE170sM1o400MhS95vc0
Secret: sk_test_51SliTfDJGc3SYHjNWoJnNTFL1tKqP6ECnaR0qfzndNLYzdwC8wvOk8s1wZYinm9Nh9SbJuyT5CkQ1to4Eg8TS4q0000TmkpFwy
```

---

## 📦 Products

| ID | Name | Price | Stripe ID |
|----|------|-------|-----------|
| bb_bench_cover_pro | Bench Cover Pro | $49.99 | prod_TjQzKdRKzHKZHE |
| bb_bench_cover_standard | Standard Bench Cover | $34.99 | prod_TjQzVakXR16wzn |
| bb_mat_protector_elite | Elite Mat Protector | $79.99 | prod_TjR0zg0mMVhkjK |
| bb_mat_protector_quick_clean | Quick-Clean Mat Shield | $59.99 | prod_TjR03Oqbrt0uVm |
| bb_towel_set_portable | Portable Gym Towel Set | $39.99 | prod_TjR1Y1WfDbEOEW |
| bb_gym_bag_premium | Premium Gym Bag Bundle | $89.99 | prod_TjR2fmozAGj7mw |
| bb_bundle_team_5pack | Team Bundle - 5 Covers | $199.99 | prod_TjR27zz2qyZCIt |
| bb_bundle_protection_premium | Premium Protection Package | $299.99 | prod_TjR3qFxTiFQg7r |

---

## 🧪 Test Cards

```
Visa:       4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
Amex:       3782 822463 10005

CVC: Any 3 digits
Expiry: Any future date
```

---

## 📝 NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

---

## 🗄️ Database Setup

1. Go to: https://supabase.com/dashboard/project/ylfgahoeddxynelezlhw/sql
2. Copy contents of `supabase-schema.sql`
3. Paste and run in SQL Editor

---

## 🌐 Deployment URLs

- **Vercel:** https://benchbarrier.vercel.app
- **Supabase:** https://ylfgahoeddxynelezlhw.supabase.co
- **Stripe Dashboard:** https://dashboard.stripe.com/test/dashboard

---

## 📁 Key Files

```
app/
├── layout.tsx              # Root layout with navbar/footer
├── page.tsx                # Homepage with video backgrounds
├── globals.css             # Brutalist design system
├── actions/stripe.ts       # Stripe checkout actions
├── products/page.tsx       # Product catalog
├── cart/page.tsx           # Shopping cart
├── student-discount/       # Student discount page
└── team-orders/            # Team orders page

components/
├── navbar.tsx              # Burger menu navigation
├── footer.tsx              # Split-color logo footer
└── product-card.tsx        # Product display card

lib/
├── products.ts             # Product catalog data
├── cart-context.tsx        # Cart state management
├── stripe.ts               # Stripe initialization
├── supabase.ts             # Supabase client
└── utils.ts                # Utility functions
```

---

## 🎨 Design System

```css
/* Colors */
Background: stone-950 (#0c0a09)
Accent: blue-500 (#3b82f6)
Text: stone-50 (#fafaf9)

/* Typography */
Font: JetBrains Mono (monospace)
Headings: UPPERCASE, BOLD, TRACKING-TIGHT
Body: UPPERCASE

/* Shapes */
Borders: 2-4px solid
Corners: ZERO ROUNDING (rounded-none)
Contrast: HIGH
```

---

## 🔧 Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables not loading
```bash
# Restart dev server after changing .env.local
npm run dev
```

### Supabase connection error
- Verify URL and anon key in `.env.local`
- Check Supabase project is active

### Stripe checkout error
- Verify secret key in `.env.local`
- Check you're in test mode
- Use test card numbers

---

## 📚 Documentation

- **Full Configuration:** `CONFIGURATION_GUIDE.md`
- **Deployment:** `DEPLOYMENT_GUIDE.md`
- **Project Summary:** `PROJECT_SUMMARY.md`
- **Implementation:** `IMPLEMENTATION_COMPLETE.md`

---

**Status:** ✅ Fully Configured  
**Mode:** Test Environment  
**Last Updated:** January 4, 2026
