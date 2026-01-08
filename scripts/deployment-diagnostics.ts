#!/usr/bin/env node

/**
 * Ultimate Platform Deployment Investigation & Comprehensive Auditing Tool
 * TypeScript/Node.js Version
 * 
 * This tool provides a programmatic interface for deployment diagnostics
 * and can be integrated into CI/CD pipelines or run as a standalone tool.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { userInfo, hostname, networkInterfaces } from 'os';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

interface DiagnosticResult {
  phase: string;
  checks: Check[];
  timestamp: Date;
}

interface Check {
  name: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: string;
}

interface InvestigationReport {
  summary: {
    domain: string;
    platform: string;
    timestamp: Date;
    investigator: string;
  };
  results: DiagnosticResult[];
  recommendations: string[];
}

class DeploymentInvestigator {
  private domain: string;
  private platform: string;
  private report: InvestigationReport;
  private reportDir: string;

  constructor(domain: string = 'localhost:3000', platform: string = 'vercel') {
    this.domain = domain;
    this.platform = platform;
    this.reportDir = path.join(process.cwd(), 'deployment-investigation-reports');
    
    this.report = {
      summary: {
        domain,
        platform,
        timestamp: new Date(),
        investigator: `${userInfo().username}@${hostname()}`,
      },
      results: [],
      recommendations: [],
    };

    // Create report directory
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  private log(message: string, color: keyof typeof colors = 'reset'): void {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  private logSection(title: string): void {
    this.log(`\n${'═'.repeat(70)}`, 'magenta');
    this.log(`  ${title}`, 'magenta');
    this.log(`${'═'.repeat(70)}\n`, 'magenta');
  }

  private execCommand(command: string): string {
    try {
      return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    } catch (error) {
      if (error instanceof Error && 'stdout' in error) {
        return (error as { stdout?: string }).stdout || error.message;
      }
      if (error instanceof Error) {
        return error.message;
      }
      return 'Command failed';
    }
  }

  private fileExists(filePath: string): boolean {
    return fs.existsSync(path.join(process.cwd(), filePath));
  }

  private readFile(filePath: string): string {
    try {
      return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    } catch {
      return '';
    }
  }

  private findFiles(dir: string, filenames: string[]): string[] {
    const results: string[] = [];
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Recursively search subdirectories
          results.push(...this.findFiles(fullPath, filenames));
        } else if (entry.isFile() && filenames.includes(entry.name)) {
          results.push(fullPath);
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
    
    return results;
  }

  private addCheck(phase: string, check: Check): void {
    let phaseResult = this.report.results.find(r => r.phase === phase);
    if (!phaseResult) {
      phaseResult = { phase, checks: [], timestamp: new Date() };
      this.report.results.push(phaseResult);
    }
    phaseResult.checks.push(check);

    // Log the check
    const icon = {
      success: '✓',
      warning: '⚠',
      error: '✗',
      info: 'ℹ',
    }[check.status];

    const color = {
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
    }[check.status] as keyof typeof colors;

    this.log(`[${icon}] ${check.message}`, color);
  }

  // Phase 1: Deployment Verification
  private phase1DeploymentVerification(): void {
    this.logSection('Phase 1: Deployment Verification Deep Dive');
    const phase = 'Deployment Verification';

    // Check git status
    if (this.fileExists('.git')) {
      const gitStatus = this.execCommand('git status --short');
      const lastCommit = this.execCommand('git log -1 --pretty=format:"%H %s"');
      
      this.addCheck(phase, {
        name: 'Git Repository',
        status: 'success',
        message: 'Git repository detected',
        details: `Last commit: ${lastCommit}`,
      });

      if (gitStatus.trim()) {
        this.addCheck(phase, {
          name: 'Git Working Tree',
          status: 'warning',
          message: 'Uncommitted changes detected',
          details: gitStatus,
        });
      }
    } else {
      this.addCheck(phase, {
        name: 'Git Repository',
        status: 'warning',
        message: 'Not a git repository',
      });
    }

    // Check Node.js and npm
    const nodeVersion = this.execCommand('node --version').trim();
    const npmVersion = this.execCommand('npm --version').trim();
    
    this.addCheck(phase, {
      name: 'Node.js',
      status: 'success',
      message: `Node.js ${nodeVersion} detected`,
    });

    this.addCheck(phase, {
      name: 'npm',
      status: 'success',
      message: `npm ${npmVersion} detected`,
    });

    // Check package.json
    if (this.fileExists('package.json')) {
      const pkg = JSON.parse(this.readFile('package.json'));
      this.addCheck(phase, {
        name: 'package.json',
        status: 'success',
        message: `Project: ${pkg.name} v${pkg.version}`,
      });
    } else {
      this.addCheck(phase, {
        name: 'package.json',
        status: 'error',
        message: 'package.json not found',
      });
    }

    // Check lock files
    const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb'];
    const foundLockFile = lockFiles.find(f => this.fileExists(f));
    
    if (foundLockFile) {
      this.addCheck(phase, {
        name: 'Lock File',
        status: 'success',
        message: `${foundLockFile} found`,
      });
    } else {
      this.addCheck(phase, {
        name: 'Lock File',
        status: 'warning',
        message: 'No lock file found',
      });
    }

    // Check node_modules
    if (this.fileExists('node_modules')) {
      this.addCheck(phase, {
        name: 'Dependencies',
        status: 'success',
        message: 'node_modules directory exists',
      });
    } else {
      this.addCheck(phase, {
        name: 'Dependencies',
        status: 'error',
        message: 'node_modules not found - run npm install',
      });
    }

    // Check build output
    const buildDirs = ['.next', 'dist', 'build'];
    const buildDir = buildDirs.find(d => this.fileExists(d));
    
    if (buildDir) {
      this.addCheck(phase, {
        name: 'Build Output',
        status: 'success',
        message: `Build directory (${buildDir}) found`,
      });
    } else {
      this.addCheck(phase, {
        name: 'Build Output',
        status: 'warning',
        message: 'No build output directory found',
      });
    }

    // Check environment files
    if (this.fileExists('.env.local')) {
      const envContent = this.readFile('.env.local');
      const envVars = envContent.split('\n').filter(line => 
        line.trim() && !line.startsWith('#')
      );
      
      this.addCheck(phase, {
        name: 'Environment Variables',
        status: 'success',
        message: `.env.local found with ${envVars.length} variables`,
      });
    } else {
      this.addCheck(phase, {
        name: 'Environment Variables',
        status: 'warning',
        message: '.env.local not found',
      });
    }
  }

  // Phase 2: Network & Connectivity
  private phase2NetworkConnectivity(): void {
    this.logSection('Phase 2: Network & Connectivity Forensics');
    const phase = 'Network & Connectivity';

    // Check if domain is reachable (skip for localhost)
    if (!this.domain.includes('localhost')) {
      try {
        const curlResult = this.execCommand(`curl -sI https://${this.domain} --max-time 10`);
        
        if (curlResult.includes('HTTP/')) {
          const statusMatch = curlResult.match(/HTTP\/\d\.\d (\d+)/);
          const statusCode = statusMatch ? statusMatch[1] : 'unknown';
          
          if (statusCode === '200') {
            this.addCheck(phase, {
              name: 'Domain Accessibility',
              status: 'success',
              message: `Domain returns HTTP ${statusCode}`,
            });
          } else if (statusCode.startsWith('3')) {
            this.addCheck(phase, {
              name: 'Domain Accessibility',
              status: 'warning',
              message: `Domain returns HTTP ${statusCode} (redirect)`,
            });
          } else {
            this.addCheck(phase, {
              name: 'Domain Accessibility',
              status: 'error',
              message: `Domain returns HTTP ${statusCode}`,
            });
          }
        }
      } catch {
        this.addCheck(phase, {
          name: 'Domain Accessibility',
          status: 'error',
          message: 'Unable to reach domain',
        });
      }
    } else {
      this.addCheck(phase, {
        name: 'Domain Accessibility',
        status: 'info',
        message: 'Skipping DNS checks for localhost',
      });
    }

    // Check network interfaces
    const interfaces = networkInterfaces();
    const hasNetwork = Object.values(interfaces).some(addrs => 
      addrs?.some(addr => !addr.internal)
    );
    
    if (hasNetwork) {
      this.addCheck(phase, {
        name: 'Network Interfaces',
        status: 'success',
        message: 'Network interfaces configured',
      });
    }
  }

  // Phase 3: Application Runtime
  private phase3ApplicationRuntime(): void {
    this.logSection('Phase 3: Application Runtime Analysis');
    const phase = 'Application Runtime';

    // Check for running Node processes
    try {
      const processes = this.execCommand('ps aux | grep node | grep -v grep');
      const processCount = processes.trim().split('\n').length;
      
      if (processCount > 0) {
        this.addCheck(phase, {
          name: 'Node.js Processes',
          status: 'success',
          message: `${processCount} Node.js process(es) running`,
        });
      } else {
        this.addCheck(phase, {
          name: 'Node.js Processes',
          status: 'info',
          message: 'No Node.js processes currently running',
        });
      }
    } catch {
      this.addCheck(phase, {
        name: 'Node.js Processes',
        status: 'info',
        message: 'Unable to check running processes',
      });
    }

    // Check common ports
    const commonPorts = [3000, 8080, 80, 443];
    commonPorts.forEach(port => {
      try {
        // nc returns 0 on success, non-zero on failure
        this.execCommand(`nc -z localhost ${port} 2>&1`);
        // If we get here without exception, port is open
        this.addCheck(phase, {
          name: `Port ${port}`,
          status: 'success',
          message: `Port ${port} is listening`,
        });
      } catch {
        // Command failed, port is not listening
        this.addCheck(phase, {
          name: `Port ${port}`,
          status: 'info',
          message: `Port ${port} not listening`,
        });
      }
    });
  }

  // Phase 4: Data Layer
  private phase4DataLayer(): void {
    this.logSection('Phase 4: Data Layer Examination');
    const phase = 'Data Layer';

    // Check for database configuration
    const envFiles = ['.env', '.env.local', '.env.production'];
    let hasDbConfig = false;

    envFiles.forEach(file => {
      if (this.fileExists(file)) {
        const content = this.readFile(file);
        if (content.match(/DATABASE_URL|SUPABASE_URL|MONGODB_URI|POSTGRES/)) {
          hasDbConfig = true;
        }
      }
    });

    if (hasDbConfig) {
      this.addCheck(phase, {
        name: 'Database Configuration',
        status: 'success',
        message: 'Database configuration found',
      });
    } else {
      this.addCheck(phase, {
        name: 'Database Configuration',
        status: 'info',
        message: 'No database configuration detected',
      });
    }

    // Check for Supabase
    if (this.fileExists('supabase-schema.sql')) {
      this.addCheck(phase, {
        name: 'Supabase',
        status: 'success',
        message: 'Supabase schema file found',
      });
    }

    // Check for Prisma
    if (this.fileExists('prisma/schema.prisma')) {
      this.addCheck(phase, {
        name: 'Prisma',
        status: 'success',
        message: 'Prisma schema found',
      });
    }
  }

  // Phase 5: Infrastructure
  private phase5Infrastructure(): void {
    this.logSection('Phase 5: Infrastructure & Platform Layer');
    const phase = 'Infrastructure';

    // Check platform-specific config
    const platformConfigs: Record<string, string[]> = {
      vercel: ['vercel.json'],
      netlify: ['netlify.toml', '_redirects'],
      docker: ['Dockerfile', 'docker-compose.yml', 'docker-compose.yaml'],
      kubernetes: ['k8s', 'kubernetes'],
    };

    const configs = platformConfigs[this.platform] || [];
    configs.forEach(config => {
      if (this.fileExists(config)) {
        this.addCheck(phase, {
          name: `${this.platform.charAt(0).toUpperCase() + this.platform.slice(1)} Config`,
          status: 'success',
          message: `${config} found`,
        });
      }
    });

    // Check CI/CD
    if (this.fileExists('.github/workflows')) {
      const workflows = fs.readdirSync(path.join(process.cwd(), '.github/workflows'));
      this.addCheck(phase, {
        name: 'CI/CD',
        status: 'success',
        message: `GitHub Actions configured (${workflows.length} workflow(s))`,
      });
    }

    // Check disk space
    try {
      const diskInfo = this.execCommand('df -h . | tail -1');
      const usageMatch = diskInfo.match(/(\d+)%/);
      const usage = usageMatch ? parseInt(usageMatch[1]) : 0;
      
      if (usage < 80) {
        this.addCheck(phase, {
          name: 'Disk Space',
          status: 'success',
          message: `Disk usage: ${usage}%`,
        });
      } else if (usage < 90) {
        this.addCheck(phase, {
          name: 'Disk Space',
          status: 'warning',
          message: `Disk usage: ${usage}% - running low`,
        });
      } else {
        this.addCheck(phase, {
          name: 'Disk Space',
          status: 'error',
          message: `Disk usage: ${usage}% - critically low`,
        });
      }
    } catch {
      this.addCheck(phase, {
        name: 'Disk Space',
        status: 'info',
        message: 'Unable to check disk space',
      });
    }
  }

  // Phase 6: Frontend
  private phase6Frontend(): void {
    this.logSection('Phase 6: Frontend & Client-Side Investigation');
    const phase = 'Frontend';

    // Detect framework
    if (this.fileExists('next.config.js') || this.fileExists('next.config.mjs')) {
      this.addCheck(phase, {
        name: 'Framework',
        status: 'success',
        message: 'Next.js detected',
      });
    }

    if (this.fileExists('vite.config.js') || this.fileExists('vite.config.ts')) {
      this.addCheck(phase, {
        name: 'Framework',
        status: 'success',
        message: 'Vite detected',
      });
    }

    // Check TypeScript
    if (this.fileExists('tsconfig.json')) {
      this.addCheck(phase, {
        name: 'TypeScript',
        status: 'success',
        message: 'TypeScript configuration found',
      });
    }

    // Check Tailwind
    if (this.fileExists('tailwind.config.js') || this.fileExists('tailwind.config.ts')) {
      this.addCheck(phase, {
        name: 'Styling',
        status: 'success',
        message: 'Tailwind CSS detected',
      });
    }

    // Check public assets
    if (this.fileExists('public')) {
      this.addCheck(phase, {
        name: 'Static Assets',
        status: 'success',
        message: 'public directory found',
      });
    }
  }

  // Phase 7: Configuration
  private phase7Configuration(): void {
    this.logSection('Phase 7: Configuration & Code Analysis');
    const phase = 'Configuration';

    // Check for app structure
    if (this.fileExists('app')) {
      try {
        const appDir = path.join(process.cwd(), 'app');
        // Use Node.js fs methods instead of shell commands for safety
        const files = this.findFiles(appDir, ['page.tsx', 'page.js']);
        
        this.addCheck(phase, {
          name: 'Application Structure',
          status: 'success',
          message: `Next.js App Router with ${files.length} route(s)`,
        });
      } catch {
        this.addCheck(phase, {
          name: 'Application Structure',
          status: 'info',
          message: 'Unable to count routes',
        });
      }
    } else if (this.fileExists('pages')) {
      this.addCheck(phase, {
        name: 'Application Structure',
        status: 'success',
        message: 'Next.js Pages Router detected',
      });
    }

    // Check for API routes
    if (this.fileExists('app/api')) {
      try {
        const apiDir = path.join(process.cwd(), 'app/api');
        const apiFiles = this.findFiles(apiDir, ['route.ts', 'route.js']);
        
        this.addCheck(phase, {
          name: 'API Routes',
          status: 'success',
          message: `${apiFiles.length} API route(s) found`,
        });
      } catch {
        this.addCheck(phase, {
          name: 'API Routes',
          status: 'info',
          message: 'Unable to count API routes',
        });
      }
    }

    // Check ESLint
    if (this.fileExists('.eslintrc.js') || this.fileExists('eslint.config.mjs')) {
      this.addCheck(phase, {
        name: 'Linting',
        status: 'success',
        message: 'ESLint configuration found',
      });
    }

    // Check README
    if (this.fileExists('README.md')) {
      this.addCheck(phase, {
        name: 'Documentation',
        status: 'success',
        message: 'README.md found',
      });
    }
  }

  // Phase 8: Monitoring
  private phase8Monitoring(): void {
    this.logSection('Phase 8: Monitoring & Observability');
    const phase = 'Monitoring';

    const pkgContent = this.readFile('package.json');
    
    if (pkgContent.includes('sentry') || pkgContent.includes('@sentry')) {
      this.addCheck(phase, {
        name: 'Error Tracking',
        status: 'success',
        message: 'Sentry integration detected',
      });
    }

    if (pkgContent.match(/analytics|plausible|google-analytics/i)) {
      this.addCheck(phase, {
        name: 'Analytics',
        status: 'success',
        message: 'Analytics integration detected',
      });
    }
  }

  // Phase 9: Security
  private phase9Security(): void {
    this.logSection('Phase 9: Security & Access Control');
    const phase = 'Security';

    // Check if .env.local is tracked
    try {
      const tracked = this.execCommand('git ls-files --error-unmatch .env.local 2>&1');
      if (!tracked.includes('error')) {
        this.addCheck(phase, {
          name: 'Secret Management',
          status: 'error',
          message: '.env.local is tracked in git - SECURITY RISK!',
        });
      } else {
        this.addCheck(phase, {
          name: 'Secret Management',
          status: 'success',
          message: '.env.local not tracked in git',
        });
      }
    } catch {
      this.addCheck(phase, {
        name: 'Secret Management',
        status: 'success',
        message: '.env.local not tracked in git',
      });
    }

    // Check for authentication
    const envContent = this.readFile('.env.local') + this.readFile('.env');
    if (envContent.match(/AUTH|NEXTAUTH|SUPABASE_AUTH/)) {
      this.addCheck(phase, {
        name: 'Authentication',
        status: 'success',
        message: 'Authentication system detected',
      });
    }
  }

  // Phase 10: Dependencies
  private phase10Dependencies(): void {
    this.logSection('Phase 10: Dependency & Third-Party Analysis');
    const phase = 'Dependencies';

    try {
      const auditResult = this.execCommand('npm audit --json');
      const audit = JSON.parse(auditResult);
      
      if (audit.metadata) {
        const { vulnerabilities } = audit.metadata;
        const total = vulnerabilities.total || 0;
        
        if (total === 0) {
          this.addCheck(phase, {
            name: 'Security Audit',
            status: 'success',
            message: 'No vulnerabilities found',
          });
        } else {
          const critical = vulnerabilities.critical || 0;
          const high = vulnerabilities.high || 0;
          
          if (critical > 0 || high > 0) {
            this.addCheck(phase, {
              name: 'Security Audit',
              status: 'error',
              message: `${total} vulnerabilities found (${critical} critical, ${high} high)`,
            });
          } else {
            this.addCheck(phase, {
              name: 'Security Audit',
              status: 'warning',
              message: `${total} vulnerabilities found (low/moderate)`,
            });
          }
        }
      }
    } catch {
      this.addCheck(phase, {
        name: 'Security Audit',
        status: 'info',
        message: 'Unable to run security audit',
      });
    }
  }

  // Generate report
  private generateReport(): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const reportPath = path.join(this.reportDir, `investigation_${timestamp}.json`);
    const mdReportPath = path.join(this.reportDir, `investigation_${timestamp}.md`);

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));

    // Generate Markdown report
    let mdContent = `# Deployment Investigation Report\n\n`;
    mdContent += `**Generated:** ${this.report.summary.timestamp}\n`;
    mdContent += `**Domain:** ${this.report.summary.domain}\n`;
    mdContent += `**Platform:** ${this.report.summary.platform}\n`;
    mdContent += `**Investigator:** ${this.report.summary.investigator}\n\n`;
    mdContent += `---\n\n`;

    this.report.results.forEach(result => {
      mdContent += `## ${result.phase}\n\n`;
      
      result.checks.forEach(check => {
        const icon = {
          success: '✅',
          warning: '⚠️',
          error: '❌',
          info: 'ℹ️',
        }[check.status];

        mdContent += `${icon} **${check.name}:** ${check.message}\n`;
        if (check.details) {
          mdContent += `\n\`\`\`\n${check.details}\n\`\`\`\n`;
        }
        mdContent += `\n`;
      });

      mdContent += `\n`;
    });

    // Add recommendations
    mdContent += `## Recommendations\n\n`;
    const errors = this.report.results.flatMap(r => r.checks.filter(c => c.status === 'error'));
    const warnings = this.report.results.flatMap(r => r.checks.filter(c => c.status === 'warning'));

    if (errors.length > 0) {
      mdContent += `### Critical Issues (${errors.length})\n\n`;
      errors.forEach(error => {
        mdContent += `- ❌ ${error.message}\n`;
      });
      mdContent += `\n`;
    }

    if (warnings.length > 0) {
      mdContent += `### Warnings (${warnings.length})\n\n`;
      warnings.forEach(warning => {
        mdContent += `- ⚠️ ${warning.message}\n`;
      });
      mdContent += `\n`;
    }

    fs.writeFileSync(mdReportPath, mdContent);

    this.log(`\n${'═'.repeat(70)}`, 'green');
    this.log('  Investigation Complete!', 'green');
    this.log(`${'═'.repeat(70)}`, 'green');
    this.log(`\nReports saved to:`, 'cyan');
    this.log(`  - JSON: ${reportPath}`, 'cyan');
    this.log(`  - Markdown: ${mdReportPath}`, 'cyan');
    this.log('');
  }

  // Run all phases
  public async investigate(): Promise<void> {
    this.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ULTIMATE PLATFORM DEPLOYMENT INVESTIGATION TOOL            ║
║   TypeScript/Node.js Version 1.0.0                           ║
║                                                              ║
║   Military-Grade Deployment Diagnostics                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `, 'magenta');

    this.phase1DeploymentVerification();
    this.phase2NetworkConnectivity();
    this.phase3ApplicationRuntime();
    this.phase4DataLayer();
    this.phase5Infrastructure();
    this.phase6Frontend();
    this.phase7Configuration();
    this.phase8Monitoring();
    this.phase9Security();
    this.phase10Dependencies();

    this.generateReport();
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const domain = args[0] || 'localhost:3000';
  const platform = args[1] || 'vercel';

  const investigator = new DeploymentInvestigator(domain, platform);
  investigator.investigate().catch(console.error);
}

export { DeploymentInvestigator };
export type { DiagnosticResult, Check, InvestigationReport };
