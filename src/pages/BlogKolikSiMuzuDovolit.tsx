import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Percent, Landmark, CalendarClock, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-09-03';
const PUBLISHED_DISPLAY = '3. září 2026';

const faqItems = [
  {
    q: 'Kolik procent příjmu může jít na splátku hypotéky?',
    a: 'Banky si v roce 2026 interně drží pravidlo, že na splátky všech úvěrů dohromady (DSTI) by mělo jít maximálně zhruba 40 až 45 % čistého měsíčního příjmu domácnosti, i když ČNB tento limit pro hypotéky na vlastní bydlení od roku 2024 plošně nevyžaduje. Pokud tedy máte čistý příjem 60 000 Kč a žádné jiné úvěry, počítejte se splátkou hypotéky do zhruba 24 000 Kč.',
  },
  {
    q: 'Kolik vlastních peněz potřebuji k hypotéce v roce 2026?',
    a: 'Standardně minimálně 20 % z kupní ceny (maximální LTV 80 %). Žadatelé do 36 let, kteří kupují první vlastní bydlení, mohou dosáhnout na LTV až 90 %, tedy vlastní zdroje 10 %. Pro investiční nemovitost (třetí a další nebo koupě k pronájmu) platí od 1. dubna 2026 přísnější limit LTV 70 %, tedy vlastních 30 %. Nad rámec akontace počítejte s rezervou na daň z nemovitosti, pojištění, odhad a návrh na vklad.',
  },
  {
    q: 'Jaký příjem potřebuji na hypotéku 4 miliony Kč?',
    a: 'Orientačně: úvěr 4 mil. Kč na 30 let při sazbě kolem 5,4 % znamená splátku přibližně 22 000 až 23 000 Kč měsíčně. Aby splátka nepřesáhla 45 % čistého příjmu a banka měla rezervu, potřebuje domácnost čistý měsíční příjem zhruba od 50 000 Kč výše a žádné velké jiné splátky. Konkrétní částku vždy posoudí banka podle typu příjmu, počtu dětí a stávajících závazků.',
  },
  {
    q: 'Do kolika let musí být hypotéka splacená?',
    a: 'Banky nastavují splatnost tak, aby úvěr byl splacený nejpozději v 70 až 75 letech věku nejstaršího žadatele. Běžná splatnost je 30 let, maximum obvykle 30 až 40 let podle banky a věku. Delší splatnost snižuje měsíční splátku, a tím zvyšuje dosažitelnou částku, zároveň ale roste celkový přeplatek na úrocích.',
  },
  {
    q: 'Co si za dosažitelnou hypotéku koupím v Příbrami?',
    a: 'Za kupní cenu kolem 3 mil. Kč pořídíte v Příbrami garsonku nebo menší byt, kolem 4 až 5 mil. Kč byt 2+1 až 3+1 podle lokality a stavu, kolem 6 až 9 mil. Kč řadový nebo menší samostatný dům mimo centrum. Ceny bytů v Příbrami se pohybují mezi 60 000 a 100 000 Kč za m², novostavby od 130 000 Kč za m². Za stejnou částku je v Příbrami výrazně víc bydlení než v Praze, kde ceny bytů startují nad 140 000 Kč za m².',
  },
];

const CnbLimits = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 not-prose">
    {[
      { icon: Percent, value: '80 / 90 %', label: 'Maximální LTV: 80 % pro vlastní bydlení, 90 % pro žadatele do 36 let na první nemovitost' },
      { icon: Calculator, value: '40 až 45 %', label: 'Interní limit bank pro DSTI, podíl všech splátek na čistém měsíčním příjmu' },
      { icon: Landmark, value: '7 až 8×', label: 'Doporučený strop DTI, celkový dluh k čistému ročnímu příjmu (7 u investičních)' },
      { icon: CalendarClock, value: '70 až 75 let', label: 'Do tohoto věku nejstaršího žadatele musí být hypotéka splacená' },
    ].map((s) => (
      <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
          <s.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-xl font-black text-foreground mb-1">{s.value}</div>
        <p className="text-xs text-muted-foreground">{s.label}</p>
      </div>
    ))}
  </div>
);

const loanRows = [
  { payment: '15 000 Kč', r45: '≈ 3,0 mil.', r50: '≈ 2,8 mil.', r54: '≈ 2,7 mil.' },
  { payment: '20 000 Kč', r45: '≈ 3,9 mil.', r50: '≈ 3,7 mil.', r54: '≈ 3,6 mil.' },
  { payment: '25 000 Kč', r45: '≈ 4,9 mil.', r50: '≈ 4,7 mil.', r54: '≈ 4,5 mil.' },
  { payment: '30 000 Kč', r45: '≈ 5,9 mil.', r50: '≈ 5,6 mil.', r54: '≈ 5,3 mil.' },
];

const PaymentToLoanTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-1">Ze splátky na výši úvěru</h3>
    <p className="text-sm text-muted-foreground mb-6">Splatnost 30 let, orientační výše úvěru podle sazby</p>
    <table className="w-full text-sm min-w-[440px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-4 font-semibold">Měsíční splátka</th>
          <th className="py-2 pr-4 font-semibold">Sazba 4,5 %</th>
          <th className="py-2 pr-4 font-semibold">Sazba 5,0 %</th>
          <th className="py-2 font-semibold">Sazba 5,4 %</th>
        </tr>
      </thead>
      <tbody>
        {loanRows.map((r) => (
          <tr key={r.payment} className="border-b border-border last:border-0">
            <td className="py-2.5 pr-4 text-foreground font-medium">{r.payment}</td>
            <td className="py-2.5 pr-4 text-muted-foreground">{r.r45}</td>
            <td className="py-2.5 pr-4 text-muted-foreground">{r.r50}</td>
            <td className="py-2.5 text-primary font-semibold">{r.r54}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
      Vlastní ilustrační výpočet podle anuitního vzorce. Stejná splátka unese při nižší sazbě vyšší úvěr, rozdíl mezi 4,5 % a 5,4 % je u splátky 20 000 Kč téměř 400 000 Kč kupní síly. Kratší splatnost (25 let) výši úvěru dále snižuje.
    </p>
  </div>
);

const profiles = [
  { who: 'Jednotlivec', income: '42 000 Kč', payment: '≈ 16 800 Kč', loan: '≈ 3,0 mil.', price: '≈ 3,7 mil.', buy: 'Garsonka nebo byt 2+kk' },
  { who: 'Pár bez dětí', income: '60 000 Kč', payment: '≈ 24 000 Kč', loan: '≈ 4,3 mil.', price: '≈ 5,3 mil.', buy: 'Byt 3+1 nebo menší řadový dům na okraji' },
  { who: 'Pár, vyšší příjem', income: '85 000 Kč', payment: '≈ 34 000 Kč', loan: '≈ 6,0 mil.', price: '≈ 7,5 mil.', buy: 'Řadový nebo menší samostatný dům' },
  { who: 'Rodina se 2 dětmi', income: '100 000 Kč', payment: '≈ 34 000 Kč', loan: '≈ 6,0 mil.', price: '≈ 7,5 mil.', buy: 'Samostatný rodinný dům staršího data' },
];

const ProfilesTable = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose overflow-x-auto">
    <h3 className="text-lg font-bold text-foreground mb-1">Kolik si půjčíte a co za to koupíte v Příbrami</h3>
    <p className="text-sm text-muted-foreground mb-6">Sazba 5,4 %, splatnost 30 let, LTV 80 %, žádné jiné splátky, orientační</p>
    <table className="w-full text-sm min-w-[620px]">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-2 pr-3 font-semibold">Domácnost</th>
          <th className="py-2 pr-3 font-semibold">Čistý příjem</th>
          <th className="py-2 pr-3 font-semibold">Max. splátka</th>
          <th className="py-2 pr-3 font-semibold">Úvěr</th>
          <th className="py-2 pr-3 font-semibold">Kupní cena</th>
          <th className="py-2 font-semibold">V Příbrami</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((p) => (
          <tr key={p.who} className="border-b border-border last:border-0 align-top">
            <td className="py-3 pr-3 text-foreground font-medium">{p.who}</td>
            <td className="py-3 pr-3 text-muted-foreground">{p.income}</td>
            <td className="py-3 pr-3 text-muted-foreground">{p.payment}</td>
            <td className="py-3 pr-3 text-muted-foreground">{p.loan}</td>
            <td className="py-3 pr-3 text-foreground font-medium">{p.price}</td>
            <td className="py-3 text-muted-foreground">{p.buy}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
      Vlastní ilustrační výpočet. Vyživované děti snižují disponibilní příjem, proto rodina se dvěma dětmi a vyšším příjmem vychází podobně jako bezdětný pár s příjmem nižším. Konkrétní částku vždy posoudí banka.
    </p>
  </div>
);

const BlogKolikSiMuzuDovolit = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Kolik si můžu dovolit? Výpočet hypotéky pro Příbram',
      'Jak si spočítat dosažitelnou hypotéku podle příjmu, úspor a věku. Limity ČNB 2026 (LTV 80 a 90 %), pravidlo DSTI a modelové příklady převedené na ceny bytů a domů v Příbrami.',
      '/blog/kolik-si-muzu-dovolit-hypoteka-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami',
      description: 'Výpočet dosažitelné hypotéky podle příjmu, úspor a věku. Limity ČNB 2026 a modelové příklady převedené na ceny bytů a domů v Příbrami.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/kolik-si-muzu-dovolit-hypoteka-pribram',
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
        { '@type': 'ListItem', position: 3, name: 'Kolik si můžu dovolit? Výpočet hypotéky pro Příbram' },
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
                alt="Kalkulačka a rozpočet domácnosti, ilustrační foto k výpočtu dosažitelné hypotéky"
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
              Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Většina lidí začne hledat nemovitost dřív, než ví, kolik jim banka půjčí, a pak se zklame. Dostupná hypotéka není jedno číslo z kalkulačky. Závisí na příjmu, úsporách, věku a závazcích, a hlavně ji limituje splátka, ne sazba. Tady je jednoduchý výpočet ve čtyřech krocích a převod výsledku na konkrétní bydlení v Příbrami.
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
                  Dosažitelnou hypotéku spočítáte ze čtyř vstupů. Za prvé: na splátku všech úvěrů by mělo jít maximálně zhruba 40 až 45 % čistého měsíčního příjmu (pravidlo DSTI, které si banky drží interně). Za druhé: potřebujete vlastní zdroje alespoň 20 % z kupní ceny (LTV 80 %), žadatelé do 36 let na první bydlení až 10 % (LTV 90 %). Za třetí: celkové zadlužení by nemělo přesáhnout zhruba osminásobek čistého ročního příjmu (DTI). Za čtvrté: hypotéka musí být splacená do 70 až 75 let věku nejstaršího žadatele, běžná splatnost je 30 let. Příklad: čistý příjem domácnosti 60 000 Kč, žádné jiné úvěry, splátka do zhruba 24 000 Kč, při sazbě kolem 5,4 % a splatnosti 30 let to odpovídá úvěru přibližně 4,3 mil. Kč. S vlastními 20 % je to kupní cena kolem 5,3 mil. Kč, za což v Příbrami pořídíte byt 3+1 nebo menší dům mimo centrum. Spolužadatel a delší splatnost dostupnou částku zvýší, jiné splátky a věk ji snižují.
                </p>
              </div>

              {/* H2 Ctyri cisla */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Čtyři čísla, která rozhodují: DSTI, LTV, DTI a doba splatnosti</h2>
                <p className="text-muted-foreground mb-2">
                  Dostupnou hypotéku určuje splátka jako podíl příjmu (DSTI), poměr úvěru k ceně nemovitosti (LTV), celkové zadlužení k ročnímu příjmu (DTI) a maximální doba splácení daná věkem.
                </p>
                <CnbLimits />
                <ul className="space-y-2 text-muted-foreground mb-2">
                  <li><strong className="text-foreground">DSTI</strong> je podíl všech měsíčních splátek na čistém příjmu. ČNB ho pro vlastní bydlení plošně nevyžaduje, banky si drží interně 40 až 45 %.</li>
                  <li><strong className="text-foreground">LTV</strong> je podíl úvěru na ceně nemovitosti. Maximum 80 %, u žadatelů do 36 let na první bydlení až 90 %. Investiční nemovitost jen 70 % od dubna 2026.</li>
                  <li><strong className="text-foreground">DTI</strong> je celkový dluh k čistému ročnímu příjmu, doporučení kolem 8 (7 u investičních).</li>
                  <li><strong className="text-foreground">Doba splatnosti</strong>: hypotéka splacená do 70 až 75 let nejstaršího žadatele, běžně 30 let. Delší splatnost snižuje splátku, ale zvyšuje celkový přeplatek.</li>
                </ul>
                <p className="text-muted-foreground">
                  Aktuální výši sazeb, ze kterých se počítá splátka, sleduji v{' '}
                  <Link to="/blog/hypotecni-sazby-pribram-mesicni-prehled" className="text-secondary hover:underline font-medium">měsíčním přehledu hypotečních sazeb</Link>.
                </p>
              </div>

              {/* H2 Krok 1 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 1: Kolik unese Váš příjem</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Vezměte čistý měsíční příjem domácnosti, odečtěte splátky stávajících úvěrů a z toho, co zbývá, počítejte maximálně 40 až 45 % na splátku hypotéky. Do příjmu se počítá mzda, dlouhodobé příjmy z podnikání podle daňového přiznání, u některých bank i příjem z pronájmu jiné nemovitosti nebo částečný úvazek.
                  </p>
                  <p>
                    Dostupnou částku snižují spotřebitelský úvěr, leasing, kreditní karta a kontokorent (banka počítá i s nevyčerpaným rámcem) a počet vyživovaných dětí, za které banka odečítá životní minimum. Proto domácnost se dvěma dětmi a příjmem 100 000 Kč vychází podobně jako bezdětný pár s příjmem výrazně nižším.
                  </p>
                </div>
              </div>

              {/* H2 Krok 2 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 2: Ze splátky na výši úvěru</h2>
                <p className="text-muted-foreground mb-2">
                  Z maximální splátky, aktuální sazby a doby splatnosti se přes anuitní vzorec dopočítá výše úvěru. Při sazbě kolem 5,4 % a splatnosti 30 let odpovídá splátce 20 000 Kč úvěr zhruba 3,6 mil. Kč. Limit je splátka, ne sazba, ale sazba určuje, jaký úvěr se do dané splátky vejde.
                </p>
                <PaymentToLoanTable />
                <p className="text-muted-foreground">
                  Pro srovnání, modelová splátka hypotéky 3,5 mil. Kč na 25 let vyšla podle Swiss Life Hypoindexu v srpnu 2026 na 21 327 Kč měsíčně, a průměrná nová hypotéka v ČR má 4,59 mil. Kč. V Příbrami se u běžného bytu vejdete pod tuto částku.
                </p>
              </div>

              {/* H2 Krok 3 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 3: Kolik vlastních peněz potřebujete</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    K výši úvěru přidejte vlastní zdroje. Standardně 20 % z kupní ceny, u žadatelů do 36 let na první bydlení stačí 10 %. Jako vlastní zdroje se počítají úspory, stavební spoření, dar od rodičů nebo peníze z prodeje jiné nemovitosti.
                  </p>
                  <p>
                    Nezapomeňte na rezervu nad rámec akontace: daň z nemovitosti, pojištění nemovitosti (banka ho vyžaduje), odhad nemovitosti pro banku, návrh na vklad 2 000 Kč a případně provizi a rekonstrukci. Pokud kupujete nemovitost k pronájmu, počítejte od 1. dubna 2026 s vlastními 30 % (LTV 70 %), jak rozebírám v článku o{' '}
                    <Link to="/blog/investicni-nemovitosti-pribram" className="text-secondary hover:underline font-medium">investičních nemovitostech v Příbrami</Link>.
                  </p>
                </div>
              </div>

              {/* H2 Krok 4 */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok 4: Co si za dostupnou částku koupíte v Příbrami</h2>
                <p className="text-muted-foreground mb-2">
                  Sečtěte výši úvěru a vlastní zdroje, to je Vaše maximální kupní cena. V Příbrami je za ni citelně víc bydlení než v Praze.
                </p>
                <ProfilesTable />
                <p className="text-muted-foreground">
                  Ceny bytů v Příbrami se pohybují mezi 60 000 a 100 000 Kč za m², nejmenší byty a garsonky spíš 100 000 až 140 000 Kč za m², novostavby od 130 000 Kč za m² a rodinné domy ve Středočeském kraji kolem 70 000 Kč za m². Podrobný přehled najdete v{' '}
                  <Link to="/blog/cenova-mapa-pribram-2026" className="text-secondary hover:underline font-medium">cenové mapě Příbrami</Link>, ceny nejmenších bytů v článku o{' '}
                  <Link to="/blog/prodej-garsonky-maleho-bytu-pribram-2026" className="text-secondary hover:underline font-medium">prodeji garsonky</Link>
                  {' '}a ceny nových bytů v článku o{' '}
                  <Link to="/blog/novostavby-pribram-2026-kde-se-stavi" className="text-secondary hover:underline font-medium">novostavbách v Příbrami</Link>. Domácnost, která v Praze dosáhne na byt 2+kk, v Příbrami dosáhne na 3+1 nebo menší dům, a přitom je autobusem na Smíchov zhruba za hodinu.
                </p>
              </div>

              {/* H2 Jak zvysit */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak dostupnou částku zvýšit</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dostupnost zvednete spolužadatelem (druhý příjem výrazně pomůže, ale svazuje oba), delší splatností, konsolidací nebo splacením drahých spotřebitelských úvěrů před žádostí, zrušením nevyužívané kreditní karty a kontokorentu, nebo vyšší akontací. Pomůže i lepší nabídka banky, kterou vyjedná hypoteční specialista.
                  </p>
                  <p>
                    Nespoléhejte na strategii „počkám na nižší sazbu". Sazby jsou podle analytiků spíš před ustálením než před poklesem a ceny nemovitostí mezitím dál rostou, v prvním pololetí 2026 v mnoha regionech dvouciferně meziročně. Čas strávený čekáním se dá promarnit.
                  </p>
                </div>
              </div>

              {/* H2 Caste chyby */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Časté chyby ve vlastním výpočtu</h2>
                <ul className="space-y-3 text-muted-foreground list-disc pl-6 mb-4">
                  <li>Počítat s hrubým místo čistého příjmu.</li>
                  <li>Počítat s nereálně nízkou sazbou, kterou dnes nikdo nenabízí.</li>
                  <li>Zapomenout na leasing, kreditní kartu a kontokorent, které banka započítá.</li>
                  <li>Nepočítat s rezervou na vedlejší náklady koupě (daň, pojištění, odhad, vklad, rekonstrukce).</li>
                  <li>Vyčerpat celý strop DSTI a nenechat si rezervu na běžný život a nečekané výdaje.</li>
                </ul>
                <p className="text-muted-foreground">
                  Nejlepší prevence je nechat si udělat předschválení hypotéky ještě před hledáním nemovitosti a hlavně před podpisem rezervace, jak zdůrazňuji i v článku{' '}
                  <Link to="/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">na co si dát pozor při koupi</Link>. Co se stane, když hypotéku nezískáte až po podpisu rezervace, řeším v článku o{' '}
                  <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">rezervační smlouvě</Link>.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Dostupnou hypotéku limituje splátka, ne sazba: na splátky všech úvěrů počítejte maximálně 40 až 45 % čistého příjmu.',
                    'Vlastní zdroje: 20 % z ceny standardně, 10 % pro žadatele do 36 let na první bydlení, 30 % pro investiční nemovitost.',
                    'Celkové zadlužení by nemělo přesáhnout zhruba osminásobek čistého ročního příjmu.',
                    'Hypotéka musí být splacená do 70 až 75 let, běžná splatnost je 30 let.',
                    'Při sazbě kolem 5,4 % a splatnosti 30 let odpovídá splátce 20 000 Kč úvěr zhruba 3,6 mil. Kč.',
                    'Za stejnou dostupnou částku koupíte v Příbrami výrazně víc bydlení než v Praze.',
                    'Dostupnost zvýší spolužadatel, delší splatnost a vyčištění drahých úvěrů, sníží ji jiné splátky a věk.',
                    'Nejčastější chyba je počítat s hrubým příjmem, nízkou sazbou a bez rezervy na vedlejší náklady.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Zastupuje kupující při koupi bytů a domů v Příbrami a okrese, včetně výběru nemovitosti podle rozpočtu a koordinace financování s hypotečním specialistou.
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
                  <p>Dosažitelná hypotéka se počítá odzadu: z příjmu odvodíte maximální splátku, z ní a ze sazby výši úvěru, přidáte vlastní zdroje a máte kupní cenu. Věk a jiné závazky výsledek posouvají. V Příbrami vychází tenhle výpočet příznivěji než ve velkých městech, protože za stejnou částku koupíte víc.</p>
                  <p>Pokud v Příbrami zvažujete koupi a chcete vědět, na jakou nemovitost reálně dosáhnete, ozvěte se mi. Projdu s Vámi dostupnou částku, doporučím hypotečního specialistu a pomůžu vybrat nemovitost, která sedne do rozpočtu, v rámci{' '}
                    <Link to="/sluzby/koupe-nemovitosti-pribram" className="text-secondary hover:underline font-medium">zastoupení kupujícího v Příbrami</Link>.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Chcete vědět, na jakou nemovitost v Příbrami reálně dosáhnete?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Projdu s Vámi dostupnou částku, doporučím hypotečního specialistu a pomůžu vybrat nemovitost, která sedne do rozpočtu i do Vašich plánů.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/sluzby/koupe-nemovitosti-pribram"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Konzultace zdarma
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
                Článek má informativní charakter a vychází z pravidel a sazeb k září 2026. Uvedené výpočty jsou ilustrační, konkrétní výši hypotéky vždy určí banka podle bonity žadatele, typu příjmu a své aktuální nabídky. Doporučujeme konzultaci s hypotečním specialistou. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Hypoteční sazby a Příbram: aktuální přehled', slug: 'hypotecni-sazby-pribram-mesicni-prehled' },
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
                    { title: 'Na co si dát pozor při koupi bytu nebo domu v Příbrami', slug: 'na-co-si-dat-pozor-koupe-nemovitosti-pribram' },
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

export default BlogKolikSiMuzuDovolit;
