import { ArrowRight } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import award25 from '@/assets/award-25.svg';
import award8 from '@/assets/award-8.svg';
import radekAboutImage from '@/assets/radek-about.jpg';

const About = () => {
  const { count, ref: counterRef } = useAnimatedCounter(100);

  const benefits = [
    'Kompletní servis od A do Z',
    'Spolupráce s profesionálními designéry',
    'Individuální přístup',
    'Exkluzivní marketing nemovitostí',
  ];

  const scrollToContact = () => {
    const contactElement = document.querySelector('#contact-form') || document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-background text-foreground overflow-hidden isolate"
    >
      {/* ═══════ Ambient subtle dark navy lighting (like hero) ═══════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(20,42,59,0.06)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(20,42,59,0.05)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,42,59,0.04)_0%,transparent_70%)] blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Top Section Header: 02 tag + Editorial headline */}
        <Reveal className="mb-10 sm:mb-14 lg:mb-16">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-secondary mb-3 sm:mb-4">
            02 — O MNĚ & FILOZOFIE
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black leading-[1.05]">
            VÁŠ PARTNER<br />
            V REALITÁCH
          </h2>
        </Reveal>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* ═══════ LEFT COLUMN: Photograph with Overlay Capsule Badges ═══════ */}
          <Reveal variant="fromLeft" className="lg:col-span-7 relative">
            {/* Ambient occlusion glow behind photo (like in Hero) */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(20,42,59,0.1)_0%,transparent_70%)] blur-2xl -z-10 pointer-events-none"
            />

            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 bg-slate-900 group">
              <img
                src={radekAboutImage}
                alt="Radek Větrovský - realitní makléř"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Award Badges - Bottom Left Corner with low opacity */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2.5 sm:gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={award25}
                  alt="Certifikát 25 prodaných nemovitostí"
                  title="Certifikát 25 prodaných nemovitostí"
                  className="h-16 sm:h-[4.5rem] w-auto object-contain"
                />
                <img
                  src={award8}
                  alt="Certifikát 8 prodaných nemovitostí"
                  title="Certifikát 8 prodaných nemovitostí"
                  className="h-16 sm:h-[4.5rem] w-auto object-contain"
                />
              </div>
            </div>

            {/* Benefits listed under the photo */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/85 shadow-xs transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ═══════ RIGHT COLUMN: Editorial Copy, Stats, Awards & CTA ═══════ */}
          <Reveal variant="fromRight" delay={0.12} className="lg:col-span-5 flex flex-col justify-between">
            {/* Pure editorial text */}
            <div className="space-y-4 sm:space-y-5 text-foreground/80 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Jsem Radek Větrovský, realitní makléř působící v Příbrami a okolí pod renomovanou
                značkou RE/MAX. Specializuji se na prodej a pronájem bytů, domů a pozemků. Místní
                trh dokonale znám – ať už jde o centrum Příbrami, klidnější čtvrti, nebo okolní města
                a obce jako jsou Dobříš, Sedlčany, Rožmitál pod Třemšínem či Březnice.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                Každou nemovitost vnímám jako jedinečný příběh. Pro úspěšný prodej nestačí jen běžný
                inzerát – vyžaduje promyšlenou strategii, špičkový marketing a partnera, který hájí
                vaše zájmy od prvního setkání až po předání klíčů.
              </p>
            </div>

            {/* Pod textem: Stats & CTA */}
            <div className="mt-8 pt-6 sm:pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 sm:gap-6">
              {/* 100+ Klientů */}
              <div ref={counterRef} className="flex flex-col">
                <span className="font-syne text-3xl sm:text-4xl font-extrabold text-primary leading-none tracking-tight">
                  {count}+
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1 font-medium">
                  Spokojených klientů
                </span>
              </div>

              {/* CTA Pill Button */}
              <div>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-3 rounded-full bg-secondary hover:bg-secondary/90 pl-6 pr-2 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-secondary/25 transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <span>Nezávazná konzultace</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-secondary transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ═══════ BOTTOM: Full-Width Editorial Typographic Manifesto ═══════ */}
        <Reveal
          group
          staggerChildren={0.12}
          className="mt-16 sm:mt-24 lg:mt-32 pt-10 sm:pt-14 lg:pt-16 border-t border-border"
        >
          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <RevealItem as="p" className="font-syne text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.65rem] text-muted-foreground/75 uppercase leading-relaxed tracking-wider">
              ÚSPĚŠNÝ PRODEJ NEMOVITOSTI POTŘEBUJE VÍC{' '}
              <span className="font-extrabold text-primary">NEŽ JEN BĚŽNÝ INZERÁT.</span>
            </RevealItem>
            <RevealItem as="p" className="font-syne text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.65rem] text-muted-foreground/75 uppercase leading-relaxed tracking-wider">
              POTŘEBUJE STRATEGII.<br />
              <span className="font-extrabold text-primary">ŠPIČKOVÝ MARKETING.</span>
            </RevealItem>
            <RevealItem as="p" className="font-syne text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.65rem] text-muted-foreground/75 uppercase leading-relaxed tracking-wider">
              A PARTNERA V ROHU,<br />
              <span className="font-extrabold text-primary">
                KTERÝ HÁJÍ VAŠE ZÁJMY OD PRVNÍHO DNE.
              </span>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
