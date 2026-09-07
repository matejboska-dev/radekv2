import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, KeyRound, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1643804926339-e94f0a655185?w=1200&h=800&fit=crop&q=80';
const signingImage = 'https://images.unsplash.com/photo-1764231467852-b609a742e082?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-07-13';
const PUBLISHED_DISPLAY = '13. července 2026';

const faqItems = [
  {
    q: 'Kdo platí rezervační poplatek – kupující, nebo prodávající?',
    a: 'Rezervační poplatek platí vždy kupující, obvykle ve výši 3 až 5 % z kupní ceny, výjimečně až 10 %. Poplatek dává prodávajícímu jistotu vážného zájmu a kupujícímu čas na vyřízení hypotéky a právní prověrky.',
  },
  {
    q: 'Co se stane s rezervačním poplatkem, pokud kupní smlouva nakonec nevznikne?',
    a: 'Záleží na textu rezervační smlouvy. Pokud smlouva selže vinou kupujícího, poplatek často propadá jako smluvní pokuta nebo úhrada provize realitní kanceláře. Pokud vinu nese prodávající, měl by poplatek kupujícímu vrátit v plné výši. Přesné podmínky musí smlouva výslovně popsat.',
  },
  {
    q: 'Je bezpečnější advokátní, notářská, nebo bankovní úschova kupní ceny?',
    a: 'Advokátní úschova je dnes díky rozšířenému dohledu České advokátní komory a garančnímu fondu z roku 2026 prakticky bezriziková, a proto ji u prodejů v Příbrami doporučuji a řeším nejčastěji. Notářská úschova má pevně daný tarif a bývá dražší. Bankovní úschova je sice pod dohledem ČNB, ale jde o složitější proces s vyššími poplatky, proto ji volím jen u vyšších částek na výslovné přání klienta.',
  },
  {
    q: 'Kolik stojí advokátní úschova kupní ceny?',
    a: 'Odměna advokáta za úschovu se obvykle pohybuje od 3 000 Kč u menších částek po 0,5 až 1,5 % z uschované sumy u vyšších cen. Pokud si výslovně nezvolíte jinou variantu, náklady na advokátní úschovu jako makléř hradím já, takže Vás ani kupujícího nic navíc nestojí.',
  },
  {
    q: 'Jak dlouho trvá, než se peníze z úschovy vyplatí prodávajícímu?',
    a: 'Po podpisu kupní smlouvy běží zákonná 20denní ochranná lhůta na katastru nemovitostí, teprve po ní a po zápisu vlastnického práva (lhůta max. 30 dní od podání návrhu) dojde k výplatě z úschovy. Optimisticky počítejte se 4 až 6 týdny, reálně častěji s 2 až 3 měsíci od podpisu kupní smlouvy.',
  },
  {
    q: 'Můžu nechat peníze v úschově přímo u realitní kanceláře?',
    a: 'Ano, od roku 2020 to upravuje zákon o realitním zprostředkování. Realitka musí peníze klientů vést na účtu odděleném od svého provozního účtu. Výhodou bývá, že taková úschova je zahrnutá v provizi a nestojí nic navíc, přesto se vyplatí ověřit, že konkrétní kancelář tuto povinnost skutečně dodržuje.',
  },
];

