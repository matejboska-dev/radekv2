import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Briefcase, Bus, Car, ChevronDown, GraduationCap, Landmark, MapPin, Mountain, Phone, TrainFront } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceContact, { type ContactContent } from '@/components/services/ServiceContact';
import MobileContactBar from '@/components/services/MobileContactBar';
import { setPageMeta, injectJsonLd, BASE_URL } from '@/lib/seo';
import { trackServiceEvent } from '@/lib/service-tracking';
import { IDS, agentNode, breadcrumbNode, faqNode, personNode, soldDatasetNode, websiteNode } from '@/lib/page-schema';
import { services, SITE_URL } from '@/data/services';
import { daysLabel, formatDays, soldProperties, soldPribram, summarizeSold } from '@/data/sold-properties';
import heroPhoto from '@/assets/pribram/svata-hora-letecky.webp';
import squarePhoto from '@/assets/pribram/namesti-tgm.webp';
import viewPhoto from '@/assets/pribram/pohled-na-svatou-horu.webp';
import radekHero from '@/assets/radek-pribram-hero.webp';
import '@/components/services/services.css';

const URL_PATH = '/lokality/pribram';
const URL_FULL = `${BASE_URL}${URL_PATH}`;
const OG_IMAGE = `${BASE_URL}/og/lokalita-pribram.jpg`;
const TITLE = 'Nemovitosti Příbram: ceny, čtvrti a prodej | Radek Větrovský';
const DESCRIPTION = 'Realitní trh v Příbrami očima místního makléře: ceny podle čtvrtí, doprava do Prahy, život ve městě a skutečné prodeje s dobou prodeje. Odhad zdarma.';
const ESTIMATE_HREF = '/odhad-nemovitosti?zdroj=lokalita-pribram#odhad-form';
const PHONE = 'tel:+420721855854';
const UPDATED = '13. října 2026';
const MODIFIED = '2026-10-13';
const SERVED = ['Příbram', 'Dobříš', 'Sedlčany', 'Rožmitál pod Třemšínem', 'Březnice', 'Jince'];
const PLACES = ['Březové Hory', 'Zdaboř', 'Brod', 'Kozičín', 'Lazec', 'Žežice', 'Orlov', 'Zavržice', 'Jerusalem', 'Jesenice', 'Bytíz'];

const inPribram = soldProperties.filter((p) => p.inPribram);
const flats = summarizeSold(inPribram.filter((p) => p.kind === 'byt'));
const byId = (id: number) => soldProperties.find((p) => p.id === id)!;
const recent = [...inPribram].sort((a, b) => b.id - a.id).slice(0, 6);

const contact: ContactContent = {
  id: 'lokalita-pribram',
  name: 'Nemovitosti v Příbrami',
  subject: 'Lokalita Příbram: poptávka ze stránky Nemovitosti v Příbrami',
  primaryHref: ESTIMATE_HREF,
  contactTitle: 'Řekněte mi o své nemovitosti v Příbrami.',
  contactText: 'Napište mi, o jakou nemovitost jde a kde leží. Domluvíme úvodní konzultaci, na které probereme cenu, termín a další postup.',
  messagePlaceholder: 'Například: Prodávám byt 2+1 v Příbrami VII a zajímá mě, za kolik se dá prodat.',
  nextStep: 'Po odeslání se Vám osobně ozvu, probereme nemovitost a domluvíme případnou prohlídku. Odhad je nezávazný a zdarma; rozsah spolupráce i odměnu si ujasníme před zahájením.',
};

const facts = [
  { v: '32 917', l: 'obyvatel k 1. 1. 2026 (ČSÚ)' },
  { v: '52 km', l: 'jihozápadně od Prahy' },
  { v: String(soldPribram.count), l: 'prodejů v Příbrami v mém přehledu' },
  { v: `${formatDays(soldPribram.median)} dne`, l: 'medián doby prodeje v Příbrami' },
];

