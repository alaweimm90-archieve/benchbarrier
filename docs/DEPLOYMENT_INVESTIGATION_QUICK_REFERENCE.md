# Deployment Investigation Quick Reference

## 🚀 Quick Commands

```bash
# Run basic investigation
npm run investigate

# Investigate production site
npm run investigate:production

# TypeScript version
npm run investigate:ts

# Manual with custom domain
./scripts/deployment-investigation.sh yourdomain.com vercel
```

## 📊 Check Status Codes

- ✅ **Success** - Everything working correctly
- ⚠️ **Warning** - Non-critical issue to review
- ❌ **Error** - Critical issue requiring immediate attention
- ℹ️ **Info** - Informational only

## 🔍 Common Issues Quick Fixes

### Issue: Dependencies Not Installed
```bash
npm install
npm run build
```

### Issue: Environment Variables Missing
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Issue: Build Failed
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Port Not Listening
```bash
# Kill existing processes
pkill -f "node.*next"
# Start fresh
npm run dev
```

### Issue: Database Connection Failed
```bash
# Verify Supabase credentials in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Issue: TypeScript Errors
```bash
npm run type-check
# Fix errors shown, then rebuild
npm run build
```

### Issue: Linting Errors
```bash
npm run lint
# Auto-fix what's possible
npm run lint -- --fix
```

## 📝 Report Locations

Reports saved to: `deployment-investigation-reports/`
- Bash: `investigation_YYYYMMDD_HHMMSS.md`
- TypeScript: `investigation_YYYY-MM-DD.json` + `.md`

## 🎯 Investigation Phases

1. **Deployment Verification** - Build artifacts, dependencies, env vars
2. **Network & Connectivity** - DNS, SSL, domain accessibility
3. **Application Runtime** - Running processes, listening ports
4. **Data Layer** - Database config, Supabase, Prisma
5. **Infrastructure** - Platform config, CI/CD, resources
6. **Frontend** - Framework, TypeScript, styling, assets
7. **Configuration** - App structure, API routes, docs
8. **Monitoring** - Error tracking, analytics, logs
9. **Security** - Secrets management, auth, CORS
10. **Dependencies** - Package status, vulnerabilities

## 🛠️ Platform-Specific Checks

### Vercel
- Checks `vercel.json`
- Next.js optimization
- Environment variables

### Netlify
- Checks `netlify.toml`
- Checks `_redirects`
- Build commands
- Function deployments

### Docker
- Checks `Dockerfile`
- Checks `docker-compose.yml`
- Container configuration
- Volume mounts

### Kubernetes
- Checks `k8s/` directory
- Pod configurations
- Service definitions

## 💡 Best Practices

1. **Run before production deploy**
   ```bash
   npm run build && npm run investigate && deploy
   ```

2. **Save baseline report**
   ```bash
   npm run investigate
   # Save when everything works
   cp deployment-investigation-reports/latest.md baseline-report.md
   ```

3. **Compare reports**
   ```bash
   diff baseline-report.md deployment-investigation-reports/latest.md
   ```

4. **Automate in CI/CD**
   - Add to GitHub Actions
   - Run after deployments
   - Upload reports as artifacts

5. **Share with team**
   - Include in deployment notifications
   - Reference in incident reports
   - Use for troubleshooting

## 🆘 Emergency Checklist

When site is down:

- [ ] Run investigation: `npm run investigate`
- [ ] Check report for ❌ errors
- [ ] Verify environment variables set
- [ ] Check build completed successfully
- [ ] Verify dependencies installed
- [ ] Check application is running
- [ ] Test database connectivity
- [ ] Verify SSL certificate valid
- [ ] Check DNS propagation
- [ ] Review application logs

## 📞 Support Resources

- Full docs: `docs/DEPLOYMENT_INVESTIGATION.md`
- Example reports: `deployment-investigation-reports/`
- GitHub Issues: Report tool bugs
- README.md: General project setup

## 🔗 Useful Links

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Troubleshooting](https://vercel.com/docs/troubleshooting)
- [Netlify Deploy Logs](https://docs.netlify.com/monitor-sites/logs/)
- [Supabase Status](https://status.supabase.com/)

---

**Version:** 1.0.0  
**Last Updated:** January 2026
