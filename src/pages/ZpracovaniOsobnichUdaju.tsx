import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta } from '@/lib/seo';

const ZpracovaniOsobnichUdaju = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = setPageMeta(
      'Zpracování osobních údajů | Radek Větrovský',
      'Informace o zpracování osobních údajů prostřednictvím kontaktního formuláře na stránkách Radka Větrovského.',
      '/zpracovani-osobnich-udaju'
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
            Zpracování osobních údajů – kontaktní formulář
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            Odesláním kontaktního formuláře na webových stránkách radekvetrovsky.cz udělujete souhlas
            se zpracováním svých osobních údajů správci — Radku Větrovskému, IČ: 23006099.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Rozsah zpracovávaných údajů</h2>
          <p className="text-muted-foreground leading-relaxed">
            Prostřednictvím kontaktního formuláře jsou zpracovávány tyto údaje:
          </p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li>Jméno a příjmení</li>
            <li>E-mailová adresa</li>
            <li>Telefonní číslo</li>
            <li>Text zprávy</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Účel zpracování</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vaše údaje budou použity výhradně za účelem:
          </p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li>Odpovědi na váš dotaz nebo poptávku</li>
            <li>Navázání obchodní komunikace ohledně realitních služeb</li>
            <li>Poskytnutí bezplatného odhadu nemovitosti (pokud o něj žádáte)</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Právní základ</h2>
          <p className="text-muted-foreground leading-relaxed">
            Zpracování probíhá na základě vašeho <strong className="text-foreground">souhlasu</strong> dle čl. 6
            odst. 1 písm. a) Nařízení (EU) 2016/679 (GDPR). Souhlas udělujete odesláním formuláře
            a můžete jej kdykoli odvolat zasláním e-mailu na{' '}
            <a href="mailto:radek.vetrovsky@re-max.cz" className="text-primary hover:underline">
              radek.vetrovsky@re-max.cz
            </a>.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Doba zpracování</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vaše údaje budou uchovávány po dobu nezbytnou k vyřízení vašeho dotazu, maximálně však
            po dobu <strong className="text-foreground">3 let</strong> od odeslání formuláře, pokud nedojde k navázání
            smluvního vztahu (v takovém případě se doba řídí příslušnými právními předpisy).
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Vaše práva</h2>
          <p className="text-muted-foreground leading-relaxed">
            V souvislosti se zpracováním osobních údajů máte právo:
          </p>
          <ul className="text-muted-foreground space-y-2 mt-3">
            <li>Požadovat informace o zpracování svých údajů</li>
            <li>Požadovat opravu nebo výmaz údajů</li>
            <li>Odvolat udělený souhlas</li>
            <li>Podat stížnost u Úřadu pro ochranu osobních údajů (
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.uoou.cz
              </a>)
            </li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Kontakt na správce</h2>
          <div className="text-muted-foreground leading-relaxed space-y-1">
            <p className="mb-1"><strong className="text-foreground">Radek Větrovský</strong></p>
            <p className="mb-1">Zahradnická 550, 261 01 Příbram III</p>
            <p className="mb-1">
              E-mail:{' '}
              <a href="mailto:radek.vetrovsky@re-max.cz" className="text-primary hover:underline">
                radek.vetrovsky@re-max.cz
              </a>
            </p>
            <p className="mb-1">
              Telefon:{' '}
              <a href="tel:+420721855854" className="text-primary hover:underline">
                +420 721 855 854
              </a>
            </p>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border/30">
            <p className="text-sm text-muted-foreground">
              Kompletní informace o ochraně osobních údajů naleznete v{' '}
              <Link to="/gdpr" className="text-primary hover:underline font-medium">
                Zásadách ochrany osobních údajů (GDPR)
              </Link>.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-border/30">
            Poslední aktualizace: únor 2026
          </p>
        </motion.article>
      </div>
    </main>
  );
};

export default ZpracovaniOsobnichUdaju;