const EscrowCostChart = () => {
  const items = [
    { label: 'Advokátní úschova (doporučeno)', value: 6, display: 'hradím já, pokud nezvolíte jinak' },
    { label: 'Realitní úschova (u makléře)', value: 8, display: 'zahrnuto v provizi' },
    { label: 'Notářská úschova', value: 68, display: 'pevný tarif, hradí klient' },
    { label: 'Bankovní úschova (vázaný účet)', value: 100, display: 'nejsložitější proces, nejdráž, hradí klient' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Kdo platí úschovu kupní ceny</h3>
      <p className="text-sm text-muted-foreground mb-6">Advokátní úschovu jako standardní řešení hradím jako makléř já, ostatní varianty si hradí kupující nebo prodávající podle dohody</p>
      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between items-baseline mb-1.5 gap-4">
              <span className="text-sm text-foreground font-medium">{item.label}</span>
              <span className="text-sm font-bold text-primary shrink-0">{item.display}</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.value}%`, opacity: 0.45 + i * 0.18 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { step: '1', title: 'Rezervační smlouva', desc: 'Podpis a rezervační poplatek 3–5 %' },
    { step: '2', title: 'Kupní a úschovní smlouva', desc: 'Kupní cena putuje do úschovy' },
    { step: '3', title: 'Podání na katastr', desc: 'Start 20denní ochranné lhůty' },
    { step: '4', title: 'Zápis vlastnictví', desc: 'Zákonná lhůta max. 30 dní' },
    { step: '5', title: 'Výplata z úschovy', desc: 'Peníze na Váš účet' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Časová osa: od rezervace k penězům na účtu</h3>
      <p className="text-sm text-muted-foreground mb-6">Optimisticky 4–6 týdnů, reálně častěji 2–3 měsíce</p>

      {/* Desktop / tablet: horizontal stepper */}
      <div className="hidden sm:block">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <Fragment key={s.step}>
              <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
                {s.step}
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-border mx-2" />}
            </Fragment>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3 mt-3">
          {steps.map((s) => (
            <div key={s.step}>
              <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stepper */}
      <div className="sm:hidden">
        {steps.map((s, i) => (
          <div key={s.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center">
                {s.step}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
            </div>
            <div className={i < steps.length - 1 ? 'pb-6' : ''}>
              <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RiskGraphic = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
      <ShieldAlert className="h-5 w-5 text-secondary" />
      Co riskujete bez jasně napsané smlouvy a bez úschovy
    </h3>
    <div className="grid sm:grid-cols-2 gap-4 mb-6">
      <div className="p-6 bg-muted rounded-xl">
        <div className="text-base font-bold text-secondary mb-2">Bez jasné rezervační smlouvy</div>
        <p className="text-sm text-muted-foreground">Kupující odstoupí bez postihu, Vy přijdete o čas i o jiné zájemce, kteří mezitím koupili jinde. Nejasně popsaný rezervační poplatek navíc často končí u sporu o to, komu vlastně patří.</p>
      </div>
      <div className="p-6 bg-secondary/10 border-2 border-secondary/30 rounded-xl">
        <div className="text-base font-bold text-secondary mb-2">Bez úschovy kupní ceny</div>
        <p className="text-sm text-muted-foreground">Peníze putují přímo mezi účty bez pojistky. Pokud se převod na katastru zkomplikuje, nemáte jistotu, že peníze dostanete, i když nemovitost prakticky prodáte.</p>
      </div>
    </div>
    <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
      <span className="text-xl leading-none">⚠</span>
      <p className="text-sm text-foreground">
        Historicky se objevily i případy zpronevěry ze strany jednotlivých advokátů. Proto od roku 2026 platí rozšířený dohled České advokátní komory nad advokátními účty a garanční fond, který riziko dál snižuje, a proto má smysl volbu správce úschovy nepodcenit.
      </p>
    </div>
  </div>
);

const BlogRezervaceUschova = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Rezervační smlouva a úschova kupní ceny: průvodce 2026',
      'Rezervační smlouva a úschova kupní ceny chrání prodávajícího i kupujícího. Poplatek 3–5 %, úschova od 3 000 Kč. Poradí makléř z Příbrami.',
      '/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Rezervační smlouva a úschova kupní ceny: jak při prodeji nepřijít o peníze ani o kupce',
      description: 'Rezervační smlouva a úschova kupní ceny chrání prodávajícího i kupujícího. Poplatek 3–5 %, úschova od 3 000 Kč. Poradí makléř z Příbrami.',
      image: heroImage,
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
        '@id': 'https://radek-vetrovsky.cz/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Rezervační smlouva a úschova kupní ceny' },
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
                src={heroImage}
                alt="Svazek klíčů od nemovitosti na dřevěném stole po úspěšném prodeji"
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
              Rezervační smlouva a úschova kupní ceny: jak při prodeji nepřijít o peníze ani o kupce
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Máte konečně kupce na byt nebo dům v Příbrami a najednou řešíte rezervační smlouvu a úschovu kupní ceny. Bojíte se, že kupující beztrestně odstoupí, nebo že peníze z prodeje „zmizí" cestou k Vám na účet? Obě obavy jsou pochopitelné, ale přesně proti nim tyhle dva nástroje existují.
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
                  Rezervační smlouva stahuje nemovitost z nabídky výměnou za rezervační poplatek, obvykle 3 až 5 % z kupní ceny, výjimečně až 10 %. Poplatek platí kupující a smlouva by měla přesně popsat, co se s ním stane, pokud k prodeji nakonec nedojde. Úschova kupní ceny pak chrání obě strany mezi podpisem kupní smlouvy a zápisem vlastnického práva do katastru, peníze leží u advokáta, notáře, banky nebo realitní kanceláře a vyplatí se Vám jako prodávajícímu až po potvrzeném převodu. Jako standardní řešení využívám advokátní úschovu, dnes díky dohledu České advokátní komory a garančnímu fondu prakticky bezrizikovou, a pokud si nezvolíte jinak, náklady na ni hradím já. Bankovní úschova je naopak složitější proces a vychází nejdráž. Celý proces od podpisu rezervační smlouvy po peníze na účtu trvá obvykle 4 až 6 týdnů v ideálním případě, reálně častěji 2 až 3 měsíce.
                </p>
              </div>

              {/* H2 Co je rezervační smlouva */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co je rezervační smlouva a proč se podepisuje</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Rezervační smlouva je první právně závazný krok po tom, co se najde vážný zájemce o Vaši nemovitost. Zavážete se v ní nemovitost dál nenabízet a neprodat ji nikomu jinému, kupující se zaváže zaplatit rezervační poplatek jako důkaz, že to s koupí myslí vážně. Smlouva zároveň dává kupujícímu čas na vyřízení hypotéky a právní prověrku nemovitosti, aniž by riskoval, že mu byt mezitím prodáte pod rukou jinému zájemci.
                  </p>
                  <p>
                    Rezervační smlouva není v zákoně samostatně upravená, takže může mít různou podobu. Pokud prodáváte přes realitní kancelář, bývá smlouva třístranná, mezi Vámi, kupujícím a makléřem. Pokud prodáváte sami, jde obvykle o smlouvu dvoustrannou. Měla by vždy obsahovat přesnou specifikaci nemovitosti, výši a účel rezervačního poplatku, termín pro uzavření kupní smlouvy a jasný postup pro případ, že k podpisu z nějakého důvodu nedojde.
                  </p>
                </div>

                <div className="my-8">
                  <img
                    src={signingImage}
                    alt="Ruce podepisující rezervační smlouvu na stole s dokumenty"
                    className="w-full h-56 md:h-72 object-cover rounded-2xl shadow-lg"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-2 italic">Rezervační smlouva by měla mít písemnou formu, ať už mezi dvěma, nebo třemi stranami.</p>
                </div>
              </div>

              {/* H2 Kolik je poplatek */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik je rezervační poplatek a kdo ho platí</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Rezervační poplatek platí vždy kupující, nikdy Vy jako prodávající. V praxi se pohybuje v rozmezí 3 až 5 % z kupní ceny, u nadstandardních nemovitostí nebo developerských projektů se občas objevuje i hranice kolem 10 %. Výše se odvíjí od regionu, ceny nemovitosti i konkrétní realitní kanceláře, pevná zákonná sazba neexistuje.
                  </p>
                  <p>
                    Poplatek má dvojí funkci. Buď se později započítá do kupní ceny jako její první splátka, nebo slouží jako jistina pro provizi realitní kanceláře, pokud transakce padne vinou kupujícího. Který z těchto dvou režimů platí, musí smlouva jednoznačně říct, je to jedna z nejčastějších věcí, na které se v praxi zapomíná, a pak vznikají spory.
                  </p>
                </div>
              </div>

              {/* H2 Co když smlouva nevznikne */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co se stane, když kupní smlouva nakonec nevznikne</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Tady se odehrává většina konfliktů kolem rezervačních smluv, a je to i důvod, proč prodávající z tohoto kroku mívají obavy. Rozhoduje především to, na čí straně vznikla příčina, proč se prodej neuskutečnil.
                  </p>
                  <p>
                    Pokud kupující od záměru koupit ustoupí bez vážného důvodu, nebo mu nevyjde financování a smlouva to definuje jako jeho zavinění, rezervační poplatek obvykle propadá jako smluvní pokuta, případně jako úhrada provize realitní kanceláře. Pokud naopak Vy jako prodávající od prodeje odstoupíte, poplatek byste měli kupujícímu vrátit v plné výši, v některých smlouvách i s dohodnutou sankcí navíc.
                  </p>
                  <p>
                    Přesně proto se vyplatí rezervační smlouvu nepodepisovat narychlo. Než ji podepíšete, ověřte si, že jasně popisuje obě situace, komu poplatek připadne a za jakých podmínek, a že termín pro uzavření kupní smlouvy je reálný, ne jen formální datum, které nikdo nehlídá.
                  </p>
                </div>
              </div>

              {/* H2 Co je uschova */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co je úschova kupní ceny a proč se bez ní neobejdete</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Úschova kupní ceny řeší jiný problém než rezervační smlouva. Mezi podpisem kupní smlouvy a zápisem nového vlastníka do katastru nemovitostí uplyne v Příbrami běžně několik týdnů, u komplikovanějších případů i déle. Po tuto dobu nechcete, aby kupující platil rovnou na Váš účet, protože pak nemáte jistotu, že peníze dostanete, pokud by se převod zkomplikoval, a kupující zase nechce platit dřív, než mu na katastru skutečně zapíší vlastnictví.
                  </p>
                  <p>
                    Řešením je úschova u nezávislé třetí strany. Peníze od kupujícího se uloží na zvláštní účet a vyplatí se Vám jako prodávajícímu teprve poté, co jsou splněny přesně dohodnuté podmínky, typicky potvrzený zápis vlastnického práva a doložené zrušení případných zástavních práv na nemovitosti. Bez úschovy byste riskovali, že buď peníze nikdy nedostanete, nebo že je kupující zaplatí a nemovitost mu z nějakého důvodu nakonec nepřevedete, úschova chrání obě strany zároveň.
                  </p>
                </div>
              </div>

              {/* H2 Srovnání typů uschovy */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Bankovní, advokátní, notářská, nebo realitní úschova – co zvolit</h2>
                <p className="text-muted-foreground mb-2">
                  V Příbrami i jinde v Česku máte na výběr ze čtyř běžných typů úschovy. Liší se hlavně cenou, mírou kontroly a tím, kdo úschovu spravuje a platí. Jako standardní řešení u svých klientů využívám advokátní úschovu, dnes patří k nejméně rizikovým variantám vůbec.
                </p>
                <EscrowCostChart />
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Advokátní úschovu využívám u naprosté většiny prodejů, je to moje standardní řešení. Od roku 2026 navíc funguje rozšířený dohled České advokátní komory nad advokátními účty spolu s garančním fondem, díky čemuž patří advokátní úschova dnes k prakticky bezrizikovým variantám. Pokud si výslovně nezvolíte jinou formu úschovy, náklady na ni jako makléř hradím já, Vás ani kupujícího tedy nic navíc nestojí.
                  </p>
                  <p>
                    Notářská úschova se řídí pevným notářským tarifem a náklady si hradí kupující nebo prodávající podle dohody, obvykle vychází dráž než advokátní úschova. Bankovní úschova, tedy vázaný nebo jistotní účet, je sice pod dohledem ČNB, jde ale o složitější administrativní proces s výrazně vyššími poplatky, které si hradí klient, proto ji doporučuji jen výjimečně u vyšších částek a na výslovné přání. Realitní úschova, pokud prodáváte přes realitní kancelář, se od roku 2020 řídí zákonem o realitním zprostředkování, který kanceláři ukládá vést peníze klientů na účtu odděleném od svého provozního účtu, a stejně jako advokátní úschova bývá zahrnutá v mých službách.
                  </p>
                  <p>
                    Pokud si nezvolíte jinak, náklady na advokátní nebo realitní úschovu hradím jako makléř já, u notářské a bankovní úschovy si náklady hradí kupující nebo prodávající podle dohody. Pro běžný prodej bytu 3+1 v Příbrami je advokátní úschova jako moje standardní řešení nejpraktičtější kombinací bezpečí, rychlosti a nulových nákladů navíc pro Vás.
                  </p>
                </div>
              </div>

              {/* H2 Rizika */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co riskujete bez jasně napsané smlouvy</h2>
                <RiskGraphic />
              </div>

              {/* H2 Casova osa */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak dlouho celý proces trvá: od rezervace k penězům na účtu</h2>
                <p className="text-muted-foreground mb-2">
                  Přesné termíny záleží na konkrétní transakci, ale u standardního prodeje v Příbrami počítejte s tímto sledem.
                </p>
                <ProcessTimeline />
                <p className="text-muted-foreground">
                  Optimisticky se od podpisu kupní smlouvy k penězům na účtu dostanete za 4 až 6 týdnů. V praxi je ale běžnější počítat s 2 až 3 měsíci, hlavně pokud katastrální úřad řeší vyšší vytíženost nebo se v dokumentaci objeví nesrovnalost, kterou je potřeba doplnit.
                </p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak na to v Příbrami</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Dojednejte přesné podmínky rezervační smlouvy ještě před podpisem.</strong> Výši poplatku, co se s ním stane při neúspěchu prodeje, i reálný termín pro podpis kupní smlouvy.</li>
                  <li><strong className="text-foreground">Trvejte na písemné smlouvě.</strong> Ideálně připravené advokátem nebo makléřem, který má zkušenost s místním trhem a ví, jaké podmínky jsou v Příbrami obvyklé.</li>
                  <li><strong className="text-foreground">O výběr úschovy se starat nemusíte.</strong> Standardně řeším advokátní úschovu, kterou jako makléř hradím já, pokud si výslovně nezvolíte jinou variantu.</li>
                  <li><strong className="text-foreground">Ověřte si podmínky výplaty.</strong> Jaké doklady budete k vyzvednutí peněz potřebovat a jak dlouho výplata po zápisu na katastru trvá.</li>
                  <li><strong className="text-foreground">Počítejte s tím, že peníze neuvidíte hned po podpisu.</strong> Naplánujte si podle toho další kroky, třeba koupi navazujícího bydlení nebo splacení vlastní hypotéky.</li>
                  <li><strong className="text-foreground">Uschovejte si všechny doklady o platbách a podmínkách výplaty.</strong> Pro případ, že by se objevil spor o splnění podmínek úschovy.</li>
                </ol>

                <p className="text-muted-foreground">
                  Řeším rezervační smlouvy a výběr úschovy s klienty v Příbrami běžně, jakmile se najde vážný zájemce, ještě před tím, než cokoliv podepíšou. Pokud jste nedávno prošli i nastavením nabídkové ceny, mrkněte na článek{' '}
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">Jak správně ocenit nemovitost před prodejem</Link>, a pokud řešíte i energetický štítek, přečtěte si{' '}
                  <Link to="/blog/penb-pri-prodeji-nemovitosti-2026" className="text-secondary hover:underline font-medium">Energetický štítek (PENB) při prodeji nemovitosti</Link>.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Rezervační poplatek platí kupující, obvykle 3 až 5 % z kupní ceny, výjimečně až 10 %.',
                    'Rezervační smlouva musí přesně popsat, co se s poplatkem stane, pokud k prodeji nakonec nedojde.',
                    'Úschova kupní ceny chrání obě strany mezi podpisem kupní smlouvy a zápisem vlastnického práva do katastru.',
                    'Advokátní úschova je dnes díky dohledu České advokátní komory a garančnímu fondu prakticky bezriziková, proto ji doporučuji jako standardní volbu.',
                    'Pokud si nezvolíte jinou variantu, náklady na advokátní úschovu hradím jako makléř já, ne kupující ani prodávající.',
                    'Po podpisu kupní smlouvy běží zákonná 20denní ochranná lhůta na katastru, samotný vklad má lhůtu max. 30 dní.',
                    'Reálně počítejte s 2 až 3 měsíci od podpisu rezervační smlouvy do výplaty peněz z úschovy.',
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
                    alt="Radek Větrovský, realitní makléř Příbram"
                    className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-2">Radek Větrovský</h3>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem prodeje včetně rezervační smlouvy, výběru úschovy a všech dalších kroků až po zápis na katastru.
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
                  <p>Rezervační smlouva a úschova kupní ceny nejsou formality, které se dají odbýt podpisem bez čtení. Jsou to dva nástroje, které existují přesně proto, aby Vy jako prodávající nepřišli o kupce kvůli nejasné smlouvě, ani o peníze kvůli špatně zvolené úschově.</p>
                  <p>Pokud v Příbrami prodáváte a blíží se Vám podpis rezervační nebo kupní smlouvy, ozvěte se mi ještě před podpisem. Zajišťuji kompletní{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">prodej nemovitostí v Příbrami</Link>
                    {' '}včetně podmínek rezervačního poplatku i výběru úschovy, ať máte jistotu, že smlouva chrání i Vás, ne jen kupujícího.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <KeyRound className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Blíží se Vám podpis rezervační nebo kupní smlouvy v Příbrami?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Ozvěte se mi ještě před podpisem. Projdeme spolu podmínky rezervačního poplatku i výběr úschovy, ať máte jistotu, že smlouva chrání i Vás.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/odhad-nemovitosti"
                      className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/90 transition-colors text-lg"
                    >
                      Objednat konzultaci zdarma
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
                Článek vychází z obvyklé tržní praxe a platné legislativy k červenci 2026 a má informativní charakter. Rezervační smlouva ani úschova kupní ceny nejsou samostatně upraveny jednotným zákonem, konkrétní podmínky vždy záleží na znění smlouvy a na dohodě s druhou stranou. Individuální situaci si ověřte u advokáta nebo přímo u zvoleného správce úschovy. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Na co si dát pozor při koupi bytu nebo domu v Příbrami', slug: 'na-co-si-dat-pozor-koupe-nemovitosti-pribram' },
                    { title: 'Katastr nemovitostí 2026: konec anonymního nahlížení', slug: 'katastr-nemovitosti-2026-konec-anonymniho-nahlizeni' },
                    { title: 'Energetický štítek (PENB) při prodeji nemovitosti', slug: 'penb-pri-prodeji-nemovitosti-2026' },
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

export default BlogRezervaceUschova;
