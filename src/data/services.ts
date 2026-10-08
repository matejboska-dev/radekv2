import saleImage from '@/assets/service-koupe.webp';
import rentalImage from '@/assets/service-pronajem.webp';
import purchaseImage from '@/assets/service-prodej.webp';

export type ServiceId = 'prodej' | 'pronajem' | 'koupe';
export type ServiceContent = {
  id: ServiceId;
  number: string;
  label: string;
  name: string;
  path: string;
  title: string;
  description: string;
  promise: string;
  intro: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  primaryLabel: string;
  primaryHref: string;
  primaryNote: string;
  benefits: [string, string, string];
  overviewTitle: string;
  overview: string;
  features: { title: string; text: string }[];
  processTitle: string;
  processIntro: string;
  steps: { title: string; text: string }[];
  detailTitle: string;
  detailIntro: string;
  checks: { title: string; text: string }[];
  localText: string;
  faqs: { q: string; a: string }[];
  articles: { title: string; text: string; href: string }[];
  contactTitle: string;
  contactText: string;
  messagePlaceholder: string;
  nextStep: string;
  proof: { quote: string; author: string; context: string };
};

export const serviceContent: Record<ServiceId, ServiceContent> = {
  prodej: {
    id: 'prodej', number: '01', label: 'Prodej', name: 'Prodej nemovitostí',
    path: '/sluzby/prodej-nemovitosti-pribram',
    title: 'Prodej nemovitostí Příbram | Radek Větrovský',
    description: 'Získejte odhad ceny zdarma. Radek Větrovský zajistí prodej Vaší nemovitosti v Příbrami od profesionální prezentace přes prohlídky až po předání klíčů.',
    promise: 'Dobrý prodej začíná dobrým plánem.',
    intro: 'Prodáváte byt, dům nebo pozemek v Příbrami? Jsem Radek Větrovský z RE/MAX Power 2. Připravím cenovou strategii, profesionální prezentaci i prohlídky a provedu Vás vyjednáváním, smlouvami a předáním nemovitosti.',
    image: saleImage, imageAlt: 'Radek Větrovský při setkání s párem před domem', imagePosition: '70% center',
    primaryLabel: 'Zjistit cenu nemovitosti', primaryHref: '/odhad-nemovitosti?zdroj=sluzba-prodej#odhad-form',
    primaryNote: 'Tržní odhad zdarma a nezávazně.',
    benefits: ['Profesionální fotografie', 'Virtuální prohlídky', 'Inzerce na top portálech'],
    overviewTitle: 'Vaše nemovitost. Promyšlená prezentace.',
    overview: 'Kompletní servis při prodeji Vaší nemovitosti včetně profesionálního marketingu, videoprohlídek a home stagingu. Rozsah přípravy vybereme podle typu nemovitosti a lidí, které má nabídka oslovit.',
    features: [
      { title: 'Profesionální fotografie', text: 'Dobré fotografie začínají přípravou prostoru. Projdeme, co uklidit, upravit nebo doplnit, aby vyniklo světlo, dispozice a možnosti bydlení. Home staging pomůže zájemcům představit si, jak mohou nemovitost využít. Prezentace má ukázat její přednosti a současně odpovídat skutečnému stavu, který lidé uvidí na prohlídce.' },
      { title: 'Virtuální prohlídky', text: 'Video a virtuální prohlídka doplní fotografie o souvislosti: jak na sebe navazují místnosti, kde je vstup nebo jak působí zahrada. Podle nemovitosti zvolíme vhodný formát včetně 3D prohlídky. Zájemci získají lepší představu ještě před osobní návštěvou a mohou si nabídku v klidu projít s rodinou.' },
      { title: 'Inzerce na top portálech', text: 'Připravím srozumitelný inzerát s podstatnými parametry, fotografiemi a popisem lokality. Prezentaci propojuji s realitními portály, sociálními sítěmi a vlastní databází zájemců. Vyhodnocuji odezvu a zpětnou vazbu z prohlídek. Pokud nabídka potřebuje změnu, probereme konkrétní úpravu prezentace nebo cenové strategie.' },
    ],
    processTitle: 'Od prvního odhadu po předání klíčů.',
    processIntro: 'V každé fázi víte, co se právě řeší, co potřebuji od Vás a jaký bude další krok. Důležitá rozhodnutí děláme společně.',
    steps: [
      { title: 'Poznáme nemovitost a Vaše plány', text: 'Probereme důvod prodeje, časové možnosti a návaznost na další bydlení. Prohlédnu nemovitost a potřebné podklady. Odhad vychází z lokality, stavu a srovnatelných obchodů, nikoli jen z průměru nabídkových cen.' },
      { title: 'Připravím nabídku a marketing', text: 'Domluvíme rozsah služeb, odměnu a prodejní strategii. Následuje příprava prostoru, fotografie, video a inzerce. Před zveřejněním si odsouhlasíme, jak bude nemovitost představena a které informace zájemci dostanou.' },
      { title: 'Povedu prohlídky a jednání', text: 'Zajišťuji komunikaci se zájemci, organizaci prohlídek i vyjednávání. Nabídky porovnáváme podle ceny, financování, termínů a dalších podmínek. Získáte podklady pro rozhodnutí, kterému zájemci dát přednost.' },
      { title: 'Koordinuji smlouvy a předání', text: 'Navazující smluvní dokumentaci a úschovu řešíme s právním specialistou. Dohlédnu na návaznost dohodnutých kroků a předání s protokolem, stavy měřidel a klíči. Součástí koordinace jsou i podklady pro přepis energií.' },
    ],
    detailTitle: 'Co ovlivní cenu Vaší nemovitosti?',
    detailIntro: 'Dva podobně velké byty ve stejné ulici mohou mít odlišnou hodnotu. Při odhadu proto posuzuji nemovitost jako celek a vysvětlím Vám, z čeho navržená cena vychází.',
    checks: [
      { title: 'Stav a možnosti využití', text: 'Dispozice, rekonstrukce, světlo, patro, výtah, balkon nebo zahrada. U domu také pozemek, přístup a stav hlavních konstrukcí. Zohledníme, jaké úpravy mohou kupující očekávat a co už je připravené k bydlení.' },
      { title: 'Lokalita a skutečná poptávka', text: 'Dostupnost služeb, dopravy, parkování i charakter okolí. Porovnávám relevantní nemovitosti a jejich situaci na trhu. Cena z inzerátu je nabídka prodávajícího; při odhadu je potřeba odlišit ji od dosažené prodejní ceny.' },
      { title: 'Dokumenty a termíny', text: 'Vlastnické vztahy, dostupné podklady, způsob financování zájemce a požadované předání. Pokud zároveň kupujete jiné bydlení, připravíme návaznost obou transakcí. Jasné podmínky usnadní jednání a omezí zbytečná překvapení.' },
    ],
    localText: 'Pomáhám prodávat byty v centru Příbrami, na Březových Horách, na Zdaboři i v Příbrami VII a VIII. U domů a pozemků řeším také dostupnost do města, přístup k nemovitosti a charakter okolní zástavby. Působím rovněž v Dobříši, Sedlčanech, Rožmitále pod Třemšínem, Březnici, Sedlci-Prčici a okolních obcích.',
    faqs: [
      { q: 'Jak dlouho bude prodej trvat?', a: 'Termín závisí na ceně, stavu, lokalitě, poptávce a financování kupujícího. Rozlišujeme dobu hledání zájemce a následné dokončení obchodu. Po prohlídce nemovitosti probereme realistický postup a Vaše termíny. Konkrétní datum prodeje bez znalosti nemovitosti slíbit nelze.' },
      { q: 'Kolik stojí zprostředkování prodeje?', a: 'Odměnu a její splatnost si odsouhlasíme před zahájením spolupráce podle konkrétní nemovitosti a rozsahu služeb. Předem budete vědět, co je zahrnuto a jak se řeší případné další náklady. Úvodním krokem může být bezplatný tržní odhad.' },
      { q: 'Co si připravit na první schůzku?', a: 'Stačí adresa, základní informace o nemovitosti a Vaše představa o prodeji. Pokud máte půdorys, dokumenty k rekonstrukci nebo přehled provozních nákladů, vezměte je s sebou. Chybějící podklady společně projdeme a domluvíme jejich doplnění.' },
      { q: 'Musím před prodejem rekonstruovat?', a: 'Rozsáhlá rekonstrukce nemusí být vhodná pro každou nemovitost. Nejprve posoudíme stav a pravděpodobnou cílovou skupinu. Často dává smysl začít úklidem, drobnými opravami a přípravou pro focení. Každou větší investici probereme předem v souvislosti s prodejní strategií.' },
      { q: 'Pomůžete i s prodejem a koupí navazujícího bydlení?', a: 'Ano. Společně probereme, kdy potřebujete prodat, kdy se můžete stěhovat a jak do sebe oba obchody zapadají. Podle situace navážeme také službou zastoupení při koupi. Termíny, financování a předání je vhodné řešit ještě před zveřejněním nabídky.' },
    ],
    articles: [
      { title: 'Jak prodat rodinný dům', text: 'Příprava, prezentace a postup prodeje na Příbramsku.', href: '/blog/jak-prodat-rodinny-dum-pribram' },
      { title: 'Jak správně ocenit nemovitost', text: 'Co porovnávat a proč nestačí cena sousedního inzerátu.', href: '/blog/jak-spravne-ocenit-nemovitost' },
      { title: 'Rezervace a úschova kupní ceny', text: 'Souvislosti mezi dohodou, smlouvami a dokončením obchodu.', href: '/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
    ],
    contactTitle: 'Začněme cenou Vaší nemovitosti.',
    contactText: 'Získejte nezávazný tržní odhad zdarma. Pokud nejprve potřebujete probrat svou situaci, napište mi nebo zavolejte. Domluvíme se na dalším kroku.',
    messagePlaceholder: 'Například: Prodávám byt 3+1 v Příbrami a potřebuji navázat na koupi domu.',
    nextStep: 'Po odeslání se Vám osobně ozvu, probereme nemovitost a domluvíme případnou prohlídku. Odhad je nezávazný a zdarma; rozsah prodeje, odměnu i další náklady si ujasníme před zahájením spolupráce.',
    proof: { quote: 'Velmi oceňuji profesionální komunikaci, rychlost a exkluzivně připravenou prezentaci nemovitosti. Pan Větrovský nás pravidelně informoval o vývoji obchodu.', author: 'Jana Anderson', context: 'Prodej rodinného domu' },
  },
  pronajem: {
    id: 'pronajem', number: '02', label: 'Pronájem', name: 'Pronájem nemovitostí',
    path: '/sluzby/pronajem-nemovitosti-pribram',
    title: 'Pronájem nemovitostí Příbram | Radek Větrovský',
    description: 'Svěřte hledání nájemníka Radku Větrovskému. Pronájem bytu či domu v Příbrami: prezentace, prověření zájemců, smlouvy a předání. Domluvte si konzultaci.',
    promise: 'Správný nájemník. Jasná pravidla.',
    intro: 'Chcete pronajmout byt nebo dům v Příbrami? Jsem Radek Větrovský z RE/MAX Power 2. Pomohu Vám nastavit nájemné, připravit nabídku, prověřit zájemce a dotáhnout smlouvu i předání. Vy rozhodnete, komu svou nemovitost svěříte.',
    image: rentalImage, imageAlt: 'Klíče od bytu před světlým zařízeným obývacím pokojem', imagePosition: '70% center',
    primaryLabel: 'Chci pronajmout nemovitost', primaryHref: '#konzultace',
    primaryNote: 'Začneme nezávaznou konzultací.',
    benefits: ['Prověření nájemníků', 'Právní zajištění', 'Správa nemovitosti'],
    overviewTitle: 'Pronájem s péčí o Váš majetek.',
    overview: 'Najdeme vhodného a prověřeného nájemníka a postaráme se o smluvní dokumentaci i předání. Důraz kladu na pečlivý výběr, srozumitelné podmínky a přehled o tom, co se s Vaší nemovitostí děje.',
    features: [
      { title: 'Prověření nájemníků', text: 'U vážných zájemců řeším jejich představu o bydlení, termín nastěhování a schopnost hradit nájemné. Podle dostupných podkladů a v odpovídajícím rozsahu ověřuji relevantní informace a registry. Výsledek s Vámi projdu, abyste mohli rozhodnout na základě konkrétních skutečností. Prověření riziko omezuje, ale není zárukou budoucího chování nájemníka.' },
      { title: 'Právní zajištění', text: 'Smluvní dokumentaci koordinuji s právním specialistou podle konkrétního pronájmu. Před podpisem projdeme nájemné, služby, jistotu, dobu nájmu a další dohodnuté podmínky. Důležitá je také návaznost plateb a předání. Cílem je, aby obě strany rozuměly tomu, co podepisují a jak budou řešit běžné situace během nájmu.' },
      { title: 'Správa nemovitosti', text: 'Při konzultaci probereme, jakou péči potřebujete i po předání klíčů. Může jít o komunikaci s nájemníkem, koordinaci oprav nebo související administrativu. Konkrétní rozsah průběžné správy a její cenu si sjednáme samostatně. Díky tomu od začátku víte, které činnosti přebírám a co zůstává ve Vaší režii.' },
    ],
    processTitle: 'Od nabídky po nastěhování.',
    processIntro: 'Pronájem je víc než zveřejněný inzerát. Jednotlivé kroky na sebe navazují tak, aby měl výběr nájemníka i předání jasný průběh.',
    steps: [
      { title: 'Nastavíme nájemné a podmínky', text: 'Prohlédnu byt nebo dům, probereme vybavení, provozní náklady a dostupnost. Navrhnu nájemné s ohledem na srovnatelné nabídky a stav nemovitosti. Oddělíme samotné nájemné od služeb a energií, aby byla nabídka srozumitelná.' },
      { title: 'Připravím prezentaci a prohlídky', text: 'Zajistím fotografie, popis a inzerci. Komunikuji se zájemci a organizuji prohlídky, při kterých získají informace o nemovitosti i podmínkách. Vám předávám zpětnou vazbu a průběžný přehled o odezvě na nabídku.' },
      { title: 'Společně vybereme nájemníka', text: 'Prověřím relevantní podklady vážných zájemců a projdeme jejich situaci. Vyberete, s kým chcete uzavřít nájemní vztah. Následně koordinuji smlouvu a dohodu o platbách, termínech a užívání vybavení.' },
      { title: 'Předáme nemovitost a podklady', text: 'Při předání zaznamenáme stav bytu, vybavení, měřidla a předané klíče. Pomohu s podklady pro přepis energií. Pokud potřebujete následnou správu, navážeme podle předem sjednaného rozsahu spolupráce.' },
    ],
    detailTitle: 'Na čem záleží před podpisem?',
    detailIntro: 'Připravené podklady pomáhají předejít nedorozuměním. Věnujeme pozornost nejen tomu, kdo si byt pronajme, ale i tomu, jak bude nájem fungovat v praxi.',
    checks: [
      { title: 'Přehled plateb', text: 'Zájemce má předem znát nájemné, zálohy na služby, způsob úhrady energií a sjednanou jistotu. Domluvíme také, jak se hradí odměna za zprostředkování. Náklady mají být přehledné už při rozhodování, nikoli až při podpisu.' },
      { title: 'Stav a vybavení', text: 'Sepíšeme, co v nemovitosti zůstává a v jakém je to stavu. Fotodokumentace a předávací protokol dávají oběma stranám společný výchozí bod. Zvlášť projdeme zjištěné závady a domluvené opravy, aby bylo jasné, jak se budou řešit.' },
      { title: 'Kontakty a návazná péče', text: 'Ujasníme, na koho se nájemník obrací při závadě, jak předává informace a které záležitosti řeší přímo majitel. Pokud sjednáme správu, vymezíme komunikaci, schvalování oprav a další odpovědnosti. Každý tak zná svou roli.' },
    ],
    localText: 'U pronájmu na Příbramsku rozhoduje vedle stavu bytu také dostupnost dopravy, parkování a služeb. Jinou situaci řeší majitel menšího bytu na Zdaboři a jinou majitel rodinného domu v okolní obci. Pomáhám s pronájmy v Příbrami, Dobříši, Sedlčanech, Rožmitále pod Třemšínem, Březnici, Sedlci-Prčici i jejich okolí.',
    faqs: [
      { q: 'Je tato služba pro majitele, nebo pro zájemce o bydlení?', a: 'Tato stránka je určená především majitelům, kteří chtějí svou nemovitost pronajmout. Pokud hledáte bydlení, můžete si přes odkaz Aktuální nabídka prohlédnout moje zveřejněné nemovitosti na RE/MAX nebo mi sdělit, co hledáte.' },
      { q: 'Za jak dlouho najdete nájemníka?', a: 'Doba závisí na nájemném, lokalitě, stavu, vybavení a aktuální poptávce. Po prohlídce nemovitosti nastavíme postup a budeme vyhodnocovat odezvu. Pevný termín ani nalezení konkrétního typu nájemníka nelze předem garantovat.' },
      { q: 'Jak probíhá prověření zájemců?', a: 'Probereme jejich požadavky a ověříme relevantní dostupné informace o schopnosti plnit nájemní závazky. Součástí může být kontrola veřejných registrů a předložených podkladů. O výběru rozhodujete Vy; žádná kontrola sama o sobě nezaručí bezproblémový nájem.' },
      { q: 'Kdo hradí provizi za pronájem?', a: 'Výši odměny, jejího plátce i splatnost si výslovně sjednáme před zahájením spolupráce a podmínky sdělíme také zájemcům. Nelze automaticky předpokládat, že služba bude pro majitele zdarma. Rozsah případné správy se domlouvá samostatně.' },
      { q: 'Je průběžná správa součástí zprostředkování?', a: 'Zprostředkování pronájmu a následná správa jsou odlišné činnosti. Předem se dohodneme, zda potřebujete pouze nalezení nájemníka a předání, nebo i navazující péči. U správy stanovíme konkrétní úkoly, způsob komunikace a odměnu.' },
      { q: 'Co je potřeba připravit pro předání bytu?', a: 'Přehled vybavení, dostupné klíče a ovladače, stavy měřidel a podklady k energiím. Společně zaznamenáme stav nemovitosti a domluvené úpravy. Předávací protokol by měl odpovídat skutečnosti a být srozumitelný majiteli i nájemníkovi.' },
    ],
    articles: [
      { title: 'Průvodce pronájmem bytu', text: 'Nájemné, příprava bytu a praktické otázky pronajímatele.', href: '/blog/pronajem-bytu-pribram-2026' },
      { title: 'Investiční nemovitosti', text: 'Co promyslet, když má nemovitost sloužit k pronájmu.', href: '/blog/investicni-nemovitosti-pribram' },
      { title: 'Ocenění nemovitosti', text: 'Jak se při posuzování hodnoty promítá stav a lokalita.', href: '/blog/jak-spravne-ocenit-nemovitost' },
    ],
    contactTitle: 'Proberme Váš pronájem.',
    contactText: 'Napište mi, jakou nemovitost chcete pronajmout a od kdy. Domluvíme úvodní konzultaci, při které projdeme Vaše očekávání, podmínky a rozsah spolupráce.',
    messagePlaceholder: 'Například: Chci pronajmout zařízený byt 2+kk na Zdaboři od listopadu.',
    nextStep: 'Po odeslání se Vám osobně ozvu a probereme nemovitost, očekávané nájemné i termín. Předem si vyjasníme rozsah zprostředkování a odměnu; případnou průběžnou správu domlouváme zvlášť.',
    proof: { quote: 'Jeho přístup a projev byl zcela profesionální, můj požadavek vyřešil rychle a dobře, vše bylo srozumitelně vykomunikované (smlouvy).', author: 'Šárka Šenkárová', context: 'Zkušenost se spoluprací' },
  },
  koupe: {
    id: 'koupe', number: '03', label: 'Koupě', name: 'Koupě nemovitosti',
    path: '/sluzby/koupe-nemovitosti-pribram',
    title: 'Koupě nemovitosti Příbram | Radek Větrovský',
    description: 'Kupujete byt nebo dům na Příbramsku? Radek Větrovský pomůže s výběrem, prověrkou a vyjednáváním podmínek. Proberte své plány na nezávazné konzultaci.',
    promise: 'Domov vybírejte s jistějšími podklady.',
    intro: 'Hledáte byt, dům nebo pozemek v Příbrami a okolí? Jsem Radek Větrovský z RE/MAX Power 2. Při zastoupení kupujícího pomohu s výběrem, posouzením ceny, koordinací právní a technické prověrky i vyjednáváním podmínek koupě.',
    image: purchaseImage, imageAlt: 'Moderní rodinný dům s terasou v podvečerním světle', imagePosition: '35% center',
    primaryLabel: 'Probrat koupi nemovitosti', primaryHref: '#konzultace',
    primaryNote: 'Ať už hledáte, nebo máte vybráno.',
    benefits: ['Analýza trhu', 'Vyjednávání ceny', 'Due diligence a prověrka'],
    overviewTitle: 'Více souvislostí. Lepší rozhodnutí.',
    overview: 'Pomohu Vám najít nový domov nebo posoudit investiční nemovitost. Vedle první návštěvy řešíme i dokumenty, technický stav a podmínky obchodu, abyste se rozhodovali podle skutečností.',
    features: [
      { title: 'Analýza trhu', text: 'Nejprve si vyjasníme rozpočet, lokalitu a to, co má nové bydlení splňovat. Porovnám vhodné nabídky podle ceny, stavu, dispozice a dostupnosti. U investičního záměru zahrneme také očekávané náklady a způsob využití. Společně odlišíme podstatné požadavky od přání, u kterých lze hledat kompromis.' },
      { title: 'Vyjednávání ceny', text: 'Jednání opírám o srovnání nemovitostí, zjištěný stav a konkrétní podmínky nabídky. Kromě kupní ceny řeším vybavení, termíny, předání a návaznost financování. Výsledek závisí na situaci a dohodě s prodávajícím. Předem proto neslibuji určitou slevu ani to, že pokryje náklady na zastoupení.' },
      { title: 'Due diligence a prověrka', text: 'Due diligence znamená prověření nemovitosti a podkladů před rozhodnutím o koupi. Podle jejího typu koordinuji kontrolu vlastnictví, přístupu, dostupné dokumentace a technického stavu. Odborné právní a technické otázky řešíme s příslušnými specialisty. Výstup má jasně oddělit ověřené skutečnosti, otevřené otázky a potřebná doplnění.' },
    ],
    processTitle: 'Od Vaší představy k novému domovu.',
    processIntro: 'Můžeme začít hledáním, nebo posouzením nemovitosti, kterou už máte vybranou. Rozsah pomoci přizpůsobíme fázi, ve které se nacházíte.',
    steps: [
      { title: 'Ujasníme zadání a rozpočet', text: 'Probereme lokalitu, dispozici, stav a plánovaný termín. Do rozpočtu započítáme i související náklady a rezervu na úpravy. Pokud řešíte úvěr, je vhodné znát možnosti financování dříve, než se zavážete ke konkrétní koupi.' },
      { title: 'Porovnáme nabídky a prohlídky', text: 'Vybereme nemovitosti, které odpovídají zadání. Na prohlídkách sledujeme jejich praktické využití, stav a okolí. Sepíšeme otázky pro prodávajícího a potřebné podklady, abyste mohli nabídky porovnávat podle stejných kritérií.' },
      { title: 'Prověříme podklady a podmínky', text: 'Koordinuji prověření a společně projdeme zjištění. S právním specialistou řešíme dokumentaci a smluvní návaznost; podle potřeby zapojíme technického odborníka. Před rozhodnutím víte, co je vyjasněné a které otázky zůstávají otevřené.' },
      { title: 'Dotáhneme jednání a převzetí', text: 'Vyjednáme podmínky a sladíme kroky s financováním. Právní dokumentace určí postup převodu a uvolnění kupní ceny. Při převzetí zaznamenáme stav nemovitosti, vybavení, měřidla a předané klíče podle konkrétní dohody.' },
    ],
    detailTitle: 'Co prověřit, než se rozhodnete?',
    detailIntro: 'Hezká fotografie je začátek. Pro rozhodnutí o koupi potřebujete také znát souvislosti, které z inzerátu nemusí být patrné.',
    checks: [
      { title: 'Vlastnictví a dokumentace', text: 'Kdo nemovitost prodává, jaké údaje jsou v katastru a jak je řešen přístup. U bytu také dostupné podklady ke společenství vlastníků, plánovaným opravám a nákladům. Nejasnosti předáme k odbornému posouzení ještě před navazujícími závazky.' },
      { title: 'Technický stav a další náklady', text: 'Stav stavby, rozvodů, vytápění a provedených úprav. Pokud situace vyžaduje odbornou prohlídku, zapojíme technického specialistu. Rozsah prověrky domluvíme předem. Jejím cílem je získat podklady, nikoli slib, že nemovitost nemůže mít skrytou vadu.' },
      { title: 'Lokalita a každodenní život', text: 'Cesta do práce, dopravní spojení, služby, parkování i okolní prostředí. Dům v menší obci má jiné provozní souvislosti než byt v centru. Při výběru proto vycházíme z Vašeho způsobu života a plánů, nejen z počtu místností.' },
    ],
    localText: 'Při hledání bydlení porovnáváme centrum Příbrami, Březové Hory, Zdaboř i okolní obce podle Vašich priorit. Pokud dojíždíte do Prahy, zahrneme do rozhodování konkrétní dopravní spojení. Pomohu Vám také s koupí v Dobříši, Sedlčanech, Rožmitále pod Třemšínem, Březnici, Sedlci-Prčici a okolí.',
    faqs: [
      { q: 'Pomůžete mi, i když už mám nemovitost vybranou?', a: 'Ano. Můžeme se soustředit na posouzení nabídky, koordinaci prověrky a jednání o podmínkách. Na úvod mi pošlete odkaz nebo základní informace a napište, zda už proběhla prohlídka, rezervace či jiné jednání. Podle toho domluvíme další postup.' },
      { q: 'Co přesně znamená zastoupení kupujícího?', a: 'Jde o službu zaměřenou na Vaši stranu obchodu: zadání, výběr, podklady pro rozhodnutí a vyjednávání. Předem si vyjasníme rozsah, odměnu a role účastníků. Makléř, který inzeruje nemovitost pro prodávajícího, nemusí současně poskytovat zastoupení Vám.' },
      { q: 'Kolik stojí pomoc při koupi?', a: 'Odměna závisí na rozsahu spolupráce. Jinou potřebu má člověk, který hledá od začátku, a jinou kupující s vybraným bytem. Předem projdeme cenu zastoupení i případné služby specialistů. Vyjednaná sleva není garantovaná a nelze ji automaticky považovat za úhradu odměny.' },
      { q: 'Musím mít vyřešené financování před první prohlídkou?', a: 'Na nezávaznou konzultaci můžete přijít i bez vybraného financování. Pro vážné rozhodování je ale důležité znát dostupný rozpočet a podmínky úvěru. O jeho schválení rozhoduje poskytovatel financování; termíny koupě je potřeba nastavit s ohledem na tento proces.' },
      { q: 'Zahrnuje prověrka i odbornou technickou inspekci?', a: 'Rozsah prověrky stanovíme podle nemovitosti a dohody. Makléřské posouzení nenahrazuje odbornou inspekci stavby ani právní stanovisko. Pokud jsou potřeba, koordinuji zapojení příslušného specialisty a předem si vyjasníme jeho zadání a náklady.' },
      { q: 'Kde najdu Vaši aktuální nabídku nemovitostí?', a: 'Aktuální inzerované nemovitosti najdete přes odkaz Aktuální nabídka v horním menu, který vede na profil RE/MAX. Stránka Prodané nemovitosti ukazuje dříve dokončené zakázky a není seznamem volných nabídek.' },
    ],
    articles: [
      { title: 'Na co si dát pozor při koupi', text: 'Otázky pro prohlídku a rozhodování o konkrétní nabídce.', href: '/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram' },
      { title: 'Jaký rozpočet na bydlení zvolit', text: 'Souvislosti mezi vlastními prostředky a financováním.', href: '/blog/kolik-si-muzu-dovolit-hypoteka-pribram' },
      { title: 'Rezervace a úschova kupní ceny', text: 'Co si ujasnit při přípravě a dokončení koupě.', href: '/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026' },
    ],
    contactTitle: 'Řekněte mi, kde chcete bydlet.',
    contactText: 'Napište mi svou představu, lokalitu a přibližný rozpočet. Pokud už máte vybráno, přidejte odkaz na nabídku. Na konzultaci domluvíme, s čím Vám mohu pomoci.',
    messagePlaceholder: 'Například: Hledám dům do 20 minut od Příbrami. Mám už vybranou nabídku.',
    nextStep: 'Po odeslání se Vám osobně ozvu a zjistím, zda teprve hledáte, nebo už máte vybranou nabídku. Podle toho domluvíme rozsah pomoci, odměnu a případné náklady na odbornou prověrku ještě před zahájením spolupráce.',
    proof: { quote: 'Já i manželka jsme byli s ním od začátku spokojený. Byl ochoten a jednání bylo s ním příjemné. Prostě poradil a vyřešil.', author: 'Zdenek Sindler', context: 'Zkušenost se spoluprací' },
  },
};

export const services = Object.values(serviceContent);
export const SITE_URL = 'https://radek-vetrovsky.cz';
