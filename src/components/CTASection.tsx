import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/anim/Reveal';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <Reveal
          variant="scaleIn"
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-secondary via-secondary to-secondary/85 text-white px-6 py-12 sm:px-12 sm:py-16 md:py-20 text-center shadow-2xl shadow-secondary/25 border border-white/20"
        >
          {/* Abstract curved decorative waves & ambient lights */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Ambient glows */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-200/20 blur-3xl" />

            {/* Elegant overlapping curved geometric shapes from reference image */}
            <svg
              className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
              viewBox="0 0 1000 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <ellipse
                cx="180"
                cy="180"
                rx="420"
                ry="280"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />
              <ellipse
                cx="820"
                cy="120"
                rx="400"
                ry="300"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />
              <path
                d="M 520 -50 C 420 140, 200 240, -40 260 L -40 400 L 1040 400 L 1040 -50 Z"
                fill="white"
                fillOpacity="0.07"
              />
              <path
                d="M 780 -50 C 660 120, 520 260, 240 400 L 1040 400 L 1040 -50 Z"
                fill="white"
                fillOpacity="0.05"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold uppercase tracking-tight text-white leading-[1.15] mb-4 sm:mb-6">
              Chcete prodat<br className="hidden sm:inline" /> bez zbytečných starostí?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-red-50/90 font-normal leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
              Svěřte prodej do rukou zkušeného makléře. Postarám se o vše od odhadu ceny 
              přes marketing až po předání klíčů novým majitelům. Vy jen řeknete ano.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-white hover:bg-white/90 text-primary font-syne font-bold text-xs sm:text-sm uppercase tracking-wider pl-7 sm:pl-9 pr-3 sm:pr-3.5 h-12 sm:h-14 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group w-full sm:w-auto"
              >
                <span>Chci odhad zdarma</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </button>

              <a
                href="tel:+420721855854"
                className="inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 text-white font-syne font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 h-12 sm:h-14 rounded-full border border-white/30 backdrop-blur-sm hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                <span>Zavolat nyní</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
