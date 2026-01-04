import emailjs from '@emailjs/browser';

// Email service configuration
const EMAIL_SERVICE_ID = 'service_benchbarrier';
const EMAIL_TEMPLATE_IDS = {
  welcome: 'template_welcome',
  consultation: 'template_consultation',
  newsletter: 'template_newsletter',
  birthday: 'template_birthday',
  referral: 'template_referral',
  abandoned: 'template_abandoned',
  reengagement: 'template_reengagement',
  event: 'template_event',
};

// Initialize EmailJS (call this in your app initialization)
export const initEmailService = (publicKey: string) => {
  emailjs.init(publicKey);
};

// Welcome email automation
export const sendWelcomeEmail = async (userData: {
  name: string;
  email: string;
  membershipType?: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.welcome,
      {
        to_name: userData.name,
        to_email: userData.email,
        membership_type: userData.membershipType || 'Standard',
        discount_code: 'WELCOME20',
        message: `Welcome to BenchBarrier! We're excited to have you join our elite fitness community.`,
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
};

// Post-consultation follow-up
export const sendConsultationFollowUp = async (consultationData: {
  name: string;
  email: string;
  consultationType: string;
  trainerName: string;
  recommendations: string[];
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.consultation,
      {
        to_name: consultationData.name,
        to_email: consultationData.email,
        consultation_type: consultationData.consultationType,
        trainer_name: consultationData.trainerName,
        recommendations: consultationData.recommendations.join(', '),
        booking_link: 'https://benchbarrier.com/booking',
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send consultation follow-up:', error);
    return { success: false, error };
  }
};

// Newsletter subscription
export const subscribeToNewsletter = async (subscriberData: {
  email: string;
  name?: string;
  preferences?: string[];
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.newsletter,
      {
        to_email: subscriberData.email,
        to_name: subscriberData.name || 'Fitness Enthusiast',
        preferences: subscriberData.preferences?.join(', ') || 'All Topics',
        confirmation_link: 'https://benchbarrier.com/newsletter/confirm',
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    return { success: false, error };
  }
};

// Birthday email automation
export const sendBirthdayEmail = async (userData: {
  name: string;
  email: string;
  discountCode: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.birthday,
      {
        to_name: userData.name,
        to_email: userData.email,
        discount_code: userData.discountCode,
        message: `Happy Birthday ${userData.name}! Enjoy a special gift from BenchBarrier.`,
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send birthday email:', error);
    return { success: false, error };
  }
};

// Referral program email
export const sendReferralEmail = async (referralData: {
  referrerName: string;
  referrerEmail: string;
  referralCode: string;
  rewardAmount: number;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.referral,
      {
        to_name: referralData.referrerName,
        to_email: referralData.referrerEmail,
        referral_code: referralData.referralCode,
        reward_amount: referralData.rewardAmount,
        referral_link: `https://benchbarrier.com/referral?code=${referralData.referralCode}`,
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send referral email:', error);
    return { success: false, error };
  }
};

// Abandoned cart/signup email
export const sendAbandonedCartEmail = async (userData: {
  name: string;
  email: string;
  cartItems: string[];
  incentiveCode?: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.abandoned,
      {
        to_name: userData.name,
        to_email: userData.email,
        cart_items: userData.cartItems.join(', '),
        incentive_code: userData.incentiveCode || 'COMEBACK15',
        cart_link: 'https://benchbarrier.com/pricing',
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send abandoned cart email:', error);
    return { success: false, error };
  }
};

// Re-engagement campaign
export const sendReengagementEmail = async (userData: {
  name: string;
  email: string;
  lastActiveDate: string;
  winbackOffer: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.reengagement,
      {
        to_name: userData.name,
        to_email: userData.email,
        last_active: userData.lastActiveDate,
        winback_offer: userData.winbackOffer,
        reactivation_link: 'https://benchbarrier.com/reactivate',
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send re-engagement email:', error);
    return { success: false, error };
  }
};

// Event reminder email
export const sendEventReminderEmail = async (eventData: {
  name: string;
  email: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_IDS.event,
      {
        to_name: eventData.name,
        to_email: eventData.email,
        event_name: eventData.eventName,
        event_date: eventData.eventDate,
        event_time: eventData.eventTime,
        event_location: eventData.eventLocation,
        calendar_link: 'https://benchbarrier.com/events/add-to-calendar',
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send event reminder:', error);
    return { success: false, error };
  }
};

// Drip campaign sequence
export const startDripCampaign = async (userData: {
  name: string;
  email: string;
  campaignType: 'onboarding' | 'nurture' | 'conversion';
}) => {
  // This would typically integrate with a backend service
  // For now, we'll simulate the first email in the sequence
  const campaigns = {
    onboarding: {
      day1: 'Welcome to BenchBarrier',
      day3: 'Getting Started Guide',
      day7: 'Meet Your Trainers',
      day14: 'Special Offer Inside',
    },
    nurture: {
      week1: 'Fitness Tips & Tricks',
      week2: 'Success Stories',
      week3: 'Nutrition Guide',
      week4: 'Exclusive Offer',
    },
    conversion: {
      day1: 'Limited Time Offer',
      day3: 'Last Chance',
      day5: 'Final Reminder',
    },
  };

  console.log(`Starting ${userData.campaignType} drip campaign for ${userData.email}`);
  return { success: true, campaign: campaigns[userData.campaignType] };
};

// Email template data
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to BenchBarrier - Your Fitness Journey Starts Now',
    preview: 'Get 20% off your first month',
  },
  consultation: {
    subject: 'Your Personalized Fitness Plan from BenchBarrier',
    preview: 'Here are your next steps',
  },
  newsletter: {
    subject: 'BenchBarrier Monthly Newsletter',
    preview: 'Latest tips, stories, and exclusive offers',
  },
  birthday: {
    subject: 'Happy Birthday from BenchBarrier! 🎉',
    preview: 'Special gift inside',
  },
  referral: {
    subject: 'Share BenchBarrier, Earn Rewards',
    preview: 'Your unique referral code inside',
  },
  abandoned: {
    subject: "Don't Miss Out - Complete Your BenchBarrier Signup",
    preview: 'Special discount waiting for you',
  },
  reengagement: {
    subject: 'We Miss You at BenchBarrier',
    preview: 'Come back with an exclusive offer',
  },
  event: {
    subject: 'Reminder: Upcoming Event at BenchBarrier',
    preview: 'See you soon!',
  },
};
