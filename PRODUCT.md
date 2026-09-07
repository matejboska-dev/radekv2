# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primární uživatelé:** Majitelé nemovitostí (bytů, rodinných domů, pozemků, chat a chalup) v Příbrami a v okrese Příbram (Dobříš, Sedlčany, Rožmitál pod Třemšínem, Březnice, Jince a okolí) a v Praze, kteří zvažují prodej nemovitosti, řeší dědické řízení či majetkové vypořádání a potřebují zjistit reálnou tržní cenu bez rizika a závazků.
- **Sekundární uživatelé:** Pronajímatelé hledající prověřené a spolehlivé nájemníky včetně právního servisu a bezstarostné správy, a zájemci o koupi hledající nový domov nebo investiční byt na Příbramsku.
- **Situace a potřeby:** Hledají spolehlivého, férového a lidského partnera s perfektní znalostí místního trhu. Nechtějí anonymní online algoritmy se zkreslenými odhady, ale osobní konzultaci makléře, který zařídí celý proces od A do Z a ochrání jejich finance.

## Product Purpose

Web slouží jako primární prezentační a konverzní platforma certifikovaného realitního makléře Radka Větrovského (RE/MAX Power 2 Příbram).
- **Hlavní konverzní cíl:** Získávání poptávek na prodej nemovitostí prostřednictvím bezplatného a nezávazného tržního odhadu ceny (`/odhad-nemovitosti#odhad-form`) a přímých kontaktů (telefon, e-mail, kontaktní formulář).
- **Sekundární cíl:** Poptávky po zprostředkování pronájmu a nákupu nemovitostí, budování autority a organické návštěvnosti prostřednictvím expertního lokálního SEO blogu a průvodců transakcemi na Příbramsku.
- **Měřítko úspěchu:** Míra konverze návštěvníků v odeslaný formulář odhadu ceny či kontaktování makléře a srozumitelná prezentace úspěšně prodaných nemovitostí a klientských referencí.

## Positioning

- **Silná lokální znalost + globální síla RE/MAX:** Radek Větrovský v regionu Příbram dlouhodobě žije a aktivně působí; kombinuje osobní přístup a detailní znalost lokality se zázemím, standardy a právní jistotou sítě RE/MAX (kancelář RE/MAX Power 2, Zahradnická 550, Příbram III).
- **„Nemovitosti nejen nabízím, ale prodávám!":** Důraz na aktivní prodej a špičkový marketing. Žádné pasivní vyvěšení inzerátu na jeden portál, ale komplexní příprava (home staging, profesionální fotografie a videoprohlídky, virtuální 3D scan, inzerce na top realitních serverech a cílené sociální sítě).
- **Reálný odhad vs. generické kalkulačky:** Proti orientačním online kalkulačkám staví osobní posouzení technického stavu a specifik lokality, které obstojí při vyjednávání s kupujícími, pro banku i dědické řízení, s garantovanou odpovědí do 24 hodin.

## Operating Context

- **Technologický stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix UI komponenty), Framer Motion pro plynulé animace.
- **Backend & integrace:** Supabase Edge Functions pro zpracování a odesílání formulářů (`send-email`), integrace Google Tag Manageru (`GTM-TVZ37HLQ`), kompletní strukturovaná data Schema.org (`RealEstateAgent`, `LocalBusiness`, `OfferCatalog`, `Service`, `BreadcrumbList`).
- **Informační architektura:** Jednostránková přehledová prezentace na hlavní straně (Hero, O mně, Služby, Reference/Prodané nemovitosti, Recenze, Instagram, Blog, Kontakt) doplněná o dedikované stránky služeb (`/sluzby/...`), konverzní landing page pro odhad (`/odhad-nemovitosti`), archiv prodaných nemovitostí (`/prodano`) a ucelený blogový hub (`/clanky` a konkrétní články dle briefů).

## Capabilities and Constraints

- **Formulář odhadu ceny nemovitosti:** Dvoufázový / přehledný sběr klíčových informací o nemovitosti a kontaktních údajů s automatickým odesláním a zpětnou vazbou uživateli (Sonner / Toast).
- **Klientské reference a portfolio:** Prezentace reálných prodaných nemovitostí a autentických recenzí klientů.
- **Aktuální nabídka nemovitostí:** Odkaz na centrální realitní systém RE/MAX pro vždy aktuální stav aktivních nabídek.
- **Mobilní optimalizace:** Rozdělená optimalizovaná architektura pro mobilní zobrazení (`HeroMobile`, `FloatingCTA`) i desktop (`HeroDesktop`).
- **Integrita faktů:** Přísný zákaz vymýšlení nepodložených klientských recenzí, smyšlených prodaných zakázek či nepravdivých právních/daňových informací. Všechny informace v článcích a na webu musí odpovídat platné české legislativě (novinky katastru nemovitostí, PENB, časový test a daň z příjmů).

## Brand Commitments

- **Tón komunikace:** Profesionální, lidský, klidný, věcný a maximálně vstřícný. Žádný agresivní nátlak ani prázdné marketingové fráze.
- **Jazyková a typografická pravidla:**
  - Výhradní oslovení návštěvníka a klienta uctivým vykáním s velkým písmenem: „Vy / Vám / Vás / Vaše".
  - Přísný zákaz em dashů (—) a spojovníků (-) pro vyjádření rozsahu v textu (vždy používat slovní spojení „až", případně čárku či spojku).
  - Přesné a srozumitelné používání odborných termínů bez zbytečného žargonu.
- **Vizuální pravidla:**
  - Bílý čistý podklad s teplými neutrálními akcenty (písečné a hřejivé odstíny místo studené šedi).
  - Tmavá modrošedá (`--primary`) pro stabilní a prémiovou typografii.
  - RE/MAX červená (`--secondary`) použitá střídmě a výhradně pro klíčové konverzní výzvy k akci (CTA tlačítka, odznaky a důležité akcenty).
