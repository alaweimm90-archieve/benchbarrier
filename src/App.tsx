import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lead-magnet" element={<LeadMagnet />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
