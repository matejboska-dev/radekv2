import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-09-03';
const PUBLISHED_DISPLAY = '3. září 2026';

const faqItems = [
  {
    q: 'Jak dlouho trvá prodej rodinného domu v Příbrami?',
    a: 'V roce 2026 obvykle 3 až 5 měsíců od zveřejnění nabídky po připsání kupní ceny na účet. Samotná inzerce trvá ve Středočeském kraji v průměru kolem 86 dní, k tomu je potřeba připočítat čas na přípravu dokumentů a prezentace na začátku a na smlouvy, úschovu a převod v katastru na konci. Přestřelená cena nebo špatná prezentace dobu prodeje výrazně prodlouží.',
  },
  {
    q: 'Jaké dokumenty potřebuji k prodeji domu?',
    a: 'Aktuální List vlastnictví, nabývací titul (kupní, darovací smlouva nebo usnesení o dědictví), snímek katastrální mapy a případně geometrický plán, průkaz energetické náročnosti budovy (PENB), kolaudační rozhodnutí nebo souhlas, projektovou dokumentaci a revize (elektro, plyn, komín) a potvrzení o bezdlužnosti u daně z nemovitosti a energií. PENB je ze zákona povinný, za jeho nedodání hrozí pokuta až 200 000 Kč.',
  },
  {
    q: 'Kolik dostanu za rodinný dům v Příbrami?',
    a: 'Rodinné domy ve Středočeském kraji se v roce 2026 prodávají v průměru kolem 70 000 Kč za m² užitné plochy, meziročně o 6,5 % dráž. Cena konkrétního domu v Příbrami se ale liší podle lokality, velikosti a stavu pozemku, stavu stavby a sítí, běžně od zhruba 3 do 15 milionů Kč i více. U domu tvoří cenu tři složky: pozemek, stavba a její stav. Přesnou cenu určí až srovnání s aktuálními nabídkami a realizovanými prodeji podobných domů.',
  },
  {
    q: 'Musím platit daň z prodeje rodinného domu?',
    a: 'Daň z příjmu z prodeje neplatíte, pokud jste v domě měli bydliště alespoň 2 roky bezprostředně před prodejem, nebo pokud jste dům vlastnili alespoň 10 let (u nemovitostí nabytých od roku 2021), nebo pokud získané prostředky použijete na obstarání vlastní bytové potřeby a oznámíte to finančnímu úřadu. Daň z nemovitých věcí za rok prodeje platí ještě prodávající, od dalšího roku přechází na kupujícího.',
  },
  {
    q: 'Vyplatí se před prodejem domu home staging a profesionální fotografie?',
    a: 'Ano. Většina zájemců se s domem poprvé setká online a rozhoduje se podle fotek. Podle oborových průzkumů se nemovitosti s home stagingem prodávají rychleji a část kupujících je ochotná zaplatit prémii, zahraniční studie uvádějí zkrácení prodeje o desítky procent a vyšší cenu o jednotky procent. U domu hraje velkou roli první dojem z ulice a upravená zahrada. Velké investice před prodejem se ale nemusí vrátit, vyplatí se hlavně úklid, odosobnění a drobné opravy.',
  },
];

const steps = [
  { n: '1', title: 'Připravte si dokumenty', desc: 'List vlastnictví, nabývací titul, katastrální mapa, PENB, stavební dokumentace, revize' },
  { n: '2', title: 'Stanovte realistickou cenu', desc: 'Pozemek, stavba a stav, srovnání s reálnými prodeji podobných domů' },
  { n: '3', title: 'Připravte dům a zahradu', desc: 'Úklid, odosobnění, drobné opravy, curb appeal, home staging' },
  { n: '4', title: 'Fotografie a inzerce', desc: 'Profesionální foto a video, dron, text inzerátu, realitní portály' },
  { n: '5', title: 'Prohlídky', desc: 'Prvních 30 dní nejsilnějších, evidence zájemců, zpětná vazba' },
  { n: '6', title: 'Rezervace a kupní smlouva', desc: 'Ověření financování kupujícího, rezervační poplatek 3 až 5 %, advokát' },
  { n: '7', title: 'Úschova a převod', desc: 'Advokátní úschova, návrh na vklad, vypořádání zástavy' },
  { n: '8', title: 'Daně a předání', desc: 'Časový test, předávací protokol, přepis energií a služeb' },
];

