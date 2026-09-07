import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '@/lib/seo';

const GDPR = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = setPageMeta(
      'Ochrana osobních údajů (GDPR) | Radek Větrovský',
      'Zásady ochrany osobních údajů (GDPR) realitního makléře Radka Větrovského, RE/MAX Příbram.',
      '/gdpr'
    );
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na hlavní stránku
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-neutral max-w-none"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Zásady ochrany osobních údajů (GDPR)
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            Tento dokument popisuje, jakým způsobem Radek Větrovský, IČ: 23006099 (dále jen „správce")
            zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679
            (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">1. Správce osobních údajů</h2>
          <div className="text-muted-foreground leading-relaxed space-y-1">
            <p className="mb-1"><strong className="text-foreground">Jméno:</strong> Radek Větrovský</p>
            <p className="mb-1"><strong className="text-foreground">IČ:</strong> 23006099</p>
            <p className="mb-1"><strong className="text-foreground">Adresa:</strong> Zahradnická 550, 261 01 Příbram III</p>
            <p className="mb-1"><strong className="text-foreground">E-mail:</strong>{' '}
              <a href="mailto:radek.vetrovsky@re-max.cz" className="text-primary hover:underline">
                radek.vetrovsky@re-max.cz
              </a>
            </p>
            <p className="mb-1"><strong className="text-foreground">Telefon:</strong>{' '}
              <a href="tel:+420721855854" className="text-primary hover:underline">
                +420 721 855 854
              </a>
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">2. Jaké údaje zpracováváme</h2>
          <p className="text-muted-foreground leading-relaxed">Zpracováváme následující kategorie osobních údajů:</p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li><strong className="text-foreground">Identifikační údaje:</strong> jméno a příjmení</li>
            <li><strong className="text-foreground">Kontaktní údaje:</strong> e-mailová adresa, telefonní číslo</li>
            <li><strong className="text-foreground">Obsah zprávy:</strong> text zprávy zaslaný prostřednictvím kontaktního formuláře</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">3. Účel zpracování</h2>
          <p className="text-muted-foreground leading-relaxed">Osobní údaje zpracováváme za účelem:</p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li>Odpovědi na vaši poptávku nebo dotaz</li>
            <li>Poskytnutí realitních služeb (odhad nemovitosti, zprostředkování prodeje/pronájmu)</li>
            <li>Komunikace v rámci obchodního vztahu</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">4. Právní základ zpracování</h2>
          <p className="text-muted-foreground leading-relaxed">
            Zpracování osobních údajů probíhá na základě:
          </p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li><strong className="text-foreground">Oprávněného zájmu</strong> správce (čl. 6 odst. 1 písm. f) GDPR) – odpověď na poptávku klienta</li>
            <li><strong className="text-foreground">Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b) GDPR) – poskytování realitních služeb</li>
            <li><strong className="text-foreground">Souhlasu</strong> (čl. 6 odst. 1 písm. a) GDPR) – v případě odeslání kontaktního formuláře</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">5. Doba uchovávání</h2>
          <p className="text-muted-foreground leading-relaxed">
            Osobní údaje uchováváme po dobu nezbytnou k naplnění účelu zpracování, nejdéle však
            po dobu 3 let od posledního kontaktu, pokud není právním předpisem stanoveno jinak.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">6. Příjemci údajů</h2>
          <p className="text-muted-foreground leading-relaxed">
            Osobní údaje nepředáváme třetím stranám s výjimkou případů, kdy je to nezbytné pro
            poskytnutí služby (např. spolupráce s RE/MAX) nebo kdy nám to ukládá zákon.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">7. Vaše práva</h2>
          <p className="text-muted-foreground leading-relaxed">Jako subjekt údajů máte právo:</p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li>Na <strong className="text-foreground">přístup</strong> ke svým osobním údajům</li>
            <li>Na <strong className="text-foreground">opravu</strong> nepřesných údajů</li>
            <li>Na <strong className="text-foreground">výmaz</strong> údajů (právo být zapomenut)</li>
            <li>Na <strong className="text-foreground">omezení zpracování</strong></li>
            <li>Na <strong className="text-foreground">přenositelnost</strong> údajů</li>
            <li><strong className="text-foreground">Vznést námitku</strong> proti zpracování</li>
            <li><strong className="text-foreground">Odvolat souhlas</strong> se zpracováním</li>
            <li>Podat <strong className="text-foreground">stížnost</strong> u Úřadu pro ochranu osobních údajů (
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.uoou.cz
              </a>)
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">8. Kontakt</h2>
          <p className="text-muted-foreground leading-relaxed">
            V případě jakýchkoli dotazů ohledně zpracování osobních údajů mě neváhejte kontaktovat
            na e-mailu{' '}
            <a href="mailto:radek.vetrovsky@re-max.cz" className="text-primary hover:underline">
              radek.vetrovsky@re-max.cz
            </a>{' '}
            nebo telefonicky na{' '}
            <a href="tel:+420721855854" className="text-primary hover:underline">
              +420 721 855 854
            </a>.
          </p>

          <p className="text-sm text-muted-foreground mt-12 pt-8 border-t border-border/30">
            Poslední aktualizace: únor 2026
          </p>
        </motion.article>
      </div>
    </main>
  );
};

export default GDPR;
