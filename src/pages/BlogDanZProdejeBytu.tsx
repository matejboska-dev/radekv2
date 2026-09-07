import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';
import heroImage from '@/assets/blog-dan-z-prodeje.webp';

const PUBLISHED = '2026-05-15';
const PUBLISHED_DISPLAY = '15. května 2026';

const faqItems = [
  {
    q: 'Musím prodej bytu nahlásit do daňového přiznání, i když jsem od daně osvobozen?',
    a: 'Pokud splňujete časový test nebo dvouleté bydlení a příjem nepřesahuje 5 000 000 Kč, do přiznání ho neuvádíte. U osvobození skrze vlastní bytovou potřebu nebo u osvobozeného příjmu nad 5 000 000 Kč máte oznamovací povinnost vůči finančnímu úřadu.',
  },
  {
    q: 'Můžu si od daně odečíst kuchyňskou linku, kterou jsem si v bytě koupil před 3 lety?',
    a: 'Bohužel ne. Daňově uznatelné jsou stavební úpravy a rekonstrukce, ne bytové vybavení. Faktury za novou kuchyň, vestavné spotřebiče nebo nábytek finanční úřad neuzná.',
  },
  {
    q: 'Co když byt prodávám se ztrátou? Vznikne mi nárok na vrácení daně?',
    a: 'Ne. Ztrátu z prodeje nemovitosti, která není v obchodním majetku, nelze nijak uplatnit. Daň se jen neplatí.',
  },
  {
    q: 'Jak je to s daní u rekreační chalupy v okolí Příbrami?',
    a: 'Stejná pravidla jako u bytu, ale podmínku dvouletého bydlení obvykle nesplníte. Spoléhejte na časový test nebo na vlastní bytovou potřebu. Pozor na rekreační objekty u daně z nemovitých věcí, ty mají od 2024 vyšší sazbu 11 Kč/m².',
  },
  {
    q: 'Stihnu osvobození, když peníze použiju na koupi domu, ale nezvládnu to do konce roku po prodeji?',
    a: 'Zákon dává jasnou lhůtu: do konce kalendářního roku následujícího po roce, ve kterém jste příjem získali. Případně lze započítat výdaj z roku před prodejem. Pokud lhůtu nestihnete, daň se doměří dodatečně.',
  },
  {
    q: 'Můžete mi ten výpočet udělat Vy?',
    a: 'Daňové přiznání za Vás nezpracuju, na to máte daňového poradce nebo účetní. Ale rád Vám u odhadu nemovitosti rovnou propočítám, jak prodej vyjde z daňového hlediska a jaké máte možnosti. To se Vám hodí dřív, než nasadíte cenu a začnete inzerovat.',
  },
];

