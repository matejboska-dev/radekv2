import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Home, Building2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-09-03';
const PUBLISHED_DISPLAY = '3. září 2026';

const faqItems = [
  {
    q: 'Co si ověřit před koupí bytu nebo domu jako první?',
    a: 'Aktuální List vlastnictví z katastru nemovitostí. Zajímá Vás část C (omezení vlastnického práva) a část D (poznámky). Hledáte zástavní právo, exekuci, plombu, věcné břemeno, předkupní právo, nájem nebo pacht a poznámku o probíhajícím sporu. Od konce prosince 2025 je pro zobrazení jména vlastníka nutné přihlášení přes BankID nebo mojeID.',
  },
  {
    q: 'Kdo odpovídá za vady nemovitosti zjištěné po koupi?',
    a: 'Za skryté vady, které na nemovitosti existovaly už při předání, odpovídá prodávající, i když se projeví později. Problém je dokazování, které bývá zdlouhavé a nákladné. Proto se vyplatí technická prohlídka před koupí a přesné zachycení stavu v předávacím protokolu s fotodokumentací.',
  },
  {
    q: 'Vyplatí se technická inspekce nemovitosti před koupí?',
    a: 'U staršího domu téměř vždy. Nezávislý stavební technik nebo inspektor odhalí vady střechy, statiky, vlhkosti a elektroinstalace, které laik na prohlídce nepozná. Inspekce bytu obvykle stojí 5 000 až 8 000 Kč, u velkého rodinného domu více a trvá až kolem 4 hodin. Náklad se vrátí buď v podobě slevy z ceny, nebo tím, že od rizikové koupě odstoupíte.',
  },
  {
    q: 'Na co si dát pozor v rezervační smlouvě?',
    a: 'Kdo je druhou smluvní stranou (realitní kancelář, nebo přímo prodávající), jak vysoký je rezervační poplatek (obvykle 3 až 5 % ceny), za jakých podmínek se vrací a kdy propadá. Klíčové je ošetřit situaci, kdy nezískáte hypotéku. Rezervační smlouvu i kupní smlouvu si nechte projít dřív, než je podepíšete.',
  },
  {
    q: 'Na co si dát pozor při koupi domu v Příbrami a okolí konkrétně?',
    a: 'Kromě běžných kontrol prověřte v územním plánu a u obce možné poddolování a starou důlní činnost v některých lokalitách, radonové riziko v podloží, u okrajových částí a chalup v Brdech napojení na inženýrské sítě versus studna a jímka a soulad skutečného stavu domu s katastrem a stavební dokumentací, tedy případné přístavby nebo zimní zahrady bez povolení.',
  },
];

const processSteps = [
  { step: '1', title: 'Inzerát', desc: 'Cena vůči lokalitě, energetická třída, dispozice' },
  { step: '2', title: 'Prohlídka', desc: 'Technický stav, ideálně s odborníkem' },
  { step: '3', title: 'List vlastnictví', desc: 'Zástavy, věcná břemena, exekuce, plomba' },
  { step: '4', title: 'Smlouvy', desc: 'Rezervační, o smlouvě budoucí, kupní' },
  { step: '5', title: 'Úschova', desc: 'Advokátní, notářská nebo bankovní' },
  { step: '6', title: 'Předání', desc: 'Protokol se stavy měřidel a fotodokumentací' },
];

