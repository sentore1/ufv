import HeroSlider from "./components/HeroSlider";
import ScrollToTop from "./components/ScrollToTop";
import ProgramAccordion from "./components/ProgramAccordion";
import Navigation from "./components/Navigation";
import MissionSection from "./components/MissionSection";
import ImpactSection from "./components/ImpactSection";
import PartnersSection from "./components/PartnersSection";
import CTASection from "./components/CTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSlider />
      <MissionSection />
      <ImpactSection />
      <ProgramAccordion />
      <PartnersSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}