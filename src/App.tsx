import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
