import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Home, Building2, TrendingUp, Percent, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-08-20';
const PUBLISHED_DISPLAY = '20. srpna 2026';

const faqItems = [
  {
    q: 'Kolik stojí garsonka nebo byt 1+kk v Příbrami v roce 2026?',
    a: 'Podle aktuálních nabídek ze srpna 2026 se garsonky a byty 1+kk v Příbrami prodávají přibližně od 2,3 do 3,3 mil. Kč, podle velikosti, lokality a stavu. Nejmenší jednotky do 25 m² se pohybují spíš při horní hranici tohoto rozmezí.',
  },
  {
    q: 'Proč je cena za metr čtvereční u malých bytů vyšší než u velkých?',
    a: 'Protože pevné prvky, kuchyňský kout, koupelna a vstupní prostor, zaberou u malého bytu poměrně větší část plochy a jejich náklad se rozpočítá na méně metrů. Byty do 25 m² v Příbrami se tak prodávají za přibližně 100 000 až 140 000 Kč za m², zatímco byty 1+kk o velikosti 36 až 40 m² za 90 000 až 120 000 Kč za m².',
  },
  {
    q: 'O kolik je levnější družstevní byt oproti osobnímu vlastnictví?',
    a: 'Rozdíl se podle dostupných zdrojů pohybuje zhruba od 10 do 20 %, hlavně kvůli omezené dostupnosti standardní hypotéky na koupi družstevního podílu, což zužuje okruh kupujících.',
  },
  {
    q: 'Vyplatí se koupit garsonku v Příbrami jako investici do pronájmu?',
    a: 'Malé byty o velikosti zhruba 25 až 45 m² dosahují podle celostátních propočtů hrubého výnosu z pronájmu přibližně 3 až 5 % ročně, na horní hranici celostátního průměru napříč velikostmi bytů. Jde o celostátní odhad, v Příbrami s nižšími pořizovacími cenami než v krajských městech může být reálný výnos srovnatelný, nebo o něco vyšší.',
  },
  {
    q: 'Jak vysoká je aktuálně sazba hypotéky a jak ovlivňuje koupi malého bytu?',
    a: 'Průměrná sazba hypoték v Česku dosáhla v srpnu 2026 5,42 %, pátý měsíc v řadě roste. Menší jistina u garsonky oproti velkému bytu znamená nižší měsíční splátku, což malé byty zvýhodňuje hlavně u mladých a prvokupujících. Od dubna 2026 navíc platí přísnější limity (LTV 70 %, DTI 7násobek příjmu) pro investiční hypotéky na koupi k pronájmu, hypotéky pro vlastní bydlení se nemění.',
  },
];

const listings = [
  { area: 'Edvarda Beneše, Příbram VII', type: '1+kk', size: '21 m²', price: '3 669 400 Kč', perSqm: '~174 700 Kč/m²' },
  { area: 'Riegrova, Příbram I', type: '1+kk', size: '23 m²', price: '3 099 000 Kč', perSqm: '~134 700 Kč/m²' },
  { area: 'Příbram I', type: '1+kk', size: '19 m²', price: '2 900 000 Kč', perSqm: '~152 600 Kč/m²' },
  { area: 'Čechovská, Příbram VIII', type: '1+1', size: '40 m²', price: '3 750 000 Kč', perSqm: '~93 750 Kč/m²' },
  { area: 'Jana Drdy, Příbram VII', type: '1+kk', size: '36 m²', price: '3 250 000 Kč', perSqm: '~90 300 Kč/m²' },
];

const ListingsTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-1">Aktuální nabídky garsonek a bytů 1+kk v Příbrami</h3>
    <p className="text-sm text-muted-foreground mb-6">Srpen 2026, orientační příklady z realitních portálů</p>
    <table className="w-full text-sm min-w-[520px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Lokalita</th>
          <th className="py-2 pr-4 font-semibold">Dispozice</th>
          <th className="py-2 pr-4 font-semibold">Plocha</th>
          <th className="py-2 pr-4 font-semibold">Cena</th>
          <th className="py-2 font-semibold">Kč/m²</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((l) => (
          <tr key={l.area} className="border-b border-border last:border-0">
            <td className="py-2.5 pr-4 text-foreground">{l.area}</td>
            <td className="py-2.5 pr-4 text-muted-foreground">{l.type}</td>
            <td className="py-2.5 pr-4 text-muted-foreground">{l.size}</td>
            <td className="py-2.5 pr-4 text-foreground font-medium">{l.price}</td>
            <td className="py-2.5 text-primary font-semibold">{l.perSqm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sizeSegments = [
  { label: 'Byty do 25 m²', display: '100 000 až 140 000 Kč/m²', min: 100000, max: 140000 },
  { label: 'Byty 36 až 40 m²', display: '90 000 až 120 000 Kč/m²', min: 90000, max: 120000 },
];

const PricePerSqmChart = () => {
  const max = 150000;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Cena za m² podle velikosti bytu</h3>
      <p className="text-sm text-muted-foreground mb-6">Menší byt, vyšší cena za metr čtvereční, srpen 2026</p>
      <div className="space-y-5">
        {sizeSegments.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{s.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{s.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full bg-primary absolute left-0"
                style={{ width: `${(s.min / max) * 100}%`, opacity: 0.5 }}
              />
              <div
                className="h-full rounded-full bg-primary absolute left-0"
                style={{ width: `${(s.max / max) * 100}%`, opacity: 0.85 - i * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Pevné náklady na kuchyň, koupelnu a vstup se u malého bytu rozpočítávají na méně metrů, cena za m² proto u nejmenších jednotek vychází výš.
      </p>
    </div>
  );
};

const OwnershipComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Home className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Osobní vlastnictví</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Standardní hypotéka dostupná bez omezení</li>
        <li>Širší okruh potenciálních kupujících</li>
        <li>Vyšší prodejní cena za srovnatelný byt</li>
      </ul>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <Building2 className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Družstevní byt</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Standardní hypotéka na koupi podílu obvykle nejde</li>
        <li>Užší okruh kupujících, hlavně s hotovostí</li>
        <li>Cena zhruba o 10 až 20 % nižší než v osobním vlastnictví</li>
      </ul>
    </div>
  </div>
);

const MortgageStats = () => (
  <div className="grid sm:grid-cols-3 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
        <Percent className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-black text-foreground mb-1">5,42 %</div>
      <p className="text-xs text-muted-foreground">Průměrná sazba hypoték, srpen 2026, pátý měsíc růstu</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-black text-foreground mb-1">21 300 Kč</div>
      <p className="text-xs text-muted-foreground">Model splátky 3,5 mil. Kč na 25 let při aktuální sazbě</p>
    </div>
    <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3 mx-auto">
        <Building2 className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-black text-primary mb-1">LTV 70 %</div>
      <p className="text-xs text-muted-foreground">Limit pro investiční hypotéky na 3. a další nemovitost od dubna 2026</p>
    </div>
  </div>
);

const BlogProdejGarsonky = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Prodej garsonky v Příbrami 2026: co ovlivní cenu',
      'Kolik dnes stojí garsonka nebo malý byt v Příbrami a co nejvíc ovlivňuje cenu, velikost, lokalitu, patro i vlastnictví. Aktuální nabídky a rady k prodeji.',
      '/blog/prodej-garsonky-maleho-bytu-pribram-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Prodej garsonky a malého bytu v Příbrami 2026: co ovlivňuje cenu',
      description: 'Kolik dnes stojí garsonka nebo malý byt v Příbrami a co nejvíc ovlivňuje cenu, velikost, lokalitu, patro i vlastnictví. Aktuální nabídky a rady k prodeji.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/prodej-garsonky-maleho-bytu-pribram-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Prodej garsonky a malého bytu v Příbrami 2026' },
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
                alt="Útulná garsonka, ilustrační foto k prodeji malého bytu v Příbrami"
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
                9 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Prodej garsonky a malého bytu v Příbrami 2026: co ovlivňuje cenu
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Prodáváte garsonku nebo malý byt 1+kk v Příbrami a nevíte, jestli je nabízená cena přiměřená? Nebo naopak takový byt hledáte, ať už k bydlení, nebo jako investici do pronájmu? Malé jednotky mají svá vlastní specifika, která cenu ovlivňují jinak než u bytu 3+1 nebo rodinného domu.
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
                  Garsonky a byty 1+kk se v Příbrami v srpnu 2026 prodávaly přibližně od 2,3 do 3,3 mil. Kč, podle velikosti, lokality a stavu. Nejmenší jednotky do 25 m² přitom stojí za metr čtvereční citelně víc než větší 1+kk kolem 36 až 40 m², protože pevné náklady na kuchyň, koupelnu a vstup se u malé plochy rozpočítávají na méně metrů. Kromě velikosti cenu nejvíc ovlivňuje patro a výtah, typ vlastnictví (osobní vlastnictví se prodává dráž než družstevní byt) a stav včetně energetického štítku. Malé byty navíc táhnou investoři, protože dosahují vyššího hrubého výnosu z pronájmu než větší jednotky, a jsou dostupnější i pro mladé kupující díky nižší jistině na hypotéku.
                </p>
              </div>

              {/* H2 Kolik dnes stoji */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik dnes stojí garsonka a malý byt v Příbrami</h2>
                <p className="text-muted-foreground mb-2">
                  Z aktuálních nabídek v Příbrami (srpen 2026) lze odvodit orientační cenové rozpětí podle velikosti a lokality.
                </p>
                <ListingsTable />
                <p className="text-muted-foreground">
                  Cenová mapa webu z června 2026 uváděla pro kategorii 1+kk a 1+1 orientační rozmezí 1,8 až 3,0 mil. Kč. U větších jednotek kolem 36 až 40 m² se toto rozmezí i v srpnu potvrzuje, nejmenší byty do 25 m² se ale dnes prodávají spíš při horní hranici tohoto odhadu, nebo i nad ní. Přesnou cenu vždy určuje konkrétní stav bytu, patro a poptávka v dané lokalitě, uvedené příklady slouží jako orientace, ne jako záruka. Podrobný přehled cen podle čtvrtí najdete v{' '}
                  <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapě Příbrami</Link>.
                </p>
              </div>

              {/* H2 Proc mensi byt stoji vic */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Proč menší byt stojí za metr čtvereční víc, ne míň</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Tohle je bod, který řadu prodávajících i kupujících překvapí. Intuitivně by se dalo čekat, že větší byt bude dražší za m², protože je vzácnější a žádanější, srovnání aktuálních nabídek v Příbrami ale ukazuje opak. Byty do 25 m² se pohybují kolem 100 000 až 140 000 Kč/m², zatímco byty 1+kk a 1+1 o velikosti 36 až 40 m² kolem 90 000 až 120 000 Kč/m².
                  </p>
                </div>
                <PricePerSqmChart />
                <p className="text-muted-foreground">
                  Důvod je jednoduchý. Každý byt, ať má 19, nebo 40 m², potřebuje kuchyňský kout, koupelnu, vstupní prostor a rozvody. Tyto pevné prvky u malého bytu zaberou poměrně větší část plochy a jejich náklad se rozpočítá na méně metrů, výsledná cena za m² proto u nejmenších jednotek vychází výš. Pro prodávajícího malé garsonky je to dobrá zpráva, cenu nemusí nutně stahovat dolů jen proto, že byt má málo metrů. Pro kupujícího naopak signál, že úspora oproti většímu bytu nebude proporční k rozdílu v ploše.
                </p>
              </div>

              {/* H2 Patro a stav domu */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co dál ovlivňuje cenu, patro a stav domu</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Významně cenu ovlivňuje patro a přítomnost výtahu. Byt v posledním patře bez výtahu, nebo naopak v přízemí s okny do ulice, patří u realitních makléřů mezi standardně zmiňované faktory, které mohou nabídkovou cenu srazit, přesný procentní dopad se ale mezi jednotlivými byty liší a nejde ho paušalizovat. Balkon, lodžie nebo terasa cenu obvykle zvyšují, u malých bytů to platí obzvlášť, protože venkovní prostor částečně kompenzuje menší vnitřní plochu, konkrétní výši příplatku ale vždy určí až srovnání s podobně vybavenými byty v okolí.
                  </p>
                </div>
              </div>

              {/* H2 Osobni vlastnictvi vs druzstevni */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Osobní vlastnictví, nebo družstevní byt</h2>
                <p className="text-muted-foreground mb-2">
                  U garsonek a malých bytů v Příbrami se ojediněle objevuje družstevní forma vlastnictví, hlavně u starších sídlištních domů. Družstevní byty se prodávají levněji než srovnatelné byty v osobním vlastnictví, rozdíl se podle dostupných zdrojů pohybuje zhruba od 10 do 20 %, u některých bytů i víc.
                </p>
                <OwnershipComparison />
                <p className="text-muted-foreground">
                  Hlavní důvod je dostupnost financování. Na koupi družstevního podílu si většina bank neposkytne standardní hypotéku zajištěnou nemovitostí, protože kupující nezískává vlastnické právo k bytu, ale členský podíl v družstvu. Tím se okruh kupujících zúží na ty, kdo mají hotovost, nebo si dokážou sehnat úvěr jinou cestou, což tlačí cenu dolů. Pokud garsonku nebo malý byt prodáváte a jde o družstevní vlastnictví, počítejte s tím při stanovení očekávané ceny, a pokud naopak kupujete, ověřte si předem, jak budete koupi financovat.
                </p>
              </div>

              {/* H2 Stav a PENB */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Stav bytu a energetický štítek (PENB)</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Stav bytu, poslední rekonstrukce koupelny, kuchyně, oken a rozvodů, patří mezi nejsilnější cenotvorné faktory u jakéhokoli bytu, malé jednotky nevyjímaje. U garsonek a 1+kk navíc kupující často očekávají, že se do bytu nastěhují bez velkých investic, takže rozdíl mezi „k nastěhování" a „k rekonstrukci" bývá u malých bytů v procentech ceny citelnější než u velkých bytů, kde se náklad na rekonstrukci rozpočítá na víc metrů.
                  </p>
                  <p>
                    Roli hraje i energetický štítek, tedy průkaz energetické náročnosti budovy (PENB), který musí prodávající kupujícímu doložit ze zákona. Od roku 2025 se metodika výpočtu PENB zpřísnila, víc zohledňuje skutečnou spotřebu, zateplení a způsob vytápění, což se citelně projevuje hlavně u starších panelových a cihlových domů bez zateplení, tedy typicky u domů, kde se prodává hodně příbramských garsonek. Podrobně jsem povinnosti kolem PENB při prodeji popsal v samostatném článku,{' '}
                    <Link to="/blog/penb-pri-prodeji-nemovitosti-2026" className="text-secondary hover:underline font-medium">energetický štítek při prodeji nemovitosti</Link>,
                    {' '}který doporučuji projít ještě před inzercí.
                  </p>
                </div>
              </div>

              {/* H2 Investori */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Proč o garsonky stojí investoři</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Malé byty jsou dlouhodobě oblíbeným cílem investorů do pronájmu, a to z jednoduchého důvodu, kombinují nižší vstupní cenu s vyšším procentním výnosem. Podle propočtů zaměřených na investiční byty v roce 2026 dosahují menší jednotky o velikosti zhruba 25 až 45 m², tedy garsonky a byty 1+kk, hrubého výnosu z pronájmu přibližně 3 až 5 % ročně, čistého výnosu po odečtení nákladů typicky 2 až 4 %, na horní hranici celostátního průměru napříč velikostmi bytů. Jde o celostátní odhad, ne číslo specifické pro Příbram, vzhledem k nižším pořizovacím cenám oproti krajským městům ale může být reálný výnos v Příbrami srovnatelný, nebo i o něco vyšší.
                  </p>
                  <p>
                    Pro prodávajícího garsonky to znamená širší okruh potenciálních kupců, nejen lidé hledající vlastní bydlení, ale i investoři počítající s pronájmem. Kolik si za pronájem podobného bytu v Příbrami reálně účtovat, popisuji v článku o{' '}
                    <Link to="/blog/pronajem-bytu-pribram-2026" className="text-secondary hover:underline font-medium">pronájmu bytu v Příbrami</Link>,
                    {' '}a širší srovnání investičních nemovitostí najdete v článku{' '}
                    <Link to="/blog/investicni-nemovitosti-pribram" className="text-secondary hover:underline font-medium">investiční nemovitosti Příbram</Link>.
                  </p>
                </div>
              </div>

              {/* H2 Hypoteky */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Hypotéky v roce 2026 a kdo dnes malé byty kupuje</h2>
                <p className="text-muted-foreground mb-2">
                  Průměrná nabízená sazba hypoték v Česku v srpnu 2026 vystoupala na 5,42 %, pátý měsíc v řadě roste a jde o nejvyšší úroveň za poslední dva roky, aktuální čísla sleduji v{' '}
                  <Link to="/blog/hypotecni-sazby-pribram-mesicni-prehled" className="text-secondary hover:underline font-medium">měsíčním přehledu hypotečních sazeb</Link>. Pro garsonku za 2,3 až 3,3 mil. Kč je potřebná jistina výrazně nižší než u bytu 3+1 za 5 až 6 mil. Kč a víc, což se v měsíční splátce citelně projeví, malé byty proto zůstávají dostupnějším vstupem na trh hlavně pro mladé a prvokupující.
                </p>
                <MortgageStats />
                <p className="text-muted-foreground">
                  Od 1. dubna 2026 navíc ČNB zpřísnila pravidla pro investiční hypotéky, tedy úvěry na třetí a další nemovitost nebo na jakoukoli koupi určenou k pronájmu, maximální poměr úvěru k hodnotě nemovitosti (LTV) klesl na 70 %, což znamená minimálně 30 % vlastních zdrojů, a přibyl i limit na poměr úvěru k ročnímu čistému příjmu (DTI) ve výši 7násobku. Hypotéky pro vlastní bydlení zůstávají beze změny, LTV do 80 %, u kupujících do 36 let až 90 %. Pokud tedy garsonku prodáváte investorovi, počítejte s tím, že si na koupi bude muset připravit víc vlastního kapitálu než dřív, u kupujícího pro vlastní bydlení se nic zásadního nemění. Širší dopad hypoték na prodej popisuji v článku o{' '}
                  <Link to="/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram" className="text-secondary hover:underline font-medium">hypotékách a jejich dopadu na prodej</Link>.
                </p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak nastavit cenu při prodeji garsonky nebo malého bytu</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Srovnejte aktuální nabídky bytů podobné velikosti ve Vaší lokalitě.</strong> U malých bytů srovnávejte hlavně podle m², ne jen podle dispozice, cena za metr se u garsonek liší víc než u velkých bytů.</li>
                  <li><strong className="text-foreground">Zohledněte typ vlastnictví.</strong> Pokud jde o družstevní byt, počítejte s nižší cenou než u srovnatelného bytu v osobním vlastnictví.</li>
                  <li><strong className="text-foreground">Zhodnoťte stav bytu a připravte si PENB.</strong> U malých bytů se rozdíl mezi bytem k nastěhování a bytem k rekonstrukci v procentech ceny projeví víc než u velkých bytů.</li>
                  <li><strong className="text-foreground">Zvažte, jestli byt zaujme i investory, ne jen kupující pro vlastní bydlení.</strong> Garsonky s dobrou dostupností a stabilní poptávkou po pronájmu můžou přilákat širší okruh zájemců.</li>
                  <li><strong className="text-foreground">Nastavte cenu s rezervou pro vyjednávání, ale reálně.</strong> Přemrštěná cena u malého bytu odradí kupující rychleji než u většího bytu, protože srovnatelných nabídek bývá v dané lokalitě víc.</li>
                </ol>
                <p className="text-muted-foreground">
                  Stanovení reálné prodejní ceny garsonky nebo malého bytu v Příbrami řeším s klienty jako první krok každého prodeje, obecný postup najdete i v článku{' '}
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">jak správně ocenit nemovitost před prodejem</Link>.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Garsonky a byty 1+kk se v Příbrami v srpnu 2026 prodávaly přibližně od 2,3 do 3,3 mil. Kč, podle velikosti, lokality a stavu.',
                    'Nejmenší jednotky do 25 m² mají vyšší cenu za m² (přibližně 100 000 až 140 000 Kč/m²) než větší 1+kk kolem 36 až 40 m² (přibližně 90 000 až 120 000 Kč/m²).',
                    'Družstevní byty se prodávají zhruba o 10 až 20 % levněji než srovnatelné byty v osobním vlastnictví, hlavně kvůli omezené dostupnosti hypoték.',
                    'Malé byty dosahují hrubého výnosu z pronájmu přibližně 3 až 5 % ročně, na horní hranici celostátního průměru, což z nich dělá vyhledávaný cíl investorů.',
                    'Průměrná sazba hypoték v srpnu 2026 dosáhla 5,42 %, pro investiční hypotéky navíc od dubna 2026 platí přísnější limity, LTV 70 % a DTI 7násobek příjmu.',
                    'Patro, výtah, balkon a stav domu zůstávají u malých bytů stejně důležité jako u velkých.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese, včetně garsonek a malých bytů oblíbených u investorů i prvokupujících. Klienty provází celým procesem prodeje od stanovení ceny až po předání nemovitosti.
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

              {/* Zaver + CTA */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Shrnutí a co dělat dál</h2>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Prodej garsonky nebo malého bytu v Příbrami se řídí podobnými pravidly jako prodej jakékoli jiné nemovitosti, lokalita, stav, vybavení, má ale svá specifika. Nejmenší byty stojí za m² víc, ne míň, družstevní vlastnictví srazí cenu o desítky procent a rostoucí zájem investorů rozšiřuje okruh potenciálních kupců.</p>
                  <p>Pokud v Příbrami prodáváte garsonku nebo malý byt a chcete znát reálnou tržní cenu podloženou aktuálními nabídkami, ozvěte se mi. Připravím Vám odhad na míru a postarám se o celý proces{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">prodeje nemovitosti v Příbrami</Link>.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <KeyRound className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Prodáváte garsonku nebo malý byt v Příbrami a chcete znát reálnou tržní cenu?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Připravím Vám odhad ceny na míru podložený aktuálními nabídkami a postarám se o kompletní proces prodeje, od stanovení ceny až po předání klíčů.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/odhad-nemovitosti"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Nezávazný odhad ceny
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
                Článek vychází z aktuálních nabídek realitních portálů a veřejně dostupných dat k srpnu 2026 a má informativní charakter. Konkrétní cena bytu se vždy odvíjí od jeho stavu, lokality a aktuální poptávky, uvedená rozmezí slouží jako orientace. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Souvisejici clanky */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
                    { title: 'Investiční nemovitosti Příbram: Vyplatí se to v roce 2026?', slug: 'investicni-nemovitosti-pribram' },
                    { title: 'Energetický štítek (PENB) při prodeji nemovitosti', slug: 'penb-pri-prodeji-nemovitosti-2026' },
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

export default BlogProdejGarsonky;
