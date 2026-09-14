import { Building2, Clock, TrendingUp, ShieldCheck } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';

/**
 * Pás konverzních čísel hned pod hero – nejsilnější argument makléře
 * (track record) patří nad ohyb, ne až do 3. sekce.
 * Čísla jsou převzatá 1:1 ze sekce „Prodané nemovitosti", aby web říkal
 * všude to samé.
 */

const stats = [
  { icon: Building2, value: '20+', label: 'prodaných nemovitostí za rok 2026' },
  { icon: Clock, value: '21 dní', label: 'průměrně do podpisu' },
  { icon: TrendingUp, value: '99,4 %', label: 'z nabídkové ceny' },
  { icon: ShieldCheck, value: '100%', label: 'právní garance RE/MAX' },
];

const StatsBar = () => {
  return (
    <section aria-label="Výsledky a hodnocení" className="bg-background border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        <Reveal
          group
          staggerChildren={0.07}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <RevealItem
              variant="fadeUp"
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/40 p-3 sm:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="font-syne text-lg font-extrabold text-foreground sm:text-xl">
                  {value}
                </div>
                <div className="text-[11px] text-muted-foreground sm:text-xs">{label}</div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default StatsBar;
