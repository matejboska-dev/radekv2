import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle, ArrowRight, ShieldCheck, Search, FileText, Wrench, Phone, Mail,
  ChevronRight, Camera, Megaphone, Users, Scale, KeyRound, Zap, Clock, Star, MapPin, Building2, HelpCircle,
  XCircle, CheckCircle2, AlertTriangle, FileSpreadsheet, UserCheck, Lock, Award
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { Button } from '@/components/ui/button';
import { setPageMeta, injectJsonLd } from '@/lib/seo';

// Assets - Real photos & awards from the repository
import radekPhoto from '@/assets/radek-vetrovsky.png';
import remaxLogo from '@/assets/remax-logo.png';
import award25 from '@/assets/award-25.svg';
import award8 from '@/assets/award-8.svg';
import saleBrodska from '@/assets/property-byt-brodska-pribram.webp';
import saleZdabor from '@/assets/property-byt-zdabor-slunna-pribram.webp';
import saleCertak from '@/assets/property-byt-certak-pribram.jpg';
import saleCechovska from '@/assets/property-byt-cechovska.webp';

const REMAX_LOGO = remaxLogo;

const PronajemNemovitosti = () => {
  const CANONICAL_PATH = '/sluzby/pronajem-nemovitosti-pribram';
  const PAGE_TITLE = 'Pronájem nemovitosti Příbram | Realitní makléř';
  const PAGE_DESC = 'Hledáte pomoc s pronájmem nemovitosti v Příbrami? Postarám se o nalezení prověřených nájemníků, smlouvy i celý průběh pronájmu.';

  const faqItems = [
    {
      q: 'Jak dlouho trvá pronájem bytu nebo domu v Příbrami?',
      a: 'Při správně nastavené tržní ceně a profesionální prezentaci nacházím prověřeného nájemníka v Příbrami obvykle během 2 až 3 týdnů od spuštění inzerce. U žádaných lokalit jako Zdaboř nebo Příbram VII to bývá ještě rychlejší.',
    },
    {
      q: 'Jak přesně prověřujete potenciální nájemníky před podpisem smlouvy?',
      a: 'Každého vážného zájemce důkladně lustruji v Centrální evidenci exekucí (CEE), Insolvenčním rejstříku i v dlužnických databázích. Zároveň si ověřuji pracovní stabilitu a bezúhonnost, abych eliminoval riziko neplatičů.',
    },
    {
      q: 'Kolik stojí vaše služby zprostředkování pronájmu nemovitosti?',
      a: 'Na realitním trhu v Příbrami je standardní praxí, že provizi za zprostředkování pronájmu (ve výši jednoho měsíčního nájmu) hradí vybraný nájemník. Pro vás jako majitele nemovitosti je tak kompletní profesionální servis de facto zdarma.',
    },
    {
      q: 'Jak vysokou jistotu (kauci) bych měl jako pronajímatel požadovat?',
      a: 'V Příbrami běžně doporučuji vybírat kauci ve výši 1 až 2 měsíčních nájmů podle stavu a vybavení bytu. U nadstandardně zařízených nemovitostí lze požadovat až 3 měsíční nájmy, což je zákonné maximum podle občanského zákoníku.',
    },
    {
      q: 'Co když nájemník přestane platit nájemné nebo způsobí škodu v bytě?',
      a: 'Díky mým smlouvám připraveným advokátem máte v rukou jasné páky – přesně definovaná smluvní pokuta, možnost rychlé výpovědi a čerpání finanční jistoty (kauce). Prevencí je však přísná filtrace na samém začátku.',
    },
    {
      q: 'Zařídíte i přepis elektřiny a plynu na nového nájemníka?',
      a: 'Ano, kompletní přepis energií (elektřina, plyn) vyřídím za vás u příslušných dodavatelů na základě podepsaného předávacího protokolu. Vy se nemusíte starat o žádné úřední papírování.',
    },
    {
      q: 'Pomáháte i s pronájmem komerčních prostor v Příbrami?',
      a: 'Zprostředkovávám pronájem bytů, rodinných domů i komerčních prostor (kanceláře, obchodní prostory, skladové objekty) v celé Příbrami a přilehlém okolí.',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const cleanupMeta = setPageMeta(PAGE_TITLE, PAGE_DESC, CANONICAL_PATH);

    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Služby', item: 'https://radek-vetrovsky.cz/#sluzby' },
        { '@type': 'ListItem', position: 3, name: 'Pronájem nemovitosti Příbram', item: `https://radek-vetrovsky.cz${CANONICAL_PATH}` },
      ],
    });

    const cleanupFaq = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });

    const cleanupLocalBusiness = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      name: 'Radek Větrovský - Realitní makléř Příbram',
      image: 'https://radek-vetrovsky.cz/assets/radek-vetrovsky.png',
      url: 'https://radek-vetrovsky.cz',
      telephone: '+420721855854',
      email: 'radek.vetrovsky@re-max.cz',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Příbram',
        addressRegion: 'Středočeský kraj',
        addressCountry: 'CZ',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Příbram a okres Příbram',
      },
      priceRange: '$$',
    });

    return () => {
      cleanupMeta();
      cleanupBreadcrumb();
      cleanupFaq();
      cleanupLocalBusiness();
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-form') || document.querySelector('#kontakt');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-form';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* 1. HERO SECTION WITH GRAPHICAL METRICS */}
        <section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-14 lg:pb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs Navigation */}
            <nav className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Domů</Link>
              <span>/</span>
              <a href="/#sluzby" className="hover:text-foreground transition-colors">Služby</a>
              <span>/</span>
              <span className="text-foreground font-medium">Pronájem nemovitosti Příbram</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-foreground/70 mb-6 bg-muted/60 px-4 py-1.5 rounded-full border border-border/60">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  RE/MAX Power 2 • Realitní makléř Příbram
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.1] mb-4">
                  Pronájem nemovitosti <span className="text-secondary italic">v Příbrami</span>
                </h1>
                
                <p className="text-lg md:text-xl font-display font-semibold text-foreground/80 mb-6">
                  Bezstarostný pronájem bytů, domů i komerčních prostor s prověřenými nájemníky.
                </p>

                <p className="text-base text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Hledáte spolehlivou pomoc s pronájmem nemovitosti v Příbrami a okolí? Pronájem s sebou nese nemalá rizika – od nesprávně nastaveného nájemného přes zdlouhavé prohlídky až po riziko neplatičů a poškození majetku. Jako lokální realitní makléř v Příbrami se postarám o kompletní proces pronájmu od stanovení tržní ceny přes profesionální prezentaci až po prověření zájemců v registrech dlužníků a přípravu právně neprůstřelných nájemních smluv.
                </p>

                {/* Trust list */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
                  {[
                    'Lustrace v 5 dlužnických registrech',
                    'Advokátní smlouvy na míru',
                    'Přepis energií zdarma',
                    'Osobní správce & zástupce v Příbrami',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-foreground font-medium text-sm">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={scrollToContact}
                    className="group uppercase tracking-wider text-sm font-bold px-8 h-14"
                  >
                    Nezávazná konzultace pronájmu
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <a href="tel:+420721855854">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto h-14 px-8 text-sm font-semibold">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      +420 721 855 854
                    </Button>
                  </a>
                </div>

                {/* Trust Certificates */}
                <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 border-t border-border/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ocenění RE/MAX:</span>
                  <img src={award25} alt="Certifikát RE/MAX 25 prodaných nemovitostí" className="h-10 w-auto" />
                  <img src={award8} alt="Certifikát RE/MAX 8 prodaných nemovitostí" className="h-10 w-auto" />
                </div>
              </motion.div>

              {/* Photo & RE/MAX Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-70" />
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
                    <img
                      src={radekPhoto}
                      alt="Pronájem nemovitosti Příbram - Radek Větrovský, realitní makléř"
                      className="w-full h-[460px] sm:h-[520px] object-cover object-top"
                    />
                    
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-border/60 flex items-center gap-2">
                      <img src={REMAX_LOGO} alt="RE/MAX Power 2 Příbram" className="h-7 w-auto" width="28" height="28" />
                      <span className="text-xs font-bold text-foreground">RE/MAX Power 2</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/60 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground uppercase tracking-wider">Garance bezstarostnosti</p>
                          <p className="text-xs text-muted-foreground">Prověřuji 100 % zájemců v registrech exekucí a insolvencí</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* GRAPHICAL METRICS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card p-6 rounded-2xl border border-border shadow-lg">
              <div className="text-center p-4 border-r border-border/60 last:border-r-0">
                <p className="text-2xl md:text-3xl font-bold text-foreground font-display">100 %</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">Prověření dlužníci (CEE & ISIR)</p>
              </div>
              <div className="text-center p-4 border-r border-border/60 last:border-r-0">
                <p className="text-2xl md:text-3xl font-bold text-secondary font-display">0 Kč</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">Riziko dlužného nájemného</p>
              </div>
              <div className="text-center p-4 border-r border-border/60 last:border-r-0">
                <p className="text-2xl md:text-3xl font-bold text-foreground font-display">14 Dní</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">Průměrný čas najití nájemníka</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl md:text-3xl font-bold text-primary font-display">100 %</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">Právní servis v ceně</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ANSWER FOR AEO & AI SEARCH */}
        <section className="py-10 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-5 items-start bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-display">
                  Jak bezpečně pronajmout byt nebo dům v Příbrami?
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  <strong>Stručné shrnutí:</strong> Bezpečný pronájem nemovitosti v Příbrami vyžaduje kvalitní přípravu a nekompromisní prověření zájemců. Zajišťuji profesionální inzerci, organizuji prohlídky, prověřuji bonitu a registry dlužníků (exekuce, insolvence) a připravuji smlouvy od advokáta na míru. Majitel tak získá stabilní pasivní příjem a ochranu svého majetku bez starostí.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GRAPHICAL COMPARISON: SVÉPOMOCÍ VS S MAKLÉŘEM */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Porovnání přístupů
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Pronájem svépomocí vs. Profesionální servis
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Proč riskovat ztrátu desetitisíců na nájemném a zničeném vybavení? Podívejte se na rozdíl v praxi:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1: Svépomocí */}
              <div className="bg-card p-8 rounded-3xl border border-destructive/30 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-destructive/10 text-destructive text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  Pronájem svépomocí
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-display">Vysoká rizika a nepřesnosti</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Desítky telefonátů od neprověřených zájemců',
                    'Riziko neplatičů a osob v exekuci či insolvenci',
                    'Obecné vzorové smlouvy z internetu bez právní záruky',
                    'Stres s přepisem energií a vymáháním nedoplatků',
                    'Chybějící fotodokumentace stavu bytu před předáním',
                  ].map((risk, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: S makléřem */}
              <div className="bg-card p-8 rounded-3xl border-2 border-secondary shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                  S Radkem Větrovským
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-display">Garantovaná jistota & Výnos</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Prověření v 5 dlužnických registrech (CEE, ISIR atd.)',
                    'Výběr pouze bonitních a slušných nájemníků',
                    'Právně silné smlouvy vypracované advokátem na míru',
                    'Kompletní přepis elektřiny a plynu zdarma',
                    'Detailní předávací protokol s fotodokumentací',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GRAPHICAL SECTION: 5 ÚROVNÍ PROVĚŘOVÁNÍ NÁJEMNÍKŮ */}
        <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Nejnáročnější filtrace v Příbrami
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                5 stupňů prověřování každého nájemníka
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Neponechávám nic náhodě. Než vám doporučím kandidáta na nájem vaší nemovitosti, projde tímto bezpečnostním auditem:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { num: '01', title: 'Centrální evidencia exekucí (CEE)', desc: 'Lustrace v oficiální databázi Exekutorské komory ČR.' },
                { num: '02', title: 'Insolvenční rejstřík (ISIR)', desc: 'Kontrola probíhajících insolvencí a návrhů na oddlužení.' },
                { num: '03', title: 'Pracovní bonita & Příjem', desc: 'Ověření trvání pracovního poměru a stabilního příjmu.' },
                { num: '04', title: 'Dlužnické databáze', desc: 'Prověření záznamů v mezinárodních a lokálních registrech dlužníků.' },
                { num: '05', title: 'Osobní pohovor & Prescoring', desc: 'Osobní hodnocení vystupování, komunikace a spolehlivosti.' },
              ].map((audit) => (
                <div key={audit.num} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform">
                  <div>
                    <span className="text-2xl font-bold font-display text-secondary/70 block mb-2">{audit.num}</span>
                    <h3 className="font-bold text-foreground mb-2 text-base font-display">{audit.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{audit.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-secondary">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Prověřeno 100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. CO SLUŽBA PRONÁJMU ZAHRNUJE (GRAPHICAL GRID CARDS) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Kompletní rozsah služeb
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Co všechno pro vás při pronájmu v Příbrami zajistím
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Pronájem nemovitosti není jen o vystavení inzerátu na internetu. Aby byl nájem dlouhodobě ziskový a bezpečný, postarám se o každý detail.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Search, title: '1. Stanovení tržní ceny nájemného v Příbrami', badge: 'Optimalizováno', desc: 'Na základě detailní analýzy aktuálního trhu v Příbrami (Zdaboř, Drkolnov, Březové Hory či centrum) nastavím tržní cenu tak, aby byla atraktivní pro bonitní zájemce a přinášela maximální výnos.' },
                { icon: Camera, title: '2. Profesionální prezentace a Home Staging', badge: 'V ceně', desc: 'První dojem rozhoduje. Byt či dům profesionálně nafotím, upravím osvětlení a v případě potřeby zařídím Home Staging tak, aby zájemci viděli nemovitost v tom nejlepším světle.' },
                { icon: Megaphone, title: '3. Cílená inzerce a marketing', badge: 'Top Portály', desc: 'Inzerci spustím na nej navštěvovanějších realitních portálech (Sreality, Bezrealitky, iDnes Reality) a podpořím ji lokální reklamou na sociálních sítích v okruhu Příbrami.' },
                { icon: Users, title: '4. Organizace a vedení osobních prohlídek', badge: 'Bez starostí', desc: 'Šetřím váš čas. Všechny prohlídky nemovitosti se zájemci v Příbrami organizuji a vedu osobně. O průběhu a zpětné vazbě zájemců vás pravidelně informuji.' },
                { icon: ShieldCheck, title: '5. Důkladné prověření nájemníků', badge: 'Garantováno', desc: 'Klíč k bezstarostnému pronájmu. Zájemce prověřuji v Centrální evidenci exekucí (CEE), Insolvenčním rejstříku a zjišťuji jejich pracovní i finanční stabilitu.' },
                { icon: Scale, title: '6. Vyjednávání výhodných podmínek', badge: 'Hájím vás', desc: 'Hájím vaše zájmy. Vyjednávám výši kauce (jistoty), termíny platby nájemného, pravidla pro chov zvířat či stavební úpravy a celkové smluvní podmínky výhodné pro majitele.' },
                { icon: FileText, title: '7. Právní servis a smlouvy od advokáta', badge: 'Advokátní garance', desc: 'Žádné generické vzory z internetu. Moje nájemní smlouvy jsou připravené zkušeným advokátem na míru vašemu bytu či domu a plně odpovídají občanskému zákoníku.' },
                { icon: KeyRound, title: '8. Osobní předání nemovitosti a protokol', badge: 'Fotodokumentace', desc: 'Při předání nemovitosti vypracuji detailní předávací protokol včetně fotodokumentace stavu vybavení, počtu klíčů a přesných stavů měřidel (voda, elektřina, plyn).' },
                { icon: Zap, title: '9. Přepis energií zdarma', badge: 'Bez úřadů', desc: 'Ušetřím vám běhání po úřadech. Zařídím kompletní přepis elektřiny a plynu na nového nájemníka u příslušných dodavatelů tak, abyste nenesli riziko dluhů za energie.' },
              ].map((item, idx) => (
                <div key={idx} className="property-card p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground font-display">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRAPHICAL SHOWCASE: PRONAJATÉ NEMOVITOSTI V PŘÍBRAMI */}
        <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                  Ukázka realizovaných pronájmů
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Nemovitosti, které pronajímám v Příbrami
                </h2>
              </div>
              <Link to="/prodano" className="mt-4 md:mt-0">
                <Button variant="outline" className="font-semibold">
                  Zobrazit více v portfoliu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Byt 2+kk, Příbram', loc: 'Brodská, Příbram', img: saleBrodska, tag: 'Pronajato za 14 dní' },
                { title: 'Byt 2+kk, Příbram', loc: 'Zdaboř – Slunná, Příbram', img: saleZdabor, tag: 'Prověřený nájemník' },
                { title: 'Byt 2+1, Příbram', loc: 'Pod Čertovým pahorkem', img: saleCertak, tag: 'Pronajato bez starostí' },
                { title: 'Byt 2+kk, Příbram', loc: 'Čechovská, Příbram', img: saleCechovska, tag: 'Kauce + Smlouva zdarma' },
              ].map((prop, i) => (
                <div key={i} className="property-card overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {prop.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-base mb-1 font-display">{prop.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <span>{prop.loc}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. JAK PROBÍHÁ SPOLUPRÁCE (PROCES) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Jasný postup bez překvapení
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Jak probíhá pronájem nemovitosti krok za krokem
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Spolupráce se mnou je transparentní a předvídatelná. Zde je 6 kroků k bezpečnému pronájmu:
              </p>
            </div>

            <div className="space-y-6">
              {[
                { step: '01', title: 'Úvodní konzultace a prohlídka nemovitosti v Příbrami', desc: 'Potkáme se přímo ve vaší nemovitosti. Probereme vaše představy, zhodnotím technický stav a doporučím případné úpravy pro vyšší nájemné.' },
                { step: '02', title: 'Analýza trhu a stanovení strategického nájemného', desc: 'Na základě cenových map Příbramska určíme optimální výši nájemného a záloh na služby, která přiláká stabilní a platící nájemníky.' },
                { step: '03', title: 'Příprava prezentace a spuštění inzerce', desc: 'Nemovitost nafotím, vyhotovím poutavý popis a okamžitě spustím inzerci na nejsledovanějších realitních portálech a sociálních sítích.' },
                { step: '04', title: 'Vedení prohlídek a prověrka zájemců v registrech', desc: 'Zorganizuji prohlídky se zájemci. Vážné uchazeče prověřím v dlužnických registrech a prověřím jejich platební schopnost.' },
                { step: '05', title: 'Podpis nájemní smlouvy a složení kauce', desc: 'Připravím neprůstřelnou nájemní smlouvu od advokáta. Dohlédnu na složení finanční kauce a prvního nájemného na váš účet.' },
                { step: '06', title: 'Předání klíčů a přepis energií na nájemníka', desc: 'Sepíšeme detailní předávací protokol s odečty měřidel a osobně předám klíče. Následně zařídím přepis elektřiny a plynu.' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 bg-card rounded-2xl border border-border shadow-sm items-start hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 font-display">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROČ SPOLUPRACOVAT PRÁVĚ SE MNOU */}
        <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                  Lokální specializace & zkušenosti
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Proč svěřit pronájem nemovitosti v Příbrami právě mně
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                  <p>
                    V Příbrami žiji a působím jako realitní makléř. Zním každou čtvrť – vím, jaké jsou specifické ceny nájmů na sídlišti Zdaboř, v cihlových domech v Příbrami VII i v rodinných domech na Březových Horách či Lazci.
                  </p>
                  <p>
                    Nepoužívám obecné marketingové fráze. Moje práce stojí na přísné filtraci zájemců, absolutní právní jistotě a osobním přístupu. Raději doporučím týden počkat na solidního člověka, než riskovat problémového nájemníka.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Znalost lokálního trhu s nájmy v Příbrami a okolí',
                    'Důkladná prověrka dlužnických rejstříků (CEE, Insolvenční rejstřík)',
                    'Profesionální fotografování a prezentace nemovitosti',
                    'Právní servis od advokáta specializovaného na realitní právo',
                    'Silné zázemí jedničky na trhu – značky RE/MAX',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium text-sm md:text-base">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-card p-6 border-l-4 border-secondary rounded-r-2xl shadow-sm border border-border/50">
                  <p className="italic text-foreground text-sm md:text-base leading-relaxed">
                    "Pan Větrovský mi pomohl s pronájmem bytu v Příbrami. Oceňuji perfektní prověření nájemníka a rychlé jednání. Vše proběhlo bez jediného zádrhelu."
                  </p>
                  <p className="font-bold text-sm text-foreground mt-3">— Martina Tůmová, pronajímatelka v Příbrami</p>
                </div>
              </div>

              <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={radekPhoto}
                  alt="Radek Větrovský - realitní makléř pro pronájem nemovitostí Příbram"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. REFERENCE KLIENTŮ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Recenze & Skutečné zkušenosti
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Co říkají klienti o spolupráci v Příbrami
              </h2>
              <p className="text-muted-foreground text-base">
                Důvěra klientů je pro mě na prvním místě. Přečtěte si reálná hodnocení mé práce:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "Spolupráce s panem Větrovským byla od začátku do konce naprosto perfektní. Nemovitost pronajal velmi rychle a našel skvělého nájemníka. Oceňuji jeho profesionalitu a znalost trhu v Příbrami."
                  </p>
                </div>
                <p className="font-bold text-foreground text-sm">— Jan Lešetický</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "Ráda bych poděkovala panu Větrovskému za skvělou spolupráci při pronájmu bytu. Byl vždy ochotný, spolehlivý a celá nájemní smlouva byla perfektně připravená."
                  </p>
                </div>
                <p className="font-bold text-foreground text-sm">— Martina Tůmová</p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "Velká spokojenost. Vše proběhlo hladce od A až po Z. Komunikace na jedničku, co jsme si domluvili, to klaplo. Doporučuji všem v Příbrami."
                  </p>
                </div>
                <p className="font-bold text-foreground text-sm">— Marcel Novotný</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/prodano">
                <Button variant="outline" size="lg" className="font-semibold">
                  Zobrazit všechny recenze a prodané nemovitosti
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. NEJČASTĚJŠÍ DOTAZY (FAQ) */}
        <section className="py-16 md:py-24 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Odpovědi na vaše otázky
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Nejčastější dotazy k pronájmu nemovitosti (FAQ)
              </h2>
              <p className="text-muted-foreground text-base">
                Máte dotazy ohledně pronájmu bytu či domu v Příbrami? Zde jsou odpovědi:
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-border rounded-2xl p-6 bg-card shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed pl-8">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SOUVISEJÍCÍ ČLÁNKY Z BLOGU */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Užitečné čtení
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Související články o pronájmu a nemovitostech v Příbrami
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="property-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-2">Tržní analýza</span>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-display">
                    Cenová mapa Příbram: Ceny bytů a nájmů v roce 2026
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Přehled cen nemovitostí a výše nájemného v jednotlivých čtvrtích Příbrami. Zjistěte, za kolik se reálně pronajímá.
                  </p>
                </div>
                <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary font-bold text-sm inline-flex items-center hover:underline">
                  Číst článek <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="property-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-2">Investice</span>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-display">
                    Investiční nemovitosti v Příbrami a výnos z nájmu
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Vyplatí se koupit byt na pronájem v Příbrami? Analýza výnosnosti, cenových trendů a lokální poptávky.
                  </p>
                </div>
                <Link to="/blog/investicni-nemovitosti-pribram" className="text-secondary font-bold text-sm inline-flex items-center hover:underline">
                  Číst článek <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="property-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-2">Praktický přehled</span>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-display">
                    Pronájem bytu v Příbrami 2026: kolik si účtovat a kolik zaplatíte
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Aktuální ceny nájmu podle dispozice, zákonný limit kauce, zdanění příjmu z pronájmu a výpovědní lhůty.
                  </p>
                </div>
                <Link to="/blog/pronajem-bytu-pribram-2026" className="text-secondary font-bold text-sm inline-flex items-center hover:underline">
                  Číst článek <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. ZÁVĚREČNÉ CTA & INTERNÍ PROLINKOVÁNÍ */}
        <section className="py-20 md:py-28 text-center px-4 bg-card border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
          </div>

          <div className="container mx-auto max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display text-foreground">
              Potřebujete pomoci s pronájmem nemovitosti v Příbrami?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Kontaktujte mě a domluvme si nezávaznou konzultaci. Rád se podívám na vaši nemovitost a navrhnu nejlepší postup pro bezpečný a výhodný pronájem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToContact}
                className="group uppercase tracking-wider text-sm font-bold px-10 h-14 w-full sm:w-auto"
              >
                Sjednat nezávaznou schůzku
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="tel:+420721855854" className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="h-14 px-8 text-sm font-semibold w-full sm:w-auto">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  +420 721 855 854
                </Button>
              </a>
            </div>

            {/* Interní odkazy na další služby */}
            <div className="pt-10 border-t border-border">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                Další realitní služby v Příbrami:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">
                  Prodej nemovitosti Příbram
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/sluzby/koupe-nemovitosti-pribram" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">
                  Koupě nemovitosti Příbram
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/odhad-nemovitosti" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">
                  Odhad ceny nemovitosti zdarma
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/radek-vetrovsky-realitni-makler-pribram" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">
                  O mně – Radek Větrovský
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default PronajemNemovitosti;
