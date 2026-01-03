import GlassmorphNav from "../components/navigation/GlassmorphNav";
import CinematicHero from "../components/hero/CinematicHero";
import ServicesShowcase from "../components/sections/ServicesShowcase";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ResultsGallery from "../components/sections/ResultsGallery";
import PricingSection from "../components/sections/PricingSection";
import TeamSection from "../components/sections/TeamSection";
import ContactSection from "../components/sections/ContactSection";
import InstagramWall from "../components/sections/InstagramWall";
import LuxuryFooter from "../components/sections/LuxuryFooter";
import ScrollProgress from "../components/shared/ScrollProgress";
import LoadingAnimation from "../components/shared/LoadingAnimation";
import { SEOHead } from "@/components/seo/SEOHead";
import { LiveVisitorCounter, RecentSignupsTicker } from "../components/social/SocialProofWidgets";
import ExitIntentPopup from "../components/marketing/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-deep-black">
      <SEOHead />
      <LoadingAnimation />
      <ScrollProgress />
      <GlassmorphNav />
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <CinematicHero />
        <ServicesShowcase />
        <TestimonialsSection />
        <ResultsGallery />
        <PricingSection />
        <TeamSection />
        <ContactSection />
        <InstagramWall />
      </main>
      
      <LiveVisitorCounter />
      <RecentSignupsTicker />
      <ExitIntentPopup variant="discount" />
      <LuxuryFooter />
    </div>
  );
};

export default Index;
