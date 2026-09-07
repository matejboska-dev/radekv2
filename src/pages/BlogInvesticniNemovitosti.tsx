import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const BlogInvesticniNemovitosti = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Investiční nemovitosti Příbram: Vyplatí se to v roce 2026? | Radek Větrovský',
      'Ceny nemovitostí v Příbrami rostou. Zjistěte, jaký typ bytu dává investičně smysl, jak spočítat výnos a na co si dát pozor před koupí.',
      '/blog/investicni-nemovitosti-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Investiční nemovitosti v Příbrami: vyplatí se to v roce 2026?',
      description: 'Ceny nemovitostí v Příbrami rostou. Zjistěte, jaký typ bytu dává investičně smysl, jak spočítat výnos a na co si dát pozor před koupí.',
      datePublished: '2026-03-29',
      author: { '@type': 'Person', name: 'Radek Větrovský' },
      publisher: { '@type': 'Organization', name: 'RE/MAX' },
      image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=600&fit=crop',
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/#blog' },
        { '@type': 'ListItem', position: 3, name: 'Investiční nemovitosti Příbram' },
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
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na blog
            </Link>

            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=600&fit=crop"
                alt="Investiční nemovitosti v Příbrami – panorama města"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                29. března 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                6 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Investiční nemovitosti v Příbrami: vyplatí se to v roce 2026?
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Roky 2024 a 2025 přinesly výrazný růst cen nemovitostí ve Středočeském kraji. Má ještě smysl investovat do nemovitostí v Příbrami v roce 2026? Podívejme se na čísla, typy nemovitostí a reálné výnosy.
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Proč nemovitosti jako investice dávají smysl</h2>
                <p className="text-muted-foreground mb-4">
                  Průměrná cena cihlového bytu v České republice překročila v roce 2025 hranici 80 000 Kč/m². Analytici očekávají další růst o 5–8 % v roce 2026. Investiční nemovitosti v Příbrami a okolí tak představují zajímavou příležitost, jak zhodnotit peníze v prostředí, kde inflace stále snižuje reálnou hodnotu úspor na účtech.
                </p>
                <p className="text-muted-foreground mb-4">
                  Nemovitosti fungují jako přirozená ochrana proti inflaci — jejich hodnota roste spolu s cenovou hladinou. Zároveň generují pasivní příjem z pronájmu, což je kombinace, kterou jiné investiční nástroje jen těžko nabízejí.
                </p>
                <p className="text-muted-foreground">
                  Podrobná data o vývoji cen nemovitostí v ČR najdete na stránkách{' '}
                  <a href="https://csu.gov.cz/ceny-nemovitosti" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Českého statistického úřadu
                  </a>.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Příbram a okolí — proč zrovna tady</h2>
                <p className="text-muted-foreground mb-4">
                  Příbram leží pouhých 60 km od Prahy, s přímým napojením na dálnici D4. Cesta autem trvá přibližně 41 minut, což z města dělá atraktivní lokalitu pro dojíždějící za prací do hlavního města. Tento faktor výrazně posiluje poptávku po nájemním bydlení — a tedy i investiční potenciál nemovitostí v Příbrami.
                </p>
                <p className="text-muted-foreground mb-4">
                  Ceny zde stále zůstávají pod průměrem Prahy i Středočeského kraje. Pro srovnání — průměrná inzerovaná cena rodinných domů ve Středočeském kraji dosáhla ve 2. čtvrtletí 2025 přibližně 75 363 Kč/m².
                </p>

                {/* Price comparison table */}
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">Lokalita</th>
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">Průměrná cena/m² (byty)</th>
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">Růst 2025</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-3 text-sm text-foreground font-medium">Příbram</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">~55 000 Kč</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">+12 %</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border px-4 py-3 text-sm text-foreground font-medium">Středočeský kraj</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">~75 000 Kč</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">+16,5 %</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-sm text-foreground font-medium">Praha</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">~130 000 Kč</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground">+8 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-muted-foreground mb-4">
                  Středočeský kraj zaznamenal v roce 2025 růst inzerovaných cen o 16,49 % — jeden z nejrychlejších růstů mezi všemi kraji ČR. V Příbrami-Zdaboři navíc probíhá aktivní nová výstavba, která zvyšuje celkovou atraktivitu lokality.
                </p>
                <p className="text-muted-foreground mb-4">
                  Silná poptávka po nájemním bydlení ze strany zaměstnanců průmyslových podniků v příbramském okrese dále podporuje investiční potenciál zdejších investičních nemovitostí.
                </p>
                <p className="text-muted-foreground">
                  Aktuální vývoj cen nemovitostí ve všech krajích sledujte na{' '}
                  <a href="https://www.hyponamiru.cz/vyvoj-cen-nemovitosti-v-cr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Hyponámíru.cz
                  </a>.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Jaký typ nemovitosti dává investičně smysl</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">Byty 2+kk a 2+1</h3>
                  <p className="text-muted-foreground">
                    Nejlikvidnější segment trhu. Snadno se pronajímají, mají nejnižší vstupní kapitál a stabilní poptávku ze strany singles i mladých párů. Pro investora, který hledá rychlý start s předvídatelným výnosem, je to ideální volba.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">Byty 3+1</h3>
                  <p className="text-muted-foreground mb-2">
                    Vyšší vstupní cena, ale stabilnější nájemníci — typicky rodiny, které zůstávají déle a lépe se o byt starají. Delší nájemní vztahy znamenají méně nákladů na fluktuaci a údržbu mezi nájemníky.
                  </p>
                  <p className="text-muted-foreground">
                    Že je příbramský trh s byty 3+1 aktivní, potvrzují{' '}
                    <Link to="/prodano" className="text-primary hover:underline">
                      naše nedávno prodané nemovitosti
                    </Link>{' '}
                    — několik bytů této dispozice jsme úspěšně zprostředkovali v posledních měsících.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">Rodinné domy a obce v okolí</h3>
                  <p className="text-muted-foreground">
                    Lokality jako Sedlčany, Dobříš nebo obce podél D4 nabízejí vyšší potenciál zhodnocení, ale nižší likviditu. Tento typ investičních nemovitostí v okolí Příbrami se hodí pro trpělivé investory s delším horizontem, kteří počítají primárně s růstem hodnoty.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Na co si dát pozor</h2>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-6">
                  <p className="text-foreground font-medium">
                    ⚠️ <strong>Průkaz energetické náročnosti:</strong> Starší, energeticky neefektivní nemovitosti bez rekonstrukce mohou lokálně zaznamenat pokles cen. Před koupí ověřte PENB.
                  </p>
                </div>

                <p className="text-muted-foreground mb-4">
                  Rozlišujte hrubý a čistý výnos z pronájmu. Do kalkulace zahrňte správu nemovitosti, daně z příjmu, pojistku, fond oprav a rezervu na případné neobsazení bytu. Teprve čistý výnos ukáže, zda investiční nemovitost v Příbrami skutečně vydělává.
                </p>
                <p className="text-muted-foreground mb-4">
                  Hypoteční sazby se na konci roku 2025 držely těsně pod 5 %. Financování tedy není levné — výnos z investice musí fungovat i po započtení splátek hypotéky.
                </p>
                <p className="text-muted-foreground">
                  Klíčové je také vybrat správného makléře a provést důkladnou právní prověrku (due diligence). Více o vývoji trhu najdete v{' '}
                  <a href="https://www.remaxdelux.cz/vyvoj-cen-nemovitosti-cr-2024-21-12-2023" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    analýze RE/MAX
                  </a>.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Jak postupovat, pokud o investici vážně uvažujete</h2>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground mb-6">
                  <li><strong className="text-foreground">Stanovte si investiční horizont a rozpočet</strong> — určete, kolik chcete investovat a jak dlouho plánujete nemovitost držet.</li>
                  <li><strong className="text-foreground">Spočítejte si reálný výnos</strong> — ne jen hrubý nájem, ale čistý výnos po všech nákladech.</li>
                  <li><strong className="text-foreground">Navštivte lokalitu osobně</strong> — okolí, občanská vybavenost a stav domu řeknou víc než inzerát.</li>
                  <li><strong className="text-foreground">Konzultujte s makléřem, který zná místní trh zevnitř</strong> — ne každá nemovitost na{' '}
                    <a href="https://www.sreality.cz/hledani/prodej/byty/pribram" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Sreality
                    </a>{' '}
                    je dobrá investice.
                  </li>
                </ol>
              </div>

              {/* CTA */}
              <div className="bg-muted rounded-2xl p-8 md:p-10 text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský – realitní makléř Příbram"
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Uvažujete o koupi investiční nemovitosti v Příbrami nebo okolí?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Jako místní realitní makléř s aktivní nabídkou v celém okrese vám rád pomůžu najít nemovitost, která dává finanční smysl — nejen na papíře.{' '}
                  <Link to="/#contact" className="text-primary hover:underline font-semibold">
                    Kontaktujte mě
                  </Link>{' '}
                  nebo se podívejte na{' '}
                  <Link to="/prodano" className="text-primary hover:underline font-semibold">
                    aktuální nabídku nemovitostí
                  </Link>. Při prodeji investiční nemovitosti počítejte také s daňovými dopady — viz článek{' '}
                  <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-primary hover:underline font-semibold">o daních z prodeje bytu v Příbrami</Link>. Pokud řešíte konkrétně výnos z pronájmu, podrobný přehled aktuálních cen nájmu, kauce a daně z pronájmu najdete v článku{' '}
                  <Link to="/blog/pronajem-bytu-pribram-2026" className="text-primary hover:underline font-semibold">Pronájem bytu v Příbrami 2026</Link>.
                </p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-lg"
                >
                  Chci konzultaci zdarma
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogInvesticniNemovitosti;