const TimelineSteps = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-1">Prodej domu krok za krokem</h3>
    <p className="text-sm text-muted-foreground mb-6">Celý proces obvykle trvá 3 až 5 měsíců</p>
    <ol className="space-y-4">
      {steps.map((s) => (
        <li key={s.n} className="flex gap-4">
          <div className="w-9 h-9 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-sm">
            {s.n}
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-0.5">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

const documents = [
  { doc: 'List vlastnictví (aktuální)', where: 'Katastr nemovitostí, ČÚZK nebo Czech POINT' },
  { doc: 'Nabývací titul', where: 'Kupní, darovací smlouva nebo usnesení o dědictví' },
  { doc: 'Snímek katastrální mapy, geometrický plán', where: 'Katastrální úřad, geodet' },
  { doc: 'Průkaz energetické náročnosti budovy (PENB)', where: 'Energetický specialista, povinný ze zákona' },
  { doc: 'Kolaudační rozhodnutí nebo souhlas', where: 'Stavební úřad, archiv obce' },
  { doc: 'Projektová dokumentace', where: 'Vlastní archiv, stavební úřad' },
  { doc: 'Revize elektro, plyn, komín', where: 'Revizní technik' },
  { doc: 'Potvrzení o bezdlužnosti (daň z nemovitosti)', where: 'Finanční úřad' },
  { doc: 'Vyúčtování energií a služeb', where: 'Dodavatelé energií' },
  { doc: 'Pojistná smlouva k nemovitosti', where: 'Pojišťovna' },
];

const DocumentsTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-6">Dokumenty k prodeji rodinného domu</h3>
    <table className="w-full text-sm min-w-[480px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Dokument</th>
          <th className="py-2 font-semibold">Kde ho získáte</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((d) => (
          <tr key={d.doc} className="border-b border-border last:border-0 align-top">
            <td className="py-2.5 pr-4 text-foreground font-medium">{d.doc}</td>
            <td className="py-2.5 text-muted-foreground">{d.where}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const priceParts = [
  { label: 'Pozemek', display: 'poloha, výměra, tvar, sítě, územní plán', pct: 40 },
  { label: 'Stavba', display: 'velikost, dispozice, konstrukce, stáří', pct: 35 },
  { label: 'Stav a vybavení', display: 'rekonstrukce, energetická třída, zahrada', pct: 25 },
];

const PriceCompositionChart = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-1">Z čeho se skládá cena rodinného domu</h3>
    <p className="text-sm text-muted-foreground mb-6">Orientační váha složek, u konkrétního domu se liší</p>
    <div className="space-y-5">
      {priceParts.map((p) => (
        <div key={p.label}>
          <div className="flex justify-between items-baseline mb-1.5 gap-4">
            <span className="text-sm text-foreground font-medium">{p.label}</span>
            <span className="text-xs text-muted-foreground shrink-0">{p.display}</span>
          </div>
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${p.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
      Na rozdíl od bytu, kde je hlavní cena za m² podlahové plochy, u domu vstupuje do ceny hodnota pozemku samostatně. Proto se dva podobně velké domy v různých lokalitách Příbrami mohou v ceně lišit i o miliony.
    </p>
  </div>
);

const sellingCosts = [
  { item: 'Provize realitní kanceláře', note: 'Podle rozsahu služby a dohody, platí obvykle prodávající' },
  { item: 'PENB', note: 'Zhruba 3 000 až 10 000 Kč podle velikosti domu' },
  { item: 'Právní servis a kupní smlouva', note: 'Advokát, podle složitosti případu' },
  { item: 'Advokátní nebo notářská úschova', note: 'Od cca 3 000 Kč' },
  { item: 'Kolek za návrh na vklad', note: '2 000 Kč' },
  { item: 'Daň z příjmu z prodeje', note: 'Jen pokud nesplníte časový test ani výjimku pro vlastní bydlení' },
];

const SellingCostsTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-6">Náklady spojené s prodejem domu</h3>
    <table className="w-full text-sm min-w-[480px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Položka</th>
          <th className="py-2 font-semibold">Poznámka</th>
        </tr>
      </thead>
      <tbody>
        {sellingCosts.map((c) => (
          <tr key={c.item} className="border-b border-border last:border-0 align-top">
            <td className="py-2.5 pr-4 text-foreground font-medium">{c.item}</td>
            <td className="py-2.5 text-muted-foreground">{c.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const BlogProdatRodinnyDum = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Jak prodat rodinný dům v Příbrami: postup krok za krokem',
      'Průvodce prodejem rodinného domu v Příbrami: jaké dokumenty potřebujete, jak stanovit cenu, home staging, prohlídky, smlouvy, úschova, daň z prodeje a doba prodeje 3 až 5 měsíců.',
      '/blog/jak-prodat-rodinny-dum-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Jak prodat rodinný dům v Příbrami: postup krok za krokem (2026)',
      description: 'Průvodce prodejem rodinného domu v Příbrami: dokumenty, stanovení ceny, home staging, prohlídky, smlouvy, úschova, daň z prodeje a doba prodeje 3 až 5 měsíců.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/jak-prodat-rodinny-dum-pribram',
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
        { '@type': 'ListItem', position: 3, name: 'Jak prodat rodinný dům v Příbrami' },
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
                alt="Rodinný dům se zahradou, ilustrační foto k prodeji domu v Příbrami"
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
                12 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Jak prodat rodinný dům v Příbrami: postup krok za krokem (2026)
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Dům se v Příbrami neprodá sám za víkend. Je to několikaměsíční proces s řadou kroků, kde se dá získat i ztratit statisíce. Tady je celý postup od přípravy dokumentů po předání klíčů, s čísly a cenami pro Příbram a okres.
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
                  Prodej rodinného domu v Příbrami trvá v roce 2026 obvykle 3 až 5 měsíců od zveřejnění nabídky po připsání peněz. Postup má osm kroků: příprava dokumentů (List vlastnictví, nabývací titul, snímek katastrální mapy, PENB, případně stavební dokumentace a revize), stanovení realistické ceny, příprava domu a zahrady na prodej a profesionální fotografie, inzerce a marketing, prohlídky, rezervační a kupní smlouva, advokátní úschova a návrh na vklad do katastru, předání domu s protokolem. Rodinné domy ve Středočeském kraji se v roce 2026 prodávají v průměru kolem 70 000 Kč za m² užitné plochy, ceny konkrétních domů v Příbrami se ale liší podle lokality, velikosti pozemku a stavu klidně od 3 do 15 mil. Kč i více. Daň z příjmu z prodeje neplatíte, pokud jste v domě bydleli alespoň 2 roky, dům vlastnili alespoň 10 let, nebo výtěžek použijete na vlastní bydlení.
                </p>
              </div>

              <TimelineSteps />

              {/* Krok 1 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 1: Připravte si dokumenty</h2>
                <p className="text-muted-foreground mb-2">
                  Bez kompletních papírů prodej vázne. Většinu dokumentů si zajistíte předem a ušetříte tím týdny čekání ve chvíli, kdy už máte kupce.
                </p>
                <DocumentsTable />
                <p className="text-muted-foreground">
                  Ještě před inzercí si projděte vlastní List vlastnictví: věcná břemena, zástavu z hypotéky, nesoulad zapsané a skutečné výměry nebo černé stavby (přístavba, garáž, zimní zahrada bez povolení) je lepší narovnat dřív, než na ně narazí kupující nebo jeho banka. Co všechno z katastru vyčtete, popisuji v článku o{' '}
                  <Link to="/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni" className="text-secondary hover:underline font-medium">nahlížení do katastru nemovitostí</Link>, a povinnostem kolem PENB se věnuji v článku o{' '}
                  <Link to="/blog/penb-pri-prodeji-nemovitosti-2026" className="text-secondary hover:underline font-medium">energetickém štítku při prodeji</Link>.
                </p>
              </div>

              {/* Krok 2 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 2: Stanovte realistickou cenu domu</h2>
                <p className="text-muted-foreground mb-2">
                  U domu neexistuje jednoduchá cena za metr. Cenu tvoří pozemek, stavba a stav, a srovnatelných nabídek je málo. Přestřelená cena prodej zabrzdí na měsíce, protože zájemci s omezeným rozpočtem na ni ani nezareagují.
                </p>
                <PriceCompositionChart />
                <p className="text-muted-foreground">
                  Rodinné domy ve Středočeském kraji stály v květnu 2026 v průměru kolem 70 000 Kč za m² užitné plochy, meziročně o 6,5 % a za tři roky o 21 % víc. Průměrná doba inzerce domu v kraji je kolem 86 dní. Konkrétní příklady z Příbrami: dům 188 m² v Žežicích za 12,24 mil. Kč, řadový dům 190 m² v Příbrami IV za 11,99 mil. Kč. Jak dům oceňuje makléř nebo znalec, popisuji v článku{' '}
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">jak správně ocenit nemovitost před prodejem</Link>, širší srovnání cen v regionu najdete v{' '}
                  <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapě Příbrami</Link>.
                </p>
              </div>

              {/* Krok 3 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 3: Připravte dům a zahradu na prodej</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    První dojem si kupující udělá z fotek a z pohledu na dům z ulice. Úklid, odosobnění (odstranění rodinných fotek a přebytečného nábytku), drobné opravy a upravená zahrada zvednou cenu i rychlost prodeje. U domu hraje velkou roli takzvaný curb appeal, tedy jak dům působí od plotu: fasáda, plot, vjezd, posekaná zahrada, čistá okna.
                  </p>
                  <p>
                    Podle oborového průzkumu zaznamenala víc než polovina makléřů po home stagingu rychlejší prodej, u 31 % šlo o výrazné zrychlení. Tvrdá česká data chybí, zahraniční studie ale uvádějí zkrácení prodeje o desítky procent a vyšší prodejní cenu o jednotky procent, a 81 % kupujících v průzkumu potvrdilo, že si v připravené nemovitosti snáz představí své bydlení. Velké investice před prodejem (nová kuchyně, celková rekonstrukce) se ale nemusejí vrátit, vyplatí se hlavně úklid, drobné opravy a přemalování opotřebených stěn.
                  </p>
                </div>
              </div>

              {/* Krok 4 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 4: Fotografie, video a inzerce</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Většina zájemců uvidí dům nejdřív online. Profesionální fotografie, u domu se zahradou i video, virtuální prohlídka nebo dronové záběry, rozhodují, jestli si někdo domluví osobní prohlídku. Amatérské fotky z mobilu za šera nabídku pohřbí bez ohledu na to, jak je dům dobrý.
                  </p>
                  <p>
                    Do textu inzerátu patří dispozice, plocha domu i pozemku, stav a rok poslední rekonstrukce, sítě, energetická třída, orientační náklady na provoz a dostupnost, tedy vzdálenost do centra Příbrami, dojezd do Prahy a občanská vybavenost. Rozmyslete si, jestli uvádět přesnou adresu, kvůli soukromí a bezpečnosti při prohlídkách.
                  </p>
                </div>
              </div>

              {/* Krok 5 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 5: Prohlídky</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Prvních 30 dní od zveřejnění je nejsilnějších, tehdy nabídku vidí nejvíc lidí. Prohlídky plánujte tak, aby byl dům vždy uklizený a nasvícený, a připravte si odpovědi na technické dotazy: stáří střechy a kotle, zateplení, vlhkost, sítě (kanalizace nebo jímka, studna), náklady na provoz, sousedské vztahy a co říká územní plán o okolí.
                  </p>
                  <p>
                    Zpětná vazba z prohlídek je cenný signál. Pokud chodí hodně lidí, ale nikdo nepodá nabídku, problém bývá v ceně. Pokud nechodí skoro nikdo, je problém v prezentaci nebo v inzerátu.
                  </p>
                </div>
              </div>

              {/* Krok 6 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 6: Rezervace, kupní smlouva a prověření kupujícího</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Než podepíšete rezervaci, ověřte, že má kupující financování jisté, ideálně předschválenou hypotéku. Rezervace kupci, který nakonec úvěr nezíská, Vás připraví o týdny a o jiné zájemce. Rezervační poplatek bývá 3 až 5 % z ceny, kupní smlouvu připraví advokát.
                  </p>
                  <p>
                    Kupní smlouva musí přesně identifikovat nemovitost podle katastru, stanovit cenu, termín a stav předání, ošetřit případná věcná břemena, smluvní pokuty a návrh na vklad. Jak funguje rezervační smlouva a úschova a kdo co platí, rozebírám v článku o{' '}
                    <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">rezervační smlouvě a úschově kupní ceny</Link>. Proč dnes kupující počítají opatrněji, souvisí s vývojem sazeb, který sleduji v{' '}
                    <Link to="/blog/hypotecni-sazby-pribram-mesicni-prehled" className="text-secondary hover:underline font-medium">měsíčním přehledu hypotečních sazeb</Link>.
                  </p>
                </div>
              </div>

              {/* Krok 7 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 7: Úschova kupní ceny a převod v katastru</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kupní cena jde do advokátní, notářské nebo bankovní úschovy, ne přímo na Váš účet. Uvolní se Vám po zápisu vlastnického práva na kupujícího. Úschova stojí obvykle od 3 000 Kč a chrání obě strany.
                  </p>
                  <p>
                    Návrh na vklad do katastru podléhá kolku 2 000 Kč, katastr má po podání dvacetidenní ochrannou lhůtu a pak provede zápis. Pokud na domě vázne Vaše hypotéka, zástava se vypořádá z kupní ceny (banka vystaví kvitanci a souhlas s výmazem), což musí ošetřit kupní i úschovní smlouva.
                  </p>
                </div>
              </div>

              {/* Krok 8 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 8: Daně, předání a přepis energií</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Daň z příjmu z prodeje domu neplatíte, pokud splníte časový test: bydliště v domě alespoň 2 roky bezprostředně před prodejem, nebo vlastnictví alespoň 10 let (u nemovitostí nabytých od roku 2021). Osvobozeni jste i tehdy, pokud prostředky použijete na obstarání vlastní bytové potřeby a oznámíte to finančnímu úřadu. Podrobně to rozebírám v článku o{' '}
                    <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-secondary hover:underline font-medium">dani z prodeje nemovitosti</Link>.
                  </p>
                  <p>
                    Daň z nemovitých věcí za rok prodeje platí ještě prodávající, od dalšího roku přechází na kupujícího, jak vysvětluji v článku o{' '}
                    <Link to="/blog/dan-z-nemovitosti-pribram-2026" className="text-secondary hover:underline font-medium">dani z nemovitosti v Příbrami</Link>. Při předání sepište předávací protokol se stavy elektroměru, vodoměru a plynoměru, počtem klíčů a fotodokumentací, přepište energie a služby a odhlaste SIPO.
                  </p>
                </div>
                <SellingCostsTable />
              </div>

              {/* H2 Maklerem nebo sam */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Prodat dům s makléřem, nebo sám?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    U domu, kde je cena hůř určitelná a zájemců bývá méně než u bytu, se chyba v ceně nebo v prezentaci prodraží víc. To je hlavní argument pro makléře. Makléř má u domu reálně přinést ocenění z reálných dat, marketing, filtrování zájemců, koordinaci advokáta a úschovy a vyjednávání o ceně.
                  </p>
                  <p>
                    Obě cesty otevřeně porovnávám, včetně provizí a rizik, v článku{' '}
                    <Link to="/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem" className="text-secondary hover:underline font-medium">prodat nemovitost bez realitky nebo s makléřem</Link>, a jaký typ smlouvy s makléřem podepsat, rozebírám v článku o{' '}
                    <Link to="/blog/exkluzivni-smlouva-s-maklerem" className="text-secondary hover:underline font-medium">exkluzivní smlouvě s makléřem</Link>.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Prodej rodinného domu v Příbrami trvá obvykle 3 až 5 měsíců, samotná inzerce ve Středočeském kraji v průměru kolem 86 dní.',
                    'Připravte dokumenty předem: List vlastnictví, nabývací titul, katastrální mapa, PENB, stavební dokumentace a revize.',
                    'U domu tvoří cenu pozemek, stavba a stav, srovnatelných nabídek je málo, přestřelená cena prodej zabrzdí.',
                    'Rodinné domy ve Středočeském kraji se v roce 2026 prodávají kolem 70 000 Kč za m², meziročně o 6,5 % dráž.',
                    'První dojem z ulice a ze zahrady rozhoduje, home staging a profesionální fotky zkracují prodej.',
                    'Kupní cena patří do úschovy, uvolní se po zápisu vlastnického práva kupujícího.',
                    'Daň z příjmu z prodeje neplatíte při splnění časového testu (2 roky bydlení, 10 let vlastnictví) nebo při použití výtěžku na vlastní bydlení.',
                    'U domu se chyba v ceně nebo prezentaci prodraží víc než u bytu, proto se vyplatí odborné ocenění.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej bytů, rodinných domů a pozemků v Příbrami a celém okrese. Klienty provází celým procesem prodeje domu od přípravy dokumentů a ocenění přes marketing a prohlídky až po úschovu a předání klíčů.
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
                  <p>Prodej rodinného domu v Příbrami je běh na několik měsíců, ve kterém rozhoduje realistická cena, dobrá příprava a prezentace a čistá smluvní a daňová stránka. Dům se od bytu liší tím, že prodáváte i pozemek a stavební historii, a srovnatelných nabídek je málo, takže chyba v ceně bolí víc.</p>
                  <p>Pokud v Příbrami zvažujete prodej domu a chcete znát reálnou tržní cenu podloženou skutečnými prodeji, ozvěte se mi. Připravím Vám odhad na míru a postarám se o celý{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">proces prodeje nemovitosti v Příbrami</Link>.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <Home className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Zvažujete prodej rodinného domu v Příbrami?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Připravím Vám odhad ceny na míru podložený reálnými prodeji a postarám se o celý proces, od přípravy dokumentů a home stagingu po úschovu a předání.
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
                Článek má informativní charakter a shrnuje postup a orientační ceny k září 2026. Konkrétní cena domu, daňové povinnosti a doba prodeje se liší podle nemovitosti a situace prodávajícího. Daňové otázky konzultujte s daňovým poradcem, právní s advokátem. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Jak správně ocenit nemovitost před prodejem', slug: 'jak-spravne-ocenit-nemovitost' },
                    { title: 'Rezervační smlouva a úschova kupní ceny', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
                    { title: 'Daň z prodeje nemovitosti 2026: kolik zaplatím v Příbrami?', slug: 'dan-z-prodeje-bytu-pribram-2026' },
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

export default BlogProdatRodinnyDum;
