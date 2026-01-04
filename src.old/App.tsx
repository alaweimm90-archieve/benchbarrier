import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import OurStory from './pages/about/OurStory';
import Sustainability from './pages/about/Sustainability';
import SizeGuide from './pages/about/SizeGuide';
import CustomerCare from './pages/about/CustomerCare';
import StoreLocator from './pages/about/StoreLocator';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const queryClient = new QueryClient();

// Component to track page views
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views with Plausible
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      // @ts-ignore - Plausible is loaded via script tag
      if (window.plausible) {
        // @ts-ignore
        window.plausible('pageview');
      }
    }
  }, [location]);

  return null;
};

// Stub components for missing imports
const FreeShippingBanner = () => null;
const SkipToContent = () => null;
const FocusManager = () => null;
const CookieConsent = () => null;
const LeadMagnet = () => <div>Lead Magnet</div>;
const Quiz = () => <div>Quiz</div>;
const Comparison = () => <div>Comparison</div>;
const Referral = () => <div>Referral</div>;
const SuccessStories = () => <div>Success Stories</div>;
const Partnerships = () => <div>Partnerships</div>;
const UGCSubmission = () => <div>UGC Submission</div>;
const Contest = () => <div>Contest</div>;
const Ambassador = () => <div>Ambassador</div>;
const ShareableContent = () => <div>Shareable Content</div>;
const Booking = () => <div>Booking</div>;
const FAQ = () => <div>FAQ</div>;
const Waitlist = () => <div>Waitlist</div>;
const Loyalty = () => <div>Loyalty</div>;
const BlogCMS = () => <div>Blog CMS</div>;
const Newsletter = () => <div>Newsletter</div>;
const Resources = () => <div>Resources</div>;
const Payment = () => <div>Payment</div>;
const MemberPortal = () => <div>Member Portal</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const LinkInBio = () => <div>Link In Bio</div>;
const GMBOptimization = () => <div>GMB Optimization</div>;
const ReviewGeneration = () => <div>Review Generation</div>;
const SystemDashboard = () => <div>System Dashboard</div>;

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <FreeShippingBanner />
            <SkipToContent />
            <FocusManager />
            <AnalyticsTracker />
            <CookieConsent />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lead-magnet" element={<LeadMagnet />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/submit-content" element={<UGCSubmission />} />
              <Route path="/contest" element={<Contest />} />
              <Route path="/ambassador" element={<Ambassador />} />
              <Route path="/create-content" element={<ShareableContent />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/blog-cms" element={<BlogCMS />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/member-portal" element={<MemberPortal />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/links" element={<LinkInBio />} />
              <Route path="/gmb" element={<GMBOptimization />} />
              <Route path="/reviews" element={<ReviewGeneration />} />
              <Route path="/system-dashboard" element={<SystemDashboard />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
