/**
 * Core Domain Types
 * Business entities and value objects
 */

export interface User {
  id: string;
  email: string;
  name: string;
  membershipTier: MembershipTier;
  joinDate: Date;
  status: UserStatus;
}

export enum MembershipTier {
  STARTER = 'starter',
  ELITE = 'elite',
  CHAMPION = 'champion',
  PLATINUM = 'platinum'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  TRIAL = 'trial'
}

export interface Booking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  date: Date;
  timeSlot: string;
  status: BookingStatus;
  notes?: string;
}

export enum ServiceType {
  CONSULTATION = 'consultation',
  PERSONAL_TRAINING = 'personal_training',
  GROUP_CLASS = 'group_class',
  NUTRITION = 'nutrition'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  DIGITAL_WALLET = 'digital_wallet'
}

export interface MarketingCampaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: Date;
  endDate?: Date;
  metrics: CampaignMetrics;
}

export enum CampaignType {
  EMAIL = 'email',
  SOCIAL = 'social',
  REFERRAL = 'referral',
  CONTENT = 'content'
}

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
}

export interface ContentPiece {
  id: string;
  title: string;
  type: ContentType;
  platform: Platform[];
  status: ContentStatus;
  publishDate?: Date;
  engagement: EngagementMetrics;
}

export enum ContentType {
  BLOG = 'blog',
  VIDEO = 'video',
  SOCIAL_POST = 'social_post',
  INFOGRAPHIC = 'infographic',
  GUIDE = 'guide'
}

export enum Platform {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  YOUTUBE = 'youtube',
  WEBSITE = 'website'
}

export enum ContentStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface EngagementMetrics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
}
