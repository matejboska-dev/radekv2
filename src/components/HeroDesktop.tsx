import { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import radekPhoto from '@/assets/radek-vetrovsky.webp';
import bgPhoto from '@/assets/pribram-city.jpg';

const HeroDesktop = () => {
  const navigate = useNavigate();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      if (!prefersReducedMotion()) {
        // ── Entrance timeline ──
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from(q('[data-hero="bg"]'), { scale: 1.12, duration: 1.6, ease: 'power2.out' })
          .from(q('[data-hero="name"]'), { opacity: 0, duration: 1.2 }, 0.3)
          .from(
            q('[data-hero="portrait"]'),
            { opacity: 0, scale: 0.94, yPercent: 4, duration: 1.1 },
            0.15,
          )
          .from(
            q('[data-hero="copy"] > *'),
            { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 },
            0.5,
          )
          .from(q('[data-hero="cta"]'), { opacity: 0, y: 20, duration: 0.7 }, 0.8);

        // ── Scroll parallax (scrub, plynulé přes Lenis) ──
        gsap.to(q('[data-hero="bg"]'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('[data-hero="portrait"]'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('[data-hero="name"]'), {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(q('[data-hero="copy"]'), {
          yPercent: -14,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate h-screen overflow-hidden bg-primary">
      {/* ═══════ LAYER 1: Full-bleed city background with parallax ═══════ */}
      <div data-hero="bg" className="pointer-events-none absolute inset-0 -z-30">
        <img
          src={bgPhoto}
          alt="Příbram, město s historií"
          className="h-[115%] w-full object-cover object-[center_40%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,42,59,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      </div>

      {/* ═══════ LAYER 2: Giant name text — BEHIND Radek for depth ═══════ */}
      <div
        data-hero="name"
        className="pointer-events-none absolute inset-0 z-10 select-none"
        aria-hidden="true"
      >
        <div className="absolute top-[32%] left-[10%] sm:left-[13%] xl:left-[16%] 2xl:left-[19%]">
          <span className="font-syne text-[3rem] font-extrabold leading-none tracking-[-0.03em] text-white/85 xl:text-[3.8rem] 2xl:text-[4.6rem]">
            RADEK
          </span>
        </div>
        <div className="absolute top-[46%] right-4 sm:right-8 xl:right-14 2xl:right-24 text-right">
          <span className="font-syne text-[2.5rem] font-extrabold leading-none tracking-[-0.02em] text-white/95 xl:text-[3.2rem] 2xl:text-[3.9rem] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            VĚTROVSKÝ
          </span>
        </div>
      </div>

      {/* ═══════ LAYER 3: Radek portrait — centered, IN FRONT of name text ═══════ */}
      <div
        data-hero="portrait"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-24 lg:top-28 z-20 flex justify-center items-end overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 h-[85%] w-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.7)_0%,transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[22%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_65%)] blur-2xl"
        />
        <img
          src={radekPhoto}
          alt="Radek Větrovský, certifikovaný realitní makléř RE/MAX Příbram"
          className="relative max-h-full h-[88vh] w-auto object-contain object-bottom drop-shadow-[0_16px_36px_rgba(0,0,0,0.45)] drop-shadow-[0_45px_85px_rgba(0,0,0,0.3)] [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
        />
      </div>

      {/* ═══════ LAYER 4: Content overlay — bottom left + bottom right CTA ═══════ */}
      <div className="relative z-30 flex h-screen flex-col justify-end">
        <div className="w-full px-6 pb-10 md:px-10 lg:px-12 xl:px-14 2xl:px-16 xl:pb-14">
          <div className="flex items-end justify-between gap-8">
            <div data-hero="copy" className="max-w-lg xl:max-w-xl">
              <h1 className="font-display text-white tracking-[-0.03em] leading-[0.98]">
                <span className="block text-[2.6rem] xl:text-[3.8rem] 2xl:text-[4.4rem]">
                  <span className="font-normal">Realitní makléř</span>{' '}
                  <span className="font-bold">Příbram</span>
                </span>
                <span className="block font-normal text-white text-[1.4rem] xl:text-[2rem] 2xl:text-[2.3rem] mt-1.5 leading-snug">
                  prodej a koupě nemovitostí bez starostí
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/85 xl:text-sm">
                <strong className="font-bold text-white">
                  Pomohu Vám prodat nebo koupit nemovitost v Příbrami a okolí.
                </strong>{' '}
                Od prvního odhadu až po podpis smlouvy se postarám o celý proces.
              </p>
            </div>

            <div data-hero="cta" className="flex shrink-0 flex-col items-stretch gap-3">
              <button
                type="button"
                onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-secondary py-3.5 pl-6 pr-4 text-sm font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all duration-300 hover:bg-secondary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Zjistit cenu nemovitosti
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </button>
              <a
                href="tel:+420721855854"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 py-3 px-6 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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

export default HeroDesktop;
