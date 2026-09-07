import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';
const heroImage = 'https://www.panfitinka.cz/storage/app/media/blog/pasivni%20vs%20nizkoen/trida_energeticke_narocnosti.png';

const PUBLISHED = '2026-07-02';
const PUBLISHED_DISPLAY = '2. července 2026';

const faqItems = [
  {
    q: 'Musím mít PENB, i když prodávám chatu v okolí Příbrami?',
    a: 'Pokud je chata nebo chalupa určená k rodinné rekreaci a využíváte ji jen část roku, PENB nepotřebujete. Výjimka platí i pro objekty s energeticky vztažnou plochou do 50 m². Pokud ale nemovitost slouží k celoročnímu bydlení, byť se jí říká chalupa, povinnost se na ni vztahuje.',
  },
  {
    q: 'Kdo platí PENB při prodeji bytu, já jako prodávající, nebo kupující?',
    a: 'Vždy prodávající. Povinnost i náklady leží na Vás jako vlastníkovi, kupující se na ceně PENB nijak nepodílí.',
  },
  {
    q: 'Co se stane, když PENB kupujícímu nepředám?',
    a: 'Hrozí Vám pokuta od Státní energetické inspekce. Fyzické osobě až 100 000 Kč, právnické osobě (např. SVJ) až 200 000 Kč. Kupující má navíc právo od kupní smlouvy odstoupit, a to až 5 let po jejím podpisu.',
  },
  {
    q: 'Musím si nechat zpracovat PENB, i když ho bytový dům, kde prodávám byt, už má?',
    a: 'Ne. Pokud bytový dům jako celek PENB má, použije se pro Váš byt tento průkaz a Vy jen doložíte jeho kopii. Pokud dům PENB nemá, můžete písemně požádat SVJ o jeho vydání, SVJ ho musí poskytnout do 30 dnů (existuje-li) nebo zajistit zpracování do 60 dnů (neexistuje-li). Když SVJ nereaguje, lze PENB nahradit vyúčtováním dodávek energie za poslední 3 roky.',
  },
  {
    q: 'Jak dlouho trvá zpracování PENB a kdy si ho mám objednat?',
    a: 'Standardně kolem 30 pracovních dní od zaměření nebo dodání podkladů. Objednejte si ho hned na začátku prodeje, ne až těsně před podpisem kupní smlouvy. U starších domů bez dokumentace se lhůta může protáhnout.',
  },
  {
    q: 'Jakou energetickou třídu obvykle mají byty na sídlištích Příbram VII a VIII?',
    a: 'Záleží na tom, jestli dům prošel revitalizací. Nezateplené paneláky z 70. a 80. let bývají ve třídě C až D, po zateplení pláště a výměně oken se běžně posunou na A až B až C. Přesnou třídu ale vždy určí až měření energetického specialisty, ne odhad podle stáří domu.',
  },
  {
    q: 'Co je renovační pas a musím ho mít už v roce 2026?',
    a: 'Renovační pas je nový dobrovolný dokument, který od roku 2026 začíná být v Česku k dispozici v návaznosti na evropskou směrnici EPBD IV. Ukazuje, jak postupně renovovat dům k lepší energetické třídě. Při prodeji nemovitosti ho mít nemusíte, povinný zůstává jen PENB. Renovační pas se hodí spíš vlastníkům, kteří plánují zateplení nebo výměnu vytápění a chtějí na to čerpat dotace z programu Nová zelená úsporám.',
  },
  {
    q: 'Je PENB opravdu zákonná povinnost, nebo jen doporučení?',
    a: 'Je to zákonná povinnost prodávajícího, ne doporučení. Vychází ze zákona č. 406/2000 Sb., o hospodaření energií, a platí pro naprostou většinu domů a bytů. Nejde o formalitu, kterou lze přeskočit, nesplnění povinnosti řeší Státní energetická inspekce a hrozí za ni pokuta.',
  },
  {
    q: 'Kde v Příbrami zajistit energetický štítek nemovitosti?',
    a: 'PENB smí zpracovat jen energetický specialista s akreditací Ministerstva průmyslu a obchodu, seznam najdete přímo na stránkách MPO. Řada akreditovaných specialistů dojíždí i do Příbrami a okolí. Pokud si nejste jistí, koho oslovit, doporučím prověřeného specialistu v rámci přípravy prodeje.',
  },
  {
    q: 'Liší se nový PENB v roce 2026 od staršího vydání?',
    a: 'Základní zákonná povinnost mít PENB při prodeji se v roce 2026 nemění. Novinkou je evropská směrnice EPBD IV, která přinesla dobrovolný renovační pas jako doplňkový dokument, ne náhradu PENB. Pokud máte starší platný PENB, dál ho můžete použít, dokud neuplyne jeho platnost.',
  },
];

