# BenchBarrier Deployment Guide

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd benchbarrier

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

Visit `http://localhost:5173` to see the application.

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Stripe Payment Gateway
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_SECRET_KEY=sk_test_...

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_PUBLIC_KEY=...

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-...

# Optional: API Endpoints
VITE_API_BASE_URL=https://api.benchbarrier.com
```

### Environment-Specific Configurations

#### Development
```env
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
```

#### Staging
```env
NODE_ENV=staging
VITE_API_BASE_URL=https://staging-api.benchbarrier.com
```

#### Production
```env
NODE_ENV=production
VITE_API_BASE_URL=https://api.benchbarrier.com
```

## Build Process

### Development Build

```bash
npm run build:dev
```

This creates a development build with source maps and debugging enabled.

### Production Build

```bash
npm run build
```

This creates an optimized production build:
- Minified JavaScript and CSS
- Tree-shaking to remove unused code
- Code splitting for optimal loading
- Asset optimization

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── index-[hash].css     # Main CSS bundle
│   └── [component]-[hash].js # Code-split chunks
├── index.html               # Entry HTML file
├── manifest.json            # PWA manifest
├── sw.js                    # Service worker
├── robots.txt              # SEO robots file
└── sitemap.xml             # SEO sitemap
```

## Deployment Platforms

### Vercel (Recommended)

#### Automatic Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Settings → Environment Variables

4. **Custom Domain**
   - Settings → Domains
   - Add your custom domain
   - Configure DNS records

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Netlify

#### Automatic Deployment

1. **Connect Repository**
   - Go to Netlify dashboard
   - New site from Git
   - Select repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add all environment variables

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/*.css"
  [headers.values]
    Content-Type = "text/css; charset=utf-8"
```

### AWS S3 + CloudFront

#### Setup Steps

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://benchbarrier-app
   ```

2. **Configure Bucket for Static Hosting**
   ```bash
   aws s3 website s3://benchbarrier-app \
     --index-document index.html \
     --error-document index.html
   ```

3. **Build and Upload**
   ```bash
   npm run build
   aws s3 sync dist/ s3://benchbarrier-app --delete
   ```

4. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 → /index.html (200)

5. **Configure Custom Domain**
   - Add CNAME record pointing to CloudFront distribution
   - Add SSL certificate via ACM

### Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### Build and Run

```bash
# Build image
docker build -t benchbarrier:latest .

# Run container
docker run -d -p 80:80 benchbarrier:latest

# Or use docker-compose
docker-compose up -d
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          VITE_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Performance Optimization

### Build Optimization

1. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports for heavy components

2. **Asset Optimization**
   - Image compression
   - Font subsetting
   - SVG optimization

3. **Bundle Analysis**
   ```bash
   npm run build -- --mode analyze
   ```

### Runtime Optimization

1. **Lazy Loading**
   - Images below fold
   - Non-critical components
   - Third-party scripts

2. **Caching Strategy**
   - Service worker for offline support
   - CDN caching for static assets
   - Browser caching headers

3. **Performance Monitoring**
   - Core Web Vitals tracking
   - Real User Monitoring (RUM)
   - Synthetic monitoring

## Security Considerations

### HTTPS

Always use HTTPS in production:
- Vercel/Netlify: Automatic SSL
- AWS: Use ACM certificates
- Custom: Let's Encrypt

### Environment Variables

- Never commit `.env` files
- Use platform-specific secret management
- Rotate keys regularly

### Content Security Policy

Add CSP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com;
```

### Security Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Monitoring & Logging

### Application Monitoring

- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay

### Performance Monitoring

- **Lighthouse CI**: Automated performance audits
- **WebPageTest**: Detailed performance analysis
- **Core Web Vitals**: Real user metrics

### Uptime Monitoring

- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **StatusCake**: Multi-location checks

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Netlify

```bash
# List deployments
netlify deploy:list

# Rollback via dashboard
# Deploys → Select deployment → Publish deploy
```

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

## Troubleshooting

### Build Failures

1. **Check Node version**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clear cache**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check environment variables**
   - Ensure all required variables are set
   - Check for typos in variable names

### Runtime Errors

1. **Check browser console**
   - Look for JavaScript errors
   - Check network requests

2. **Verify API endpoints**
   - Test API connectivity
   - Check CORS configuration

3. **Review logs**
   - Check platform logs (Vercel/Netlify)
   - Review error tracking (Sentry)

## Support

For deployment issues:
- Documentation: `/ARCHITECTURE.md`
- System Dashboard: `/system-dashboard`
- GitHub Issues: [repository]

---

**Last Updated**: January 3, 2026
**Version**: 2.0.0
