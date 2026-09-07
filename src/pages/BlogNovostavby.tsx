import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Building2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1758193431351-68538bf55ec3?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-08-24';
const PUBLISHED_DISPLAY = '24. srpna 2026';

const faqItems = [
  {
    q: 'Jaké novostavby se aktuálně staví v Příbrami?',
    a: 'Přímo ve městě se aktuálně dokončuje a prodává jeden hlavní projekt, Bytové domy Zdaboř, pět čtyřpodlažních domů s 65 byty v dispozicích 2+kk až 5+kk u Brdských lesů. Rezidence Obora, přestavba původní budovy v centru s byty 1+kk a 2+kk, byla dokončena v roce 2026 a všechny byty jsou už prodané a předané majitelům, nový zájemce si tam byt koupit nemůže.',
  },
  {
    q: 'Kolik stojí byt v novostavbě v Příbrami?',
    a: 'V Bytových domech Zdaboř, aktuálně jediném prodávaném projektu ve městě, se ceny pohybují orientačně od 130 000 do 150 000 Kč za m², podle dispozice, patra a konkrétní jednotky. Pro srovnání, starší byty 2+1 a větší se v Příbrami prodávají za 60 000 až 100 000 Kč za m², u garsonek a malých bytů do 25 m² pak ceny za m² dosahují 100 000 až 140 000 Kč, tedy se blíží dolní hranici ceny novostavby, ale zůstávají levnější.',
  },
  {
    q: 'Kdy bude nastěhování do Bytových domů Zdaboř?',
    a: 'Developer plánuje nastěhování v průběhu roku 2026, přesný termín kolaudace se u developerských projektů běžně posouvá, proto doporučujeme ověřit aktuální stav přímo u developera nebo makléře projektu před podpisem smlouvy.',
  },
  {
    q: 'Na co si dát pozor při koupi bytu v novostavbě?',
    a: 'Ověřte si stav stavebního povolení a kolaudace, jestli je cena ve smlouvě garantovaná nebo se může měnit inflační doložkou, sankce za pozdní předání ze strany developera a co přesně je v ceně bytu zahrnuté, například parkovací stání nebo sklepní kóje.',
  },
  {
    q: 'Vyplatí se koupit novostavbu, nebo starší byt po rekonstrukci?',
    a: 'U větších bytů (2+1 a víc) je novostavba citelně dražší na pořízení, 130 000 až 150 000 Kč za m² oproti 60 000 až 100 000 Kč za m² u staršího bytu, nabízí ale nižší provozní náklady díky lepšímu zateplení a úspornějšímu vytápění a jistotu, že nejsou skryté vady. U garsonek a malých bytů do 25 m² je cenový rozdíl menší, novostavba tam ale zůstává dražší variantou, záleží spíš na lokalitě a stavu konkrétní nabídky.',
  },
];

const priceRanges = [
  { label: 'Novostavba (Bytové domy Zdaboř)', min: 130000, max: 150000, display: '130 000 až 150 000 Kč/m²' },
  { label: 'Garsonka, malý byt do 25 m²', min: 100000, max: 140000, display: '100 000 až 140 000 Kč/m²' },
  { label: 'Starší byt 2+1 a větší', min: 60000, max: 100000, display: '60 000 až 100 000 Kč/m²' },
];

