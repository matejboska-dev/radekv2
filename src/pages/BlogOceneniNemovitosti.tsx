import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Home, Calculator, TrendingUp, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';

const BlogOceneniNemovitosti = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Jak správně ocenit nemovitost před prodejem | Makléř Příbram 2025',
      'Jak ocenit nemovitost v Příbrami? 3 metody ocenění + nejčastější chyby, které stojí statisíce. Poradí realitní makléř Radek Větrovský.',
      '/blog/jak-spravne-ocenit-nemovitost'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Jak správně ocenit nemovitost před prodejem',
      description: 'Správné ocenění nemovitosti je klíčem k úspěšnému prodeji. Zjistěte, na co si dát pozor.',
      datePublished: '2026-01-15',
      author: { '@type': 'Person', name: 'Radek Větrovský' },
      publisher: { '@type': 'Organization', name: 'RE/MAX' },
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/#blog' },
        { '@type': 'ListItem', position: 3, name: 'Jak správně ocenit nemovitost' },
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop"
                alt="Jak správně ocenit nemovitost před prodejem"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                15. ledna 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                5 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Jak správně ocenit nemovitost před prodejem
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Správné ocenění nemovitosti je klíčem k úspěšnému prodeji. Zjistěte, na co si dát pozor a jak dosáhnout nejlepší ceny.
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
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Proč je správné ocenění tak důležité?</h2>
                <p className="text-muted-foreground mb-6">
                  Správné ocenění nemovitosti je základem úspěšného prodeje. Příliš vysoká cena odradí potenciální kupce, 
                  zatímco příliš nízká cena připraví vaši peněženku. Podle statistik ČSÚ nemovitosti špatně oceněné zůstávají 
                  na trhu v průměru o 40 % déle.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-8">
                  <p className="text-foreground font-medium">
                    💡 <strong>Tip profesionála:</strong> Ideální je cena 5-10 % pod tržní hodnotou. 
                    To vytváří prostor pro vyjednávání a přitahuje více zájemců.
                  </p>
                </div>
              </div>

              {/* Methods */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Metody ocenění nemovitosti</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Calculator className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Srovnávací metoda</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Nejběžnější metoda pro byty a rodinné domy. Porovnává vaši nemovitost s podobnými 
                      prodanými objekty v okolí. Zohledňuje velikost, stav, lokalitu a vybavení.
                    </p>
                  </div>

                  <div className="bg-card p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Výnosová metoda</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Vhodná pro investiční nemovitosti. Vychází z potenciálních nájmů a návratnosti investice. 
                      Používá se hlavně u komerčních objektů.
                    </p>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Nákladová metoda</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Zohledňuje náklady na výstavbu a depreciaci. Používá se u novostaveb a unikátních objektů, 
                      kde chybí srovnávací data.
                  </p>
                </div>
              </div>

              {/* Factors */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Klíčové faktory ovlivňující cenu</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Lokalita a dopravní dostupnost</h3>
                      <p className="text-muted-foreground">
                        Blízkost MHD, škol, obchodů a dopravní napojení zvyšují cenu až o 20 %. 
                        Školka do 500 m přidá 5-10 % hodnoty.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Stav a stáří nemovitosti</h3>
                      <p className="text-muted-foreground">
                        Nově rekonstruovaný byt může stát o 15-25 % více než podobný v původním stavu. 
                        Kompletní rekonstrukce se vrátí v 85-95 % případů.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Velikost a dispozice</h3>
                      <p className="text-muted-foreground">
                        2+kk a 3+kk jsou nejžádanější. Atypické dispozice mohou snížit cenu o 10-15 %. 
                        Vlastní terasa nebo balkon přidá 5-8 %.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Energetická náročnost</h3>
                      <p className="text-muted-foreground">
                        Třída "B" je dnes standard. Rozdíl mezi "G" a "B" může být až 30 % ceny. 
                        Nová zelená úspora může pokrýt až 50 % nákladů na zlepšení.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Jak postupovat při ocenění</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Průzkum trhu</h3>
                      <p className="text-muted-foreground">
                        Prostudujte podobné nabídky na Sreality, Idnes a Reality.cz. Zaznamenejte si ceny, 
                        velikosti a stavy nemovitostí.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Analýza prodaných nemovitostí</h3>
                      <p className="text-muted-foreground">
                        Najděte si skutečné prodejní ceny, ne jen nabídkové. Katastr nemovitostí a realitní 
                        portály nabízejí historii prodejů.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Korekce podle stavu</h3>
                      <p className="text-muted-foreground">
                        Upravte ceny podle konkrétního stavu vaší nemovitosti. Zohledněte rekonstrukce, vybavení 
                        a případné nedostatky.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Profesionální ověření</h3>
                      <p className="text-muted-foreground">
                        Nechte si vypracovat odhad od certifikovaného znalce. Stojí to 3-5 tisíc Kč, 
                        ale může vám ušetřit statisíce.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Časté chyby při ocenění</h2>
                
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">×</span>
                      <span className="text-muted-foreground">
                        <strong>Citové ocenění:</strong> Váš byt není pro kupce tolik hodnotný jako pro vás
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">×</span>
                      <span className="text-muted-foreground">
                        <strong>Ignorování trhu:</strong> Trh se mění, ceny z před 2 let už neplatí
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">×</span>
                      <span className="text-muted-foreground">
                        <strong>Přecenění rekonstrukce:</strong> Váš vkus nemusí odpovídat vkusu kupujících
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">×</span>
                      <span className="text-muted-foreground">
                        <strong>Zaměření na jednu metodu:</strong> Kombinujte více přístupů
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Závěr</h2>
                <p className="text-muted-foreground mb-6">
                  Správné ocenění nemovitosti je věda i umění. Vyžaduje trpělivost, průzkum a objektivitu. 
                  Pokud si nejste jisti, neváhejte využít profesionální služby. Dobrý odhad je investice, 
                  která se mnohonásobně vrátí.
                </p>
                
                <p className="text-muted-foreground mb-6">
                  Hledáte zkušeného <Link to="/" className="text-secondary hover:underline font-medium">realitního makléře v Příbrami</Link>? 
                  Podívejte se na moje <Link to="/#sluzby" className="text-secondary hover:underline font-medium">služby v oblasti prodeje a pronájmu nemovitostí</Link>. Pokud zvažujete prodej, podívejte se také na článek o tom, <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-secondary hover:underline font-medium">kolik zaplatíte na daních při prodeji bytu v Příbrami</Link>. U zděděných nemovitostí má ocenění svá specifika, podrobně to rozebírám v průvodci <Link to="/blog/jak-prodat-zdedenu-nemovitost-pribram" className="text-secondary hover:underline font-medium">jak prodat zděděnou nemovitost</Link>.
                </p>

                <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-3">Potřebujete pomoci s oceněním?</h3>
                  <p className="text-muted-foreground mb-4">
                    Rád vám zdarma provedu tržní analýzu vaší nemovitosti a doporučím optimální prodejní cenu.
                  </p>
                  <Link 
                    to="/odhad-nemovitosti"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <Calculator className="h-5 w-5" />
                    Žádat o bezplatný odhad
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogOceneniNemovitosti;
