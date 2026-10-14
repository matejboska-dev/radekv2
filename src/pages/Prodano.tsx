import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCTABar from '@/components/MobileCTABar';
import { setPageMeta, injectJsonLd, BASE_URL } from '@/lib/seo';
import { soldProperties as properties, daysLabel } from '@/data/sold-properties';


const Prodano = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanupMeta = setPageMeta(
      'Prodané nemovitosti v Příbrami a okolí | Radek Větrovský RE/MAX',
      'Přehled úspěšně realizovaných prodejů bytů, domů a pozemků v Příbrami a okolí. Reference mluví za vše – prohlédněte si úspěšně dokončené případy.',
      '/prodano'
    );
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Prodané nemovitosti' },
      ],
    });

    const cleanupList = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Prodané nemovitosti v Příbrami a okolí',
      url: `${BASE_URL}/prodano`,
      about: { '@id': `${BASE_URL}/#business` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: properties.length,
        itemListElement: properties.map((property, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${BASE_URL}/prodano#nemovitost-${property.id}`,
          name: `${property.title} – ${property.location}, ${property.size}, prodáno za ${property.days} dní`,
          image: new URL(property.image, BASE_URL).href,
        })),
      },
    });

    if (window.location.hash.startsWith('#nemovitost-')) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      cleanupMeta();
      cleanupBreadcrumb();
      cleanupList();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <main className="pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na hlavní stránku
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wider mb-3 sm:mb-4">
              Realizované zakázky
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-syne font-extrabold uppercase tracking-tight text-foreground mb-4">
              Prodané nemovitosti
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Reference mluví za vše – prohlédněte si úspěšně dokončené případy.
            </p>
          </motion.div>

          <h2 className="sr-only">Seznam prodaných nemovitostí</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                id={`nemovitost-${property.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="property-card group scroll-mt-28 target:ring-2 target:ring-secondary"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-xl bg-muted">
                  <img
                    src={property.image}
                    alt={`${property.title} – ${property.location}, ${property.size}, prodáno za ${daysLabel(property.days)}`}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 md:p-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full border border-secondary/20 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    Prodáno za {daysLabel(property.days)}
                  </span>
                  <h3 className="text-lg font-bold font-syne text-foreground mb-2 group-hover:text-secondary transition-colors leading-tight">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-secondary" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Maximize2 className="h-4 w-4 text-slate-400" />
                    <span>{property.size}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-14 sm:mt-16"
          >
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Chcete prodat svou nemovitost stejně úspěšně?
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-md sm:max-w-none mx-auto">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                className="uppercase tracking-wider text-sm font-bold px-8 sm:px-10 h-12 sm:h-14 w-full sm:w-auto"
              >
                Odhad ceny zdarma
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate('/#contact')}
                className="uppercase tracking-wider text-sm font-medium px-8 sm:px-10 h-12 sm:h-14 w-full sm:w-auto"
              >
                Kontaktujte mě
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <Footer />
      <MobileCTABar />
    </motion.div>
  );
};

export default Prodano;
