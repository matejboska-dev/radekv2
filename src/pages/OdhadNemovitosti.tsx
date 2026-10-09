import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Ruler,
  Send,
  User,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Reveal } from '@/components/anim/Reveal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCTABar from '@/components/MobileCTABar';
import EstimateHero from '@/components/EstimateHero';
import StatsBar from '@/components/StatsBar';
import EstimateProcess from '@/components/EstimateProcess';
import EstimateComparison from '@/components/EstimateComparison';
import Testimonials from '@/components/Testimonials';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import radekOdhad from '@/assets/radek-odhad.webp';
import { trackServiceEvent } from '@/lib/service-tracking';

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '+420 721 855 854', href: 'tel:+420721855854' },
  { icon: Mail, label: 'E-mail', value: 'radek.vetrovsky@re-max.cz', href: 'mailto:radek.vetrovsky@re-max.cz' },
  { icon: MapPin, label: 'Adresa', value: 'Zahradnická 550, 261 01 Příbram III', href: 'https://maps.google.com/?q=Zahradnická+550+Příbram' },
];

// Nativní <select> kvůli FormData, vzhledově shodný s <Input> z homepage formuláře.
const selectClass =
  'flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm';

const labelClass = 'text-sm font-medium text-foreground flex items-center gap-2';
const optional = <span className="text-muted-foreground font-normal">(nepovinné)</span>;

