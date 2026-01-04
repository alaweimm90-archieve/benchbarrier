/**
 * System Usage Examples
 * Demonstrates how to use the core systems
 */

import { PaymentWorkflow } from '../core/usecases/PaymentWorkflow';
import { MarketingAutomation } from '../core/usecases/MarketingAutomation';
import { ContentSynthesis } from '../core/usecases/ContentSynthesis';
import { KernelSystem } from '../knowledge/kernels/KernelSystem';
import { RefactoringEngine } from '../automations/workflows/RefactoringEngine';
import { PerformanceMonitor } from '../infrastructure/monitoring/PerformanceMonitor';
import { ThemeOptimizer } from '../infrastructure/config/ThemeOptimizer';
import { StripeAdapter } from '../adapters/api/StripeAdapter';
import { EmailJSAdapter } from '../adapters/external/EmailJSAdapter';
import { SimpleFraudDetector } from '../infrastructure/security/FraudDetector';
import { Payment, PaymentStatus, PaymentMethod, MembershipTier } from '../core/domain/types';

// ============================================================================
// Example 1: Process a Payment with Fraud Detection
// ============================================================================

export async function processPaymentExample() {
  // Initialize adapters
  const stripeAdapter = new StripeAdapter('pk_test_...');
  await stripeAdapter.initialize();
  
  const fraudDetector = new SimpleFraudDetector();
  
  // Create payment workflow
  const paymentWorkflow = new PaymentWorkflow(stripeAdapter, fraudDetector);
  
  // Create payment object
  const payment: Payment = {
    id: 'pay_123',
    userId: 'user_456',
    amount: 19900, // $199.00
    currency: 'usd',
    status: PaymentStatus.PENDING,
    method: PaymentMethod.CARD,
    timestamp: new Date(),
    metadata: {
      membershipTier: MembershipTier.ELITE,
      billingCountry: 'US',
      shippingCountry: 'US'
    }
  };
  
  // Process payment
  const result = await paymentWorkflow.processPayment(payment);
  
  if (result.success) {
    console.log('Payment successful!', result.transactionId);
  } else {
    console.error('Payment failed:', result.error);
  }
}

// ============================================================================
// Example 2: Start Marketing Automation Campaign
// ============================================================================

export async function startMarketingCampaignExample() {
  // Initialize email service
  const emailService = new EmailJSAdapter('service_id', 'public_key');
  
  // Mock segmentation engine
  const segmentationEngine = {
    segmentUsers: async (criteria: any) => [],
    predictLTV: async (userId: string) => 5000
  };
  
  // Create marketing automation
  const marketing = new MarketingAutomation(emailService, segmentationEngine);
  
  // Start lead nurture for new user
  await marketing.startLeadNurture('user_789');
  console.log('Lead nurture campaign started');
  
  // Handle behavioral trigger
  await marketing.handleTrigger({
    type: 'purchase',
    userId: 'user_789',
    metadata: {
      amount: 199,
      product: 'Elite Membership'
    }
  });
  console.log('Purchase trigger handled');
}

// ============================================================================
// Example 3: Generate Social Media Content
// ============================================================================

export async function generateSocialContentExample() {
  // Mock trend analyzer
  const trendAnalyzer = {
    getTrendingTopics: async (platform: any) => [
      {
        topic: 'Home Workouts',
        volume: 15000,
        sentiment: 'positive' as const,
        relatedHashtags: ['#HomeWorkout', '#FitnessAtHome', '#NoGymNeeded']
      }
    ],
    analyzeSentiment: async (content: string) => ({
      score: 0.8,
      magnitude: 0.9,
      emotions: { joy: 0.7, excitement: 0.6 }
    }),
    predictViralCoefficient: async (content: any) => 0.75
  };
  
  // Create content synthesis
  const contentSynthesis = new ContentSynthesis(trendAnalyzer);
  
  // Ingest trends
  const trends = await contentSynthesis.ingestTrends();
  console.log('Trends ingested:', trends.size, 'platforms');
  
  // Generate content ideas
  const allTrends = Array.from(trends.values()).flat();
  const ideas = await contentSynthesis.generateContentIdeas(allTrends);
  console.log('Generated', ideas.length, 'content ideas');
  console.log('Top idea:', ideas[0]);
  
  // Format for multiple platforms
  const baseContent = 'Transform your home into a personal gym! 💪 No equipment needed.';
  const formatted = await contentSynthesis.formatForPlatforms(
    baseContent,
    ['instagram' as any, 'twitter' as any, 'facebook' as any]
  );
  
  console.log('Formatted content for', formatted.size, 'platforms');
}

