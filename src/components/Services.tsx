import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import { useNavigate } from 'react-router-dom';
import serviceProdej from '@/assets/service-prodej.webp.asset.json';
import servicePronajem from '@/assets/service-pronajem.webp.asset.json';
import serviceKoupe from '@/assets/service-koupe.webp.asset.json';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      num: '01',
      tag: 'PRODEJ',
      title: 'Prodej nemovitostí',
      description:
        'Kompletní servis při prodeji vaší nemovitosti včetně profesionálního marketingu, videoprohlídek a home stagingu.',
      features: ['Profesionální fotografie', 'Virtuální prohlídky', 'Inzerce na top portálech'],
      image: serviceProdej.url,
      path: '/sluzby/prodej-nemovitosti-pribram',
    },
    {
      num: '02',
      tag: 'PRONÁJEM',
      title: 'Pronájem nemovitostí',
      description:
        'Najdeme vám prověřené a spolehlivé nájemníky a postaráme se o kompletní smluvní dokumentaci i předání.',
      features: ['Prověření nájemníků', 'Právní zajištění', 'Správa nemovitosti'],
      image: servicePronajem.url,
      path: '/sluzby/pronajem-nemovitosti-pribram',
    },
    {
      num: '03',
      tag: 'KOUPĚ',
      title: 'Koupě nemovitosti',
      description:
        'Pomůžeme vám najít vysněný domov nebo bezpečnou investici s důkladnou prověrkou technického i právního stavu.',
      features: ['Analýza trhu', 'Vyjednávání ceny', 'Due diligence a prověrka'],
      image: serviceKoupe.url,
      path: '/sluzby/koupe-nemovitosti-pribram',
    },
  ];


  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Editorial Asymmetric Header */}
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                01 — MOJE SLUŽBY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Kompletní <br className="hidden sm:block" />
              realitní servis
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Ať už prodáváte, kupujete nebo hledáte ideální pronájem, postarám se o hladký a transparentní průběh celého procesu od prvního odhadu až po předání klíčů.
            </p>
          </div>
        </Reveal>

        {/* 3 Services Grid - Clean Editorial Photography Cards */}
        <Reveal group staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <RevealItem
              variant="fadeUp"
              key={service.title}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(service.path);
              }}
              className="group cursor-pointer flex flex-col bg-card rounded-2xl md:rounded-3xl p-3 sm:p-4 border border-border/80 hover:border-secondary/30 hover:shadow-xl transition-all duration-500"
            >
              {/* Clean, un-obscured photo container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-[75%_center] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Clean glass pill badge */}
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-foreground border border-border/40 shadow-sm">
                  {service.num} — {service.tag}
                </div>
              </div>

              {/* Service Details & Circular Action Button */}
              <div className="flex flex-col flex-1 p-3 sm:p-4 pt-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-foreground group-hover:text-secondary transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full border border-border bg-muted/60 text-foreground group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Highlights */}
                <div className="mt-auto pt-4 border-t border-border/60 space-y-2.5">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
