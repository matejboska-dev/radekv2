import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allArticles } from '@/components/Blog';
import { setPageMeta } from '@/lib/seo';

const Clanky = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = setPageMeta(
      'Články o realitách | Radek Větrovský – makléř Příbram',
      'Tipy, rady a analýzy z realitního trhu v Příbrami a okolí. Blog realitního makléře Radka Větrovského.',
      '/clanky'
    );
    return cleanup;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <main className="section-padding pt-32">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na hlavní stránku
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
              Blog & Tipy
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Všechny články
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tipy, rady a analýzy z realitního trhu v Příbrami a okolí.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {allArticles.map((article, index) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block"
              >
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="property-card bg-card overflow-hidden h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-light hover:text-primary transition-colors group/btn">
                      Číst více
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Clanky;
