import { Star, ArrowUpRight } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import testimonialsBanner from '@/assets/radek-nemovitost-zahrada.jpg';

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/vNQZSSixjfp8rZCu9';

const testimonials = [
  {
    id: 'sindler',
    headline: 'PORADIL A VYŘEŠIL',
    name: 'Zdenek Sindler',
    role: 'Local Guide · 46 recenzí · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX5lu_afubQnsSbJ549W40EqL3ukIhZuPtGIsi8n0utRkRGaYyE=w72-h72-p-rp-mo-ba12-br100',
    text: '„Dobrý den, pokud hledáte odborníka na nemovitosti mohu doporučit p. Větrovského. Já i manželka jsme byli s ním od začátku spokojený. Byl ochoten a jednání bylo s ním příjemné. Prostě poradil a vyřešil.“',
    rating: 5,
  },
  {
    id: 'senkarova',
    headline: 'ZCELA PROFESIONÁLNÍ',
    name: 'Šárka Šenkárová',
    role: 'Ověřený klient · 8 recenzí · Google',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXSuZWBAs2b694atO5aeVXfVMf15MntJ9HTqYst1Ixj0dtCqQp3uA=w72-h72-p-rp-mo-br100',
    text: '„Spolupráce s makléřem p. Větrovským byla skvělá, jeho přístup a projev byl zcela profesionální, můj požadavek vyřešil rychle a dobře, vše bylo srozumitelně vykomunikované (smlouvy). V budoucnu rozhodně k dalším svým realitním krokům budu pracovat právě s Radkem Větrovským a jeho služby makléře budu šířit dál. Děkuji.“',
    rating: 5,
  },
  {
    id: 'anderson',
    headline: 'VŘELE DOPORUČUJI',
    name: 'Jana Anderson',
    role: 'Prodej rodinného domu · Google recenze',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK67cPz03KlA56gPCLwoU2z_Aic37rt_gvLD7VRfDkGzACOeg=w72-h72-p-rp-mo-br100',
    text: '„Při naší první návštěvě v realitní kanceláři RE/MAX v Příbrami se nás ujal pan Radek Větrovský. Ochotně nám sdělil jak bude vše probíhat ohledně prodeje našeho domu. Velmi oceňuji profesionální komunikaci, rychlost a exkluzivně připravenou prezentaci nemovitosti. Pan Větrovský nás pravidelně informoval o vývoji obchodu, zařídil vše nezbytné doklady k prodeji a přípravu smluv. Mohu pana Větrovského vřele doporučit. Ještě jednou děkuji.“',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white text-[#212c42] overflow-hidden isolate">
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
        {/* Top Header Row */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#212c42] mb-3 sm:mb-4">
              04 — RECENZE KLIENTŮ
            </span>
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-black leading-[0.95]">
              <span className="block">CO O MNĚ</span>
              <span className="block">ŘÍKAJÍ KLIENTI</span>
            </h2>
          </div>

          <div className="flex-shrink-0">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#212c42] hover:bg-[#212c42]/90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[#212c42]/30 hover:scale-[1.02] group"
            >
              <span>Všechny recenze na Google</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#212c42] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Central Panorama Banner Image */}
        <Reveal variant="scaleIn" className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#212c42]/10 shadow-2xl mb-12 sm:mb-16 md:mb-20">
          <img
            src={testimonialsBanner}
            alt="Příbram a okolí – kde pomáhám klientům prodávat nemovitosti"
            className="w-full h-56 sm:h-72 md:h-96 lg:h-[440px] xl:h-[480px] object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#212c42]/60 via-transparent to-transparent pointer-events-none" />
        </Reveal>

        {/* 3-Column Testimonials Layout with subtle vertical dividers */}
        <Reveal group staggerChildren={0.14} className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[#212c42]/10 gap-8 md:gap-0">
          {testimonials.map((t) => (
            <a
              key={t.id}
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full focus:outline-none"
            >
              <RevealItem
                as="article"
                variant="fadeUp"
                className="flex flex-col justify-between h-full md:px-5 lg:px-7 xl:px-8 transition-transform duration-300 group-hover:-translate-y-1"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Upper block: Headline, stars, quote */}
                <div className="flex-1">
                  {/* Headline & 5 Stars */}
                  <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-4">
                    <h3 className="font-syne font-extrabold text-base lg:text-lg uppercase tracking-wide text-[#212c42] group-hover:text-[#212c42]/60 transition-colors leading-snug">
                      {t.headline}
                    </h3>
                    <div className="flex gap-1 text-[#212c42] flex-shrink-0 pt-0.5" aria-label={`${t.rating} z 5 hvězdiček`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p
                    className="text-[#212c42]/70 text-sm sm:text-[15px] leading-relaxed font-normal"
                    itemProp="reviewBody"
                  >
                    {t.text}
                  </p>
                </div>

                {/* Lower block: Author Avatar, Name, Role */}
                <div className="flex items-center gap-3.5 mt-8 pt-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#212c42]/10 flex-shrink-0 shadow-md"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback in case Google User Content avatar is blocked
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=212c42&color=fff`;
                    }}
                  />
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="font-bold text-[#212c42] text-sm sm:text-base leading-tight" itemProp="name">
                      {t.name}
                    </p>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#212c42]/50 mt-1">
                      {t.role}
                    </p>
                  </div>
                  <meta itemProp="reviewRating" content={String(t.rating)} />
                </div>
              </RevealItem>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;

