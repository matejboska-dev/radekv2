import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const REMAX_LOGO = 'https://www.remax-czech.cz/bundles/daltenweb/img/logo/remax-cze_balon_logo_2.svg?20250618';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold mb-2 text-background">Radek Větrovský</h3>
            <img
              src={REMAX_LOGO}
              alt="RE/MAX Česká republika"
              className="h-10 w-auto mb-4 brightness-0 invert"
              width="40"
              height="40"
              loading="lazy"
            />
            <p className="text-background/70 mb-4">
              Realitní makléř pro Příbram a Prahu. Specializace na prodej a pronájem bytů, domů a pozemků.
            </p>
            <p className="text-sm text-background/50">
              IČ: 23006099
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-background">Rychlé odkazy</h4>
            <ul className="space-y-2">
              {[
                { label: 'Služby', href: '#services' },
                { label: 'O mně', href: '#about' },
                { label: 'Reference', href: '#properties' },
                { label: 'Kontakt', href: '#contact' },
                { label: 'Odhad zdarma', href: '/odhad-nemovitosti' },
                { label: 'Ochrana osobních údajů', href: '/gdpr' },
                { label: 'Zpracování osobních údajů', href: '/zpracovani-osobnich-udaju' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-underline text-background/70 hover:text-background transition-colors pb-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-background">Kontakt</h4>
            <address className="not-italic" itemScope itemType="https://schema.org/PostalAddress">
              <ul className="space-y-3 list-none p-0 m-0">
                <li>
                  <a href="tel:+420721855854" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors" itemProp="telephone">
                    <Phone className="h-4 w-4" />
                    +420 721 855 854
                  </a>
                </li>
                <li>
                  <a href="mailto:radek.vetrovsky@re-max.cz" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors" itemProp="email">
                    <Mail className="h-4 w-4" />
                    radek.vetrovsky@re-max.cz
                  </a>
                </li>
                <li className="flex items-start gap-3 text-background/70">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <span itemProp="streetAddress">Zahradnická 550</span><br />
                    <span itemProp="postalCode">261 01</span> <span itemProp="addressLocality">Příbram III</span>
                  </span>
                </li>
              </ul>
            </address>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-background/50 mb-4 md:mb-0">
            <span>© {currentYear} Radek Větrovský. Všechna práva vyhrazena.</span>
            <span>•</span>
            <span>
              <a
                href="https://matejboska.cz"
                target="_blank"
                rel="noopener"
                title="DESIGN by Matěj Boška"
                className="hover:text-background transition-colors font-medium"
              >
                DESIGN by Matěj Boška
              </a>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
            Zpět nahoru
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