// ============================================================================
// Example 4: Use Documentation Kernel System
// ============================================================================

export function useKernelSystemExample() {
  const kernelSystem = new KernelSystem();
  
  // Add a kernel
  kernelSystem.addKernel({
    id: 'react-hooks',
    title: 'React Hooks Guide',
    type: 'howto' as any,
    content: 'React Hooks allow you to use state and lifecycle features in functional components...',
    tags: ['react', 'hooks', 'frontend'],
    dependencies: ['react-basics'],
    version: '1.0.0',
    lastUpdated: new Date(),
    metadata: {
      author: 'Dev Team',
      difficulty: 'intermediate',
      estimatedReadTime: 10,
      codeExamples: 5,
      relatedFiles: ['src/hooks/']
    }
  });
  
  // Search kernels
  const results = kernelSystem.search('react hooks');
  console.log('Found', results.length, 'kernels');
  
  // Get learning path
  const path = kernelSystem.getLearningPath('react');
  console.log('Learning path:', path.map(k => k.title));
  
  // Get tooltip
  const tooltip = kernelSystem.getTooltip('react-hooks');
  console.log('Tooltip:', tooltip);
  
  // Generate dependency graph
  const graph = kernelSystem.generateDependencyGraph();
  console.log('Graph:', graph.nodes.length, 'nodes,', graph.links.length, 'links');
}

// ============================================================================
// Example 5: Run Refactoring Analysis
// ============================================================================

export function runRefactoringAnalysisExample() {
  const engine = new RefactoringEngine();
  
  // Sample code to analyze
  const code = `
    function processOrder(order) {
      if (order.items.length > 0 && order.total > 100 && order.user.verified && !order.user.banned) {
        // 50+ lines of processing logic...
        const tax = order.total * 0.08;
        const shipping = 15;
        const total = order.total + tax + shipping;
        // More processing...
        return total;
      }
    }
  `;
  
  // Detect code smells
  const smells = engine.detectCodeSmells(code, 'src/orders/processor.ts');
  console.log('Found', smells.length, 'code smells');
  smells.forEach(smell => {
    console.log(`- ${smell.type} (${smell.severity}): ${smell.description}`);
  });
  
  // Calculate metrics
  const metrics = engine.calculateMetrics(code, 'src/orders/processor.ts');
  console.log('Metrics:', {
    linesOfCode: metrics.linesOfCode,
    complexity: metrics.cyclomaticComplexity,
    maintainability: metrics.maintainabilityIndex
  });
  
  // Get refactoring pattern
  const pattern = engine.getRefactoringPattern('complex_conditional' as any);
  if (pattern) {
    console.log('Refactoring pattern:', pattern.name);
    console.log('Steps:', pattern.steps);
  }
}

// ============================================================================
// Example 6: Monitor Performance
// ============================================================================

export async function monitorPerformanceExample() {
  const monitor = new PerformanceMonitor();
  
  // Capture web vitals
  const vitals = monitor.captureWebVitals();
  console.log('Web Vitals:', {
    LCP: vitals.lcp,
    FID: vitals.fid,
    CLS: vitals.cls,
    TTFB: vitals.ttfb,
    FCP: vitals.fcp
  });
  
  // Get performance score
  const score = monitor.getPerformanceScore();
  console.log('Performance Score:', score);
  
  // Calculate tech debt
  const techDebt = monitor.calculateTechDebtIndex({
    totalIssues: 20,
    criticalIssues: 3,
    codeSmells: 12,
    duplications: 5,
    coverage: 70,
    maintainabilityIndex: 65
  });
  console.log('Tech Debt Index:', techDebt);
  
  // Check system health
  const health = await monitor.checkSystemHealth();
  console.log('System Health:', health.status);
  console.log('Error Rate:', health.errorRate, '%');
  console.log('Response Time:', health.responseTime, 'ms');
  
  // Generate report
  const report = monitor.generateReport();
  console.log('Performance Report:', report);
}

