# Ultimate Platform Deployment Investigation & Comprehensive Auditing Tool

## Overview

This tool provides military-grade deployment diagnostics to investigate why a platform/website is not functioning despite successful deployment. It systematically examines 10 critical phases of deployment infrastructure and generates comprehensive reports.

## 🎯 Purpose

When your platform deploys successfully but doesn't work, this tool helps identify the root cause by:
- Examining deployment artifacts and build outputs
- Testing network connectivity and DNS configuration
- Analyzing application runtime status
- Verifying database and data layer health
- Checking infrastructure and platform configuration
- Investigating frontend and client-side issues
- Analyzing code and configuration
- Reviewing monitoring and observability setup
- Auditing security and access control
- Checking dependencies and third-party integrations

## 🚀 Quick Start

### Bash Script Version

```bash
# Basic usage - investigate current directory
./scripts/deployment-investigation.sh

# Investigate specific domain and platform
./scripts/deployment-investigation.sh yourdomain.com vercel

# Examples for different platforms
./scripts/deployment-investigation.sh myapp.netlify.app netlify
./scripts/deployment-investigation.sh myapp.example.com docker
./scripts/deployment-investigation.sh myapp.k8s.local kubernetes
```

### TypeScript/Node.js Version

```bash
# Run with ts-node
npx ts-node scripts/deployment-diagnostics.ts

# With specific domain and platform
npx ts-node scripts/deployment-diagnostics.ts yourdomain.com vercel

# Or add to package.json scripts
npm run investigate
npm run investigate:production
```

### npm Scripts (Recommended)

Add these to your `package.json`:

```json
{
  "scripts": {
    "investigate": "bash scripts/deployment-investigation.sh",
    "investigate:production": "bash scripts/deployment-investigation.sh yourdomain.com vercel",
    "investigate:ts": "ts-node scripts/deployment-diagnostics.ts"
  }
}
```

Then run:

```bash
npm run investigate
npm run investigate:production
```

## 📊 Investigation Phases

### Phase 1: Deployment Verification Deep Dive
- ✅ Git repository status and commit history
- ✅ Node.js and npm versions
- ✅ Package.json validation
- ✅ Lock file detection (npm, yarn, pnpm, bun)
- ✅ Dependency installation verification
- ✅ Build output validation
- ✅ Environment variable configuration
- ✅ Deployment artifacts integrity

**What it checks:**
- Exit codes from deployment
- Correct branch and commit SHA deployed
- Build artifacts completeness
- Environment configuration match

### Phase 2: Network & Connectivity Forensics
- ✅ DNS resolution and propagation
- ✅ HTTP/HTTPS accessibility
- ✅ SSL/TLS certificate validity
- ✅ Network interface configuration
- ✅ Port accessibility
- ✅ Domain reachability

**What it checks:**
- DNS records pointing to correct IPs
- CDN/proxy layer configuration
- SSL certificate chain and expiration
- Firewall and security group rules

### Phase 3: Application Runtime Analysis
- ✅ Running Node.js processes
- ✅ Port listening status (3000, 8080, 80, 443)
- ✅ Process health and state
- ✅ Application logs
- ✅ Resource utilization

**What it checks:**
- Application actually running vs crashed
- Correct ports and network interfaces
- Process restart loops
- Memory/CPU exhaustion

### Phase 4: Data Layer Examination
- ✅ Database configuration detection
- ✅ Supabase setup validation
- ✅ Prisma schema detection
- ✅ Connection string presence
- ✅ Migration status

**What it checks:**
- Database connectivity from application
- Connection pool configuration
- Migration state
- Cache layer connectivity

### Phase 5: Infrastructure & Platform Layer
- ✅ Platform-specific configuration (Vercel, Netlify, Docker, K8s)
- ✅ CI/CD pipeline configuration
- ✅ Disk space availability
- ✅ Memory usage
- ✅ Resource limits

**What it checks:**
- Cloud provider configurations
- Quota limits
- Storage volume mounts
- Secrets management access

### Phase 6: Frontend & Client-Side Investigation
- ✅ Framework detection (Next.js, Vite, Webpack)
- ✅ TypeScript configuration
- ✅ Styling setup (Tailwind CSS)
- ✅ Public assets presence
- ✅ Static file generation

**What it checks:**
- JavaScript compilation success
- Static assets availability
- CSS/styling compilation
- Browser compatibility setup

### Phase 7: Configuration & Code Analysis
- ✅ Application structure (App Router, Pages Router)
- ✅ API routes detection
- ✅ ESLint configuration
- ✅ Documentation presence
- ✅ Code organization

**What it checks:**
- Configuration drift from working state
- Feature flags
- Reverse proxy configuration
- API version compatibility

### Phase 8: Monitoring & Observability
- ✅ Error tracking setup (Sentry)
- ✅ Analytics configuration
- ✅ APM service detection
- ✅ Log file presence
- ✅ Monitoring service integration

