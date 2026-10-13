import { Star, ArrowUpRight } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import radekPortrait from '@/assets/radek-testimonials-portrait.webp';

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/vNQZSSixjfp8rZCu9';

const testimonials = [
  {
    id: 'sindler',
    headline: 'PORADIL A VYŘEŠIL',
    name: 'Zdenek Sindler',
    role: 'Local Guide · 46 recenzí · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX5lu_afubQnsSbJ549W40EqL3ukIhZuPtGIsi8n0utRkRGaYyE=w72-h72-p-rp-mo-ba12-br100',
    text: '„Dobrý den, pokud hledáte odborníka na nemovitosti mohu doporučit p. Větrovského. Já i manželka jsme byli s ním od začátku spokojený. Byl ochoten a jednání bylo s ním příjemné. Prostě poradil a vyřešil."',
    rating: 5,
  },
  {
    id: 'senkarova',
    headline: 'ZCELA PROFESIONÁLNÍ',
    name: 'Šárka Šenkárová',
    role: '8 recenzí · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXSuZWBAs2b694atO5aeVXfVMf15MntJ9HTqYst1Ixj0dtCqQp3uA=w72-h72-p-rp-mo-br100',
    text: '„Spolupráce s makléřem p. Větrovským byla skvělá, jeho přístup a projev byl zcela profesionální, můj požadavek vyřešil rychle a dobře, vše bylo srozumitelně vykomunikované (smlouvy). V budoucnu rozhodně k dalším svým realitním krokům budu pracovat právě s Radkem Větrovským a jeho služby makléře budu šířit dál. Děkuji."',
    rating: 5,
  },
  {
    id: 'vecek',
    headline: 'OCHOTNÝ A SPOLEHLIVÝ',
    name: 'Petr Vecek',
    role: '10 recenzí · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUcrYGTK_x_pCzwTEfH5tfPtWemFqZpcgok-2E2zO66eyl_di9rtw=w72-h72-p-rp-mo-br100',
    text: '„Pan Větrovský je ochotný a spolehlivý realitní makléř. Jednání bylo transparentní."',
    rating: 5,
  },
  {
    id: 'anderson',
    headline: 'VŘELE DOPORUČUJI',
    name: 'Jana Anderson',
    role: '4 recenze · Google',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK67cPz03KlA56gPCLwoU2z_Aic37rt_gvLD7VRfDkGzACOeg=w72-h72-p-rp-mo-br100',
    text: '„Při naší první návštěvě v realitní kanceláři RE/MAX v Příbrami se nás ujal pan Radek Větrovský. Ochotně nám sdělil jak bude vše probíhat ohledně prodeje našeho domu. Velmi oceňuji profesionální komunikaci, rychlost a exkluzivně připravenou prezentaci nemovitosti. Pan Větrovský nás pravidelně informoval o vývoji obchodu, zařídil vše nezbytné doklady k prodeji a přípravu smluv. Mohu pana Větrovského vřele doporučit. Ještě jednou děkuji."',
    rating: 5,
  },
  {
    id: 'leseticky',
    headline: 'NAPROSTO PERFEKTNÍ',
    name: 'Jan Lešetický',
    role: '1 recenze · Google',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ6oD54O54YGXkFfiFmtRp9BkBrvA8Wb7yQoPjG9GaK2xErEg=w72-h72-p-rp-mo-br100',
    text: '„Spolupráce s panem Větrovskym byla od začátku do konce naprosto perfektní. Nemovitost prodal velmi rychle a za cenu, která předčila moje očekávání. Oceňuji jeho profesionalitu, výbornou komunikaci, ochotu a perfektní znalost trhu."',
    rating: 5,
  },
  {
    id: 'sindelar',
    headline: 'VŠE ŠLAPALO JAK MĚL',
    name: 'Jakub Šindelář',
    role: '2 recenze · Google',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKIHJUh5ZDlCK5frGy_zfjqYzQ7ZvxS6xoJd-AVnylUkIHUpQ=w72-h72-p-rp-mo-br100',
    text: '„S p. Větrovským od samého začátku až do konce vše šlapalo jak mělo, rychlost jak najít zájemce, tak v následném jednání ohledně smluv a všeho kolem."',
    rating: 5,
  },
  {
    id: 'skudrnova',
    headline: '11 Z 10 HVĚZD',
    name: 'Lena Skudrnova',
    role: '3 recenze · Google',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKgfsuOXuwGDKrHbKEbStMmR3I-U6fB2JS2MdqFO3pRPhuo2g=w72-h72-p-rp-mo-br100',
    text: '„Skvělá spolupráce s panem Vetrovským. Víc takovýchto lidí. Ochota a rychlé vyřešení požadavků. Vždy na telefonu a s jakýmkoli požadavkem. Vstřícnost a loajalita. Ocenění v počtu hvězd? 11 z 10."',
    rating: 5,
  },
  {
    id: 'dvorakova',
    headline: 'SKVĚLÁ SPOLUPRÁCE',
    name: 'Andrea Dvorakova',
    role: '2 recenze · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVBK4H59IvA8CxEEVchuj9qX0gFI3msoLPtLcUutxPJj9V_Am5WMQ=w72-h72-p-rp-mo-br100',
    text: '„S p. Vetrovskym byla pri koupi bytu skvela spoluprace. Co slibi, to plati. Vyborna zkusenost, za kterou jsem vdecna. Dekuji."',
    rating: 5,
  },
];