const districts = [
  {
    name: 'Centrum a Svatá Hora',
    label: 'Příbram I a II',
    text: 'Historické jádro kolem náměstí T. G. Masaryka s gotickým kostelem sv. Jakuba Staršího a nad městem barokní areál Svatá Hora se Svatohorskými schody. Převažují cihlové a smíšené domy. Parkování se v centru řídí systémem parkovacích zón města.',
    sell: 'Kupující u bytů v centru řeší stav domu, dispozici a parkování. Podklady od společenství vlastníků připravte předem.',
    price: '70 000 až 100 000 Kč/m²',
    link: { to: '/blog/cenova-mapa-pribram-2026', label: 'Cenová mapa Příbrami' },
  },
  {
    name: 'Březové Hory',
    label: 'Příbram IV a VI',
    text: 'Hornická čtvrť s Hornickým muzeem Příbram a Ševčinským dolem, kde se každoročně koná Prokopská pouť. Najdete tu byty i rodinné domy.',
    sell: `V mém přehledu se tu dům v Rožmitálské prodal za ${daysLabel(byId(2).days)}, garáž v téže ulici za ${daysLabel(byId(4).days)}.`,
    price: '70 000 až 100 000 Kč/m²',
  },
  {
    name: 'Sídliště',
    label: 'Příbram V (Zdaboř), VII a VIII',
    text: 'Převážně panelová zástavba 70. a 80. let s dobrou občanskou vybaveností a dopravou. Energetická třída domu závisí na zateplení, nezateplené domy bývají ve třídě C až D.',
    sell: `Byty v Příbrami VII se v mém přehledu prodaly za ${daysLabel(byId(3).days)} (tř. Osvobození) a ${daysLabel(byId(1).days)} (nám. 17. listopadu), byt na Zdaboři za ${daysLabel(byId(13).days)}.`,
    price: '60 000 až 90 000 Kč/m²',
  },
  {
    name: 'Novostavby',
    label: 'napříč městem',
    text: 'Aktuálně se ve městě prodává jeden hlavní projekt, Bytové domy Zdaboř s 65 byty v pěti domech u Brdských lesů. Rezidence Obora v centru byla v roce 2026 dokončena a vyprodána.',
    sell: 'Pro prodávající starších bytů jsou novostavby referenční bod, kupující je srovnávají cenou i standardem.',
    price: '130 000 až 150 000 Kč/m²',
    link: { to: '/blog/novostavby-pribram-2026-kde-se-stavi', label: 'Novostavby v Příbrami' },
  },
  {
    name: 'Okrajové části a vesnice',
    label: 'Brod, Kozičín, Lazec, Žežice, Orlov a další',
    text: 'Administrativně patří k Příbrami i Brod, Kozičín, Lazec, Žežice, Orlov, Zavržice, Jerusalem, Jesenice a Bytíz. Převládají rodinné domy se zahradou. V říjnu 2026 město oznámilo dokončení odkanalizování Kozičína v rámci projektu Čistá Litavka.',
    sell: 'U domů se řeší pozemek, přípojky a kanalizace, postup popisuji v článku o prodeji rodinného domu.',
    price: 'domy běžně od cca 3 do 15 mil. Kč',
    link: { to: '/blog/jak-prodat-rodinny-dum-pribram', label: 'Jak prodat rodinný dům' },
  },
];

const priceRows = [
  ['Centrum a Březové Hory (Příbram I až IV a VI)', 'Cihlová i smíšená zástavba, nejvyšší poptávka', '70 000 až 100 000 Kč/m²'],
  ['Sídliště (Příbram V, VII a VIII)', 'Převážně panelová zástavba 70. a 80. let', '60 000 až 90 000 Kč/m²'],
  ['Novostavby (Bytové domy Zdaboř)', 'Nový standard, nízká energetická náročnost', '130 000 až 150 000 Kč/m²'],
  ['Praha (pro srovnání)', 'Hlavní město', 'od 140 000 Kč/m²'],
];

const transport = [
  { icon: Car, title: 'Autem', text: 'Praha je vzdálená asi 52 km. Na dálnici D4 se napojíte východně od města, po ní se dostanete do Prahy i směrem na Milín.' },
  { icon: Bus, title: 'Autobusem', text: 'Příbram obsluhují městské i meziměstské linky. Od 10. prosince 2023 se v městské dopravě uznávají jízdní doklady Pražské integrované dopravy a linky dostaly nová čísla.' },
  { icon: TrainFront, title: 'Vlakem', text: 'Nádraží leží na trati Zdice až Protivín, zastávka Příbram sídliště funguje od roku 2020. Rychlíky linky R26 spojují Příbram s Prahou, Berounem a Českými Budějovicemi.' },
];

const life = [
  { icon: Landmark, title: 'Kultura a tradice', text: 'Svatá Hora, Hornické muzeum Příbram, Divadlo Antonína Dvořáka a od roku 1969 Hudební festival Antonína Dvořáka. Příbramský půlmaraton se koná 18. října 2026 už po jedenácté.' },
  { icon: Mountain, title: 'Příroda a sport', text: 'Brdy začínají necelých 10 km západně od centra, nejvyšší vrchol Tok má 865 m. Ve městě najdete areál Nový rybník, aquapark, zimní stadion a sportovní halu.' },
  { icon: GraduationCap, title: 'Školy a zdraví', text: 'Gymnázium, průmyslová, zdravotnická a obchodní škola, pobočky vysokých škol a Oblastní nemocnice Příbram. Pro rodiny je to zázemí okresního města.' },
  { icon: Briefcase, title: 'Práce', text: 'Mezi významné místní zaměstnavatele patří RAVAK, Kovohutě Příbram a státní podnik DIAMO. Část obyvatel zároveň dojíždí za prací do Prahy.' },
];

