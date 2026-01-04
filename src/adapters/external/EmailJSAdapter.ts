/**
 * EmailJS Adapter
 * Implements EmailService interface for EmailJS integration
 */

import emailjs from '@emailjs/browser';
import { EmailService } from '../../core/usecases/MarketingAutomation';

export class EmailJSAdapter implements EmailService {
  private serviceId: string;
  private publicKey: string;
  private templates: Map<string, string>;

  constructor(serviceId: string, publicKey: string) {
    this.serviceId = serviceId;
    this.publicKey = publicKey;
    this.templates = this.initializeTemplates();
    
    emailjs.init(publicKey);
  }

  async sendEmail(to: string, template: string, data: any): Promise<boolean> {
    const templateId = this.templates.get(template);
    
    if (!templateId) {
      console.error(`Template ${template} not found`);
      return false;
    }

    try {
      const response = await emailjs.send(
        this.serviceId,
        templateId,
        {
          to_email: to,
          ...data
        },
        this.publicKey
      );

      return response.status === 200;
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  }

  async scheduleEmail(
    to: string,
    template: string,
    data: any,
    sendAt: Date
  ): Promise<string> {
    // EmailJS doesn't support scheduling natively
    // Store in database and use a cron job to send
    const scheduleId = `schedule_${Date.now()}`;
    
    // Mock implementation - would integrate with a scheduling service
    console.log(`Scheduled email ${template} for ${to} at ${sendAt}`);
    
    return scheduleId;
  }

  async sendBulkEmails(
    recipients: string[],
    template: string,
    data: any
  ): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();

    for (const recipient of recipients) {
      const success = await this.sendEmail(recipient, template, data);
      results.set(recipient, success);
      
      // Rate limiting - wait 100ms between emails
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }

  private initializeTemplates(): Map<string, string> {
    const templates = new Map<string, string>();

    // Map template names to EmailJS template IDs
    templates.set('welcome', 'template_welcome');
    templates.set('value_prop', 'template_value_prop');
    templates.set('social_proof', 'template_social_proof');
    templates.set('limited_offer', 'template_limited_offer');
    templates.set('purchase_confirmation', 'template_purchase_confirmation');
    templates.set('week_1_checkin', 'template_week_1_checkin');
    templates.set('month_1_progress', 'template_month_1_progress');
    templates.set('month_2_tips', 'template_month_2_tips');
    templates.set('quarter_review', 'template_quarter_review');
    templates.set('re_engagement', 'template_re_engagement');
    templates.set('milestone_celebration', 'template_milestone_celebration');
    templates.set('birthday_special', 'template_birthday_special');

    return templates;
  }
}
