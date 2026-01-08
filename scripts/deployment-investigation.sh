#!/bin/bash

# Ultimate Platform Deployment Investigation & Comprehensive Auditing Tool
# Version: 1.0.0
# Description: Military-grade investigation script for diagnosing deployment issues

# Note: Not using 'set -e' to allow script to continue even if individual checks fail
# This ensures we get a complete report even if some commands fail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
REPORT_DIR="./deployment-investigation-reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_FILE="${REPORT_DIR}/investigation_${TIMESTAMP}.md"
DOMAIN="${1:-localhost:3000}"
PLATFORM="${2:-vercel}" # vercel, netlify, aws, docker, kubernetes

# Create report directory
mkdir -p "$REPORT_DIR"

# Initialize report
init_report() {
    cat > "$REPORT_FILE" << EOF
# Deployment Investigation Report
**Generated:** $(date)
**Domain:** $DOMAIN
**Platform:** $PLATFORM
**Investigator:** $(whoami)@$(hostname)

---

## Executive Summary

This report contains a comprehensive analysis of the deployment status and potential issues.

---

EOF
}

# Logging functions
log_section() {
    echo -e "\n${MAGENTA}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${MAGENTA}║ $1${NC}"
    echo -e "${MAGENTA}╚═══════════════════════════════════════════════════════════════╝${NC}\n"
    echo -e "\n## $1\n" >> "$REPORT_FILE"
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
    echo "- $1" >> "$REPORT_FILE"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
    echo "- ✅ $1" >> "$REPORT_FILE"
}

log_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
    echo "- ⚠️ $1" >> "$REPORT_FILE"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
    echo "- ❌ $1" >> "$REPORT_FILE"
}

log_command() {
    echo -e "${CYAN}[CMD]${NC} $1"
    echo -e "\n\`\`\`bash\n$1\n\`\`\`\n" >> "$REPORT_FILE"
}

log_output() {
    echo -e "\`\`\`\n$1\n\`\`\`\n" >> "$REPORT_FILE"
}

# Phase 1: Deployment Verification Deep Dive
phase1_deployment_verification() {
    log_section "Phase 1: Deployment Verification Deep Dive"
    
    # Check git status
    log_info "Checking git repository status..."
    if [ -d .git ]; then
        log_command "git status"
        GIT_STATUS=$(git status 2>&1 || echo "Git command failed")
        log_output "$GIT_STATUS"
        
        log_command "git log -1 --pretty=format:'%H %s'"
        LAST_COMMIT=$(git log -1 --pretty=format:'%H %s' 2>&1 || echo "No commits")
        log_success "Last commit: $LAST_COMMIT"
        
        log_command "git branch -a"
        GIT_BRANCHES=$(git branch -a 2>&1 || echo "Failed to get branches")
        log_output "$GIT_BRANCHES"
    else
        log_warning "Not a git repository"
    fi
    
    # Check Node.js and npm versions
    log_info "Checking Node.js environment..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js version: $NODE_VERSION"
    else
        log_error "Node.js not found"
    fi
    
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        log_success "npm version: $NPM_VERSION"
    else
        log_error "npm not found"
    fi
    
    # Check package.json
    if [ -f package.json ]; then
        log_success "package.json found"
        log_command "jq -r '{name, version, scripts}' package.json"
        if command -v jq &> /dev/null; then
            PKG_INFO=$(jq -r '{name, version, scripts}' package.json 2>&1 || echo "Failed to parse package.json")
            log_output "$PKG_INFO"
        else
            log_warning "jq not installed, showing raw package.json excerpt"
            log_output "$(head -20 package.json)"
        fi
    else
        log_error "package.json not found"
    fi
    
    # Check for lock files
    if [ -f package-lock.json ]; then
        log_success "package-lock.json found"
    elif [ -f yarn.lock ]; then
        log_success "yarn.lock found"
    elif [ -f pnpm-lock.yaml ]; then
        log_success "pnpm-lock.yaml found"
    elif [ -f bun.lockb ]; then
        log_success "bun.lockb found"
    else
        log_warning "No lock file found"
    fi
    
    # Check if node_modules exists
    if [ -d node_modules ]; then
        log_success "node_modules directory exists"
        MODULE_COUNT=$(find node_modules -maxdepth 1 -mindepth 1 -type d 2>/dev/null | wc -l)
        log_info "node_modules contains $MODULE_COUNT packages"
    else
        log_error "node_modules directory not found - dependencies not installed"
    fi
    
    # Check build output
    if [ -d .next ]; then
        log_success "Next.js build output (.next) found"
        BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
        log_info "Build size: $BUILD_SIZE"
    elif [ -d dist ]; then
        log_success "Build output (dist) found"
        BUILD_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
        log_info "Build size: $BUILD_SIZE"
    elif [ -d build ]; then
        log_success "Build output (build) found"
        BUILD_SIZE=$(du -sh build 2>/dev/null | cut -f1)
        log_info "Build size: $BUILD_SIZE"
    else
        log_warning "No build output directory found"
    fi
    
    # Check environment files
    log_info "Checking environment configuration..."
    if [ -f .env.local ]; then
        log_success ".env.local found"
        ENV_COUNT=$(grep -v '^#' .env.local | grep -v '^$' | wc -l)
        log_info "Environment variables defined: $ENV_COUNT"
    else
        log_warning ".env.local not found"
    fi
    
    if [ -f .env ]; then
        log_success ".env found"
    fi
    
    if [ -f .env.example ]; then
        log_success ".env.example found (template available)"
    fi
}