const PriceRangeChart = () => {
  const max = 150000;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Cena za m² v Příbrami: novostavba vs. starší byt</h3>
      <p className="text-sm text-muted-foreground mb-6">Orientační rozmezí podle stavu, velikosti a typu bytu</p>
      <div className="space-y-5">
        {priceRanges.map((r, i) => (
          <div key={r.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{r.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{r.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full bg-primary absolute left-0"
                style={{ width: `${(r.min / max) * 100}%`, opacity: 0.5 }}
              />
              <div
                className="h-full rounded-full bg-primary absolute left-0"
                style={{ width: `${(r.max / max) * 100}%`, opacity: 0.85 - i * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Příklad z konkrétní nabídky: byt 3+kk, 85 m² v Bytových domech Zdaboř, nabízen za 11 352 600 Kč, tedy přibližně 133 560 Kč/m². Novostavba je citelně dražší než starší byty obou velikostních kategorií, u garsonek a malých bytů do 25 m² je ale rozdíl menší, jejich cena za m² se blíží dolní hranici ceny novostavby.
      </p>
    </div>
  );
};

const ProjectComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Bytové domy Zdaboř</h3>
      </div>
      <p className="text-sm text-muted-foreground">Pět čtyřpodlažních domů, 65 bytů, dispozice 2+kk až 5+kk, lokalita u Brdských lesů. Podzemní garáže s přípravou na dobíjení elektromobilů, vlastní sklepní kóje, energetická třída B. Cena garantovaná po celou dobu výstavby bez inflační doložky. Nastěhování v roce 2026, aktuálně jediný developerský projekt přímo ve městě, který je ještě v prodeji.</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <Home className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Rezidence Obora (vyprodáno)</h3>
      </div>
      <p className="text-sm text-muted-foreground">Přestavba a dostavba původní budovy v centru Příbrami, byty 1+kk a 2+kk včetně dvou mezonetů. Projekt byl v roce 2026 dokončen a předán majitelům, všechny jednotky jsou prodané. Uvádíme ho jako referenci nedávné nabídky, nový byt tu už koupit nejde.</p>
    </div>
  </div>
);

const BlogNovostavby = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Novostavby v Příbrami 2026: kde se staví',
      'Přehled novostaveb v Příbrami 2026: aktuální nabídka Bytových domů Zdaboř, ceny za m² a na co si dát pozor před koupí.',
      '/blog/novostavby-pribram-2026-kde-se-stavi',
      heroImage
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Novostavby v Příbrami 2026: kde se staví a jak vybrat ten pravý byt',
      description: 'Přehled novostaveb v Příbrami 2026: aktuální nabídka Bytových domů Zdaboř, ceny za m² a na co si dát pozor před koupí.',
      image: heroImage,
      author: {
        '@type': 'Person',
        name: 'Radek Větrovský',
        jobTitle: 'Realitní makléř',
        url: 'https://radek-vetrovsky.cz',
        telephone: '+420721855854',
        email: 'radek.vetrovsky@re-max.cz',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Radek Větrovský - RE/MAX',
        logo: { '@type': 'ImageObject', url: 'https://radek-vetrovsky.cz/images/logo.png' },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://radek-vetrovsky.cz/blog/novostavby-pribram-2026-kde-se-stavi',
      },
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
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/clanky' },
        { '@type': 'ListItem', position: 3, name: 'Novostavby v Příbrami 2026' },
      ],
    });
    return () => { cleanupMeta(); cleanupArticle(); cleanupFaq(); cleanupBreadcrumb(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/clanky"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na blog
            </Link>

            <div className="mb-8">
              <img
                src={heroImage}
                alt="Moderní novostavba bytového domu s balkony, ilustrační foto k tématu novostaveb v Příbrami"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span>Autor: <strong className="text-foreground">Radek Větrovský</strong></span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Aktualizováno: {PUBLISHED_DISPLAY}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                8 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Novostavby v Příbrami 2026: kde se staví a jak vybrat ten pravý byt
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Kdo v Příbrami hledá byt, dřív nebo později narazí na otázku, jestli má smysl počkat na novostavbu, nebo koupit byt z druhé ruky. V roce 2026 se v Příbrami dokončují Bytové domy Zdaboř, aktuálně jediný developerský projekt přímo ve městě, který je ještě v prodeji. Nedávno dokončená Rezidence Obora už byla letos předána majitelům a všechny byty jsou prodané. Přehled toho, kde se dá byt v novostavbě ještě koupit, kolik stojí a na co si dát pozor, než podepíšete rezervační smlouvu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {/* Quick Answer */}
              <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-lg mb-12">
                <h2 className="text-xl font-bold text-foreground mb-3">Rychlá odpověď</h2>
                <p className="text-muted-foreground">
                  V Příbrami se v roce 2026 dokončují Bytové domy Zdaboř (65 bytů ve 2+kk až 5+kk, lokalita u Brdských lesů, nastěhování v roce 2026), aktuálně jediný developerský projekt přímo ve městě, který je ještě v prodeji. Rezidence Obora, přestavba původní budovy v centru s byty 1+kk a 2+kk, byla letos dokončena a předána majitelům, všechny jednotky jsou prodané a nový byt tam už koupit nejde. Ceny ve Zdaboři se orientačně pohybují od 130 000 do 150 000 Kč za m², výrazně výš než u starších bytů 2+1 a větších (60 000 až 100 000 Kč za m²). U garsonek a malých bytů do 25 m² je rozdíl menší, jejich cena za m² (100 000 až 140 000 Kč) se blíží dolní hranici ceny novostavby, přesto zůstává novostavba nejdražší variantou. Před koupí "z papíru" je klíčové ověřit si stav stavebního povolení, termín kolaudace ve smlouvě a to, jestli je cena garantovaná po celou dobu výstavby.
                </p>
              </div>

              {/* H2 Kde se stavi */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kde se v Příbrami aktuálně staví</h2>
                <p className="text-muted-foreground mb-4">
                  Nabídka novostaveb v Příbrami byla dlouho tenká, většina nových projektů v okrese vznikala spíš v okolních obcích (Jince, Dobříš, Milešov). To se v letech 2025 a 2026 mění, přímo ve městě se rozjel projekt, který stojí za pozornost, a nedávno tu byl dokončen i jeden menší.
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                  <li><strong className="text-foreground">Bytové domy Zdaboř</strong> (Rezidence Zdaboř): pět čtyřpodlažních bytových domů, 65 bytů, dispozice 2+kk až 5+kk, lokalita Zdaboř u Brdských lesů. Jediný developerský projekt přímo ve městě, který je aktuálně ještě v prodeji.</li>
                  <li><strong className="text-foreground">Rezidence Obora</strong> (vyprodáno): přestavba a dostavba původní budovy v centru Příbrami, byty 1+kk a 2+kk včetně dvou mezonetů. Projekt byl v roce 2026 dokončen a předán majitelům, všechny byty jsou prodané.</li>
                  <li>Mimo samotné město pak dál pokračuje{' '}
                    <a href="https://novostavby.com/pcategory/novostavby-okres-pribram/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">výstavba v okolních obcích</a>
                    , například Bytový dům Cihelna nebo projekty u Jinec a Dobříše, ty ale cílí spíš na jinou skupinu kupujících, kdo chce bydlet mimo Příbram, ale v dojezdové vzdálenosti.</li>
                </ul>
                <ProjectComparison />
              </div>

              {/* H2 Zdabor detail */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Bytové domy Zdaboř: co víme</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Projekt{' '}
                    <a href="https://www.rezidencezdabor.cz/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Rezidence Zdaboř</a>
                    {' '}staví developer Rezidence Zdaboř s.r.o. (generální dodavatel{' '}
                    <a href="https://www.gefira.cz/rezidence-zdabor/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">GEFIRA stavby s.r.o.</a>
                    ) v klidné části Příbrami poblíž Brdských lesů, mezi ulicemi Rožmitálská a Zdabořská. Jde o pět menších čtyřpodlažních domů, které mají výškou i hmotou navazovat na okolní zástavbu, směrem k ulici Hanuše Jelínka jsou domy nižší.
                  </p>
                  <p>
                    Celkem nabízí projekt 65 bytů v dispozicích od 2+kk po 5+kk. Vybrané jednotky mají balkon, terasu nebo předzahrádku, každý byt má vlastní sklepní kóji a k dispozici jsou i společné prostory na kola a kočárky. Parkování řeší podzemní garáže s přípravou na dobíjení elektromobilů, budovy jsou navržené v energetické třídě B (téměř nulová spotřeba).
                  </p>
                </div>
                <PriceRangeChart />
                <p className="text-muted-foreground">
                  Developer garantuje cenu po celou dobu výstavby bez inflační doložky, což je u novostaveb v roce 2026 spíš výjimka než pravidlo. Přesný aktuální ceník je potřeba ověřit přímo u developera nebo v sales centru, ceny jednotlivých bytů se v čase mění podle rozprodanosti.
                </p>
              </div>

              {/* H2 Obora detail */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Rezidence Obora: dokončeno a vyprodáno</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Rezidence Obora vznikla přestavbou a částečnou dostavbou původní administrativní budovy v centru Příbrami, blízko zastávky MHD Československé armády, odkud jezdí autobusy na Prahu Smíchov zhruba za hodinu. Nabízela menší byty 1+kk a 2+kk a dva luxusní mezonety.
                  </p>
                  <p>
                    Projekt byl v průběhu roku 2026 dokončen, všechny jednotky se prodaly a byty byly předány novým majitelům. Nový zájemce si tu tedy byt koupit nemůže, uvádíme projekt v tomto přehledu jako referenci nedávné poptávky po menších bytech v centru Příbrami. Pokud vás zajímá podobná lokalita nebo dispozice, sledujte nabídku bytů z druhé ruky v okolí centra, nebo se ozvěte, dám vědět, jakmile se něco srovnatelného objeví.
                  </p>
                </div>
              </div>

              {/* H2 Kolik stoji */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik stojí byt v novostavbě v Příbrami</h2>
                <p className="text-muted-foreground mb-4">
                  Novostavba je v Příbrami citelně dražší než byty ve starší zástavbě, u obou velikostních kategorií. Rozdíl je ale výraznější u větších bytů, u těch nejmenších se ceny za m² přibližují.
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                  <li><strong className="text-foreground">Novostavba (Bytové domy Zdaboř):</strong> orientačně od 130 000 do 150 000 Kč za m², podle dispozice, patra a konkrétní jednotky. Aktuálně jediný developerský projekt přímo ve městě, který je ještě v prodeji.</li>
                  <li><strong className="text-foreground">Starší byt 2+1 a větší:</strong> podle{' '}
                    <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapy Příbrami</Link>
                    {' '}orientačně 60 000 až 100 000 Kč za m², v centru a okolí Březových Hor spíš při horní hranici, na sídlištích při dolní.</li>
                  <li><strong className="text-foreground">Garsonka, malý byt do 25 m²:</strong> podle{' '}
                    <Link to="/blog/prodej-garsonky-maleho-bytu-pribram-2026" className="text-secondary hover:underline font-medium">aktuálních nabídek garsonek a bytů 1+kk</Link>
                    {' '}orientačně 100 000 až 140 000 Kč za m², tedy blízko dolní hranici ceny novostavby, ale stále levněji. U malých bytů se pevné náklady na kuchyň a koupelnu rozpočítávají na méně metrů, cena za m² proto vychází výš než u větších starších bytů.</li>
                </ul>
                <p className="text-muted-foreground">
                  U bytů 2+1 a větších tak rozdíl mezi novostavbou a starším bytem může u srovnatelné velikosti dělat i statisíce až přes milion korun. U garsonek a malých bytů 1+kk je cenový rozdíl menší, ale novostavba i tam zůstává dražší variantou, kompenzuje to nižšími provozními náklady, garancí na stavební vady a žádnými okamžitými investicemi do rekonstrukce.
                </p>
              </div>

              {/* H2 Na co se ptat */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Na co se ptát před koupí bytu v novostavbě</h2>
                <p className="text-muted-foreground mb-4">
                  Koupě bytu "z papíru" nebo krátce před dokončením má svá rizika, na která se běžně nemyslí, dokud není pozdě.
                </p>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Ověřte si stav stavebního povolení a kolaudace.</strong> Bez pravomocného stavebního povolení developer nemůže legálně stavět, bez kolaudačního souhlasu se nedá byt nastěhovat ani zapsat do katastru.</li>
                  <li><strong className="text-foreground">Zjistěte, jestli je cena garantovaná, nebo se může měnit.</strong> Některé smlouvy obsahují inflační doložku, která cenu v průběhu výstavby navyšuje, jiné (jako Zdaboř) garantují fixní cenu.</li>
                  <li><strong className="text-foreground">Přečtěte si rezervační a smlouvu o smlouvě budoucí kupní pozorně.</strong> Zejména sankce za pozdní předání ze strany developera a podmínky pro vrácení rezervačního poplatku.</li>
                  <li><strong className="text-foreground">Ptejte se na skutečný, ne jen plánovaný, termín kolaudace.</strong> U developerských projektů se termíny běžně posouvají o měsíce, počítejte s rezervou.</li>
                  <li><strong className="text-foreground">Zkontrolujte, co je v ceně a co je příplatek.</strong> Parkovací stání, sklepní kóje, standard kuchyňské linky, podlahy, to všechno se mezi projekty výrazně liší.</li>
                  <li><strong className="text-foreground">Porovnejte cenu s aktuální nabídkou starších bytů ve stejné lokalitě.</strong> Ať víte, jestli si za rozdíl v ceně skutečně kupujete odpovídající hodnotu.</li>
                </ol>

                <p className="text-muted-foreground">
                  Obecný kontrolní seznam pro koupi bytu i domu z druhé ruky najdete v článku{' '}
                  <Link to="/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">na co si dát pozor při koupi nemovitosti</Link>. Orientaci v nabídce novostaveb i vyjednávání s developerem řeším s klienty v Příbrami jako součást{' '}
                  <Link to="/sluzby/koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">koupě nemovitosti v Příbrami</Link>
                  , včetně kontroly smluvní dokumentace před podpisem.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'V Příbrami se v roce 2026 dokončují Bytové domy Zdaboř (65 bytů, 2+kk až 5+kk, lokalita u Brdských lesů), aktuálně jediný developerský projekt přímo ve městě, který je ještě v prodeji.',
                    'Rezidence Obora (1+kk a 2+kk, centrum města) byla letos dokončena a předána majitelům, všechny byty jsou prodané a projekt už není na prodej.',
                    'Ceny ve Zdaboři se orientačně pohybují od 130 000 do 150 000 Kč za m², výrazně nad cenou starších bytů 2+1 a větších (60 000 až 100 000 Kč za m²).',
                    'U garsonek a malých bytů do 25 m² je rozdíl menší, jejich cena za m² (100 000 až 140 000 Kč) se blíží dolní hranici ceny novostavby, přesto zůstává novostavba dražší variantou.',
                    'Zdaboř garantuje fixní cenu bez inflační doložky po celou dobu výstavby, což u novostaveb není samozřejmost.',
                    'Před koupí bytu "z papíru" ověřte stavební povolení, termín kolaudace ve smlouvě a sankce za jeho případné posunutí.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary font-bold mt-0.5">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Často kladené otázky</h2>
                <div className="space-y-3">
                  {faqItems.map((item, i) => (
                    <div key={i} className="border border-border rounded-lg overflow-hidden bg-card">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-base md:text-lg font-semibold text-foreground">{item.q}</h3>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-muted-foreground">{item.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Author box */}
              <div className="bg-muted rounded-2xl p-8 md:p-10 mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">O autorovi</h2>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský, realitní makléř Příbram"
                    className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-2">Radek Větrovský</h3>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej, pronájem a koupi bytů, domů a pozemků v Příbrami a celém okrese, včetně orientace v nabídce developerských projektů.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <a href="tel:+420721855854" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Phone className="h-4 w-4" /> +420 721 855 854
                    </a>
                    <a href="mailto:radek.vetrovsky@re-max.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Mail className="h-4 w-4" /> radek.vetrovsky@re-max.cz
                    </a>
                    <a href="https://radek-vetrovsky.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Globe className="h-4 w-4" /> Zahradnická 550, 261 01 Příbram III
                    </a>
                  </div>
                </div>
              </div>

              {/* Závěr + CTA */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Shrnutí a co dělat dál</h2>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Novostavby v Příbrami už nejsou jen otázkou okolních obcí, přímo ve městě se dokončují Bytové domy Zdaboř, aktuálně jediný developerský projekt ve městě, který je ještě v prodeji. Nedávno dokončená Rezidence Obora ukázala, že o menší byty v centru je zájem, ale je už vyprodaná. Rozdíl v ceně proti staršímu bytu je u Zdaboře citelný, ale s ním jde ruku v ruce nižší provozní náklady a jistota, že si nekupujete skryté vady.</p>
                  <p>Pokud v Příbrami zvažujete koupi bytu, ať už v novostavbě nebo z druhé ruky, a chcete mít jistotu, že cena odpovídá lokalitě a stavu, ozvěte se mi. Provedu vás výběrem i kontrolou smluvní dokumentace.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Zvažujete koupi bytu v novostavbě, nebo hledáte srovnání s byty z druhé ruky?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Provedu vás výběrem, srovnáním cen i kontrolou smluvní dokumentace před podpisem u developerských projektů v Příbrami.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/sluzby/koupe-nemovitosti-pribram"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Domluvit konzultaci zdarma
                    </Link>
                    <a
                      href="tel:+420721855854"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-foreground/30 bg-transparent text-secondary-foreground font-semibold rounded-lg hover:bg-secondary-foreground/10 transition-colors text-lg"
                    >
                      <Phone className="h-5 w-5" /> +420 721 855 854
                    </a>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground italic mb-12">
                Článek vychází z veřejně dostupných informací developerů a realitních portálů k srpnu 2026 a má informativní charakter. Konkrétní ceny, dostupnost jednotek a termíny nastěhování se mohou měnit, ověřte si je vždy přímo u developera nebo makléře projektu. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
                    { title: 'Prodej garsonky a malého bytu v Příbrami 2026', slug: 'prodej-garsonky-maleho-bytu-pribram-2026' },
                    { title: 'Investiční nemovitosti Příbram: Vyplatí se to v roce 2026?', slug: 'investicni-nemovitosti-pribram' },
                  ].map((a) => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="block p-5 bg-card border border-border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all group"
                    >
                      <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{a.title}</h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                        Číst více <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogNovostavby;
