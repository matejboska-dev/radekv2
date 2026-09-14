import { MapPin } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';

const areas = [
  {
    name: 'Příbram',
    population: '33 000 obyvatel',
    description: 'Přirozené centrum Podbrdska, známé hornickou historií a poutním místem Svatá Hora.',
  },
  {
    name: 'Dobříš',
    population: '8 900 obyvatel',
    description: 'Severovýchodně od Příbrami směrem na Prahu, láká na barokní zámek s parkem.',
  },
  {
    name: 'Sedlčany',
    population: '6 800 obyvatel',
    description: 'Východně od Příbrami v malebné krajině povodí Vltavy a Sedlčanska.',
  },
  {
    name: 'Rožmitál pod Třemšínem',
    population: '4 200 obyvatel',
    description: 'Jihozápadně od Příbrami, na okraji Brdských lesů.',
  },
  {
    name: 'Březnice',
    population: '3 500 obyvatel',
    description: 'Jižně od Příbrami, s historickým centrem a renesančním zámkem.',
  },
  {
    name: 'Sedlec-Prčice',
    population: '3 000 obyvatel',
    description: 'Na jihovýchodě okresu, známé jako „srdce Českého Meránu".',
  },
];

const ServiceAreas = () => {
  return (
    <section id="lokality" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 md:mb-14 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                LOKALITY, KTERÉ POKRÝVÁM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Příbram <br className="hidden sm:block" />
              a okolní města
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Místní trh znám do detailu – od centra Příbrami po okolní města a obce Podbrdska.
            </p>
          </div>
        </Reveal>

        <Reveal group staggerChildren={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {areas.map((area) => (
            <RevealItem
              variant="fadeUp"
              key={area.name}
              className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-syne text-foreground leading-tight">
                  {area.name}
                </h3>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                {area.population}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceAreas;
