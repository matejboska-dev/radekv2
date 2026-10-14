import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, Check, ChevronDown, Clock, Info, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileContactBar from '@/components/services/MobileContactBar';
import { setPageMeta, injectJsonLd, BASE_URL } from '@/lib/seo';
import { IDS, breadcrumbNode, faqNode, personNode, soldDatasetNode } from '@/lib/page-schema';
import { trackServiceEvent } from '@/lib/service-tracking';
import { daysLabel, formatDays, soldAll, soldProperties } from '@/data/sold-properties';
import heroImage from '@/assets/blog/prodej-predani-klicu.webp';
import stagingImage from '@/assets/blog/prodej-home-staging-obyvaci-pokoj.webp';
import viewingImage from '@/assets/blog/prodej-prohlidka-bytu.webp';
import contractImage from '@/assets/blog/prodej-kupni-smlouva.webp';
import radekPortrait from '@/assets/radek-pribram-stoji.webp';
import '@/components/services/services.css';

const URL_PATH = '/blog/prodej-nemovitosti-pribram-krok-za-krokem';
const URL_FULL = `${BASE_URL}${URL_PATH}`;
const OG_IMAGE = `${BASE_URL}/og/prodej-nemovitosti-krok-za-krokem.jpg`;
const PUBLISHED = '2026-10-13';
const PUBLISHED_DISPLAY = '13. října 2026';
const TITLE = 'Prodej nemovitosti v Příbrami krok za krokem (2026)';
const DESCRIPTION = `Jak prodat byt, dům nebo chatu v Příbrami: 9 kroků od ceny po předání klíčů, dokumenty, poplatky, vklad do katastru (22 dnů) a doba prodeje z mých prodejů.`;
const ESTIMATE_HREF = '/odhad-nemovitosti?zdroj=clanek-prodej#odhad-form';

const fastest = soldProperties.find((p) => p.days === soldAll.fastest)!;
const slowest = soldProperties.find((p) => p.days === soldAll.slowest)!;
const within30 = soldAll.buckets[0].count + soldAll.buckets[1].count;
const garage = soldProperties.find((p) => p.kind === 'garaz')!;
const showcase = [fastest, soldProperties.find((p) => p.id === 16)!, slowest];
const median = formatDays(soldAll.median);

const steps = [
  { id: 'cil-a-vlastnictvi', title: 'Ujasněte si cíl, termín a vlastnické vztahy', question: 'Co si ujasnit před prodejem: cíl, termín a vlastníci?', lead: 'Než nemovitost nabídnete, rozhodněte, kdy potřebujete peníze, kam se budete stěhovat a kdo všechno musí prodej podepsat. Právě tady vznikají nejčastější zdržení.' },
  { id: 'cena', title: 'Zjistěte reálnou cenu', question: 'Jak zjistit reálnou cenu nemovitosti?', lead: 'Reálná cena je ta, za kterou se podobné nemovitosti v Příbrami skutečně prodaly, ne cena z inzerátu souseda. Odhad proto stavím na srovnání prodejů, stavu a lokalitě.' },
  { id: 'makler', title: 'Vyberte způsob prodeje a makléře', question: 'Prodat nemovitost sám, nebo s makléřem?', lead: 'Nemovitost můžete prodat sami, nebo s makléřem. Pokud zvolíte makléře, zákon o realitním zprostředkování vyžaduje písemnou smlouvu s konkrétními náležitostmi.' },
  { id: 'dokumenty', title: 'Připravte dokumenty', question: 'Jaké dokumenty potřebuji k prodeji nemovitosti?', lead: 'Bez kompletních podkladů prodej vázne. Nejdéle trvá zpracování PENB a potvrzení od společenství vlastníků, proto je objednejte jako první.' },
  { id: 'priprava', title: 'Připravte nemovitost a prezentaci', question: 'Jak připravit nemovitost na prodej a focení?', lead: 'První dojem vzniká z fotografií. Úklid, odosobnění a drobné opravy stojí málo a prezentaci zlepší nejvíc.' },
  { id: 'inzerce', title: 'Inzerce a prohlídky', question: 'Jak správně inzerovat a vést prohlídky?', lead: `Inzerát má uvést parametry, stav a výhody lokality tak přesně, aby na prohlídku přišli vážní zájemci. U mých prodejů se ${within30} z ${soldAll.count} nemovitostí prodalo do 30 dnů, první týdny proto rozhodují.` },
  { id: 'nabidky', title: 'Nabídky, jednání a rezervace', question: 'Jak probíhá jednání o ceně a rezervace?', lead: 'Nabídky porovnávejte nejen podle ceny, ale i podle financování, termínu a podmínek. Vážný zájem se potvrzuje rezervační smlouvou.' },
  { id: 'smlouva-a-vklad', title: 'Kupní smlouva, úschova a vklad', question: 'Jak funguje kupní smlouva, úschova a vklad do katastru?', lead: 'Vlastnické právo kupujícího vzniká až vkladem do katastru nemovitostí. Kupní cenu proto nejbezpečněji řeší úschova, ze které se peníze uvolní po zápisu. Vklad trvá podle ČÚZK průměrně 22 dnů.' },
  { id: 'predani-a-dane', title: 'Předání, daně a po prodeji', question: 'Jaké daně a povinnosti následují po prodeji?', lead: 'Po zápisu v katastru předáte nemovitost s protokolem, vyřešíte energie a podle okolností i daň z příjmu.' },
];

const tocExtra = [
  { id: 'naklady', title: 'Kolik prodej stojí' },
  { id: 'chyby', title: 'Nejčastější chyby' },
  { id: 'faq', title: 'Časté otázky' },
  { id: 'zdroje', title: 'Zdroje a ověření' },
];