const byType = [
  { title: 'Byt v panelovém domě', text: 'Zdržuje nejčastěji potvrzení od společenství vlastníků, výše záloh do fondu oprav a PENB budovy. Příprava trvá déle než samotná inzerce.', to: '/blog/prodej-nemovitosti-pribram-krok-za-krokem#dokumenty', cta: 'Jaké dokumenty připravit' },
  { title: 'Malý byt nebo garsonka', text: 'Cenu ovlivňuje velikost, patro, vlastnictví i to, zda jde o osobní, nebo družstevní formu. Kupují ho i investoři.', to: '/blog/prodej-garsonky-maleho-bytu-pribram-2026', cta: 'Prodej garsonky v Příbrami' },
  { title: 'Rodinný dům a chata', text: `Řeší se pozemek, přípojky, kanalizace a stavební dokumentace. Chata a garáž mají užší okruh zájemců: v mém přehledu se prodaly za ${daysLabel(byId(18).days)} a ${daysLabel(byId(4).days)}.`, to: '/blog/jak-prodat-rodinny-dum-pribram', cta: 'Jak prodat rodinný dům' },
];

const workflow = [
  { title: 'Poznáme nemovitost a Vaše plány', text: 'Probereme důvod prodeje a termín, prohlédnu nemovitost a podklady. Odhad vychází z lokality, stavu a srovnatelných obchodů.' },
  { title: 'Připravím nabídku a marketing', text: 'Fotografie, video, inzerce a příprava prostoru. Před zveřejněním si odsouhlasíme, jak bude nemovitost představena.' },
  { title: 'Povedu prohlídky a jednání', text: 'Komunikuji se zájemci, organizuji prohlídky a porovnáváme nabídky podle ceny, financování a termínů.' },
  { title: 'Koordinuji smlouvy a předání', text: 'Smlouvy a úschovu řeším s právním specialistou, dohlédnu na předání s protokolem a podklady pro přepis energií.' },
];

const reviews = [
  { quote: 'Velká spokojenost s panem Větrovským. Vše proběhlo hladce od A až po Z. Výborná komunikace a na čem jsme se domluvili, to klaplo. Mohu jen doporučit!', author: 'Marcel Novotný' },
  { quote: 'Rádi bychom poděkovali panu Větrovskému za skvělou spolupráci. Byl vždy profesionální, ochotný, spolehlivý a měl lidský přístup.', author: 'Martina Tůmová' },
];

const faqs = [
  { q: 'Kolik stojí byt v Příbrami v roce 2026?', a: 'V centru a na Březových Horách (Příbram I až IV a VI) se podle mé cenové mapy ceny bytů pohybují od 70 000 do 100 000 Kč za m², na sídlištích (Příbram V, VII a VIII) od 60 000 do 90 000 Kč za m² a novostavby (aktuálně Bytové domy Zdaboř) stojí zhruba 130 000 až 150 000 Kč za m². Větší vliv než čtvrť má stav bytu, jeho velikost a to, zda jde o novostavbu.' },
  { q: 'Jak dlouho trvá prodej nemovitosti v Příbrami?', a: `U ${soldPribram.count} nemovitostí prodaných přímo v Příbrami, které uvádím v přehledu Prodané nemovitosti, byl medián doby prodeje ${formatDays(soldPribram.median)} dne a průměr ${formatDays(soldPribram.average)} dne. U bytů (${flats.count} prodejů) byl medián ${formatDays(flats.median)} dne. Vklad do katastru je navíc samostatný krok, který podle ČÚZK trvá průměrně 22 dnů.` },
  { q: 'Která část Příbrami je nejžádanější?', a: 'Nejvyšší ceny podle cenové mapy dosahují centrum a Březové Hory (Příbram I až IV a VI) a novostavby. Sídliště jsou cenově dostupnější a mají dobrou občanskou vybavenost a dopravu. Co je nejlepší, záleží na Vašich prioritách: parkování, klid, dojezd do Prahy nebo velikost zahrady.' },
  { q: 'Jak daleko je Příbram od Prahy a vyplatí se dojíždět?', a: 'Příbram leží asi 52 km jihozápadně od Prahy. Dojíždět se dá autem po dálnici D4, autobusem v systému Pražské integrované dopravy i vlakem. Aktuální spojení si vždy ověřte v jízdním řádu na pid.cz nebo idos.cz a při výběru bydlení započítejte i cestu do práce.' },
  { q: 'Působíte i v okolí Příbrami?', a: 'Ano. Kromě Příbrami pomáhám s prodejem a koupí v Dobříši, Sedlčanech, Rožmitále pod Třemšínem, Březnici, Jincích a okolních obcích. V přehledu prodaných nemovitostí najdete například domy v Bohutíně a Jelencích nebo chatu v Kamýku nad Vltavou.' },
  { q: 'Kolik stojí odhad ceny nemovitosti v Příbrami?', a: 'Tržní odhad je zdarma a nezávazný. Vyplníte krátký formulář, osobně se Vám ozvu, nemovitost prohlédnu a vysvětlím, z čeho navržená cena vychází. Rozsah spolupráce a odměnu si ujasníme před zahájením prodeje.' },
];