// ============================================================================
// Example 7: Optimize Theme
// ============================================================================

export function optimizeThemeExample() {
  const themeConfig = {
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#F59E0B',
      background: '#0F172A',
      foreground: '#F8FAFC',
      muted: '#64748B',
      border: '#334155',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B'
    },
    typography: {
      fontFamily: {
        sans: 'Inter, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Fira Code, monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  };
  
  const optimizer = new ThemeOptimizer(themeConfig);
  
  // Generate critical CSS
  const criticalCSS = optimizer.generateCriticalCSS();
  console.log('Critical CSS generated:', criticalCSS.length, 'bytes');
  
  // Validate WCAG compliance
  const wcag = optimizer.validateWCAG();
  console.log('WCAG Compliance:', wcag.compliant ? 'PASS' : 'FAIL');
  console.log('Issues:', wcag.issues);
  console.log('Score:', wcag.score);
  
  // Check performance budget
  const budget = optimizer.checkPerformanceBudget({
    cssSize: 45,
    jsSize: 180,
    imageSize: 80,
    fonts: 2,
    animations: 8
  });
  console.log('Budget Check:', budget.passed ? 'PASS' : 'FAIL');
  console.log('Utilization:', budget.utilization);
  
  // Generate device variants
  const variants = optimizer.generateDeviceVariants();
  console.log('Generated', variants.size, 'device variants');
  
  // Optimize animations
  const animationOptimization = optimizer.optimizeAnimations();
  console.log('Animation Optimization:', animationOptimization.recommendations);
}

// ============================================================================
// Example 8: Complete Workflow - New User Journey
// ============================================================================

export async function completeUserJourneyExample() {
  console.log('=== New User Journey ===\n');
  
  // 1. User signs up
  console.log('1. User signs up...');
  const userId = 'user_' + Date.now();
  
  // 2. Start marketing automation
  console.log('2. Starting lead nurture campaign...');
  const emailService = new EmailJSAdapter('service_id', 'public_key');
  const segmentationEngine = {
    segmentUsers: async () => [],
    predictLTV: async () => 5000
  };
  const marketing = new MarketingAutomation(emailService, segmentationEngine);
  await marketing.startLeadNurture(userId);
  
  // 3. User completes quiz
  console.log('3. User completes fitness quiz...');
  await marketing.handleTrigger({
    type: 'milestone',
    userId,
    metadata: { milestone: 'quiz_completed' }
  });
  
  // 4. User makes purchase
  console.log('4. Processing payment...');
  const stripeAdapter = new StripeAdapter('pk_test_...');
  await stripeAdapter.initialize();
  const fraudDetector = new SimpleFraudDetector();
  const paymentWorkflow = new PaymentWorkflow(stripeAdapter, fraudDetector);
  
  const payment: Payment = {
    id: 'pay_' + Date.now(),
    userId,
    amount: 19900,
    currency: 'usd',
    status: PaymentStatus.PENDING,
    method: PaymentMethod.CARD,
    timestamp: new Date()
  };
  
  const result = await paymentWorkflow.processPayment(payment);
  console.log('Payment result:', result.success ? 'SUCCESS' : 'FAILED');
  
  // 5. Start retention campaign
  if (result.success) {
    console.log('5. Starting retention campaign...');
    await marketing.scheduleRetentionCampaign(userId);
  }
  
  console.log('\n=== Journey Complete ===');
}

// Export all examples
export const examples = {
  processPayment: processPaymentExample,
  startMarketingCampaign: startMarketingCampaignExample,
  generateSocialContent: generateSocialContentExample,
  useKernelSystem: useKernelSystemExample,
  runRefactoringAnalysis: runRefactoringAnalysisExample,
  monitorPerformance: monitorPerformanceExample,
  optimizeTheme: optimizeThemeExample,
  completeUserJourney: completeUserJourneyExample
};