**What it checks:**
- Distributed tracing availability
- Error tracking services
- Custom metrics
- Log aggregation

### Phase 9: Security & Access Control
- ✅ Secret management (env files not in git)
- ✅ HTTPS configuration
- ✅ Authentication system detection
- ✅ CORS configuration
- ✅ Security best practices

**What it checks:**
- Exposed secrets in repository
- WAF configuration
- Authentication service status
- API key rotation
- Certificate-based auth

### Phase 10: Dependency & Third-Party Analysis
- ✅ npm package status
- ✅ Security vulnerability audit
- ✅ Dependency conflicts
- ✅ External service dependencies
- ✅ CDN availability

**What it checks:**
- Outdated dependencies
- Security vulnerabilities
- External API dependencies
- Package registry issues
- Third-party service outages

## 📝 Report Output

### Report Locations

Reports are saved to: `deployment-investigation-reports/`

**Bash Script Output:**
- `investigation_YYYYMMDD_HHMMSS.md` - Detailed Markdown report

**TypeScript Script Output:**
- `investigation_YYYY-MM-DD.json` - Structured JSON data
- `investigation_YYYY-MM-DD.md` - Detailed Markdown report

### Report Contents

Each report includes:

1. **Executive Summary**
   - Domain and platform information
   - Timestamp and investigator details
   - Overall health status

2. **Phase-by-Phase Analysis**
   - Check results with status indicators (✅ ✗ ⚠️ ℹ️)
   - Command outputs and logs
   - Detailed findings

3. **Root Cause Analysis Checklist**
   - Configuration drift
   - Timing issues
   - Version mismatches
   - Environment parity
   - Silent failures
   - Cascading failures
   - Resource exhaustion
   - Permission issues
   - Clock skew
   - Geographic issues

4. **Recommendations**
   - Critical issues to fix immediately
   - Warnings to address
   - Best practices
   - Quick fix commands

5. **Next Steps**
   - Prioritized action items
   - Verification steps
   - Testing procedures

## 🔧 Advanced Usage

### Custom Domain Investigation

```bash
# Production site investigation
./scripts/deployment-investigation.sh production.example.com vercel

# Staging environment
./scripts/deployment-investigation.sh staging.example.com netlify

# Self-hosted
./scripts/deployment-investigation.sh app.company.com docker
```

### Platform-Specific Checks

The tool automatically adjusts checks based on platform:

**Vercel:**
- Checks for `vercel.json`
- Validates Vercel-specific configurations
- Checks Next.js optimization

**Netlify:**
- Checks for `netlify.toml` and `_redirects`
- Validates build commands
- Checks function deployments

**Docker:**
- Checks for `Dockerfile` and `docker-compose.yml`
- Validates container configuration
- Checks volume mounts

**Kubernetes:**
- Checks for `k8s/` or `kubernetes/` directory
- Validates pod configurations
- Checks service definitions

### Integration with CI/CD

Add to GitHub Actions workflow:

```yaml
name: Post-Deployment Investigation

on:
  deployment_status:

jobs:
  investigate:
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Deployment Investigation
        run: |
          chmod +x scripts/deployment-investigation.sh
          ./scripts/deployment-investigation.sh ${{ secrets.PRODUCTION_URL }} vercel
      
      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: investigation-report
          path: deployment-investigation-reports/
```

### Scheduled Health Checks

Run periodic investigations:

```yaml
name: Daily Health Check

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Investigation
        run: |
          chmod +x scripts/deployment-investigation.sh
          ./scripts/deployment-investigation.sh ${{ secrets.PRODUCTION_URL }} vercel
      
      - name: Notify on Issues
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Health Check Failed',
              body: 'Automated deployment investigation found issues. Check the workflow run for details.'
            });
```

## 🎯 Common Issues Detected

### 1. Build Artifacts Missing
**Symptom:** Deployment succeeds but site shows 404 or blank page
**Detection:** Phase 1 - No build output directory found
**Fix:** Run `npm run build` and verify `.next/` or `dist/` exists

### 2. Environment Variables Not Set
**Symptom:** Application crashes on startup
**Detection:** Phase 1 - `.env.local` not found or empty
**Fix:** Copy `.env.example` to `.env.local` and fill in values

### 3. Port Not Listening
**Symptom:** "Connection refused" errors
**Detection:** Phase 3 - No processes listening on expected ports
**Fix:** Check application startup logs, verify `PORT` environment variable

### 4. Database Connection Failed
**Symptom:** 500 errors on pages needing database
**Detection:** Phase 4 - Database configuration missing or invalid
**Fix:** Verify `DATABASE_URL` or Supabase credentials

### 5. DNS Not Propagated
**Symptom:** Domain not reachable
**Detection:** Phase 2 - DNS lookup fails
**Fix:** Wait for DNS propagation (up to 48 hours) or check DNS records

