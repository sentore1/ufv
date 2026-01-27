import HeroSlider from "../components/HeroSlider";
import ScrollToTop from "../components/ScrollToTop";
import ProgramAccordion from "../components/ProgramAccordion";
import Navigation from "../components/Navigation";
import MissionSection from "../components/MissionSection";
import ImpactSection from "../components/ImpactSection";
import CTASection from "../components/CTASection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import NewsletterSection from "../components/NewsletterSection";
import AboutUsSection from "../components/AboutUsSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSlider />
      <MissionSection />
      <ImpactSection />
      <ProgramAccordion />
      <CTASection />
      <ContactSection />
      <AboutUsSection />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}