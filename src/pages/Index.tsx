import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/hooks/useSmoothScroll';
import Header from '@/components/Header';
import HeroMobile from '@/components/HeroMobile';
import HeroDesktop from '@/components/HeroDesktop';
import About from '@/components/About';
import StatsBar from '@/components/StatsBar';
import Services from '@/components/Services';
import EstimateComparison from '@/components/EstimateComparison';
import Properties from '@/components/Properties';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import InstagramCarousel from '@/components/InstagramCarousel';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import MobileCTABar from '@/components/MobileCTABar';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => {
        const element = document.querySelector<HTMLElement>(location.hash);
        if (element) smoothScrollTo(element);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="lg:hidden">
          <HeroMobile />
        </div>
        <div className="hidden lg:block">
          <HeroDesktop />
        </div>
        <StatsBar />
        <Services />
        <About />
        <EstimateComparison />
        <Properties />
        <Testimonials />
        <InstagramCarousel />
        <CTASection />
        <Blog />
        <Contact />
      </main>
      <Footer />
      {/* Odsazení, aby spodní mobilní lišta nepřekrývala patičku */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <FloatingCTA />
      <MobileCTABar />
    </div>
  );
};

export default Index;
