import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle, Phone, Mail, Home, FileText, Megaphone, Users, MessageSquare, Key,
  MapPin, Maximize2, Star, ArrowRight, ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { Button } from '@/components/ui/button';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

// Assets - all real photos already used elsewhere on the site
import radekPhoto from '@/assets/radek-vetrovsky.webp';
import remaxLogo from '@/assets/remax-logo.png';
import award25 from '@/assets/award-25.svg';
import award8 from '@/assets/award-8.svg';
import masonry1 from '@/assets/property-dum-pribram.webp';
import masonry2 from '@/assets/property-byt-pribram.webp';
import masonry3 from '@/assets/property-dum-jelence.webp';
import masonry4 from '@/assets/property-byt-marianska.webp';
import saleTynec from '@/assets/property-dum-tynec-nad-sazavou.webp';
import saleBrodska from '@/assets/property-byt-brodska-pribram.webp';
import saleZdabor from '@/assets/property-byt-zdabor-slunna-pribram.webp';
import saleCertak from '@/assets/property-byt-certak-pribram.jpg';
import saleCechovska from '@/assets/property-byt-cechovska.webp';

const REMAX_LOGO = remaxLogo;

const faqItems = [
  {
    q: 'Jak dlouho trvá prodej nemovitostí v Příbrami?',
    a: 'Průměrná doba prodeje bytu v Příbrami se pohybuje mezi 2 až 3 měsíci. U domů nebo atypických nemovitostí to může být 3 až 6 měsíců. Vždy záleží na správně nastavené ceně a zvolené strategii.',
  },
  {
    q: 'Co musím zařídit já jako majitel?',
    a: 'Vaším jediným úkolem je podepsat smlouvy, o zbytek se starám já. Od vytvoření inzerátu, přes komunikaci s úřady (katastr, získání PENB) až po předání klíčů a přepis energií.',
  },
  {
    q: 'Kdy se hradí provize za zprostředkování?',
    a: 'Moje odměna je vázána výhradně na úspěšný prodej. Hradí se až ve chvíli, kdy jsou peníze od kupujícího bezpečně uloženy v advokátní úschově. Žádné poplatky předem neplatíte.',
  },
];

