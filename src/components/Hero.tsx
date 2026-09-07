import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import radekPhoto from '@/assets/radek-vetrovsky.png';
import { useNavigate } from 'react-router-dom';

const REMAX_LOGO = 'https://www.remax-czech.cz/bundles/daltenweb/img/logo/remax-cze_balon_logo_2.svg?20250618';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background">
      <motion.div style={{ opacity }} className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              {/* RE/MAX Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center lg:justify-start mb-5"
              >
                <img
                  src={REMAX_LOGO}
                  alt="RE/MAX Česká republika"
                  className="h-10 md:h-12 w-auto"
                  loading="eager"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block mb-5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
              >
                <span className="text-sm font-semibold text-primary">
                  RE/MAX Power 2 • Příbram
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight mb-5"
              >
                Nemovitosti
                <span className="block mt-1">
                  <span className="text-secondary">jen nenabízím,</span>
                </span>
                <span className="block">ale prodávám!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg lg:text-xl text-foreground/55 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Realitní makléř pro Příbram a Prahu
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                >
                  Odhad zdarma
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={scrollToAbout}
                >
                  Více o mně
                </Button>
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-foreground/45"
              >
                <a
                  href="tel:+420721855854"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+420 721 855 854</span>
                </a>
                <a
                  href="mailto:radek.vetrovsky@re-max.cz"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">radek.vetrovsky@re-max.cz</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              {/* Mobile/Tablet photo */}
              <div className="lg:hidden relative w-full max-w-[200px] h-64 sm:max-w-[240px] sm:h-80">
                <div className="absolute inset-0 bg-primary/8 rounded-2xl blur-xl scale-105" />
                <img
                  src={radekPhoto}
                  alt="Radek Větrovský - Realitní makléř RE/MAX"
                  className="relative w-full h-full object-cover object-bottom rounded-2xl shadow-lg"
                />
              </div>

              {/* Desktop photo */}
              <div className="hidden lg:block relative">
                <div className="relative w-[520px] h-[700px] xl:w-[600px] xl:h-[800px] -mt-8 -mb-60 -mr-4">
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský - Realitní makléř RE/MAX"
                    className="w-full h-full object-cover object-bottom rounded-3xl shadow-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
