import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUp, Check, ArrowRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  ComposedChart,
  ReferenceDot,
  Cell,
  LabelList,
  Scatter,
} from 'recharts';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const PUBLISHED = '2026-06-01';
const PUBLISHED_DISPLAY = 'Červen 2026';
const URL_PATH = '/blog/cenova-mapa-pribram-2026';

// Design tokens — sladěné s globální paletou webu (index.css / tailwind.config.ts).
// Klíče gold/goldDark/goldLight zůstávají, ale nesou primární modrou RE/MAX,
// aby článek vizuálně seděl se zbytkem webu.
const C = {
  bg: '#FFFFFF',
  text: 'hsl(0 0% 20%)', // tělo textu
  heading: 'hsl(0 0% 5%)', // nadpisy – foreground jako jinde na webu
  gold: 'hsl(220 100% 32%)', // primární modrá RE/MAX
  goldDark: 'hsl(220 100% 24%)',
  goldLight: 'hsl(220 100% 60%)',
  highlight: 'hsl(220 100% 97%)', // jemný modrý podklad pro callouty
  mutedText: 'hsl(0 0% 40%)', // muted-foreground
  border: 'hsl(0 0% 88%)',
};

const fontHeading = "'Playfair Display', Georgia, serif";
const fontBody = "'Inter', system-ui, -apple-system, sans-serif";
const fontLabel = "'Inter', system-ui, -apple-system, sans-serif";

const neighborhoods = [
  {
    name: 'Příbram I–IV + VI',
    subtitle: 'Centrum a Březové Hory',
    type: 'Cihlová i smíšená zástavba, nejvyšší poptávka',
    price_range: '70 000–100 000 Kč/m²',
    typical: 'Záleží na velikosti a stavu bytu',
    tier: 'high',
    note: 'Centrum města a Březové Hory — nejžádanější lokality v Příbrami',
  },
  {
    name: 'Příbram V, VII, VIII',
    subtitle: 'Sídliště',
    type: 'Převážně panelová zástavba 70.–80. léta',
    price_range: '60 000–90 000 Kč/m²',
    typical: 'Záleží na velikosti a stavu bytu',
    tier: 'medium',
    note: 'Sídlištní bydlení s dobrou občanskou vybaveností a dopravou',
  },
  {
    name: 'Novostavby v Příbrami',
    subtitle: 'Nová výstavba',
    type: 'Nové projekty napříč městem',
    price_range: 'od 130 000 Kč/m²',
    typical: 'Nový standard, nízká energetická náročnost',
    tier: 'high',
    note: 'Nové byty drží svou cenovou hladinu bez ohledu na čtvrť',
  },
  {
    name: 'Praha (pro srovnání)',
    subtitle: 'Hlavní město',
    type: 'Pro porovnání cenové hladiny',
    price_range: 'od 140 000 Kč/m²',
    typical: 'Výrazně dražší než Příbram',
    tier: 'low',
    note: 'Příbram je oproti Praze stále výrazně dostupnější',
  },
];

const tierColor: Record<string, string> = {
  high: 'hsl(220 100% 24%)',
  'medium-high': 'hsl(220 100% 32%)',
  medium: 'hsl(220 100% 42%)',
  'medium-low': 'hsl(220 100% 55%)',
  low: 'hsl(220 100% 70%)',
};

const dispoData = [
  { type: '1+kk / 1+1', min: 1.8, avg: 2.4, max: 3.0 },
  { type: '2+kk', min: 2.7, avg: 3.6, max: 4.5 },
  { type: '2+1', min: 3.3, avg: 4.4, max: 5.5 },
  { type: '3+kk', min: 3.9, avg: 5.2, max: 6.5 },
  { type: '3+1', min: 4.5, avg: 6.0, max: 7.5 },
  { type: '4+kk a větší', min: 5.4, avg: 7.2, max: 9.0 },
].map((d) => ({ ...d, range: [d.min, d.max] as [number, number] }));

