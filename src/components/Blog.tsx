import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import exkluzivniImage from '@/assets/exkluzivni-smlouva-makler-pribram.webp';
const penbImage = 'https://www.panfitinka.cz/storage/app/media/blog/pasivni%20vs%20nizkoen/trida_energeticke_narocnosti.png';
const hypotekyImage = 'https://images.unsplash.com/photo-1768839720586-71b7ff8b5c59?w=400&h=300&fit=crop&q=80';
const katastrImage = 'https://images.unsplash.com/photo-1763729805496-b5dbf7f00c79?w=400&h=300&fit=crop&q=80';
const pronajemImage = 'https://images.unsplash.com/photo-1722487631997-cf1e0f92c2c4?w=400&h=300&fit=crop&q=80';
const danZNemovitostiImage = 'https://images.unsplash.com/photo-1642043175009-5997b3a078d8?w=400&h=300&fit=crop&q=80';
const garsonkyImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&q=80';
const novostavbyImage = 'https://images.unsplash.com/photo-1758193431351-68538bf55ec3?w=400&h=300&fit=crop&q=80';
const hypotecniSazbyImage = 'https://images.unsplash.com/photo-1768839720586-71b7ff8b5c59?w=400&h=300&fit=crop&q=80';
const prodatRodinnyDumImage = 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400&h=300&fit=crop&q=80';
const naCoPozorKoupeImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&q=80';
const kolikSiMuzuDovolitImage = 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&h=300&fit=crop&q=80';

