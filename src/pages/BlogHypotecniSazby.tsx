import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Percent, TrendingUp, Landmark, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1768839720586-71b7ff8b5c59?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-09-03';
const PUBLISHED_DISPLAY = '3. září 2026';
const DATA_MONTH = 'srpen 2026';

const faqItems = [
  {
    q: 'Jaká je aktuální průměrná sazba hypotéky?',
    a: 'Podle ČBA Hypomonitoru dosáhla průměrná sjednaná sazba nových hypoték v červenci 2026 hodnoty 4,90 %. Průměrná nabízená sazba napříč bankami je podle Swiss Life Hypoindexu vyšší, v srpnu 2026 činila 5,42 %, pátý měsíc růstu v řadě. Novější data z obou indexů vycházejí vždy v průběhu následujícího měsíce a tento přehled pak aktualizuji.',
  },
  {
    q: 'Jaký je rozdíl mezi sjednanou a nabízenou sazbou hypotéky?',
    a: 'Nabízená sazba (Swiss Life Hypoindex) je ceníkové číslo z webu banky bez individuálního vyjednávání. Sjednaná sazba (ČBA Hypomonitor) je průměr reálně podepsaných hypoték včetně slev za bonitu, výši úvěru, nízké LTV nebo aktivní účet a pojištění u banky. Sjednaná sazba bývá o několik desetin procentního bodu nižší, aktuálně je rozdíl mezi oběma indexy zhruba 0,5 procentního bodu.',
  },
  {
    q: 'Liší se hypoteční sazby v Příbrami od zbytku republiky?',
    a: 'Ne. Banky nabízejí stejné sazby po celé ČR, sazba se neodvíjí od místa nemovitosti. V Příbrami se liší jen výsledná měsíční splátka, protože kupní ceny bytů a domů jsou nižší než v Praze. U bytu 3+1 za 4,5 mil. Kč a hypotéky 3,6 mil. Kč na 30 let vychází splátka při aktuálních sazbách orientačně kolem 19 000 až 20 000 Kč měsíčně.',
  },
  {
    q: 'Budou hypotéky v roce 2026 zlevňovat?',
    a: 'Analytici čekají spíš ustálení sazeb na současné úrovni než rychlý pokles. Swiss Life Hypoindex mluví o blížícím se vrcholu a následném velmi pozvolném poklesu. Banky se řídí hlavně dlouhodobými tržními sazbami a inflačními riziky, ne jen repo sazbou ČNB. Na výrazný návrat levných hypoték z předchozích let se letos spoléhat nedá, ceny nemovitostí přitom dál rostou.',
  },
  {
    q: 'Kolik vlastních peněz potřebuji k hypotéce v roce 2026?',
    a: 'U hypotéky na vlastní bydlení je maximální LTV 80 %, potřebujete tedy minimálně 20 % z kupní ceny z vlastních zdrojů. Žadatelé do 36 let kupující první nemovitost mohou dosáhnout na LTV až 90 %. Pro investiční nemovitosti (třetí a další nebo koupě k pronájmu) platí od 1. dubna 2026 přísnější limit LTV 70 % a doporučený DTI 7.',
  },
];

const RateSourceComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Percent className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">ČBA Hypomonitor</h3>
      </div>
      <p className="text-2xl font-black text-foreground mb-1">4,90 %</p>
      <p className="text-xs text-muted-foreground mb-3">sjednaná sazba, červenec 2026</p>
      <p className="text-sm text-muted-foreground">Průměr reálně podepsaných hypoték včetně individuálních slev a vyjednaných podmínek. Bývá nižší než ceníková nabídka bank.</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <TrendingUp className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Swiss Life Hypoindex</h3>
      </div>
      <p className="text-2xl font-black text-foreground mb-1">5,42 %</p>
      <p className="text-xs text-muted-foreground mb-3">nabízená sazba, srpen 2026</p>
      <p className="text-sm text-muted-foreground">Průměr oficiálních ceníkových sazeb napříč bankami bez individuálního vyjednávání. Pátý měsíc růstu v řadě, nejvýš za dva roky.</p>
    </div>
  </div>
);