// price = hodnota pro plochu a tooltip (všechny body),
// actual = plná čára (historie), forecast = čárkovaná čára (predikce).
// forecast má bod i v roce 2025, aby čárkovaná čára plynule navázala na historii.
const priceTrend = [
  { year: '2022', price: 52000, actual: 52000, forecast: null as number | null, predicted: false },
  { year: '2023', price: 58000, actual: 58000, forecast: null as number | null, predicted: false },
  { year: '2024', price: 68000, actual: 68000, forecast: null as number | null, predicted: false },
  { year: '2025', price: 76000, actual: 76000, forecast: 76000 as number | null, predicted: false },
  { year: '2026*', price: 82000, actual: null as number | null, forecast: 82000 as number | null, predicted: true },
];

const faqItems = [
  {
    q: 'Kolik stojí průměrný byt 2+1 v Příbrami v roce 2026?',
    a: 'Cena bytu 2+1 v Příbrami se odvíjí od konkrétní lokality a stavu. V centru a v okolí Březových Hor (Příbram I–IV a VI) se ceny pohybují v rozmezí 70 000–100 000 Kč/m². Na sídlištích (Příbram V, VII a VIII) jde o 60 000–90 000 Kč/m². Novostavby v Příbrami startují kolem 130 000 Kč/m².',
  },
  {
    q: 'Je Příbram dobrá investice do nemovitosti?',
    a: 'Příbram vykazuje stabilní růst cen a nájmů. Výnosnost z pronájmu se pohybuje kolem 4–5 % p.a. Jde o konzervativní investici s nižším rizikem a výrazně nižší vstupní cenou než Praha, kde se ceny bytů pohybují od 140 000 Kč/m² výše. Důležité je koupit v lokalitě s poptávkou po pronájmu a správně nastavit nájemní cenu.',
  },
  {
    q: 'Jsou v rámci Příbrami velké cenové rozdíly mezi čtvrtěmi?',
    a: 'Příbram je relativně kompaktní město a cenové rozdíly mezi jednotlivými čtvrtěmi nejsou tak výrazné, jak by se mohlo zdát. Hlavní rozdíl tvoří charakter centra a Březových Hor (Příbram I–IV, VI) oproti sídlištím (Příbram V, VII, VIII). Výrazně větší vliv na cenu má samotný stav bytu, jeho velikost a to, zda jde o novostavbu.',
  },
  {
    q: 'Kolik stojí pronájem bytu v Příbrami?',
    a: 'Pronájem bytu 2+1 se v roce 2026 pohybuje přibližně od 14 000 do 18 000 Kč měsíčně včetně poplatků. Panelový byt v sídlišti lze pronajmout za 12 000–15 000 Kč. Nájemní trh v Příbrami je stabilní, volné byty se obsazují rychle.',
  },
  {
    q: 'Jak rychle se prodávají nemovitosti v Příbrami?',
    a: 'Nemovitosti správně oceněné se prodávají průměrně do 2 až 6 týdnů. Předražené nemovitosti leží na trhu i několik měsíců a nakonec se stejně prodají levněji, protože kupující slevu vyjednají. Správná vstupní cena je klíčem k rychlému a výhodnému prodeji.',
  },
];

