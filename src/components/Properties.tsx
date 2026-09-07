import { ArrowRight, Clock, CheckCircle2, ShieldCheck, TrendingUp, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import { useNavigate } from 'react-router-dom';
import bytImage from '@/assets/property-byt-pribram.webp';
import dumBohutinImage from '@/assets/property-dum-bohutin.webp';
import dumTynecImage from '@/assets/property-dum-tynec-nad-sazavou.webp';
import bytBrodskaImage from '@/assets/property-byt-brodska-pribram.webp';
import bytCertakImage from '@/assets/property-byt-certak-pribram.jpg';

// Featured flagship transaction
const featuredProperty = {
  title: 'Byt 3+kk, nám. 17. listopadu',
  location: 'Příbram VII',
  size: '61 m²',
  resultBadge: 'PRODÁNO ZA 18 DNÍ',
  resultHighlight: '100 % nabídkové ceny · 14 prohlídek',
  description:
    'Kompletní příprava, profesionální homestaging a videoprohlídka zajistily rychlý prodej za plnou inzerovanou cenu bez jediné slevy.',
  stats: ['100 % z inzerované ceny', '14 osobních prohlídek', '3 vážní zájemci'],
  image: bytImage,
};

// Secondary featured property
const secondaryProperty = {
  title: 'Rodinný dům, Bohutín',
  location: 'okres Příbram',
  size: '94 m² · Pozemek 820 m²',
  resultBadge: 'PRODÁNO ZA 34 DNÍ',
  resultHighlight: 'Cílená online kampaň · Bezpečné předání',
  description:
    'Efektivní prezentace na sociálních sítích přilákala rodinu hledající klidné bydlení u Brd. Zajištěn kompletní právní servis a úschova.',
  stats: ['Dosažena tržní cena', 'Právní garance RE/MAX', 'Předání na klíč'],
  image: dumBohutinImage,
};

// 3 Curated properties for the portfolio row
const portfolioProperties = [
  {
    id: 'brodska',
    title: 'Byt 2+kk, Brodská',
    location: 'Příbram',
    size: '54 m²',
    resultBadge: 'PRODÁNO ZA 12 DNÍ',
    resultHighlight: 'Privátní databáze kupujících',
    description:
      'Kupující byl nalezen z interní databáze čekajících klientů ještě před spuštěním masivní veřejné inzerce.',
    image: bytBrodskaImage,
  },
  {
    id: 'tynec',
    title: 'Rodinný dům, Týnec nad Sázavou',
    location: 'Středočeský kraj',
    size: '234 m² · Pozemek 1 150 m²',
    resultBadge: 'PRODÁNO ZA 42 DNÍ',
    resultHighlight: 'Dronové záběry & 3D virtuální scan',
    description:
      'Letecké video a virtuální prohlídka oslovily kupce z Prahy, kteří ocenili detailní přehled o stavu nemovitosti ještě před prohlídkou.',
    image: dumTynecImage,
  },
  {
    id: 'certak',
    title: 'Byt 2+1, Pod Čertovým pahorkem',
    location: 'Příbram',
    size: '58 m²',
    resultBadge: 'PRODÁNO ZA 21 DNÍ',
    resultHighlight: '100 % servis od A do Z',
    description:
      'Díky správně nastavené cenové strategii a kvalitním fotografiím proběhl celý obchod hladce a bez zbytečných prodlev.',
    image: bytCertakImage,
  },
];

const metrics = [
  { icon: Building2, label: '100+ prodaných nemovitostí' },
  { icon: Clock, label: 'Průměrně 21 dní do podpisu' },
  { icon: TrendingUp, label: '99,4 % z nabídkové ceny' },
  { icon: ShieldCheck, label: '100% právní garance RE/MAX' },
];

const Properties = () => {
  const navigate = useNavigate();


  const goToProdano = () => {
    window.scrollTo(0, 0);
    navigate('/prodano');
  };

  return (
    <section id="properties" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Editorial Asymmetric Header */}
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 md:mb-14 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                03 — PRODANÉ NEMOVITOSTI
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Nemovitosti, které jsem <br className="hidden sm:block" />
              <span className="text-foreground">úspěšně prodal</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Za každou z nich stojí konkrétní strategie, kvalitní prezentace a dotažený prodej.
              Reference, které mluví za mě lépe než slova.
            </p>
          </div>
        </Reveal>

        {/* Track record / Key metrics bar */}
        <Reveal group staggerChildren={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 md:mb-14">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <RevealItem
                variant="fadeUp"
                key={idx}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border border-border/80 bg-muted/40 backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                  {metric.label}
                </span>
              </RevealItem>
            );
          })}
        </Reveal>

        {/* Row 1: Featured Flagship Case (7 cols) + Secondary High-Impact Case (5 cols) */}
        <Reveal group staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* ═══════ Featured Large Card ═══════ */}
          <RevealItem
            variant="fadeUp"
            onClick={goToProdano}
            className="group cursor-pointer flex flex-col bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/80 hover:border-secondary/30 hover:shadow-2xl transition-all duration-500 lg:col-span-7"
          >
            {/* Image with integrated PRODÁNO stamp */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
              <img
                src={featuredProperty.image}
                alt={`${featuredProperty.title} – prodáno realitním makléřem Radkem Větrovským`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Content below photo */}
            <div className="flex flex-col flex-1 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredProperty.resultBadge}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {featuredProperty.location} · {featuredProperty.size}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-syne text-foreground group-hover:text-secondary transition-colors mb-2 leading-tight">
                {featuredProperty.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {featuredProperty.description}
              </p>

              {/* Proof points */}
              <div className="mt-auto pt-4 border-t border-border/60 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-[13px] text-foreground/85 font-medium">
                {featuredProperty.stats.map((stat, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* ═══════ Secondary Card ═══════ */}
          <RevealItem
            variant="fadeUp"
            onClick={goToProdano}
            className="group cursor-pointer flex flex-col bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/80 hover:border-secondary/30 hover:shadow-2xl transition-all duration-500 lg:col-span-5"
          >
            {/* Image with integrated PRODÁNO stamp */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
              <img
                src={secondaryProperty.image}
                alt={`${secondaryProperty.title} – prodáno realitním makléřem Radkem Větrovským`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Content below photo */}
            <div className="flex flex-col flex-1 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  <Clock className="w-3.5 h-3.5" />
                  {secondaryProperty.resultBadge}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {secondaryProperty.location}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-syne text-foreground group-hover:text-secondary transition-colors mb-2 leading-tight">
                {secondaryProperty.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {secondaryProperty.description}
              </p>

              {/* Proof points */}
              <div className="mt-auto pt-4 border-t border-border/60 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-[13px] text-foreground/85 font-medium">
                {secondaryProperty.stats.map((stat, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
        </Reveal>

        {/* Row 2: 3-Column Portfolio Grid (Option B - Bespoke, High Breathing Room) */}
        <Reveal group staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16">
          {portfolioProperties.map((prop) => (
            <RevealItem
              variant="fadeUp"
              key={prop.id}
              onClick={goToProdano}
              className="group cursor-pointer flex flex-col bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/80 hover:border-secondary/30 hover:shadow-xl transition-all duration-500"
            >
              {/* Image with integrated PRODÁNO stamp */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
                <img
                  src={prop.image}
                  alt={`${prop.title} – ${prop.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Details & Results */}
              <div className="flex flex-col flex-1 pt-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full border border-secondary/20">
                    {prop.resultBadge}
                  </span>
                  <span className="text-xs text-muted-foreground">{prop.size}</span>
                </div>

                <h3 className="text-lg font-bold font-syne text-foreground group-hover:text-secondary transition-colors mb-2 leading-tight">
                  {prop.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {prop.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        {/* Secondary Link to All Properties */}
        <Reveal variant="fade" className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={goToProdano}
            className="group text-base border-2 hover:border-secondary hover:text-secondary px-8 h-12 rounded-xl transition-all"
          >
            Zobrazit všechny prodané nemovitosti
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default Properties;
