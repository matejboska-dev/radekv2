import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCTABar from '@/components/MobileCTABar';
import { useNavigate } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const REMAX_LOGO = 'https://www.remax-czech.cz/bundles/daltenweb/img/logo/remax-cze_balon_logo_2.svg?20250618';

const agentFeatures = [
  'Přesné vyhodnocení trhu a lokalit',
  'Zohlednění technického stavu a dispozic',
  'Reálná cena, která obstojí při jednání',
  'Podklady vhodné pro prodej, dědictví i banku',
];

const onlineFeatures = [
  'Průměrné ceny bez individuálního posouzení',
  'Nezohledňuje technický stav nemovitosti',
  'Velké odchylky od skutečné hodnoty',
  'Slabá vyjednávací pozice při prodeji',
];

const OdhadNemovitosti = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#odhad-form') {
      setTimeout(() => {
        const isMobile = window.innerWidth < 1024;
        const targetId = isMobile ? 'odhad-form-card' : 'odhad-form';
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
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
      const { error } = await supabase.functions.invoke('send-email', {
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

      if (error) throw error;

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

      <main className="flex-1 pt-20">
        {/* Hero – light */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-muted">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={REMAX_LOGO}
                alt="RE/MAX"
                className="h-12 w-auto mx-auto mb-6"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Zjistěte skutečnou hodnotu
                <span className="block mt-2 text-secondary">vaší nemovitosti</span>
              </h1>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
                Odhad připravený na základě reálných dat, aktuální situace na trhu, 
                stavu nemovitosti a osobní znalosti lokality. Zdarma a nezávazně.
              </p>
              <Button
                variant="cta"
                size="xl"
                onClick={() => document.getElementById('odhad-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                Chci odhad zdarma
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Proč makléř?
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Odhad od makléře vs. online kalkulačky
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-md border border-border"
            >
              <div className="grid md:grid-cols-2">
                 {/* Agent side */}
                <div className="bg-card p-6 md:p-10 border-b md:border-b-0 md:border-r border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-foreground text-xl">Odhad od makléře</h3>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {agentFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="cta"
                    size="lg"
                    onClick={() => document.getElementById('odhad-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full group"
                  >
                    Chci odhad zdarma
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Online side */}
                <div className="bg-muted p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="font-bold text-red-500 text-xl">Online kalkulačka</h3>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {onlineFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-red-500">
                        <XCircle className="h-5 w-5 text-red-500/60 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-red-500/60 italic">
                    Výpočet na základě obecných cenových map, bez ohledu na stav nemovitosti 
                    a konkrétní poptávku v lokalitě.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="odhad-form" className="section-padding bg-muted scroll-mt-24">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                  Kontakt
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Zažádejte o odhad zdarma
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Vyplňte formulář a ozvu se vám do 24 hodin. Odhad je zcela zdarma 
                  a nezávazný.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:+420721855854"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Telefon</p>
                      <p className="font-semibold text-foreground">+420 721 855 854</p>
                    </div>
                  </a>

                  <a
                    href="mailto:radek.vetrovsky@re-max.cz"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="font-semibold text-foreground">radek.vetrovsky@re-max.cz</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Adresa</p>
                      <p className="font-semibold text-foreground">Zahradnická 550, 261 01 Příbram III</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                id="odhad-form-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border scroll-mt-24"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Jméno a příjmení *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jan Novák"
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                        Telefon *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+420 xxx xxx xxx"
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jan.novak@email.cz"
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="property-type" className="block text-sm font-medium text-foreground mb-1.5">
                      Typ nemovitosti *
                    </label>
                    <select
                      id="property-type"
                      name="property-type"
                      required
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Vyberte typ</option>
                      <option value="byt">Byt</option>
                      <option value="dum">Rodinný dům</option>
                      <option value="pozemek">Pozemek</option>
                      <option value="komercni">Komerční nemovitost</option>
                      <option value="jine">Jiné</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1.5">
                        Adresa nemovitosti
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Ulice nebo čtvrť, město"
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-foreground mb-1.5">
                        Plocha (m²)
                      </label>
                      <input
                        id="area"
                        name="area"
                        type="number"
                        placeholder="např. 75"
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-foreground mb-1.5">
                      Stav nemovitosti
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Vyberte stav</option>
                      <option value="novostavba">Novostavba</option>
                      <option value="velmi-dobry">Velmi dobrý</option>
                      <option value="prumerny">Průměrný</option>
                      <option value="pred-rekonstrukci">Před rekonstrukcí</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-foreground mb-1.5">
                      Poznámka
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      placeholder="Doplňující informace o nemovitosti..."
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Odesílám...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Odesláno!
                      </>
                    ) : (
                      <>
                        Odeslat žádost o odhad
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Odesláním souhlasíte se zpracováním osobních údajů. Ozvu se do 24 hodin.
                  </p>
                </form>
              </motion.div>
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
