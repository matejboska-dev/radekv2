import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import { useNavigate } from 'react-router-dom';

const agentFeatures = [
  'Přesné vyhodnocení trhu a lokalit v Příbrami a okolí',
  'Zohlednění technického stavu a provedených rekonstrukcí',
  'Reálná prodejní cena, která obstojí při vyjednávání',
  'Podklady vhodné pro úspěšný prodej, dědictví i banku',
];

const onlineFeatures = [
  'Průměrné ceny bez individuálního posouzení dané nemovitosti',
  'Nezohledňuje technický stav, dispozice ani výhled',
  'Velké odchylky a zkreslení skutečné tržní hodnoty',
  'Slabá vyjednávací pozice a riziko zbytečné ztráty',
];

const EstimateComparison = () => {
  const navigate = useNavigate();

  return (
    <section id="odhad-srovnani" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Srovnání přesnosti — Bezplatná služba
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Makléř <br className="hidden sm:block" />
              vs. online kalkulačka
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Odhad připravený na základě reálných tržních transakcí, aktuální poptávky, technického stavu a osobní znalosti lokality.
            </p>
          </div>
        </Reveal>

        {/* 2 Comparison Cards */}
        <Reveal group staggerChildren={0.15} className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Makléř Side (Hero / Recommended) */}
          <RevealItem variant="fadeUp" className="rounded-2xl md:rounded-3xl border-2 border-secondary/30 bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
              Doporučený postup
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-foreground leading-tight">
                    Odhad od makléře
                  </h3>
                  <p className="text-xs text-muted-foreground">Osobní přístup &amp; znalost lokality</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {agentFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
              className="group inline-flex items-center justify-center gap-3 sm:gap-4 w-full rounded-full bg-secondary hover:bg-secondary/90 pl-7 pr-3 h-12 sm:h-14 text-xs sm:text-sm font-syne font-bold uppercase tracking-wider text-white shadow-xl shadow-secondary/25 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span>Chci odhad zdarma</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-secondary shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </RevealItem>

          {/* Online Kalkulačka Side (Risks / Neutral) */}
          <RevealItem variant="fadeUp" className="rounded-2xl md:rounded-3xl border border-border bg-muted/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-foreground leading-tight">
                    Online kalkulačka
                  </h3>
                  <p className="text-xs text-muted-foreground">Automatický průměr z internetu</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-6">
                {onlineFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground leading-snug">
                    <XCircle className="w-4 h-4 text-destructive/70 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-muted-foreground/80 italic pt-4 border-t border-border/60">
              Výpočet na základě obecných cenových map, bez ohledu na stav nemovitosti a konkrétní poptávku v lokalitě.
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
};

export default EstimateComparison;