const classColors: Record<string, { bg: string; text: string }> = {
  A: { bg: '#1D8A3D', text: '#FFFFFF' },
  B: { bg: '#4FA83C', text: '#FFFFFF' },
  C: { bg: '#8DC63F', text: '#FFFFFF' },
  D: { bg: '#F9E547', text: '#4A4A00' },
  E: { bg: '#F8981D', text: '#FFFFFF' },
  F: { bg: '#F26522', text: '#FFFFFF' },
  G: { bg: '#ED1C24', text: '#FFFFFF' },
};

const ClassBadge = ({ cls }: { cls: string }) => {
  const c = classColors[cls];
  if (!c) return null;
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-md font-bold text-sm shrink-0"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {cls}
    </span>
  );
};

const ClassRange = ({ range }: { range: string }) => {
  if (!range) return null;
  const letters = range.split(' až ');
  return (
    <span className="inline-flex gap-1.5">
      {letters.map((l) => (
        <ClassBadge key={l} cls={l} />
      ))}
    </span>
  );
};

const pribramTypology = [
  {
    area: 'Panelové domy, sídliště Příbram VII a VIII',
    period: 'zástavba převážně 70. až 80. léta',
    before: 'C až D',
    after: 'A až B až C',
    note: 'po zateplení pláště a výměně oken v rámci revitalizace SVJ',
  },
  {
    area: 'Cihlové činžovní domy, Příbram I a centrum',
    period: 'zástavba do 50. let 20. století',
    before: 'F až G',
    after: 'B až C až D',
    note: 'po zateplení a výměně starých oken za nová',
  },
  {
    area: 'Rodinné domy, satelitní obce (Trhové Dušníky, Obecnice, Bratkovice)',
    period: 'různé stáří, často svépomocná výstavba',
    before: 'D až F',
    after: 'B až C',
    note: 'záleží hlavně na zateplení a typu vytápění',
  },
  {
    area: 'Novostavby, Zdaboř, Brod',
    period: 'výstavba po roce 2013',
    before: '',
    after: 'A až B',
    note: 'standard dle aktuálních stavebních norem',
  },
];

