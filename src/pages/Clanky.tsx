import { useEffect } from 'react';
import { Calendar, ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { allArticles } from '@/components/Blog';
import { Reveal, RevealItem } from '@/components/anim/Reveal';
import { setPageMeta, injectJsonLd, BASE_URL } from '@/lib/seo';

const Clanky = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Články a rady o nemovitostech | Radek Větrovský – Realitní makléř Příbram',
      'Praktické tipy, rady, analýzy cen nemovitostí a legislativní změny v Příbrami a okolí. Články od certifikovaného makléře RE/MAX Radka Větrovského.',
      '/clanky'
    );
    const cleanupJsonLd = injectJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Domů', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Články' },
          ],
        },
        {
          '@type': 'CollectionPage',
          '@id': `${BASE_URL}/clanky#webpage`,
          url: `${BASE_URL}/clanky`,
          name: 'Články a rady o nemovitostech | Radek Větrovský',
          description: 'Praktické tipy, rady, analýzy cen nemovitostí a legislativní změny v Příbrami a okolí.',
          inLanguage: 'cs',
          author: {
            '@type': 'Person',
            name: 'Radek Větrovský',
            url: `${BASE_URL}/`,
          },
          hasPart: allArticles.map((article) => ({
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            url: `${BASE_URL}/blog/${article.slug}`,
          })),
        },
      ],
    });

    return () => {
      cleanupMeta();
      cleanupJsonLd();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back link */}
          <Reveal variant="fade" className="mb-6 sm:mb-8">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Zpět na hlavní stránku
            </Link>
          </Reveal>

          {/* Editorial Asymmetric Header */}
          <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-8 border-b border-border/50">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  06 — BLOG & RADY Z REALIT
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
                Všechny články a rady
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1 font-sans">
                Tipy a praktické rady, které vám pomohou lépe se orientovat na realitním trhu
                v Příbrami a okolí — od cen a daní po hypotéky a bezpečný prodej nemovitosti.
              </p>
            </div>
          </Reveal>

          {/* Articles Grid — identical to homepage Blog design system */}
          <Reveal group staggerChildren={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block h-full"
              >
                <RevealItem
                  as="article"
                  variant="fadeUp"
                  className="flex flex-col h-full bg-card rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-border/80 hover:border-secondary/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Clean un-obscured photo container */}
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

                    <h2 className="text-lg font-bold font-syne text-foreground group-hover:text-secondary transition-colors mb-2 leading-tight line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 font-sans">
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
        </div>
      </main>

      {/* Internal Conversion CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Clanky;
