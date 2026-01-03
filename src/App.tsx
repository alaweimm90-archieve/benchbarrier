import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { initGA, logPageView } from './lib/analytics';
import { registerServiceWorker, initPWAInstallPrompt } from './lib/pwa';
import { SkipToContent } from './components/accessibility/SkipToContent';
import { FocusManager } from './components/accessibility/FocusManager';
import { CookieConsent } from './components/security/CookieConsent';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LeadMagnet from "./pages/LeadMagnet";
import Quiz from "./pages/Quiz";
import Comparison from "./pages/Comparison";
import Referral from "./pages/Referral";
import SuccessStories from "./pages/SuccessStories";
import Partnerships from "./pages/Partnerships";
import UGCSubmission from "./pages/UGCSubmission";
import Contest from "./pages/Contest";
import Ambassador from "./pages/Ambassador";
import ShareableContent from "./pages/ShareableContent";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Waitlist from "./pages/Waitlist";
import Loyalty from "./pages/Loyalty";
import BlogCMS from "./pages/BlogCMS";
import Newsletter from "./pages/Newsletter";
import Resources from "./pages/Resources";
import Payment from "./pages/Payment";
import MemberPortal from "./pages/MemberPortal";
import AdminDashboard from "./pages/AdminDashboard";
import LinkInBio from "./pages/LinkInBio";
import GMBOptimization from "./pages/GMBOptimization";
import ReviewGeneration from "./pages/ReviewGeneration";
import SystemDashboard from "./pages/SystemDashboard";

const queryClient = new QueryClient();

// Initialize Google Analytics (replace with your actual GA4 Measurement ID)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
  initGA(GA_MEASUREMENT_ID);
}

// Initialize PWA
registerServiceWorker();
initPWAInstallPrompt();

// Component to track page views
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      logPageView(location.pathname + location.search, document.title);
    }
  }, [location]);

  return null;
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