const OdhadNemovitosti = () => {
  const { toast } = useToast();
  const { hash } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToForm = () => {
    const isMobile = window.innerWidth < 1024;
    const targetId = isMobile ? 'odhad-form-card' : 'odhad-form';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Kotva #odhad-form funguje při načtení i při proklikání z komponent na stránce
  // (např. tlačítko v porovnání makléř vs. kalkulačka) a z hlavičky.
  useEffect(() => {
    if (hash === '#odhad-form') {
      const t = setTimeout(scrollToForm, 300);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [hash]);

  useEffect(() => {
    const cleanupMeta = setPageMeta(
      'Odhad nemovitosti zdarma – Příbram | Radek Větrovský RE/MAX',
      'Získejte bezplatný a nezávazný odhad hodnoty vaší nemovitosti od certifikovaného makléře RE/MAX v Příbrami. Reálná cena, rychlá odpověď do 24 hodin.',
      '/odhad-nemovitosti'
    );
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Odhad nemovitosti' },
      ],
    });
    return () => { cleanupMeta(); cleanupBreadcrumb(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          message: formData.get('note') as string,
          propertyType: formData.get('property-type') as string,
          address: formData.get('address') as string,
          area: formData.get('area') as string,
          condition: formData.get('condition') as string,
          formType: 'odhad',
        },
      });

      if (error || data?.error || data?.success !== true) throw error || new Error('Contact request failed');

      if (new URLSearchParams(window.location.search).get('zdroj') === 'sluzba-prodej') {
        trackServiceEvent('service_lead_submitted', 'prodej', 'estimate_form');
      }

      setIsSubmitted(true);
      toast({
        title: "Žádost odeslána!",
        description: "Ozvu se vám do 24 hodin.",
      });
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Send email error:', err);
      toast({
        title: "Chyba při odesílání",
        description: "Zkuste to prosím znovu nebo mě kontaktujte telefonicky.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <EstimateHero onCta={scrollToForm} />
        <StatsBar />
        <EstimateProcess />
        <EstimateComparison />
        <Testimonials />

        {/* Formulář: stejná kostra jako sekce Kontakt na homepage */}
        <section
          id="odhad-form"
          className="relative overflow-hidden border-t border-border/50 bg-muted/30 py-16 sm:py-20 md:py-24 lg:py-28 scroll-mt-24"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-6 border-b border-border/50">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    Žádost o odhad
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
                  Zažádejte <br className="hidden sm:block" />
                  o odhad zdarma
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
                  Vyplňte formulář a ozvu se Vám do 24 hodin. Odhad je zcela zdarma a nezávazný.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Kontaktní údaje + Radek */}
              <Reveal variant="fromLeft" className="lg:col-span-2 flex flex-col gap-6">
                <div className="glass-card rounded-2xl p-6 md:p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-6">Kontaktní údaje</h3>
                  <address className="space-y-5 not-italic">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.label === 'Adresa' ? '_blank' : undefined}
                        rel={item.label === 'Adresa' ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                          <item.icon className="h-5 w-5 text-foreground group-hover:text-secondary-foreground transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-foreground group-hover:text-secondary transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </address>
                </div>

                {/* Radek se dívá směrem k formuláři. Spodek postavy zajíždí do paddingu sekce a ořezává ho její okraj. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none relative mt-auto hidden lg:flex justify-center -mb-28 pt-6"
                >
                  <div className="absolute inset-x-[10%] bottom-0 h-[75%] rounded-full bg-[radial-gradient(circle,rgba(20,42,59,0.12)_0%,transparent_70%)] blur-2xl" />
                  <img
                    src={radekOdhad}
                    alt=""
                    width={720}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="relative w-64 xl:w-72 h-auto drop-shadow-[0_18px_30px_rgba(20,42,59,0.18)]"
                  />
                </div>
              </Reveal>

              {/* Formulář */}
              <Reveal variant="fromRight" delay={0.12} className="lg:col-span-3 lg:self-start">
                <div
                  id="odhad-form-card"
                  className="glass-card rounded-2xl p-6 md:p-8 shadow-lg scroll-mt-24"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6">Napište mi o nemovitosti</h3>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">Děkuji za žádost!</h4>
                      <p className="text-muted-foreground">Ozvu se Vám do 24 hodin.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className={labelClass}>
                            <User className="h-4 w-4 text-muted-foreground" />
                            Jméno a příjmení
                          </label>
                          <Input id="name" name="name" type="text" required placeholder="Jan Novák" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className={labelClass}>
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            Telefon
                          </label>
                          <Input id="phone" name="phone" type="tel" required placeholder="+420 123 456 789" className="h-12" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className={labelClass}>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          E-mail {optional}
                        </label>
                        <Input id="email" name="email" type="email" placeholder="jan@email.cz" className="h-12" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="property-type" className={labelClass}>
                          <Home className="h-4 w-4 text-muted-foreground" />
                          Typ nemovitosti
                        </label>
                        <select id="property-type" name="property-type" required className={selectClass} defaultValue="">
                          <option value="">Vyberte typ</option>
                          <option value="byt">Byt</option>
                          <option value="dum">Rodinný dům</option>
                          <option value="pozemek">Pozemek</option>
                          <option value="komercni">Komerční nemovitost</option>
                          <option value="jine">Jiné</option>
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="address" className={labelClass}>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Adresa nemovitosti {optional}
                          </label>
                          <Input id="address" name="address" type="text" placeholder="Ulice nebo čtvrť, město" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="area" className={labelClass}>
                            <Ruler className="h-4 w-4 text-muted-foreground" />
                            Plocha (m²) {optional}
                          </label>
                          <Input id="area" name="area" type="number" placeholder="např. 75" className="h-12" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="condition" className={labelClass}>
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          Stav nemovitosti {optional}
                        </label>
                        <select id="condition" name="condition" className={selectClass} defaultValue="">
                          <option value="">Vyberte stav</option>
                          <option value="novostavba">Novostavba</option>
                          <option value="velmi-dobry">Velmi dobrý</option>
                          <option value="prumerny">Průměrný</option>
                          <option value="pred-rekonstrukci">Před rekonstrukcí</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="note" className={labelClass}>
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          Poznámka {optional}
                        </label>
                        <Textarea
                          id="note"
                          name="note"
                          rows={4}
                          placeholder="Doplňující informace o nemovitosti..."
                          className="resize-none"
                        />
                      </div>

                      <Button type="submit" variant="cta" size="xl" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Odesílám...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Odeslat žádost o odhad
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Odesláním souhlasíte se{' '}
                        <a href="/zpracovani-osobnich-udaju" className="underline hover:text-foreground transition-colors">
                          zpracováním osobních údajů
                        </a>{' '}
                        v souladu s{' '}
                        <a href="/gdpr" className="underline hover:text-foreground transition-colors">
                          zásadami GDPR
                        </a>
                        . Ozvu se Vám do 24 hodin.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <div className="h-16 lg:hidden" aria-hidden="true" />
      <Footer />
      <MobileCTABar />
    </div>
  );
};

export default OdhadNemovitosti;