export const allArticles = [
  {
    title: 'Hypoteční sazby a Příbram: aktuální přehled (aktualizováno měsíčně)',
    excerpt: 'Aktuální hypoteční sazby: sjednaná 4,90 % (ČBA Hypomonitor), nabízená 5,42 % (Swiss Life Hypoindex). Vývoj v roce 2026 a splátky bytů a domů v Příbrami.',
    date: '3. září 2026',
    readTime: '8 min čtení',
    image: hypotecniSazbyImage,
    slug: 'hypotecni-sazby-pribram-mesicni-prehled',
  },
  {
    title: 'Jak prodat rodinný dům v Příbrami: postup krok za krokem (2026)',
    excerpt: 'Průvodce prodejem rodinného domu v Příbrami: dokumenty, stanovení ceny, home staging, prohlídky, smlouvy, úschova, daň z prodeje a doba prodeje 3 až 5 měsíců.',
    date: '3. září 2026',
    readTime: '12 min čtení',
    image: prodatRodinnyDumImage,
    slug: 'jak-prodat-rodinny-dum-pribram',
  },
  {
    title: 'Na co si dát pozor při koupi bytu nebo domu v Příbrami',
    excerpt: 'Kontrolní seznam před koupí: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova kupní ceny.',
    date: '3. září 2026',
    readTime: '11 min čtení',
    image: naCoPozorKoupeImage,
    slug: 'na-co-si-dat-pozor-koupe-nemovitosti-pribram',
  },
  {
    title: 'Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami',
    excerpt: 'Výpočet dosažitelné hypotéky podle příjmu, úspor a věku. Limity ČNB 2026 a modelové příklady převedené na ceny bytů a domů v Příbrami.',
    date: '3. září 2026',
    readTime: '9 min čtení',
    image: kolikSiMuzuDovolitImage,
    slug: 'kolik-si-muzu-dovolit-hypoteka-pribram',
  },
  {
    title: 'Novostavby v Příbrami 2026: kde se staví a jak vybrat ten pravý byt',
    excerpt: 'Přehled novostaveb v Příbrami 2026: Bytové domy Zdaboř i Rezidence Obora, počty bytů, ceny za m² a na co si dát pozor před koupí.',
    date: '24. srpna 2026',
    readTime: '8 min čtení',
    image: novostavbyImage,
    slug: 'novostavby-pribram-2026-kde-se-stavi',
  },
  {
    title: 'Prodej garsonky a malého bytu v Příbrami 2026: co ovlivňuje cenu',
    excerpt: 'Kolik dnes stojí garsonka nebo malý byt v Příbrami a co nejvíc ovlivňuje cenu, velikost, lokalitu, patro i vlastnictví. Aktuální nabídky a rady k prodeji.',
    date: '20. srpna 2026',
    readTime: '9 min čtení',
    image: garsonkyImage,
    slug: 'prodej-garsonky-maleho-bytu-pribram-2026',
  },
  {
    title: 'Daň z nemovitosti v Příbrami 2026: kolik zaplatíte ročně',
    excerpt: 'Daň z nemovitosti v Příbrami 2026: sazby, místní koeficient 2, termíny přiznání i splatnosti. Kolik reálně zaplatíte za byt nebo dům.',
    date: '11. srpna 2026',
    readTime: '8 min čtení',
    image: danZNemovitostiImage,
    slug: 'dan-z-nemovitosti-pribram-2026',
  },
  {
    title: 'Pronájem bytu v Příbrami 2026: kolik si účtovat a kolik zaplatíte',
    excerpt: 'Kolik stojí pronájem bytu v Příbrami 2026, jaká je maximální kauce a daň z pronájmu. Praktický přehled pro pronajímatele i nájemce.',
    date: '4. srpna 2026',
    readTime: '9 min čtení',
    image: pronajemImage,
    slug: 'pronajem-bytu-pribram-2026',
  },
  {
    title: 'Katastr nemovitostí 2026: konec anonymního nahlížení a jak si přesto ověřit vlastníka',
    excerpt: 'Od konce prosince 2025 ČÚZK vyžaduje přihlášení přes BankID nebo mojeID pro zobrazení vlastníka v katastru. Jak na to a co dál platí zdarma.',
    date: '28. července 2026',
    readTime: '8 min čtení',
    image: katastrImage,
    slug: 'katastr-nemovitosti-2026-konec-anonymniho-nahlizeni',
  },
  {
    title: 'Hypotéky v červnu 2026 zdražily, co to znamená pro prodej nemovitosti v Příbrami',
    excerpt: 'Sazby hypoték vzrostly v červnu 2026 na 4,79 %, nabízené sazby přes 5 %. Jak to ovlivní prodej nemovitostí v Příbrami a na co se připravit.',
    date: '21. července 2026',
    readTime: '9 min čtení',
    image: hypotekyImage,
    slug: 'hypoteky-cerven-2026-dopad-na-prodej-pribram',
  },
  {
    title: 'Rezervační smlouva a úschova kupní ceny: jak nepřijít o peníze ani o kupce',
    excerpt: 'Rezervační poplatek 3–5 %, advokátní úschova od 3 000 Kč. Jak funguje rezervační smlouva a úschova kupní ceny při prodeji v Příbrami a kdo co platí.',
    date: '13. července 2026',
    readTime: '10 min čtení',
    image: 'https://images.unsplash.com/photo-1643804926339-e94f0a655185?w=400&h=300&fit=crop',
    slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026',
  },
  {
    title: 'Energetický štítek (PENB) při prodeji nemovitosti: kdy ho potřebujete?',
    excerpt: 'PENB je zákonná povinnost prodávajícího s pokutou až 200 000 Kč. Jaké třídy mají domy a byty v Příbrami, kdo PENB platí, kolik stojí a jak dlouho trvá.',
    date: '2. července 2026',
    readTime: '12 min čtení',
    image: penbImage,
    slug: 'penb-pri-prodeji-nemovitosti-2026',
  },
  {
    title: 'Cenová mapa Příbram 2026: Kolik stojí nemovitosti v jednotlivých čtvrtích?',
    excerpt: 'Přehled cen bytů a domů v Příbrami podle lokalit, podložený aktuálními daty z realitního trhu. Vývoj cen 2022–2026, ceny podle dispozice.',
    date: '1. června 2026',
    readTime: '7 min čtení',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
    slug: 'cenova-mapa-pribram-2026',
  },
  {
    title: 'Jak prodat zděděnou nemovitost 2026: Průvodce od A do Z',
    excerpt: 'Zdědili jste nemovitost v Příbrami a nevíte jak dál? Dědické řízení, daně, prodej bez hádek spolumajitelů. Průvodce krok za krokem.',
    date: '22. května 2026',
    readTime: '10 min čtení',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400&h=300&fit=crop',
    slug: 'jak-prodat-zdedenu-nemovitost-pribram',
  },
  {
    title: 'Daň z prodeje nemovitosti 2026: Kolik zaplatím v Příbrami?',
    excerpt: 'Časový test, osvobození, konkrétní příklady z Příbrami a daň z nemovitých věcí. Vše, co musíte vědět dřív, než nasadíte cenu.',
    date: '15. května 2026',
    readTime: '9 min čtení',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&h=300&fit=crop',
    slug: 'dan-z-prodeje-bytu-pribram-2026',
  },
  {
    title: 'Exkluzivní smlouva s makléřem: co to je a má smysl ji podepsat?',
    excerpt: 'Makléř po vás chce podepsat exkluzivní smlouvu. Co to znamená, na co si dát pozor a kdy se to vyplatí?',
    date: '13. dubna 2026',
    readTime: '6 min čtení',
    image: exkluzivniImage,
    slug: 'exkluzivni-smlouva-s-maklerem',
  },
  {
    title: 'Prodat nemovitost v Příbrami bez realitky nebo s makléřem?',
    excerpt: 'Porovnáváme oba přístupy otevřeně — včetně provizí, rizik a konkrétních čísel, která rozhodují.',
    date: '6. dubna 2026',
    readTime: '6 min čtení',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop',
    slug: 'prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem',
  },
  {
    title: 'Investiční nemovitosti Příbram: Vyplatí se to v roce 2026?',
    excerpt: 'Ceny nemovitostí v Příbrami rostou. Zjistěte, jaký typ bytu dává investičně smysl a jak spočítat výnos.',
    date: '29. března 2026',
    readTime: '6 min čtení',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=400&h=300&fit=crop',
    slug: 'investicni-nemovitosti-pribram',
  },
  {
    title: 'Jak správně ocenit nemovitost před prodejem',
    excerpt: 'Správné ocenění nemovitosti je klíčem k úspěšnému prodeji. Zjistěte, na co si dát pozor.',
    date: '15. ledna 2026',
    readTime: '5 min čtení',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    slug: 'jak-spravne-ocenit-nemovitost',
  },
];