# Phase 2: Network & Connectivity Forensics
phase2_network_connectivity() {
    log_section "Phase 2: Network & Connectivity Forensics"
    
    # DNS checks
    if [[ "$DOMAIN" != "localhost"* ]]; then
        log_info "Performing DNS checks for $DOMAIN..."
        
        if command -v dig &> /dev/null; then
            log_command "dig $DOMAIN +short"
            DNS_RESULT=$(dig "$DOMAIN" +short 2>&1 || echo "DNS lookup failed")
            log_output "$DNS_RESULT"
        elif command -v nslookup &> /dev/null; then
            log_command "nslookup $DOMAIN"
            DNS_RESULT=$(nslookup "$DOMAIN" 2>&1 || echo "DNS lookup failed")
            log_output "$DNS_RESULT"
        else
            log_warning "DNS tools (dig/nslookup) not available"
        fi
    else
        log_info "Skipping DNS checks for localhost"
    fi
    
    # Check if domain is reachable
    log_info "Checking domain connectivity..."
    if command -v curl &> /dev/null; then
        log_command "curl -I https://$DOMAIN"
        HTTP_RESPONSE=$(curl -sI "https://$DOMAIN" --max-time 10 2>&1 || echo "Connection failed")
        log_output "$HTTP_RESPONSE"
        
        if echo "$HTTP_RESPONSE" | grep -q "HTTP/[0-9.]\+ 200"; then
            log_success "Domain returns HTTP 200 OK"
        elif echo "$HTTP_RESPONSE" | grep -q "HTTP/[0-9.]\+ 30[0-9]"; then
            log_warning "Domain returns redirect (30x)"
        else
            log_error "Domain not returning successful response"
        fi
    else
        log_warning "curl not available"
    fi
    
    # SSL/TLS certificate check
    if [[ "$DOMAIN" != "localhost"* ]] && command -v openssl &> /dev/null; then
        log_info "Checking SSL/TLS certificate..."
        log_command "openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates"
        CERT_INFO=$(timeout 5 openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" < /dev/null 2>/dev/null | openssl x509 -noout -dates 2>&1 || echo "Certificate check failed")
        log_output "$CERT_INFO"
    fi
    
    # Check local network interfaces
    log_info "Checking network interfaces..."
    if command -v ip &> /dev/null; then
        log_command "ip addr show"
        IP_INFO=$(ip addr show 2>&1 || echo "Failed to get network info")
        log_output "$IP_INFO"
    elif command -v ifconfig &> /dev/null; then
        log_command "ifconfig"
        IP_INFO=$(ifconfig 2>&1 || echo "Failed to get network info")
        log_output "$IP_INFO"
    fi
}

# Phase 3: Application Runtime Analysis
phase3_application_runtime() {
    log_section "Phase 3: Application Runtime Analysis"
    
    # Check for running Node processes
    log_info "Checking for running Node.js processes..."
    if command -v ps &> /dev/null; then
        log_command "ps aux | grep -i node | grep -v grep"
        NODE_PROCESSES=$(ps aux | grep -i node | grep -v grep || echo "No Node.js processes found")
        log_output "$NODE_PROCESSES"
    fi
    
    # Check listening ports
    log_info "Checking listening ports..."
    if command -v netstat &> /dev/null; then
        log_command "netstat -tulpn | grep LISTEN"
        LISTENING_PORTS=$(netstat -tulpn 2>/dev/null | grep LISTEN || echo "No listening ports or permission denied")
        log_output "$LISTENING_PORTS"
    elif command -v ss &> /dev/null; then
        log_command "ss -tulpn | grep LISTEN"
        LISTENING_PORTS=$(ss -tulpn 2>/dev/null | grep LISTEN || echo "No listening ports or permission denied")
        log_output "$LISTENING_PORTS"
    fi
    
    # Check for common ports (3000, 8080, 80, 443)
    COMMON_PORTS=(3000 8080 80 443)
    for port in "${COMMON_PORTS[@]}"; do
        if command -v nc &> /dev/null; then
            if nc -z localhost "$port" 2>/dev/null; then
                log_success "Port $port is open and listening"
            else
                log_info "Port $port is not listening"
            fi
        elif command -v telnet &> /dev/null; then
            if timeout 2 telnet localhost "$port" 2>&1 | grep -q "Connected"; then
                log_success "Port $port is open and listening"
            else
                log_info "Port $port is not listening"
            fi
        fi
    done
    
    # Check application logs
    log_info "Searching for application logs..."
    if [ -d logs ]; then
        log_success "logs directory found"
        log_command "ls -lh logs/"
        LOG_FILES=$(ls -lh logs/ 2>&1 || echo "Failed to list logs")
        log_output "$LOG_FILES"
    fi
    
    if [ -f .next/server/traces ]; then
        log_success "Next.js trace files found"
    fi
}

# Phase 4: Data Layer Examination
phase4_data_layer() {
    log_section "Phase 4: Data Layer Examination"
    
    # Check for database configuration
    log_info "Checking database configuration..."
    
    if grep -q "DATABASE_URL\|SUPABASE_URL\|MONGODB_URI\|POSTGRES" .env* 2>/dev/null; then
        log_success "Database configuration found in environment files"
    else
        log_info "No obvious database configuration found"
    fi
    
    # Check for Supabase configuration
    if grep -q "SUPABASE" .env* 2>/dev/null || [ -f supabase-schema.sql ]; then
        log_success "Supabase configuration detected"
        
        if [ -f supabase-schema.sql ]; then
            log_success "Supabase schema file found"
            SCHEMA_SIZE=$(wc -l < supabase-schema.sql)
            log_info "Schema file contains $SCHEMA_SIZE lines"
        fi
    fi
    
    # Check for Prisma
    if [ -f prisma/schema.prisma ]; then
        log_success "Prisma schema found"
        log_command "head -20 prisma/schema.prisma"
        PRISMA_SCHEMA=$(head -20 prisma/schema.prisma 2>&1)
        log_output "$PRISMA_SCHEMA"
    fi
}

# Phase 5: Infrastructure & Platform Layer
phase5_infrastructure() {
    log_section "Phase 5: Infrastructure & Platform Layer"
    
    # Check for platform-specific configuration
    case "$PLATFORM" in
        vercel)
            log_info "Checking Vercel configuration..."
            if [ -f vercel.json ]; then
                log_success "vercel.json found"
                log_command "cat vercel.json"
                VERCEL_CONFIG=$(cat vercel.json 2>&1)
                log_output "$VERCEL_CONFIG"
            else
                log_warning "vercel.json not found"
            fi
            ;;
        netlify)
            log_info "Checking Netlify configuration..."
            if [ -f netlify.toml ]; then
                log_success "netlify.toml found"
                log_command "cat netlify.toml"
                NETLIFY_CONFIG=$(cat netlify.toml 2>&1)
                log_output "$NETLIFY_CONFIG"
            else
                log_warning "netlify.toml not found"
            fi
            
            if [ -f _redirects ]; then
                log_success "_redirects file found"
            fi
            ;;
        docker)
            log_info "Checking Docker configuration..."
            if [ -f Dockerfile ]; then
                log_success "Dockerfile found"
                log_command "cat Dockerfile"
                DOCKERFILE=$(cat Dockerfile 2>&1)
                log_output "$DOCKERFILE"
            else
                log_warning "Dockerfile not found"
            fi
            
            if [ -f docker-compose.yml ] || [ -f docker-compose.yaml ]; then
                log_success "docker-compose configuration found"
            fi
            ;;
        kubernetes)
            log_info "Checking Kubernetes configuration..."
            if [ -d k8s ] || [ -d kubernetes ]; then
                log_success "Kubernetes configuration directory found"
            else
                log_warning "No Kubernetes configuration directory found"
            fi
            ;;
    esac
    
    # Check for CI/CD configuration
    log_info "Checking CI/CD configuration..."
    if [ -d .github/workflows ]; then
        log_success "GitHub Actions workflows found"
        WORKFLOW_COUNT=$(find .github/workflows -name "*.yml" -o -name "*.yaml" | wc -l)
        log_info "Found $WORKFLOW_COUNT workflow files"
    fi
    
    if [ -f .gitlab-ci.yml ]; then
        log_success "GitLab CI configuration found"
    fi
    
    if [ -f .travis.yml ]; then
        log_success "Travis CI configuration found"
    fi
    
    # Check disk space
    log_info "Checking disk space..."
    log_command "df -h ."
    DISK_SPACE=$(df -h . 2>&1 || echo "Failed to check disk space")
    log_output "$DISK_SPACE"
    
    # Check memory
    log_info "Checking memory usage..."
    if command -v free &> /dev/null; then
        log_command "free -h"
        MEMORY=$(free -h 2>&1 || echo "Failed to check memory")
        log_output "$MEMORY"
    fi
}

