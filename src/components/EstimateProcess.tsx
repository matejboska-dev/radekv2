import { ClipboardList, PhoneCall, BadgeCheck } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Vyplníte formulář',
    text: 'Stačí základní údaje o nemovitosti a Váš kontakt. Ostatní doladíme společně.',
  },
  {
    num: '02',
    icon: PhoneCall,
    title: 'Ozvu se Vám do 24 hodin',
    text: 'Osobně se Vám ozvu a doptám se na to, co formulář nezachytí.',
  },
  {
    num: '03',
    icon: BadgeCheck,
    title: 'Dostanete reálný odhad',
    text: 'Posoudím technický stav, lokalitu i aktuální poptávku. Odhad je zdarma a nezávazný.',
  },
];

const EstimateProcess = () => {
  return (
    <section id="postup" className="bg-background py-12 sm:py-16 md:py-24 lg:py-28 scroll-mt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 grid items-end gap-6 border-b border-border/50 pb-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Jak to probíhá</span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.1] sm:leading-[1.05] tracking-tight text-foreground">
              Tři kroky <br className="hidden sm:block" />
              k odhadu
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:pb-1">
              Tři jednoduché kroky. Bez závazků, bez poplatků a bez anonymních algoritmů.
            </p>
          </div>
        </Reveal>

        <Reveal group staggerChildren={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map(({ num, icon: Icon, title, text }) => (
            <RevealItem
              variant="fadeUp"
              key={num}
              className="flex flex-col rounded-2xl border border-border/80 bg-card p-5 sm:p-8 transition-all duration-500 hover:border-secondary/30 hover:shadow-xl md:rounded-3xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-syne text-4xl font-extrabold text-secondary/90">{num}</span>
              </div>
              <h3 className="font-syne text-xl font-bold leading-tight text-foreground sm:text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default EstimateProcess;