const CostChart = () => {
  const items = [
    { label: 'Byt v domě, kde PENB pro budovu už existuje', value: 4, display: 'vlastně nestojí nic, už to má' },
    { label: 'Rodinný dům s dostupnou dokumentací', value: 20, display: '6 000 až 10 000 Kč' },
    { label: 'Rodinný dům bez dokumentace (nutné zaměření)', value: 33, display: '10 000 až 20 000 Kč' },
    { label: 'Bytový dům celkem (objednává obvykle SVJ)', value: 100, display: '20 000 Kč + a dál' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Kolik PENB reálně stojí</h3>
      <p className="text-sm text-muted-foreground mb-6">Podle typu nemovitosti a dostupnosti podkladů</p>
      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{item.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{item.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.value}%`, opacity: 0.45 + i * 0.18 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { step: '1', title: 'Objednávka specialisty', desc: 'Energetický specialista s akreditací MPO' },
    { step: '2', title: 'Podklady nebo zaměření', desc: 'Dokumentace, nebo osobní návštěva na místě' },
    { step: '3', title: 'Zpracování ~30 pracovních dní', desc: 'U starších domů bez podkladů i déle' },
    { step: '4', title: 'Předání kupujícímu', desc: 'Nejpozději při podpisu kupní smlouvy' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-6">Časová osa: od objednávky k předání</h3>

      {/* Desktop / tablet: horizontal stepper, circles and connecting line are siblings in one flex row so the line always meets the circle centers exactly */}
      <div className="hidden sm:block">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <Fragment key={s.step}>
              <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
                {s.step}
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-2" />}
            </Fragment>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-3">
          {steps.map((s) => (
            <div key={s.step}>
              <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stepper */}
      <div className="sm:hidden">
        {steps.map((s, i) => (
          <div key={s.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
                {s.step}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
            </div>
            <div className={i < steps.length - 1 ? 'pb-6' : ''}>
              <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PokutaGraphic = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-6">Co riskujete bez PENB</h3>
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      <div className="text-center p-6 bg-muted rounded-xl">
        <div className="text-4xl font-bold text-secondary mb-1">100 000 Kč</div>
        <p className="text-sm text-muted-foreground">max. pokuta pro fyzickou osobu</p>
      </div>
      <div className="text-center p-6 bg-secondary/10 border-2 border-secondary/30 rounded-xl">
        <div className="text-4xl font-bold text-secondary mb-1">200 000 Kč</div>
        <p className="text-sm text-muted-foreground">max. pokuta pro právnickou osobu (např. SVJ)</p>
      </div>
    </div>
    <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
      <span className="text-xl leading-none">⚠</span>
      <p className="text-sm text-foreground">
        <strong>+ až 5 let,</strong> po tuto dobu může kupující od kupní smlouvy odstoupit, pokud PENB nedostal nebo obsahoval nepravdivé údaje.
      </p>
    </div>
  </div>
);

const PribramTypologyGrid = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-1">Jaká třída Vás v Příbrami čeká podle typu zástavby</h3>
    <p className="text-sm text-muted-foreground mb-6">
      Orientační rozmezí podle typu a stáří budovy, konkrétní třídu vždy určí až měření specialisty
    </p>
    <div className="grid sm:grid-cols-2 gap-4">
      {pribramTypology.map((t) => (
        <div key={t.area} className="p-4 bg-muted rounded-xl">
          <h4 className="font-semibold text-foreground text-sm mb-1">{t.area}</h4>
          <p className="text-xs text-muted-foreground mb-3">{t.period}</p>
          <div className="flex items-center gap-3">
            <ClassRange range={t.before} />
            {t.before && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
            <ClassRange range={t.after} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">{t.note}</p>
        </div>
      ))}
    </div>
  </div>
);

const BlogPenb = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Energetický štítek (PENB) při prodeji: povinnost 2026',
      'Kdy PENB potřebujete při prodeji nemovitosti v Příbrami, kdo ho platí, kolik stojí a jak dlouho trvá zpracování. Pokuta až 200 000 Kč.',
      '/blog/penb-pri-prodeji-nemovitosti-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Energetický štítek (PENB) při prodeji nemovitosti: kdy ho potřebujete a co hrozí, když ho nemáte',
      description: 'Kdy PENB potřebujete při prodeji nemovitosti v Příbrami, kdo ho platí, kolik stojí a jak dlouho trvá zpracování. Pokuta až 200 000 Kč.',
      image: 'https://radek-vetrovsky.cz/assets/penb-energeticky-stitek-infografika.svg',
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
        '@id': 'https://radek-vetrovsky.cz/blog/penb-pri-prodeji-nemovitosti-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Energetický štítek (PENB) při prodeji nemovitosti' },
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

            <div className="mb-8 w-full h-64 md:h-96 rounded-2xl shadow-xl bg-white p-4 md:p-6">
              <img
                src={heroImage}
                alt="Infografika energetických tříd A až G v průkazu energetické náročnosti budovy (PENB)"
                className="w-full h-full object-contain"
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
                12 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Energetický štítek (PENB) při prodeji nemovitosti: kdy ho potřebujete a co hrozí, když ho nemáte
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Makléř nebo právník po Vás najednou chce „energetický štítek"? PENB je zákonná povinnost prodávajícího, ne doporučení, a ignorovat ji se nevyplácí, pokuta jde do statisíců.
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
                  PENB (průkaz energetické náročnosti budovy) musíte mít při prodeji naprosté většiny domů a bytů v Příbrami i okolí. Výjimku mají jen malé stavby do 50 m², rekreační objekty užívané část roku, památkově chráněné budovy a několik dalších specifických případů. Povinnost platí přímo pro prodávajícího, zpracovává ji energetický specialista zhruba za 30 pracovních dní a rodinný dům vyjde spíš na 6 000 až 12 000 Kč. Bez PENB hrozí fyzické osobě pokuta až 100 000 Kč, právnické osobě až 200 000 Kč, a kupující navíc může od smlouvy odstoupit až 5 let zpětně.
                </p>
              </div>

              {/* H2 Co je PENB */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co je PENB a proč je to zákonná povinnost</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PENB, průkaz energetické náročnosti budovy, řadí nemovitost do energetické třídy A až G podle roční spotřeby energie na vytápění, ohřev vody, chlazení, větrání a osvětlení. Lidově se mu říká energetický štítek, princip je stejný jako u lednice v obchodě, jen se netýká spotřebiče, ale celé budovy.
                  </p>
                  <p>
                    Povinnost mít PENB při prodeji nemovitosti platí od 1. července 2015 a vychází ze zákona č. 406/2000 Sb., o hospodaření energií. Poslední větší novela nabyla účinnosti 1. ledna 2024 a od roku 2026 na pravidla dál tlačí evropská směrnice EPBD IV, která postupně zpřísňuje požadavky na energetickou hospodárnost budov napříč EU.
                  </p>
                  <p>
                    Konkrétně od roku 2026 se v Česku objevuje nový dokument, <strong className="text-foreground">renovační pas</strong>, který majitelům ukáže, jak dům postupně zrenovovat k lepší třídě. Není to povinnost navíc k PENB, spíš doplňkový nástroj pro ty, kdo plánují zateplení nebo výměnu kotle a chtějí čerpat dotace z programu Nová zelená úsporám. Odpovědnost za zlepšování energetické účinnosti budov navíc směrnice svěřuje především státu, Česko má do roku 2030 zlepšit nejhorších 16 % budov ve fondu, ne jednotlivým majitelům hrozí vystěhování nebo nucená rekonstrukce. Pro Vás jako prodávajícího se v praxi nic zásadního nemění, PENB zůstává jedinou tvrdou povinností spojenou přímo s prodejem.
                  </p>
                  <p>
                    V praxi to pro Vás jako prodávajícího znamená dvě věci. Za prvé, energetickou třídu musíte uvést už v inzerátu nemovitosti, na to dohlížejí realitní portály i Česká obchodní inspekce. Za druhé, samotný průkaz nebo jeho ověřenou kopii musíte předat kupujícímu nejpozději při podpisu kupní smlouvy, ne až po něm.
                  </p>
                </div>
              </div>

              {/* H2 Jaká třída v Příbrami */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jaká energetická třída Vás v Příbrami čeká</h2>
                <div className="space-y-4 text-muted-foreground mb-2">
                  <p>
                    Klienti se mě často ptají dopředu, jestli mají „dobrou", nebo „špatnou" třídu, ještě než si PENB vůbec objednají. Odpověď se dá rámcově odhadnout podle typu a stáří zástavby, byť konečné slovo má vždy měření specialisty.
                  </p>
                </div>
                <PribramTypologyGrid />
                <p className="text-muted-foreground">
                  Nejlepší třídy v okolí Příbrami běžně vídám u novostaveb na Zdaboři nebo v Brodě a u kompletně zateplených rodinných domů v satelitních obcích. Nejhorší naopak u nezateplených cihlových domů v centru Příbrami I a u paneláků na sídlištích Příbram VII a VIII, které revitalizaci ještě neprošly, tam SVJ o zateplení teprve jedná nebo ho plánuje.
                </p>
              </div>

              {/* H2 Kdy PENB potřebujete */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdy PENB opravdu potřebujete a kdy ne</h2>
                <p className="text-muted-foreground mb-6">
                  Tady se prodávající nejčastěji pletou. Ne každá nemovitost povinnost má, ale výjimek je míň, než si lidé myslí.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">PENB potřebujete u:</h3>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  {[
                    'rodinných a bytových domů s energeticky vztažnou plochou nad 50 m², tedy u naprosté většiny domů a bytů v Příbrami, na sídlištích i v satelitních obcích,',
                    'bytových jednotek v osobním vlastnictví,',
                    'nebytových prostor a komerčních nemovitostí nad 50 m²,',
                    'nemovitostí prodávaných v rámci insolvenčního řízení.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-foreground mb-3">Výjimka se vztahuje na:</h3>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  {[
                    'stavby s energeticky vztažnou plochou do 50 m² (menší chatky, zahradní domky),',
                    'stavby pro rodinnou rekreaci užívané jen část roku, typicky chaty a chalupy v Brdech a v okolí Příbrami, které nejsou určené k celoročnímu bydlení,',
                    'budovy postavené nebo naposledy rekonstruované před 1. lednem 1947, pokud se prodávající s kupujícím písemně dohodnou, že PENB nechtějí,',
                    'kulturní památky a budovy v památkových rezervacích a zónách,',
                    'sakrální stavby,',
                    'průmyslové, výrobní a zemědělské provozy se spotřebou energie do 195 MWh ročně.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>

                <p className="text-muted-foreground mb-6">
                  Dědictví a darování povinnost nemají, protože nejde o úplatný převod. Jakmile ale zděděnou nebo darovanou nemovitost budete dál prodávat, PENB už řešit musíte, stejně jako u každého jiného prodeje. Pokud řešíte zděděnou nemovitost komplexně, včetně dědického řízení a daní, napsal jsem k tomu samostatný článek{' '}
                  <Link to="/blog/jak-prodat-zdedenu-nemovitost-pribram" className="text-secondary hover:underline font-medium">Jak prodat zděděnou nemovitost</Link>.
                </p>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-6">
                  <p className="text-foreground">
                    <strong>Speciální případ: byt v domě se SVJ.</strong> Pokud prodáváte byt a bytový dům jako celek už PENB má, nemusíte si nechávat zpracovat vlastní průkaz jen pro jednotku, použije se průkaz pro celou budovu. Pokud dům PENB nemá, máte právo písemně požádat SVJ o jeho vydání. Podle zákona Vám SVJ musí průkaz nebo jeho kopii poskytnout do 30 dnů, pokud už existuje, nebo zajistit jeho zpracování a předat ho do 60 dnů, pokud dosud nebyl vyhotoven. Když SVJ nereaguje ani v těchto lhůtách, můžete PENB nahradit vyúčtováním dodávek elektřiny, plynu nebo tepla za poslední 3 roky pro Váš byt. V praxi to prodávajícím bytů na příbramských sídlištích často ušetří peníze i čas, vyplatí se to prověřit dřív, než rovnou objednáte nový PENB.
                  </p>
                </div>
              </div>

              {/* H2 Pokuta */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Pokuta až 200 000 Kč: co hrozí, když PENB nemáte</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Tohle není teoretická hrozba, kontroly České obchodní inspekce a Státní energetické inspekce reálně probíhají, často na podnět nespokojeného kupujícího.
                  </p>
                  <p>
                    Pokud jako fyzická osoba prodáte nemovitost bez PENB nebo ho nepředáte kupujícímu ve stanovené lhůtě, hrozí Vám pokuta až <strong className="text-foreground">100 000 Kč</strong>. Právnické osobě, typicky SVJ nebo firmě, může být uložena pokuta až <strong className="text-foreground">200 000 Kč</strong>. Právě odsud pochází často citovaná hranice „pokuta až 200 000 Kč", týká se ale primárně právnických osob, u soukromého prodávajícího je horní hranice poloviční, což pořád je částka, kterou nikdo prodejem bytu nechce řešit navíc.
                  </p>
                </div>
                <PokutaGraphic />
                <p className="text-muted-foreground">
                  Kromě pokuty od úřadu máte ještě jedno riziko, a to je vážnější. Pokud kupujícímu PENB nepředáte nebo mu předáte nepravdivé údaje o energetické náročnosti, má právo od kupní smlouvy odstoupit, a to až 5 let po jejím podpisu. Představte si, že byt v Příbrami prodáte, peníze investujete jinam, a po třech letech kupující smlouvu zpochybní kvůli chybějícímu PENB. Tomuhle scénáři se vyplatí předejít za pár tisíc korun na začátku.
                </p>
              </div>

              {/* H2 Kdo platí a kolik stojí */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdo PENB platí a kolik stojí</h2>
                <p className="text-muted-foreground mb-4">
                  Povinnost i náklady leží na prodávajícím. Kupující se na ceně PENB nijak nepodílí, i když z výsledného dokumentu ve finále profituje, dozví se, kolik ho bude reálně stát vytápění a provoz nemovitosti.
                </p>
                <p className="text-muted-foreground mb-4">
                  Cena se odvíjí od typu a velikosti nemovitosti a od toho, jestli má energetický specialista k dispozici projektovou dokumentaci, nebo musí nemovitost sám zaměřit.
                </p>
                <CostChart />
                <p className="text-muted-foreground mb-4">
                  V Příbrami se ceny pohybují ve stejném rozmezí jako celorepublikový průměr. Pokud prodáváte typový cihlový byt 3+1 v Příbrami VII nebo VIII, kde PENB pro dům obvykle existuje, řešíte jen administrativu. U rodinného domu na okraji města nebo v okolních obcích jako Trhové Dušníky, Obecnice nebo Bratkovice, kde dokumentace často chybí nebo je neúplná, počítejte s vyšší částkou i s tím, že specialista musí přijet dům fyzicky zaměřit.
                </p>
                <p className="text-muted-foreground">
                  Zpracovat PENB smí jen energetický specialista s oprávněním od Ministerstva průmyslu a obchodu, seznam akreditovaných specialistů pro Středočeský kraj i celou ČR najdete na stránkách MPO. Neriskujte štítek od někoho, kdo se tím jen „přiživuje", neplatný nebo špatně zpracovaný PENB Vás nechrání před pokutou ani před odstoupením kupujícího od smlouvy.
                </p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak na to v Příbrami</h2>
                <ProcessTimeline />
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Zjistěte, jestli se na Vaši nemovitost vztahuje výjimka.</strong> U chaty v Brdech nebo malého objektu do 50 m² PENB řešit nemusíte. U běžného domu nebo bytu k celoročnímu bydlení výjimka prakticky nikdy neplatí.</li>
                  <li><strong className="text-foreground">U bytu ověřte, jestli dům už PENB nemá.</strong> Zeptejte se SVJ nebo správce domu. Pokud PENB existuje, ušetříte si zpracování nového a řešíte jen vydání kopie.</li>
                  <li><strong className="text-foreground">Objednejte energetického specialistu s akreditací MPO.</strong> Připravte, co máte, projektovou dokumentaci, stavební povolení, kolaudační rozhodnutí. Čím víc podkladů dodáte, tím rychleji a levněji se PENB zpracuje.</li>
                  <li><strong className="text-foreground">Počítejte s 30 pracovními dny.</strong> Objednejte PENB hned na začátku prodeje, ne až těsně před podpisem smlouvy.</li>
                  <li><strong className="text-foreground">Uveďte energetickou třídu v inzerátu.</strong> Je to zákonná povinnost, ne kosmetický detail, a realitní portály na to při vkládání inzerátu upozorňují.</li>
                  <li><strong className="text-foreground">Předejte PENB kupujícímu nejpozději při podpisu kupní smlouvy.</strong> Uschovejte si doklad o předání, ať máte v ruce důkaz, že jste povinnost splnili.</li>
                </ol>

                <div className="bg-muted border border-border p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Příklad z praxe: byt 3+1 na sídlišti Příbram VII</h3>
                  <p className="text-muted-foreground mb-3">
                    Paní Nováková prodává byt 3+1 v panelovém domě na sídlišti Příbram VII, který SVJ revitalizovalo v roce 2016, zateplení pláště, nová okna. Dům jako celek má PENB už z doby revitalizace, třída C.
                  </p>
                  <p className="text-foreground"><strong>Výsledek:</strong> Paní Nováková nový průkaz neobjednává. Se SVJ vyřídí jen vydání kopie během pár dní, prakticky zdarma, a předá ji kupujícímu spolu s kupní smlouvou. Celý krok, kterého se prodávající nejvíc obávají, tu zabere jedno vyřízení e-mailu se správcem domu.</p>
                </div>

                <p className="text-muted-foreground">
                  Pokud si nejste jistí, jestli konkrétní výjimka na Vaši nemovitost dopadá, nebo jestli byt v domě, který prodáváte, PENB skutečně má, raději se zeptejte, než abyste to nechali na náhodu. Řeším to s klienty v Příbrami běžně už při první prohlídce nemovitosti, kterou plánujeme prodávat, je to jedna z prvních věcí, co spolu projdeme ještě před tím, než nastavíme cenu. O tom, jak se správně stanovuje nabídková cena, píšu podrobně v článku{' '}
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">Jak správně ocenit nemovitost před prodejem</Link>.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'PENB je zákonná povinnost prodávajícího od roku 2015, vychází ze zákona č. 406/2000 Sb.',
                    'Výjimku mají jen malé stavby do 50 m², rekreační objekty užívané část roku, památkově chráněné budovy a několik dalších specifických případů.',
                    'Pokuta za nesplnění je až 100 000 Kč pro fyzickou osobu a až 200 000 Kč pro právnickou osobu (např. SVJ).',
                    'Kupující může od smlouvy odstoupit až 5 let zpětně, pokud PENB nedostal nebo obsahoval nepravdivé údaje.',
                    'PENB platí a hradí prodávající, kupující se na nákladech nepodílí.',
                    'Rodinný dům vyjde spíš na 6 000 až 12 000 Kč, byt v domě s existujícím PENB vlastně nic nestojí, už to má.',
                    'Zpracování trvá zhruba 30 pracovních dní, objednejte ho hned na začátku prodeje.',
                    'Byt v domě se SVJ: nejdřív ověřte, jestli PENB pro budovu už existuje, může Vám to ušetřit peníze i čas.',
                    'Paneláky na sídlištích Příbram VII a VIII po revitalizaci bývají A až B až C, nezateplené cihlové domy v centru F až G.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem prodeje včetně poradenství v otázkách spojených s převodem nemovitosti, PENB nevyjímaje.
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
                  <p>PENB není papír, který si můžete odbýt na poslední chvíli. Je to zákonná povinnost s reálnou pokutou a s rizikem, že Vám kupující zpochybní smlouvu roky po prodeji. Dobrá zpráva je, že vyřešit ho není složité ani drahé, stačí ho objednat včas a u akreditovaného specialisty.</p>
                  <p>Pokud prodáváte dům nebo byt v Příbrami a nejste si jistí, jestli PENB potřebujete, jestli ho Váš dům už nemá, nebo kolik reálně zaplatíte, ozvěte se mi. Zajišťuji kompletní{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">prodej nemovitostí v Příbrami</Link>
                    {' '}a při přípravě prodeje projdeme i tohle, ať se u podpisu smlouvy nezaseknete na věci, která se dá vyřešit dopředu za pár tisíc korun.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Chystáte se prodat dům nebo byt v Příbrami?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Objednejte si odhad nemovitosti zdarma a v rámci konzultace probereme i PENB, ať víte, na čem jste ještě než nasadíte cenu.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/odhad-nemovitosti"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Objednat odhad zdarma
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
                Článek vychází z platné legislativy k červenci 2026 a má informativní charakter. Zákonná úprava PENB se v souvislosti s evropskou směrnicí EPBD IV dál vyvíjí, individuální situaci si vždy ověřte u energetického specialisty nebo přímo na Ministerstvu průmyslu a obchodu. Orientační rozmezí energetických tříd podle typu zástavby vychází z obecné praxe, ne z certifikovaného měření, konkrétní třídu Vaší nemovitosti určí vždy až PENB. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Rezervační smlouva a úschova kupní ceny: jak nepřijít o peníze ani o kupce', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
                    { title: 'Prodat nemovitost v Příbrami bez realitky nebo s makléřem?', slug: 'prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem' },
                    { title: 'Daň z prodeje nemovitosti 2026: Kolik zaplatím v Příbrami?', slug: 'dan-z-prodeje-bytu-pribram-2026' },
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

export default BlogPenb;
