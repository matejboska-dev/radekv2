import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Banknote,
  Building2,
  CheckCircle,
  Clock,
  Calculator,
  Ellipsis,
  Gauge,
  Hammer,
  Home,
  KeyRound,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  ThumbsUp,
  Trees,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Reveal } from '@/components/anim/Reveal';
import OptionTiles, { type OptionTile } from '@/components/OptionTiles';
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

const propertyTypes: OptionTile[] = [
  { value: 'byt', label: 'Byt', icon: Building2 },
  { value: 'dum', label: 'Rodinný dům', icon: Home },
  { value: 'pozemek', label: 'Pozemek', icon: Trees },
  { value: 'komercni', label: 'Komerční', icon: Store },
  { value: 'jine', label: 'Jiné', icon: Ellipsis },
];

const goals: OptionTile[] = [
  { value: 'Prodat', label: 'Prodat', icon: Banknote },
  { value: 'Pronajmout', label: 'Pronajmout', icon: KeyRound },
  { value: 'Jen zjistit cenu', label: 'Jen zjistit cenu', icon: Calculator },
];

const conditions: OptionTile[] = [
  { value: 'novostavba', label: 'Novostavba', icon: Sparkles },
  { value: 'velmi-dobry', label: 'Velmi dobrý', icon: ThumbsUp },
  { value: 'prumerny', label: 'Průměrný', icon: Gauge },
  { value: 'pred-rekonstrukci', label: 'Před rekonstrukcí', icon: Hammer },
];

// Lidsky čitelné popisky pro e-mail (do formuláře se posílá `value`).
const optionLabel = (options: OptionTile[], value: FormDataEntryValue | null) =>
  options.find((o) => o.value === value)?.label ?? '';

const trustPoints = [
  { icon: ShieldCheck, label: 'Zdarma a nezávazně' },
  { icon: Clock, label: 'Odpověď do 24 hodin' },
];

const labelClass = 'text-sm font-medium text-foreground flex items-center gap-2';
const stepLabelClass = 'mb-3 flex items-center gap-2.5 text-sm font-semibold text-foreground';
const stepBadge =
  'flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground';
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
    const goal = formData.get('goal') as string | null;

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          message: [goal && `Záměr: ${goal}`, formData.get('note') as string].filter(Boolean).join('\n'),
          propertyType: optionLabel(propertyTypes, formData.get('property-type')),
          address: formData.get('address') as string,
          area: formData.get('area') as string,
          condition: optionLabel(conditions, formData.get('condition')),
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
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h3 className="text-xl font-bold text-foreground">Napište mi o nemovitosti</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Zabere 60 sekund
                    </span>
                  </div>

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
                    <form onSubmit={handleSubmit} className="space-y-7">
                      <fieldset>
                        <legend className={stepLabelClass}>
                          <span className={stepBadge}>1</span>
                          Jaký typ nemovitosti to je?
                        </legend>
                        <OptionTiles name="property-type" options={propertyTypes} required columns="five" />
                      </fieldset>

                      <fieldset>
                        <legend className={stepLabelClass}>
                          <span className={stepBadge}>2</span>
                          Co s ní plánujete? {optional}
                        </legend>
                        <OptionTiles name="goal" options={goals} columns="three" size="sm" />
                      </fieldset>

                      <fieldset>
                        <legend className={stepLabelClass}>
                          <span className={stepBadge}>3</span>
                          V jakém je stavu? {optional}
                        </legend>
                        <OptionTiles name="condition" options={conditions} columns="four" size="sm" />
                      </fieldset>

                      <div>
                        <p className={stepLabelClass}>
                          <span className={stepBadge}>4</span>
                          Kde se nachází? {optional}
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2 sm:col-span-2">
                            <label htmlFor="address" className={labelClass}>
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              Adresa nemovitosti
                            </label>
                            <Input id="address" name="address" type="text" placeholder="Ulice nebo čtvrť, město" className="h-12" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="area" className={labelClass}>
                              <Ruler className="h-4 w-4 text-muted-foreground" />
                              Plocha (m²)
                            </label>
                            <Input id="area" name="area" type="number" min="0" inputMode="numeric" placeholder="např. 75" className="h-12" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className={stepLabelClass}>
                          <span className={stepBadge}>5</span>
                          Kam Vám mám odpovědět?
                        </p>
                        <div className="space-y-5">
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
                            <label htmlFor="note" className={labelClass}>
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              Poznámka {optional}
                            </label>
                            <Textarea
                              id="note"
                              name="note"
                              rows={3}
                              placeholder="Doplňující informace o nemovitosti..."
                              className="resize-none"
                            />
                          </div>
                        </div>
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
                            Získat odhad zdarma
                          </>
                        )}
                      </Button>

                      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-foreground">
                        {trustPoints.map((point) => (
                          <li key={point.label} className="flex items-center gap-2">
                            <point.icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                            {point.label}
                          </li>
                        ))}
                      </ul>

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
