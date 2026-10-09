import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/anim/Reveal';
import radekPhoto from '@/assets/radek-odhad-desk.webp';
import bgPhoto from '@/assets/pribram-city.jpg';

type EstimateHeroProps = {
  onCta: () => void;
};

/**
 * Hero podstránky /odhad-nemovitosti. Stejný vizuální jazyk jako hero na homepage
 * (fotka Příbrami pod modrošedým překryvem, Syne nadpis, Radek vpravo, pill CTA),
 * jen nižší, aby formulář nebyl daleko.
 */
const EstimateHero = ({ onCta }: EstimateHeroProps) => {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-white">
      {/* Pozadí: město s překryvem, stejné vrstvy jako na homepage */}
      <div className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
        <img src={bgPhoto} alt="" className="h-full w-full object-cover object-[center_40%]" loading="eager" />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,42,59,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      </div>

      {/* DESKTOP PHOTO: Pinned to the right edge of the website, touching right side */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:flex justify-end items-end">
        <Reveal variant="fade" delay={0.15} className="relative flex justify-end items-end">
          <div
            aria-hidden="true"
            className="absolute -right-[10%] bottom-0 h-[85%] w-[110%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.7)_0%,transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute right-[12%] top-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_65%)] blur-2xl"
          />
          <img
            src={radekPhoto}
            alt="Radek Větrovský, certifikovaný realitní makléř RE/MAX Příbram"
            width={1024}
            height={682}
            loading="eager"
            className="relative h-auto lg:h-[27rem] xl:h-[32rem] 2xl:h-[36rem] w-auto max-w-none object-contain object-bottom drop-shadow-[0_0_18px_rgba(255,255,255,0.2)] [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_100%)]"
          />
        </Reveal>
      </div>

      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-end gap-4 px-4 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-36">
        <Reveal variant="fadeUp" className="min-w-0 pb-6 lg:col-span-7 xl:col-span-6 lg:pb-16">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            Odhad zdarma a nezávazně
          </span>
          <h1 className="font-syne text-[1.85rem] font-extrabold uppercase leading-[1.02] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[2.9rem] xl:text-6xl 2xl:text-7xl">
            <span className="block">Odhad</span>
            <span className="block">nemovitosti</span>
            <span className="block">zdarma</span>
          </h1>
          <p className="mt-5 font-display text-xl leading-snug tracking-[-0.02em] text-white sm:text-2xl">
            v Příbrami a okolí
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            <strong className="font-bold text-white">Zjistěte skutečnou hodnotu Vaší nemovitosti.</strong>{' '}
            Odhad připravuji na základě reálných dat, aktuální situace na trhu, stavu nemovitosti
            a osobní znalosti lokality. Ozvu se Vám do 24 hodin.
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onCta}
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-secondary py-3.5 pl-6 pr-4 text-sm font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Chci odhad zdarma
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </button>
            <a
              href="tel:+420721855854"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Phone className="h-4 w-4" />
              +420 721 855 854
            </a>
          </div>
        </Reveal>

        {/* MOBILE PHOTO: Under content, touching left and right edges */}
        <Reveal
          variant="fade"
          delay={0.15}
          className="relative flex lg:hidden min-w-0 justify-center self-end -mx-4 sm:-mx-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)]"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-0 h-[85%] w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.7)_0%,transparent_70%)] blur-3xl"
          />
          <img
            src={radekPhoto}
            alt="Radek Větrovský, certifikovaný realitní makléř RE/MAX Příbram"
            width={1024}
            height={682}
            loading="eager"
            className="relative h-auto w-full max-w-none object-contain object-bottom drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]"
          />
        </Reveal>

        {/* Spacer for desktop grid to preserve height */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" aria-hidden="true" />
      </div>
    </section>
  );
};

export default EstimateHero;
