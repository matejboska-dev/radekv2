import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, ShieldCheck, Lock, Unlock, Landmark, Smartphone, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1763729805496-b5dbf7f00c79?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-07-28';
const PUBLISHED_DISPLAY = '28. července 2026';

const faqItems = [
  {
    q: 'Od kdy platí, že už nejde anonymně zjistit vlastníka nemovitosti v katastru?',
    a: 'ČÚZK aplikaci upravil koncem prosince 2025 (přelom 29. a 30. 12. 2025). Od té doby se jméno vlastníka v nahlížení do katastru zobrazí až po přihlášení přes elektronickou identitu, dřív stačil jen kód CAPTCHA.',
  },
  {
    q: 'Jak se mám přihlásit, abych viděl jméno vlastníka?',
    a: 'Přes Identitu občana, nejčastěji Bankovní identitou (BankID), mojeID, nebo Mobilním klíčem eGovernmentu. Přihlášení je zdarma a zvládnete ho během pár minut, pokud už máte zřízené internetové bankovnictví u některé z českých bank.',
  },
  {
    q: 'Je to trvalá změna, nebo se anonymní nahlížení ještě vrátí?',
    a: 'ČÚZK opatření od začátku označil za dočasné, obnovení anonymního přístupu je podmíněné nalezením řešení, které zastaví zneužívání roboty a zároveň zachová anonymní přístup pro lidi. K červenci 2026 ale opatření platí dál bez stanoveného konce.',
  },
  {
    q: 'Co v katastru zůstává dostupné i bez přihlášení?',
    a: 'Základní technické údaje o parcelách a stavbách, jako je výměra nebo typ stavby, a údaje z registru RÚIAN (adresy, hranice parcel) by měly zůstat volně dostupné bez přihlášení. Přihlášení je nově potřeba konkrétně pro zobrazení jména vlastníka.',
  },
  {
    q: 'Chystá se ještě přísnější pravidlo, kdy budu muset dokládat účel nahlížení?',
    a: 'Ano, připravuje se samostatná novela, která by od žadatelů vyžadovala doložit konkrétní právní důvod nahlížení a úřad by si vedl záznam o přístupech. K červenci 2026 je tato úprava ve fázi připomínkového řízení a zatím neplatí.',
  },
];

