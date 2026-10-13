import type { MouseEvent } from 'react';
import { ArrowRight, Clock, ShieldCheck, TrendingUp, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import { useNavigate } from 'react-router-dom';
import bytMilinskaImage from '@/assets/property-byt-milinska-pribram.webp';
import dumBohutinImage from '@/assets/property-dum-bohutin.webp';
import dumTynecImage from '@/assets/property-dum-tynec-nad-sazavou.webp';
import bytSachetniImage from '@/assets/property-byt-sachetni-pribram.webp';
import bytCertakImage from '@/assets/property-byt-certak-pribram.jpg';

// Featured flagship transaction
const featuredProperty = {
  title: 'Byt 3+1, Milínská',
  location: 'Příbram',
  size: '77 m²',
  resultBadge: 'PRODÁNO ZA 37 DNÍ',
  description:
    'Světlý byt 3+1 s útulným zařízením. Kvalitní fotografie a správně nastavená cena přivedly kupce za pouhých pár týdnů.',
  image: bytMilinskaImage,
};

// Secondary featured property
const secondaryProperty = {
  title: 'Rodinný dům, Bohutín',
  location: 'okres Příbram',
  size: '94 m² · Pozemek 820 m²',
  resultBadge: 'PRODÁNO ZA 19 DNÍ',
  description:
    'Efektivní prezentace na sociálních sítích přilákala rodinu hledající klidné bydlení u Brd. Zajištěn kompletní právní servis a úschova.',
  image: dumBohutinImage,
};

// 3 Curated properties for the portfolio row
const portfolioProperties = [
  {
    id: 'sachetni',
    title: 'Byt 3+kk, Šachetní',
    location: 'Příbram',
    size: '65 m²',
    resultBadge: 'PRODÁNO ZA 8 DNÍ',
    description:
      'Po kompletní rekonstrukci s moderní koupelnou se byt prodal během několika dní a bez zbytečných prodlev.',
    image: bytSachetniImage,
  },
  {
    id: 'tynec',
    title: 'Rodinný dům, Týnec nad Sázavou',
    location: 'Středočeský kraj',
    size: '234 m² · Pozemek 1 150 m²',
    resultBadge: 'PRODÁNO ZA 28 DNÍ',
    description:
      'Letecké video a virtuální prohlídka oslovily kupce z Prahy, kteří ocenili detailní přehled o stavu nemovitosti ještě před prohlídkou.',
    image: dumTynecImage,
  },
  {
    id: 'certak',
    title: 'Byt 2+1, Pod Čertovým pahorkem',
    location: 'Příbram',
    size: '58 m²',
    resultBadge: 'PRODÁNO ZA 25 DNÍ',
    description:
      'Díky správně nastavené cenové strategii a kvalitním fotografiím proběhl celý obchod hladce a bez zbytečných prodlev.',
    image: bytCertakImage,
  },
];

const metrics = [
  { icon: Building2, label: '20+ prodaných nemovitostí za rok 2026' },
  { icon: Clock, label: 'Průměrně 21 dní do podpisu' },
  { icon: TrendingUp, label: '99,4 % z nabídkové ceny' },
  { icon: ShieldCheck, label: '100% právní garance RE/MAX' },
];

const Properties = () => {
  const navigate = useNavigate();


  const goToProdano = (event: MouseEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo(0, 0);
    navigate('/prodano');
  };

  return (
    <section id="properties" className="scroll-mt-24 py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Editorial Asymmetric Header */}
        <Reveal className="grid lg:grid-cols-12 gap-5 lg:gap-12 items-end mb-8 sm:mb-12 md:mb-14 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                04 — PRODANÉ NEMOVITOSTI
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.1] sm:leading-[1.05]">
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

        {/* Row 1: Featured Flagship Case (7 cols) + Secondary High-Impact Case (5 cols) */}
        <Reveal group staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* ═══════ Featured Large Card ═══════ */}
          <RevealItem
            variant="fadeUp"
            as="a"
            href="/prodano"
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

              <p className="text-sm text-muted-foreground leading-relaxed">
                {featuredProperty.description}
              </p>
            </div>
          </RevealItem>

          {/* ═══════ Secondary Card ═══════ */}
          <RevealItem
            variant="fadeUp"
            as="a"
            href="/prodano"
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

              <p className="text-sm text-muted-foreground leading-relaxed">
                {secondaryProperty.description}
              </p>
            </div>
          </RevealItem>
        </Reveal>

        {/* Row 2: 3-Column Portfolio Grid (Option B - Bespoke, High Breathing Room) */}
        <Reveal group staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16">
          {portfolioProperties.map((prop) => (
            <RevealItem
              variant="fadeUp"
              key={prop.id}
              as="a"
              href="/prodano"
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
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full border border-secondary/20">
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
            asChild
            variant="outline"
            size="lg"
            className="group text-base border-2 hover:border-secondary hover:text-secondary h-auto min-h-12 w-full max-w-sm whitespace-normal px-6 py-3 text-center sm:w-auto sm:max-w-none rounded-xl transition-all"
          >
            <a href="/prodano" onClick={goToProdano}>
              Zobrazit všechny prodané nemovitosti
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default Properties;