const Blog = () => {
  const articles = allArticles.slice(0, 3);

  return (
    <section id="blog" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Editorial Asymmetric Header */}
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                06 — BLOG & TIPY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Užitečné rady z realit
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Tipy a rady, které vám pomohou lépe se orientovat na realitním trhu
              v Příbrami a okolí — od cen a daní po hypotéky a katastr.
            </p>
          </div>
        </Reveal>

        {/* Articles Grid — clean editorial photo cards */}
        <Reveal group staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <Link
              key={article.title}
              to={`/blog/${article.slug}`}
              className="group block h-full"
            >
              <RevealItem
                as="article"
                variant="fadeUp"
                className="flex flex-col h-full bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/80 hover:border-secondary/30 hover:shadow-xl transition-all duration-500"
              >
                {/* Clean, un-obscured photo container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 pt-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-syne text-foreground group-hover:text-secondary transition-colors mb-2 leading-tight line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                    Číst více
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </RevealItem>
            </Link>
          ))}
        </Reveal>

        {/* Link to all articles */}
        <Reveal variant="fade" className="text-center mt-12 md:mt-14">
          <Link
            to="/clanky"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-border px-8 h-12 text-base font-semibold text-foreground hover:border-secondary hover:text-secondary transition-all"
          >
            Zobrazit všechny články
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Blog;