const ProcessStepper = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-6">Kontrola podle fází koupě</h3>

    {/* Desktop */}
    <div className="hidden sm:block">
      <div className="flex items-center">
        {processSteps.map((s, i) => (
          <Fragment key={s.step}>
            <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
              {s.step}
            </div>
            {i < processSteps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-2" />}
          </Fragment>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-3 mt-3">
        {processSteps.map((s) => (
          <div key={s.step}>
            <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Mobile */}
    <div className="sm:hidden">
      {processSteps.map((s, i) => (
        <div key={s.step} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
              {s.step}
            </div>
            {i < processSteps.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
          </div>
          <div className={i < processSteps.length - 1 ? 'pb-6' : ''}>
            <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const legalDefects = [
  { defect: 'Zástavní právo', what: 'Nemovitost ručí za dluh, obvykle za hypotéku prodávajícího', deal: 'Běžně se vypořádá z kupní ceny přes úschovu, musí ošetřit kupní smlouva' },
  { defect: 'Exekuce', what: 'Na majetek prodávajícího je vedena exekuce', deal: 'Velká opatrnost, koupě jen s advokátem a jasným postupem výmazu' },
  { defect: 'Věcné břemeno (služebnost)', what: 'Právo někoho jiného, třeba právo dožití nebo právo cesty', deal: 'Přechází na nového vlastníka, snižuje hodnotu, řešit slevou nebo výmazem' },
  { defect: 'Předkupní právo', what: 'Někdo má přednostní právo nemovitost koupit', deal: 'Prodej Vám může padnout, ověřit, jestli bylo právo nabídnuto oprávněnému' },
  { defect: 'Nájem nebo pacht', what: 'Nemovitost užívá nájemce na základě smlouvy', deal: 'Nájem přechází na kupujícího, vyžádat si nájemní smlouvu a stav plateb' },
  { defect: 'Nesoulad výměr', what: 'Skutečná plocha neodpovídá zápisu v katastru', deal: 'Vyjasnit geometrickým plánem před podpisem, může měnit cenu i daň' },
];

const LegalDefectsTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-1">Nejčastější právní vady nemovitosti</h3>
    <p className="text-sm text-muted-foreground mb-6">Co čtete z Listu vlastnictví a co s tím</p>
    <table className="w-full text-sm min-w-[640px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Vada</th>
          <th className="py-2 pr-4 font-semibold">Co to je</th>
          <th className="py-2 font-semibold">Co s tím</th>
        </tr>
      </thead>
      <tbody>
        {legalDefects.map((d) => (
          <tr key={d.defect} className="border-b border-border last:border-0 align-top">
            <td className="py-3 pr-4 text-foreground font-medium">{d.defect}</td>
            <td className="py-3 pr-4 text-muted-foreground">{d.what}</td>
            <td className="py-3 text-muted-foreground">{d.deal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BytVsDum = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">U bytu prověřte</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>SVJ nebo bytové družstvo, zápisy ze shromáždění</li>
        <li>Stav fondu oprav a plánované velké opravy domu</li>
        <li>Výši příspěvků, dlužníky v domě</li>
        <li>Stoupačky, výtah, střecha, zateplení</li>
        <li>Vlhkost a plíseň v koupelně a rozích</li>
      </ul>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <Home className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">U rodinného domu prověřte</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Střechu, krov, trhliny ve zdivu a jejich směr</li>
        <li>Vlhkost zdiva, stáří elektroinstalace a rozvodů</li>
        <li>Sítě: kanalizace versus jímka, studna a povolení k odběru</li>
        <li>Přístupovou cestu a přípojky přes cizí pozemek</li>
        <li>Soulad stavby s katastrem a kolaudací, černé stavby</li>
      </ul>
    </div>
  </div>
);

const InspectionCosts = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 not-prose">
    {[
      { value: 'zdarma', label: 'Aktuální List vlastnictví přes dálkový přístup ČÚZK (základní výpis)' },
      { value: '5 až 8 tis.', label: 'Technická inspekce bytu 3+kk certifikovaným inspektorem' },
      { value: 'od 2,5 tis.', label: 'Termovizní diagnostika úniků tepla a vlhkosti' },
      { value: 'od 3 tis.', label: 'Advokátní úschova kupní ceny' },
    ].map((s) => (
      <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="text-xl font-black text-foreground mb-2">{s.value}</div>
        <p className="text-xs text-muted-foreground">{s.label}</p>
      </div>
    ))}
  </div>
);

const BlogNaCoPozorKoupe = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Na co si dát pozor při koupi nemovitosti v Příbrami',
      'Kontrolní seznam před koupí bytu nebo domu v Příbrami: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova.',
      '/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Na co si dát pozor při koupi bytu nebo domu v Příbrami: kompletní kontrolní seznam',
      description: 'Kontrolní seznam před koupí bytu nebo domu v Příbrami: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram',
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
        { '@type': 'ListItem', position: 3, name: 'Na co si dát pozor při koupi nemovitosti v Příbrami' },
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
                alt="Prohlídka nemovitosti s odborníkem, ilustrační foto ke kontrole před koupí"
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
                11 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Na co si dát pozor při koupi bytu nebo domu v Příbrami: kompletní kontrolní seznam
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Koupě nemovitosti je pro většinu lidí největší transakce v životě a chyba se špatně napravuje. Spoléhat na to, že „katastr to vyřeší", nestačí. Tady je kontrolní seznam podle jednotlivých fází koupě, od inzerátu po předání klíčů, včetně toho, na co si dát pozor konkrétně v Příbrami a okrese.
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
                  Před koupí nemovitosti v Příbrami prověřte tři věci. Za prvé právní stav: aktuální List vlastnictví z katastru a to, jestli na nemovitosti nevázne zástavní právo, exekuce, plomba, věcné břemeno, předkupní právo nebo nájem. Za druhé technický stav: u staršího bytu fond oprav a plánované opravy domu, u domu střechu, statiku, vlhkost, elektroinstalaci a sítě, ideálně s technikem. Za třetí smluvní dokumentaci: rezervační smlouvu, smlouvu o smlouvě budoucí a kupní smlouvu si nechte projít dřív, než cokoli podepíšete, a kupní cenu posílejte výhradně přes advokátní nebo notářskou úschovu, nikdy přímo prodávajícímu. Za skryté vady, které existovaly při předání, odpovídá prodávající, dokazování je ale zdlouhavé, proto se vyplatí kontrola předem.
                </p>
              </div>

              <ProcessStepper />

              {/* H2 Pravni stav / LV */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Právní stav nemovitosti: co čtete z Listu vlastnictví</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    První a nejlevnější kontrola je aktuální List vlastnictví z katastru nemovitostí. List vlastnictví má několik částí: část A uvádí vlastníka, část B nemovitosti, část C omezení vlastnického práva (zástavy, věcná břemena, předkupní práva) a část D poznámky, například o probíhajícím soudním sporu nebo exekuci. Písmeno P u zápisu znamená plombu, tedy že právě probíhá nějaká změna, a je lepší počkat, až se dořeší.
                  </p>
                  <p>
                    Od konce prosince 2025 vyžaduje katastr pro zobrazení jména vlastníka přihlášení přes BankID nebo mojeID. Ostatní údaje, tedy omezení a poznámky, zůstávají dostupné i bez přihlášení. Jak si i po této změně ověřit vlastníka a co všechno z katastru vyčtete, popisuji v článku o{' '}
                    <Link to="/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni" className="text-secondary hover:underline font-medium">konci anonymního nahlížení do katastru</Link>.
                  </p>
                </div>
                <LegalDefectsTable />
              </div>

              {/* H2 Vecna bremena, exekuce */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Věcná břemena, exekuce a spoluvlastnictví: kdy couvnout</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Zástavní právo banky prodávajícího se běžně vypořádá z kupní ceny přes úschovu a není překážkou koupě, musí to ale správně ošetřit kupní smlouva a úschovní smlouva (vazba na kvitanci a výmaz zástavy). Naproti tomu exekuce vedená na prodávajícího, spor o hranice pozemku nebo neochotný spoluvlastník jsou důvod k velké opatrnosti a koupi jen s advokátem.
                  </p>
                  <p>
                    Typické komplikace u domů z druhé ruky: věcné břemeno dožití zapsané ve prospěch příbuzného prodávajícího, právo cesty přes sousední pozemek, nebo přípojky vody a kanalizace vedené přes cizí parcelu bez smluvního zajištění. U domů na okraji Příbrami a v okolních obcích bývají nevyjasněné přístupové cesty častější než ve městě. Pokud kupujete podíl na nemovitosti, počítejte s předkupním právem ostatních spoluvlastníků.
                  </p>
                </div>
              </div>

              {/* H2 Technicky stav bytu */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Technický stav bytu: dům, SVJ a fond oprav</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    U bytu nekupujete jen byt, ale i podíl na domě. Vyžádejte si zápisy ze shromáždění SVJ za poslední dva roky, stav fondu oprav, plán velkých oprav (střecha, výtah, stoupačky, zateplení), výši měsíčních příspěvků a informaci, jestli v domě nejsou dlužníci nebo spor.
                  </p>
                  <p>
                    Příbramská sídliště v částech Příbram V, VII a VIII jsou převážně panelová zástavba ze 70. a 80. let, řada domů má za sebou nebo před sebou revitalizaci. Centrum a Březové Hory tvoří starší cihlové a smíšené domy. U samotného bytu sledujte okna, rozvody, vlhkost a plíseň v koupelně a v rozích, funkčnost topení a stáří kuchyně a bytového jádra. Rozdíl mezi bytem k nastěhování a bytem k rekonstrukci se u menších bytů v procentu ceny projeví výrazně, jak popisuji v článku o{' '}
                    <Link to="/blog/prodej-garsonky-maleho-bytu-pribram-2026" className="text-secondary hover:underline font-medium">cenách garsonek a malých bytů v Příbrami</Link>.
                  </p>
                </div>
              </div>

              {/* H2 Technicky stav domu */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Technický stav rodinného domu: střecha, statika, vlhkost, sítě</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    U domu jsou nejdražší skryté vady střecha, statika (praskliny ve zdivu), vlhké zdivo a stará elektroinstalace. Na prohlídku si vezměte stavebního technika nebo certifikovaného inspektora nemovitostí. Inspekce bytu obvykle stojí 5 000 až 8 000 Kč a trvá 1,5 až 2 hodiny, u velkého domu vyjde dráž a zabere i kolem 4 hodin.
                  </p>
                  <p>
                    Prověřte soulad skutečného stavu domu se stavební dokumentací a katastrem, tedy jestli přístavby, garáž nebo zimní zahrada mají povolení a kolaudaci. U sítí zjistěte, jestli je dům napojený na kanalizaci, nebo má jímku či domovní čistírnu, a jestli je studna povolená. V Příbrami a okrese navíc ověřte u obce a v územním plánu možné poddolování a starou důlní činnost v některých lokalitách a radonové riziko v podloží, obojí je potřeba ověřit adresně, ne paušálně.
                  </p>
                </div>
                <BytVsDum />
              </div>

              {/* H2 PENB */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Energetický štítek (PENB) a provozní náklady</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Průkaz energetické náročnosti budovy (PENB) Vám musí prodávající ze zákona předat. Od roku 2025 zpřísněná metodika výpočtu více zohledňuje skutečnou spotřebu, zateplení a způsob vytápění, takže u nezateplených domů a starých panelů vychází štítek horší než dřív. To je zároveň Váš argument v jednání o ceně.
                  </p>
                  <p>
                    Spočítejte si očekávané měsíční náklady: energie, fond oprav nebo údržbu domu, pojištění nemovitosti a daň z nemovitých věcí. Co obnáší PENB při převodu nemovitosti, rozebírám v článku o{' '}
                    <Link to="/blog/penb-pri-prodeji-nemovitosti-2026" className="text-secondary hover:underline font-medium">energetickém štítku při prodeji</Link>, a kolik ročně zaplatíte na dani, v článku o{' '}
                    <Link to="/blog/dan-z-nemovitosti-pribram-2026" className="text-secondary hover:underline font-medium">dani z nemovitosti v Příbrami</Link>.
                  </p>
                </div>
              </div>

              {/* H2 Smlouvy */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Rezervační smlouva, smlouva o smlouvě budoucí a kupní smlouva</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nepodepisujte rezervační smlouvu, dokud ji někdo nezkontroluje. Rezervační poplatek bývá 3 až 5 % z ceny. Hlídejte, kdo je druhou smluvní stranou (realitní kancelář, nebo přímo prodávající), jaké jsou lhůty, co se stane, když nezískáte hypotéku, a za jakých podmínek se poplatek vrací nebo propadá.
                  </p>
                  <p>
                    U rozestavěných staveb a novostaveb se podepisuje smlouva o smlouvě budoucí kupní, kde je klíčový termín kolaudace a sankce za jeho posun, jak popisuji v článku o{' '}
                    <Link to="/blog/novostavby-pribram-2026-kde-se-stavi" className="text-secondary hover:underline font-medium">novostavbách v Příbrami</Link>. Kupní smlouva musí přesně identifikovat nemovitost podle katastru, stanovit termín a stav předání, ošetřit věcná břemena, smluvní pokuty a návrh na vklad. Detailně se rezervaci a úschově věnuji v článku o{' '}
                    <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">rezervační smlouvě a úschově kupní ceny</Link>.
                  </p>
                </div>
              </div>

              {/* H2 Uschova a financovani */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Úschova kupní ceny a financování</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kupní cenu posílejte výhradně přes advokátní, notářskou nebo bankovní úschovu, nikdy přímo na účet prodávajícího před zápisem vlastnického práva. Úschova chrání obě strany: peníze se uvolní prodávajícímu, až je kupující zapsán jako vlastník. Advokátní úschova stojí obvykle od 3 000 Kč, v úschovní smlouvě sledujte podmínky uvolnění a co se stane, když katastr vklad zamítne.
                  </p>
                  <p>
                    Financování mějte jisté dřív, než podepíšete rezervaci. Ideálně s předschválenou hypotékou. Jak si spočítat, na jakou částku dosáhnete, popisuji v článku{' '}
                    <Link to="/blog/kolik-si-muzu-dovolit-hypoteka-pribram" className="text-secondary hover:underline font-medium">kolik si můžu dovolit</Link>, a aktuální sazby sleduji v{' '}
                    <Link to="/blog/hypotecni-sazby-pribram-mesicni-prehled" className="text-secondary hover:underline font-medium">měsíčním přehledu hypotečních sazeb</Link>. Ať zbytečně nepřeplatíte, srovnejte cenu s{' '}
                    <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenovou mapou Příbrami</Link>.
                  </p>
                </div>
                <InspectionCosts />
              </div>

              {/* H2 Predani */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Předání nemovitosti a co po podpisu</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Při předání sepište předávací protokol se stavy elektroměru, vodoměru a plynoměru, počtem klíčů a fotodokumentací, a zkontrolujte, že je nemovitost ve stavu podle smlouvy. Následně přepište energie a služby, odhlaste SIPO a vyřešte pojištění.
                  </p>
                  <p>
                    Po provedení vkladu si ověřte nový List vlastnictví, kde už jste zapsaní jako vlastník. Pokud se po převzetí objeví vada, kterou prodávající zatajil nebo která existovala při předání, uplatněte reklamaci písemně a v zákonných lhůtách. Právě kvůli náročnosti dokazování se ale vyplatí prověřit nemovitost důkladně předem.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Vždy si vytáhněte aktuální List vlastnictví a přečtěte omezení (část C) a poznámky (část D).',
                    'Zástava z hypotéky prodávajícího se běžně řeší z kupní ceny přes úschovu, exekuce a spory o hranice jsou důvod k opatrnosti.',
                    'U bytu prověřte SVJ, fond oprav a plánované velké opravy, u domu střechu, statiku, vlhkost, elektroinstalaci a sítě.',
                    'V Příbrami a okrese navíc hlídejte poddolování, radon, stav panelových domů a u okrajových částí přístupové cesty a sítě.',
                    'PENB Vám musí předat prodávající, horší štítek u nezatepleného domu je argument pro slevu.',
                    'Rezervační i kupní smlouvu si nechte zkontrolovat, kupní cenu posílejte jen přes úschovu.',
                    'Při předání sepište protokol se stavy měřidel a fotodokumentací.',
                    'Za skryté vady existující při předání odpovídá prodávající, ale dokazování je zdlouhavé, kontrola předem se vyplatí.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Zastupuje kupující při koupi bytů, domů a pozemků v Příbrami a celém okrese, včetně prověření právního a technického stavu, kontroly smluvní dokumentace a vyjednání kupní ceny.
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
                  <p>Většina koupí proběhne bez problémů, pokud si nemovitost prověříte předem. Tři pilíře jsou právní stav v katastru, technický stav s odborníkem a smluvní dokumentace s advokátem a úschovou. V Příbrami k tomu přidejte lokální kontroly, hlavně u domů na okraji města a v okrese.</p>
                  <p>Pokud v Příbrami kupujete a chcete mít jistotu, že nekupujete problém, ozvěte se mi. Prověřím právní i technický stav nemovitosti, projdu s Vámi smlouvy, ohlídám úschovu a vyjednám cenu v rámci{' '}
                    <Link to="/sluzby/koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">zastoupení kupujícího v Příbrami</Link>.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Kupujete v Příbrami a chcete mít jistotu, že nekupujete problém?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Prověřím právní i technický stav nemovitosti, projdu s Vámi smlouvy, ohlídám úschovu a vyjednám cenu. Vy se soustředíte na to, jestli je to Váš domov.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/sluzby/koupe-nemovitosti-pribram"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Zastoupení kupujícího
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
                Článek má informativní charakter a shrnuje obecně známé postupy k září 2026. Nenahrazuje právní ani znalecký posudek konkrétní nemovitosti. Před koupí doporučujeme prověření advokátem a technickou prohlídku odborníkem. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Katastr nemovitostí 2026: konec anonymního nahlížení', slug: 'katastr-nemovitosti-2026-konec-anonymniho-nahlizeni' },
                    { title: 'Rezervační smlouva a úschova kupní ceny', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
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

export default BlogNaCoPozorKoupe;
