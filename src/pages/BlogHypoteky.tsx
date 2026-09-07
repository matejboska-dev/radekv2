import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Percent, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1768839720586-71b7ff8b5c59?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-07-21';
const PUBLISHED_DISPLAY = '21. července 2026';

const faqItems = [
  {
    q: 'Jak vysoko jsou aktuálně sazby hypoték (červenec 2026)?',
    a: 'Průměrná sjednaná sazba nových hypoték (ČBA Hypomonitor) dosáhla v červnu 2026 hodnoty 4,79 %. Průměrná nabízená sazba napříč bankami (Swiss Life Hypoindex) je vyšší, v červenci 2026 činila 5,32 %. Rozdíl je v metodice, sjednaná sazba zahrnuje individuální slevy, nabízená je čistě ceníková.',
  },
  {
    q: 'Proč sazby hypoték v roce 2026 znovu rostou, když se čekal pokles?',
    a: 'Banky se řídí hlavně dlouhodobými tržními sazbami, konkrétně úrokovými swapy, které odrážejí očekávání ohledně budoucí inflace a měnové politiky. K tomu se přidává geopolitické napětí. Rozhodnutí ČNB o zvýšení repo sazby na 3,75 % v červnu 2026 je jen jedním z faktorů, ne hlavní příčinou.',
  },
  {
    q: 'O kolik víc zaplatím měsíčně na hypotéce oproti loňskému roku?',
    a: 'Na příkladu hypotéky 3 600 000 Kč na 30 let vychází splátka při letošní sjednané sazbě (4,79 %) o zhruba 500 Kč měsíčně víc než loni. Při srovnání s aktuální nabízenou sazbou (5,32 %) je rozdíl asi 1 700 Kč měsíčně, tedy zhruba 20 000 Kč ročně. Jde o ilustrační výpočet, konkrétní částka závisí na výši úvěru a bonitě žadatele.',
  },
  {
    q: 'Jak rostoucí sazby hypoték ovlivňují prodej nemovitosti v Příbrami?',
    a: 'Kupující si při stejné měsíční splátce dnes mohou dovolit nižší kupní cenu než před rokem, takže je důležitější nastavit nabídkovou cenu realisticky. Poptávka po bydlení zůstává celkově silná, ale prodej u přestřelených cen může trvat déle.',
  },
  {
    q: 'Změnila ČNB v roce 2026 pravidla pro hypotéky?',
    a: 'Ano, ale jen pro investiční hypotéky. Od 1. dubna 2026 ČNB doporučila bankám maximální LTV 70 % a doporučený strop DTI 7 u nemovitostí, které kupující nebude sám obývat. U hypoték na vlastní bydlení zůstává LTV na 80 % (90 % pro žadatele do 36 let) beze změny.',
  },
];

const rateTrend = [
  { month: 'Led', value: 5.03, direction: 'start' as const },
  { month: 'Úno', value: 4.46, direction: 'down' as const },
  { month: 'Bře', value: 4.43, direction: 'down' as const },
  { month: 'Dub', value: 4.52, direction: 'up' as const },
  { month: 'Kvě', value: 4.67, direction: 'up' as const },
  { month: 'Čer', value: 4.79, direction: 'up' as const },
];

