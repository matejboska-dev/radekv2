import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Globe, ChevronDown, ArrowRight, Landmark, Repeat, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setPageMeta, injectJsonLd } from '@/lib/seo';
import radekPhoto from '@/assets/radek-vetrovsky.png';

const heroImage = 'https://images.unsplash.com/photo-1642043175009-5997b3a078d8?w=1200&h=800&fit=crop&q=80';

const PUBLISHED = '2026-08-11';
const PUBLISHED_DISPLAY = '11. srpna 2026';

const faqItems = [
  {
    q: 'Je daň z nemovitosti totéž co daň z prodeje nemovitosti?',
    a: 'Ne. Daň z nemovitosti je roční majetková daň, kterou platí každý vlastník bez ohledu na prodej. Daň z prodeje je jednorázová daň ze zisku, která se týká jen prodávajících a za splnění podmínek se jí lze vyhnout.',
  },
  {
    q: 'Kolik zaplatím na dani z nemovitosti za byt v Příbrami?',
    a: 'U bytu 60 m² vychází daň při základním koeficientu 2,5 a místním koeficientu 2, které v Příbrami platí, přibližně na 1 300 Kč ročně. Přesná částka závisí na výměře a typu nemovitosti.',
  },
  {
    q: 'Musím každý rok podávat přiznání k dani z nemovitosti?',
    a: 'Ne, jen při změně, tedy pokud jste nemovitost koupili, zdědili, nebo jste na ní provedli změnu ovlivňující výpočet daně. Pokud se nic nezměnilo, daň se vypočte automaticky a přiznání podávat nemusíte.',
  },
  {
    q: 'Dokdy musím zaplatit daň z nemovitosti v roce 2026?',
    a: 'Daň do 5 000 Kč se platí jednorázově do 1. června 2026. Daň nad 5 000 Kč lze rozdělit na dvě splátky, první do 1. června a druhou do 30. listopadu 2026.',
  },
  {
    q: 'Jaké jsou koeficienty daně z nemovitosti v Příbrami?',
    a: 'Základní koeficient podle počtu obyvatel je 2,5, místní koeficient stanovený městem je 2. Oba se násobí se základní sazbou 3,50 Kč za m² u bytů a rodinných domů.',
  },
];

