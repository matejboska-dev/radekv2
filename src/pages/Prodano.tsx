import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import bytImage from '@/assets/property-byt-pribram.webp';
import dumImage from '@/assets/property-dum-pribram.webp';
import byt31Image from '@/assets/property-byt31-pribram.webp';
import garazImage from '@/assets/property-garaz-pribram.webp';
import jelenceImage from '@/assets/property-dum-jelence.webp';
import bytVeDvoreImage from '@/assets/property-byt-ve-dvore.webp';
import bytMarianskaImage from '@/assets/property-byt-marianska.webp';
import bytCechovskaImage from '@/assets/property-byt-cechovska.webp';
import bytCapkuImage from '@/assets/property-byt-capku-pribram.webp';
import bytBezruceImage from '@/assets/property-byt-bezruce-pribram.webp';
import bytCertakImage from '@/assets/property-byt-certak-pribram.jpg';
import bytBrodskaImage from '@/assets/property-byt-brodska-pribram.webp';
import bytZdaborImage from '@/assets/property-byt-zdabor-slunna-pribram.webp';
import bytBeneseImage from '@/assets/property-byt-edvarda-benese-pribram.webp';
import dumTynecImage from '@/assets/property-dum-tynec-nad-sazavou.webp';
import dumBohutinImage from '@/assets/property-dum-bohutin.webp';

const properties = [
  {
    id: 16,
    title: 'Rodinný dům, Bohutín',
    location: 'Bohutín, okres Příbram',
    size: '94 m²',
    status: 'Prodáno',
    image: dumBohutinImage,
  },
  {
    id: 15,
    title: 'Rodinný dům, Týnec nad Sázavou',
    location: 'Týnec nad Sázavou',
    size: '234 m²',
    status: 'Prodáno',
    image: dumTynecImage,
  },
  {
    id: 14,
    title: 'Byt 2+kk, Příbram',
    location: 'Brodská, Příbram',
    size: '54 m²',
    status: 'Prodáno',
    image: bytBrodskaImage,
  },
  {
    id: 13,
    title: 'Byt 2+kk, Příbram',
    location: 'Zdaboř – Slunná, Příbram',
    size: '45 m²',
    status: 'Prodáno',
    image: bytZdaborImage,
  },
  {
    id: 12,
    title: 'Byt 3+kk, Příbram',
    location: 'Edvarda Beneše, Příbram',
    size: '60 m²',
    status: 'Prodáno',
    image: bytBeneseImage,
  },
  {
    id: 11,
    title: 'Byt 2+1, Příbram',
    location: 'Pod Čertovým pahorkem, Příbram',
    size: '58 m²',
    status: 'Prodáno',
    image: bytCertakImage,
  },
  {
    id: 10,
    title: 'Byt 2+1, Příbram',
    location: 'Petra Bezruče, Příbram',
    size: '59 m²',
    status: 'Prodáno',
    image: bytBezruceImage,
  },
  {
    id: 1,
    title: 'Byt 3+kk, Příbram',
    location: 'nám. 17. listopadu, Příbram VII',
    size: '61 m²',
    status: 'Prodáno',
    image: bytImage,
  },
  {
    id: 2,
    title: 'Rodinný dům, Příbram',
    location: 'Rožmitálská, Příbram VI – Březové Hory',
    size: '141 m²',
    status: 'Prodáno',
    image: dumImage,
  },
  {
    id: 3,
    title: 'Byt 3+1, Příbram',
    location: 'tř. Osvobození, Příbram VII',
    size: '75 m²',
    status: 'Prodáno',
    image: byt31Image,
  },
  {
    id: 4,
    title: 'Garáž, Příbram',
    location: 'Rožmitálská, Příbram VI – Březové Hory',
    size: '20 m²',
    status: 'Prodáno',
    image: garazImage,
  },
  {
    id: 5,
    title: 'Rodinný dům, Jelence',
    location: 'Jelence, okres Příbram',
    size: '224 m²',
    status: 'Prodáno',
    image: jelenceImage,
  },
  {
    id: 6,
    title: 'Byt 1+kk, Příbram',
    location: 'Ve Dvoře, Příbram',
    size: '23 m²',
    status: 'Prodáno',
    image: bytVeDvoreImage,
  },
  {
    id: 7,
    title: 'Byt 1+1, Příbram',
    location: 'Mariánská, Příbram',
    size: '27 m²',
    status: 'Prodáno',
    image: bytMarianskaImage,
  },
  {
    id: 8,
    title: 'Byt 2+kk, Příbram',
    location: 'Čechovská, Příbram',
    size: '47 m²',
    status: 'Prodáno',
    image: bytCechovskaImage,
  },
  {
    id: 9,
    title: 'Byt 3+1, Příbram',
    location: 'Bratří Čapků, Příbram',
    size: '64 m²',
    status: 'Prodáno',
    image: bytCapkuImage,
  },
];

const Prodano = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
              Realizované zakázky
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Prodané nemovitosti
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reference mluví za vše – prohlédněte si úspěšně dokončené případy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="property-card group"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-xl bg-muted">
                  <img
                    src={property.image}
                    alt={`${property.title} – ${property.location}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 md:p-6">
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
            className="text-center mt-16"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Chcete prodat svou nemovitost stejně úspěšně?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/odhad-nemovitosti#odhad-form')}
                className="uppercase tracking-wider text-sm font-bold px-10 h-14"
              >
                Odhad ceny zdarma
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate('/#contact')}
                className="uppercase tracking-wider text-sm font-medium px-10 h-14"
              >
                Kontaktujte mě
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Prodano;