const rateTrend = [
  { month: 'Bře', value: 4.43 },
  { month: 'Dub', value: 4.52 },
  { month: 'Kvě', value: 4.67 },
  { month: 'Čer', value: 4.79 },
  { month: 'Čvc', value: 4.90 },
];

const RateTrendChart = () => {
  const min = 4.2;
  const max = 5.0;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Vývoj sjednané sazby hypoték v roce 2026</h3>
      <p className="text-sm text-muted-foreground mb-6">Zdroj: ČBA Hypomonitor, průměrná sjednaná sazba p. a.</p>
      <div className="flex items-end justify-between gap-2 md:gap-3 h-40 mb-3">
        {rateTrend.map((m) => {
          const heightPct = ((m.value - min) / (max - min)) * 100;
          return (
            <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-xs font-bold text-foreground mb-1">{m.value.toFixed(2).replace('.', ',')} %</span>
              <div className="w-full rounded-t-md bg-secondary" style={{ height: `${heightPct}%` }} />
              <span className="text-xs text-muted-foreground mt-2">{m.month}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground pt-3 border-t border-border">
        Po krátkém únorovém poklesu pod 4,5 % roste sjednaná sazba nepřetržitě od března 2026. Nabízená sazba (Swiss Life Hypoindex) rostla ve stejném období ještě rychleji.
      </p>
    </div>
  );
};

const banks = [
  { name: 'Fio banka', fix3: '4,58 %', fix5: '4,68 %' },
  { name: 'Moneta Money Bank', fix3: '4,99 %', fix5: '5,09 %' },
  { name: 'Raiffeisenbank', fix3: '5,04 %', fix5: '5,19 %' },
  { name: 'Air Bank', fix3: '5,09 %', fix5: '5,29 %' },
  { name: 'Česká spořitelna', fix3: '5,09 %', fix5: '5,29 %' },
  { name: 'Partners Banka', fix3: '5,29 %', fix5: '5,59 %' },
  { name: 'Komerční banka', fix3: '5,39 %', fix5: '5,74 %' },
  { name: 'ČSOB / Hypoteční banka', fix3: '5,39 %', fix5: '5,59 %' },
  { name: 'UniCredit Bank', fix3: '5,59 %', fix5: 'neuvedeno' },
  { name: 'mBank', fix3: '5,29 %', fix5: '5,49 %' },
];

const BankTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-1">Nabízené sazby vybraných bank</h3>
    <p className="text-sm text-muted-foreground mb-6">Ceníkové sazby při LTV do 80 %, snímek k 25. srpnu 2026, zdroj Hypoindex.cz</p>
    <table className="w-full text-sm min-w-[420px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Banka</th>
          <th className="py-2 pr-4 font-semibold">Fixace 3 roky</th>
          <th className="py-2 font-semibold">Fixace 5 let</th>
        </tr>
      </thead>
      <tbody>
        {banks.map((b) => (
          <tr key={b.name} className="border-b border-border last:border-0">
            <td className="py-2.5 pr-4 text-foreground">{b.name}</td>
            <td className="py-2.5 pr-4 text-foreground font-medium">{b.fix3}</td>
            <td className="py-2.5 text-muted-foreground">{b.fix5}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
      Jde o ceníkové (nabízené) sazby, reálně sjednaná sazba bývá po vyjednávání nižší. Tabulka je orientační, ne nabídka. Průměr fixace na 3 roky činil v srpnu 5,12 %, na 5 let 5,33 %.
    </p>
  </div>
);

const paymentScenarios = [
  { label: 'Garsonka, cena 2,8 mil. Kč, úvěr 2,24 mil.', value: 12600, display: '≈ 12 600 Kč / měsíc' },
  { label: 'Byt 3+1, cena 4,5 mil. Kč, úvěr 3,6 mil.', value: 20200, display: '≈ 20 200 Kč / měsíc' },
  { label: 'Rodinný dům, cena 8,5 mil. Kč, úvěr 6,8 mil.', value: 38200, display: '≈ 38 200 Kč / měsíc' },
];

const PaymentByPropertyChart = () => {
  const max = Math.max(...paymentScenarios.map((s) => s.value));
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Splátka podle typu nemovitosti v Příbrami</h3>
      <p className="text-sm text-muted-foreground mb-6">LTV 80 %, splatnost 30 let, nabízená sazba 5,42 % (srpen 2026)</p>
      <div className="space-y-5">
        {paymentScenarios.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{s.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{s.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(s.value / max) * 100}%`, opacity: 0.55 + i * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Vlastní ilustrační výpočet podle anuitního vzorce, ne oficiální statistika. Při sjednané sazbě 4,90 % vychází splátky zhruba o 1 000 až 2 000 Kč měsíčně níž. Konkrétní splátka závisí na výši úvěru a bonitě žadatele.
      </p>
    </div>
  );
};

const CnbLimits = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 not-prose">
    {[
      { icon: Percent, value: '80 %', label: 'Maximální LTV pro vlastní bydlení, 90 % pro žadatele do 36 let' },
      { icon: Landmark, value: '70 %', label: 'Maximální LTV pro investiční hypotéky od 1. dubna 2026' },
      { icon: TrendingUp, value: '7 až 8', label: 'Doporučený strop DTI (dluh k čistému ročnímu příjmu), 7 u investičních' },
      { icon: Landmark, value: '3,75 %', label: 'Repo sazba ČNB, beze změny od 19. června 2026' },
    ].map((s) => (
      <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
          <s.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-2xl font-black text-foreground mb-1">{s.value}</div>
        <p className="text-xs text-muted-foreground">{s.label}</p>
      </div>
    ))}
  </div>
);

const BlogHypotecniSazby = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Hypoteční sazby 2026: aktuální přehled pro Příbram',
      'Aktuální hypoteční sazby: sjednaná 4,90 % (ČBA Hypomonitor), nabízená 5,42 % (Swiss Life Hypoindex). Přehled vývoje 2026 a splátky bytů v Příbrami. Aktualizováno měsíčně.',
      '/blog/hypotecni-sazby-pribram-mesicni-prehled'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Hypoteční sazby a Příbram: aktuální přehled (aktualizováno měsíčně)',
      description: 'Aktuální hypoteční sazby, vývoj v roce 2026 a co znamenají pro splátky bytů a domů v Příbrami. Data ČBA Hypomonitor a Swiss Life Hypoindex, aktualizováno měsíčně.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/hypotecni-sazby-pribram-mesicni-prehled',
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
        { '@type': 'ListItem', position: 3, name: 'Hypoteční sazby a Příbram: aktuální přehled' },
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
                alt="Kalkulačka, model domu a klíče, ilustrační foto k tématu hypotečních sazeb"
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
              Hypoteční sazby a Příbram: aktuální přehled (aktualizováno měsíčně)
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Kolik je teď sazba hypotéky? Zdánlivě jednoduchá otázka má dvě různé odpovědi podle toho, který index sledujete. Tady najdete obě čísla, vývoj za rok 2026 a hlavně to, co dané sazby znamenají pro splátku konkrétního bytu nebo domu v Příbrami. Přehled aktualizuji každý měsíc, jakmile vyjdou nová data.
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
                <h2 className="text-xl font-bold text-foreground mb-3">Rychlá odpověď (k datu {DATA_MONTH})</h2>
                <p className="text-muted-foreground">
                  Průměrná <strong className="text-foreground">sjednaná</strong> sazba nových hypoték je podle ČBA Hypomonitoru <strong className="text-foreground">4,90 %</strong> (červenec 2026, novější data vyjdou v polovině září). Průměrná <strong className="text-foreground">nabízená</strong> sazba napříč bankami je podle Swiss Life Hypoindexu <strong className="text-foreground">5,42 %</strong> (srpen 2026), pátý měsíc růstu v řadě a nejvýš za dva roky. Nejnižší dostupná nabídka na trhu se drží kolem 4,6 %, pod hranicí 5 % zůstávají zhruba dvě banky. Sazby jsou stejné po celé ČR, v Příbrami se liší jen výsledná splátka, protože kupní ceny jsou nižší než v Praze. U typického bytu 3+1 za 4,5 mil. Kč a hypotéky 3,6 mil. Kč na 30 let vychází splátka orientačně kolem 19 000 až 20 000 Kč měsíčně. Analytici čekají spíš ustálení sazeb než rychlý pokles.
                </p>
              </div>

              {/* H2 Jaka je aktualni sazba */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jaká je aktuální sazba hypotéky</h2>
                <p className="text-muted-foreground mb-2">
                  Sjednaná sazba je 4,90 %, nabízená 5,42 %. Obě čísla od jara 2026 rostou. Rozdíl mezi nimi není chyba, každý index měří něco jiného.
                </p>
                <RateSourceComparison />
                <p className="text-muted-foreground">
                  ČBA Hypomonitor vychází zhruba třetí týden následujícího měsíce, poslední dostupná hodnota je za červenec 2026 a je meziročně o 0,37 procentního bodu výš. Swiss Life Hypoindex vychází k pátému pracovnímu dni měsíce, srpnová hodnota 5,42 % je o 0,10 bodu nad červencem. Pokud si chcete spočítat, na jakou částku úvěru při této sazbě dosáhnete, projděte si článek{' '}
                  <Link to="/blog/kolik-si-muzu-dovolit-hypoteka-pribram" className="text-secondary hover:underline font-medium">kolik si můžete reálně půjčit</Link>.
                </p>
              </div>

              {/* H2 Vyvoj 2026 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Vývoj sazeb v roce 2026 měsíc po měsíci</h2>
                <p className="text-muted-foreground mb-2">
                  Rok 2026 začal očekáváním poklesu. V únoru se na trhu krátce objevila nabídka pod 4 %, od března ale sazby nepřetržitě rostou. Trend se otočil dřív, než se čekalo.
                </p>
                <RateTrendChart />
                <p className="text-muted-foreground">
                  Hlavním důvodem obratu nejsou rozhodnutí ČNB, ale dlouhodobé tržní sazby, hlavně úrokové swapy (IRS), které odrážejí očekávání trhu ohledně budoucí inflace a měnové politiky. K tomu se přidává geopolitická nejistota, která tlačí sazby nahoru. Od března do srpna 2026 vzrostla nabízená sazba zhruba o 0,5 procentního bodu a modelová splátka hypotéky 3,5 mil. Kč na 25 let stoupla za stejné období asi o 1 100 Kč měsíčně.
                </p>
              </div>

              {/* H2 Nabidky bank */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nabídky jednotlivých bank</h2>
                <p className="text-muted-foreground mb-2">
                  Nejnižší sazba na trhu je kolem 4,6 %, pod 5 % se drží jen část bank a rozdíl mezi nejlevnější a nejdražší nabídkou je přes jeden procentní bod. V srpnu 2026 zvýšilo sazby sedm bank, čtyři je nechaly beze změny.
                </p>
                <BankTable />
                <p className="text-muted-foreground">
                  Pod psychologickou hranicí 5 % zůstávají u tříleté fixace Fio banka a Moneta Money Bank. Největší jednorázový skok předvedla Partners Banka, která zvedla pětiletou fixaci o 0,4 procentního bodu. Sledovat jen jedno číslo nestačí, mezi bankami se vyplatí porovnávat a vyjednávat.
                </p>
              </div>

              {/* H2 Sjednana vs nabizena */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Sjednaná a nabízená sazba, proč se čísla liší</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nabízená sazba je ceníkové číslo z webu banky. Sjednaná sazba je průměr toho, co lidé reálně podepíšou, po slevách a vyjednávání, a bývá o několik desetin procentního bodu níž. Aktuálně je rozdíl mezi oběma indexy zhruba 0,5 bodu, tolik se dá při dobré vyjednávací pozici přibližně usmlouvat.
                  </p>
                  <p>
                    Sleva z ceníkové sazby závisí na bonitě žadatele, výši úvěru, nízkém poměru úvěru k hodnotě nemovitosti (LTV), na tom, jestli si k hypotéce vezmete i běžný účet a pojištění u stejné banky, a na práci hypotečního specialisty, který dokáže banky postavit proti sobě. Pro srovnání, průměrná sjednaná sazba za celý rok 2025 činila 4,58 %, za rok 2024 to bylo 5,07 %.
                  </p>
                </div>
              </div>

              {/* H2 Splatka v Pribrami */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co aktuální sazby znamenají pro splátku v Příbrami</h2>
                <p className="text-muted-foreground mb-2">
                  Sazba je stejná po celé republice, v Příbrami se ale kvůli nižším kupním cenám promítne do nižší splátky než v Praze. Průměrná nová hypotéka v ČR má dnes 4,59 mil. Kč, v Příbrami se u běžného bytu vejdete pod tuto částku.
                </p>
                <PaymentByPropertyChart />
                <p className="text-muted-foreground">
                  Ceny bytů v Příbrami se pohybují mezi 60 000 a 100 000 Kč za m², novostavby startují kolem 130 000 Kč za m² a rodinné domy ve Středočeském kraji stály v květnu 2026 v průměru kolem 70 500 Kč za m². Podrobný přehled podle čtvrtí najdete v{' '}
                  <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapě Příbrami</Link>
                  {' '}a ceny nových bytů rozebírám v článku o{' '}
                  <Link to="/blog/novostavby-pribram-2026-kde-se-stavi" className="text-secondary hover:underline font-medium">novostavbách v Příbrami</Link>.
                </p>
              </div>

              {/* H2 Pravidla CNB */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Pravidla ČNB pro rok 2026: LTV, DTI a investiční hypotéky</h2>
                <p className="text-muted-foreground mb-2">
                  Pro vlastní bydlení platí LTV do 80 %, u žadatelů do 36 let na první nemovitost až 90 %. Limity DTI a DSTI jsou pro běžné bydlení plošně vypnuté, banky si ale drží vlastní vnitřní hranice kolem 40 až 45 % příjmu na splátky.
                </p>
                <CnbLimits />
                <p className="text-muted-foreground">
                  Od 1. dubna 2026 platí přísnější doporučení pro investiční hypotéky, tedy úvěry na nemovitost, kterou kupující nebude sám obývat: maximální LTV 70 % a doporučený strop DTI 7. Pokud tedy kupujete byt k pronájmu, počítejte s vyšším podílem vlastních zdrojů. Jak si spočítat maximální hypotéku podle svého příjmu, popisuji v článku{' '}
                  <Link to="/blog/kolik-si-muzu-dovolit-hypoteka-pribram" className="text-secondary hover:underline font-medium">kolik si můžu dovolit</Link>.
                </p>
              </div>

              {/* H2 Vyhled */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Budou hypotéky zlevňovat? Výhled do konce roku 2026</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Analytici čekají spíš ustálení sazeb na současné úrovni než výrazný pokles. Swiss Life Hypoindex mluví o blížícím se vrcholu a následném velmi pozvolném poklesu, pokud se uklidní geopolitická situace a potvrdí se, že je inflace pod kontrolou. Další vývoj bude záviset hlavně na dlouhodobých tržních sazbách a konkurenci mezi bankami.
                  </p>
                  <p>
                    Na návrat k výrazně levnějším hypotékám z předchozích let bych letos nesázel. Zároveň platí, že ceny nemovitostí mezitím dál rostou, v mnoha regionech v prvním pololetí 2026 dvouciferně meziročně. Čekání na nižší sazbu se tak nemusí vyplatit, pokud vám konkrétní nemovitost sedí a splátka i cena vycházejí.
                  </p>
                </div>
              </div>

              {/* H2 Jak pouzivat */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak tento přehled používat a jak často se aktualizuje</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-secondary shrink-0 mt-1" />
                    <span>Stránku aktualizuji jednou měsíčně, jakmile vyjdou nová čísla z ČBA Hypomonitoru (zhruba třetí týden měsíce) a Swiss Life Hypoindexu (pátý pracovní den měsíce). Tabulku nabídek bank obnovuji podle aktuálního přehledu na Hypoindex.cz.</span>
                  </p>
                  <p>
                    Čísla v tomto článku slouží jako orientace ve vývoji trhu. Pro konkrétní propočet splátky a dosažitelné hypotéky na konkrétní nemovitost v Příbrami se mi ozvěte, projdeme to společně.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Sjednaná sazba (ČBA Hypomonitor) je 4,90 %, nabízená sazba (Swiss Life Hypoindex) 5,42 %, obě od jara 2026 rostou.',
                    'Nejnižší nabídka na trhu je kolem 4,6 %, pod 5 % zůstávají zhruba dvě banky.',
                    'Rozdíl mezi nabízenou a sjednanou sazbou je aktuálně asi 0,5 procentního bodu, tolik se dá zhruba usmlouvat.',
                    'Sazba je celostátní, v Příbrami se kvůli nižším cenám promítne do nižší splátky než v Praze.',
                    'Pro vlastní bydlení platí LTV do 80 % (90 % do 36 let), pro investiční hypotéky od dubna 2026 jen 70 % a DTI 7.',
                    'Výhled je spíš ustálení než rychlý pokles, ceny nemovitostí přitom dál rostou.',
                    'Přehled aktualizuji měsíčně podle nových dat z obou indexů.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej, pronájem a koupi bytů, domů a pozemků v Příbrami a celém okrese. Financování kupujících a dopad hypotečních sazeb na dostupnost bydlení řeší s klienty prakticky u každé zakázky.
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
                  <p>Hypoteční sazby jsou v roce 2026 nejvýš za dva roky a spíš se ustálí, než aby rychle klesly. Pro rozhodnutí o koupi ale není podstatná jen sazba, ale výsledná splátka a to, jestli na ni dosáhnete. A ta v Příbrami vychází citelně příznivěji než ve velkých městech.</p>
                  <p>Pokud v Příbrami zvažujete koupi bytu nebo domu a chcete vědět, na jakou splátku a jakou hypotéku reálně dosáhnete, ozvěte se mi. Spočítáme to na konkrétní nemovitost a probereme{' '}
                    <Link to="/sluzby/koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">celý postup koupě nemovitosti v Příbrami</Link>.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <Percent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Zvažujete koupi v Příbrami a chcete vědět, na jakou splátku se připravit?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Spočítám Vám splátku i dosažitelnou hypotéku na konkrétní nemovitost a projdu s Vámi, jestli se vyplatí koupit teď, nebo počkat.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/sluzby/koupe-nemovitosti-pribram"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Konzultace ke koupi
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
                Článek vychází z veřejně dostupných dat ČBA Hypomonitor, Swiss Life Hypoindex, Hypoindex.cz a ČNB k září 2026 a má informativní charakter. Konkrétní podmínky hypotéky se vždy odvíjejí od bonity žadatele a nabídky konkrétní banky, doporučujeme ověřit u hypotečního specialisty. Uvedené splátky jsou ilustrační výpočty, ne oficiální statistika. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami', slug: 'kolik-si-muzu-dovolit-hypoteka-pribram' },
                    { title: 'Hypotéky v červnu 2026 zdražily, co to znamená pro prodej nemovitosti v Příbrami', slug: 'hypoteky-cerven-2026-dopad-na-prodej-pribram' },
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
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

export default BlogHypotecniSazby;