const AnimatedStat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useAnimatedCounter(value, 1200);
  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{count}{suffix}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const ProdejNemovitosti = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Prodej nemovitostí v Příbrami | Radek Větrovský',
      'Kompletní servis při prodeji vaší nemovitosti v Příbrami. Reálná cena, profesionální marketing a kompletní právní servis od zkušeného makléře.',
      '/sluzby/prodej-nemovitosti-pribram'
    );
    const cleanupService = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Prodej nemovitostí',
      name: 'Prodej nemovitostí v Příbrami',
      description: 'Kompletní servis při prodeji nemovitostí v Příbrami: odhad ceny, profesionální marketing, prohlídky, vyjednávání a kompletní právní servis.',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Radek Větrovský',
        telephone: '+420721855854',
        email: 'radek.vetrovsky@re-max.cz',
        url: 'https://radek-vetrovsky.cz',
      },
      areaServed: { '@type': 'City', name: 'Příbram' },
      url: 'https://radek-vetrovsky.cz/sluzby/prodej-nemovitosti-pribram',
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Služby', item: 'https://radek-vetrovsky.cz/#services' },
        { '@type': 'ListItem', position: 3, name: 'Prodej nemovitostí v Příbrami' },
      ],
    });
    const cleanupFaq = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    return () => { cleanupMeta(); cleanupService(); cleanupBreadcrumb(); cleanupFaq(); };
  }, []);

  const scrollToContact = () => {
    window.location.href = '/#contact-form';
  };

  const processSteps = [
    { id: 1, icon: Home, title: 'Odhad ceny', desc: 'Stanovím optimální prodejní cenu na základě analýzy trhu.' },
    { id: 2, icon: FileText, title: 'Příprava', desc: 'Připravím nemovitost k prodeji včetně home stagingu.' },
    { id: 3, icon: Megaphone, title: 'Marketing', desc: 'Vytvořím profesionální prezentaci a spustím marketing.' },
    { id: 4, icon: Users, title: 'Prohlídky', desc: 'Zajistím prohlídky a komunikaci se zájemci.' },
    { id: 5, icon: MessageSquare, title: 'Vyjednávání', desc: 'Vyjednám nejlepší podmínky pro prodej.' },
    { id: 6, icon: Key, title: 'Předání', desc: 'Kompletní právní servis a předání nemovitosti.' },
  ];

  const marketingFeatures = [
    'Profesionální fotografie a video',
    'Virtuální prohlídky 3D',
    'Inzerce na všech top portálech',
    'Sociální sítě a cílená reklama',
    'Vlastní databáze zájemců',
    'Tiskové materiály a letáky',
  ];

  // Real, recently sold properties (matches /prodano) - no invented prices or percentages
  const recentSales = [
    { title: 'Rodinný dům, Týnec nad Sázavou', location: 'Týnec nad Sázavou', size: '234 m²', image: saleTynec },
    { title: 'Byt 2+kk, Příbram', location: 'Brodská, Příbram', size: '54 m²', image: saleBrodska },
    { title: 'Byt 2+kk, Příbram', location: 'Zdaboř – Slunná, Příbram', size: '45 m²', image: saleZdabor },
    { title: 'Byt 2+1, Příbram', location: 'Pod Čertovým pahorkem, Příbram', size: '58 m²', image: saleCertak },
    { title: 'Rodinný dům, Příbram', location: 'Rožmitálská, Příbram VI – Březové Hory', size: '141 m²', image: masonry1 },
    { title: 'Byt 2+kk, Příbram', location: 'Čechovská, Příbram', size: '47 m²', image: saleCechovska },
  ];

  // Real, verified Google reviews - same as used site-wide
  const testimonials = [
    {
      text: 'Spolupráce s panem Větrovskym byla od začátku do konce naprosto perfektní. Nemovitost prodal velmi rychle a za cenu, která předčila moje očekávání. Oceňuji jeho profesionalitu, výbornou komunikaci, ochotu a perfektní znalost trhu. O vše se postaral.',
      name: 'Jan Lešetický',
    },
    {
      text: 'S p. Větrovským od samého začátku až do konce vše šlapalo jak mělo, rychlost jak najít zájemce, tak v následném jednání ohledně smluv a všeho kolem.',
      name: 'Jakub Šindelář',
    },
    {
      text: 'Velká spokojenost s panem Větrovským. Vše proběhlo hladce od A až po Z. Výborná komunikace a na čem jsme se domluvili, to klaplo. Velké díky a přeji panu Větrovskému hodně spokojených klientů.',
      name: 'Marcel Novotný',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-24">

        {/* 1. HERO */}
        <section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-14 lg:pb-24">
          {/* Decorative blobs - matches homepage hero */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 -left-1/4 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumbs */}
            <nav className="text-sm text-muted-foreground flex items-center gap-2 mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">Domů</Link>
              <span>/</span>
              <span>Služby</span>
              <span>/</span>
              <span className="text-foreground font-medium">Prodej nemovitosti</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-foreground/70 mb-6 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Kompletní servis • Příbram
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.1] mb-3">
                  Prodej nemovitosti <span className="text-secondary italic">bez starostí</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground/80 mb-6">
                  Od odhadu ceny po předání klíčů
                </h2>

                <p className="text-base text-foreground/50 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Postarám se o{' '}
                  <span className="text-foreground font-medium underline underline-offset-4">celý proces prodeje</span>
                  {' '}od odhadu ceny přes marketing a prohlídky až po předání klíčů. Vaším jediným úkolem je podepsat.
                </p>

                <ul className="space-y-3 mb-8 inline-flex flex-col items-start">
                  {[
                    'Reálná cena podložená analýzou trhu',
                    'Profesionální marketing a prezentace',
                    'Kompletní právní servis a úschova',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground font-medium text-left">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10">
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                    className="group uppercase tracking-wider text-sm font-bold px-10 h-14"
                  >
                    Odhad ceny zdarma
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={scrollToContact}
                    className="uppercase tracking-wider text-sm font-medium px-10 h-14"
                  >
                    Kontaktujte mě
                  </Button>
                </div>

                {/* Contact info */}
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                  <a href="tel:+420721855854" className="flex items-center gap-3 hover:text-foreground transition-colors group">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/50">Zavolejte mi</span>
                      <span className="text-base font-bold text-foreground">+420 721 855 854</span>
                    </div>
                  </a>
                  <a href="mailto:radek.vetrovsky@re-max.cz" className="flex items-center gap-3 hover:text-foreground transition-colors group">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/50">Napište mi</span>
                      <span className="text-base font-bold text-foreground">radek.vetrovsky@re-max.cz</span>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Photo - bleeds off the bottom of the section, like the homepage hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                {/* Mobile / tablet */}
                <div className="lg:hidden relative w-full max-w-[260px] h-72 sm:max-w-[300px] sm:h-96">
                  <div className="absolute inset-0 bg-primary/8 rounded-2xl blur-xl scale-105" />
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský, realitní makléř Příbram"
                    className="relative w-full h-full object-cover object-bottom rounded-2xl shadow-lg"
                  />
                </div>

                {/* Desktop - large, cropped at the section edge */}
                <div className="hidden lg:block relative">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute -top-4 -right-4 z-20 bg-background rounded-full px-4 py-2 shadow-lg border border-border/50 flex items-center gap-2"
                  >
                    <img src={REMAX_LOGO} alt="RE/MAX" className="h-8 w-auto" width="32" height="32" />
                  </motion.div>

                  <div className="relative w-[480px] h-[640px] xl:w-[560px] xl:h-[720px] -mt-4 -mb-40 xl:-mb-48">
                    <img
                      src={radekPhoto}
                      alt="Radek Větrovský, realitní makléř Příbram"
                      className="relative w-full h-full object-cover object-bottom rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 1.5 INTRO TEXT */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              Řeším prodej nemovitostí v Příbrami a celém okrese, od bytů na sídlištích v Příbrami VII a VIII přes byty v centru a v okolí Březových Hor až po rodinné domy a pozemky v okolních obcích. Každý prodej nemovitosti v Příbrami vedu od prvního odhadu ceny až po předání klíčů, ať víte, na čem jste v každé fázi prodeje.
            </p>
          </div>
        </section>

        {/* 2. PROCESS SECTION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Jak pracuji
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                Kompletní servis od A do Z
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="property-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">{step.id}</span>
                    </div>
                    <step.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. MARKETING SECTION */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Profesionální marketing</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                  Maximální viditelnost pro vaši nemovitost
                </h2>
                <p className="text-muted-foreground text-base mb-8">
                  Vaši nemovitost představím v tom nejlepším světle na všech důležitých platformách a oslovím zájemce z vlastní databáze i cílené reklamy.
                </p>

                <ul className="space-y-3 mb-10">
                  {marketingFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-foreground">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Real trust markers - no invented percentages */}
                <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
                  <AnimatedStat value={100} suffix="+" label="Spokojených klientů" />
                  <div className="h-12 w-px bg-border flex-shrink-0" />
                  <img src={award25} alt="Certifikát RE/MAX za 25 prodaných nemovitostí" className="h-14 w-auto flex-shrink-0" />
                  <img src={award8} alt="Certifikát RE/MAX za 8 prodaných nemovitostí" className="h-14 w-auto flex-shrink-0" />
                </div>
              </motion.div>

              {/* Masonry Grid Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="grid grid-cols-12 gap-3 md:gap-4 min-h-[350px] md:h-[550px] md:grid-rows-[minmax(0,1fr)] overflow-hidden"
              >
                <div className="col-span-7 rounded-2xl md:rounded-3xl overflow-hidden h-full">
                  <img src={masonry1} alt="Rodinný dům v Příbrami připravený k prodeji" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-5 grid grid-rows-3 gap-3 md:gap-4 h-full">
                  <div className="row-span-1 rounded-2xl overflow-hidden">
                    <img src={masonry2} alt="Interiér bytu v Příbrami" className="w-full h-full object-cover" />
                  </div>
                  <div className="row-span-1 rounded-2xl overflow-hidden">
                    <img src={masonry3} alt="Rodinný dům v okolí Příbrami" className="w-full h-full object-cover" />
                  </div>
                  <div className="row-span-1 rounded-2xl overflow-hidden">
                    <img src={masonry4} alt="Byt v Příbrami" className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. RECENT SALES */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Realizované zakázky
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                Nedávno prodané nemovitosti
              </h2>
            </motion.div>

            <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 -mx-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {recentSales.map((sale) => (
                <div
                  key={`${sale.title}-${sale.location}`}
                  onClick={() => navigate('/prodano')}
                  className="property-card snap-center shrink-0 w-[260px] md:w-[280px] cursor-pointer group flex flex-col"
                >
                  <div className="relative h-44 shrink-0 overflow-hidden">
                    <img
                      src={sale.image}
                      alt={`${sale.title} – ${sale.location}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                      Prodáno
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-foreground mb-0.5 group-hover:text-primary transition-colors">{sale.title}</h3>
                      <p className="text-[13px] text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{sale.location}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Maximize2 className="h-4 w-4" />
                      <span>{sale.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg" onClick={() => navigate('/prodano')} className="group text-base">
                Zobrazit všechny prodané nemovitosti
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className="section-padding bg-muted">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Reference klientů
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                Co o mně říkají klienti?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, index) => (
                <a
                  key={t.name}
                  href="https://maps.app.goo.gl/vNQZSSixjfp8rZCu9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.12 }}
                    className="property-card p-6 md:p-8 bg-card flex flex-col gap-4 h-full hover:border-secondary/30 border border-transparent transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-full">Google recenze</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-sm md:text-base flex-1">„{t.text}"</p>
                    <p className="font-bold text-foreground">{t.name}</p>
                  </motion.article>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background border-t border-border">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Připraveni prodat
                <span className="block mt-2 text-secondary">svou nemovitost v Příbrami?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10">
                Získejte nezávazný odhad ceny zdarma a zjistěte, jak by mohl prodej vaší nemovitosti probíhat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="cta"
                  size="xl"
                  onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                  className="group text-lg px-12 h-16 shadow-2xl"
                >
                  Chci odhad zdarma
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href="tel:+420721855854" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Zavolat nyní
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. SEO Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-sm text-muted-foreground">
              <h3 className="text-xl font-bold text-foreground mb-4">Časté dotazy k prodeji nemovitostí v Příbrami (FAQ)</h3>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <strong>{item.q}</strong>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-foreground mt-10 mb-4">Užitečné čtení k prodeji</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog/jak-prodat-rodinny-dum-pribram" className="text-secondary font-medium hover:underline">
                    Jak prodat rodinný dům v Příbrami: postup krok za krokem
                  </Link>
                </li>
                <li>
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary font-medium hover:underline">
                    Jak správně ocenit nemovitost před prodejem
                  </Link>
                </li>
                <li>
                  <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary font-medium hover:underline">
                    Rezervační smlouva a úschova kupní ceny
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingCTA />

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default ProdejNemovitosti;