const documents = [
  { doc: 'Výpis z katastru nemovitostí (list vlastnictví)', flat: 'Ano', house: 'Ano' },
  { doc: 'Nabývací titul: kupní nebo darovací smlouva, usnesení o dědictví', flat: 'Ano', house: 'Ano' },
  { doc: 'Průkaz energetické náročnosti budovy (PENB)', flat: 'Ano, má-li dům PENB, stačí průkaz domu', house: 'Ano, s výjimkami' },
  { doc: 'Potvrzení od společenství vlastníků nebo družstva: zálohy, fond oprav, dluhy, plánované opravy', flat: 'Ano', house: 'Ne' },
  { doc: 'Snímek katastrální mapy, případně geometrický plán', flat: 'Podle potřeby', house: 'Ano' },
  { doc: 'Kolaudační rozhodnutí a stavební dokumentace', flat: 'Podle stavu', house: 'Ano' },
  { doc: 'Revize elektřiny, plynu a komína', flat: 'Podle stavu', house: 'Podle stáří a stavu' },
  { doc: 'Vyúčtování energií a služeb, stavy měřidel', flat: 'Ano', house: 'Ano' },
];

const priceRows = [
  { area: 'Centrum a Březové Hory (Příbram I až IV a VI)', note: 'Cihlová i smíšená zástavba, nejvyšší poptávka', price: '70 000 až 100 000 Kč/m²' },
  { area: 'Sídliště (Příbram V, VII a VIII)', note: 'Převážně panelová zástavba 70. a 80. let', price: '60 000 až 90 000 Kč/m²' },
  { area: 'Novostavby napříč městem', note: 'Nový standard, nízká energetická náročnost', price: 'od 130 000 Kč/m²' },
];

const costs = [
  { item: 'Provize makléře', note: 'Sjednává se písemně ve smlouvě o realitním zprostředkování, výše závisí na rozsahu služeb.' },
  { item: 'PENB', note: 'U rodinného domu orientačně 6 000 až 12 000 Kč, u domu bez dokumentace více. U bytu v domě, který PENB má, stačí kopie průkazu domu.' },
  { item: 'Právní servis a kupní smlouva', note: 'Podle složitosti případu, počet vlastníků a zástav cenu zvyšuje.' },
  { item: 'Úschova kupní ceny', note: 'Obvykle od 3 000 Kč u menších částek, u vyšších cen 0,5 až 1,5 % z uschované sumy.' },
  { item: 'Správní poplatek za návrh na vklad', note: '2 000 Kč. Kdo ho uhradí, určuje kupní smlouva.' },
  { item: 'Daň z příjmu z prodeje', note: 'Neplatíte při splnění časového testu, dvouletého bydlení nebo použití peněz na vlastní bydlení.' },
];

const mistakes = [
  { title: 'Příliš vysoká vstupní cena.', text: 'Nemovitost nasazená nad trh leží déle a často se nakonec prodá za méně, než kdyby měla správnou cenu od začátku.' },
  { title: 'Nezkontrolovaný list vlastnictví.', text: 'Zástava, věcné břemeno nebo rozdíl mezi skutečností a zápisem v katastru vyjde najevo nejpozději u banky kupujícího. Lepší je znát je předem.' },
  { title: 'Chybějící PENB.', text: 'Povinnost má prodávající a nesplnění řeší Státní energetická inspekce. Průkaz se zpracovává zhruba 30 pracovních dnů, objednejte ho hned na začátku.' },
  { title: 'Nevyjasněné spoluvlastnictví nebo společné jmění manželů.', text: 'Prodej podepisují všichni, kterých se týká. Zjištění na poslední chvíli zdržuje podpis smlouvy.' },
  { title: 'Ústní dohody.', text: 'Smlouva s makléřem i kupní smlouva mají písemnou podobu. Co není ve smlouvě, nelze později spolehlivě doložit.' },
  { title: 'Peníze mimo úschovu.', text: 'Kupní cena nemá putovat přímo kupujícímu a zpět. Úschova zajistí, že se peníze uvolní až po zápisu vlastnického práva.' },
];

const faqItems = [
  {
    q: 'Jak dlouho trvá prodej nemovitosti v Příbrami?',
    a: `U ${soldAll.count} nemovitostí, které uvádím v přehledu Prodané nemovitosti, byl medián doby prodeje ${median} dne a ${within30} z nich se prodalo do 30 dnů. Doba závisí na typu nemovitosti, ceně a poptávce, nejdéle trvaly ${slowest.title.split(',')[0].toLowerCase()} (${daysLabel(slowest.days)}) a ${garage.title.split(',')[0].toLowerCase()} (${daysLabel(garage.days)}). K tomu přičtěte vklad do katastru, který podle ČÚZK trvá průměrně 22 dnů, a případně čekání na hypotéku kupujícího.`,
  },
  {
    q: 'Jaké dokumenty potřebuji k prodeji bytu v Příbrami?',
    a: 'Výpis z katastru nemovitostí, nabývací titul (kupní nebo darovací smlouvu, usnesení o dědictví), průkaz energetické náročnosti budovy, potvrzení od společenství vlastníků nebo družstva a vyúčtování energií se stavy měřidel. U domu přibývá snímek katastrální mapy, kolaudace a podle stavu revize.',
  },
  {
    q: 'Kolik stojí prodej nemovitosti?',
    a: 'Největší položkou bývá provize makléře, kterou si sjednáváte písemně. Dále počítejte s PENB, právním servisem a úschovou kupní ceny, od 3 000 Kč u menších částek, a se správním poplatkem 2 000 Kč za návrh na vklad. Při splnění časového testu ani dvouletého bydlení neplatíte daň z příjmu.',
  },
  {
    q: 'Musím platit daň z prodeje nemovitosti?',
    a: 'Příjem z prodeje je osvobozen, pokud nemovitost vlastníte alespoň 10 let (u nabytí před rokem 2021 alespoň 5 let), pokud jste v ní měli bydliště alespoň dva roky bezprostředně před prodejem, nebo pokud peníze použijete na obstarání vlastní bytové potřeby. Daň z nabytí nemovitých věcí se v Česku už neplatí, kupující ji tedy neplatí také.',
  },
  {
    q: 'Kdy dostanu peníze za prodanou nemovitost?',
    a: 'Při úschově se kupní cena uvolní po zápisu vlastnického práva kupujícího do katastru. Průměrná doba provedení vkladu byla podle ČÚZK v září 2026 22 dnů. Od podpisu kupní smlouvy tedy počítejte zhruba s měsícem, u hypotéky kupujícího a složitějších případů i déle.',
  },
  {
    q: 'Mohu prodat nemovitost, na které vázne hypotéka?',
    a: 'Ano. Zástavní právo banky se po splacení úvěru vymaže z katastru. Prakticky se úvěr splácí z kupní ceny uložené v úschově, banka vystaví souhlas s výmazem zástavy a zbytek ceny dostanete Vy. Postup s bankou domlouvejte před podpisem kupní smlouvy.',
  },
  {
    q: 'Prodat sám, nebo s makléřem?',
    a: 'Obojí je možné. Sám ušetříte provizi, ale nesete odpovědnost za cenu, prezentaci, prohlídky i smluvní stránku. S makléřem získáte zkušenost, marketing a koordinaci právního servisu. Srovnání obou cest včetně nákladů najdete v samostatném článku.',
  },
];