# Phase 6: Frontend & Client-Side Investigation
phase6_frontend() {
    log_section "Phase 6: Frontend & Client-Side Investigation"
    
    # Check for frontend framework
    log_info "Detecting frontend framework..."
    if [ -f next.config.js ] || [ -f next.config.mjs ]; then
        log_success "Next.js detected"
        log_command "cat next.config.js"
        NEXT_CONFIG=$(cat next.config.js 2>&1 || cat next.config.mjs 2>&1 || echo "Failed to read config")
        log_output "$NEXT_CONFIG"
    fi
    
    if [ -f vite.config.js ] || [ -f vite.config.ts ]; then
        log_success "Vite detected"
    fi
    
    if [ -f webpack.config.js ]; then
        log_success "Webpack detected"
    fi
    
    # Check for TypeScript
    if [ -f tsconfig.json ]; then
        log_success "TypeScript configuration found"
        log_command "cat tsconfig.json"
        TS_CONFIG=$(cat tsconfig.json 2>&1)
        log_output "$TS_CONFIG"
    fi
    
    # Check for Tailwind CSS
    if [ -f tailwind.config.js ] || [ -f tailwind.config.ts ]; then
        log_success "Tailwind CSS detected"
    fi
    
    # Check public assets
    if [ -d public ]; then
        log_success "public directory found"
        PUBLIC_SIZE=$(du -sh public 2>/dev/null | cut -f1)
        log_info "Public assets size: $PUBLIC_SIZE"
    fi
    
    # Check for static files
    if [ -d static ]; then
        log_success "static directory found"
    fi
}