const ChangeTimeline = () => {
  const steps = [
    { step: '1', title: 'Do konce 2025', desc: 'Stačila jen CAPTCHA, jméno vlastníka bylo vidět hned' },
    { step: '2', title: 'Konec prosince 2025', desc: 'ČÚZK zavedl povinné přihlášení kvůli robotům ze zahraničí' },
    { step: '3', title: 'Červenec 2026', desc: 'Opatření platí dál, stále bez stanoveného konce' },
    { step: '4', title: 'Plánovaná novela', desc: 'Doložení účelu nahlížení, zatím v připomínkovém řízení' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-6">Časová osa: od anonymní CAPTCHA k přihlášení</h3>

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
        <div className="grid grid-cols-4 gap-4 mt-3">
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

const AccessComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Unlock className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Zůstává bez přihlášení</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Výměra a druh parcely</li>
        <li>Typ a popis stavby</li>
        <li>Registr RÚIAN (adresy, hranice parcel)</li>
        <li>Územní prvky veřejné správy</li>
      </ul>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <Lock className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Vyžaduje přihlášení</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Jméno vlastníka nemovitosti</li>
        <li>Hromadné a automatizované stahování dat</li>
        <li>Detailní listiny (např. nabývací tituly)</li>
      </ul>
    </div>
  </div>
);

const LoginMethods = () => {
  const methods = [
    { icon: Landmark, title: 'Bankovní identita', desc: 'Nabízí ji prakticky každá česká banka, přihlásíte se jako do internetového bankovnictví.' },
    { icon: ShieldCheck, title: 'mojeID', desc: 'Elektronická identita spravovaná sdružením CZ.NIC, použitelná i u dalších online služeb.' },
    { icon: Smartphone, title: 'Mobilní klíč eGovernmentu', desc: 'Aplikace Ministerstva vnitra pro přihlašování k veřejné správě.' },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4 my-8 not-prose">
      {methods.map((m) => (
        <div key={m.title} className="bg-card border border-border rounded-2xl p-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <m.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-bold text-foreground text-sm mb-1">{m.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
        </div>
      ))}
    </div>
  );
};

const BlogKatastr = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Katastr nemovitostí 2026: konec anonymního nahlížení',
      'Od konce prosince 2025 ČÚZK vyžaduje přihlášení přes BankID nebo mojeID pro zobrazení vlastníka v katastru. Jak na to a co dál platí zdarma.',
      '/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Katastr nemovitostí 2026: konec anonymního nahlížení a jak si přesto ověřit vlastníka',
      description: 'Od konce prosince 2025 ČÚZK vyžaduje přihlášení přes BankID nebo mojeID pro zobrazení vlastníka v katastru. Jak na to a co dál platí zdarma.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni',
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
        { '@type': 'ListItem', position: 3, name: 'Katastr nemovitostí 2026, konec anonymního nahlížení' },
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
                alt="Podpis dokumentu, ilustrační foto k ověření vlastníka nemovitosti v katastru"
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
                8 min čtení
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              Katastr nemovitostí 2026: konec anonymního nahlížení a jak si přesto ověřit vlastníka
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Ještě loni stačilo zadat adresu nebo parcelní číslo do nahlížení do katastru nemovitostí a jméno vlastníka se zobrazilo hned. Od konce prosince 2025 to tak jednoduše nefunguje. Pokud v Příbrami kupujete nebo prodáváte a chcete si před podpisem ověřit, kdo je skutečným vlastníkem nemovitosti, tenhle článek Vám ukáže, jak na to i po změně.
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
                  Český úřad zeměměřický a katastrální (ČÚZK) na konci prosince 2025 upravil aplikaci Nahlížení do katastru nemovitostí tak, že jméno vlastníka se nově zobrazí až po přihlášení, dřív stačil jen kód CAPTCHA. Přihlásit se lze přes Identitu občana, nejčastěji Bankovní identitou, mojeID nebo Mobilním klíčem eGovernmentu, zdarma a během pár minut. Důvodem byl prudký nárůst přístupů ze zahraničí, kde automatizovaní roboti CAPTCHA obcházeli a hromadně stahovali údaje o vlastnících. ČÚZK opatření označil za dočasné, k červenci 2026 ale platí dál bez stanoveného konce, a chystá se navíc ještě přísnější, trvalá úprava, která by od žadatelů vyžadovala doložit konkrétní účel nahlížení.
                </p>
              </div>

              {/* H2 Co se zmenilo */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co se přesně změnilo a proč</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Nahlížení do katastru nemovitostí bylo dlouhá léta jednou z nejotevřenějších veřejných databází v Česku. Stačilo zadat adresu nebo číslo parcely a systém ukázal i jméno vlastníka, zcela anonymně a zdarma. Jedinou překážkou proti zneužití byl kód CAPTCHA, který měl zabránit hromadnému strojovému stahování dat.
                  </p>
                  <p>
                    Na konci prosince 2025 ČÚZK oznámil, že tohle už nestačí. Provoz aplikace v posledních týdnech extrémně narostl, hlavně kvůli přístupům ze zahraničních serverů, které porušovaly provozní podmínky. Ukázalo se, že různí automatizovaní roboti dokážou CAPTCHA obejít a hromadně z katastru vytěžovat data o vlastnících, typicky proto, aby je pak realitní spekulanti použili k plošnému oslovování majitelů s nabídkami na odkup nemovitosti. Řešením bylo dočasně podmínit zobrazení informací o vlastníkovi přihlášením přes elektronickou identitu.
                  </p>
                  <p>
                    Předseda ČÚZK Karel Štencel opatření obhajoval slovy, že bez ověření identity úřad nedokáže aplikaci ochránit před protiprávním vytěžováním dat softwarovými roboty, a že veřejný přístup do katastru jako takový těmito opatřeními ohrožen není.
                  </p>
                  <p>
                    Není to poprvé, co se o omezení anonymního přístupu mluvilo. Podobný problém s roboty a realitními spekulanty řešilo ministerstvo zemědělství i ČÚZK už v roce 2021, tehdy se ale u řešení zastavilo na přísnější CAPTCHA a anonymní přístup zůstal zachovaný. Tentokrát se ukázalo, že ani to už nestačí.
                  </p>
                </div>

                <ChangeTimeline />
              </div>

              {/* H2 Jak se prihlasit */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Jak se nově přihlásit k nahlížení do katastru</h2>
                <p className="text-muted-foreground mb-2">
                  Přihlášení funguje přes takzvanou Identitu občana, tedy centrální přihlašovací systém, který v Česku propojuje víc elektronických identit na jednom místě. V praxi máte na výběr nejčastěji z těchto tří možností.
                </p>
                <LoginMethods />
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Podle údajů Ministerstva vnitra už dnes nějakou elektronickou identitu využívá přes 5,5 milionu lidí, takže drtivá většina těch, kdo běžně používají internetové bankovnictví nebo online služby státu, má přístup k jedné z těchto možností prakticky ihned a zdarma. Přihlášení se spustí automaticky ve chvíli, kdy se pokusíte zobrazit údaj vyžadující ověření, nebo kliknutím na ikonu profilu vpravo nahoře v aplikaci.
                  </p>
                  <p>
                    Pro právnické osoby, které s katastrem pracují pravidelně, realitní kanceláře, advokátní kanceláře nebo notáře, existuje navíc už dřív zavedená placená služba Dálkový přístup do katastru nemovitostí s vlastní registrací u ČÚZK, ta se touto změnou nemění.
                  </p>
                </div>
              </div>

              {/* H2 Co zustava volne */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co zůstává volně dostupné a co teď vyžaduje přihlášení</h2>
                <p className="text-muted-foreground mb-2">
                  Změna se týká konkrétně zobrazení jména vlastníka. Pokud jen ověřujete hranice pozemku nebo základní parametry nemovitosti, nic se pro Vás nemění.
                </p>
                <AccessComparison />
                <p className="text-muted-foreground">
                  Jakmile ale chcete vidět konkrétně jméno vlastníka, systém Vás vyzve k přihlášení přes Identitu občana. Po přihlášení pak nahlížení funguje prakticky stejně jako dřív, jen s tímto jedním krokem navíc.
                </p>
              </div>

              {/* H2 Trvala nebo docasna */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Je to trvalá změna, nebo se anonymní přístup ještě vrátí?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Tady je důležité rozlišovat dvě různé věci, které se v tom snadno pletou.
                  </p>
                  <p>
                    To, co platí dnes, tedy přihlášení pro zobrazení vlastníka, ČÚZK od začátku označoval jako <strong className="text-foreground">dočasné</strong> nouzové opatření proti robotům, ne jako rovnou hotovou legislativní změnu. Konkrétní termín, kdy (a jestli) se anonymní přístup obnoví, úřad neuvádí, obnovení je podle jeho vyjádření podmíněné nalezením účinnějšího řešení, které zablokuje roboty a zároveň zachová běžný anonymní přístup pro lidi. K červenci 2026 opatření platí dál bez náznaku, že by se mělo v dohledné době změnit.
                  </p>
                  <p>
                    Souběžně s tím se připravuje samostatná, důkladnější legislativní úprava, novela vyhlášky upravující poskytování údajů z katastru, která by šla ještě dál. Podle dostupných informací by měla od žadatelů vyžadovat doložení konkrétního právního důvodu nahlížení, například že jde o kupujícího nebo prodávajícího v jednání, bankovního pracovníka posuzujícího hypotéku, advokáta, notáře nebo účastníka soudního řízení, a úřad by si navíc vedl záznam o tom, komu, v jakém rozsahu a kdy údaje zpřístupnil. Tahle úprava je k červenci 2026 stále ve fázi připomínkového řízení, čeká ji ještě projednání vládou a Parlamentem, takže není jasné, kdy a v jaké podobě nakonec začne platit.
                  </p>
                </div>
              </div>

              {/* H2 Dopad na kupujici a prodavajici */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Co to znamená pro kupující a prodávající v Příbrami</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Pro běžný prodej nebo koupi nemovitosti v Příbrami se v praxi nic zásadního nemění, jen přibyl jeden krok navíc.
                  </p>
                  <p>
                    Pokud kupujete a chcete si před podpisem rezervační nebo kupní smlouvy ověřit, že prodávající je skutečně zapsaným vlastníkem, přihlásíte se přes Identitu občana stejně jako byste se přihlašovali do internetového bankovnictví, a informaci uvidíte úplně stejně jako dřív. Tohle ověření je jeden z kroků, které bych Vám jako makléř doporučil neopomenout, zvlášť pokud nekupujete přes realitní kancelář a nemáte to ošetřené jinak, například přes advokátní úschovu popsanou v článku o{' '}
                    <Link to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" className="text-secondary hover:underline font-medium">rezervační smlouvě a úschově kupní ceny</Link>.
                  </p>
                  <p>
                    Pokud prodáváte, změna se Vás dotkne minimálně, maximálně tak zjistíte, že už si třeba soused nemůže Váš vlastnický vztah anonymně zjistit jedním klikem. Ochrana vlastníků před hromadným, nevyžádaným oslovováním ze strany realitních spekulantů byla ostatně jedním z hlavních důvodů, proč ke změně vůbec došlo.
                  </p>
                </div>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: jak si ověřit vlastníka nemovitosti nyní</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Otevřete aplikaci Nahlížení do katastru nemovitostí</strong> na stránkách ČÚZK a zadejte adresu nebo parcelní číslo nemovitosti, kterou chcete ověřit.</li>
                  <li><strong className="text-foreground">Až systém bude chtít zobrazit jméno vlastníka, klikněte na přihlášení.</strong> Vyvolá se automaticky, nebo přes ikonu profilu vpravo nahoře.</li>
                  <li><strong className="text-foreground">Vyberte si způsob přihlášení</strong>, který už máte zřízený, typicky Bankovní identitu, mojeID nebo Mobilní klíč eGovernmentu. Pokud žádný nemáte, zřízení Bankovní identity zvládnete přes svou banku obvykle za pár minut a zdarma.</li>
                  <li><strong className="text-foreground">Po přihlášení uvidíte údaje o vlastníkovi stejně jako dřív.</strong> Ověřte si, že jméno na výpisu odpovídá osobě, se kterou jednáte.</li>
                  <li><strong className="text-foreground">Pokud narazíte na nesrovnalost mezi zapsaným vlastníkem a osobou, která nemovitost nabízí, zastavte se a ověřte si to.</strong> Může jít o dědické řízení v běhu, spoluvlastnictví, nebo v horším případě o pokus o podvod.</li>
                </ol>

                <p className="text-muted-foreground">
                  Ověření vlastníka řeším s klienty v Příbrami jako standardní součást přípravy na koupi i prodej, ať máte jistotu, že jednáte se správnou osobou.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Od konce prosince 2025 vyžaduje ČÚZK přihlášení přes elektronickou identitu pro zobrazení jména vlastníka v nahlížení do katastru nemovitostí.',
                    'Přihlásit se lze zdarma přes Identitu občana, nejčastěji Bankovní identitou, mojeID nebo Mobilním klíčem eGovernmentu.',
                    'Důvodem je hromadné strojové vytěžování dat zahraničními roboty, kteří obcházeli dosavadní ochranu (CAPTCHA).',
                    'Základní technické údaje o parcelách a stavbách by měly zůstat volně dostupné i bez přihlášení, mění se jen zobrazení jména vlastníka.',
                    'Opatření bylo od začátku označené jako dočasné, k červenci 2026 ale platí dál bez stanoveného konce.',
                    'Chystá se navíc samostatná, přísnější legislativní úprava vyžadující doložení konkrétního účelu nahlížení, zatím je ve fázi připomínkového řízení.',
                    'Pro běžnou koupi nebo prodej v Příbrami se prakticky nic nemění, jen přibyl jeden přihlašovací krok navíc.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem koupě i prodeje včetně ověření vlastnických vztahů v katastru nemovitostí.
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
                  <p>Anonymní zjištění vlastníka nemovitosti jedním kliknutím skončilo koncem prosince 2025, ale ověřit si vlastníka pořád můžete, jen s jedním krokem navíc, přihlášením přes Bankovní identitu, mojeID nebo Mobilní klíč eGovernmentu. Chystá se navíc ještě přísnější pravidlo vyžadující doložení účelu, to ale zatím není v platnosti.</p>
                  <p>Pokud v Příbrami kupujete nebo prodáváte a chcete mít jistotu, že jednáte se skutečným vlastníkem nemovitosti, ozvěte se mi. Ověření vlastnických vztahů je standardní součástí toho, co pro klienty zajišťuji při{' '}
                    <Link to="/sluzby/prodej-nemovitosti-pribram" className="text-secondary hover:underline font-medium">prodeji nemovitostí v Příbrami</Link>
                    {' '}i při koupi.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <KeyRound className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Kupujete nebo prodáváte v Příbrami a chcete mít jistotu, že jednáte se skutečným vlastníkem?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Ověření vlastnických vztahů v katastru je standardní součást toho, co pro klienty při koupi i prodeji řeším. Ozvěte se mi ještě před podpisem.
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
                Článek vychází z veřejně dostupných informací ČÚZK a mediálních zdrojů k červenci 2026 a má informativní charakter. Legislativa v této oblasti se dál vyvíjí, aktuální stav si vždy ověřte přímo v aplikaci Nahlížení do katastru nemovitostí nebo na stránkách ČÚZK. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Na co si dát pozor při koupi bytu nebo domu v Příbrami', slug: 'na-co-si-dat-pozor-koupe-nemovitosti-pribram' },
                    { title: 'Rezervační smlouva a úschova kupní ceny', slug: 'rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
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

export default BlogKatastr;
