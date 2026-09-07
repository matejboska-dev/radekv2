import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, KeyRound, UserCheck, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1722487631997-cf1e0f92c2c4?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-08-04';
const PUBLISHED_DISPLAY = '4. srpna 2026';

const faqItems = [
  {
    q: 'Kolik stojí pronájem bytu v Příbrami v roce 2026?',
    a: 'Garsonky a byty 1+kk se pronajímají přibližně od 9 000 do 13 000 Kč měsíčně, byty 2+1 a 2+kk od 10 500 do 15 000 Kč a byty 3+1 a větší od 15 000 Kč výš. Přesná cena záleží na lokalitě, stavu a vybavení bytu, uvedené ceny jsou bez záloh na energie.',
  },
  {
    q: 'Jak vysokou kauci může pronajímatel požadovat?',
    a: 'Podle § 2250 občanského zákoníku maximálně trojnásobek měsíčního nájemného, bez záloh na služby. Pokud pronajímatel požaduje víc, nájemce nadlimitní část platit nemusí, případně má právo žádat vrácení přeplatku.',
  },
  {
    q: 'Jak se v roce 2026 daní příjem z pronájmu bytu?',
    a: 'Standardní sazba daně z příjmu je 15 %, u části základu daně nad zákonným limitem (za rok 2025 šlo o 1 676 052 Kč) platí 23 %. Pronajímatel může uplatnit paušální výdaje 30 % z příjmu, maximálně do 600 000 Kč, nebo skutečné výdaje s vedením evidence.',
  },
  {
    q: 'Jak dlouhá je výpovědní lhůta u nájmu bytu?',
    a: 'Standardně 3 měsíce, lhůta začíná běžet prvním dnem měsíce následujícího po doručení výpovědi. Nájemce může vypovědět nájem bez udání důvodu, pronajímatel jen z důvodů daných zákonem, typicky při hrubém porušení povinností nájemcem.',
  },
  {
    q: 'Co nejvíc ovlivňuje výši nájmu v Příbrami?',
    a: 'Hlavně lokalita, byty v centru a v okolí Březových Hor se pronajímají dráž než na sídlištích. Dále stav bytu, vybavení a to, jestli jde o novostavbu, nebo starší nezateplený panelák.',
  },
];

const rentRanges = [
  { label: 'Garsonka, 1+kk', min: 9000, max: 13000, display: '9 000 až 13 000 Kč' },
  { label: 'Byt 2+1, 2+kk', min: 10500, max: 15000, display: '10 500 až 15 000 Kč' },
  { label: 'Byt 3+1 a větší', min: 15000, max: 18000, display: 'od 15 000 Kč výš' },
];

