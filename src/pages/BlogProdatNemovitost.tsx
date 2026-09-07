import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const BlogProdatNemovitost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Prodat nemovitost v Příbrami bez realitky nebo s makléřem? | Radek Větrovský',
      'Porovnáváme prodej bez realitky a s makléřem v Příbrami. Konkrétní čísla, rizika a fakta, která vám pomohou rozhodnout se správně.',
      '/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Prodat nemovitost v Příbrami bez realitky nebo s makléřem?',
      description: 'Porovnáváme prodej bez realitky a s makléřem v Příbrami. Konkrétní čísla, rizika a fakta, která vám pomohou rozhodnout se správně.',
      datePublished: '2026-04-06',
      author: { '@type': 'Person', name: 'Radek Větrovský' },
      publisher: { '@type': 'Organization', name: 'RE/MAX' },
      image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=600&fit=crop',
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/clanky' },
        { '@type': 'ListItem', position: 3, name: 'Prodat nemovitost v Příbrami bez realitky nebo s makléřem?' },
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
                src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=600&fit=crop"
                alt="Prodej nemovitosti v Příbrami – předání klíčů"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                6. dubna 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                6 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Prodat nemovitost v Příbrami bez realitky nebo s makléřem?
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Stojíte před rozhodnutím, které může mít dopad v řádech statisíců korun. Porovnáme oba přístupy otevřeně a bez okolků — včetně rizik, která se často zamlčují.
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Proč je tato otázka důležitější než kdy dřív?</h2>
                <p className="text-muted-foreground mb-4">
                  Realitní trh v Příbrami zažívá v roce 2026 zvýšený pohyb. Ceny nemovitostí rostou, nabídka je omezená a kupující jsou vybíravější než před třemi lety. Právě v takovém prostředí rozhoduje každá tisícovka a každá chyba v procesu prodeje může stát desetitisíce.
                </p>
                <p className="text-muted-foreground mb-4">
                  Otázka „prodat sám nebo přes makléře" není pouze o provizi. Je to otázka o čase, riziku, vyjednávání a o tom, kolik skutečně dostanete do ruky. Tento článek vám dá konkrétní čísla a fakta, abyste se mohli rozhodnout správně.
                </p>
                <p className="text-muted-foreground">
                  Pokud ještě nevíte, kolik vaše nemovitost stojí, začněte{' '}
                  <Link to="/odhad-nemovitosti" className="text-secondary hover:underline font-medium">
                    bezplatným odhadem ceny
                  </Link>.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Prodej bez makléře: Co to skutečně znamená</h2>
                <p className="text-muted-foreground mb-4">
                  Prodej bez realitní kanceláře — tzv. prodej „na vlastní pěst" — vypadá na papíře lákavě. Ušetříte provizi, která se v oblasti Příbrami pohybuje typicky mezi 3 až 5 % z kupní ceny. U bytu za 3,5 milionu korun je to 105 000 až 175 000 Kč.
                </p>
                <p className="text-muted-foreground mb-6">
                  Jenomže praxe je složitější. Podívejme se na to, co vás skutečně čeká.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">Co musím zvládnout sám?</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    'Správně ocenit nemovitost na základě aktuálního trhu',
                    'Vytvořit profesionální fotografie a popis inzerátu',
                    'Zveřejnit inzerát na placené portály (Sreality, Bezrealitky, Reality.cz)',
                    'Komunikovat s desítkami zájemců včetně nevhodných',
                    'Organizovat prohlídky a filtrovat vážné zájemce',
                    'Vyjednat kupní cenu bez ztráty',
                    'Zajistit kupní smlouvu, návrh na vklad do katastru a uložení peněz do úschovy',
                    'Řešit převzetí nemovitosti a předávací protokol',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-8">
                  <p className="text-foreground font-medium">
                    📊 <strong>Důležitá informace:</strong> Podle dat Českého statistického úřadu trvá průměrná doba prodeje nemovitosti při samoprodeji o 30–50 % déle než při profesionálně vedené transakci. Delší doba prodeje = vyšší náklady na hypotéku, energie a pojištění.
                  </p>
                  <a href="https://www.czso.cz/csu/czso/ceny-nemovitosti" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm mt-2 inline-block">
                    Zdroj: czso.cz
                  </a>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Kde samoprodejci nejčastěji chybují</h3>
                <ol className="space-y-3 mb-6">
                  {[
                    { title: 'Podhodnocení nebo přecenění nemovitosti', desc: '— příliš vysoká cena odrazuje kupující, příliš nízká krátí vaši kapsu.' },
                    { title: 'Nekvalitní foto a popis', desc: '— kupující dnes prochází desítky inzerátů. Chybí-li první dojem, neinzerujete vůbec.' },
                    { title: 'Právní chyby v dokumentech', desc: '— špatně sestavená kupní smlouva může způsobit zdržení katastrálního řízení nebo spor.' },
                    { title: 'Riziko podvodu', desc: '— bez zkušeností je těžší odhalit nečestné jednání.' },
                    { title: 'Dávání slev pod tlakem', desc: '— bez tréninku ve vyjednávání prodejce často ustoupí více, než je nutné.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-muted-foreground">
                      <span className="bg-secondary text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                      <span><strong className="text-foreground">{item.title}</strong> {item.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Section 3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Prodej s makléřem: Co získáte — a co zaplatíte</h2>
                <p className="text-muted-foreground mb-6">
                  Dobře vybraný makléř není jen zprostředkovatel. Je to obchodní partner, právní štít a marketingový odborník v jedné osobě. Ale není to zadarmo — a ne všichni makléři odvádějí stejnou práci.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">Za co konkrétně platíte</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    'Odborná cenová analýza a načasování nabídky na trh',
                    'Profesionální fotografie, 3D prohlídky a marketing na top portálech',
                    'Aktivní vyhledávání kupujících z databáze (bez čekání na inzerát)',
                    'Právní zajištění: ověřené kupní smlouvy, depozitum v notářské úschovně',
                    'Koordinace prohlídek a filtrování vážných zájemců',
                    'Vyjednání lepší ceny — zkušený makléř často dosáhne vyšších výsledků než samoprodejce',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-8">
                  <p className="text-foreground font-medium">
                    💡 <strong>Reálná praxe Radka Větrovského:</strong> Jako makléř RE/MAX mám přístup k databázi aktivních kupujících, kteří hledají nemovitost právě v Příbrami a okolí. Některé nemovitosti prodávám dříve, než se vůbec dostanou na veřejný portál.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Provize: Jak ji správně posoudit</h3>
                <p className="text-muted-foreground mb-6">
                  Provize 3–5 % vypadá jako velká částka. Ale porovnejte to s reálným výsledkem:
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">Faktor</th>
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">Samoprodej</th>
                        <th className="border border-border px-4 py-3 text-left text-sm font-bold text-foreground">S makléřem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Časová investice', '40–80 hodin', 'Minimální'],
                        ['Průměrná doba prodeje', '4–9 měsíců', '2–4 měsíce'],
                        ['Právní jistota', 'Riziko chyb', 'Ověřené smlouvy'],
                        ['Dosažená cena', 'Často −5 až −10 %', 'Optimální tržní cena'],
                        ['Náklady na inzerci', '15 000–30 000 Kč', 'V provizi'],
                        ['Vyjednávací pozice', 'Slabá', 'Profesionální'],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 1 ? 'bg-muted/50' : ''}>
                          <td className="border border-border px-4 py-3 text-sm text-foreground font-medium">{row[0]}</td>
                          <td className="border border-border px-4 py-3 text-sm text-muted-foreground">{row[1]}</td>
                          <td className="border border-border px-4 py-3 text-sm text-muted-foreground">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-muted-foreground">
                  Zjednodušeně řečeno: provize makléře se často plně pokryje vyšším výsledkem prodeje a úsporou času. Provize je navíc daňově uznatelný náklad při prodeji — podrobně jsem to rozepsal v článku{' '}
                  <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-secondary hover:underline font-medium">o daních z prodeje bytu v Příbrami</Link>.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Kdy se vyplatí prodat sám</h2>
                <p className="text-muted-foreground mb-4">
                  Jsou situace, kdy samoprodej může dávat smysl. Buďte vůči nim však kritičtí.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Máte právní vzdělání nebo zkušenost z realit',
                    'Kupujícího už znáte — například rodinný člen nebo soused',
                    'Nemovitost je specifická a trh je pro ni velmi úzký',
                    'Máte čas, který jinak nemá ekonomickou hodnotu',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground">
                  Ve všech ostatních případech — a to je drtivá většina — profesionální zastoupení přinese vyšší čistou částku po odečtení provize. Chcete vědět, kolik skutečně získáte? Podívejte se na{' '}
                  <Link to="/#sluzby" className="text-secondary hover:underline font-medium">
                    služby Radka Větrovského
                  </Link>.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Jak vybrat správného makléře v Příbrami</h2>
                <p className="text-muted-foreground mb-4">
                  Ne každý makléř je stejný. Před podpisem mandátní smlouvy si ověřte tyto věci:
                </p>
                <ol className="space-y-3 mb-6">
                  {[
                    { title: 'Reference', desc: '— ne jen čísla, ale konkrétní hodnocení od reálných klientů. Podívejte se na Google recenze.' },
                    { title: 'Portfolio prodaných nemovitostí v oblasti Příbramska', desc: '. Lokální znalost má velkou cenu.' },
                    { title: 'Konkrétní marketingový plán', desc: '— jak a kde bude nemovitost inzerována.' },
                    { title: 'Transparentnost provize a podmínek smlouvy', desc: '. Pozor na exkluzivní smlouvy bez výpovědi.' },
                    { title: 'Komunikace', desc: '— jak rychle odpovídá, jak srozumitelně vysvětluje.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-muted-foreground">
                      <span className="bg-secondary text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                      <span><strong className="text-foreground">{item.title}</strong>{item.desc}</span>
                    </li>
                  ))}
                </ol>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-8">
                  <p className="text-foreground font-medium">
                    🏠 <strong>RE/MAX</strong> je největší realitní síť na světě. Jako makléř pod značkou RE/MAX Power 2 v Příbrami mám přístup k nástrojům, které běžní makléři nemají — včetně platformy pro sdílení nabídek mezi 9 000 kancelářemi ve 110 zemích.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Jak probíhá prodej s Radkem Větrovským</h2>
                <p className="text-muted-foreground mb-6">
                  Celý proces je rozdělen do jasných fází, které řídím já — vy jen přijmete nabídku a klíče.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Bezplatná konzultace a odhad ceny',
                    'Příprava nemovitosti: fotografie, home staging, 3D prohlídka',
                    'Spuštění inzerce na všech klíčových portálech + oslovení z databáze kupujících',
                    'Prohlídky a filtrování zájemců',
                    'Vyjednání nejlepší ceny',
                    'Právní zajištění: kupní smlouva, notářská úschovna, převod katastru',
                    'Předání klíčů novým majitelům',
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                      <p className="text-muted-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Block */}
                <div className="bg-secondary/10 border border-secondary/20 p-8 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Chcete prodat nemovitost v Příbrami co nejrychleji a za nejlepší cenu?
                  </h3>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors text-lg mt-4"
                  >
                    Domluvit bezplatnou konzultaci
                  </Link>
                </div>
              </div>

              {/* Section 7 — Závěr */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Závěr: Správná otázka není „ušetřit provizi" — ale „kolik dostat do ruky"</h2>
                <p className="text-muted-foreground mb-4">
                  Prodej nemovitosti je pravděpodobně největší finanční transakce vašeho života. Správný rozhodovací rámec není „jak ušetřit na provizi", ale „jak dostat do ruky co nejvíce peněz s co nejmenším rizikem a vynaložením času".
                </p>
                <p className="text-muted-foreground mb-6">
                  Pro většinu prodejců v Příbrami a okolí to znamená spolupracovat se zkušeným lokálním makléřem, který zná trh, má databázi kupujících a umí nemovitost správně nastavit na trh.
                </p>
                <p className="text-muted-foreground mb-4">
                  Podívejte se také na:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">
                      Jak správně ocenit nemovitost před prodejem
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/investicni-nemovitosti-pribram" className="text-secondary hover:underline font-medium">
                      Investiční nemovitosti Příbram: Vyplatí se to v roce 2026?
                    </Link>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1">→</span>
                    <Link to="/blog/jak-prodat-zdedenu-nemovitost-pribram" className="text-secondary hover:underline font-medium">
                      U zděděných nemovitostí je situace specifická, viz samostatný průvodce
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Zdroje a další čtení</h2>
                <ul className="space-y-2">
                  {[
                    { label: 'Český statistický úřad — Statistika realitního trhu ČR 2025', url: 'https://www.czso.cz/csu/czso/ceny-nemovitosti' },
                    { label: 'Ministerstvo pro místní rozvoj — Bytová politika ČR', url: 'https://www.mmr.cz/cs/stavebni-rad-a-bytova-politika/bytova-politika' },
                    { label: 'Asociace realitních kanceláří ČR — Etický kodex a standard služeb', url: 'https://www.aok.cz/standardy' },
                    { label: 'Katastr nemovitostí (ČÚZK) — Ověření stavu nemovitosti', url: 'https://www.cuzk.cz' },
                    { label: 'RE/MAX Czech Republic — Portfolio a databáze nabídek', url: 'https://www.remax-czech.cz' },
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

export default BlogProdatNemovitost;