### 6. SSL Certificate Expired
**Symptom:** "Certificate invalid" warnings
**Detection:** Phase 2 - Certificate dates outside valid range
**Fix:** Renew SSL certificate through hosting provider

### 7. Node.js Version Mismatch
**Symptom:** Build succeeds locally but fails in production
**Detection:** Phase 1 - Node version different from `.nvmrc` or package.json `engines`
**Fix:** Specify Node version in platform config

### 8. Dependency Vulnerabilities
**Symptom:** Security warnings in production
**Detection:** Phase 10 - npm audit finds critical vulnerabilities
**Fix:** Run `npm audit fix` and update vulnerable packages

### 9. Static Assets Not Found
**Symptom:** Images, CSS, or JS files return 404
**Detection:** Phase 6 - Public directory missing or misconfigured
**Fix:** Verify `public/` directory exists and is deployed

### 10. Wrong Branch Deployed
**Symptom:** Old code is running in production
**Detection:** Phase 1 - Git commit doesn't match expected
**Fix:** Verify deployment configuration points to correct branch

## 📚 Diagnostic Command Reference

### Manual Diagnostics

If the automated tool isn't available, run these commands manually:

```bash
# 1. Verify deployment
git status
git log -1
npm --version
node --version

# 2. Check network
dig yourdomain.com
curl -I https://yourdomain.com
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# 3. Check application
ps aux | grep node
netstat -tulpn | grep LISTEN
lsof -i :3000

# 4. Check resources
df -h
free -m
top -bn1 | head -20

# 5. Check logs
tail -f logs/*.log
journalctl -u service_name -n 100

# 6. Build verification
npm run build
npm run type-check
npm run lint
```

## 🔍 Troubleshooting the Tool Itself

### Tool Won't Run

```bash
# Make script executable
chmod +x scripts/deployment-investigation.sh

# Check bash is available
which bash

# Run with explicit bash
bash scripts/deployment-investigation.sh
```

### Missing Dependencies

The tool requires these common utilities:
- `git` - Version control
- `node` and `npm` - JavaScript runtime
- `curl` or `wget` - HTTP requests
- `dig` or `nslookup` - DNS lookups
- `openssl` - SSL certificate checks

Install missing tools:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git nodejs npm curl dnsutils openssl

# macOS
brew install git node curl bind openssl
```

### Report Not Generated

Check permissions and disk space:

```bash
# Check write permissions
ls -la .
mkdir -p deployment-investigation-reports
chmod 755 deployment-investigation-reports

# Check disk space
df -h .
```

## 💡 Best Practices

### 1. Run Before Every Production Deployment
Make investigation part of your deployment checklist:
```bash
npm run build && npm run investigate && npm run deploy
```

### 2. Save Reports for Incident Response
Keep investigation reports for troubleshooting:
- Add to `.gitignore`: `deployment-investigation-reports/`
- Archive to S3 or long-term storage
- Reference in incident post-mortems

### 3. Automate with CI/CD
Run automatically after deployments to catch issues early

### 4. Compare Baseline vs Current
Save a "good" report when everything works, compare against it when issues occur

### 5. Share with Team
Include report in deployment notifications so team can review

## 🎓 Understanding the Output

### Status Indicators

- ✅ **Success (Green)** - Check passed, no issues
- ⚠️ **Warning (Yellow)** - Non-critical issue, should investigate
- ❌ **Error (Red)** - Critical issue, must fix
- ℹ️ **Info (Blue)** - Informational, no action needed

### Priority Levels

1. **Critical (Red)** - Site is broken, fix immediately
2. **High (Yellow)** - Site works but has issues
3. **Medium (Blue)** - Informational findings
4. **Low (Green)** - Everything working correctly

## 📄 Example Reports

### Successful Deployment
```
✅ Git repository detected
✅ Node.js v20.10.0 detected
✅ npm 10.2.3 detected
✅ package.json found
✅ node_modules directory exists
✅ Build directory (.next) found
✅ .env.local found with 8 variables
✅ Domain returns HTTP 200
✅ Supabase configuration detected
✅ Next.js detected
✅ No vulnerabilities found
```

### Failed Deployment
```
✅ Git repository detected
❌ node_modules not found - run npm install
⚠️ No build output directory found
❌ .env.local not found
❌ Domain not returning successful response
⚠️ Port 3000 not listening
❌ 12 vulnerabilities found (3 critical, 5 high)
```

## 🤝 Contributing

To improve this tool:

1. Add new investigation phases
2. Enhance platform-specific checks
3. Add more diagnostic commands
4. Improve report formatting
5. Add automated remediation suggestions

## 📜 License

MIT License - See repository LICENSE file

## 🆘 Support

If the investigation tool doesn't help solve your issue:

1. Review the generated report carefully
2. Check the repository's issues for similar problems
3. Share the report when asking for help
4. Include deployment platform and framework versions

---

**Tool Version:** 1.0.0  
**Last Updated:** January 2026  
**Maintained By:** BenchBarrier Development Team
