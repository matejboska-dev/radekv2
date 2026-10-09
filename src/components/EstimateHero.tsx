import { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import radekPhoto from '@/assets/radek-vetrovsky.webp';
import bgPhoto from '@/assets/pribram-city.jpg';

type EstimateHeroProps = {
  onCta: () => void;
};

/**
 * Hero podstránky /odhad-nemovitosti. Stejná kostra jako hero na homepage
 * (HeroDesktop / HeroMobile): celá obrazovka, fotka Příbrami pod modrošedým překryvem,
 * obří Syne nadpis za postavou, Radek vpravo, text vlevo dole a pill CTA vedle něj.
 * Místo jména je velký nadpis stránky, ať zůstane jediné h1.
 */
const EstimateHero = ({ onCta }: EstimateHeroProps) => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      if (!prefersReducedMotion()) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from(q('[data-hero="bg"]'), { scale: 1.12, duration: 1.6, ease: 'power2.out' })
          .from(q('[data-hero="name"]'), { opacity: 0, duration: 1.2 }, 0.3)
          .from(q('[data-hero="portrait"]'), { opacity: 0, scale: 0.94, yPercent: 4, duration: 1.1 }, 0.15)
          .from(q('[data-hero="copy"] > *'), { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 }, 0.5)
          .from(q('[data-hero="cta"]'), { opacity: 0, y: 20, duration: 0.7 }, 0.8);

        gsap.to(q('[data-hero="bg"]'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('[data-hero="portrait"], [data-hero="name"], [data-hero="copy"], [data-hero="cta"]'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden bg-primary lg:h-screen">
      {/* ═══════ LAYER 1: Full-bleed city background with parallax ═══════ */}
      <div data-hero="bg" className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
        <img
          src={bgPhoto}
          alt=""
          className="h-full w-full object-cover object-[center_40%] lg:h-[115%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/60 lg:bg-primary/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(20,42,59,0.7)_100%)] lg:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,42,59,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary via-primary/85 to-transparent lg:h-48 lg:via-primary/80" />
      </div>

      {/* ═══════ LAYER 2: Obří nadpis stránky (h1), vlevo, ZA Radkem ═══════ */}
      <div
        data-hero="name"
        className="pointer-events-none absolute inset-0 z-10 flex select-none flex-col items-start justify-start overflow-hidden px-5 pt-28 sm:pt-32 lg:justify-center lg:pt-0 text-left sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16"
      >
        <div className="lg:-translate-y-12 xl:-translate-y-14">
          <span className="mb-3 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
            Odhad zdarma a nezávazně
          </span>
          <h1 className="flex flex-col items-start font-syne font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="text-[2.3rem] sm:text-[3.2rem] lg:text-[4.2rem] xl:text-[5.4rem] 2xl:text-[6.4rem]">Odhad</span>
            <span className="text-[1.9rem] sm:text-[2.6rem] lg:text-[3.4rem] xl:text-[4.4rem] 2xl:text-[5.2rem]">nemovitosti</span>
            <span className="text-[2.3rem] sm:text-[3.2rem] lg:text-[4.2rem] xl:text-[5.4rem] 2xl:text-[6.4rem]">zdarma</span>
          </h1>
        </div>
      </div>

      {/* ═══════ LAYER 3: Radek – na mobilu na střed, na desktopu vpravo, PŘED nadpisem ═══════ */}
      <div
        data-hero="portrait"
        className="pointer-events-none absolute inset-x-0 bottom-[32svh] z-20 flex justify-center lg:inset-x-auto lg:inset-y-0 lg:bottom-auto lg:right-0 lg:top-20 lg:items-end lg:justify-end lg:pr-12 xl:pr-20 2xl:pr-28"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 h-[80%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.55)_0%,transparent_68%)] blur-3xl lg:-right-[30%] lg:h-[85%] lg:w-[170%] lg:bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.7)_0%,transparent_70%)]"
        />
        {/* Tmavé tričko by na tmavém pozadí splynulo, proto světlejší záře za postavou */}
        <div
          aria-hidden="true"
          className="absolute right-[15%] top-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_60%)] blur-xl lg:right-[8%] lg:h-[26rem] lg:w-[26rem] lg:bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_65%)] lg:blur-2xl xl:right-[14%]"
        />
        <img
          src={radekPhoto}
          alt="Radek Větrovský, certifikovaný realitní makléř RE/MAX Příbram"
          width={959}
          height={1438}
          loading="eager"
          className="relative h-[38svh] max-h-[330px] w-auto object-contain object-bottom drop-shadow-[0_0_22px_rgba(255,255,255,0.35)] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] lg:h-[74vh] lg:max-h-full lg:[mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)] 2xl:h-[78vh]"
        />
      </div>

      {/* Tmavý přechod pod textem na mobilu, ať je bílý text čitelný přes postavu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[52%] bg-gradient-to-t from-primary from-45% via-primary/85 via-70% to-transparent lg:hidden"
      />

      {/* ═══════ LAYER 4: Text vlevo dole + CTA vedle něj ═══════ */}
      <div className="relative z-30 flex min-h-[100svh] flex-col justify-end lg:h-screen">
        <div className="w-full px-5 pb-24 sm:px-8 md:px-10 lg:px-12 lg:pb-10 xl:px-14 xl:pb-14 2xl:px-16">
          <div className="flex flex-col justify-start gap-5 lg:flex-row lg:items-end xl:gap-8 2xl:gap-10">
            <div data-hero="copy" className="max-w-md xl:max-w-lg 2xl:max-w-xl">
              <p className="font-display leading-[0.98] tracking-[-0.03em] text-white">
                <span className="block text-[1.6rem] font-normal sm:text-4xl xl:text-[2.4rem] 2xl:text-[2.9rem]">
                  v <span className="font-bold">Příbrami</span> a okolí
                </span>
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm xl:mt-4">
                <strong className="font-bold text-white">Zjistěte skutečnou hodnotu Vaší nemovitosti.</strong>{' '}
                Odhad připravuji na základě reálných dat, aktuální situace na trhu, stavu nemovitosti
                a osobní znalosti lokality. Ozvu se Vám do 24 hodin.
              </p>
            </div>

            <div data-hero="cta" className="flex shrink-0 flex-col items-start gap-3 pb-1 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
              <button
                type="button"
                onClick={onCta}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-secondary py-3 pl-5 pr-3.5 text-sm font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:py-3.5 lg:pl-6 lg:pr-4"
              >
                Chci odhad zdarma
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 lg:h-9 lg:w-9">
                  <ArrowRight className="h-3.5 w-3.5 text-white lg:h-4 lg:w-4" />
                </span>
              </button>
              <a
                href="tel:+420721855854"
                className="hidden items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:inline-flex"
              >
                <Phone className="h-4 w-4" />
                +420 721 855 854
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateHero;
