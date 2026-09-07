import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const PUBLISHED = '2026-05-22';
const PUBLISHED_DISPLAY = '22. května 2026';

const faqItems = [
  {
    q: 'Musím platit dědickou daň z nemovitosti?',
    a: 'Ne. Dědická daň byla v České republice zrušena v roce 2014. Nezáleží na hodnotě nemovitosti ani na tom, kdo dědí.',
  },
  {
    q: 'Mohu zděděnou nemovitost prodat, než skončí dědické řízení?',
    a: 'Ne. Prodej je možný až poté, co jste jako nový vlastník zapsáni v katastru nemovitostí. Rezervační smlouvu lze připravit dřív, ale vklad na kupujícího proběhne až po zápisu Vašeho vlastnictví.',
  },
  {
    q: 'Dědíme byt se sourozencem a on nechce prodat. Co mohu dělat?',
    a: 'Nejprve mu nabídněte odkoupení Vašeho podílu. Pokud odmítne, můžete svůj podíl nabídnout třetí osobě s respektováním jeho předkupního práva. Krajní možností je soudní zrušení a vypořádání spoluvlastnictví, které může skončit prodejem nemovitosti v dražbě. Soudní cesta je pomalá a drahá, dohoda je vždy lepší.',
  },
  {
    q: 'Jak se počítá časový test u zděděné nemovitosti?',
    a: 'Pokud jste zdědili v přímé linii (po rodičích, prarodičích, dětech nebo manželovi/manželce), do pětileté nebo desetileté lhůty se počítá i doba, po kterou nemovitost vlastnil zůstavitel. Pokud zůstavitel vlastnil nemovitost víc než 10 let a Vy ho zdědíte, prodáváte bez daně z příjmu.',
  },
  {
    q: 'Musím platit za odhad nemovitosti pro dědické řízení?',
    a: 'Odhad pro dědické řízení zajišťuje notář, náklady jsou součástí notářských poplatků za dědické řízení. Tržní odhad pro účely prodeje Vám připravím zdarma.',
  },
  {
    q: 'Co když zdědím nemovitost, která má závazky nebo hypotéku?',
    a: 'Dědictvím přebíráte i dluhy zůstavitele, pokud hodnota dluhu nepřesahuje hodnotu majetku. Hypotéku lze v rámci prodeje splatit z kupní ceny kupujícího. Tuto situaci je třeba probrat s bankou a notářem co nejdříve.',
  },
];

