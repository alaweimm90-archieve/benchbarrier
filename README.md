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
# Add your Stripe keys to .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (Brutalist customization)
- **UI Components:** shadcn/ui (customized, no rounding)
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
│   │   └── page.tsx           # Bulk ordering
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage (video backgrounds)
│   └── globals.css            # Brutalist design system
├── components/
│   ├── navbar.tsx             # Navigation with burger menu
│   ├── footer.tsx             # Footer with split-color logo
│   ├── product-card.tsx       # Product display card
│   └── ui/                    # shadcn components
├── lib/
│   ├── products.ts            # Product data (8 SKUs)
│   ├── cart-context.tsx       # Cart state management
│   ├── stripe.ts              # Stripe initialization
│   └── utils.ts               # Utility functions
├── public/
│   └── media/                 # Images and videos
└── next.config.js             # Next.js configuration
```

## 🛍️ Features

### Core E-Commerce
- ✅ Product catalog with 8 SKUs
- ✅ Shopping cart with LocalStorage persistence
- ✅ Stripe Checkout integration
- ✅ Category filtering (Protection, Accessories, Bundles)

### Special Pages
- ✅ Student Discount (20% off with .edu email)
- ✅ Team/Bulk Orders (volume pricing)
- ✅ About page (mission, specs, story)

### Design Features
- ✅ Video backgrounds (homepage sections)
- ✅ Responsive burger menu
- ✅ Split-color logo in footer
- ✅ Zero rounded corners (enforced globally)
- ✅ High-contrast brutalist aesthetic

## 🎯 Product SKUs

1. **BenchBarrier Standard** - $29.99
2. **BenchBarrier Premium** - $49.99
3. **Gym Towel Set** - $24.99
4. **Gym Bag Bundle** - $69.99
5. **BenchBarrier Pro Pack** - $79.99
6. **Grip Enhancer Spray** - $14.99
7. **Equipment Cleaner Kit** - $19.99
8. **Elite Complete Bundle** - $129.99

## 🔧 Environment Variables

Create `.env.local` with:

```env
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📹 Media Assets

Place in `public/media/`:
- Product images (8 JPGs)
- `Rio_BenchBarrier.mp4` (hero video)
- `Stephanie_Lingerie.mp4` (demo video)

## 🎨 Design System

### Colors
- Background: `stone-950` (#0c0a09)
- Text: `stone-50` (#fafaf9)
- Accent: `blue-500` (#3b82f6)
- Borders: `stone-800` (#292524)

### Typography
- Font: JetBrains Mono (monospace)
- Headings: Uppercase, bold, tracking-tight
- Body: Uppercase

### Components
- Buttons: `.btn-brutalist`, `.btn-brutalist-outline`
- Cards: `.card-brutalist`
- Inputs: `.input-brutalist`
- **All elements:** `border-radius: 0 !important`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Environment Variables (Production)
Set in Vercel dashboard:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL`

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

## 🧪 Testing

Build verification:
```bash
npm run build
npm run start
```

## 🔒 Security

- Server-side Stripe integration
- No client-side secret keys
- Environment variable validation
- Secure checkout flow

## 📄 License

MIT License - See LICENSE file for details

---

**Status:** Production Ready  
**Last Updated:** January 4, 2026  
**Framework:** Next.js 16 with App Router