# Phase 7: Configuration & Code Analysis
phase7_configuration() {
    log_section "Phase 7: Configuration & Code Analysis"
    
    # Check ESLint configuration
    if [ -f .eslintrc.js ] || [ -f .eslintrc.json ] || [ -f eslint.config.mjs ]; then
        log_success "ESLint configuration found"
    fi
    
    # Check for .gitignore
    if [ -f .gitignore ]; then
        log_success ".gitignore found"
        GITIGNORE_LINES=$(wc -l < .gitignore)
        log_info ".gitignore contains $GITIGNORE_LINES lines"
    fi
    
    # Check for README
    if [ -f README.md ]; then
        log_success "README.md found"
    else
        log_warning "README.md not found"
    fi
    
    # Check main application files
    log_info "Checking main application structure..."
    if [ -d app ]; then
        log_success "app directory found (Next.js App Router)"
        APP_ROUTES=$(find app -name "page.tsx" -o -name "page.js" 2>/dev/null | wc -l)
        log_info "Found $APP_ROUTES route pages"
    fi
    
    if [ -d pages ]; then
        log_success "pages directory found (Next.js Pages Router)"
        PAGE_COUNT=$(find pages -name "*.tsx" -o -name "*.jsx" 2>/dev/null | wc -l)
        log_info "Found $PAGE_COUNT page files"
    fi
    
    if [ -d src ]; then
        log_success "src directory found"
    fi
    
    # Check for API routes
    if [ -d app/api ]; then
        log_success "API routes found (app/api)"
        API_COUNT=$(find app/api -name "route.ts" -o -name "route.js" 2>/dev/null | wc -l)
        log_info "Found $API_COUNT API routes"
    fi
}

