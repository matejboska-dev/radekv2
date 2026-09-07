import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import radekPhoto from '@/assets/radek-vetrovsky.webp';
import bgPhoto from '@/assets/pribram-city.jpg';

const HeroMobile = () => {
  const navigate = useNavigate();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from(q('[data-hero="bg"]'), { scale: 1.1, duration: 1.4, ease: 'power2.out' })
        .from(q('[data-hero="name"]'), { opacity: 0, duration: 1 }, 0.25)
        .from(q('[data-hero="portrait"]'), { opacity: 0, scale: 0.95, duration: 0.9 }, 0.1)
        .from(q('[data-hero="copy"] > *'), { opacity: 0, y: 22, duration: 0.7, stagger: 0.12 }, 0.45);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden bg-primary">
      {/* ═══════ LAYER 1: Full-bleed city background ═══════ */}
      <div data-hero="bg" className="pointer-events-none absolute inset-0 -z-30">
        <img
          src={bgPhoto}
          alt="Příbram, město s historií"
          className="h-full w-full object-cover object-[center_40%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(20,42,59,0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary via-primary/85 to-transparent" />
      </div>

      {/* ═══════ LAYER 2: Giant name text — BEHIND Radek ═══════ */}
      <div
        data-hero="name"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center">
          <span className="font-display text-[4.5rem] font-bold leading-[0.85] tracking-[-0.04em] text-white/[0.07] sm:text-[6rem]">
            RADEK
          </span>
          <span className="font-display text-[4.5rem] font-bold leading-[0.85] tracking-[-0.04em] text-white/[0.07] sm:text-[6rem]">
            VĚTROVSKÝ
          </span>
        </div>
      </div>

      {/* ═══════ LAYER 3: Radek portrait — centered, IN FRONT of name ═══════ */}
      <div
        data-hero="portrait"
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 h-[80%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.55)_0%,transparent_68%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[15%] top-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_60%)] blur-xl"
        />
        <img
          src={radekPhoto}
          alt="Radek Větrovský, certifikovaný realitní makléř RE/MAX Příbram"
          className="relative h-[70svh] max-h-[580px] w-auto object-contain object-bottom drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] drop-shadow-[0_24px_50px_rgba(0,0,0,0.22)] [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
        />
      </div>

      {/* ═══════ LAYER 4: Content overlay — bottom text + CTA ═══════ */}
      <div className="relative z-30 flex min-h-[100svh] flex-col justify-end">
        <div data-hero="copy" className="px-5 pb-24">
          <h1 className="font-display text-white tracking-[-0.03em] leading-[1.02]">
            <span className="block text-[2rem] sm:text-4xl">
              <span className="font-normal">Realitní makléř</span>{' '}
              <span className="font-bold">Příbram</span>
            </span>
            <span className="block font-normal text-white text-base sm:text-xl mt-1 leading-snug">
              prodej a koupě nemovitostí bez starostí
            </span>
          </h1>

          <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/85 sm:text-sm">
            <strong className="font-bold text-white">
              Pomohu Vám prodat nebo koupit nemovitost v Příbrami a okolí.
            </strong>{' '}
            Od prvního odhadu až po podpis smlouvy se postarám o celý proces.
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
              className="group inline-flex items-center gap-3 rounded-full bg-secondary py-3 pl-5 pr-3.5 text-sm font-bold text-secondary-foreground shadow-xl shadow-secondary/30 backdrop-blur-md transition-all duration-300 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Zjistit cenu nemovitosti
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMobile;
