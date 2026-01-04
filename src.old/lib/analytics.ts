import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const logPageView = (path: string, title: string) => {
  ReactGA.send({ hitType: 'pageview', page: path, title });
};

// Track custom events
export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track conversions
export const logConversion = (conversionType: string, value?: number) => {
  ReactGA.event({
    category: 'Conversion',
    action: conversionType,
    value,
  });
};

// Track form submissions
export const logFormSubmission = (formName: string) => {
  logEvent('Form', 'Submit', formName);
};

// Track button clicks
export const logButtonClick = (buttonName: string, location: string) => {
  logEvent('Button', 'Click', `${buttonName} - ${location}`);
};

// Track video plays
export const logVideoPlay = (videoName: string) => {
  logEvent('Video', 'Play', videoName);
};

// Track downloads
export const logDownload = (fileName: string) => {
  logEvent('Download', 'File', fileName);
};

// Track social shares
export const logSocialShare = (platform: string, content: string) => {
  logEvent('Social', 'Share', `${platform} - ${content}`);
};

// Track booking attempts
export const logBookingAttempt = (service: string) => {
  logEvent('Booking', 'Attempt', service);
};

// Track booking completions
export const logBookingComplete = (service: string, value?: number) => {
  logConversion('Booking Complete', value);
  logEvent('Booking', 'Complete', service);
};

// Track quiz completions
export const logQuizComplete = (result: string) => {
  logEvent('Quiz', 'Complete', result);
};

// Track lead captures
export const logLeadCapture = (source: string) => {
  logConversion('Lead Capture');
  logEvent('Lead', 'Capture', source);
};

// Track newsletter signups
export const logNewsletterSignup = (location: string) => {
  logConversion('Newsletter Signup');
  logEvent('Newsletter', 'Signup', location);
};

// Track referral link generation
export const logReferralGenerate = () => {
  logEvent('Referral', 'Generate Link');
};

// Track exit intent popup
export const logExitIntentShow = (variant: string) => {
  logEvent('Exit Intent', 'Show', variant);
};

export const logExitIntentConvert = (variant: string) => {
  logConversion('Exit Intent Convert');
  logEvent('Exit Intent', 'Convert', variant);
};

// Track scroll depth
export const logScrollDepth = (depth: number) => {
  logEvent('Engagement', 'Scroll Depth', `${depth}%`, depth);
};

// Track time on page
export const logTimeOnPage = (seconds: number) => {
  logEvent('Engagement', 'Time on Page', `${seconds}s`, seconds);
};

// Generic event tracker (alias for logEvent)
export const trackEvent = (action: string, params?: Record<string, any>) => {
  ReactGA.event({
    category: params?.category || 'General',
    action,
    label: params?.label,
    value: params?.value,
    ...params
  });
};
