import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import remaxLogo from '@/assets/remax-logo.png';

const PHONE_DISPLAY = '+420 721 855 854';
const PHONE_HREF = 'tel:+420721855854';

type HeaderProps = {
  staticContent?: boolean;
  serviceCta?: { href: string; label: string; onClick: () => void };
};

const Header = ({ staticContent = false, serviceCta }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
  { href: '#services', label: 'Služby' },
  { href: '#about', label: 'O mně' },
  { href: '#properties', label: 'Reference' },
  { href: '/clanky', label: 'Články' },
  { href: '#contact', label: 'Kontakt' }];


  const AKTUALNI_NABIDKA_URL = 'https://www.remax-czech.cz/reality/nemovitosti-maklere/12799/radek-vetrovsky/';

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/' + href);
        setIsMobileMenuOpen(false);
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handlePrimaryCta = () => {
    if (serviceCta) {
      serviceCta.onClick();
      navigate(serviceCta.href);
    } else if (window.location.pathname === '/odhad-nemovitosti') {
      document.getElementById('odhad-form')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/odhad-nemovitosti#odhad-form');
    }
  };

  const isSubpage = typeof window !== 'undefined' && window.location.pathname !== '/';

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 transition-all duration-300 md:px-5 md:pt-5">
        <div className={`mx-auto flex h-16 max-w-[1380px] items-center justify-between rounded-full border pl-3.5 pr-2 transition-all duration-300 md:h-[4.6rem] md:px-6 ${
          isScrolled || isSubpage ? 'border-border bg-background/95 shadow-[0_16px_38px_-28px_rgba(24,43,58,0.5)] backdrop-blur-md' : 'border-transparent bg-background/70 backdrop-blur-sm'
        }`}>
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              <a href="/" className="flex min-w-0 items-center gap-2 md:gap-3.5" aria-label="Radek Větrovský, úvodní stránka">
                <img src={remaxLogo} alt="RE/MAX" className="h-6 w-auto shrink-0 max-[359px]:hidden sm:h-8 md:h-11" />
                <span className="whitespace-nowrap font-display text-[15px] font-bold tracking-[-0.03em] text-foreground sm:text-xl lg:text-xl xl:text-2xl">
                  Radek Větrovský
                </span>
              </a>
              <a
                href="https://www.instagram.com/radek_vetrovsky/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Radek Větrovský"
                className="hidden text-foreground/80 transition-colors hover:text-secondary sm:inline-flex lg:hidden xl:inline-flex"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-4 pl-4 xl:gap-8 xl:pl-6 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith('#') ? '/' + link.href : link.href}
                  onClick={(event) => { event.preventDefault(); scrollToSection(link.href); }}
                  className="whitespace-nowrap font-sans text-sm xl:text-base font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={AKTUALNI_NABIDKA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap font-sans text-sm xl:text-base font-bold text-secondary transition-colors hover:text-secondary/80"
              >
                Aktuální nabídka
              </a>
              <a
                href={PHONE_HREF}
                aria-label={`Zavolat ${PHONE_DISPLAY}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-sm xl:text-base font-bold text-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden 2xl:inline">{PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                onClick={handlePrimaryCta}
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-secondary px-5 xl:px-6 py-2.5 font-sans text-sm xl:text-base font-bold text-secondary-foreground shadow-lg shadow-secondary/25 transition-all duration-300 hover:bg-secondary/90 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {serviceCta?.label ?? 'Odhad zdarma'}
              </button>
            </nav>

            {/* Mobile: rychlé volání + menu */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={PHONE_HREF}
                aria-label={`Zavolat ${PHONE_DISPLAY}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md shadow-secondary/25"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-controls="site-mobile-menu"
                aria-label="Menu">

                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          id="site-mobile-menu"
          className="service-header-menu fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden">
          
            {/* Close Button */}
            <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center text-foreground hover:text-primary transition-colors z-10"
            aria-label="Zavřít menu">
            
              <X className="h-8 w-8" />
            </button>

            {/* RE/MAX Logo in mobile menu */}
            <div className="absolute top-6 left-6">
              <img src={remaxLogo} alt="RE/MAX" className="h-8 w-auto" width="32" height="32" />
            </div>

            {/* Menu Content */}
            <nav className="container mx-auto flex min-h-full flex-col justify-center gap-2 px-5 pb-8 pt-24">
                {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href.startsWith('#') ? '/' + link.href : link.href}
              onClick={(event) => { event.preventDefault(); scrollToSection(link.href); }}
              className="py-3 text-left text-xl font-medium text-foreground transition-colors hover:text-primary">
              
                  {link.label}
            </a>
            )}
              <a
              href={AKTUALNI_NABIDKA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors py-4">
              
                Aktuální nabídka
              </a>
              <Button
              variant="cta"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handlePrimaryCta();
              }}
              className="mt-8">
              
                {serviceCta?.label ?? 'Odhad zdarma'}
              </Button>
              <a
              href={PHONE_HREF}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-foreground bg-transparent px-8 text-base font-bold text-foreground transition-colors hover:bg-foreground hover:text-white">

                <Phone className="h-5 w-5" />
                Zavolat {PHONE_DISPLAY}
              </a>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default Header;