const BlogDanZProdejeBytu = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Daň z prodeje nemovitosti 2026: Kolik zaplatím v Příbrami?',
      'Kolik zaplatíte na daních při prodeji bytu v Příbrami 2026? Časový test, osvobození, příklady i daň z nemovitých věcí. Přehledně od makléře Radka Větrovského.',
      '/blog/dan-z-prodeje-bytu-pribram-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Daň z prodeje nemovitosti 2026: Kolik zaplatím při prodeji bytu v Příbrami?',
      description: 'Kolik zaplatíte na daních při prodeji bytu v Příbrami 2026? Časový test, osvobození, příklady i daň z nemovitých věcí.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/dan-z-prodeje-bytu-pribram-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Daň z prodeje nemovitosti 2026' },
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
                alt="Bytové domy v Příbrami – ilustrační foto k dani z prodeje nemovitosti"
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
                9 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Kolik zaplatím na daních, když v roce 2026 prodám byt v Příbrami?
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Časový test, osvobození, konkrétní příklady z Příbrami a daň z nemovitých věcí. Vše, co musíte vědět dřív, než nasadíte cenu.
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
                  Ve většině případů při prodeji bytu v Příbrami v roce 2026 daň z příjmu neplatíte. Jste osvobozeni, pokud splníte jednu ze tří podmínek: vlastníte byt 5 let (nabyt do 2020) nebo 10 let (nabyt od 2021), nebo jste v něm bydleli 2 roky před prodejem, nebo peníze použijete na vlastní bydlení do roka. Pokud daň platíte, sazba je 15 % ze zisku (23 % nad 1 762 812 Kč). Tohle je jednorázová daň z prodeje, nezaměňujte ji s roční daní z nemovitosti, kterou platí každý vlastník bez ohledu na prodej, u bytu 60 m² v Příbrami vychází přibližně na 1 300 Kč ročně (podrobný výpočet v samostatném článku o{' '}
                  <Link to="/blog/dan-z-nemovitosti-pribram-2026" className="text-secondary hover:underline font-medium">dani z nemovitosti</Link>).
                </p>
              </div>

              {/* Intro */}
              <div className="mb-12 space-y-4 text-muted-foreground">
                <p>
                  Prodáváte byt v Příbrami a první, co Vás napadlo, je: „Kolik z toho odevzdám státu?" Naprosto férová otázka. Špatná odpověď Vás může stát stovky tisíc. Dobrá odpověď znamená, že v 80 % případů neodvedete na dani z příjmu ani korunu, protože splňujete některou z výjimek. Záleží na detailech a právě v nich se prodávající nejčastěji sekají.
                </p>
                <p>
                  V tomto článku najdete přesně, kdy daň platit budete, kdy ne, jak se počítá, co všechno si můžete odečíst a co musíte hlásit finančnímu úřadu. Na konci najdete tři konkrétní příklady z Příbrami, ať vidíte čísla černé na bílém.
                </p>
              </div>

              {/* H2 Jaké daně */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jaké daně se týkají prodeje bytu v Příbrami</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Při prodeji bytu řešíte dvě různé daně. Nepleťte si je, protože každá funguje úplně jinak.</p>
                  <p><strong className="text-foreground">Daň z příjmu fyzických osob.</strong> Jednorázová daň ze zisku z prodeje. Sazba 15 % nebo 23 %. Platíte ji jen tehdy, pokud nesplňujete žádnou ze zákonných výjimek. Tady se rozhoduje, jestli budete platit, nebo ne.</p>
                  <p><strong className="text-foreground">Daň z nemovitých věcí.</strong> Roční daň, kterou platí majitel bytu. Při prodeji se nezdaňuje samotný prodej, řeší se jen to, kdo platí daň za rok prodeje a jak se odhlásit u finančního úřadu. Bavíme se o pár stovkách až nízkých tisících korun.</p>
                  <p>A pozor, daň z nabytí nemovitosti, o které možná slyšel Váš otec nebo soused, byla zrušena už v roce 2020. Při prodeji bytu kupujícímu nic takového neplatíte ani Vy, ani on.</p>
                </div>
              </div>

              {/* H2 Kdy nezaplatíte */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdy nezaplatíte daň z příjmu ani korunu</h2>
                <p className="text-muted-foreground mb-6">
                  Zákon nabízí tři cesty, jak být od daně z příjmu osvobozen. Stačí splnit jednu z nich. V praxi většina prodávajících v Příbrami splňuje alespoň jednu z nich, často aniž to ví.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">Cesta 1: Časový test 5 nebo 10 let</h3>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>Pokud byt vlastníte dostatečně dlouho, prodej se nedaní. Lhůta záleží na tom, kdy jste byt nabyli.</p>
                  <p><strong className="text-foreground">Byt nabytý do 31. 12. 2020:</strong> stačí 5 let vlastnictví.<br/>
                  <strong className="text-foreground">Byt nabytý od 1. 1. 2021 dál:</strong> musíte ho vlastnit minimálně 10 let.</p>
                  <p>Doba se počítá ode dne, kdy byl podán návrh na vklad do katastru nemovitostí, do dne prodeje. Většina Příbramáků, kteří prodávají byt v cihlovém domě v Příbrami VII koupený v roce 2015, splňuje pětiletý test bez problému. Naopak kdo koupil novostavbu na Zdaboři v roce 2022, do roku 2032 daň platit bude, pokud nesplní jinou výjimku.</p>
                  <p>U družstevního podílu platí stejné lhůty. Doba se počítá od nabytí podílu, ne od převodu do osobního vlastnictví.</p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Cesta 2: Bydleli jste v bytě minimálně 2 roky před prodejem</h3>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>Nesplňujete časový test, protože jste byt koupili před 3 nebo 4 lety? Nevadí. Pokud jste v něm sami bydleli alespoň 2 roky bezprostředně před prodejem, jste osvobozeni.</p>
                  <p>Důležité: nepotřebujete trvalý pobyt v občance. Stačí, když faktické bydlení prokážete. Hodí se účty za energie přepsané na Vás, výpisy z banky chodící na danou adresu, korespondence, případně čestné prohlášení sousedů. Pokud byt máte ve společném jmění manželů, stačí, když podmínku splní jeden z manželů.</p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Cesta 3: Peníze z prodeje použijete na vlastní bydlení</h3>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>Nesplňujete ani časový test, ani jste v bytě nebydleli 2 roky? Ještě jedna šance. Pokud peníze z prodeje použijete na obstarání vlastní bytové potřeby, jste osvobozeni.</p>
                  <p>Co se rozumí vlastní bytovou potřebou:</p>
                  <ul className="space-y-2">
                    {[
                      'koupě jiného bytu nebo domu pro vlastní bydlení,',
                      'výstavba rodinného domu,',
                      'koupě stavebního pozemku, na kterém budete stavět,',
                      'rekonstrukce vlastní nemovitosti k bydlení,',
                      'splacení hypotéky na vlastní bydlení.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                    ))}
                  </ul>
                  <p>Peníze musíte použít v roce následujícím po prodeji, případně už v roce před prodejem. Tuto skutečnost musíte do konce lhůty pro podání daňového přiznání oznámit finančnímu úřadu. Pokud peníze nepoužijete celé, zdaní se jen ta část, která zůstala mimo bytovou potřebu.</p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Bonus: Zděděný byt po rodičích nebo prarodičích</h3>
                <p className="text-muted-foreground">
                  Pokud jste byt zdědili v přímé linii (rodiče, prarodiče, děti), do časového testu se Vám započítává i doba, po kterou ho vlastnil zůstavitel. Babička bydlela v bytě 30 let, Vy ho zdědíte v roce 2026 a prodáte ho hned? Daň neplatíte. Lhůta dávno uplynula. Kompletní postup, jak prodat zděděnou nemovitost, jsem popsal v{' '}
                  <Link to="/blog/jak-prodat-zdedenu-nemovitost-pribram" className="text-secondary hover:underline font-medium">samostatném článku</Link>.
                </p>
              </div>

              {/* H2 Kdy daň platit */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdy daň z příjmu platit budete</h2>
                <p className="text-muted-foreground mb-4">Když nesplňujete ani jednu z výše uvedených cest. Typicky:</p>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  {[
                    'koupili jste byt v Příbrami v roce 2022 jako investici, nikdy jste v něm nebydleli a chcete ho v 2026 prodat,',
                    'chalupa po prarodičích, kterou jste zdědili z vedlejší linie (teta, strýc), a držíte ji jen pár let,',
                    'byt v Příbrami pronajímáte přes Airbnb a teď ho prodáváte.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>
                <p className="text-muted-foreground">V těchto případech jdete s prodejem do daňového přiznání.</p>
              </div>

              {/* H2 Jak se daň počítá */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak se daň počítá</h2>
                <p className="text-muted-foreground mb-4">
                  Daň se <strong className="text-foreground">NEPOČÍTÁ</strong> z prodejní ceny. Počítá se ze zisku, tedy rozdílu mezi prodejní cenou a tím, co jste do bytu vložili.
                </p>

                <blockquote className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg my-6">
                  <p className="text-foreground font-semibold text-lg">
                    Základ daně = prodejní cena − pořizovací cena − uznatelné náklady
                  </p>
                </blockquote>

                <h3 className="text-xl font-bold text-foreground mb-3 mt-8">Co všechno si můžete odečíst</h3>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  {[
                    'pořizovací cena bytu (to, za co jste ho kdysi koupili),',
                    'prokazatelné rekonstrukce a opravy (faktury si schovávejte, finanční úřad bez nich nepřijme nic),',
                    'provize realitního makléře (ano, mou provizi si odečtete),',
                    'právní služby spojené s prodejem,',
                    'znalecký posudek,',
                    'správní poplatky katastrálního úřadu,',
                    'náklady na home staging a focení nemovitosti pro inzerci.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>
                <p className="text-muted-foreground mb-6">
                  Provize makléře je daňově uznatelným nákladem, ať už prodáváte sami nebo s makléřem — víc o tom v článku{' '}
                  <Link to="/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem" className="text-secondary hover:underline font-medium">
                    Prodat nemovitost v Příbrami bez realitky nebo s makléřem
                  </Link>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">Sazby daně z příjmu v roce 2026</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span><strong className="text-foreground">15 %</strong> ze zisku do 1 762 812 Kč (36násobek průměrné mzdy 48 967 Kč pro rok 2026),</span></li>
                  <li className="flex items-start gap-3"><span className="text-secondary mt-1">•</span><span><strong className="text-foreground">23 %</strong> z části zisku, která tuto hranici překračuje.</span></li>
                </ul>
              </div>

              {/* H2 Příklady */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Tři příklady z Příbrami, ať to máte v číslech</h2>

                <div className="bg-muted border border-border p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Příklad 1: Pan Novák, byt 3+1 v Příbrami VII</h3>
                  <p className="text-muted-foreground mb-3">
                    Pan Novák koupil byt 3+1 v ulici Edvarda Beneše v roce 2017 za 1 950 000 Kč. V roce 2026 ho prodává za 4 200 000 Kč. V bytě bydlel celou dobu.
                  </p>
                  <p className="text-foreground"><strong>Výsledek:</strong> Daň neplatí. Splňuje pětiletý časový test (nemovitost nabyl před 1. 1. 2021) i podmínku bydlení nad 2 roky. Příjem do daňového přiznání vůbec neuvádí.</p>
                </div>

                <div className="bg-muted border border-border p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Příklad 2: Paní Svobodová, investiční byt na Zdaboři</h3>
                  <p className="text-muted-foreground mb-3">
                    Paní Svobodová koupila novostavbu 2+kk na Zdaboři v roce 2022 za 3 800 000 Kč jako investici. Nikdy v ní nebydlela, pronajímala ji. V roce 2026 prodává za 4 600 000 Kč. Investovala 120 000 Kč do nového nábytku (neuznatelné, je to bytové vybavení, ne stavební úprava). Zaplatí mi provizi 184 000 Kč včetně DPH.
                  </p>
                  <p className="text-foreground mb-2"><strong>Zisk</strong> = 4 600 000 − 3 800 000 − 184 000 = <strong>616 000 Kč</strong>.</p>
                  <p className="text-foreground mb-3"><strong>Daň</strong> = 616 000 × 15 % = <strong>92 400 Kč</strong>.</p>
                  <p className="text-muted-foreground">Pokud by ovšem peníze z prodeje do roka použila na koupi rodinného domu pro vlastní bydlení, daň by neplatila. Tuto skutečnost ale musí oznámit finančnímu úřadu.</p>
                </div>

                <div className="bg-muted border border-border p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-foreground mb-3">Příklad 3: Pan Dvořák, zděděný byt po otci</h3>
                  <p className="text-muted-foreground mb-3">
                    Pan Dvořák zdědil v roce 2024 byt 2+1 v Příbrami VIII po zesnulém otci, který ho vlastnil od roku 1995. V roce 2026 byt prodává za 2 800 000 Kč.
                  </p>
                  <p className="text-foreground"><strong>Výsledek:</strong> Daň neplatí. Časový test se počítá od nabytí zůstavitelem (otec), tedy už 30 let. Lhůta dávno uplynula. Příjem do daňového přiznání neuvádí.</p>
                </div>
              </div>

              {/* H2 Oznamovací povinnost */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Oznamovací povinnost: Pozor, i osvobozený příjem se někdy hlásí</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Tohle je nejčastější chyba, kterou lidi dělají, a finanční úřad za ni umí dát citelnou pokutu.</p>
                  <p>Pokud máte z prodeje osvobozený příjem vyšší než <strong className="text-foreground">5 000 000 Kč</strong>, musíte tuto skutečnost oznámit finančnímu úřadu do konce lhůty pro podání daňového přiznání za rok prodeje. Týká se to typicky osvobození podle vlastní bytové potřeby.</p>
                  <p>Osvobozený příjem z prodeje, kde uplatňujete časový test nebo dvouleté bydliště, se oznamovat nemusí. Ale pokud si nejste jistí, raději si to ověřte u svého účetního nebo se mě prostě zeptejte.</p>
                </div>
              </div>

              {/* H2 Daň z nemovitých věcí */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Daň z nemovitých věcí: Kdo ji platí v roce prodeje</h2>
                <p className="text-muted-foreground mb-6">
                  Roční daň z nemovitých věcí platí ten, kdo byl k 1. lednu daného roku zapsán v katastru jako vlastník. Pokud byt prodáváte v dubnu 2026, daň za rok 2026 platíte Vy, ne kupující. Daň za rok 2027 už bude platit nový majitel.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-3">Kolik to dělá v Příbrami</h3>
                <div className="space-y-4 text-muted-foreground mb-6">
                  <p>Pro byty platí v roce 2026 základní sazba 3,5 Kč za m² podlahové plochy, vynásobená koeficientem 1,2 nebo 1,22, dále koeficientem podle velikosti obce a místním koeficientem. Místní koeficient si určuje samo město Příbram a aktuální hodnotu najdete na finanční správě nebo na webu města.</p>
                  <p>Pro běžný byt 60 m² v Příbrami se daň pohybuje v řádu nižších tisíců korun ročně. Není to částka, která by Vás při prodeji ekonomicky bolela, ale je dobré ji vyřešit administrativně.</p>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">Co musíte udělat po prodeji</h3>
                <p className="text-muted-foreground mb-3">Po převodu bytu na kupujícího:</p>
                <ol className="space-y-2 text-muted-foreground mb-4 list-decimal pl-6">
                  <li><strong className="text-foreground">Odhlaste se od daně z nemovitých věcí.</strong> Podejte na finanční úřad dílčí daňové přiznání (případně oznámení o pozbytí vlastnictví) do 31. ledna roku následujícího po prodeji.</li>
                  <li>Nový majitel musí naopak podat přiznání do 31. ledna 2027, pokud bude k 1. 1. 2027 už vlastníkem.</li>
                </ol>
                <p className="text-muted-foreground">Termín pro podání přiznání za rok 2026 byl 2. února 2026 (puzo 31. ledna připadlo na sobotu). Daň je splatná do 1. června 2026 (31. května je neděle), případně ve dvou splátkách, pokud přesahuje 5 000 Kč.</p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co dělat krok za krokem, abyste neplatili víc, než musíte</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                  <li>Zjistěte si datum nabytí bytu z katastru. Spočítejte si časový test (5 nebo 10 let).</li>
                  <li>Pokud test nesplňujete, podívejte se na dvouleté bydlení. Připravte si doklady.</li>
                  <li>Pokud ani to nestačí, naplánujte si vlastní bytovou potřebu. Peníze musí být použity ve správné lhůtě.</li>
                  <li>Schraňujte si všechny faktury za rekonstrukce, opravy, právní služby, provize i znalecký posudek. Bez nich nemůžete odečíst nic.</li>
                  <li>Pokud máte pochybnosti, ozvěte se mi. Nedoporučuju řešit prodej s daňovými dopady přes 100 000 Kč na vlastní pěst. Špatný odhad situace Vás může stát násobky toho, co byste platili odborníkovi.</li>
                </ol>
                <p className="text-muted-foreground mt-4">
                  Naplánovat prodej nejlépe začnete od správné ceny — viz článek{' '}
                  <Link to="/blog/jak-spravne-ocenit-nemovitost" className="text-secondary hover:underline font-medium">
                    Jak správně ocenit nemovitost před prodejem
                  </Link>.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Ve většině případů daň z příjmu při prodeji bytu v Příbrami neplatíte.',
                    'Existují tři cesty k osvobození: časový test (5 nebo 10 let), bydlení 2 roky před prodejem, nebo použití peněz na vlastní bydlení.',
                    'Pokud daň platíte, sazba je 15 % ze zisku, 23 % nad 1 762 812 Kč.',
                    'Daň se počítá ze zisku, ne z prodejní ceny. Odečíst můžete pořizovací cenu, rekonstrukce, provizi makléře a další náklady.',
                    'Osvobozený příjem nad 5 000 000 Kč musíte hlásit finančnímu úřadu.',
                    'Daň z nemovitých věcí za rok prodeje platí prodávající (vlastník k 1. lednu), pak se odhlaste u FÚ.',
                    'U zděděného bytu v přímé linii se počítá i doba vlastnictví zůstavitele.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem prodeje včetně poradenství v daňových a právních otázkách spojených s převodem nemovitosti.
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
                  <p>Ve většině případů žádnou daň z příjmu z prodeje bytu v Příbrami platit nebudete. Bydleli jste v bytě 2 roky? Osvobozeno. Vlastníte ho víc než 5 nebo 10 let? Osvobozeno. Peníze použijete na nové bydlení? Osvobozeno.</p>
                  <p>Platit budete jen v jasných investičních scénářích nebo u krátkodobě držených nemovitostí. I tam ale můžete daň výrazně snížit odpočtem provize, rekonstrukcí a dalších nákladů.</p>
                  <p>Pokud zvažujete prodej bytu v Příbrami a chcete vědět, co Vám reálně zbyde po všech daních a nákladech, ozvěte se mi. Připravím Vám odhad nemovitosti zdarma a v rámci konzultace projdeme i daňové dopady, ať víte, na čem jste, ještě než se rozhodnete prodat.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Chcete vědět, co Vám zbyde po prodeji?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Objednejte si odhad nemovitosti zdarma a propočítám Vám daňové dopady na míru Vaší situaci.
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
                Článek vychází z platné legislativy k roku 2026 a má informativní charakter. Daňová pravidla se mohou měnit, individuální situaci si vždy ověřte u daňového poradce nebo přímo na finančním úřadu. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Daň z nemovitosti v Příbrami 2026: kolik zaplatíte ročně', slug: 'dan-z-nemovitosti-pribram-2026' },
                    { title: 'Rezervační smlouva a úschova kupní ceny: jak nepřijít o peníze ani o kupce', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
                    { title: 'Prodat nemovitost v Příbrami bez realitky nebo s makléřem?', slug: 'prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem' },
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

export default BlogDanZProdejeBytu;