# Phase 8: Monitoring & Observability
phase8_monitoring() {
    log_section "Phase 8: Monitoring & Observability Deep Dive"
    
    # Check for monitoring services
    log_info "Checking monitoring configuration..."
    
    if grep -q "SENTRY\|@sentry" package.json .env* 2>/dev/null; then
        log_success "Sentry error tracking detected"
    fi
    
    if grep -q "DATADOG\|NEW_RELIC" .env* 2>/dev/null; then
        log_success "APM service detected"
    fi
    
    if grep -q "VERCEL_ANALYTICS\|PLAUSIBLE\|GOOGLE_ANALYTICS" package.json .env* 2>/dev/null; then
        log_success "Analytics configuration found"
    fi
    
    # Check for log files
    log_info "Searching for recent log files..."
    if [ -d logs ]; then
        RECENT_LOGS=$(find logs -type f -mtime -1 2>/dev/null || echo "No recent logs")
        if [ "$RECENT_LOGS" != "No recent logs" ]; then
            log_success "Found recent log files"
            log_output "$RECENT_LOGS"
        fi
    fi
}

# Phase 9: Security & Access Control
phase9_security() {
    log_section "Phase 9: Security & Access Control"
    
    # Check for exposed secrets
    log_info "Checking for potential security issues..."
    
    if [ -f .env.local ] && git ls-files --error-unmatch .env.local 2>/dev/null; then
        log_error ".env.local is tracked in git - SECURITY RISK!"
    else
        log_success ".env.local not tracked in git"
    fi
    
    # Check for HTTPS configuration
    if grep -q "secure.*true\|https" next.config* 2>/dev/null; then
        log_success "HTTPS configuration found"
    fi
    
    # Check for authentication
    if grep -q "AUTH\|NEXTAUTH\|SUPABASE_AUTH" .env* package.json 2>/dev/null; then
        log_success "Authentication system detected"
    fi
    
    # Check for CORS configuration
    if grep -q "cors\|CORS" next.config* package.json 2>/dev/null; then
        log_info "CORS configuration detected"
    fi
}