const RateTrendChart = () => {
  const min = 4.0;
  const max = 5.2;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Vývoj sjednané sazby hypoték v roce 2026</h3>
      <p className="text-sm text-muted-foreground mb-6">Zdroj: ČBA Hypomonitor, průměrná sjednaná sazba p. a.</p>
      <div className="flex items-end justify-between gap-2 md:gap-3 h-40 mb-3">
        {rateTrend.map((m) => {
          const heightPct = ((m.value - min) / (max - min)) * 100;
          const color = m.direction === 'down' ? 'bg-primary' : m.direction === 'up' ? 'bg-secondary' : 'bg-muted-foreground/40';
          return (
            <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-xs font-bold text-foreground mb-1">{m.value.toFixed(2).replace('.', ',')} %</span>
              <div className={`w-full rounded-t-md ${color}`} style={{ height: `${heightPct}%` }} />
              <span className="text-xs text-muted-foreground mt-2">{m.month}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" /> sazba klesala</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-secondary inline-block" /> sazba rostla</span>
        <span>Obrat trendu přišel v dubnu 2026.</span>
      </div>
    </div>
  );
};

const paymentScenarios = [
  { label: 'Červen 2025 (sjednaná sazba 4,56 %)', value: 18400, display: '18 400 Kč / měsíc' },
  { label: 'Červen 2026 (sjednaná sazba 4,79 %)', value: 18900, display: '18 900 Kč / měsíc' },
  { label: 'Červenec 2026 (nabízená sazba 5,32 %)', value: 20000, display: '20 000 Kč / měsíc' },
];

const PaymentComparisonChart = () => {
  const max = Math.max(...paymentScenarios.map((s) => s.value));
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Ilustrační splátka: byt 3+1, 65 m², Příbram VII</h3>
      <p className="text-sm text-muted-foreground mb-6">Cena 4 500 000 Kč, úvěr 3 600 000 Kč (LTV 80 %), splatnost 30 let</p>
      <div className="space-y-5">
        {paymentScenarios.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{s.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{s.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${i === 2 ? 'bg-secondary' : 'bg-primary'}`}
                style={{ width: `${(s.value / max) * 100}%`, opacity: 0.55 + i * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Vlastní ilustrační výpočet podle standardního anuitního vzorce, ne oficiální statistika. Konkrétní splátka závisí na výši úvěru a bonitě žadatele.
      </p>
    </div>
  );
};

const RateSourceComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Percent className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">ČBA Hypomonitor</h3>
      </div>
      <p className="text-2xl font-black text-foreground mb-1">4,79 %</p>
      <p className="text-xs text-muted-foreground mb-3">sjednaná sazba, červen 2026</p>
      <p className="text-sm text-muted-foreground">Průměr reálně podepsaných hypoték včetně individuálních slev a vyjednaných podmínek. Bývá nižší než ceníková nabídka.</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <TrendingUp className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Swiss Life Hypoindex</h3>
      </div>
      <p className="text-2xl font-black text-foreground mb-1">5,32 %</p>
      <p className="text-xs text-muted-foreground mb-3">nabízená sazba, červenec 2026</p>
      <p className="text-sm text-muted-foreground">Průměr oficiálních ceníkových sazeb napříč bankami bez individuálního vyjednávání. Čtvrtý měsíc růstu v řadě.</p>
    </div>
  </div>
);

const JuneTimeline = () => {
  const steps = [
    { step: '1', title: '18. června', desc: 'ČNB zvedla repo sazbu na 3,75 %' },
    { step: '2', title: 'Červen', desc: 'Šest bank zvýšilo sazby hypoték' },
    { step: '3', title: 'Červen', desc: 'Pod 5 % zůstaly jen 2 banky' },
    { step: '4', title: 'Červenec', desc: 'Hypoindex vystoupal na 5,32 %' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-6">Časová osa: jeden z nejdramatičtějších měsíců na trhu</h3>

      {/* Desktop / tablet: horizontal stepper */}
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

const BlogHypoteky = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'ČBA Hypomonitor 2026: sazba hypoték a dopad na Příbram',
      'ČBA Hypomonitor: sazba hypoték v červnu 2026 vzrostla na 4,79 %, nabízené sazby přes 5 %. Jak to ovlivní prodej nemovitostí v Příbrami.',
      '/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'ČBA Hypomonitor: sazba hypoték v červnu 2026 vzrostla, co to znamená pro prodej v Příbrami',
      description: 'ČBA Hypomonitor: sazba hypoték v červnu 2026 vzrostla na 4,79 %, nabízené sazby přes 5 %. Jak to ovlivní prodej nemovitostí v Příbrami.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram',
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
        { '@type': 'ListItem', position: 3, name: 'Hypotéky červen 2026 a dopad na prodej v Příbrami' },
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
                alt="Kalkulačka, model domu a hypotéka, ilustrační foto k tématu úrokových sazeb"
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
              ČBA Hypomonitor: sazba hypoték v červnu 2026 vzrostla, co to znamená pro prodej v Příbrami
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Ještě na začátku roku 2026 se čekalo, že hypotéky budou dál zlevňovat. Místo toho přišel červen, kdy během jediného měsíce zvedlo sazby šest bank a nabídky pod 5 % se staly vzácností. Pokud v Příbrami prodáváte dům nebo byt, tahle změna se přímo dotýká toho, kolik si Vaši kupující reálně můžou dovolit zaplatit, a jak dlouho bude prodej trvat.
            </p>
            <p className="text-sm text-muted-foreground bg-secondary/10 border-l-4 border-secondary p-4 rounded-lg mb-8">
              Tento článek rozebírá dopad červnového zdražení na prodej. Aktuální čísla za poslední měsíc najdete v{' '}
              <Link to="/blog/hypotecni-sazby-pribram-mesicni-prehled" className="text-secondary hover:underline font-medium">průběžně aktualizovaném přehledu hypotečních sazeb</Link>.
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
                  Průměrná sazba nově sjednaných hypoték (ČBA Hypomonitor) vzrostla v červnu 2026 na 4,79 %, o 0,23 procentního bodu víc než ve stejném měsíci o rok dřív. Nabízená sazba napříč bankami (Swiss Life Hypoindex) je ještě vyšší, v červenci 2026 dosáhla 5,32 %, čtvrtý měsíc růstu v řadě. ČNB zároveň 18. června zvedla repo sazbu na 3,75 %. Pro kupující to v praxi znamená nižší dosažitelnou částku úvěru při stejné splátce, což se promítá do toho, kolik jsou ochotní za nemovitost v Příbrami zaplatit a jak rychle se rozhodují. Realistické nastavení ceny hraje teď víc roli než dřív.
                </p>
              </div>

              {/* H2 Co se stalo v cervnu */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co se s hypotékami stalo v červnu 2026</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Podle Hypoindex.cz šlo o jeden z nejdramatičtějších měsíců na hypotečním trhu za poslední roky. Šest bank v červnu zvedlo úrokové sazby, Partners banka vystoupala u tříletých a pětiletých fixací až na 5,69 %, nejvíc na trhu. Pod psychologickou hranicí 5 % zůstaly už jen Moneta Money Bank a Fio banka, a i Fio jen s kosmetickou úpravou sazby na 4,58 % u roční fixace.
                  </p>
                  <p>
                    Souběžně s tím zasedala 18. června bankovní rada ČNB a zvýšila dvoutýdenní repo sazbu o čtvrt procentního bodu na 3,75 %. Rozhodnutí ČNB ale není jediným, ani hlavním impulzem pro zdražování hypoték. Banky se řídí především dlouhodobými tržními sazbami, hlavně úrokovými swapy (IRS), které odrážejí očekávání trhu ohledně budoucí inflace, ekonomického růstu a měnové politiky. K tomu se přidává napětí na geopolitické scéně, které dál zvyšuje nejistotu a tlačí sazby nahoru.
                  </p>
                  <p>
                    Ještě v únoru 2026 se přitom na trhu krátce objevila sazba pod 4 % od Moneta Money Bank, a komentátoři čekali, že by při dalším uvolňování měnové politiky mohly klesnout i další banky. Místo toho přišel obrat, a od března do června 2026 vzrostla nabízená sazba o 0,41 procentního bodu. Iluze levných hypoték skončila rychleji, než se čekalo.
                  </p>
                </div>

                <JuneTimeline />
              </div>

              {/* H2 Jak vysoko jsou sazby */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak vysoko jsou sazby teď a proč se čísla liší</h2>
                <p className="text-muted-foreground mb-2">
                  Když budete sledovat zprávy o hypotékách, narazíte na dvě různá čísla. Je užitečné vědět, v čem se liší.
                </p>
                <RateSourceComparison />
                <p className="text-muted-foreground">
                  Rozdíl mezi oběma čísly ukazuje jednu praktickou věc: reálně sjednaná sazba bývá nižší než ta, kterou banka nabízí na webu, protože záleží na bonitě klienta, výši úvěru a vyjednávací pozici. I tak ale směr je jasný, obě čísla od jara 2026 rostou.
                </p>
                <RateTrendChart />
              </div>

              {/* H2 Kolik to stoji navic */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik Vás to reálně stojí navíc</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Abyste měli konkrétní představu, spočítal jsem ilustrační příklad na typickém bytě 3+1 o velikosti 65 m² na sídlišti v Příbrami VII, v ceně 4 500 000 Kč, tedy v rozmezí, které popisuju v článku o{' '}
                    <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapě Příbrami</Link>. Počítám s hypotékou na 80 % hodnoty (úvěr 3 600 000 Kč) a splatností 30 let.
                  </p>
                </div>
                <PaymentComparisonChart />
                <p className="text-muted-foreground">
                  Je to jen orientační výpočet u konkrétního příkladu, ne oficiální statistika, ale dobře ukazuje, proč se kupujícím při stejném rozpočtu na splátku teď vejde nižší kupní cena než ještě před rokem.
                </p>
              </div>

              {/* H2 Dopad na prodej */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co to znamená pro prodej nemovitosti v Příbrami</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Pro Vás jako prodávajícího z toho plyne hlavně jedno: okruh kupujících, kteří si Vaši nemovitost mohou dovolit při stejné ceně, je teď o něco užší než na začátku roku. Nejde o propad trhu, poptávka po bydlení zůstává silná (v roce 2025 banky poskytly hypotéky za rekordních 321 miliard Kč, meziročně o 41 % víc, a pro rok 2026 se čeká další růst objemu zhruba o 13 %), ale kupující s hypotékou dnes počítají opatrněji a víc se dívají na to, jestli cena odpovídá skutečné hodnotě nemovitosti.
                  </p>
                </div>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-2">
                  <li><strong className="text-foreground">Přesné nastavení ceny je důležitější než dřív.</strong> Přestřelená nabídková cena dnes odradí víc zájemců než v době levných hypoték, protože jim nezbývá tolik prostoru v rozpočtu na vyjednávání. Jak cenu správně nastavit, popisuju v článku{' '}
                    <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">Jak správně ocenit nemovitost před prodejem</Link>.
                  </li>
                  <li><strong className="text-foreground">Kupující řeší financování dřív a pečlivěji.</strong> Vyplatí se ověřit, že má zájemce hypotéku předschválenou nebo aspoň seriózně rozjednanou, než s ním podepíšete rezervační smlouvu. Víc o tom v článku o{' '}
                    <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">rezervační smlouvě a úschově</Link>.
                  </li>
                  <li><strong className="text-foreground">Prodej může trvat o něco déle.</strong> Počítejte spíš s delší dobou prodeje, než byla obvyklá loni, hlavně u nemovitostí, kde je nabídková cena na horní hranici lokálního rozmezí.</li>
                </ol>
              </div>

              {/* H2 CNB pravidla */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nová pravidla ČNB pro investiční hypotéky od dubna 2026</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Pokud v Příbrami prodáváte nemovitost investorovi, nebo naopak sami investiční nemovitost kupujete, týká se Vás ještě jedna změna. Od 1. dubna 2026 ČNB doporučila bankám obezřetnější limity konkrétně pro hypotéky na investiční nemovitosti, tedy takové, které kupující nebude sám obývat: maximální LTV (poměr úvěru k hodnotě nemovitosti) 70 % a doporučený strop DTI (poměr celkového zadlužení k čistému ročnímu příjmu) na hodnotě 7.
                  </p>
                  <p>
                    U hypoték na vlastní bydlení se nic nemění, LTV zůstává na 80 % (90 % pro žadatele do 36 let) a ukazatele DSTI a DTI jsou pro běžný trh dál plošně deaktivované. Banky by ale měly zvýšenou opatrnost uplatňovat u žádostí, kde by DTI přesáhlo hodnotu 8 nebo DSTI hodnotu 40 % příjmu. Pro drtivou většinu prodávajících v Příbrami, kteří řeší prodej bytu nebo domu k bydlení, se tedy pravidla nemění, týká se to hlavně kupujících, kteří nemovitost berou čistě jako investici.
                  </p>
                </div>
              </div>

              {/* H2 Co cekat */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co čekat do konce roku 2026</h2>
                <p className="text-muted-foreground">
                  Podle Hypoindex.cz bude další vývoj záviset hlavně na dlouhodobých tržních sazbách, inflačních rizicích a konkurenci mezi bankami, ne jen na rozhodnutích ČNB. Analytici spíš čekají stagnaci sazeb s možností mírného poklesu, pokud se uklidní geopolitická situace a potvrdí se, že je inflace pod kontrolou. Banky zatím nebudou se snižováním cen spěchat. Jinými slovy, na návrat k výrazně levnějším hypotékám z předchozích let bych letos nesázel, spíš na postupné ustálení na současné úrovni.
                </p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak prodávat v době dražších hypoték</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Ověřte si aktuální cenové rozmezí pro Vaši lokalitu.</strong> V Příbrami se ceny bytů v roce 2026 pohybují v rozmezí 60 000 až 100 000 Kč/m² podle lokality a stavu.</li>
                  <li><strong className="text-foreground">Nastavte nabídkovou cenu realisticky už od začátku.</strong> V době dražšího financování se přestřelená cena hůř koriguje, zájemci s omezeným rozpočtem na ni ani nezareagují.</li>
                  <li><strong className="text-foreground">Ptejte se zájemců na stav financování už při první prohlídce.</strong> Ušetří to čas oběma stranám a předejde to situaci, kdy rezervujete nemovitost kupujícímu, který nakonec hypotéku nezíská.</li>
                  <li><strong className="text-foreground">Počítejte s o něco delší dobou prodeje.</strong> Naplánujte si podle toho další kroky, hlavně pokud výtěžek z prodeje potřebujete na koupi navazujícího bydlení.</li>
                  <li><strong className="text-foreground">Sledujte vývoj sazeb průběžně.</strong> Pokud sazby klesnou, může se okruh zájemců rozšířit, a naopak.</li>
                </ol>

                <p className="text-muted-foreground">
                  Tohle všechno řeším s klienty v Příbrami běžně už při nastavování nabídkové ceny, ne až když se ozve první zájemce s otázkou o hypotéce.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Průměrná sjednaná sazba hypoték (ČBA Hypomonitor) vzrostla v červnu 2026 na 4,79 %, o 0,23 p. b. víc než rok předtím.',
                    'Nabízená sazba napříč bankami (Swiss Life Hypoindex) dosáhla v červenci 2026 hodnoty 5,32 %, čtvrtý měsíc růstu v řadě.',
                    'V červnu 2026 zvedlo sazby šest bank, pod hranicí 5 % zůstaly jen Moneta Money Bank a Fio banka.',
                    'ČNB zvýšila 18. června 2026 repo sazbu na 3,75 %, hlavním tahounem zdražování jsou ale spíš úrokové swapy a inflační očekávání.',
                    'U hypotéky 3 600 000 Kč na byt 3+1 v Příbrami vychází splátka při letošní sazbě o zhruba 500 až 1 700 Kč měsíčně víc než loni.',
                    'Od 1. dubna 2026 platí pro investiční hypotéky přísnější limity, LTV 70 % a doporučený DTI 7, hypotéky na vlastní bydlení se nemění.',
                    'Do konce roku 2026 se čeká spíš stagnace sazeb než výrazný pokles.',
                    'V době dražších hypoték je přesné nastavení nabídkové ceny důležitější, prodej může trvat o něco déle.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem prodeje včetně nastavení realistické ceny s ohledem na aktuální podmínky financování kupujících.
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
                  <p>Hypotéky v roce 2026 zdražily rychleji, než se ještě na jaře čekalo, a to se přímo dotýká toho, kolik jsou kupující v Příbrami ochotní a schopní za nemovitost zaplatit. Není to důvod k panice, poptávka po bydlení zůstává silná, ale je to důvod nastavit nabídkovou cenu realisticky a počítat s tím, že prodej může trvat o něco déle než loni.</p>
                  <p>Pokud v Příbrami prodáváte a chcete vědět, jak aktuální sazby ovlivní zájem o Vaši konkrétní nemovitost, ozvěte se mi. Zajišťuji kompletní{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">prodej nemovitostí v Příbrami</Link>
                    {' '}od nastavení ceny až po předání klíčů, včetně toho, na co se ptát kupujících ohledně financování.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Chystáte se prodat v Příbrami a chcete vědět, jak dražší hypotéky ovlivní zájem kupujících?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Objednejte si odhad nemovitosti zdarma, probereme spolu i nastavení ceny s ohledem na aktuální podmínky financování.
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
                Článek vychází z veřejně dostupných dat ČBA Hypomonitor, Swiss Life Hypoindex a ČNB k červenci 2026 a má informativní charakter. Konkrétní podmínky hypotéky se vždy odvíjí od bonity žadatele a nabídky konkrétní banky, doporučujeme ověřit u hypotečního specialisty. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Hypoteční sazby a Příbram: aktuální přehled', slug: 'hypotecni-sazby-pribram-mesicni-prehled' },
                    { title: 'Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami', slug: 'kolik-si-muzu-dovolit-hypoteka-pribram' },
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

export default BlogHypoteky;
