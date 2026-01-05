# 🔍 Deployment Investigation Tool - Usage Guide

## What is this?

The Ultimate Platform Deployment Investigation & Comprehensive Auditing Tool helps you diagnose why your platform isn't working despite successful deployment. It's like having a DevOps expert systematically check every possible failure point.

## When to use it?

- ✅ Site deployed successfully but returns errors
- ✅ Build passes but pages don't load
- ✅ Works locally but fails in production
- ✅ Deployment succeeded but features are broken
- ✅ Need to verify deployment health
- ✅ Troubleshooting production issues

## Quick Start

### 1. Run Basic Investigation

```bash
npm run investigate
```

This runs a complete diagnostic check on your local environment.

### 2. Investigate Production Site

```bash
npm run investigate:production
```

This checks your production deployment on Vercel.

### 3. Custom Investigation

```bash
# Bash version
./scripts/deployment-investigation.sh yourdomain.com vercel

# TypeScript version
npm run investigate:ts yourdomain.com vercel
```

## What gets checked?

The tool performs **10 comprehensive investigation phases**:

### ✅ Phase 1: Deployment Verification
- Git status and commit verification
- Node.js and npm versions
- Dependencies installation
- Build artifacts
- Environment variables

### 🌐 Phase 2: Network & Connectivity
- DNS resolution
- Domain accessibility
- SSL/TLS certificates
- Network interfaces

### ⚙️ Phase 3: Application Runtime
- Running processes
- Listening ports
- Application logs
- Resource usage

### 💾 Phase 4: Data Layer
- Database configuration
- Supabase/Prisma setup
- Connection strings
- Migration status

### 🏗️ Phase 5: Infrastructure
- Platform configuration (Vercel/Netlify/Docker/K8s)
- CI/CD setup
- Disk space
- Memory usage

### 🎨 Phase 6: Frontend
- Framework detection
- TypeScript setup
- Styling (Tailwind)
- Static assets

### 📋 Phase 7: Configuration
- App structure
- API routes
- Linting setup
- Documentation

### 📊 Phase 8: Monitoring
- Error tracking (Sentry)
- Analytics
- Logging

### 🔒 Phase 9: Security
- Secret management
- Authentication
- CORS
- Best practices

### 📦 Phase 10: Dependencies
- Package status
- Security vulnerabilities
- Third-party services

## Reading the Report

Reports are saved to: `deployment-investigation-reports/`

### Status Indicators

- ✅ **Success (Green)** - Everything working correctly
- ⚠️ **Warning (Yellow)** - Non-critical issue to review
- ❌ **Error (Red)** - Critical issue requiring immediate fix
- ℹ️ **Info (Blue)** - Informational only

### Example Output

```
✅ Git repository detected
✅ Node.js v20.10.0 detected
✅ npm 10.2.3 detected
❌ node_modules not found - run npm install
⚠️ No build output directory found
❌ .env.local not found
✅ Supabase configuration detected
```

## Common Issues & Quick Fixes

### ❌ Dependencies Not Installed

```bash
npm install
npm run build
```

### ❌ Environment Variables Missing

```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### ❌ Build Output Missing

```bash
rm -rf .next node_modules
npm install
npm run build
```

### ❌ Port Not Listening

```bash
# Kill existing processes
pkill -f "node.*next"
# Start fresh
npm run dev
```

### ❌ Database Connection Failed

Verify your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Integration with CI/CD

### GitHub Actions

Copy `.github/workflows/deployment-investigation.yml.example` to `.github/workflows/deployment-investigation.yml` and customize:

```yaml
on:
  deployment_status:
  workflow_dispatch:
```

This will:
- ✅ Run after every deployment
- ✅ Upload reports as artifacts
- ✅ Comment on PRs with results
- ✅ Create issues on critical failures
- ✅ Send Slack notifications (optional)

### Manual Trigger

You can manually trigger investigation from GitHub Actions UI:
1. Go to Actions tab
2. Select "Post-Deployment Investigation"
3. Click "Run workflow"
4. Enter domain and platform

## Advanced Usage

### Compare Reports

Save a baseline when everything works:

```bash
npm run investigate
cp deployment-investigation-reports/latest.md baseline-report.md
```

Compare against current state:

```bash
npm run investigate
diff baseline-report.md deployment-investigation-reports/latest.md
```

### Platform-Specific Investigation

```bash
# Vercel
./scripts/deployment-investigation.sh myapp.vercel.app vercel

# Netlify
./scripts/deployment-investigation.sh myapp.netlify.app netlify

# Docker
./scripts/deployment-investigation.sh localhost:8080 docker

# Kubernetes
./scripts/deployment-investigation.sh myapp.k8s.local kubernetes
```

### TypeScript API

Use programmatically in your Node.js scripts:

```typescript
import { DeploymentInvestigator } from './scripts/deployment-diagnostics';

const investigator = new DeploymentInvestigator('yourdomain.com', 'vercel');
await investigator.investigate();
```

## Troubleshooting the Tool

### Script won't run

```bash
# Make executable
chmod +x scripts/deployment-investigation.sh

# Run with bash explicitly
bash scripts/deployment-investigation.sh
```

### Missing commands

The tool uses common utilities. Install if missing:

```bash
# Ubuntu/Debian
sudo apt-get install git nodejs npm curl dnsutils openssl

# macOS
brew install git node curl bind openssl
```

## Reports & Artifacts

### Report Structure

Each report includes:
1. Executive summary
2. Phase-by-phase findings
3. Root cause checklist
4. Recommended actions
5. Quick fix commands

### Artifact Retention

- **CI/CD reports**: 30 days
- **Health checks**: 7 days
- **Local reports**: Keep indefinitely

## Best Practices

1. **Run before production deploy**
   ```bash
   npm run build && npm run investigate && deploy
   ```

2. **Save baseline reports** when everything works

3. **Compare against baseline** when issues occur

4. **Automate in CI/CD** for early detection

5. **Share reports** when asking for help

## Documentation

- **Full Guide**: `docs/DEPLOYMENT_INVESTIGATION.md`
- **Quick Reference**: `docs/DEPLOYMENT_INVESTIGATION_QUICK_REFERENCE.md`
- **Workflow Example**: `.github/workflows/deployment-investigation.yml.example`

## Support

If the investigation tool doesn't help:
1. Review the generated report carefully
2. Check all ❌ errors and ⚠️ warnings
3. Try suggested quick fixes
4. Share the report when asking for help

---

**Tool Version:** 1.0.0  
**Last Updated:** January 2026  
**Maintainer:** BenchBarrier Team