const sources = [
  { label: 'ČÚZK: sazby správních poplatků (položka 120, návrh na vklad)', href: 'https://cuzk.gov.cz/Katastr-nemovitosti/Poplatky/Sazby-spravnich-poplatku.aspx' },
  { label: 'ČÚZK: statistika vkladů, průměrná doba provedení vkladu (září 2026)', href: 'https://cuzk.gov.cz/Katastr-nemovitosti/Zapisy-do-KN/Podani-navrhu-na-vklad-v-elektronicke-podobe.aspx' },
  { label: 'Zákon č. 39/2020 Sb., o realitním zprostředkování', href: 'https://www.zakonyprolidi.cz/cs/2020-39' },
  { label: 'Zákon č. 586/1992 Sb., o daních z příjmů (§ 4, osvobození příjmů z prodeje nemovitosti)', href: 'https://www.zakonyprolidi.cz/cs/1992-586' },
  { label: 'Zákon č. 406/2000 Sb., o hospodaření energií (PENB)', href: 'https://www.zakonyprolidi.cz/cs/2000-406' },
  { label: 'Přehled prodaných nemovitostí Radka Větrovského (zdroj vlastních dat o době prodeje)', href: `${BASE_URL}/prodano` },
];

function P({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mt-4 text-base leading-[1.75] text-foreground/85 sm:text-[1.0625rem] ${className}`}>{children}</p>;
}

function A({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary">{children}</Link>;
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary">{children}</a>;
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  const step = steps[n - 1];
  return (
    <section id={step.id} className="scroll-mt-28 border-t border-border pt-10 sm:pt-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Krok {n} z {steps.length}</p>
      <h2 className="mt-2 font-syne text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{step.question}</h2>
      <p className="mt-4 rounded-xl border-l-4 border-secondary bg-muted px-5 py-4 text-base font-semibold leading-relaxed text-foreground sm:text-[1.0625rem]">{step.lead}</p>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem]">
          <Check className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Figure({ src, alt, width, height, credit, caption }: { src: string; alt: string; width: number; height: number; credit: string; caption: string }) {
  return (
    <figure className="mt-8">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-2xl object-cover" />
      <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">{caption} Foto: {credit}, Unsplash.</figcaption>
    </figure>
  );
}

function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <caption className="border-b border-border bg-muted px-5 py-3 text-left font-syne text-sm font-bold">{caption}</caption>
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            {head.map((h) => <th key={h} scope="col" className="px-5 py-3 font-bold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border align-top last:border-0">
              {row.map((cell, j) => <td key={j} className={`px-5 py-3.5 leading-relaxed ${j === 0 ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const afterSigning = [
  { title: 'Podpis kupní smlouvy', text: 'Podepisují všichni vlastníci a kupující.' },
  { title: 'Kupní cena v úschově', text: 'Kupující ji složí advokátovi, notáři nebo bance.' },
  { title: 'Návrh na vklad', text: 'Podává se do katastru, poplatek 2 000 Kč.' },
  { title: 'Vklad do katastru', text: 'Průměrně 22 dnů (ČÚZK, září 2026).' },
  { title: 'Uvolnění peněz a předání', text: 'Po zápisu vlastnického práva.' },
];

export default function BlogProdejNemovitostiKrokZaKrokem() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(TITLE, DESCRIPTION, URL_PATH, OG_IMAGE, 'article', 'Ruka s klíči od bytu s přívěskem ve tvaru domku při předání nemovitosti');
    const articleText = document.querySelector('article')?.textContent ?? '';
    const wordCount = articleText.trim() ? articleText.trim().split(/\s+/).length : undefined;
    const heroUrl = new URL(heroImage, BASE_URL).href;
    const cleanupGraph = injectJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting', '@id': `${URL_FULL}#article`,
          headline: TITLE, description: DESCRIPTION, inLanguage: 'cs-CZ',
          datePublished: PUBLISHED, dateModified: PUBLISHED,
          articleSection: 'Prodej nemovitostí', timeRequired: 'PT13M', isAccessibleForFree: true,
          ...(wordCount ? { wordCount } : {}),
          keywords: ['prodej nemovitosti Příbram', 'jak prodat byt v Příbrami', 'jak prodat dům v Příbrami', 'dokumenty k prodeji nemovitosti', 'doba prodeje nemovitosti', 'vklad do katastru'],
          image: [
            OG_IMAGE,
            {
              '@type': 'ImageObject', url: heroUrl, width: 1600, height: 1067,
              caption: 'Ruka s klíči od bytu s přívěskem ve tvaru domku při předání nemovitosti',
              creditText: 'Jakub Żerdzicki / Unsplash', creator: { '@type': 'Person', name: 'Jakub Żerdzicki' },
              license: 'https://unsplash.com/license', acquireLicensePage: 'https://unsplash.com/license',
            },
          ],
          mainEntityOfPage: { '@id': `${URL_FULL}#webpage` },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#rychla-odpoved-text'] },
          author: { '@id': IDS.person }, publisher: { '@id': IDS.business },
          copyrightHolder: { '@id': IDS.person },
          isBasedOn: { '@id': `${URL_FULL}#dataset` },
          about: [
            { '@type': 'Thing', name: 'Prodej nemovitosti' },
            { '@type': 'City', name: 'Příbram', sameAs: 'https://cs.wikipedia.org/wiki/P%C5%99%C3%ADbram' },
          ],
          mentions: [
            { '@type': 'GovernmentOrganization', name: 'Český úřad zeměměřický a katastrální (ČÚZK)', url: 'https://cuzk.gov.cz/' },
            { '@type': 'Thing', name: 'Průkaz energetické náročnosti budovy (PENB)' },
            { '@type': 'Thing', name: 'Vklad vlastnického práva do katastru nemovitostí' },
          ],
          citation: sources.filter((s) => !s.href.startsWith(BASE_URL)).map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.href })),
        },
        {
          '@type': 'WebPage', '@id': `${URL_FULL}#webpage`, url: URL_FULL, name: TITLE, description: DESCRIPTION, inLanguage: 'cs-CZ',
          isPartOf: { '@id': IDS.website }, breadcrumb: { '@id': `${URL_FULL}#breadcrumb` },
          mainEntity: { '@id': `${URL_FULL}#article` },
          primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
          datePublished: PUBLISHED, dateModified: PUBLISHED, lastReviewed: PUBLISHED, reviewedBy: { '@id': IDS.person },
        },
        personNode(),
        {
          '@type': 'HowTo', '@id': `${URL_FULL}#howto`, name: 'Jak prodat nemovitost v Příbrami krok za krokem',
          description: 'Devět kroků od ujasnění cíle a ceny po předání nemovitosti, vklad do katastru a vyřízení daní.',
          inLanguage: 'cs-CZ', mainEntityOfPage: { '@id': `${URL_FULL}#webpage` },
          step: steps.map((step, i) => ({ '@type': 'HowToStep', position: i + 1, name: step.title, text: step.lead, url: `${URL_FULL}#${step.id}` })),
        },
        soldDatasetNode({
          id: `${URL_FULL}#dataset`,
          name: 'Doba prodeje nemovitostí Radka Větrovského v Příbrami a okolí',
          description: `Doba prodeje ve dnech u ${soldAll.count} nemovitostí (byty, domy, chata, garáž) prodaných v Příbrami a okolí a uvedených v přehledu Prodané nemovitosti. Medián ${median} dne, ${within30} z ${soldAll.count} nemovitostí se prodalo do 30 dnů.`,
          areaName: 'Příbram a okres Příbram', summary: soldAll, modified: PUBLISHED,
        }),
        breadcrumbNode(URL_FULL, [
          { name: 'Domů', item: `${BASE_URL}/` },
          { name: 'Články', item: `${BASE_URL}/clanky` },
          { name: 'Prodej nemovitosti v Příbrami krok za krokem', item: URL_FULL },
        ]),
        faqNode(URL_FULL, faqItems),
      ],
    });
    return () => { cleanupMeta(); cleanupGraph(); };
  }, []);

  const trackEstimate = (placement: string) => () => trackServiceEvent('service_cta_click', 'clanek-prodej', placement);

  return (
    <div className="service-page min-h-screen bg-background">
      <a href="#clanek" className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-xl focus:bg-background focus:p-4">Přejít k článku</a>
      <Header staticContent serviceCta={{ href: ESTIMATE_HREF, label: 'Odhad zdarma', onClick: trackEstimate('header') }} />
      <main id="clanek">
        <article>
          {/* Hero */}
          <header className="bg-muted/60 pb-10 pt-28 sm:pb-14 sm:pt-32">
            <div className="service-container">
              <nav aria-label="Drobečková navigace" className="mb-8 text-xs text-muted-foreground sm:text-sm">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li><Link className="hover:text-foreground hover:underline" to="/">Domů</Link></li><li aria-hidden="true">/</li>
                  <li><Link className="hover:text-foreground hover:underline" to="/clanky">Články</Link></li><li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-foreground">Prodej nemovitosti krok za krokem</li>
                </ol>
              </nav>
              <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
                <div className="min-w-0 lg:col-span-7">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Průvodce prodejem · aktualizováno {PUBLISHED_DISPLAY}</p>
                  <h1 className="font-syne text-[1.75rem] font-extrabold uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl" style={{ hyphens: 'manual' }}>Prodej nemovitosti v Příbrami krok za krokem</h1>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">Od ceny po předání klíčů. Průvodce pro rok 2026 s čísly z mých prodejů a z oficiálních zdrojů, použitelný pro byt, dům i chatu.</p>
                  <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><dt className="sr-only">Autor</dt><dd>Autor: <Link to="/radek-vetrovsky-realitni-makler-pribram" className="font-bold text-foreground hover:underline">Radek Větrovský</Link>, RE/MAX Power 2</dd></div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" /><dt className="sr-only">Publikováno</dt><dd><time dateTime={PUBLISHED}>{PUBLISHED_DISPLAY}</time></dd></div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" /><dt className="sr-only">Doba čtení</dt><dd>13 min čtení</dd></div>
                  </dl>
                </div>
                <figure className="min-w-0 lg:col-span-5">
                  <img src={heroImage} alt="Ruka s klíči od bytu s přívěskem ve tvaru domku při předání nemovitosti" width={1600} height={1067} {...{ fetchpriority: 'high' }} className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-3xl" />
                  <figcaption className="mt-2 text-xs text-muted-foreground">Foto: Jakub Żerdzicki, Unsplash.</figcaption>
                </figure>
              </div>
            </div>
          </header>

          <div className="service-container grid gap-12 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="min-w-0">
              {/* Rychlá odpověď */}
              <section aria-labelledby="rychla-odpoved" className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 sm:p-8">
                <h2 id="rychla-odpoved" className="font-syne text-xl font-extrabold sm:text-2xl">Rychlá odpověď</h2>
                <p id="rychla-odpoved-text" className="mt-3 text-base leading-[1.75] text-foreground/90 sm:text-[1.0625rem]">
                  Prodej nemovitosti v Příbrami má devět kroků: ujasnění cíle a termínu, zjištění reálné ceny, volba způsobu prodeje, příprava dokumentů, příprava nemovitosti a prezentace, inzerce s prohlídkami, rezervace, kupní smlouva s úschovou kupní ceny a předání s vyřízením daní. Prodávající potřebuje výpis z katastru, nabývací titul a průkaz energetické náročnosti budovy (PENB), u bytu také podklady od společenství vlastníků. Rezervační poplatek činí obvykle 3 až 5 % z kupní ceny a platí ho kupující. Vlastnické právo kupujícího vzniká vkladem do katastru, správní poplatek činí 2&nbsp;000 Kč a průměrná doba provedení vkladu byla podle ČÚZK v září 2026 22 dnů. Daň z příjmu obvykle neplatíte, pokud nemovitost vlastníte alespoň 10 let (u nabytí před rokem 2021 alespoň 5 let) nebo jste v ní měli bydliště nejméně dva roky před prodejem. U {soldAll.count} prodaných nemovitostí z mého přehledu byl medián doby prodeje {median} dne.
                </p>
              </section>

              {/* Obsah (mobil) */}
              <details className="mt-8 rounded-2xl border border-border lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-syne text-base font-bold">Obsah článku<ChevronDown className="h-5 w-5 text-secondary" aria-hidden="true" /></summary>
                <ol className="space-y-1 border-t border-border px-5 py-4">
                  {[...steps, ...tocExtra].map((s, i) => <li key={s.id}><a className="flex min-h-11 items-center gap-3 text-sm font-semibold hover:text-secondary" href={`#${s.id}`}><span className="w-5 text-secondary">{i < steps.length ? i + 1 : ''}</span>{s.title}</a></li>)}
                </ol>
              </details>

              {/* Původní data */}
              <section id="data" aria-labelledby="data-heading" className="mt-12 scroll-mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Původní data</p>
                <h2 id="data-heading" className="mt-2 font-syne text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Jak dlouho trvá prodej nemovitosti v Příbrami?</h2>
                <P>Medián doby prodeje u mých {soldAll.count} prodaných nemovitostí je {median} dne a {within30} z nich se prodalo do 30 dnů. K tomu přibývá vklad do katastru, který trvá průměrně 22 dnů. Na stránce <A to="/prodano">Prodané nemovitosti</A> uvádím u každé nemovitosti, za kolik dní se prodala, a odtud čísla počítám. Vzorek je malý a každá nemovitost je jiná, takže berte čísla jako orientaci, ne jako slib pro Vaši nemovitost.</P>
                <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { v: String(soldAll.count), u: '', l: 'prodaných nemovitostí' },
                    { v: median, u: 'dne', l: 'medián doby prodeje' },
                    { v: formatDays(soldAll.average), u: 'dne', l: 'průměr doby prodeje' },
                    { v: `${within30} z ${soldAll.count}`, u: '', l: 'prodáno do 30 dnů' },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col-reverse justify-end rounded-2xl border border-border p-4 sm:p-5">
                      <dt className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</dt>
                      <dd className="whitespace-nowrap font-syne text-2xl font-extrabold text-primary sm:text-3xl">{s.v}{s.u && <span className="ml-1.5 text-sm font-bold sm:text-base">{s.u}</span>}</dd>
                    </div>
                  ))}
                </dl>
                <figure className="mt-6 rounded-2xl border border-border p-5 sm:p-6" aria-label="Rozdělení prodaných nemovitostí podle doby prodeje">
                  <figcaption className="font-syne text-sm font-bold">Počet nemovitostí podle doby prodeje</figcaption>
                  <ul className="mt-4 space-y-3">
                    {soldAll.buckets.map((b) => (
                      <li key={b.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)_2rem] items-center gap-3 text-sm">
                        <span className="text-foreground/80">{b.label}</span>
                        <span className="h-3 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{ width: `${(b.count / Math.max(...soldAll.buckets.map((x) => x.count))) * 100}%` }} /></span>
                        <span className="text-right font-bold">{b.count}</span>
                      </li>
                    ))}
                  </ul>
                </figure>
                <P>Nejrychleji se prodal <strong>{fastest.title}</strong> ({fastest.location}) za {daysLabel(fastest.days)}, nejdéle trvala <strong>{slowest.title}</strong> ({daysLabel(slowest.days)}), následovaná garáží ({daysLabel(garage.days)}). Chata a garáž mají obvykle užší okruh zájemců než byt, což se v číslech projevuje. Do 30 dnů se prodalo {within30} z {soldAll.count} nemovitostí, proto Vám radím připravit vše ještě před zveřejněním nabídky.</P>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {showcase.map((p) => (
                    <Link key={p.id} to={`/prodano#nemovitost-${p.id}`} className="group overflow-hidden rounded-2xl border border-border">
                      <img src={p.image} alt={`${p.title}, ${p.location}, ${p.size}, prodáno za ${daysLabel(p.days)}`} width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      <div className="p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-secondary">Prodáno za {daysLabel(p.days)}</p>
                        <p className="mt-1 font-syne text-sm font-bold leading-snug group-hover:text-secondary">{p.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{p.location}, {p.size}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Údaje pocházejí z přehledu prodaných nemovitostí k {PUBLISHED_DISPLAY}. Doba prodeje je údaj uvedený u každé nemovitosti v tomto přehledu, nevyjadřuje garanci pro další prodej.</p>
              </section>

              <div className="mt-12 space-y-12">
                <Step n={1}>
                  <P>Začněte třemi otázkami: do kdy musíte mít nemovitost prodanou, zda na prodej navazuje koupě jiného bydlení a z čeho bude případně financována. Pokud kupujete další bydlení, sladíme termíny obou obchodů ještě před zveřejněním nabídky, jak popisuji na stránce o <A to="/sluzby/koupe-nemovitosti-pribram">koupi nemovitosti</A>.</P>
                  <P className="!mt-6 font-semibold text-foreground">Zjistěte předem:</P>
                  <Bullets items={[
                    'Kdo je podle listu vlastnictví vlastníkem a zda prodej podepíšou všichni spoluvlastníci. Při prodeji podílu mají ostatní spoluvlastníci za určitých podmínek předkupní právo.',
                    'Zda nemovitost patří do společného jmění manželů. K prodeji je obvykle potřeba souhlas obou manželů.',
                    'Zda na nemovitosti vázne zástavní právo z hypotéky, věcné břemeno nebo jiné omezení. Zástavu lze po splacení úvěru vymazat, postup popisuji v kroku 8.',
                    'Zda je nemovitost pronajatá. Nájemní smlouva prodejem automaticky nekončí, na kupujícího přechází.',
                  ]} />
                </Step>

                <Step n={2}>
                  <P>Inzerovaná cena je přání prodávajícího, dosažená cena je výsledek jednání. Při odhadu proto posuzuji lokalitu, velikost, stav, patro nebo pozemek a porovnávám nemovitost s těmi, které už našly kupce. Samotný stav bytu, jeho velikost a to, zda jde o novostavbu, ovlivňují cenu víc než rozdíl mezi jednotlivými čtvrtěmi.</P>
                  <DataTable caption="Orientační ceny bytů v Příbrami, cenová mapa k červnu 2026" head={['Lokalita', 'Zástavba', 'Cena za m²']} rows={priceRows.map((r) => [r.area, r.note, r.price])} />
                  <P>Podrobnější přehled s cenami podle dispozice najdete v <A to="/blog/cenova-mapa-pribram-2026">cenové mapě Příbrami 2026</A>, k ocenění domu a chaty vede článek <A to="/blog/jak-spravne-ocenit-nemovitost">Jak správně ocenit nemovitost</A>. Příliš vysoká vstupní cena je častější chyba než příliš nízká: nemovitost leží déle a často se nakonec prodá za méně. Orientační odhad zdarma získáte přes <A to={ESTIMATE_HREF}>formulář odhadu</A>, osobní odhad vychází z prohlídky.</P>
                </Step>

                <Step n={3}>
                  <P>Srovnání obou cest včetně nákladů a rizik najdete v článku <A to="/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem">Prodat nemovitost v Příbrami bez realitky, nebo s makléřem</A>, rozdíl mezi výhradní a nevýhradní smlouvou vysvětluje článek <A to="/blog/exkluzivni-smlouva-s-maklerem">Exkluzivní smlouva s makléřem</A>.</P>
                  <P className="!mt-6 font-semibold text-foreground">Podle zákona č. 39/2020 Sb. ověřte u smlouvy s makléřem:</P>
                  <Bullets items={[
                    'Smlouva je písemná a obsahuje označení předmětu prodeje, cenu nebo způsob jejího určení a výši provize nebo způsob jejího určení.',
                    'Výpis z katastru nemovitostí Vám makléř předá nejpozději v den uzavření smlouvy a nesmí být starší než tři pracovní dny.',
                    'Makléř je pojištěn pro případ odpovědnosti za újmu způsobenou zájemci. Doklad o pojištění si můžete vyžádat.',
                  ]} />
                  <P>Jak postupuji já od odhadu po předání klíčů, najdete na stránce <A to="/sluzby/prodej-nemovitosti-pribram">Prodej nemovitostí v Příbrami</A>.</P>
                </Step>

                <Step n={4}>
                  <DataTable caption="Dokumenty k prodeji podle typu nemovitosti" head={['Dokument', 'Byt', 'Dům a pozemek']} rows={documents.map((d) => [d.doc, d.flat, d.house])} />
                  <P>Výpis z katastru si dnes obstaráte přihlášením přes BankID nebo mojeID, změnu popisuji v článku <A to="/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni">Katastr nemovitostí 2026</A>. PENB musí mít prodávající u naprosté většiny nemovitostí, výjimky a ceny vysvětluje článek <A to="/blog/penb-pri-prodeji-nemovitosti-2026">Energetický štítek při prodeji</A>. Zpracování trvá zhruba 30 pracovních dnů, objednejte ho hned na začátku.</P>
                </Step>

                <Step n={5}>
                  <P>Home staging znamená upravit prostor tak, aby si zájemce snadno představil, jak v něm bude bydlet: vyklidit přebytečný nábytek a osobní předměty, opravit kliky, zásuvky a kapající kohoutky, přemalovat opotřebené stěny, otevřít prostor světlu. U domu rozhoduje také pohled z ulice, tedy fasáda, vjezd a upravená zahrada.</P>
                  <Figure src={stagingImage} alt="Světlý uklizený obývací pokoj se sedačkou a rostlinami připravený na focení" width={1200} height={800} credit="Kara Eads" caption="Uklizený a odosobněný prostor se fotí i prodává snáz." />
                  <P>Na profesionální fotografie navazuje video a podle typu nemovitosti i 3D prohlídka. Rozsáhlou rekonstrukci před prodejem většinou nedoporučuji, často se nevrátí. Dává smysl začít úklidem, drobnými opravami a přípravou na focení a každou větší investici probrat předem v souvislosti s cenou a cílovou skupinou kupujících.</P>
                </Step>

                <Step n={6}>
                  <P className="!mt-6 font-semibold text-foreground">Dobrý inzerát obsahuje:</P>
                  <Bullets items={[
                    'dispozici, výměru a u bytu patro, výtah, balkon a sklep, u domu velikost pozemku a přípojky,',
                    'energetickou třídu a měsíční náklady na bydlení,',
                    'popis lokality: doprava, služby, školy, parkování,',
                    'kvalitní fotografie a půdorys.',
                  ]} />
                  <Figure src={viewingImage} alt="Makléřka provádí pár světlým bytem při prohlídce" width={1200} height={675} credit="Vitaly Gariev" caption="Individuální prohlídky umožní zájemcům klást otázky a Vám získat zpětnou vazbu." />
                  <P>Prohlídky plánuji individuálně, vedu evidenci zájemců a jejich zpětné vazby a předem se ptám, jak chtějí nemovitost financovat. Zpětná vazba je nejrychlejší signál, zda cena a prezentace sedí. Pokud se po prvních prohlídkách neozve nikdo vážný, upravíme prezentaci nebo cenu dřív, než nabídka zestárne.</P>
                </Step>

                <Step n={7}>
                  <P>Rezervační poplatek činí obvykle 3 až 5 % z kupní ceny a platí ho kupující. Smlouva musí výslovně říct, co se stane s poplatkem, pokud obchod nevznikne, a z jaké části se započte do kupní ceny. Podrobnosti najdete v článku <A to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026">Rezervační smlouva a úschova kupní ceny</A>.</P>
                  <P>Pokud kupující využívá hypotéku, počítejte s odhadem nemovitosti bankou a schválením úvěru. Termín kupní smlouvy tomu přizpůsobte a dopady sazeb si přečtěte v článku <A to="/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram">Hypotéky a prodej nemovitosti v Příbrami</A>.</P>
                </Step>

                <Step n={8}>
                  <P>Kupní smlouvu připravuje advokát nebo právník. Obsahuje předmět prodeje, cenu, způsob platby, termín předání a prohlášení o stavu nemovitosti a podepisují ji všichni vlastníci i kupující. Úschovu kupní ceny zajišťuje advokát, notář nebo banka, jejich rozdíly popisuje <A to="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026">samostatný článek</A>.</P>
                  <Figure src={contractImage} alt="Podání ruky nad podepsanou smlouvou a dokumenty na stole" width={1200} height={800} credit="Amina Atar" caption="Kupní smlouvu podepisují všichni vlastníci a kupující, peníze jdou do úschovy." />
                  <ol className="mt-8 grid gap-3 sm:grid-cols-5" aria-label="Postup po podpisu kupní smlouvy">
                    {afterSigning.map((s, i) => (
                      <li key={s.title} className="rounded-2xl border border-border p-4">
                        <span className="font-syne text-lg font-extrabold text-secondary">{i + 1}</span>
                        <p className="mt-2 font-syne text-sm font-bold leading-snug">{s.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                      </li>
                    ))}
                  </ol>
                  <P>Správní poplatek za návrh na vklad činí 2&nbsp;000 Kč, kdo jej uhradí, určuje kupní smlouva. Průměrná doba provedení vkladu byla podle ČÚZK v září 2026 22 dnů, stejně jako v září 2025. Pokud na nemovitosti vázne hypotéka, splácí se úvěr z kupní ceny v úschově, banka vystaví souhlas s výmazem zástavy a zbytek ceny dostanete Vy.</P>
                </Step>

                <Step n={9}>
                  <P>Do předávacího protokolu zapište stav nemovitosti, předané vybavení, stavy měřidel elektřiny, plynu, vody a tepla a počet klíčů. Navazuje přepis energií a oznámení společenství vlastníků nebo správci domu.</P>
                  <P className="!mt-6 font-semibold text-foreground">Daň z příjmu z prodeje neplatíte, pokud platí alespoň jedna z podmínek:</P>
                  <Bullets items={[
                    'nemovitost jste vlastnili nejméně 10 let (u nabytí před 1. 1. 2021 nejméně 5 let),',
                    'měli jste v ní bydliště nejméně dva roky bezprostředně před prodejem,',
                    'peníze z prodeje použijete na obstarání vlastní bytové potřeby ve lhůtě stanovené zákonem.',
                  ]} />
                  <P>Výpočet a lhůty rozebírá článek <A to="/blog/dan-z-prodeje-bytu-pribram-2026">Daň z prodeje bytu v Příbrami 2026</A>, roční daň z nemovitých věcí a místní koeficient popisuje článek <A to="/blog/dan-z-nemovitosti-pribram-2026">Daň z nemovitosti v Příbrami 2026</A>. Daň z nabytí nemovitých věcí se už neplatí.</P>
                </Step>
              </div>

              {/* Náklady */}
              <section id="naklady" aria-labelledby="naklady-heading" className="mt-14 scroll-mt-28 border-t border-border pt-10 sm:pt-12">
                <h2 id="naklady-heading" className="font-syne text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Kolik stojí prodej nemovitosti?</h2>
                <P>Přesnou částku určí nemovitost a rozsah služeb. Tohle jsou položky, na které při prodeji myslet.</P>
                <DataTable caption="Náklady spojené s prodejem" head={['Položka', 'Co počítat']} rows={costs.map((c) => [c.item, c.note])} />
              </section>

              {/* Chyby */}
              <section id="chyby" aria-labelledby="chyby-heading" className="mt-14 scroll-mt-28 border-t border-border pt-10 sm:pt-12">
                <h2 id="chyby-heading" className="font-syne text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Jaké chyby při prodeji nemovitosti jsou nejčastější?</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {mistakes.map((m) => (
                    <li key={m.title} className="rounded-2xl border border-border p-5">
                      <h3 className="font-syne text-base font-bold leading-snug">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{m.text}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" aria-labelledby="faq-heading" className="mt-14 scroll-mt-28 border-t border-border pt-10 sm:pt-12">
                <h2 id="faq-heading" className="font-syne text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Časté otázky k prodeji nemovitosti v Příbrami</h2>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {faqItems.map((f, i) => (
                    <details key={f.q} className="service-faq group" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-syne text-base font-bold sm:text-lg"><h3 className="font-syne text-inherit font-bold leading-snug">{f.q}</h3><ChevronDown className="h-5 w-5 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                      <p className="max-w-prose pb-6 pr-7 leading-relaxed text-foreground/80">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="mt-14 rounded-3xl bg-primary p-6 text-white sm:p-10" aria-labelledby="cta-heading">
                <h2 id="cta-heading" className="font-syne text-2xl font-extrabold uppercase leading-tight sm:text-3xl">Prodáváte v Příbrami?</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">Začněte cenou. Odhad je zdarma a nezávazný, osobně se Vám ozvu a domluvíme další krok. Pokud Vás zajímá, jak se liší jednotlivé čtvrti města, přečtěte si průvodce <Link to="/lokality/pribram" className="font-bold underline underline-offset-4">Nemovitosti v Příbrami</Link>.</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link to={ESTIMATE_HREF} onClick={trackEstimate('article_end')} className="service-button">Zjistit cenu nemovitosti<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>
                  <a className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:underline" href="tel:+420721855854"><Phone className="h-4 w-4" aria-hidden="true" />721 855 854</a>
                </div>
              </section>

              {/* Zdroje */}
              <section id="zdroje" aria-labelledby="zdroje-heading" className="mt-14 scroll-mt-28 border-t border-border pt-10">
                <h2 id="zdroje-heading" className="font-syne text-2xl font-extrabold leading-tight tracking-tight">Zdroje a ověření</h2>
                <p className="mt-3 text-sm text-muted-foreground">Právní a statistické údaje jsem ověřoval u primárních zdrojů k {PUBLISHED_DISPLAY}. Čísla o době prodeje počítám z vlastního přehledu prodaných nemovitostí.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {sources.map((s) => (
                    <li key={s.href}>{s.href.startsWith(BASE_URL) ? <A to="/prodano">{s.label}</A> : <Ext href={s.href}>{s.label}</Ext>}</li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic leading-relaxed text-muted-foreground">Článek má informativní charakter a nenahrazuje právní ani daňové poradenství. Konkrétní postup, ceny a daňové povinnosti se liší podle nemovitosti a situace prodávajícího. Daňové otázky konzultujte s daňovým poradcem, právní s advokátem.</p>
              </section>

              {/* Autor */}
              <aside aria-label="O autorovi" className="mt-10 grid items-center gap-6 rounded-3xl bg-muted p-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:p-8">
                <img src={radekPortrait} alt="Radek Větrovský, realitní makléř RE/MAX Power 2 v Příbrami" width={547} height={1200} loading="lazy" className="mx-auto h-40 w-auto object-contain" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">O autorovi</p>
                  <p className="mt-1 font-syne text-xl font-bold">Radek Větrovský</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">Certifikovaný realitní makléř RE/MAX Power 2 v Příbrami. Prodává byty, domy, chaty a pozemky v Příbrami a okolí, od odhadu ceny po předání klíčů.</p>
                  <Link to="/radek-vetrovsky-realitni-makler-pribram" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">Více o mně <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </aside>
            </div>

            {/* Postranní panel */}
            <aside className="hidden lg:block" aria-label="Obsah a kontakt">
              <div className="sticky top-28 space-y-6">
                <nav aria-label="Obsah článku" className="rounded-2xl border border-border p-5">
                  <p className="font-syne text-sm font-bold">Obsah článku</p>
                  <ol className="mt-3 space-y-1">
                    {[...steps, ...tocExtra].map((s, i) => <li key={s.id}><a className="flex gap-3 py-1 text-sm leading-snug text-foreground/80 hover:text-secondary" href={`#${s.id}`}><span className="w-4 shrink-0 font-bold text-secondary">{i < steps.length ? i + 1 : ''}</span>{s.title}</a></li>)}
                  </ol>
                </nav>
                <div className="rounded-2xl bg-primary p-6 text-white">
                  <p className="font-syne text-lg font-extrabold leading-snug">Kolik je Vaše nemovitost opravdu hodna?</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">Odhad zdarma a nezávazně.</p>
                  <Link to={ESTIMATE_HREF} onClick={trackEstimate('sidebar')} className="service-button mt-4 w-full">Zjistit cenu<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  <a className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm font-bold hover:underline" href="tel:+420721855854"><Phone className="h-4 w-4" aria-hidden="true" />721 855 854</a>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer staticContent />
      <MobileContactBar href={ESTIMATE_HREF} label="Odhad zdarma" onClick={trackEstimate('mobile_bar')} />
    </div>
  );
}
