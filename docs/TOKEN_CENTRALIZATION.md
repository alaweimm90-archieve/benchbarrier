# Token Centralization Strategy

## Overview

This document outlines the strategy for centralizing and managing all API tokens, secrets, and credentials across the BenchBarrier platform. Proper token management is critical for security, maintainability, and operational efficiency.

## Token Categories

### 1. Authentication & Authorization
- **Supabase**
  - `NEXT_PUBLIC_SUPABASE_URL`: Public Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anonymous key (client-side)
  - `SUPABASE_SERVICE_ROLE_KEY`: Service role key (server-side only, highest privileges)

### 2. Payment Processing
- **Stripe**
  - `STRIPE_SECRET_KEY`: Secret API key (server-side only)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Publishable key (client-side)
  - `STRIPE_WEBHOOK_SECRET`: Webhook signature verification secret

### 3. Monitoring & Analytics
- **Sentry**
  - `NEXT_PUBLIC_SENTRY_DSN`: Data Source Name for error tracking
  - `SENTRY_AUTH_TOKEN`: Authentication token for releases (CI/CD)
  - `SENTRY_ORG`: Organization slug
  - `SENTRY_PROJECT`: Project slug

- **Google Analytics**
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 Measurement ID

### 4. Communication
- **Resend (Email)**
  - `RESEND_API_KEY`: API key for sending transactional emails

### 5. Social Media Platforms (Future)
- **Instagram**
  - `INSTAGRAM_ACCESS_TOKEN`: Graph API access token
  - `INSTAGRAM_BUSINESS_ACCOUNT_ID`: Business account ID

- **Facebook**
  - `FACEBOOK_ACCESS_TOKEN`: Graph API access token
  - `FACEBOOK_PAGE_ID`: Page ID for posting

- **Twitter/X**
  - `TWITTER_API_KEY`: API key
  - `TWITTER_API_SECRET`: API secret
  - `TWITTER_ACCESS_TOKEN`: Access token
  - `TWITTER_ACCESS_SECRET`: Access token secret
  - `TWITTER_BEARER_TOKEN`: Bearer token for v2 API

- **LinkedIn**
  - `LINKEDIN_ACCESS_TOKEN`: Access token
  - `LINKEDIN_ORGANIZATION_ID`: Organization/company ID

- **TikTok**
  - `TIKTOK_ACCESS_TOKEN`: Access token
  - `TIKTOK_USER_ID`: User/creator ID

### 6. AI/Content Generation (Future)
- **OpenAI**
  - `OPENAI_API_KEY`: API key for GPT models
  - `OPENAI_ORGANIZATION_ID`: Organization ID (optional)

- **Anthropic**
  - `ANTHROPIC_API_KEY`: API key for Claude models

- **Stability AI**
  - `STABILITY_API_KEY`: API key for image generation

### 7. Cloud Storage & CDN (Future)
- **Cloudinary**
  - `CLOUDINARY_CLOUD_NAME`: Cloud name
  - `CLOUDINARY_API_KEY`: API key
  - `CLOUDINARY_API_SECRET`: API secret

- **AWS S3**
  - `AWS_ACCESS_KEY_ID`: Access key ID
  - `AWS_SECRET_ACCESS_KEY`: Secret access key
  - `AWS_REGION`: Default region
  - `AWS_S3_BUCKET`: Bucket name

## Token Storage Strategies

### Development Environment

**Local Development (`.env.local`)**
```bash
# Development tokens (never commit to git)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Use test/sandbox credentials
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Security Measures:**
- ✅ Listed in `.gitignore`
- ✅ Use test/sandbox credentials only
- ✅ Never use production credentials locally
- ✅ Rotate tokens if accidentally committed

### Production Environment

**Vercel Environment Variables**
```bash
# Set via Vercel Dashboard or CLI
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add RESEND_API_KEY production
```

**Security Measures:**
- ✅ Set environment-specific variables (production, preview, development)
- ✅ Use encrypted storage (Vercel handles this)
- ✅ Enable environment variable protection
- ✅ Limit access to production secrets
- ✅ Audit secret access logs

### CI/CD Environment

**GitHub Secrets**
```yaml
# Set via GitHub Repository Settings > Secrets
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
CODECOV_TOKEN
SNYK_TOKEN
SENTRY_AUTH_TOKEN
```

**Security Measures:**
- ✅ Use GitHub encrypted secrets
- ✅ Limit secret access to specific workflows
- ✅ Never log secret values
- ✅ Use organization-level secrets for shared tokens
- ✅ Rotate tokens regularly

## Token Access Control

### Public vs. Private Tokens

**Public Tokens (Client-side safe)**
- Prefix: `NEXT_PUBLIC_*`
- Exposed in browser
- Limited permissions
- Examples: Supabase anon key, Stripe publishable key, GA measurement ID

**Private Tokens (Server-side only)**
- No `NEXT_PUBLIC_` prefix
- Never exposed to client
- Full permissions
- Examples: Stripe secret key, Supabase service role key, API secrets

### Access Matrix

| Token Type | Development | Preview | Production | CI/CD |
|------------|-------------|---------|------------|-------|
| Public tokens | ✅ | ✅ | ✅ | ✅ |
| Test credentials | ✅ | ✅ | ❌ | ✅ |
| Production credentials | ❌ | ❌ | ✅ | ✅ (limited) |
| Service account tokens | ❌ | ❌ | ✅ | ✅ |

## Token Lifecycle Management

### Provisioning
1. Generate token from service provider
2. Set minimum required permissions
3. Add to appropriate environment (dev/staging/prod)
4. Document in this file
5. Test token functionality

### Rotation Schedule

| Token Category | Rotation Frequency | Priority |
|----------------|-------------------|----------|
| Payment (Stripe) | Every 90 days | Critical |
| Authentication (Supabase) | Every 180 days | High |
| API Keys (Third-party) | Every 90 days | High |
| Service Accounts | Every 180 days | Medium |
| CI/CD Tokens | Every 90 days | Medium |

### Rotation Process
1. Generate new token
2. Add new token to environment (keep old token active)
3. Deploy changes
4. Verify functionality with new token
5. Remove old token
6. Document rotation in security log

### Revocation
When to revoke immediately:
- ❌ Token accidentally committed to git
- ❌ Token exposed in logs or error messages
- ❌ Unauthorized access detected
- ❌ Team member with access leaves
- ❌ Compliance requirement

Revocation steps:
1. Generate new token
2. Add new token to all environments
3. Deploy immediately
4. Revoke old token
5. Verify no functionality broken
6. Document incident

## Token Security Best Practices

### Do's ✅
- ✅ Use environment variables for all tokens
- ✅ Use `.env.example` templates (without real values)
- ✅ Rotate tokens on a schedule
- ✅ Use minimum required permissions
- ✅ Monitor token usage and access logs
- ✅ Encrypt tokens at rest
- ✅ Use different tokens for different environments
- ✅ Implement rate limiting
- ✅ Set token expiration when possible
- ✅ Use service accounts for automation
- ✅ Audit token access regularly
- ✅ Document all tokens and their purposes

### Don'ts ❌
- ❌ Never commit tokens to version control
- ❌ Never hardcode tokens in source code
- ❌ Never log token values
- ❌ Never send tokens via email or chat
- ❌ Never use production tokens in development
- ❌ Never share tokens across projects
- ❌ Never store tokens in client-side code
- ❌ Never expose tokens in URLs or query parameters
- ❌ Never use the same token across environments
- ❌ Never grant more permissions than needed

## Detection & Prevention

### Pre-commit Hooks
```bash
# Install git-secrets
brew install git-secrets