const TaxCalculation = () => {
  const rows = [
    { label: 'Plocha (byt 60 m² × 1,22)', value: '73,2 m²' },
    { label: 'Sazba daně', value: '3,50 Kč/m²' },
    { label: 'Základní koeficient (Příbram)', value: '× 2,5' },
    { label: 'Místní koeficient (Příbram)', value: '× 2' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-1">Výpočet daně: byt 60 m² v Příbrami</h3>
      <p className="text-sm text-muted-foreground mb-6">Krok za krokem podle zákonného vzorce</p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{r.label}</span>
            <span className="text-sm font-bold text-foreground">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-primary/10 rounded-xl border-2 border-primary/30 flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">Daň celkem</span>
        <span className="text-xl font-black text-primary">≈ 1 300 Kč / rok</span>
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
        Rodinný dům se zastavěnou plochou 120 m²: 120 × 3,50 Kč × 2,5 × 2 = přesně 2 100 Kč ročně.
      </p>
    </div>
  );
};

const TaxComparison = () => (
  <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Repeat className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Daň z nemovitosti</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li><strong className="text-foreground">Kdy:</strong> každý rok</li>
        <li><strong className="text-foreground">Kdo platí:</strong> každý vlastník</li>
        <li><strong className="text-foreground">Za co:</strong> vlastnictví nemovitosti</li>
        <li><strong className="text-foreground">Výše:</strong> stovky až tisíce Kč</li>
      </ul>
    </div>
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
          <Receipt className="h-4 w-4 text-secondary" />
        </div>
        <h3 className="font-bold text-foreground">Daň z prodeje</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li><strong className="text-foreground">Kdy:</strong> jen při prodeji</li>
        <li><strong className="text-foreground">Kdo platí:</strong> jen prodávající</li>
        <li><strong className="text-foreground">Za co:</strong> zisk z prodeje</li>
        <li><strong className="text-foreground">Výše:</strong> lze se jí vyhnout</li>
      </ul>
    </div>
  </div>
);

const DeadlineTimeline = () => {
  const steps = [
    { step: '1', title: '2. února 2026', desc: 'Termín pro podání přiznání (jen při změně vlastnictví)' },
    { step: '2', title: '1. června 2026', desc: 'Splatnost celé daně do 5 000 Kč, nebo první splátky' },
    { step: '3', title: '30. listopadu 2026', desc: 'Splatnost druhé splátky u daně nad 5 000 Kč' },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8 not-prose">
      <h3 className="text-lg font-bold text-foreground mb-6">Termínová osa 2026</h3>

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
        <div className="grid grid-cols-3 gap-4 mt-3">
          {steps.map((s) => (
            <div key={s.step}>
              <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

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

const BlogDanZNemovitosti = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(
      'Daň z nemovitosti v Příbrami 2026: kolik zaplatíte',
      'Daň z nemovitosti v Příbrami 2026: sazby, místní koeficient 2, termíny přiznání i splatnosti. Kolik reálně zaplatíte za byt nebo dům.',
      '/blog/dan-z-nemovitosti-pribram-2026'
    );
    const cleanupArticle = injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Daň z nemovitosti v Příbrami 2026: kolik zaplatíte ročně',
      description: 'Daň z nemovitosti v Příbrami 2026: sazby, místní koeficient 2, termíny přiznání i splatnosti. Kolik reálně zaplatíte za byt nebo dům.',
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
        '@id': 'https://radek-vetrovsky.cz/blog/dan-z-nemovitosti-pribram-2026',
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
        { '@type': 'ListItem', position: 3, name: 'Daň z nemovitosti v Příbrami 2026' },
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
                alt="Kalkulačka a daňové dokumenty, ilustrační foto k tématu daně z nemovitosti"
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
              Daň z nemovitosti v Příbrami 2026: kolik zaplatíte ročně
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Vlastníte byt nebo dům v Příbrami a nejste si jistí, kolik letos zaplatíte na dani z nemovitosti? Tahle daň se často plete s daní z prodeje, přitom jde o dvě úplně odlišné povinnosti. Tady najdete přesný výpočet podle reálných koeficientů, které pro Příbram platí, i termíny, které byste neměli propásnout.
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
                  Daň z nemovitých věcí je roční majetková daň, kterou platí každý vlastník bytu, domu nebo pozemku, bez ohledu na to, jestli nemovitost prodává. V Příbrami se výsledná částka počítá se základním koeficientem 2,5 (podle počtu obyvatel města) a místním koeficientem 2 (stanoveným městem), takže u běžného bytu 60 m² vyjde daň zhruba na 1 300 Kč ročně, u rodinného domu se zastavěnou plochou 120 m² zhruba na 2 100 Kč ročně. Přiznání se podává jen při změně vlastnictví, a to do 2. února 2026. Daň do 5 000 Kč se platí jednorázově do 1. června 2026, nad 5 000 Kč ve dvou splátkách, do 1. června a do 30. listopadu 2026.
                </p>
              </div>

              {/* H2 Neni totez */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Daň z nemovitosti není totéž co daň z prodeje</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Tohle je nejčastější zdroj zmatku, a proto to vysvětluji hned na začátku. <strong className="text-foreground">Daň z nemovitých věcí</strong> je roční majetková daň podle zákona č. 338/1992 Sb., kterou platí každý vlastník nemovitosti, ať už ji prodává, pronajímá, nebo v ní jen bydlí. Platí se každý rok, obvykle v řádu stovek až tisíců korun.
                  </p>
                </div>
                <TaxComparison />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Daň z příjmu z prodeje nemovitosti</strong> je něco úplně jiného, jednorázová daň ze zisku při prodeji, která se týká jen prodávajících a za určitých podmínek se jí lze vyhnout. Tuhle daň jsem podrobně popsal v samostatném článku o{' '}
                  <Link to="/blog/dan-z-prodeje-bytu-pribram-2026" className="text-secondary hover:underline font-medium">dani z prodeje nemovitosti v Příbrami</Link>. Pokud řešíte prodej, přečtěte si spíš ten článek, tenhle je o roční dani, kterou platíte bez ohledu na to, jestli nemovitost vůbec prodáváte.
                </p>
              </div>

              {/* H2 Kolik zaplatite */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kolik v Příbrami skutečně zaplatíte</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Výše daně se počítá podle vzorce, kde se základní sazba násobí dvěma koeficienty, které si stanovuje obec. Pro rok 2026 zůstávají celostátní sazby stejné jako v roce 2025, inflační koeficient se neaktivoval.
                  </p>
                  <p>
                    Základní sazby podle zákona: byty a rodinné domy 3,50 Kč za m², u domů plus 1,40 Kč za m² každého dalšího nadzemního podlaží, rekreační stavby 11 Kč za m², garáže 14,50 Kč za m² (přehled sazeb pro rok 2026 jsem ověřil na{' '}
                    <a href="https://nemovitostnikalkulacka.cz/pruvodce/dan-z-nemovitosti-2026" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Nemovitostní kalkulačce</a>
                    ).
                  </p>
                  <p>
                    K tomu se násobí dvěma koeficienty. <strong className="text-foreground">Základní koeficient</strong> se odvíjí od počtu obyvatel obce, pro Příbram (25 000 až 50 000 obyvatel) činí 2,5. <strong className="text-foreground">Místní koeficient</strong> si podle obecně závazné vyhlášky stanovuje přímo město, v Příbrami je aktuálně 2 (aktuální tabulku koeficientů pro rok 2026 najdete na{' '}
                    <a href="https://www.podnikatel.cz/clanky/2026-unikatni-prehled-jak-okresni-mesta-meni-koeficienty-k-dani-z-nemovitosti/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Podnikatel.cz</a>
                    ).
                  </p>
                </div>
                <TaxCalculation />
                <p className="text-muted-foreground">
                  Pokud k nemovitosti vlastníte i pozemek, například zahradu, platí se za něj samostatná daň z pozemků s jinou sazbou, tu Vám přesně spočítá finanční úřad na základě výměry a druhu pozemku.
                </p>
              </div>

              {/* H2 Odkud koeficienty */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Odkud se koeficienty v Příbrami vzaly</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Není to náhodné číslo. Podle dobových informací mělo město v polovině 90. let pro vybrané části Příbrami nesystémově snížený základní koeficient až na 1,4, zatímco většina města platila podle koeficientu 2,5. Kolem roku 2015 pak město navrhlo sjednocení a zároveň zvýšení místního koeficientu z původní hodnoty 1 na hodnotu 2 (podle{' '}
                    <a href="https://pribramsko.eu/pribram-a-dan-z-nemovitosti-6565?ID=6565" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Příbramsko.eu</a>
                    {', '}přesné datum účinnosti vyhlášky doporučujeme si ověřit přímo na úřední desce města).
                  </p>
                  <p>
                    Pro rok 2026 podle aktuálního přehledu koeficientů okresních měst na{' '}
                    <a href="https://www.podnikatel.cz/clanky/2026-unikatni-prehled-jak-okresni-mesta-meni-koeficienty-k-dani-z-nemovitosti/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Podnikatel.cz</a>
                    {' '}Příbram své koeficienty nemění, takže platí základní koeficient 2,5 a místní koeficient 2 jako v předchozích letech.
                  </p>
                </div>
              </div>

              {/* H2 Terminy */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Termíny: kdy podat přiznání a kdy platit</h2>
                <p className="text-muted-foreground mb-2">
                  Přiznání k dani z nemovitých věcí se podává <strong className="text-foreground">jen tehdy, když se něco změnilo</strong>, koupili jste nemovitost, zdědili ji, nebo jste na ní udělali stavební změnu, která ovlivňuje výpočet daně. Pokud nic nezměnilo majitele ani parametry, přiznání se každý rok znovu nepodává, finanční úřad daň vypočte automaticky z předchozích údajů.
                </p>
                <DeadlineTimeline />
                <p className="text-muted-foreground mt-4">
                  Zákonný termín pro podání přiznání je 31. ledna a pro jednorázovou platbu do 5 000 Kč 31. května, pro rok 2026 ale oba dny připadají na víkend, takže se podle daňového řádu posouvají na nejbližší pracovní den, 2. února a 1. června 2026 (termíny podle{' '}
                  <a href="https://portal.pohoda.cz/dane-ucetnictvi-mzdy/ostatni-dane/danove-priznani-k-dani-z-nemovitych-veci-terminy-a-povinnosti-v-roce-2026/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Portálu POHODA</a>
                  {' a '}
                  <a href="https://www.kurzy.cz/dane-danova-priznani/dan-z-nemovitosti.htm" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Kurzy.cz</a>
                  ).
                </p>
              </div>

              {/* H2 Osvobozeni */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Kdo je od daně osvobozen</h2>
                <p className="text-muted-foreground mb-2">
                  Osvobození se týká jen konkrétních situací, ne všech vlastníků automaticky:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                  <li>Vlastníci, kteří přešli z pevných paliv na obnovitelný zdroj vytápění, mají nárok na dočasné osvobození po dobu 5 let.</li>
                  <li>Památkově chráněné nemovitosti po rekonstrukci mohou být osvobozené až na 8 let.</li>
                  <li>Zemědělské pozemky v chráněných územích mají zvláštní režim.</li>
                  <li>Vlastníci s průkazem ZTP/P mohou mít nárok na osvobození u nemovitosti sloužící k bydlení, podmínky je potřeba ověřit individuálně na finančním úřadě.</li>
                </ul>
                <p className="text-muted-foreground">
                  Pokud si nejste jistí, jestli se na Vás některá z výjimek vztahuje, ověřte to přímo na místně příslušném finančním úřadě, obecné informace v tomto článku nenahrazují individuální posouzení.
                </p>
              </div>

              {/* H2 Krok za krokem */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Krok za krokem: co udělat, když jste letos koupili nemovitost v Příbrami</h2>
                <ol className="space-y-3 text-muted-foreground list-decimal pl-6 mb-6">
                  <li><strong className="text-foreground">Zjistěte, jestli musíte podat přiznání.</strong> Pokud jste nemovitost v roce 2025 koupili, zdědili nebo darovali, přiznání za rok 2026 podat musíte, do 2. února 2026.</li>
                  <li><strong className="text-foreground">Použijte formulář finanční správy nebo online portál Moje daně.</strong> Přiznání lze podat elektronicky, což je rychlejší než papírová varianta.</li>
                  <li><strong className="text-foreground">Zkontrolujte koeficienty pro Příbram.</strong> Základní koeficient 2,5 a místní koeficient 2 se použijí automaticky, pokud nemovitost leží v katastru města.</li>
                  <li><strong className="text-foreground">Sledujte datum splatnosti podle výše daně.</strong> Do 5 000 Kč jednorázově do 1. června, nad 5 000 Kč lze rozdělit na dvě splátky.</li>
                  <li><strong className="text-foreground">Uschovejte si doklad o zaplacení.</strong> Pro případ kontroly nebo pozdějšího prodeje nemovitosti.</li>
                </ol>

                <p className="text-muted-foreground">
                  Ověření, jestli musíte podat přiznání a jak vysoká daň Vás čeká, řeším s klienty v Příbrami jako součást přípravy na koupi nemovitosti, ať Vás žádný termín nepřekvapí.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-secondary/10 border-2 border-secondary/30 p-6 md:p-8 rounded-xl mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Klíčové body k zapamatování</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'Daň z nemovitosti je roční majetková daň, odlišná od jednorázové daně z prodeje.',
                    'V Příbrami platí základní koeficient 2,5 a místní koeficient 2, sazba za byty a domy je 3,50 Kč za m².',
                    'Byt 60 m² v Příbrami vyjde na dani přibližně na 1 300 Kč ročně, rodinný dům 120 m² přibližně na 2 100 Kč ročně.',
                    'Přiznání se podává jen při změně vlastnictví, do 2. února 2026.',
                    'Daň do 5 000 Kč se platí jednorázově do 1. června 2026, nad 5 000 Kč ve dvou splátkách, do 1. června a do 30. listopadu 2026.',
                    'Osvobození se týká jen konkrétních situací, například přechodu na obnovitelné zdroje, památkově chráněných nemovitostí nebo držitelů průkazu ZTP/P.',
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
                    Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Specializuje se na prodej a pronájem bytů, domů a pozemků v Příbrami a celém okrese. Klienty provází kompletním procesem koupě i prodeje včetně daňových povinností spojených s vlastnictvím nemovitosti.
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
                  <p>Daň z nemovitosti v Příbrami není nijak drastická částka, u běžného bytu jde o tisícikoruny ročně, ale je potřeba pohlídat termíny a nezaměnit ji s daní z prodeje, která se řeší jen při prodeji. Pokud jste letos koupili nebo zdědili nemovitost v Příbrami, nezapomeňte na přiznání do 2. února 2026.</p>
                  <p>Pokud v Příbrami kupujete nemovitost a chcete mít jasno v tom, co všechno Vás po koupi čeká, ozvěte se mi. Projdeme spolu i tuhle povinnost, ať víte přesně, s čím počítat.</p>
                </div>

                <div className="bg-secondary text-secondary-foreground p-8 md:p-10 rounded-2xl text-center shadow-xl">
                  <div className="flex justify-center mb-3">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Kupujete nemovitost v Příbrami a chcete mít jasno ve všech povinnostech?</h3>
                  <p className="text-secondary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Provedu Vás kompletním procesem koupě nebo prodeje, včetně daňových povinností, které Vás jako vlastníka čekají.
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
                Článek vychází z platné legislativy k srpnu 2026 a má informativní charakter. Konkrétní výše daně a nárok na osvobození se vždy odvíjí od individuální situace, doporučujeme ověřit u místně příslušného finančního úřadu nebo daňového poradce. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace.
              </p>

              {/* Související články */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Přečtěte si také</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Daň z prodeje nemovitosti 2026: Kolik zaplatím v Příbrami?', slug: 'dan-z-prodeje-bytu-pribram-2026' },
                    { title: 'Cenová mapa Příbram 2026', slug: 'cenova-mapa-pribram-2026' },
                    { title: 'Katastr nemovitostí 2026: konec anonymního nahlížení', slug: 'katastr-nemovitosti-2026-konec-anonymniho-nahlizeni' },
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

export default BlogDanZNemovitosti;
