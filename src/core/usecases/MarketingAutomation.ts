/**
 * Marketing Automation Use Case
 * Lead → Conversion → Retention → Advocacy workflow
 */

import { User, MarketingCampaign, CampaignType, ContentPiece } from '../domain/types';

export interface EmailService {
  sendEmail(to: string, template: string, data: any): Promise<boolean>;
  scheduleEmail(to: string, template: string, data: any, sendAt: Date): Promise<string>;
}

export interface SegmentationEngine {
  segmentUsers(criteria: SegmentCriteria): Promise<User[]>;
  predictLTV(userId: string): Promise<number>;
}

export interface SegmentCriteria {
  membershipTier?: string[];
  joinDateRange?: { start: Date; end: Date };
  engagementLevel?: 'low' | 'medium' | 'high';
  customAttributes?: Record<string, any>;
}

export interface TriggerEvent {
  type: 'signup' | 'purchase' | 'inactivity' | 'milestone' | 'birthday';
  userId: string;
  metadata?: Record<string, any>;
}

export class MarketingAutomation {
  constructor(
    private emailService: EmailService,
    private segmentationEngine: SegmentationEngine
  ) {}

  /**
   * Lead Nurture Workflow
   * Automated email sequence for new leads
   */
  async startLeadNurture(userId: string): Promise<void> {
    const sequence = [
      { delay: 0, template: 'welcome', subject: 'Welcome to BenchBarrier!' },
      { delay: 2, template: 'value_prop', subject: 'Transform Your Fitness Journey' },
      { delay: 5, template: 'social_proof', subject: 'See What Our Members Achieve' },
      { delay: 7, template: 'limited_offer', subject: 'Exclusive Offer Inside' }
    ];

    for (const step of sequence) {
      const sendAt = new Date();
      sendAt.setDate(sendAt.getDate() + step.delay);

      await this.emailService.scheduleEmail(
        userId,
        step.template,
        { subject: step.subject },
        sendAt
      );
    }
  }

  /**
   * Behavioral Trigger System
   * React to user actions with personalized campaigns
   */
  async handleTrigger(event: TriggerEvent): Promise<void> {
    switch (event.type) {
      case 'signup':
        await this.startLeadNurture(event.userId);
        break;

      case 'purchase':
        await this.sendPurchaseConfirmation(event.userId, event.metadata);
        await this.scheduleRetentionCampaign(event.userId);
        break;

      case 'inactivity':
        await this.sendReEngagementEmail(event.userId);
        break;

      case 'milestone':
        await this.celebrateMilestone(event.userId, event.metadata);
        break;

      case 'birthday':
        await this.sendBirthdayOffer(event.userId);
        break;
    }
  }

  /**
   * Predictive Campaign Optimization
   * Use LTV prediction to prioritize high-value segments
   */
  async optimizeCampaign(campaign: MarketingCampaign): Promise<User[]> {
    // Get all potential recipients
    const allUsers = await this.segmentationEngine.segmentUsers({
      engagementLevel: 'medium'
    });

    // Predict LTV for each user
    const usersWithLTV = await Promise.all(
      allUsers.map(async (user) => ({
        user,
        ltv: await this.segmentationEngine.predictLTV(user.id)
      }))
    );

    // Sort by LTV and return top 20%
    const sorted = usersWithLTV.sort((a, b) => b.ltv - a.ltv);
    const topSegment = sorted.slice(0, Math.ceil(sorted.length * 0.2));

    return topSegment.map(item => item.user);
  }

  /**
   * Retention Campaign
   * Automated check-ins and value reinforcement
   */
  async scheduleRetentionCampaign(userId: string): Promise<void> {
    const touchpoints = [
      { days: 7, template: 'week_1_checkin' },
      { days: 30, template: 'month_1_progress' },
      { days: 60, template: 'month_2_tips' },
      { days: 90, template: 'quarter_review' }
    ];

    for (const touchpoint of touchpoints) {
      const sendAt = new Date();
      sendAt.setDate(sendAt.getDate() + touchpoint.days);

      await this.emailService.scheduleEmail(
        userId,
        touchpoint.template,
        {},
        sendAt
      );
    }
  }

  /**
   * Advocacy Program
   * Turn satisfied customers into brand ambassadors
   */
  async identifyAdvocates(): Promise<User[]> {
    return this.segmentationEngine.segmentUsers({
      engagementLevel: 'high',
      customAttributes: {
        nps_score: { $gte: 9 },
        referrals_made: { $gte: 1 }
      }
    });
  }

  private async sendPurchaseConfirmation(userId: string, metadata?: any): Promise<void> {
    await this.emailService.sendEmail(userId, 'purchase_confirmation', metadata);
  }

  private async sendReEngagementEmail(userId: string): Promise<void> {
    await this.emailService.sendEmail(userId, 're_engagement', {
      incentive: '20% off your next session'
    });
  }

  private async celebrateMilestone(userId: string, metadata?: any): Promise<void> {
    await this.emailService.sendEmail(userId, 'milestone_celebration', metadata);
  }

  private async sendBirthdayOffer(userId: string): Promise<void> {
    await this.emailService.sendEmail(userId, 'birthday_special', {
      discount: '25% off',
      validDays: 7
    });
  }
}