# Initialize in repository
git secrets --install
git secrets --register-aws
git secrets --add-provider -- cat .env.example
```

### Automated Scanning
- GitHub secret scanning (automatic)
- TruffleHog in CI/CD (see `.github/workflows/security-scan.yml`)
- GitGuardian integration (optional)

### Code Review Checklist
- [ ] No hardcoded tokens
- [ ] Environment variables used correctly
- [ ] Public vs. private token prefix correct
- [ ] Token documented in this file
- [ ] Minimum permissions granted
- [ ] Token added to `.env.example` (template only)

## Incident Response

### If a Token is Compromised

**Immediate Actions (< 1 hour):**
1. Revoke the compromised token
2. Generate new token
3. Update all environments
4. Deploy changes
5. Monitor for unauthorized usage

**Investigation (< 24 hours):**
1. Identify how token was exposed
2. Assess potential impact
3. Check access logs for unauthorized use
4. Determine if data was accessed/modified

**Remediation (< 48 hours):**
1. Fix root cause (e.g., remove from git history)
2. Implement preventive measures
3. Update security documentation
4. Train team on lessons learned

**Notification:**
- Notify security team immediately
- Report to affected service provider if needed
- Document incident in security log
- Report to users if their data was potentially affected

## Token Documentation Template

When adding a new token, document it here:

```markdown
### [Service Name]
- **Token Name**: `TOKEN_VARIABLE_NAME`
- **Purpose**: Brief description of what this token is used for
- **Permissions**: List of permissions/scopes granted
- **Rotation Schedule**: How often to rotate
- **Owner**: Team/person responsible
- **Documentation**: Link to service provider docs
- **Created**: Date token was first created
- **Last Rotated**: Date of last rotation
```

## Centralized Token Configuration

### Environment Variable Template

See `.env.example` for the complete template. Key sections:

1. **Supabase Configuration**
2. **Stripe Configuration**
3. **Site Configuration**
4. **Monitoring & Analytics**
5. **Email Configuration**
6. **Social Media APIs** (future)
7. **AI/ML Services** (future)

### Loading Tokens in Application

```typescript
// lib/config/tokens.ts
export const tokens = {
  // Public tokens (safe for client)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
  },
  
  // Private tokens (server-side only)
  private: {
    supabase: {
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY!,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY!,
    },
  },
};

// Runtime validation
export function validateTokens() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
```

## Future Enhancements

### Phase 1: Token Vault Integration
- Integrate with HashiCorp Vault or AWS Secrets Manager
- Automatic token rotation
- Dynamic token generation
- Centralized access control

### Phase 2: Token Analytics
- Token usage tracking
- Access pattern analysis
- Anomaly detection
- Cost attribution by token

### Phase 3: Zero-Trust Architecture
- Short-lived tokens
- Token binding to specific requests
- Mutual TLS authentication
- Hardware security module (HSM) integration

## Resources

### Internal Documentation
- [SECURITY.md](SECURITY.md) - Security policies
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [.env.example](.env.example) - Environment variable template

### External Resources
- [12-Factor App: Config](https://12factor.net/config)
- [OWASP: Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Vercel: Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub: Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## Contact

For questions about token management:
- **Security Issues**: security@benchbarrier.com
- **Token Requests**: devops@benchbarrier.com
- **Emergency**: security-oncall@benchbarrier.com

---

**Last Updated**: January 8, 2026  
**Version**: 1.0.0  
**Next Review**: April 8, 2026