const photoCredits = [
  { what: 'Letecký pohled na Svatou Horu', author: 'Jirka Jiroušek', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', href: 'https://commons.wikimedia.org/wiki/File:Svat%C3%A1_Hora_u_P%C5%99%C3%ADbrami_-_leteck%C3%BD_pohled.jpg', note: ', upraveno (oříznutí a ztmavení)' },
  { what: 'Náměstí T. G. Masaryka', author: 'Андрей Романенко', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', href: 'https://commons.wikimedia.org/wiki/File:N%C3%A1m%C4%9Bst%C3%AD_T._G._Masaryka_(P%C5%99%C3%ADbram).jpg', note: ', zmenšeno' },
  { what: 'Pohled na Svatou Horu', author: 'Hadonos', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', href: 'https://commons.wikimedia.org/wiki/File:Poutn%C3%AD_m%C3%ADsto_Svat%C3%A1_Hora_v_P%C5%99%C3%ADbrami_03.JPG', note: ', zmenšeno' },
];

const sources = [
  { label: 'ČSÚ: Počet obyvatel v obcích Středočeského kraje k 1. 1. 2026', href: 'https://csu.gov.cz/stc/pocet-obyvatel-v-obcich-stredoceskeho-kraje-k-1-1-2026' },
  { label: 'Město Příbram: oficiální web (aktuality, parkovací zóny, územní plán)', href: 'https://www.pribram.eu/' },
  { label: 'Pražská integrovaná doprava: Trvalé změny PID od 10. 12. 2023', href: 'https://pid.cz/trvale-zmeny-pid-od-10-12-2023/' },
  { label: 'ČÚZK: statistika vkladů, průměrná doba provedení vkladu', href: 'https://cuzk.gov.cz/Katastr-nemovitosti/Zapisy-do-KN/Podani-navrhu-na-vklad-v-elektronicke-podobe.aspx' },
  { label: 'Wikipedie: Příbram (rozloha, nadmořská výška, členění města, doprava, kultura)', href: 'https://cs.wikipedia.org/wiki/P%C5%99%C3%ADbram' },
];

function Heading({ id, kicker, children }: { id: string; kicker?: string; children: ReactNode }) {
  return (
    <div>
      {kicker && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary">{kicker}</p>}
      <h2 id={id} className="service-heading" style={{ hyphens: 'manual', fontSize: 'clamp(1.4rem, 4.6vw, 2.5rem)' }}>{children}</h2>
    </div>
  );
}

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary">{children}</Link>;
}

export default function LokalitaPribram() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanupMeta = setPageMeta(TITLE, DESCRIPTION, URL_PATH, OG_IMAGE, 'website', 'Radek Větrovský před leteckým pohledem na Svatou Horu v Příbrami');
    const homeSchema = document.getElementById('site-schema');
    const previousType = homeSchema?.getAttribute('type');
    homeSchema?.setAttribute('type', 'application/json');
    const cleanupGraph = injectJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        agentNode(SERVED, {
          knowsAbout: ['Nemovitosti v Příbrami', 'Ceny bytů a domů v Příbrami', 'Prodej nemovitostí v Příbrami', 'Koupě nemovitosti v Příbrami'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog', name: 'Realitní služby v Příbrami',
            itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${s.name} v Příbrami`, url: `${SITE_URL}${s.path}`, provider: { '@id': IDS.business } } })),
          },
        }),
        personNode(),
        websiteNode(),
        {
          '@type': 'WebPage', '@id': `${URL_FULL}#webpage`, url: URL_FULL, name: TITLE, description: DESCRIPTION, inLanguage: 'cs-CZ',
          datePublished: MODIFIED, dateModified: MODIFIED, lastReviewed: MODIFIED, reviewedBy: { '@id': IDS.person }, author: { '@id': IDS.person },
          isPartOf: { '@id': IDS.website }, primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
          about: { '@id': `${URL_FULL}#mesto` }, mainEntity: { '@id': `${URL_FULL}#mesto` },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#v-kostce-text'] },
          breadcrumb: { '@id': `${URL_FULL}#breadcrumb` }, publisher: { '@id': IDS.business },
        },
        {
          '@type': 'City', '@id': `${URL_FULL}#mesto`, name: 'Příbram', url: 'https://www.pribram.eu/',
          description: 'Okresní město ve Středočeském kraji, asi 52 km jihozápadně od Prahy na úpatí Brd.',
          sameAs: 'https://cs.wikipedia.org/wiki/P%C5%99%C3%ADbram',
          geo: { '@type': 'GeoCoordinates', latitude: 49.69, longitude: 14.0106, elevation: 502 },
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Středočeský kraj' },
          containsPlace: PLACES.map((name) => ({ '@type': 'Place', name })),
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Počet obyvatel', value: 32917, unitText: 'obyvatel', description: 'Stav k 1. 1. 2026, zdroj ČSÚ' },
            { '@type': 'PropertyValue', name: 'Rozloha', value: 36.1, unitText: 'km²' },
          ],
        },
        soldDatasetNode({
          id: `${URL_FULL}#dataset`,
          name: 'Doba prodeje nemovitostí Radka Větrovského přímo v Příbrami',
          description: `Doba prodeje ve dnech u ${soldPribram.count} nemovitostí prodaných přímo ve městě Příbram a uvedených v přehledu Prodané nemovitosti. Medián ${formatDays(soldPribram.median)} dne, průměr ${formatDays(soldPribram.average)} dne.`,
          areaName: 'Příbram', summary: soldPribram, modified: MODIFIED,
        }),
        breadcrumbNode(URL_FULL, [
          { name: 'Domů', item: `${BASE_URL}/` },
          { name: 'Lokality', item: `${BASE_URL}/#lokality` },
          { name: 'Příbram', item: URL_FULL },
        ]),
        faqNode(URL_FULL, faqs),
      ],
    });
    return () => {
      cleanupMeta();
      cleanupGraph();
      if (previousType) homeSchema?.setAttribute('type', previousType);
    };
  }, []);

  useEffect(() => {
    const trackPhoneClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href^="tel:"]');
      if (!link?.closest('.service-page')) return;
      const placement = link.closest('.service-mobile-contact') ? 'mobile_bar' : link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('#konzultace') ? 'contact' : 'page';
      trackServiceEvent('service_phone_click', 'lokalita-pribram', placement);
    };
    document.addEventListener('click', trackPhoneClick);
    return () => document.removeEventListener('click', trackPhoneClick);
  }, []);

  const trackEstimate = (placement: string) => () => trackServiceEvent('service_cta_click', 'lokalita-pribram', placement);

  return (
    <div className="service-page min-h-screen bg-background">
      <a href="#lokalita-main" className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-xl focus:bg-background focus:p-4">Přejít k obsahu</a>
      <Header staticContent serviceCta={{ href: ESTIMATE_HREF, label: 'Odhad zdarma', onClick: trackEstimate('header') }} />
      <main id="lokalita-main">
        {/* Hero */}
        <section className="service-hero relative isolate overflow-hidden bg-primary pt-28 text-white sm:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <img src={heroPhoto} alt="" width={1200} height={800} {...{ fetchpriority: 'high' }} className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-primary/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
          </div>
          <div className="service-container grid items-end gap-2 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 pb-6 lg:col-span-7 lg:pb-20">
              <nav aria-label="Drobečková navigace" className="mb-8 text-xs text-white/75 sm:mb-10 sm:text-sm">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li><Link className="hover:text-white hover:underline" to="/">Domů</Link></li><li aria-hidden="true">/</li>
                  <li><Link className="hover:text-white hover:underline" to="/#lokality">Lokality</Link></li><li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white">Příbram</li>
                </ol>
              </nav>
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/75 sm:text-xs sm:tracking-[0.2em]"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />Lokalita Příbram · RE/MAX Power 2</p>
              <h1 className="font-syne text-[1.8rem] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ hyphens: 'manual' }}>Nemovitosti <span className="block">v Příbrami</span></h1>
              <p className="mt-3 font-arvo text-xl leading-snug tracking-[-0.02em] text-white/85 sm:text-2xl">prodej, koupě a odhad s místním makléřem</p>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">Prodáváte nebo kupujete byt, dům či chatu v Příbrami? Jsem Radek Větrovský z RE/MAX Power 2. Znám jednotlivé čtvrti města, jejich zástavbu i to, na co se kupující ptají při prohlídkách. Tady najdete, jak vypadá místní trh, kolik se platí a jak při prodeji postupuji.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link to={ESTIMATE_HREF} onClick={trackEstimate('hero')} className="service-button">Zjistit cenu nemovitosti v Příbrami<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>
                <a className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:underline" href={PHONE}><Phone className="h-4 w-4" aria-hidden="true" />721 855 854</a>
              </div>
              <p className="mt-3 text-xs text-white/75">Tržní odhad zdarma a nezávazně.</p>
            </div>
            <div className="relative flex min-w-0 items-end justify-center lg:col-span-5 lg:justify-end">
              <div aria-hidden="true" className="absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_65%)] blur-2xl" />
              <img src={radekHero} alt="Radek Větrovský, realitní makléř RE/MAX Příbram, se založenými rukama" width={521} height={1200} className="relative h-[21rem] w-auto object-contain object-bottom drop-shadow-[0_0_18px_rgba(255,255,255,0.18)] sm:h-[26rem] lg:h-[34rem]" />
            </div>
          </div>
        </section>

        {/* Čísla */}
        <section aria-label="Příbram v číslech" className="border-b border-border bg-muted/50">
          <dl className="service-container grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.l} className="flex flex-col-reverse justify-end px-2 lg:border-l lg:border-border lg:px-6 lg:first:border-l-0">
                <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{f.l}</dt>
                <dd className="font-syne text-2xl font-extrabold text-primary sm:text-3xl">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Příbram v kostce */}
        <section className="service-section" aria-labelledby="v-kostce">
          <div className="service-container grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Heading id="v-kostce" kicker="Příbram v kostce">Co je Příbram a jaký je tamní trh s bydlením?</Heading>
              <p id="v-kostce-text" className="mt-6 text-base leading-[1.75] text-foreground/85 sm:text-lg">Příbram je okresní město ve Středočeském kraji, asi 52 km jihozápadně od Prahy na úpatí Brd. K 1. 1. 2026 v ní podle ČSÚ žilo 32 917 obyvatel, o 144 víc než o rok dřív. Rozkládá se na 36,1 km² ve výšce kolem 502 m n. m. a skládá se z osmnácti částí: od historického centra se Svatou Horou přes hornické Březové Hory a sídliště po vesnické části jako Brod, Kozičín nebo Lazec. Trh s bydlením drží dojezd do Prahy po dálnici D4 a po železnici, vlastní zaměstnavatelé a zázemí okresního města: nemocnice, střední školy, divadlo i sportoviště. Byty ve starší zástavbě stojí zhruba 60 000 až 100 000 Kč za m², novostavby 130 000 až 150 000 Kč za m². Správně oceněné nemovitosti se tu proto prodávají rychle: v mém přehledu {soldPribram.count} nemovitostí v Příbrami s mediánem doby prodeje {formatDays(soldPribram.median)} dne.</p>
              <p className="mt-4 text-base leading-[1.75] text-foreground/85 sm:text-lg">Počet obyvatel klesal po roce 1991 (36 898 obyvatel podle sčítání) s útlumem těžby, mezi 1. 1. 2025 a 1. 1. 2026 podle ČSÚ vzrostl z 32 773 na 32 917. Příbram tak není městem v úpadku, ale městem, které si po konci hornické éry hledá novou rovnováhu mezi bydlením pro místní a dojížděním do Prahy.</p>
              <p className="mt-4 text-sm text-muted-foreground">Autor: <Link to="/radek-vetrovsky-realitni-makler-pribram" className="font-bold text-foreground hover:underline">Radek Větrovský</Link>, RE/MAX Power 2 · aktualizováno <time dateTime={MODIFIED}>{UPDATED}</time></p>
            </div>
            <figure className="min-w-0 lg:col-span-5">
              <img src={squarePhoto} alt="Náměstí T. G. Masaryka v centru Příbrami s historickými měšťanskými domy" width={1280} height={964} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-3xl" />
              <figcaption className="mt-2 text-xs text-muted-foreground">Náměstí T. G. Masaryka. Foto: Андрей Романенко, CC BY-SA 4.0.</figcaption>
            </figure>
          </div>
        </section>

        {/* Čtvrti */}
        <section className="service-section bg-muted" id="ctvrti" aria-labelledby="ctvrti-heading">
          <div className="service-container">
            <div className="service-section-intro">
              <Heading id="ctvrti-heading" kicker="Čtvrti Příbrami">Jaké jsou čtvrti Příbrami a čím se liší?</Heading>
              <p className="service-lead">Příbram se dělí na pět typů zástavby: centrum, hornické Březové Hory, sídliště, novostavby a okrajové části s rodinnými domy. Kupující se rozhodují podle zástavby, parkování a dojezdu. U každé části uvádím orientační cenu z cenové mapy a to, co se při prodeji v praxi řeší.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {districts.map((d) => (
                <article key={d.name} className="flex flex-col rounded-2xl border border-border bg-background p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary">{d.label}</p>
                  <h3 className="mt-2 font-syne text-xl font-bold leading-snug">{d.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{d.text}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80"><strong className="text-foreground">Při prodeji:</strong> {d.sell}</p>
                  <p className="mt-auto pt-4 text-sm font-bold text-primary">{d.price}</p>
                  {d.link && <Link to={d.link.to} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-secondary hover:underline">{d.link.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>}
                </article>
              ))}
              <figure className="min-w-0 overflow-hidden rounded-2xl md:col-span-2 lg:col-span-1">
                <img src={viewPhoto} alt="Pohled přes střechy domů na Svatou Horu nad Příbramí" width={1280} height={960} loading="lazy" className="h-full min-h-56 w-full object-cover" />
                <figcaption className="sr-only">Pohled na Svatou Horu. Foto: Hadonos, CC BY-SA 3.0.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Ceny */}
        <section className="service-section" id="ceny" aria-labelledby="ceny-heading">
          <div className="service-container grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Heading id="ceny-heading" kicker="Ceny nemovitostí">Kolik stojí nemovitosti v Příbrami?</Heading>
              <p className="service-lead mt-6">Byty v Příbrami stojí v roce 2026 zhruba 60 000 až 100 000 Kč za m² ve starší zástavbě a 130 000 až 150 000 Kč za m² v novostavbách, tedy výrazně méně než v Praze, kde ceny začínají na 140 000 Kč za m². Rozdíl mezi čtvrtěmi není tak velký jako rozdíl mezi bytem po rekonstrukci a bytem v původním stavu nebo mezi starším bytem a novostavbou.</p>
              <p className="mt-4 leading-relaxed text-foreground/80">Pronájem bytu 2+1 se v Příbrami pohybuje zhruba od 14 000 do 18 000 Kč měsíčně včetně poplatků, panelový byt na sídlišti od 12 000 do 15 000 Kč.</p>
              <p className="mt-4 leading-relaxed text-foreground/80">Podrobný přehled s cenami podle dispozice a vývojem od roku 2022 najdete v <TextLink to="/blog/cenova-mapa-pribram-2026">cenové mapě Příbrami 2026</TextLink>.</p>
            </div>
            <div className="min-w-0 overflow-x-auto rounded-2xl border border-border lg:col-span-7">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="border-b border-border bg-muted px-5 py-3 text-left font-syne text-sm font-bold">Orientační ceny bytů, cenová mapa k červnu 2026</caption>
                <thead><tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground"><th scope="col" className="px-5 py-3 font-bold">Lokalita</th><th scope="col" className="px-5 py-3 font-bold">Zástavba</th><th scope="col" className="px-5 py-3 font-bold">Cena</th></tr></thead>
                <tbody>
                  {priceRows.map((r) => <tr key={r[0]} className="border-b border-border align-top last:border-0">{r.map((c, i) => <td key={c} className={`px-5 py-3.5 leading-relaxed ${i === 0 ? 'font-semibold' : i === 2 ? 'whitespace-nowrap font-bold text-primary' : 'text-foreground/80'}`}>{c}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Doprava */}
        <section className="service-section bg-muted/50 border-y border-border" id="doprava" aria-labelledby="doprava-heading">
          <div className="service-container">
            <div className="service-section-intro">
              <Heading id="doprava-heading" kicker="Doprava a dojezd">Jak se z Příbrami dostanete do Prahy?</Heading>
              <p className="service-lead">Do Prahy se z Příbrami dostanete autem po dálnici D4, autobusem v systému Pražské integrované dopravy i vlakem, Praha je vzdálená asi 52 km. Dojezd je jedním z hlavních důvodů, proč lidé z Příbrami neodcházejí a proč sem přicházejí noví. Aktuální spojení ověřte vždy v jízdním řádu na <a className="font-semibold text-secondary underline underline-offset-4" href="https://pid.cz" target="_blank" rel="noopener noreferrer">pid.cz</a> nebo idos.cz.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {transport.map((t) => (
                <article key={t.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary"><t.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <h3 className="mt-5 font-syne text-xl font-bold">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Život */}
        <section className="service-section" id="zivot" aria-labelledby="zivot-heading">
          <div className="service-container">
            <div className="service-section-intro">
              <Heading id="zivot-heading" kicker="Život ve městě">Jaké je bydlení v Příbrami?</Heading>
              <p className="service-lead">Příbram nabízí zázemí okresního města: školy, nemocnici, kulturu a sport a v dosahu Brdy. Kupující se při prohlídce neptají jen na byt, zajímá je i to, co je kolem: školy, práce, sport a místo, kam se dá o víkendu vyrazit.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {life.map((l) => (
                <article key={l.title} className="border-t border-border pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary"><l.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <h3 className="mt-5 font-syne text-lg font-bold">{l.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{l.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Prodáno v Příbrami */}
        <section className="service-section bg-muted" id="prodano" aria-labelledby="prodano-heading">
          <div className="service-container">
            <div className="service-section-intro">
              <Heading id="prodano-heading" kicker="Původní data z mých prodejů">Jak rychle se v Příbrami prodávají nemovitosti?</Heading>
              <p className="service-lead">Medián doby prodeje je u mých {soldPribram.count} prodejů přímo v Příbrami {formatDays(soldPribram.median)} dne a průměr {formatDays(soldPribram.average)} dne, u {flats.count} bytů medián {formatDays(flats.median)} dne. Dobu prodeje uvádím u každé nemovitosti v přehledu. Vzorek je malý a každá nemovitost jiná, berte to jako orientaci, ne slib.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => (
                <Link key={p.id} to={`/prodano#nemovitost-${p.id}`} className="group overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="relative overflow-hidden">
                    <img src={p.image} alt={`${p.title}, ${p.location}, ${p.size}, prodáno za ${daysLabel(p.days)}`} width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1.5 text-xs font-bold uppercase">Prodáno za {daysLabel(p.days)}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-syne text-lg font-bold group-hover:text-secondary">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.location} · {p.size}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/prodano" className="mt-8 inline-flex min-h-11 items-center gap-3 font-bold text-primary underline-offset-4 hover:underline">Všechny prodané nemovitosti<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </section>

        {/* Postup a typy */}
        <section className="service-section" id="postup" aria-labelledby="postup-heading">
          <div className="service-container grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Heading id="postup-heading" kicker="Jak v Příbrami prodávám">Jak probíhá prodej v Příbrami podle typu nemovitosti?</Heading>
              <p className="service-lead mt-6">Základní postup je stejný, rozdíly jsou v tom, co se zdrží. Úplný návod krok za krokem najdete v článku <TextLink to="/blog/prodej-nemovitosti-pribram-krok-za-krokem">Prodej nemovitosti v Příbrami krok za krokem</TextLink>, nabídku služeb na stránce <TextLink to="/sluzby/prodej-nemovitosti-pribram">Prodej nemovitostí</TextLink>.</p>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {workflow.map((s, i) => (
                  <li key={s.title} className="flex gap-5 py-5">
                    <span className="pt-0.5 font-syne text-lg font-bold text-secondary" aria-hidden="true">0{i + 1}</span>
                    <div><h3 className="font-syne text-lg font-bold leading-snug">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/80">{s.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-5 lg:col-span-7">
              {byType.map((t) => (
                <article key={t.title} className="rounded-2xl border border-border p-6 sm:p-7">
                  <h3 className="font-syne text-xl font-bold leading-snug">{t.title}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/80">{t.text}</p>
                  <Link to={t.to} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">{t.cta}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reference */}
        <section className="service-section border-y border-border bg-muted/50" aria-labelledby="reference-heading">
          <div className="service-container">
            <Heading id="reference-heading" kicker="Zkušenost klientů · Google recenze">Co říkají lidé, kterým jsem prodával</Heading>
            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {reviews.map((r) => (
                <blockquote key={r.author} className="rounded-2xl border border-border bg-background p-6 sm:p-8">
                  <p className="font-arvo text-base leading-relaxed sm:text-lg">„{r.quote}“</p>
                  <footer className="mt-4 text-sm font-bold">{r.author}</footer>
                </blockquote>
              ))}
            </div>
            <a href="https://maps.app.goo.gl/vNQZSSixjfp8rZCu9" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">Všechny recenze na Google<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </section>

        {/* FAQ */}
        <section className="service-section" id="faq" aria-labelledby="faq-heading">
          <div className="service-container grid items-start gap-9 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Heading id="faq-heading">Na co se často ptáte.</Heading>
              <p className="service-lead mt-6">Nemovitosti v Příbrami: ceny, doba prodeje a dojezd.</p>
              <a href="#konzultace" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-secondary hover:underline">Mám jinou otázku <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
            <div className="divide-y divide-border border-y border-border lg:col-span-7">
              {faqs.map((f, i) => (
                <details key={f.q} className="service-faq group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-syne text-base font-bold sm:text-lg"><h3 className="font-syne text-inherit font-bold leading-snug">{f.q}</h3><ChevronDown className="h-5 w-5 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                  <p className="max-w-prose pb-6 pr-7 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ServiceContact service={contact} />

        {/* Související */}
        <section className="service-section bg-muted" aria-labelledby="dalsi-heading">
          <div className="service-container">
            <h2 id="dalsi-heading" className="service-heading max-w-2xl">Čtěte dál.</h2>
            <div className="mt-9 grid gap-7 md:grid-cols-3">
              {[
                { title: 'Prodej nemovitosti krok za krokem', text: 'Devět kroků od ceny po předání klíčů s vlastními daty.', href: '/blog/prodej-nemovitosti-pribram-krok-za-krokem' },
                { title: 'Cenová mapa Příbrami 2026', text: 'Ceny bytů a domů podle čtvrtí, vývoj a dispozice.', href: '/blog/cenova-mapa-pribram-2026' },
                { title: 'Novostavby v Příbrami', text: 'Kde se staví a jak vybrat byt v nové výstavbě.', href: '/blog/novostavby-pribram-2026-kde-se-stavi' },
              ].map((a) => (
                <Link key={a.href} to={a.href} className="group border-t border-border py-6">
                  <h3 className="flex items-start justify-between gap-5 font-syne text-xl font-bold group-hover:text-secondary">{a.title}<ArrowUpRight className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" /></h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{a.text}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
              <span className="text-sm text-muted-foreground">Služby:</span>
              <Link to="/sluzby/prodej-nemovitosti-pribram" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-secondary">Prodej<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/sluzby/koupe-nemovitosti-pribram" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-secondary">Koupě<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/sluzby/pronajem-nemovitosti-pribram" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-secondary">Pronájem<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Kromě Příbrami působím v Dobříši, Sedlčanech, Rožmitále pod Třemšínem, Březnici, Jincích a okolních obcích.</p>
          </div>
        </section>

        {/* Zdroje */}
        <section className="service-section pt-0 sm:pt-0 md:pt-0 lg:pt-0 bg-muted" aria-labelledby="zdroje-heading">
          <div className="service-container border-t border-border pt-10">
            <h2 id="zdroje-heading" className="font-syne text-lg font-bold">Zdroje a ověření, stav k {UPDATED}</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {sources.map((s) => <li key={s.href}><a className="font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 hover:decoration-secondary" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              <li>Doby prodeje a ceny pronájmu: <TextLink to="/prodano">přehled prodaných nemovitostí</TextLink> a <TextLink to="/blog/cenova-mapa-pribram-2026">cenová mapa Příbram 2026</TextLink>.</li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Fotografie: {photoCredits.map((c, i) => (
              <span key={c.href}>{i > 0 && '; '}<a className="underline" href={c.href} target="_blank" rel="noopener noreferrer">{c.what}</a>, {c.author}, <a className="underline" href={c.licenseUrl} target="_blank" rel="noopener noreferrer">{c.license}</a>{c.note}</span>
            ))}. Ceny jsou orientační, konkrétní hodnotu nemovitosti určí až odhad. Stránka má informativní charakter.</p>
          </div>
        </section>
      </main>
      <Footer staticContent />
      <MobileContactBar href={ESTIMATE_HREF} label="Odhad zdarma" onClick={trackEstimate('mobile_bar')} />
    </div>
  );
}
