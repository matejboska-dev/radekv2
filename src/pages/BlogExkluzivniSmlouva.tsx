import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';
import heroImage from '@/assets/exkluzivni-smlouva-makler-pribram.webp';

const BlogExkluzivniSmlouva = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Exkluzivní smlouva s makléřem: co to je a má smysl ji podepsat? | Radek Větrovský',
      'Makléř po vás chce podepsat exkluzivní smlouvu. Co to znamená, na co si dát pozor a kdy se to vyplatí? Praktický průvodce od místního makléře v Příbrami.',
      '/blog/exkluzivni-smlouva-s-maklerem'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Exkluzivní smlouva s makléřem: co to je a má smysl ji podepsat?',
      description: 'Makléř po vás chce podepsat exkluzivní smlouvu. Co to znamená, na co si dát pozor a kdy se to vyplatí? Praktický průvodce od místního makléře v Příbrami.',
      datePublished: '2026-04-13',
      author: { '@type': 'Person', name: 'Radek Větrovský' },
      publisher: { '@type': 'Organization', name: 'RE/MAX' },
      image: 'https://radek-vetrovsky.cz/assets/exkluzivni-smlouva-makler-pribram.webp',
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/clanky' },
        { '@type': 'ListItem', position: 3, name: 'Exkluzivní smlouva s makléřem' },
      ],
    });
    return () => { cleanupMeta(); cleanupArticle(); cleanupBreadcrumb(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/clanky"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na blog
            </Link>

            <div className="mb-8">
              <img
                src={heroImage}
                alt="Exkluzivní smlouva s makléřem Příbram"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                13. dubna 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                6 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Exkluzivní smlouva s makléřem: co to je a má smysl ji podepsat?
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Mnoho prodávajících se s požadavkem na exkluzivní smlouvu setkává poprvé — a neví, co vlastně podepisují. V tomto článku vysvětlím, co exkluzivní smlouva skutečně znamená, co říká zákon, a kdy se ji vyplatí podepsat — a kdy naopak ne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {/* Section 1 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Co je exkluzivní smlouva a jak funguje</h2>
                <p className="text-muted-foreground mb-4">
                  Exkluzivní smlouva — oficiálně výhradní zprostředkovatelská smlouva — znamená, že prodej vaší nemovitosti řeší výhradně jeden makléř nebo jedna realitní kancelář. Během platnosti smlouvy nemůžete spolupracovat s jiným makléřem ani prodat nemovitost na vlastní pěst.
                </p>
                <p className="text-muted-foreground mb-4">
                  Podle české legislativy, konkrétně <a href="https://www.zakonyprolidi.cz/cs/2020-39" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">§ 17 odst. 4 Zákona o realitním zprostředkování</a>, může exkluzivní smlouva trvat maximálně 6 měsíců a musí být vždy sjednána na dobu určitou. Makléř, který tlačí na delší dobu, jedná v rozporu se zákonem.
                </p>
                <p className="text-muted-foreground mb-4">
                  Smlouva musí rovněž obsahovat: identifikaci nemovitosti, dohodnutou nabídkovou cenu a výši provize nebo způsob jejího určení. Bez těchto náležitostí je právně neplatná.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Proč kvalitní makléři pracují výhradně exkluzivně</h2>
                <p className="text-muted-foreground mb-4">
                  Makléř bez exkluzivní smlouvy nebude investovat vlastní peníze do profesionálního focení, home stagingu, video prohlídek ani placené reklamy na Google nebo sociálních sítích — protože nemovitost může kdykoli prodat někdo jiný a celá investice přijde vniveč.
                </p>
                <p className="text-muted-foreground mb-4">
                  Když stejnou nemovitost nabízí více makléřů, nesoutěží o nejlepší cenu, ale o rychlost. Výsledek? Tlak na přijetí první nabídky, která je často nižší, než kolik by prodávající mohl získat.
                </p>
                <p className="text-muted-foreground mb-4">
                  Vícenásobné inzeráty téže nemovitosti na realitních portálech navíc působí podezřele a signalizují kupujícím, že se nemovitost špatně prodává.
                </p>
                <p className="text-muted-foreground mb-4">
                  Makléř s exkluzivní smlouvou může otevřeně spolupracovat se stovkami dalších makléřů a nabídku sdílet — makléř bez exkluzivity to odmítá, protože se bojí o provizi.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Výhody exkluzivní smlouvy pro prodávajícího</h2>
                <ul className="space-y-2 mb-6">
                  {[
                    'Jeden kontakt — žádné koordinování pěti makléřů, žádné protichůdné informace',
                    'Vyšší prodejní cena — makléř má čas najít nejlepšího kupujícího, ne jen prvního',
                    'Lepší prezentace — profesionální fotografie, staging a placená propagace jsou možné jen při garantované návratnosti investice',
                    'Silnější vyjednávací pozice — makléř zná celý obraz zájmu kupujících a může efektivně vyjednávat',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Kdy může být exkluzivní smlouva problém</h2>
                <p className="text-muted-foreground mb-4">
                  Pokud si vyberete špatného makléře, jste vázáni do konce platnosti smlouvy — nebo zaplatíte smluvní pokutu za předčasné ukončení.
                </p>
                <p className="text-muted-foreground mb-4">
                  Pozor na klauzule o automatickém prodloužení — od roku 2020 jsou podle zákona o realitním zprostředkování nelegální, přesto se v některých smlouvách stále objevují.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nikdy nepodepisujte smlouvu bez definované nabídkové ceny. Jakékoli snížení ceny by mělo vyžadovat váš písemný souhlas.
                </p>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-8">
                  <p className="text-foreground font-medium">
                    ⚠️ <strong>Varovný signál:</strong> Makléř, který vám slibuje nerealisticky vysokou prodejní cenu, aby získal exkluzivní smlouvu, a po podpisu vás začne tlačit ke snížení — to je nejčastější problém, se kterým se prodávající setkávají.
                  </p>
                </div>

              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Na co se zaměřit před podpisem</h2>
                <p className="text-muted-foreground mb-4">
                  Před podpisem exkluzivní smlouvy si ověřte několik klíčových bodů. Smlouva musí mít pevně stanovenou dobu trvání — maximálně 6 měsíců. Nabídková cena nemovitosti musí být ve smlouvě výslovně uvedena. Provize musí být jasně definována, ať už jako pevná částka nebo procento z prodejní ceny.
                </p>
                <p className="text-muted-foreground mb-4">
                  Smlouva nesmí obsahovat klauzuli o automatickém prodloužení. Podmínky pro předčasné ukončení musí být srozumitelně popsány. A pokud smlouvu podepisujete mimo provozovnu makléře — například u vás doma — máte ze zákona právo na odstoupení ve lhůtě 14 dnů.
                </p>
              </div>

              {/* Section 6 — Závěr */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Má smysl ji podepsat? Závěr</h2>
                <p className="text-muted-foreground mb-4">
                  Ano — pokud jste si vybrali správného makléře. Exkluzivní smlouva sama o sobě není riziko. Riziko je špatný výběr makléře. Exkluzivní smlouva s kvalitním makléřem chrání prodávajícího, zajišťuje lepší servis a v praxi vede k vyšší prodejní ceně.
                </p>
                <p className="text-muted-foreground mb-6">
                  Bez exkluzivní smlouvy budete spolupracovat s tím, kdo zbude poté, co dobří makléři řeknou ne.
                </p>

                {/* CTA Block */}
                <div className="bg-secondary/10 border border-secondary/20 p-8 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Uvažujete o prodeji nemovitosti v Příbrami nebo okolí?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Exkluzivní smlouvu s vámi podepíšu jen tehdy, když si budu jistý, že pro vás prodej dokážu dotáhnout na maximum — a vy budete vědět přesně, co za to dostanete.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/#contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors text-lg"
                    >
                      Kontaktujte mě
                    </Link>
                    <Link
                      to="/prodano"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-foreground/80 bg-transparent text-foreground font-semibold rounded-lg hover:bg-foreground/10 transition-colors text-lg"
                    >
                      Prodané nemovitosti
                    </Link>
                  </div>
                </div>
              </div>

              {/* Internal links */}
              <div className="mb-12">
                <p className="text-muted-foreground mb-4">
                  Podívejte se také na:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem" className="text-secondary hover:underline font-medium">
                      Prodat nemovitost v Příbrami bez realitky nebo s makléřem?
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">
                      Jak správně ocenit nemovitost před prodejem
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">
                      Rezervační smlouva a úschova kupní ceny: jak nepřijít o peníze ani o kupce
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sources */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Zdroje</h2>
                <ul className="space-y-2">
                  {[
                    { label: 'Zákon o realitním zprostředkování (č. 39/2020 Sb.)', url: 'https://www.zakonyprolidi.cz/cs/2020-39' },
                    { label: 'Smlouva o realitním zprostředkování — přehled náležitostí', url: 'https://maxima.cz/blog/smlouva-o-realitnim-zprostredkovani' },
                  ].map((source) => (
                    <li key={source.url} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author Footer */}
              <div className="bg-muted rounded-2xl p-8 md:p-10 text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský – realitní makléř Příbram"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Radek Větrovský</h3>
                <p className="text-muted-foreground mb-4">Realitní makléř RE/MAX Power 2, Příbram</p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <a href="tel:+420721855854" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Phone className="h-4 w-4" />
                    +420 721 855 854
                  </a>
                  <a href="mailto:radek.vetrovsky@re-max.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                    radek.vetrovsky@re-max.cz
                  </a>
                  <a href="https://radek-vetrovsky.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Globe className="h-4 w-4" />
                    radek-vetrovsky.cz
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogExkluzivniSmlouva;