const formatKc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/\u00A0/g, ' ')} Kč`;
const formatMil = (n: number) => `${n.toFixed(2).replace('.', ',')} mil. Kč`;

const DispoTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        fontFamily: fontLabel,
        fontSize: 13,
        color: C.text,
        boxShadow: '0 4px 18px hsl(220 100% 32% / 0.12)',
      }}
    >
      <div style={{ fontWeight: 600, color: C.heading, marginBottom: 6 }}>{d.type}</div>
      <div>od: <strong>{formatMil(d.min)}</strong></div>
      <div>průměr: <strong style={{ color: C.gold }}>{formatMil(d.avg)}</strong></div>
      <div>do: <strong>{formatMil(d.max)}</strong></div>
    </div>
  );
};

const TrendTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        fontFamily: fontLabel,
        fontSize: 13,
        color: C.text,
        boxShadow: '0 4px 18px hsl(220 100% 32% / 0.12)',
      }}
    >
      <div style={{ fontWeight: 600, color: C.heading, marginBottom: 4 }}>
        {d.year}
        {d.predicted ? ' (predikce)' : ''}
      </div>
      <div style={{ color: C.gold, fontWeight: 600 }}>{formatKc(d.price)}/m²</div>
    </div>
  );
};

const BlogCenovaMapaPribram = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const cleanupMeta = setPageMeta(
      'Cenová mapa Příbram 2026: Ceny bytů a domů podle čtvrtí',
      'Aktuální cenová mapa Příbrami 2026. Ceny bytů a domů podle čtvrtí, vývoj cen, ceny podle dispozice. Podloženo daty z realitního trhu.',
      URL_PATH
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cenová mapa Příbram 2026: Kolik stojí nemovitosti v jednotlivých čtvrtích?',
      description:
        'Aktuální cenová mapa Příbrami 2026. Ceny bytů a domů podle čtvrtí, vývoj cen 2022–2026, ceny podle dispozice. Podloženo daty z realitního trhu.',
      image: 'https://radek-vetrovsky.cz/assets/radek-vetrovsky.webp',
      author: {
        '@type': 'Person',
        name: 'Radek Větrovský',
        jobTitle: 'Realitní makléř',
        url: 'https://radek-vetrovsky.cz',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Radek Větrovský - RE/MAX',
        logo: { '@type': 'ImageObject', url: 'https://radek-vetrovsky.cz/images/logo.png' },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://radek-vetrovsky.cz${URL_PATH}` },
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
        { '@type': 'ListItem', position: 3, name: 'Cenová mapa Příbram 2026' },
      ],
    });

    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cleanupMeta();
      cleanupArticle();
      cleanupFaq();
      cleanupBreadcrumb();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fontBody, fontSize: 17, lineHeight: 1.75 }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(180deg, hsl(220 40% 97%) 0%, #FFFFFF 100%)`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 15%, hsl(220 100% 32% / 0.08) 0%, transparent 45%),
              radial-gradient(circle at 85% 80%, hsl(0 0% 5% / 0.05) 0%, transparent 50%),
              linear-gradient(hsl(0 0% 88% / 0.4) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 88% / 0.4) 1px, transparent 1px)
            `,
            backgroundSize: 'auto, auto, 64px 64px, 64px 64px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: '64px 24px 56px' }}>
          <nav
            style={{
              fontFamily: fontLabel,
              fontSize: 13,
              letterSpacing: '0.04em',
              color: C.mutedText,
              marginBottom: 28,
            }}
          >
            <Link to="/clanky" style={{ color: C.mutedText, textDecoration: 'none' }}>
              Blog
            </Link>
            <span style={{ margin: '0 8px', color: C.border }}>/</span>
            <span style={{ color: C.heading }}>Trh v Příbrami</span>
          </nav>

          <h1
            style={{
              fontFamily: fontHeading,
              fontWeight: 700,
              color: C.heading,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.15,
              margin: '0 0 18px',
              letterSpacing: '-0.01em',
            }}
          >
            Cenová mapa Příbram 2026: Kolik stojí nemovitosti v jednotlivých čtvrtích?
          </h1>

          <p
            style={{
              fontFamily: fontBody,
              fontSize: 20,
              lineHeight: 1.55,
              color: C.mutedText,
              margin: '0 0 32px',
              maxWidth: 720,
            }}
          >
            Přehled cen bytů a domů v Příbrami podle lokalit, podložený aktuálními daty z realitního trhu.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <img
              src={radekPhoto}
              alt="Radek Větrovský – realitní makléř Příbram"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 12px hsl(220 100% 32% / 0.25)',
              }}
            />
            <div style={{ fontFamily: fontLabel }}>
              <div style={{ fontWeight: 600, color: C.heading, fontSize: 15, lineHeight: 1.2 }}>
                Radek Větrovský
              </div>
              <div style={{ fontSize: 12.5, color: C.mutedText, marginTop: 2 }}>Realitní makléř</div>
            </div>
          </div>

          <div
            style={{
              fontFamily: fontLabel,
              fontSize: 13,
              color: C.mutedText,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              alignItems: 'center',
            }}
          >
            <span>{PUBLISHED_DISPLAY}</span>
            <span style={{ color: C.border }}>|</span>
            <span>7 min čtení</span>
            <span style={{ color: C.border }}>|</span>
            <span style={{ color: C.gold, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Trh v Příbrami
            </span>
          </div>

          <div
            style={{
              marginTop: 36,
              height: 2,
              width: 80,
              background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
              borderRadius: 2,
            }}
          />
        </div>
      </section>

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 24px' }}>
        <aside
          style={{
            borderLeft: `4px solid ${C.gold}`,
            background: C.highlight,
            padding: '20px 24px',
            borderRadius: 8,
            margin: '0 0 48px',
          }}
        >
          <div
            style={{
              fontFamily: fontLabel,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: C.goldDark,
              marginBottom: 10,
            }}
          >
            RYCHLÁ ODPOVĚĎ
          </div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: C.text }}>
            Ceny bytů v Příbrami se v roce 2026 pohybují v rozmezí 60 000–100 000 Kč/m² podle velikosti a stavu bytu.
            V centru a v okolí Březových Hor (Příbram I–IV a VI) jsou ceny zhruba 70 000–100 000 Kč/m², na sídlištích
            (Příbram V, VII a VIII) 60 000–90 000 Kč/m². Novostavby v Příbrami startují kolem 130 000 Kč/m². Pro
            srovnání — v Praze se ceny pohybují od 140 000 Kč/m² výše.
          </p>
        </aside>

        <Section title="Příbram na mapě českého realitního trhu">
          <p>
            Příbram leží 60 km jihozápadně od Prahy s přímým napojením na dálnici D4, má přibližně 32 000 obyvatel a
            patří k největším městům Středočeského kraje. Na rozdíl od Prahy, kde ceny bytů začínají kolem 140 000
            Kč/m², zůstává Příbram výrazně dostupnější. Trh je tu navíc kompaktní — cenové rozdíly mezi jednotlivými
            čtvrtěmi nejsou tak výrazné, jak by se na první pohled mohlo zdát.
          </p>
          <p>
            V posledních třech letech trh výrazně oživil. Zájem o nemovitosti roste, nabídka je omezená a ceny se
            každoročně zvedají. Kdo odkládá rozhodnutí o prodeji nebo koupi, platí to cenou.
          </p>
        </Section>

        <Section title="Cenová mapa Příbram: přehled podle lokalit">
          <p>
            V rámci Příbrami nejsou cenové rozdíly mezi jednotlivými čtvrtěmi tak velké, jak by se mohlo zdát.
            Hlavní rozdíl tvoří centrum a Březové Hory oproti sídlištím. Mnohem větší vliv na cenu má samotný stav
            bytu, jeho velikost a to, zda jde o novostavbu.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              margin: '32px 0 20px',
            }}
          >
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                style={{
                  background: '#fff',
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  boxShadow: '0 1px 3px hsl(220 100% 32% / 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px hsl(220 100% 32% / 0.16)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(26,46,74,0.04)';
                }}
              >
                <div style={{ height: 4, background: tierColor[n.tier], width: '100%' }} />
                <div style={{ padding: 20 }}>
                  <h3
                    style={{
                      fontFamily: fontHeading,
                      fontWeight: 600,
                      color: C.heading,
                      fontSize: 19,
                      margin: '0 0 2px',
                      lineHeight: 1.25,
                    }}
                  >
                    {n.name}
                  </h3>
                  {n.subtitle && (
                    <div
                      style={{
                        fontFamily: fontLabel,
                        fontSize: 11.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: C.gold,
                        fontWeight: 600,
                        marginBottom: 10,
                      }}
                    >
                      {n.subtitle}
                    </div>
                  )}
                  <p
                    style={{
                      margin: '8px 0 14px',
                      fontSize: 14,
                      color: C.mutedText,
                      lineHeight: 1.5,
                      fontFamily: fontLabel,
                    }}
                  >
                    {n.type}
                  </p>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                    <div
                      style={{
                        fontFamily: fontLabel,
                        fontSize: 11,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: C.mutedText,
                        marginBottom: 2,
                      }}
                    >
                      Cena
                    </div>
                    <div
                      style={{
                        fontFamily: fontHeading,
                        fontWeight: 600,
                        color: C.heading,
                        fontSize: 17,
                        marginBottom: 10,
                      }}
                    >
                      {n.price_range}
                    </div>
                    <div style={{ fontSize: 13.5, color: C.text, fontFamily: fontLabel }}>
                      Typicky: <strong style={{ color: C.heading }}>{n.typical}</strong>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: '14px 0 0',
                      fontSize: 13,
                      color: C.mutedText,
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    {n.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13.5, color: C.mutedText, fontStyle: 'italic', marginTop: 20 }}>
            Pozn.: Ceny jsou orientační nabídkové ceny z aktuální inzerce (1. pololetí 2026). Skutečná dosažená cena
            závisí na stavu bytu, podlaží, výtahu a dalších faktorech.
          </p>
        </Section>

        <Section title="Ceny bytů podle dispozice">
          <p>
            Nejžádanější jsou byty o dispozici 3+kk a 2+1, které tvoří největší část místního trhu. Garsoniéry a
            malé byty jsou v Příbrami historicky méně zastoupeny. Investoři hledají 2+1 pro pronájem, rodiny
            preferují 3+kk s balkonem nebo zahrádkou.
          </p>

          <ChartCard
            title="Průměrné nabídkové ceny bytů v Příbrami (2026)"
            caption="Zdroj: analýza nabídkové inzerce, 1. pololetí 2026"
          >
            <div style={{ width: '100%', minWidth: 520 }}>
              <ResponsiveContainer width="100%" height={380}>
                <ComposedChart data={dispoData} margin={{ top: 28, right: 24, left: 8, bottom: 8 }}>
                  <CartesianGrid stroke="hsl(0 0% 92%)" vertical={false} />
                  <XAxis
                    dataKey="type"
                    tick={{ fontFamily: fontLabel, fontSize: 12, fill: C.mutedText }}
                    axisLine={{ stroke: C.border }}
                    tickLine={false}
                  />
                  <YAxis
                    label={{
                      value: 'mil. Kč',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontFamily: fontLabel, fontSize: 12, fill: C.mutedText },
                    }}
                    tick={{ fontFamily: fontLabel, fontSize: 12, fill: C.mutedText }}
                    axisLine={{ stroke: C.border }}
                    tickLine={false}
                    domain={[0, 10]}
                  />
                  <Tooltip content={<DispoTooltip />} cursor={{ fill: 'hsl(220 100% 32% / 0.06)' }} />
                  <Bar
                    dataKey="range"
                    fill={C.goldLight}
                    fillOpacity={0.35}
                    radius={[6, 6, 6, 6]}
                    barSize={38}
                    isAnimationActive={true}
                  />
                  <Scatter
                    dataKey="avg"
                    fill={C.gold}
                    shape={(props: any) => {
                      const { cx, cy } = props;
                      return (
                        <line
                          x1={cx - 19}
                          x2={cx + 19}
                          y1={cy}
                          y2={cy}
                          stroke={C.gold}
                          strokeWidth={3}
                          strokeLinecap="round"
                        />
                      );
                    }}
                  >
                    <LabelList
                      dataKey="avg"
                      position="top"
                      offset={10}
                      formatter={(v: number) => `⌀ ${v.toFixed(1).replace('.', ',')}`}
                      style={{ fontFamily: fontLabel, fontSize: 11, fill: C.heading, fontWeight: 600 }}
                    />
                  </Scatter>
                </ComposedChart>
              </ResponsiveContainer>
              <div
                style={{
                  fontFamily: fontLabel,
                  fontSize: 12,
                  color: C.mutedText,
                  marginTop: 10,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 18,
                  alignItems: 'center',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 16, height: 10, borderRadius: 2, background: C.goldLight, opacity: 0.35, display: 'inline-block' }} />
                  rozpětí cen (od–do)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 16, height: 3, borderRadius: 2, background: C.gold, display: 'inline-block' }} />
                  průměrná cena (⌀)
                </span>
              </div>
            </div>
          </ChartCard>
        </Section>

        <Section title="Jak se vyvíjely ceny v Příbrami od roku 2022?">
          <p>
            Realitní trh v Příbrami kopíroval celostátní trend. Po stagnaci v roce 2023 přišlo výrazné oživení. Za
            čtyři roky vzrostla průměrná cena bytu o přibližně 58 %. To z Příbrami dělá region, kde nečinnost při
            rozhodování o prodeji nebo koupi stojí reálné peníze.
          </p>

          <ChartCard
            title="Vývoj průměrné ceny bytu v Příbrami (Kč/m²)"
            caption="Odhad na základě vývoje nabídkových cen. Rok 2026* je predikce."
          >
            <div style={{ width: '100%', minWidth: 520 }}>
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart data={priceTrend} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.gold} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(0 0% 92%)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontFamily: fontLabel, fontSize: 12, fill: C.mutedText }}
                    axisLine={{ stroke: C.border }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[50000, 90000]}
                    ticks={[50000, 60000, 70000, 80000, 90000]}
                    tickFormatter={(v) => `${(v as number).toLocaleString('cs-CZ').replace(/\u00A0/g, ' ')}`}
                    tick={{ fontFamily: fontLabel, fontSize: 12, fill: C.mutedText }}
                    axisLine={{ stroke: C.border }}
                    tickLine={false}
                    width={70}
                  />
                  <Tooltip content={<TrendTooltip />} cursor={{ stroke: C.gold, strokeOpacity: 0.4 }} />
                  <Area type="monotone" dataKey="price" stroke="none" fill="url(#goldFill)" isAnimationActive={false} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke={C.gold}
                    strokeWidth={3}
                    dot={{ r: 5, fill: C.heading, stroke: C.heading }}
                    activeDot={{ r: 7, fill: C.gold, stroke: C.heading, strokeWidth: 2 }}
                    connectNulls={false}
                    isAnimationActive={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke={C.gold}
                    strokeWidth={3}
                    strokeDasharray="6 5"
                    dot={false}
                    connectNulls
                    isAnimationActive={true}
                  />
                  <ReferenceDot x="2026*" y={82000} r={6} fill={C.gold} stroke={C.heading} strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
              <div
                style={{
                  fontFamily: fontLabel,
                  fontSize: 12,
                  color: C.mutedText,
                  marginTop: 8,
                  textAlign: 'right',
                }}
              >
                * predikce na rok 2026
              </div>
            </div>
          </ChartCard>
        </Section>

        <Section title="Co ovlivňuje cenu nemovitosti v Příbrami?">
          <p>
            Stejná dispozice ve stejné čtvrti může mít cenové rozpětí 20–30 %. Hlavní faktory, které cenu táhnou
            nahoru nebo dolů:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Stav nemovitosti:</strong> kompletní rekonstrukce přidává 15–25 %
              oproti původnímu stavu
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Podlaží a výtah:</strong> přízemí nebo horní patro bez výtahu
              snižují poptávku
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Orientace:</strong> jižně orientovaný obývací pokoj zvyšuje
              atraktivitu
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Typ domu:</strong> cihlový dům velí prémiím oproti panelovému
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Energetická náročnost (PENB):</strong> lepší energetická třída =
              vyšší cena a snazší financování
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Balkon nebo terasa:</strong> výrazný plus faktor u kupujících
              rodin
            </li>
            <li style={liStyle}>
              <strong style={{ color: C.heading }}>Parkovací místo nebo garáž:</strong> v centru navyšuje cenu o
              desítky tisíc Kč
            </li>
          </ul>
        </Section>

        <div
          style={{
            background: C.gold,
            color: '#fff',
            padding: 28,
            borderRadius: 10,
            margin: '48px 0',
            boxShadow: '0 10px 30px hsl(220 100% 32% / 0.25)',
          }}
        >
          <div
            style={{
              fontFamily: fontLabel,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'hsl(220 100% 85%)',
              marginBottom: 16,
            }}
          >
            KLÍČOVÁ ZJIŠTĚNÍ
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Ceny bytů v Příbrami se pohybují v rozmezí 60 000–100 000 Kč/m²',
              'Centrum a Březové Hory (Příbram I–IV, VI): 70 000–100 000 Kč/m²',
              'Sídliště (Příbram V, VII, VIII): 60 000–90 000 Kč/m²',
              'Novostavby v Příbrami startují kolem 130 000 Kč/m²',
              'Praha začíná na 140 000 Kč/m² — Příbram je výrazně dostupnější',
              'Hlavní vliv na cenu má velikost a stav bytu, nikoli jen lokalita',
            ].map((t) => (
              <li
                key={t}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '8px 0',
                  fontSize: 16,
                  lineHeight: 1.55,
                }}
              >
                <Check
                  size={20}
                  strokeWidth={2.5}
                  style={{ color: '#fff', flexShrink: 0, marginTop: 3 }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <Section title="Často kladené otázky">
          <div style={{ marginTop: 8 }}>
            {faqItems.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      padding: '20px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: fontHeading,
                      fontWeight: 600,
                      fontSize: 19,
                      color: open ? C.gold : C.heading,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      size={22}
                      style={{
                        flexShrink: 0,
                        transition: 'transform 0.25s ease',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: open ? C.gold : C.mutedText,
                      }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: open ? 600 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease, opacity 0.3s ease',
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <p
                      style={{
                        padding: '0 4px 22px',
                        margin: 0,
                        color: C.text,
                        fontSize: 16.5,
                        lineHeight: 1.7,
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </article>

      <section style={{ padding: '8px 24px 72px' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            background: 'hsl(0 0% 96%)',
            borderRadius: 20,
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <img
            src={radekPhoto}
            alt="Radek Větrovský – realitní makléř Příbram"
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto 22px',
              boxShadow: '0 8px 22px hsl(220 100% 32% / 0.18)',
            }}
          />
          <h2
            style={{
              fontFamily: fontHeading,
              fontWeight: 700,
              color: C.heading,
              fontSize: 'clamp(24px, 3vw, 30px)',
              lineHeight: 1.25,
              margin: '0 0 14px',
              letterSpacing: '-0.01em',
            }}
          >
            Zjistěte, kolik skutečně stojí vaše nemovitost v Příbrami.
          </h2>
          <p
            style={{
              fontFamily: fontBody,
              color: C.mutedText,
              fontSize: 17,
              lineHeight: 1.65,
              maxWidth: 600,
              margin: '0 auto 28px',
            }}
          >
            Radek Větrovský provede bezplatné tržní ocenění podložené aktuálními daty z příbramského trhu. Výsledek
            dostanete do 48 hodin a bez závazků.
          </p>
          <Link
            to="/odhad-nemovitosti"
            style={{
              background: C.gold,
              color: '#fff',
              padding: '15px 32px',
              borderRadius: 8,
              fontFamily: fontLabel,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              boxShadow: '0 6px 18px hsl(220 100% 32% / 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = C.goldDark;
              e.currentTarget.style.boxShadow = '0 10px 24px hsl(220 100% 32% / 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = C.gold;
              e.currentTarget.style.boxShadow = '0 6px 18px hsl(220 100% 32% / 0.3)';
            }}
          >
            Chci bezplatné ocenění
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Zpět nahoru"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: C.gold,
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 22px hsl(220 100% 32% / 0.45)',
            zIndex: 50,
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2
      style={{
        fontFamily: fontHeading,
        fontWeight: 700,
        color: C.heading,
        fontSize: 28,
        lineHeight: 1.25,
        margin: '0 0 18px',
        letterSpacing: '-0.005em',
      }}
    >
      {title}
    </h2>
    <div style={{ fontSize: 17, lineHeight: 1.75, color: C.text }}>{children}</div>
  </section>
);

const ChartCard = ({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) => (
  <figure
    style={{
      margin: '28px 0 12px',
      background: '#fff',
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: '24px 20px 20px',
      boxShadow: '0 2px 10px hsl(220 100% 32% / 0.06)',
    }}
  >
    <figcaption
      style={{
        fontFamily: fontHeading,
        fontWeight: 600,
        color: C.heading,
        fontSize: 17,
        marginBottom: 18,
      }}
    >
      {title}
    </figcaption>
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>{children}</div>
    <p
      style={{
        fontFamily: fontLabel,
        fontSize: 12.5,
        color: C.mutedText,
        margin: '14px 0 0',
        fontStyle: 'italic',
      }}
    >
      {caption}
    </p>
  </figure>
);

const ulStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '16px 0',
};

const liStyle: React.CSSProperties = {
  position: 'relative',
  paddingLeft: 22,
  marginBottom: 12,
  lineHeight: 1.65,
};

const styleTag = (
  <style>{`
    article ul li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 8px;
      height: 8px;
      background: ${C.gold};
      border-radius: 2px;
      transform: rotate(45deg);
    }
    article a { color: ${C.gold}; text-decoration: underline; text-underline-offset: 3px; }
    article a:hover { color: ${C.goldDark}; }
    @media (max-width: 600px) {
      article { font-size: 16.5px !important; }
    }
  `}</style>
);

const Wrapped = () => (
  <>
    {styleTag}
    <BlogCenovaMapaPribram />
  </>
);

export default Wrapped;