/* Reusable review card */
const ReviewCard = ({ t }: { t: typeof testimonials[0] }) => (
  <a
    href={GOOGLE_REVIEWS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="group block h-full focus:outline-none"
  >
    <article
      className="flex flex-col justify-between h-full transition-transform duration-300 group-hover:-translate-y-1"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="flex-1">
        {/* Headline & Stars */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-3">
          <h3 className="font-syne font-extrabold text-sm lg:text-base uppercase tracking-wide text-[#212c42] group-hover:text-[#212c42]/60 transition-colors leading-snug">
            {t.headline}
          </h3>
          <div className="flex gap-0.5 text-[#212c42] flex-shrink-0 pt-0.5" aria-label={`${t.rating} z 5 hvězdiček`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current stroke-none" />
            ))}
          </div>
        </div>
        {/* Review text */}
        <p
          className="text-[#212c42]/70 text-sm leading-relaxed font-normal"
          itemProp="reviewBody"
        >
          {t.text}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-5 pt-2">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#212c42]/10 flex-shrink-0 shadow-md"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=212c42&color=fff`;
          }}
        />
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <p className="font-bold text-[#212c42] text-sm leading-tight" itemProp="name">
            {t.name}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#212c42]/50 mt-0.5">
            {t.role}
          </p>
        </div>
        <meta itemProp="reviewRating" content={String(t.rating)} />
      </div>
    </article>
  </a>
);

const Testimonials = () => {
  const topRow = testimonials.slice(0, 3);
  const sideReview = testimonials[3];
  const bottomRow = testimonials.slice(4, 7);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 relative py-12 sm:py-16 md:py-20 lg:py-28 bg-white text-[#212c42] overflow-hidden isolate"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#212c42]/[0.04] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#212c42]/[0.03] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Header ─────────────────────────────────────────── */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#212c42] mb-2 sm:mb-4">
              02 — RECENZE KLIENTŮ
            </span>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-7xl uppercase tracking-tight text-black leading-[1.1] sm:leading-[0.95]">
              <span className="block">CO O MNĚ</span>
              <span className="block">ŘÍKAJÍ KLIENTI</span>
            </h2>
          </div>

          {/* Button – hidden on mobile (shown at the bottom instead) */}
          <div className="hidden md:block flex-shrink-0">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#212c42] hover:bg-[#212c42]/90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[#212c42]/30 hover:scale-[1.02] group"
            >
              <span>Všechny recenze na Google</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#212c42] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════
            MOBILE LAYOUT (hidden on md+)
            ════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Portrait photo */}
          <div className="rounded-2xl overflow-hidden border border-[#212c42]/10 shadow-2xl mb-8">
            <img
              src={radekPortrait}
              alt="Radek Větrovský – certifikovaný realitní makléř RE/MAX Příbram"
              className="w-full object-cover object-[center_30%]"
              style={{ maxHeight: '420px' }}
              loading="eager"
            />
          </div>

          {/* Infinite horizontally-scrollable review strip */}
          <div
            className="overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4 w-max pb-2">
              {/* Duplicate array for infinite feel */}
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="snap-start flex-shrink-0 w-[78vw] max-w-xs bg-white border border-[#212c42]/10 rounded-2xl shadow-md p-5"
                >
                  <ReviewCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-8 flex justify-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#212c42] hover:bg-[#212c42]/90 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-[1.02] group"
            >
              <span>Všechny recenze na Google</span>
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#212c42] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            DESKTOP LAYOUT (hidden below md)
            ════════════════════════════════════════════════════ */}
        <div className="hidden md:block">
          {/* Top row: 3 reviews */}
          <Reveal group staggerChildren={0.12} className="grid grid-cols-3 divide-x divide-[#212c42]/10 mb-12">
            {topRow.map((t) => (
              <RevealItem key={t.id} variant="fadeUp" className="px-5 lg:px-7 xl:px-8">
                <ReviewCard t={t} />
              </RevealItem>
            ))}
          </Reveal>

          {/* Middle block: portrait (left) + 1 review (right) */}
          <Reveal className="grid grid-cols-2 gap-10 items-stretch mb-12 border-t border-[#212c42]/10 pt-12">
            {/* Portrait photo */}
            <div className="rounded-3xl overflow-hidden border border-[#212c42]/10 shadow-2xl">
              <img
                src={radekPortrait}
                alt="Radek Větrovský – certifikovaný realitní makléř RE/MAX Příbram"
                className="w-full h-full object-cover object-[center_30%]"
                style={{ maxHeight: '520px' }}
                loading="eager"
              />
            </div>

            {/* Side review */}
            <RevealItem variant="fadeUp" className="flex items-center">
              <div className="w-full p-8 md:p-10 rounded-3xl border border-[#212c42]/10 shadow-lg bg-white h-full flex items-center">
                <ReviewCard t={sideReview} />
              </div>
            </RevealItem>
          </Reveal>

          {/* Bottom row: 3 reviews */}
          <Reveal group staggerChildren={0.12} className="grid grid-cols-3 divide-x divide-[#212c42]/10 border-t border-[#212c42]/10 pt-12">
            {bottomRow.map((t) => (
              <RevealItem key={t.id} variant="fadeUp" className="px-5 lg:px-7 xl:px-8">
                <ReviewCard t={t} />
              </RevealItem>
            ))}
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
