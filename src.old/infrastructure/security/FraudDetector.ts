/**
 * Fraud Detection System
 * Real-time transaction analysis and risk scoring
 */

import { Payment } from '../../core/domain/types';
import { FraudDetector, FraudScore } from '../../core/usecases/PaymentWorkflow';

export class SimpleFraudDetector implements FraudDetector {
  private blacklistedIPs: Set<string>;
  private suspiciousPatterns: Map<string, number>;

  constructor() {
    this.blacklistedIPs = new Set();
    this.suspiciousPatterns = new Map();
  }

  async analyzeTransaction(payment: Payment): Promise<FraudScore> {
    const flags: string[] = [];
    let score = 0;

    // Check amount anomalies
    if (payment.amount > 10000) {
      score += 30;
      flags.push('High transaction amount');
    }

    if (payment.amount < 1) {
      score += 20;
      flags.push('Suspiciously low amount');
    }

    // Check velocity (multiple transactions in short time)
    const velocity = this.checkVelocity(payment.userId);
    if (velocity > 5) {
      score += 25;
      flags.push('High transaction velocity');
    }

    // Check metadata for suspicious patterns
    if (payment.metadata) {
      const metadataScore = this.analyzeMetadata(payment.metadata);
      score += metadataScore;
      
      if (metadataScore > 0) {
        flags.push('Suspicious metadata patterns');
      }
    }

    // Check time of day (unusual hours)
    const hour = new Date(payment.timestamp).getHours();
    if (hour >= 2 && hour <= 5) {
      score += 10;
      flags.push('Transaction during unusual hours');
    }

    // Determine risk level
    let risk: 'low' | 'medium' | 'high';
    if (score >= 50) {
      risk = 'high';
    } else if (score >= 25) {
      risk = 'medium';
    } else {
      risk = 'low';
    }

    return {
      score: Math.min(100, score),
      risk,
      flags
    };
  }

  addToBlacklist(ip: string): void {
    this.blacklistedIPs.add(ip);
  }

  removeFromBlacklist(ip: string): void {
    this.blacklistedIPs.delete(ip);
  }

  private checkVelocity(userId: string): number {
    // Mock implementation - would check database for recent transactions
    const recentTransactions = this.suspiciousPatterns.get(userId) || 0;
    this.suspiciousPatterns.set(userId, recentTransactions + 1);
    
    // Clear after 1 hour
    setTimeout(() => {
      this.suspiciousPatterns.delete(userId);
    }, 3600000);

    return recentTransactions;
  }

  private analyzeMetadata(metadata: Record<string, any>): number {
    let score = 0;

    // Check for VPN/proxy indicators
    if (metadata.vpn || metadata.proxy) {
      score += 15;
    }

    // Check for mismatched billing/shipping
    if (metadata.billingCountry !== metadata.shippingCountry) {
      score += 10;
    }

    // Check for disposable email
    if (metadata.email && this.isDisposableEmail(metadata.email)) {
      score += 20;
    }

    return score;
  }

  private isDisposableEmail(email: string): boolean {
    const disposableDomains = [
      'tempmail.com',
      'throwaway.email',
      '10minutemail.com',
      'guerrillamail.com'
    ];

    const domain = email.split('@')[1];
    return disposableDomains.includes(domain);
  }
}