const BlogZdedenaNemovitost = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Jak prodat zděděnou nemovitost 2026: Průvodce od A do Z',
      'Zdědili jste nemovitost v Příbrami a nevíte jak dál? Dědické řízení, daně, prodej bez hádek spolumajitelů. Průvodce od makléře Radka Větrovského.',
      '/blog/jak-prodat-zdedenu-nemovitost-pribram'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Jak prodat zděděnou nemovitost v Příbrami 2026: Dědické řízení, daně a prodej krok za krokem',
      description: 'Zdědili jste nemovitost v Příbrami a nevíte jak dál? Dědické řízení, daně, prodej bez hádek spolumajitelů. Průvodce od makléře Radka Větrovského.',
      image: 'https://radek-vetrovsky.cz/assets/radek-vetrovsky.webp',
      author: {
        '@type': 'Person',
        name: 'Radek Větrovský',
        jobTitle: 'Realitní makléř',
        url: 'https://radek-vetrovsky.cz',
        telephone: '+420721855854',
        email: 'radek.vetrovsky@re-max.cz',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Radek Větrovský - RE/MAX',
        logo: { '@type': 'ImageObject', url: 'https://radek-vetrovsky.cz/images/logo.png' },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://radek-vetrovsky.cz/blog/jak-prodat-zdedenu-nemovitost-pribram',
      },
    });
    const cleanupFaq = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    const cleanupBreadcrumb = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://radek-vetrovsky.cz/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://radek-vetrovsky.cz/clanky' },
        { '@type': 'ListItem', position: 3, name: 'Jak prodat zděděnou nemovitost 2026' },
      ],
    });
    return () => { cleanupMeta(); cleanupArticle(); cleanupFaq(); cleanupBreadcrumb(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
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
                src="https://images.unsplash.com/photo-1778158257064-e8603dc1105a?w=1200&h=600&fit=crop&q=80"
                alt="Rustikální venkovská usedlost, symbol zděděné rodinné nemovitosti"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span>Autor: <strong className="text-foreground">Radek Větrovský</strong></span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Aktualizováno: {PUBLISHED_DISPLAY}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                10 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Zdědili jste nemovitost v Příbrami? Tady je přesně, jak ji prodat bez zbytečných chyb a ztrát
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Dědické řízení, daně, spolumajitelé, odhad ceny i výběr makléře. Kompletní průvodce prodejem zděděné nemovitosti krok za krokem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {/* Quick Answer */}
              <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-lg mb-12">
                <h2 className="text-xl font-bold text-foreground mb-3">Rychlá odpověď</h2>
                <p className="text-muted-foreground">
                  Zděděnou nemovitost můžete prodat až poté, co proběhne dědické řízení a Vy jste zapsáni jako vlastník v katastru nemovitostí. Dědická daň v ČR se od roku 2014 neplatí. Daň z příjmu při prodeji zděděného bytu nebo domu po rodičích nebo prarodičích většinou také neplatíte, protože do časového testu se Vám počítá i doba, po kterou nemovitost vlastnil zůstavitel. Pokud je více dědiců, musíte se na prodeji dohodnout nebo jeden z nich může podíl odkoupit. Celý proces od úmrtí po podpis kupní smlouvy trvá obvykle 6 až 18 měsíců.
                </p>
              </div>

              {/* Intro */}
              <div className="mb-12 space-y-4 text-muted-foreground">
                <p>
                  Zemřel Vám rodič nebo prarodič a zanechal za sebou byt nebo dům v Příbrami. Teď stojíte před otázkou, co s tím. Nemovitost chcete nebo potřebujete prodat, ale nevíte, kde začít, co smíte, co musíte a co Vás to celé bude stát. Navíc možná nejste jediný dědic a sourozenci nebo příbuzní mají jiný názor.
                </p>
                <p>
                  Tento článek Vám dá přesný postup. Od dědického řízení přes zápis do katastru, daně, odhad ceny až po samotný prodej. Bez zbytečného panikaření a bez překvapení.
                </p>
              </div>

              {/* H2 Kdy smíte prodat */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdy smíte zděděnou nemovitost vůbec prodat</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Prodat zděděnou nemovitost smíte až v okamžiku, kdy jste jako nový vlastník zapsáni v katastru nemovitostí. To se stane až po pravomocném ukončení dědického řízení.</p>
                  <p>Nemůžete prodat nemovitost, která je stále vedená na zesnulého. Ani tehdy ne, když je jasné, že jste jediný dědic a řízení dopadne ve Váš prospěch. Katastr nemovitostí přijme návrh na vklad nového vlastníka až na základě usnesení soudu nebo notáře z dědického řízení.</p>
                  <p><strong className="text-foreground">Výjimka:</strong> Kupní smlouvu a rezervační smlouvu lze připravit a podepsat ještě před zápisem do katastru, ale vklad vlastnického práva na kupujícího proběhne až po zápisu dědice.</p>
                </div>
              </div>

              {/* H2 Dědické řízení */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak probíhá dědické řízení u nemovitosti</h2>
                <p className="text-muted-foreground mb-6">Dědické řízení v ČR vede notář pověřený soudem. Průběh je následující:</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 1: Oznámení úmrtí a zahájení řízení</h3>
                <p className="text-muted-foreground mb-6">Pohřební služba nebo nemocnice automaticky oznamuje úmrtí matričnímu úřadu. Ten předá informaci soudu, soud pověří notáře. Vy nemusíte řízení sami zahajovat.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 2: Soupis majetku zůstavitele</h3>
                <p className="text-muted-foreground mb-6">Notář zjistí, co zemřelý vlastnil, včetně nemovitostí v katastru. Vy jako potenciální dědici máte povinnost spolupracovat a doložit potřebné dokumenty.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 3: Zjištění okruhu dědiců</h3>
                <p className="text-muted-foreground mb-6">Notář prověří závěť nebo zákonnou dědickou posloupnost. Zákonná posloupnost určuje, kdo dědí, pokud závěť neexistuje nebo pokud jmenuje jen část dědiců.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 4: Odhad ceny nemovitosti pro dědické řízení</h3>
                <p className="text-muted-foreground mb-6">Notář potřebuje zjistit cenu nemovitosti pro účely dědické daně a rozdělení pozůstalosti. Obvykle se vychází z tržního ocenění. Pozor: tato hodnota nemá přímý vliv na cenu, za kterou nemovitost prodáte, ale ovlivňuje vzájemné vypořádání mezi dědici.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 5: Dohoda dědiců nebo soudní rozhodnutí</h3>
                <p className="text-muted-foreground mb-6">Pokud se dědicové shodnou na rozdělení majetku, notář vydá usnesení o dědictví. Pokud se neshodnou, rozhodne soud, případně se každý dědic zapíše jako spolumajitel v poměru svého podílu.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Krok 6: Zápis do katastru nemovitostí</h3>
                <p className="text-muted-foreground mb-4">Na základě usnesení notáře nebo soudu se provede zápis nového vlastníka nebo spoluvlastníků do katastru. Od tohoto okamžiku smíte nemovitost prodat.</p>

                <p className="text-muted-foreground">Celý proces trvá podle složitosti pozůstalosti a vytíženosti notáře obvykle 3 až 12 měsíců. U komplikovaných případů i déle.</p>
              </div>

              {/* H2 Daně */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik zaplatíte na daních</h2>
                <p className="text-muted-foreground mb-6">Tohle je otázka, která zajímá každého dědice jako první. Dobrá zpráva: ve většině případů nic.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Dědická daň</h3>
                <p className="text-muted-foreground mb-6">V České republice se od roku 2014 dědická daň neplatí. Bez ohledu na hodnotu nemovitosti, bez ohledu na to, kdo dědí.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Daň z příjmu při prodeji zděděné nemovitosti</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>Tady je situace trochu složitější, ale stále příznivá pro většinu dědiců.</p>
                  <p>Pokud jste nemovitost zdědili v přímé linii (po rodičích, prarodičích, dětech nebo manželovi/manželce), do časového testu se Vám počítá i doba vlastnictví zůstavitele. Prakticky to znamená: babička vlastnila byt 25 let, Vy ho zdědíte v roce 2024 a prodáte v roce 2026. Daň z příjmu neplatíte. Lhůta dávno uplynula.</p>
                  <p>Jiná situace nastane, pokud jste zdědili po sourozenci, tetě, strýci nebo jiné osobě mimo přímou linii. Tam se časový test počítá až od okamžiku, kdy jste nemovitost zdědili Vy.</p>
                  <p>
                    Podrobněji jsou podmínky osvobození od daně z příjmu rozepsány v článku{' '}
                    <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-secondary hover:underline font-medium">
                      o daních z prodeje bytu v Příbrami
                    </Link>.
                  </p>
                </div>
              </div>

              {/* H2 Spolumajitelé */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Spolumajitelé: Co když dědí víc lidí najednou</h2>
                <p className="text-muted-foreground mb-6">Toto je nejčastější komplikace, se kterou se setkávám. Zemřel otec, zdědí tři sourozenci a každý má jiný názor na to, co s bytem dělat.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Varianta A: Všichni chtějí prodat</h3>
                <p className="text-muted-foreground mb-6">Nejjednodušší případ. Všichni spolumajitelé se dohodnou, pověří makléře, prodají a výtěžek si rozdělí podle podílů. Vše je věcí dohody.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Varianta B: Jeden chce prodat, ostatní ne</h3>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Tady to začíná být složité. Nikdo nemůže být nucen nemovitost prodat, ale také nemůže být donekonečna blokován ten, kdo prodat chce.</p>
                  <p>Spolumajitel, který chce skončit, má dvě legální cesty:</p>
                  <ol className="space-y-2 list-decimal pl-6">
                    <li>Svůj podíl nabídne ostatním spolumajitelům k odkoupení. Ostatní mají zákonné předkupní právo.</li>
                    <li>Pokud ostatní odkoupení odmítnou, může spolumajitel svůj podíl prodat třetí osobě. Stále musí ostatním nabídnout předkupní právo za stejných podmínek.</li>
                    <li>Pokud ani toto nepřichází v úvahu, lze podat návrh na zrušení a vypořádání spoluvlastnictví k soudu. Soud pak buď nařídí reálné rozdělení nemovitosti (pokud to jde), přikáže nemovitost jednomu spolumajiteli s povinností vyplatit ostatní, nebo nařídí prodej nemovitosti v dražbě.</li>
                  </ol>
                  <p>Soudní cesta je pomalá a drahá. Vždy se snažte o dohodu.</p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Varianta C: Jeden chce byt ponechat a ostatní vyplatit</h3>
                <p className="text-muted-foreground">Praktické řešení, které funguje u bytů nebo rodinných domů. Jeden dědic odkoupí podíly ostatních za dohodnutou nebo znalcem stanovenou cenu a stane se jediným vlastníkem. Na tento odkup si může vzít hypotéku.</p>
              </div>

              {/* H2 Cena */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak stanovit správnou prodejní cenu zděděné nemovitosti</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Zděděná nemovitost má dvě různé ceny, které si pletou i zkušení prodávající.</p>
                  <p><strong className="text-foreground">Cena pro dědické řízení:</strong> Stanovuje ji notář nebo jím pověřený znalec. Slouží pro účely dědictví. Tato hodnota nemusí odpovídat tržní realitě, zejména u nemovitostí ve špatném technickém stavu nebo naopak na atraktivních místech.</p>
                  <p><strong className="text-foreground">Tržní cena pro prodej:</strong> To je částka, za kterou nemovitost skutečně prodáte kupujícímu na volném trhu. Závisí na stavu nemovitosti, lokalitě, dispozici, poptávce a aktuální situaci na trhu v Příbrami.</p>
                  <p>Nenechte se zmanipulovat cenou z dědického řízení. Viděl jsem případy, kdy znalec stanovil hodnotu o 30 % nižší, než za co se nemovitost prodala. I opačně.</p>
                  <p>
                    Nechte si udělat nezávislý tržní odhad. Zdarma Vám ho připravím já v rámci{' '}
                    <Link to="/odhad-nemovitosti" className="text-secondary hover:underline font-medium">
                      odhadu nemovitosti
                    </Link>.
                  </p>
                </div>
              </div>

              {/* H2 Opravy */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Technický stav zděděné nemovitosti: Prodat tak, nebo investovat do oprav</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Zděděné nemovitosti bývají v horším technickém stavu. Starší majitelé neřešili výměnu oken, zateplení nebo rekonstrukci koupelny. Vy teď řešíte, co s tím.</p>
                  <p>Matematika je jednoduchá: opravit nebo neopravit.</p>
                  <p><strong className="text-foreground">Opravy dávají smysl</strong> tehdy, když každá koruna investovaná do rekonstrukce přinese v prodejní ceně více než jednu korunu. To platí u kosmetických úprav jako vymalování, úklid, odvoz nábytku a základní homestaging.</p>
                  <p><strong className="text-foreground">Opravy nedávají smysl</strong> tehdy, když investujete do rozsáhlé rekonstrukce, která prodejní cenu sice zvýší, ale o méně, než jste investovali. Kupující v Příbrami, kteří hledají nemovitosti na rekonstrukci, je aktivní a ví, co kupuje. Nechce platit tržní cenu za rekonstruovaný byt, pokud rekonstrukci dělal někdo jiný podle svého vkusu.</p>
                  <p><strong className="text-foreground">Pravidlo:</strong> Před jakoukoliv investicí do oprav si nechte udělat odhad ceny v aktuálním stavu a odhad ceny po případné rekonstrukci. Rozdíl musí pokrýt náklady na rekonstrukci plus Váš čas a riziko.</p>
                </div>
              </div>

              {/* H2 Postup prodeje */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak probíhá samotný prodej zděděné nemovitosti</h2>
                <p className="text-muted-foreground mb-6">Od zápisu do katastru je prodej zděděné nemovitosti shodný s prodejem jakékoliv jiné nemovitosti. Rozdíly jsou jen v detailech dokumentace.</p>

                <h3 className="text-xl font-bold text-foreground mb-3">Co budete potřebovat navíc oproti standardnímu prodeji</h3>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  {[
                    'Usnesení o dědictví (potvrzuje, že jste oprávněným vlastníkem)',
                    'Výpis z katastru nemovitostí na Vaše jméno',
                    'Případně souhlas ostatních spolumajitelů, pokud jich je více',
                    'Znalecký posudek, pokud ho budete chtít využít pro daňové účely',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-foreground mb-3">Postup prodeje krok za krokem</h3>
                <ol className="space-y-2 text-muted-foreground list-decimal pl-6">
                  <li>Zápis do katastru, ověřte aktuální výpis z katastru.</li>
                  <li>Tržní odhad nemovitosti.</li>
                  <li>Příprava nemovitosti: úklid, odvoz nepotřebných věcí, základní homestaging.</li>
                  <li>Profesionální fotografie a inzerce.</li>
                  <li>Prohlídky se zájemci.</li>
                  <li>Výběr kupujícího a podpis rezervační smlouvy.</li>
                  <li>Vyřízení financování kupujícího (hypotéka nebo hotovost).</li>
                  <li>Podpis kupní smlouvy a smlouvy o úschově kupní ceny.</li>
                  <li>Podání návrhu na vklad do katastru nemovitostí.</li>
                  <li>Uvolnění kupní ceny z úschovy po zápisu nového vlastníka.</li>
                </ol>
              </div>

              {/* H2 Chyby */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nejčastější chyby při prodeji zděděné nemovitosti</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Prodat dřív, než je zápis v katastru hotový.</strong> Nejde to a pokus o to způsobí jen problémy.</p>
                  <p><strong className="text-foreground">Nechat se řídit hodnotou z dědického řízení jako prodejní cenou.</strong> Ty dvě hodnoty spolu nesouvisí tak, jak si většina lidí myslí.</p>
                  <p><strong className="text-foreground">Investovat desítky tisíc do oprav bez předchozí analýzy návratnosti.</strong> Zbytečně spálené peníze.</p>
                  <p><strong className="text-foreground">Zaměňovat prodej celé nemovitosti s prodejem podílu.</strong> Každý spolumajitel může svůj podíl prodat komukoliv a souhlasu ostatních k tomu nepotřebuje. Problém nastává až při prodeji celé nemovitosti jako celku, kde je dohoda všech spolumajitelů nezbytná.</p>
                  <p><strong className="text-foreground">Spěchat.</strong> Dědická nemovitost je specifická situace a kupující to ví. Pokud budete prodávat v panice, dostanete nižší cenu.</p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Zděděnou nemovitost smíte prodat až po zápisu do katastru na základě dědického řízení.',
                    'Dědická daň v ČR neexistuje.',
                    'Daň z příjmu při prodeji většinou neplatíte, protože do časového testu se počítá i doba vlastnictví zůstavitele (platí pro přímou linii).',
                    'Pokud je více dědiců, bez jejich dohody nelze prodat nemovitost jako celek. Svůj vlastní podíl však může každý spolumajitel prodat samostatně komukoliv.',
                    'Před investicí do oprav si nechte spočítat návratnost.',
                    'Celý proces od úmrtí po podpis kupní smlouvy trvá obvykle 6 až 18 měsíců.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary font-bold mt-0.5">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Často kladené otázky</h2>
                <div className="space-y-3">
                  {faqItems.map((item, i) => (
                    <div key={i} className="border border-border rounded-lg overflow-hidden bg-card">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-base md:text-lg font-semibold text-foreground">{item.q}</h3>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-muted-foreground">{item.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Author box */}
              <div className="bg-muted rounded-2xl p-8 md:p-10 mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">O autorovi</h2>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={radekPhoto}
                    alt="Radek Větrovský – realitní makléř Příbram"
                    className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-2">Radek Větrovský</h3>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem prodeje včetně poradenství v daňových a právních otázkách spojených s převodem nemovitosti, a to i v situacích dědictví a spoluvlastnictví.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <a href="tel:+420721855854" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Phone className="h-4 w-4" /> +420 721 855 854
                    </a>
                    <a href="mailto:radek.vetrovsky@re-max.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Mail className="h-4 w-4" /> radek.vetrovsky@re-max.cz
                    </a>
                    <a href="https://radek-vetrovsky.cz" className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Globe className="h-4 w-4" /> Zahradnická 550, 261 01 Příbram III
                    </a>
                  </div>
                </div>
              </div>

              {/* Závěr + CTA */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Shrnutí a co dělat dál</h2>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Prodej zděděné nemovitosti je náročnější než standardní prodej, ale zvládnutelný. Klíčové je počkat na zápis do katastru, domluvit se se spolumajiteli, nenechat se zatlačit do špatné ceny a neunáhlit žádný krok.</p>
                  <p>Pokud jste zdědili nemovitost v Příbrami nebo okolí a nevíte jak dál, ozvěte se mi. Zdarma Vám připravím tržní odhad nemovitosti, projdeme spolu daňovou situaci a nastavíme realistický plán prodeje. Bez závazků.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Zdědili jste nemovitost a nevíte jak dál?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Ozvěte se mi a zdarma projdeme celou situaci. Odhad nemovitosti a konzultace bez závazků.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/odhad-nemovitosti"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Objednat odhad zdarma
                    </Link>
                    <a
                      href="tel:+420721855854"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-foreground/30 bg-transparent text-secondary-foreground font-semibold rounded-lg hover:bg-secondary-foreground/10 transition-colors text-lg"
                    >
                      <Phone className="h-5 w-5" /> +420 721 855 854
                    </a>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground italic mb-12">
                Článek vychází z platné legislativy k roku 2026 a má informativní charakter. Právní a daňová pravidla se mohou měnit, individuální situaci si vždy ověřte u notáře, daňového poradce nebo přímo na finančním úřadu. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Jak prodat rodinný dům v Příbrami: postup krok za krokem', slug: 'jak-prodat-rodinny-dum-pribram' },
                    { title: 'Daň z prodeje nemovitosti 2026: Kolik zaplatím v Příbrami?', slug: 'dan-z-prodeje-bytu-pribram-2026' },
                    { title: 'Jak správně ocenit nemovitost před prodejem', slug: 'jak-spravne-ocenit-nemovitost' },
                  ].map((a) => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="block p-5 bg-card border border-border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all group"
                    >
                      <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{a.title}</h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                        Číst více <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogZdedenaNemovitost;