# Phase 10: Dependency & Third-Party Analysis
phase10_dependencies() {
    log_section "Phase 10: Dependency & Third-Party Analysis"
    
    # Check for outdated dependencies
    log_info "Checking npm dependencies..."
    
    if [ -f package.json ] && command -v npm &> /dev/null; then
        log_command "npm list --depth=0"
        NPM_LIST=$(npm list --depth=0 2>&1 || echo "Some dependency issues found")
        log_output "$NPM_LIST"
        
        # Count dependencies
        DEPS_COUNT=$(grep -c '"' package.json 2>/dev/null || echo "0")
        log_info "Total lines in package.json: $DEPS_COUNT"
    fi
    
    # Check for package vulnerabilities
    log_info "Checking for security vulnerabilities..."
    if command -v npm &> /dev/null; then
        log_command "npm audit --production"
        NPM_AUDIT=$(npm audit --production 2>&1 || echo "Audit check completed with findings")
        log_output "$NPM_AUDIT"
    fi
    
    # Check for CDN dependencies
    if grep -rq "cdn.jsdelivr.net\|unpkg.com\|cdnjs.cloudflare.com" app/ public/ 2>/dev/null; then
        log_warning "External CDN dependencies detected"
    fi
}

# Generate summary
generate_summary() {
    log_section "Investigation Summary"
    
    log_info "Investigation completed at $(date)"
    log_info "Report saved to: $REPORT_FILE"
    
    cat >> "$REPORT_FILE" << EOF

## Root Cause Analysis Checklist

Review the following potential issues:

- [ ] **Configuration Drift** - Production config differs from tested environments
- [ ] **Timing Issues** - Race conditions, cache not warmed, async operations incomplete
- [ ] **Version Mismatch** - Frontend expecting different API version than backend serves
- [ ] **Environment Parity** - Works in staging but production has different constraints
- [ ] **Silent Failures** - Deployment succeeded but critical steps skipped
- [ ] **Cascading Failures** - One microservice down affecting entire platform
- [ ] **Resource Exhaustion** - Out of memory, disk space, file descriptors
- [ ] **Permission Issues** - File permissions blocking operation
- [ ] **Clock Skew** - Time synchronization causing authentication failures
- [ ] **Geographic Issues** - Works in some regions, fails in others

## Recommended Next Steps

1. Review all ❌ ERROR markers in this report
2. Address all ⚠️ WARNING markers that are relevant
3. Verify environment variables are correctly set
4. Check build output is complete and error-free
5. Ensure all dependencies are installed
6. Verify database migrations have run successfully
7. Test API endpoints individually
8. Check browser console for client-side errors
9. Review application logs for runtime errors
10. Verify SSL/TLS certificates are valid

## Quick Fix Commands

\`\`\`bash
# Rebuild the application
rm -rf .next node_modules
npm install
npm run build

# Check environment variables
cat .env.local

# Test local server
npm run dev

# Check for errors in build
npm run build 2>&1 | grep -i error

# Verify types
npm run type-check
\`\`\`

---

**Report Generated By:** Ultimate Deployment Investigation Tool v1.0.0
**Report Location:** $REPORT_FILE
EOF

    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  Investigation Complete!                              ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Report saved to:${NC} $REPORT_FILE"
    echo ""
}

# Main execution
main() {
    echo -e "${MAGENTA}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ULTIMATE PLATFORM DEPLOYMENT INVESTIGATION TOOL            ║
║   Version 1.0.0                                              ║
║                                                              ║
║   Military-Grade Deployment Diagnostics                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    init_report
    
    phase1_deployment_verification
    phase2_network_connectivity
    phase3_application_runtime
    phase4_data_layer
    phase5_infrastructure
    phase6_frontend
    phase7_configuration
    phase8_monitoring
    phase9_security
    phase10_dependencies
    
    generate_summary
}

# Run the investigation
main