const RentRangeChart = () => {
  const max = 18000;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Kolik se v Příbrami platí za nájem</h3>
      <p className="text-sm text-muted-foreground mb-6">Orientační rozmezí podle dispozice, bez záloh na energie</p>
      <div className="space-y-5">
        {rentRanges.map((r, i) => (
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
                style={{ width: `${(r.max / max) * 100}%`, opacity: 0.85 - i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Konkrétní aktuální nabídka bytu 2+1, 55 m², v Příbrami: 11 500 Kč měsíčně, odpovídá středu uvedeného rozmezí.
      </p>
    </div>
  );
};

const DepositExample = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-1">Příklad výpočtu maximální kauce</h3>
    <p className="text-sm text-muted-foreground mb-6">Podle § 2250 občanského zákoníku, max. trojnásobek nájemného bez záloh na služby</p>
    <div className="grid sm:grid-cols-3 gap-4 text-center">
      <div className="p-4 bg-muted rounded-xl">
        <div className="text-xs text-muted-foreground mb-1">Nájem</div>
        <div className="text-xl font-black text-foreground">12 000 Kč</div>
      </div>
      <div className="p-4 bg-muted rounded-xl">
        <div className="text-xs text-muted-foreground mb-1">Zálohy na služby</div>
        <div className="text-xl font-black text-foreground">3 000 Kč</div>
        <div className="text-[11px] text-muted-foreground mt-1">do kauce se nepočítají</div>
      </div>
      <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/30">
        <div className="text-xs text-muted-foreground mb-1">Max. kauce (3× nájem)</div>
        <div className="text-xl font-black text-primary">36 000 Kč</div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
      Ne 45 000 Kč. Pokud pronajímatel požaduje víc, nájemce nadlimitní část platit nemusí.
    </p>
  </div>
);

const TerminationComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <UserCheck className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Výpověď nájemcem</h3>
      </div>
      <p className="text-sm text-muted-foreground">Bez udání důvodu, stačí jasně vyjádřit vůli nájem ukončit. Výpovědní lhůta 3 měsíce. Při hrubém porušení povinností pronajímatelem (např. neprovádí opravy) může nájemce ukončit nájem okamžitě, bez výpovědní doby.</p>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <UserX className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Výpověď pronajímatelem</h3>
      </div>
      <p className="text-sm text-muted-foreground">Jen z důvodů podle § 2288 až § 2290 občanského zákoníku, typicky při hrubém porušení povinností nájemcem. Výpovědní lhůta 3 měsíce. Nájemce musí být poučen o právu podat proti výpovědi námitky k soudu do 2 měsíců.</p>
    </div>
  </div>
);

const BlogPronajem = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Pronájem bytu v Příbrami 2026: kolik zaplatíte',
      'Kolik stojí pronájem bytu v Příbrami 2026, jaká je maximální kauce a daň z pronájmu. Praktický přehled pro pronajímatele i nájemce.',
      '/blog/pronajem-bytu-pribram-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Pronájem bytu v Příbrami 2026: kolik si účtovat a kolik zaplatíte',
      description: 'Kolik stojí pronájem bytu v Příbrami 2026, jaká je maximální kauce a daň z pronájmu. Praktický přehled pro pronajímatele i nájemce.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/pronajem-bytu-pribram-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Pronájem bytu v Příbrami 2026' },
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
                alt="Klíče od bytu při předání nájemci, ilustrační foto k tématu pronájmu"
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
              Pronájem bytu v Příbrami 2026: kolik si účtovat a kolik zaplatíte
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Chystáte se pronajmout byt v Příbrami a nevíte, jakou částku nastavit? Nebo naopak byt hledáte a chcete si ověřit, že cena, kterou po Vás pronajímatel chce, je přiměřená? V obou případech potřebujete stejné informace, aktuální ceny podle lokality a dispozice, pravidla pro kauci a to, kolik si stát vezme na dani z pronájmu.
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
                  Nájem bytu v Příbrami se v roce 2026 pohybuje od 9 000 do 13 000 Kč u garsonek a bytů 1+kk, od 10 500 do 15 000 Kč u bytů 2+1 a 2+kk a od 15 000 Kč výš u bytů 3+1 a větších, podle lokality a stavu. Kauce nesmí podle občanského zákoníku přesáhnout trojnásobek nájemného bez záloh na služby. Pronajímatel z příjmu z pronájmu odvádí daň z příjmu 15 %, případně 23 % z části nad ročním limitem, přičemž může uplatnit paušální výdaje ve výši 30 % z příjmu. Výpovědní lhůta u nájmu bytu je standardně 3 měsíce.
                </p>
              </div>

              {/* H2 Kolik se plati */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik se v Příbrami aktuálně platí za nájem</h2>
                <p className="text-muted-foreground">
                  Přesnou cenu vždy určuje konkrétní byt, jeho stav a lokalita. Rozmezí níže vychází z desítek aktuálních inzerátů přímo v Příbrami, které jsem prošel na{' '}
                  <a href="https://www.sreality.cz/hledani/pronajem/byty/pribram" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Sreality.cz</a>
                  {', '}
                  <a href="https://www.reality-pribram.cz/pronajem/byty/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Reality-Pribram.cz</a>
                  {' a '}
                  <a href="https://reality.bazos.cz/inzeraty/pribram-pronajem/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Bazoš.cz</a>
                  {', '}ne z jediného zprůměrovaného čísla.
                </p>
                <RentRangeChart />
                <p className="text-muted-foreground">
                  Uvedené ceny jsou bez záloh na energie a služby, které se obvykle připočítávají zvlášť. Nejlevnější reálně nalezené nabídky (garsonky kolem 9 000 Kč) se týkaly menších bytů na Brodské, nejdražší v rámci běžných dispozic naopak větších jednotek 2+1 nad 60 m².
                </p>
              </div>

              {/* H2 Co ovlivnuje */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co ovlivňuje výši nájmu v Příbrami</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kromě velikosti bytu hraje roli hlavně lokalita. Byty v centru Příbrami a v okolí Březových Hor (Příbram I až IV a VI) se pronajímají dráž než srovnatelné byty na sídlištích (Příbram V, VII a VIII). Novostavby a nedávno zrekonstruované byty, například nové projekty jako bytové domy na Zdaboři, dosahují vyšší nájem než starší nezateplené paneláky.
                  </p>
                  <p>
                    Dalším faktorem je vybavení. Plně zařízený byt s novou kuchyní a spotřebiči si řekne o vyšší nájem než holobyt, kde si nájemce musí dovybavit domácnost sám. U bytů blízko centra, škol nebo s dobrou dostupností MHD bývá poptávka vyšší, což se promítá i do ceny.
                  </p>
                </div>
              </div>

              {/* H2 Kauce */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kauce: kolik můžete chtít a kolik zaplatíte</h2>
                <p className="text-muted-foreground mb-2">
                  Podle § 2250 občanského zákoníku nesmí kauce (jistota) přesáhnout trojnásobek měsíčního nájemného. Do tohoto limitu se nezapočítávají zálohy na služby, počítá se jen ze samotné výše nájmu.
                </p>
                <DepositExample />
                <p className="text-muted-foreground">
                  Nájemce má navíc nárok na úrok z kauce ve výši zákonné sazby podle § 2254 odst. 2 občanského zákoníku. Kauce se vrací po skončení nájmu, sníženo o případné dlužné částky nebo náklady na uvedení bytu do původního stavu.
                </p>
              </div>

              {/* H2 Dan */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Daň z pronájmu: co jako pronajímatel zaplatíte státu</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Příjem z pronájmu bytu podléhá dani z příjmu fyzických osob podle § 9 zákona o daních z příjmů. Standardní sazba je 15 %, u části základu daně nad zákonným limitem (za rok 2025 šlo o 1 676 052 Kč) platí zvýšená sazba 23 %. Drtivé většiny pronajímatelů jednotlivých bytů se ale druhé pásmo netýká.
                  </p>
                  <p>
                    Výdaje si můžete uplatnit dvěma způsoby. Paušální výdaje činí 30 % z příjmů, maximálně do 600 000 Kč, a jsou administrativně nejjednodušší, není potřeba dokládat jednotlivé účtenky. Alternativou jsou skutečné výdaje, tedy reálné náklady na opravy, pojištění nebo úroky z hypotéky, které ale vyžadují vedení evidence a uchovávání dokladů. Většina soukromých pronajímatelů v Příbrami volí kvůli jednoduchosti paušál.
                  </p>
                </div>
              </div>

              {/* H2 Vypovedni lhuta */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Výpovědní lhůta a ukončení nájmu</h2>
                <p className="text-muted-foreground mb-2">
                  Standardní výpovědní doba u nájmu bytu je 3 měsíce a začíná běžet prvním dnem měsíce následujícího po doručení výpovědi.
                </p>
                <TerminationComparison />
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak nastavit nájem, ať jste pronajímatel, nebo nájemce</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Jako pronajímatel porovnejte aktuální nabídky srovnatelných bytů ve Vaší lokalitě.</strong> Sídliště, centrum a novostavby v Příbrami se cenově liší, srovnávejte podobné dispozice a stav.</li>
                  <li><strong className="text-foreground">Nastavte kauci v zákonném limitu.</strong> Maximálně trojnásobek nájemného bez záloh na služby, vyšší částku nájemce platit nemusí.</li>
                  <li><strong className="text-foreground">Připravte si nájemní smlouvu s jasně danými podmínkami.</strong> Výše nájmu, zálohy na služby, kauce, výpovědní podmínky a stav bytu při předání.</li>
                  <li><strong className="text-foreground">Jako pronajímatel si ujasněte, jak budete danit příjem.</strong> Paušál 30 % je nejjednodušší volba pro většinu pronajímatelů jednotlivých bytů.</li>
                  <li><strong className="text-foreground">Jako nájemce si před podpisem ověřte, že cena odpovídá lokalitě a stavu bytu.</strong> Přeplacení o pár tisíc měsíčně se za rok sečte na desítky tisíc korun.</li>
                </ol>

                <p className="text-muted-foreground">
                  Nastavení nájmu i výběr spolehlivého nájemce řeším s klienty v Příbrami jako součást{' '}
                  <Link to="/sluzby/pronajem-nemovitosti-pribram" className="text-secondary hover:underline font-medium">pronájmu nemovitostí v Příbrami</Link>
                  , od stanovení ceny až po prověření zájemců.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Garsonky a 1+kk v Příbrami se pronajímají od 9 000 do 13 000 Kč, byty 2+1 a 2+kk od 10 500 do 15 000 Kč, byty 3+1 a větší od 15 000 Kč výš.',
                    'Kauce nesmí přesáhnout trojnásobek nájemného bez záloh na služby, podle § 2250 občanského zákoníku.',
                    'Příjem z pronájmu se daní sazbou 15 %, případně 23 % nad ročním limitem, s možností paušálních výdajů 30 % z příjmu.',
                    'Výpovědní lhůta u nájmu bytu je standardně 3 měsíce, nájemce může vypovědět bez udání důvodu.',
                    'Lokalita, stav bytu a vybavení nejvíc ovlivňují výši nájmu v Příbrami.',
                    'Novostavby a zrekonstruované byty dosahují vyššího nájmu než starší nezateplené paneláky.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem pronájmu včetně nastavení ceny, prověření nájemců a přípravy nájemní smlouvy.
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
                  <p>Ať už v Příbrami byt pronajímáte, nebo hledáte, klíčové je znát aktuální ceny podle lokality a dispozice a rozumět základním pravidlům, kauci, dani z pronájmu a výpovědní lhůtě. S těmito informacemi budete vyjednávat z lepší pozice.</p>
                  <p>Pokud v Příbrami chystáte pronájem bytu a chcete mít jistotu, že nastavíte správnou cenu a najdete spolehlivého nájemce, ozvěte se mi. Postarám se o kompletní proces pronájmu, od stanovení ceny po předání klíčů.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <KeyRound className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Chystáte se pronajmout byt v Příbrami a chcete nastavit správnou cenu?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Zajišťuji kompletní pronájem nemovitostí v Příbrami, od stanovení ceny přes prověření nájemců až po přípravu smlouvy.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/sluzby/pronajem-nemovitosti-pribram"
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
                Článek vychází z platné legislativy a aktuálních tržních nabídek k srpnu 2026 a má informativní charakter. Konkrétní cena nájmu se vždy odvíjí od stavu a lokality konkrétního bytu, daňové otázky doporučujeme konzultovat s daňovým poradcem. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Investiční nemovitosti Příbram: Vyplatí se to v roce 2026?', slug: 'investicni-nemovitosti-pribram' },
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
                    { title: 'Rezervační smlouva a úschova kupní ceny', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
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

export default BlogPronajem;
