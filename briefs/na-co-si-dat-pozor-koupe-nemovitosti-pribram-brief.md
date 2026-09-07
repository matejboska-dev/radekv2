# Na co si dát pozor při koupi bytu nebo domu v Příbrami – kompletní balíček pro radek-vetrovsky.cz

Připraveno podle struktury existujících článků (`BlogKatastr.tsx`, `BlogRezervaceUschova.tsx`, `BlogNovostavby.tsx`). Slug: `na-co-si-dat-pozor-koupe-nemovitosti-pribram`, cesta `/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram`. Bez em dashů a spojovníků v textu (rozmezí přes „až", jinak čárka nebo spojka). Oslovení vykáním s velkým „Vy/Vás/Vám".

**Kontext a účel:** Informační protějšek ke komerční servisní stránce [/sluzby/koupe-nemovitosti-pribram](/sluzby/koupe-nemovitosti-pribram). Servisní stránka řeší „najměte si mě na prověření a vyjednávání", tento článek řeší „co všechno se dá při koupi podělat a jak to sami rozpoznáte". Cílí na lidi ve fázi rozhodování, kteří ještě nevědí, že chtějí makléře kupujícího, a přivádí je právě k té službě. Slouží jako spoke k servisní stránce (hub) a propojuje řadu existujících článků (katastr, PENB, rezervační smlouva, daň z nemovitosti, novostavby).

**Rozlišení od existujícího obsahu (bez kanibalizace):**
- Servisní stránka `/sluzby/koupe-nemovitosti-pribram` cílí na „makléř pro kupujícího Příbram", „zastoupení kupujícího". Tento článek cílí na „na co si dát pozor při koupi", „kontrola nemovitosti před koupí". Jiný záměr (informační vs. komerční), přidat vzájemný odkaz.
- [novostavby-pribram-2026](/blog/novostavby-pribram-2026-kde-se-stavi) má sekci „na co se ptát před koupí bytu v novostavbě" — ta je jen o developerských projektech. Tento článek pokrývá byty i domy z druhé ruky a je širší. V článku o novostavbách je vhodné odkázat sem pro obecnou koupi.
- [katastr-nemovitosti-2026](/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni) řeší jen ověření vlastníka v katastru, tento článek ho použije jako jeden z kroků a odkáže na detail.

---

## Template

**Doporučeno:** `how-to-guide` ve formě předkupní kontrolní check listu. Čtenář s dotazem „na co si dát pozor" chce průchozí seznam rizik a kroků, jak je odhalit, seřazený podle fáze nákupu (inzerát → prohlídka → List vlastnictví → smlouvy → předání). Sekundárně prvky `listicle` (číslované body rizik).

**Template soubor:** `skills/blog/templates/how-to-guide.md`

---

## Target Keywords

- **Primary:** `na co si dát pozor při koupi nemovitosti` (celostátní, střední objem, konkurence pojišťovny a advokáti; lokální diferenciace přes Příbram a příklady z okresu)
- **Secondary:** `kontrola nemovitosti před koupí`, `právní vady nemovitosti`, `skryté vady bytu`, `co prověřit před koupí bytu`, `list vlastnictví na co si dát pozor`, `koupě staršího domu rizika`
- **Long tail / lokální:** `koupě bytu Příbram na co si dát pozor`, `koupě domu Příbram`, `prověření nemovitosti Příbram`
- **Questions (People Also Ask, nebylo přímo ověřeno v SERP):**
  - „Co si ověřit před koupí bytu?"
  - „Jak poznat skryté vady nemovitosti?"
  - „Co je plomba v katastru nemovitostí?"
  - „Kdo odpovídá za vady nemovitosti po prodeji?"
  - „Vyplatí se technická inspekce nemovitosti?"
  - „Co má obsahovat rezervační smlouva?"

## Search Intent

**Informační** s vysokým komerčním potenciálem. Uživatel je před koupí, má strach, že něco přehlédne, a hledá jistotu. Chce konkrétní seznam „na tohle se dívej" plus varovné signály. Část hledajících skončí u závěru „tohle sám nezvládnu" a poptá odbornou pomoc, což je přesně cíl. Rychlá odpověď nahoře musí shrnout tři nejdůležitější kontroly (právní stav v katastru, technický stav, smluvní dokumentace).

## Content Parameters

- **Word count:** 2 200 až 2 800 slov (téma je široké, ale musí zůstat prakticky použitelné)
- **Reading level:** laik, právní pojmy vždy vysvětlit v závorce (věcné břemeno, zástavní právo, plomba, LV, katastr, úschova)
- **Formát:** TSX komponenta `BlogNaCoPozorKoupe.tsx`, prvky jako v `BlogKatastr.tsx` / `BlogRezervaceUschova.tsx` (číslované kroky, boxy s varováním, tabulka právních vad, checklist komponenta)
- **H2 sekcí:** 8
- **Obrázky:** 1 hero (prohlídka bytu / lupa nad dokumenty / dům), zbytek vlastní grafika
- **Grafy/vizuály:** 2 až 3 (koláč nebo sloupec „nejčastější právní vady na LV", stepper „proces prověření krok za krokem", tabulka „vada → jak ji odhalím → co s tím")
- **FAQ:** 5 položek
- **Datum:** „Aktualizováno: [měsíc rok]"

## Recommended Title

**Na co si dát pozor při koupi bytu nebo domu v Příbrami: kompletní kontrolní seznam**

Alternativy:
1. Koupě nemovitosti v Příbrami: 8 věcí, které prověřit dřív, než podepíšete
2. Právní a technické vady nemovitosti: jak je odhalit před koupí v Příbrami

Meta title (do 60 znaků): `Na co si dát pozor při koupi nemovitosti v Příbrami`

## Meta Description

`Kontrolní seznam před koupí bytu nebo domu v Příbrami: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova.`

## TL;DR Draft (blok „Rychlá odpověď")

> **Rychlá odpověď:** Před koupí nemovitosti v Příbrami prověřte tři věci. Za prvé právní stav: aktuální List vlastnictví z katastru, jestli na nemovitosti nevázne zástavní právo, exekuce, plomba, věcné břemeno (třeba právo dožití), předkupní právo nebo nájem. Za druhé technický stav: u staršího bytu fond oprav a plánované opravy domu, u domu střechu, statiku, vlhkost, elektroinstalaci a rozvody, ideálně s technikem. Za třetí smluvní dokumentaci: rezervační smlouvu, smlouvu o smlouvě budoucí a kupní smlouvu si nechte projít dřív, než cokoli podepíšete, a kupní cenu posílejte výhradně přes advokátní nebo notářskou úschovu, nikdy přímo prodávajícímu. Za skryté vady, které existovaly při předání, odpovídá prodávající, dokazování je ale zdlouhavé, proto se vyplatí kontrola předem.

## Information Gain Opportunities

- **[UNIQUE INSIGHT]:** Tabulka „vada → jak ji laik odhalí → co to znamená pro cenu a jednání". Většina článků jen vyjmenuje rizika, neřekne, jak se konkrétně projeví a jak s tím pracovat při vyjednávání.
- **[UNIQUE INSIGHT]:** Lokální specifika Příbrami: hodně panelových a starších cihlových domů bez zateplení (dopad na PENB a provozní náklady po zpřísnění metodiky 2025), poddolování a stará důlní činnost v některých částech města a okrese (Březové Hory, okolí), radonové riziko v podloží Brd, u domů na okraji města napojení na sítě vs. studna a jímka. Tohle celostátní články nepokrývají.
- **[ORIGINAL DATA / vlastní zkušenost]** pouze pokud Radek doplní: dvě až tři anonymizované situace z vlastních zakázek v Příbrami, kdy kontrola LV nebo prohlídka s technikem odhalila problém (věcné břemeno, nesoulad zapsané a skutečné výměry, černá stavba, exekuce na spoluvlastníka). Bez doložení neuvádět jako first-hand.
- **[UNIQUE INSIGHT]:** Rozdíl kontrol u bytu vs. u rodinného domu, přehledně vedle sebe (u bytu řešíte SVJ, fond oprav a společné části; u domu pozemek, přístupovou cestu, sítě, sousedské vztahy a stavební historii).

## Content Outline

### Úvod
- Hook: koupě nemovitosti je pro většinu lidí největší transakce v životě a chyba se špatně napravuje.
- Problém: kupující netuší, co všechno může být špatně, a spoléhá na to, že „katastr to vyřeší".
- Slib: kontrolní seznam podle fází koupě, od inzerátu po předání klíčů, s lokálním pohledem na Příbram.
- Box Rychlá odpověď za úvod.

### H2: Právní stav nemovitosti: co čtete z Listu vlastnictví
- **Answer-first:** „První kontrola je aktuální List vlastnictví z katastru. Hledáte na něm plombu, zástavní právo, exekuci, věcné břemeno, předkupní právo a poznámky o sporu."
- Vysvětlit části LV (A vlastník, B nemovitosti, C omezení, D poznámky, E nabývací tituly).
- Plomba (písmeno P): probíhá zápisová změna, počkat, až se dořeší.
- Kde LV získat a že od konce prosince 2025 je k zobrazení vlastníka potřeba přihlášení přes BankID nebo mojeID; odkaz na [katastr nemovitostí 2026](/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni).
- **Vizuál:** tabulka nejčastějších právních vad (zástavní právo, exekuce, věcné břemeno / služebnost, předkupní právo, nájem nebo pacht, nesoulad výměr) se sloupci „co to je", „jak se projeví", „co s tím".
- **Key stat:** typické právní vady podle právních poraden: služebnost bytu (právo dožití), zástavní právo, nájem, pacht, předkupní právo.

### H2: Věcná břemena, exekuce a spoluvlastnictví: kdy couvnout
- **Answer-first:** „Zástavní právo banky prodávajícího se běžně vypořádá z kupní ceny přes úschovu. Exekuce, spory o hranice pozemku nebo neochotný spoluvlastník jsou důvod k velké opatrnosti."
- Jak se řeší zástava z hypotéky prodávajícího (kvitance, výmaz, součinnost banky), proč to musí ošetřit kupní smlouva a úschova.
- Věcné břemeno dožití u prodeje po babičce, právo cesty přes cizí pozemek u domu, přípojky vedené přes souseda.
- Spoluvlastnické podíly a předkupní právo mezi spoluvlastníky; odkaz na [jak prodat zděděnou nemovitost](/blog/jak-prodat-zdedenou-nemovitost-pribram) z pohledu druhé strany.
- **Lokální:** u domů na okraji Příbrami a v okolních obcích častěji nevyjasněné přístupové cesty a sítě.

### H2: Technický stav bytu: dům, SVJ a fond oprav
- **Answer-first:** „U bytu nekupujete jen byt, ale i podíl na domě. Zjistěte stav fondu oprav, plánované velké opravy, výši příspěvků a jestli SVJ nemá dluhy."
- Co si vyžádat: zápisy ze shromáždění SVJ, stav fondu oprav, plán oprav (střecha, výtah, stoupačky, zateplení), vyúčtování, dlužníci v domě.
- Prohlídka bytu: okna, rozvody, vlhkost, plíseň v koupelně a rozích, funkčnost topení, stáří kuchyně a jádra.
- **Lokální:** příbramská sídliště (Příbram V, VII, VIII) jsou převážně panel ze 70. a 80. let, hodně domů má nebo potřebuje revitalizaci; centrum a Březové Hory starší cihlové domy.
- **Key stat:** cena bytu k rekonstrukci vs. k nastěhování se v Příbrami u malých bytů liší v procentech ceny výrazně (viz [prodej garsonky](/blog/prodej-garsonky-maleho-bytu-pribram-2026)).

### H2: Technický stav rodinného domu: střecha, statika, vlhkost, sítě
- **Answer-first:** „U domu jsou nejdražší skryté vady střecha, statika (praskliny), vlhké zdivo a stará elektroinstalace. Na prohlídku si vezměte stavebního technika."
- Checklist: krov a střešní krytina, trhliny ve zdivu a jejich směr, vlhkost a výkvěty solí ve spodní části zdí, stáří a stav elektroinstalace (hliník, málo okruhů), rozvody vody a odpady, kotel a topení, izolace a energetická náročnost.
- Pozemek a stavba: soulad skutečného stavu s katastrem a stavební dokumentací, kolaudace, případné černé stavby (přístavby, zimní zahrady), studna a povolení k odběru, ČOV nebo jímka, napojení na kanalizaci a plyn.
- **Lokální (Příbram a okres):** poddolování a stará důlní činnost v některých lokalitách (nutné ověřit u obce a v územním plánu), radonové riziko v podloží, u chalup v okrese Brdy nedostatek inženýrských sítí.
- **Vizuál:** srovnávací box „kontroly u bytu vs. u rodinného domu".
- **Náklady:** technická inspekce bytu obvykle 5 000 až 8 000 Kč, u velkého domu i více a delší (kolem 4 hodin), termovize od cca 2 500 Kč.

### H2: Energetický štítek (PENB) a provozní náklady
- **Answer-first:** „Prodávající Vám musí ze zákona předat PENB. Od roku 2025 zpřísněná metodika ukazuje reálnou spotřebu, u nezateplených domů a starých panelů vychází štítek horší a to je Váš argument v jednání o ceně."
- Co z PENB vyčtete, jak souvisí s budoucími účty za energie a s dotační podporou na zateplení.
- Odkaz na [energetický štítek při prodeji nemovitosti](/blog/penb-pri-prodeji-nemovitosti-2026) pro detail.
- Spočítat si měsíční náklady: energie, fond oprav nebo údržba domu, pojištění, daň z nemovitosti; odkaz na [daň z nemovitosti v Příbrami](/blog/dan-z-nemovitosti-pribram-2026).

### H2: Rezervační smlouva, smlouva o smlouvě budoucí a kupní smlouva
- **Answer-first:** „Nepodepisujte rezervační smlouvu, dokud ji někdo nezkontroluje. Rezervační poplatek bývá 3 až 5 %, hlídejte podmínky jeho vrácení a sankce."
- Na co v rezervační smlouvě: kdo je smluvní stranou (realitka vs. prodávající), lhůty, co se stane, když kupující nezíská hypotéku, kdy poplatek propadá.
- Smlouva o smlouvě budoucí u nedokončených staveb a novostaveb; odkaz na [novostavby v Příbrami](/blog/novostavby-pribram-2026-kde-se-stavi).
- Kupní smlouva: přesná identifikace nemovitosti podle katastru, termín předání, stav při předání, vyloučení nebo rozsah odpovědnosti za vady, smluvní pokuty, návrh na vklad.
- Odkaz na [rezervační smlouva a úschova kupní ceny](/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026).

### H2: Úschova kupní ceny a financování
- **Answer-first:** „Kupní cenu posílejte výhradně přes advokátní, notářskou nebo bankovní úschovu, nikdy přímo na účet prodávajícího před vkladem vlastnického práva."
- Jak úschova chrání obě strany, kdo ji platí (obvykle od cca 3 000 Kč), na co v úschovní smlouvě (podmínky uvolnění, lhůty, co když se vklad zamítne).
- Financování: mít hypotéku předschválenou před rezervací; odkaz na [kolik si můžu dovolit](/blog/kolik-si-muzu-dovolit-hypoteka-pribram) a [aktuální hypoteční sazby](/blog/hypotecni-sazby-pribram-mesicni-prehled).
- Odhad tržní ceny, ať nepřeplatíte; odkaz na [cenovou mapu Příbrami](/blog/cenova-mapa-pribram-2026) a [jak správně ocenit nemovitost](/blog/jak-spravne-ocenit-nemovitost).

### H2: Předání nemovitosti a co po podpisu
- **Answer-first:** „Při předání sepište předávací protokol se stavy měřidel a fotodokumentací a zkontrolujte, že je nemovitost ve stavu podle smlouvy."
- Předávací protokol, stavy elektřiny, vody, plynu, počty klíčů, přepis energií a služeb, doložení zaplacené daně z nemovitosti a případně SIPO.
- Přepis v katastru: kdy je vklad proveden, jak zkontrolovat nový LV.
- Reklamace vad: lhůty, jak postupovat, kdy má smysl řešit soudně.

### Klíčové body k zapamatování
- Vždy si vytáhněte aktuální List vlastnictví a přečtěte omezení (část C) a poznámky (část D).
- Zástava z hypotéky prodávajícího se běžně řeší z kupní ceny přes úschovu, exekuce a spory o hranice jsou důvod k opatrnosti.
- U bytu prověřte SVJ, fond oprav a plánované velké opravy, u domu střechu, statiku, vlhkost, elektroinstalaci a sítě.
- V Příbrami a okrese navíc hlídejte poddolování, radon, stav panelových domů a u okrajových částí přístupové cesty a sítě.
- PENB Vám musí předat prodávající, horší štítek u nezatepleného domu je argument pro slevu.
- Rezervační smlouvu i kupní smlouvu si nechte zkontrolovat, kupní cenu posílejte jen přes úschovu.
- Při předání sepište protokol se stavy měřidel a fotodokumentací.
- Za skryté vady existující při předání odpovídá prodávající, ale dokazování je zdlouhavé, kontrola předem se vyplatí.

### FAQ (viz FAQ SCHEMA)

### Shrnutí a co dělat dál
- 2 odstavce: rekapitulace tří pilířů kontroly; nabídka zastoupení kupujícího v Příbrami (prověření, prohlídka s technikem, vyjednání ceny, hlídání smluv a úschovy).
- CTA na `/sluzby/koupe-nemovitosti-pribram`.

### Disclaimer (kurzívou)
„Článek má informativní charakter a shrnuje obecně známé postupy k srpnu 2026. Nenahrazuje právní ani znalecký posudek konkrétní nemovitosti. Před koupí doporučujeme prověření advokátem a technickou prohlídku odborníkem. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace."

### Přečtěte si také
- Katastr nemovitostí 2026: konec anonymního nahlížení a jak si přesto ověřit vlastníka
- Rezervační smlouva a úschova kupní ceny: jak nepřijít o peníze ani o kupce
- Energetický štítek (PENB) při prodeji nemovitosti: kdy ho potřebujete?

## Statistics to Include

| # | Statistika / fakt | Zdroj | Období | Sekce |
|---|-------------------|-------|--------|-------|
| 1 | Typické právní vady: služebnost (právo dožití), zástavní právo, nájem, pacht, předkupní právo | Právní prostor; Dostupný advokát | 2025 až 2026 | H2: Právní stav / LV |
| 2 | Od konce prosince 2025 je pro zobrazení vlastníka v katastru nutné přihlášení přes BankID nebo mojeID | ČÚZK; interní článek o katastru | prosinec 2025 | H2: Právní stav / LV |
| 3 | Za skryté vady existující při předání odpovídá prodávající | Bezrealitky.cz, blog Skryté vady; občanský zákoník | 2025 | Úvod / H2: Předání |
| 4 | Technická inspekce bytu 3+kk obvykle 5 000 až 8 000 Kč; zpětná prověrka od 2 900 Kč; termovize od 2 500 Kč | stavnemovitosti.cz, ceník | 2026 | H2: Technický stav domu |
| 5 | Inspekce bytu trvá cca 1,5 až 2 hodiny, velký dům i 4 hodiny | stavnemovitosti.cz | 2026 | H2: Technický stav domu |
| 6 | Rezervační poplatek obvykle 3 až 5 % kupní ceny; advokátní úschova od cca 3 000 Kč | interní článek o rezervační smlouvě | 2026 | H2: Rezervační smlouva; H2: Úschova |
| 7 | Od roku 2025 zpřísněná metodika PENB více zohledňuje skutečnou spotřebu a vytápění | interní článek o PENB | 2025 | H2: PENB |
| 8 | Ceny bytů v Příbrami 60 000 až 100 000 Kč/m², sídliště převážně panel 70. a 80. let | interní cenová mapa | 2026 | H2: Technický stav bytu |
| 9 | Rodinné domy Středočeský kraj ~70 500 Kč/m², průměrná doba prodeje 86 dní (květen 2026) | Hypoindex.cz / Deloitte Real Index | květen 2026 | H2: Úschova a financování (kontext ceny) |

## Evidence-Backed Section Plan

| Sekce | Hlavní tvrzení | Podpůrný důkaz | Zdroj |
|-------|----------------|----------------|-------|
| Právní stav / LV | LV je první a nejlevnější kontrola | výčet částí LV, typické vady | Právní prostor, Dostupný advokát, ČÚZK |
| Věcná břemena a exekuce | Zástava se řeší z ceny, exekuce je varování | mechanismus kvitance a úschovy | interní článek o rezervační smlouvě a úschově |
| Technický stav bytu | Kupujete i podíl na domě | co si vyžádat od SVJ | běžná praxe realitních poraden |
| Technický stav domu | Nejdražší vady jsou skryté | ceny a délka inspekce | stavnemovitosti.cz |
| PENB | Horší štítek = argument pro slevu | zpřísnění metodiky 2025 | interní článek o PENB |
| Rezervační a kupní smlouva | Nepodepisovat bez kontroly | výše poplatku, podmínky vrácení | interní článek o rezervační smlouvě |
| Úschova | Nikdy platit přímo prodávajícímu | jak úschova chrání strany | interní článek o úschově |
| Předání | Protokol se stavy měřidel | obsah předávacího protokolu | běžná praxe |

## Cover Image

| Varianta | Detail |
|----------|--------|
| Foto | Unsplash/Pexels: „home inspection", „couple viewing apartment", „magnifying glass documents house", „house keys contract" |
| Generované SVG | Checklist ikona na gradientu s titulkem „8 kontrol před koupí"; sanitizovat nebo rastrovat |
| Rozměr | 1200 x 630 (OG) |
| Uložení | `src/assets/na-co-pozor-koupe-pribram.webp` nebo externí URL podle konvence |

## Visual Element Plan

| # | Typ | Data | Sekce |
|---|-----|------|-------|
| 1 | Tabulka právních vad | vada → co to je → jak se projeví → co s tím (6 řádků) | H2: Právní stav / LV |
| 2 | Stepper / časová osa | proces prověření: inzerát → prohlídka → LV → smlouvy → úschova → předání | Úvod nebo H2: Předání |
| 3 | Srovnávací box (2 sloupce) | kontroly u bytu vs. u rodinného domu | H2: Technický stav domu |
| 4 (volitelně) | Sloupcový graf | orientační náklady kontrol (LV, technik bytu, technik domu, právník, úschova) | H2: Úschova a financování |

## Competitive Gaps to Exploit

1. Celostátní články (pojišťovny, advokátní portály) jsou obecné a bez lokálního kontextu. Příbramská specifika (poddolování, radon, panelová sídliště, přístupové cesty u okrajových domů) nikdo nepokrývá.
2. Většina článků vyjmenuje rizika, ale neřekne „jak to laik pozná" a „jak s tím pracovat při vyjednávání o ceně". Tabulka vada → projev → řešení je informační zisk.
3. Chybí propojení právní, technické a finanční roviny na jednom místě; konkurence to tříští.
4. Autentický hlas makléře z regionu s reálnými (anonymizovanými) příklady, pokud je Radek doplní. E-E-A-T výhoda.
5. Aktuálnost 2026 (katastr od prosince 2025 za přihlášením, zpřísněné PENB, pravidla ČNB) vs. starší články.

## Internal Link Architecture

- **Odkazovat NA (z tohoto článku):**
  1. [Katastr nemovitostí 2026: konec anonymního nahlížení](/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni) — anchor: „jak si ověřit vlastníka v katastru"
  2. [Rezervační smlouva a úschova kupní ceny](/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026) — anchor: „co má obsahovat rezervační smlouva a jak funguje úschova"
  3. [Energetický štítek (PENB) při prodeji nemovitosti](/blog/penb-pri-prodeji-nemovitosti-2026) — anchor: „co vyčtete z energetického štítku"
  4. [Daň z nemovitosti v Příbrami 2026](/blog/dan-z-nemovitosti-pribram-2026) — anchor: „kolik ročně zaplatíte na dani z nemovitosti"
  5. [Cenová mapa Příbram 2026](/blog/cenova-mapa-pribram-2026) — anchor: „jestli cena odpovídá lokalitě"
  6. [Novostavby v Příbrami 2026](/blog/novostavby-pribram-2026-kde-se-stavi) — anchor: „na co si dát pozor u koupě z papíru"
  7. [Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku](/blog/kolik-si-muzu-dovolit-hypoteka-pribram) — anchor: „mít financování jisté před rezervací"
  8. [Zastoupení kupujícího při koupi nemovitosti v Příbrami](/sluzby/koupe-nemovitosti-pribram) — anchor: „prověření a vyjednání ceny za Vás"
- **Odkazovat Z (přidat odkaz na tento nový článek):**
  1. [/sluzby/koupe-nemovitosti-pribram](/sluzby/koupe-nemovitosti-pribram) — sekce o due diligence nebo FAQ, anchor: „kompletní kontrolní seznam před koupí"
  2. [novostavby-pribram-2026-kde-se-stavi](/blog/novostavby-pribram-2026-kde-se-stavi) — sekce „na co se ptát před koupí", anchor: „obecný kontrolní seznam pro koupi bytu i domu"
  3. [katastr-nemovitosti-2026-konec-anonymniho-nahlizeni](/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni) — anchor: „co dalšího prověřit před koupí"
  4. [rezervacni-smlouva-uschova-kupni-ceny-pribram-2026](/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026) — anchor: „na co si dát pozor při koupi nemovitosti"
  5. [cenova-mapa-pribram-2026](/blog/cenova-mapa-pribram-2026) — anchor: „na co si dát pozor, než koupíte"
- **Pillar napojení:** hub „koupě nemovitosti v Příbrami" = servisní stránka `/sluzby/koupe-nemovitosti-pribram`
- **Pozice v clusteru:** Spoke (informační), silně navázaný na servisní hub

## E-E-A-T Signals to Include

- **Zkušenost:** anonymizované příklady odhalených vad z Radkových zakázek v Příbrami (jen pokud je doplní se skutečnými detaily; jinak neuvádět jako osobní zkušenost a psát obecně).
- **Odbornost:** realitní makléř RE/MAX Power 2, zastoupení kupujícího a due diligence jako součást služby.
- **Autorita:** citace z právních portálů, ČÚZK, oborových inspektorů; spolupráce s advokátem a stavebním technikem.
- **Důvěryhodnost:** jasné doporučení „na tohle si vezměte odborníka", disclaimer, žádné strašení kvůli prodeji služby, vyvážené (většina koupí proběhne bez problémů, když se prověří).

## Distribution Plan

- **Reddit:** r/czech, r/Praha, r/bydleni (pokud existuje), případně r/Reality. Hodnotový komentář v postech typu „koupili jsme byt a našli jsme vadu", odkaz jen na vyžádání.
- **YouTube:** video „8 věcí, které prověřit před koupí bytu nebo domu" (6 až 8 min), záběry z prohlídky, checklist na obrazovce, thumbnail „NEKUPUJTE, dokud neprověříte tohle".
- **LinkedIn:** post s tabulkou právních vad, cílit na lidi z Příbramska před koupí; hook „katastr od prosince 2025 skrývá vlastníka, přesto se dá prověřit všechno podstatné".
- **Email:** newsletter s checklistem ke stažení (PDF), předmět „Než koupíte byt nebo dům: kontrolní seznam", CTA na plný článek a na službu zastoupení kupujícího.
- **Twitter/X:** vlákno: (1) tři pilíře kontroly, (2) co číst z LV, (3) skryté vady u domu a cena technika, (4) proč jen přes úschovu, (5) předávací protokol. Hashtagy #reality #koupěbytu #Příbram.

---

## META

**Meta title:** `Na co si dát pozor při koupi nemovitosti v Příbrami`
**Meta description:** `Kontrolní seznam před koupí bytu nebo domu v Příbrami: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova.`
**URL slug:** `na-co-si-dat-pozor-koupe-nemovitosti-pribram`
**Canonical path:** `/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram`

---

## FAQ SCHEMA

```
const faqItems = [
  {
    q: 'Co si ověřit před koupí bytu nebo domu jako první?',
    a: 'Aktuální List vlastnictví z katastru nemovitostí. Zajímá Vás část C (omezení vlastnického práva) a část D (poznámky). Hledáte zástavní právo, exekuci, plombu, věcné břemeno, předkupní právo, nájem nebo pacht a poznámku o probíhajícím sporu. Od konce prosince 2025 je pro zobrazení jména vlastníka nutné přihlášení přes BankID nebo mojeID.',
  },
  {
    q: 'Kdo odpovídá za vady nemovitosti zjištěné po koupi?',
    a: 'Za skryté vady, které na nemovitosti existovaly už při předání, odpovídá prodávající, i když se projeví později. Problém je dokazování, které bývá zdlouhavé a nákladné. Proto se vyplatí technická prohlídka před koupí a přesné zachycení stavu v předávacím protokolu s fotodokumentací.',
  },
  {
    q: 'Vyplatí se technická inspekce nemovitosti před koupí?',
    a: 'U staršího domu téměř vždy. Nezávislý stavební technik nebo inspektor odhalí vady střechy, statiky, vlhkosti a elektroinstalace, které laik na prohlídce nepozná. Inspekce bytu obvykle stojí 5 000 až 8 000 Kč, u velkého rodinného domu více a trvá až kolem 4 hodin. Náklad se vrátí buď v podobě slevy z ceny, nebo tím, že od rizikové koupě odstoupíte.',
  },
  {
    q: 'Na co si dát pozor v rezervační smlouvě?',
    a: 'Kdo je druhou smluvní stranou (realitní kancelář, nebo přímo prodávající), jak vysoký je rezervační poplatek (obvykle 3 až 5 % ceny), za jakých podmínek se vrací a kdy propadá. Klíčové je ošetřit situaci, kdy nezískáte hypotéku. Rezervační smlouvu i kupní smlouvu si nechte projít dřív, než je podepíšete.',
  },
  {
    q: 'Na co si dát pozor při koupi domu v Příbrami a okolí konkrétně?',
    a: 'Kromě běžných kontrol prověřte v územním plánu a u obce možné poddolování a starou důlní činnost v některých lokalitách, radonové riziko v podloží, u okrajových částí a chalup v Brdech napojení na inženýrské sítě versus studna a jímka, a soulad skutečného stavu domu s katastrem a stavební dokumentací (přístavby, zimní zahrady bez povolení).',
  },
];
```

**JSON-LD (FAQPage):** generovat přes `injectJsonLd` z `faqItems`.

---

## ARTICLE SCHEMA

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Na co si dát pozor při koupi bytu nebo domu v Příbrami: kompletní kontrolní seznam",
  "description": "Kontrolní seznam před koupí bytu nebo domu v Příbrami: právní stav v katastru, věcná břemena a exekuce, skryté vady, energetický štítek, rezervační smlouva a úschova.",
  "image": "https://radek-vetrovsky.cz/assets/na-co-pozor-koupe-pribram.webp",
  "author": {
    "@type": "Person",
    "name": "Radek Větrovský",
    "jobTitle": "Realitní makléř",
    "url": "https://radek-vetrovsky.cz",
    "telephone": "+420721855854",
    "email": "radek.vetrovsky@re-max.cz"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Radek Větrovský - RE/MAX",
    "logo": { "@type": "ImageObject", "url": "https://radek-vetrovsky.cz/images/logo.png" }
  },
  "datePublished": "2026-09-XX",
  "dateModified": "2026-09-XX",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://radek-vetrovsky.cz/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram"
  }
}
```

**JSON-LD (BreadcrumbList):**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Domů", "item": "https://radek-vetrovsky.cz/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://radek-vetrovsky.cz/clanky" },
    { "@type": "ListItem", "position": 3, "name": "Na co si dát pozor při koupi nemovitosti v Příbrami" }
  ]
}
```

---

## AUTHOR BOX

> **O autorovi**
>
> Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Zastupuje kupující při koupi bytů, domů a pozemků v Příbrami a celém okrese, včetně prověření právního a technického stavu, kontroly smluvní dokumentace a vyjednání kupní ceny.
>
> - 📞 [+420 721 855 854](tel:+420721855854)
> - ✉️ [radek.vetrovsky@re-max.cz](mailto:radek.vetrovsky@re-max.cz)
> - 🌐 Zahradnická 550, 261 01 Příbram III — [radek-vetrovsky.cz](https://radek-vetrovsky.cz)

---

## CTA

> ### Kupujete v Příbrami a chcete mít jistotu, že nekupujete problém?
>
> Prověřím právní i technický stav nemovitosti, projdu s Vámi smlouvy, ohlídám úschovu a vyjednám cenu. Vy se soustředíte na to, jestli je to Váš domov.
>
> **[Zastoupení kupujícího zdarma poradenství](/sluzby/koupe-nemovitosti-pribram)** &nbsp; **[📞 +420 721 855 854](tel:+420721855854)**

---

## ASSETS (poznámka pro implementaci, není součástí publikovaného textu)

- Nová komponenta `BlogNaCoPozorKoupe.tsx`, routa v `App.tsx` (`/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram`), záznam do `allArticles` v `src/components/Blog.tsx`.
- Recyklovat vzory z `BlogKatastr.tsx` a `BlogRezervaceUschova.tsx` (číslované kroky, varovné boxy, stepper).
- Navrhované vlastní vizuály (jen návrh, ne hotové JSX):
  1. Tabulka právních vad (6 řádků, 4 sloupce).
  2. Srovnávací dvousloupcový box byt vs. dům.
  3. Volitelný sloupcový graf nákladů kontrol.
- Hero obrázek do `src/components/Blog.tsx` (`naCoPozorKoupeImage`).
- Zvážit ke stažení PDF checklist (lead magnet do newsletteru).
- Přidat zpětné odkazy z `/sluzby/koupe-nemovitosti-pribram`, `BlogNovostavby.tsx`, `BlogKatastr.tsx`, `BlogRezervaceUschova.tsx`, `BlogCenovaMapaPribram.tsx` (viz Internal Link Architecture).
- **Před psaním finálního textu ověřit u Radka:** konkrétní lokální rizika, která chce zdůraznit (poddolování v Příbrami, radon), a jestli může doplnit anonymizované příklady z praxe. Poddolování a radon v konkrétních lokalitách ověřit u obce nebo v územním plánu, netvrdit paušálně.

---

## ZDROJE (ověřeno 3. září 2026)

- [Na co si dát pozor při koupi starší nemovitosti — Právní prostor](https://www.pravniprostor.cz/clanky/obcanske-pravo/na-co-si-dat-pozor-pri-koupi-starsi-nemovitosti) (právní vady, LV, plomba, věcná břemena)
- [Na co si dát pozor při koupi nemovitosti — Dostupný advokát](https://dostupnyadvokat.cz/blog/ln_na_co_si_dat_pozor_pri_koupi_nemovitosti) (právní stav, zástava, exekuce, úschova)
- [Skryté vady bytu: na co si dát pozor při koupi i pronájmu — Bezrealitky.cz](https://www.bezrealitky.cz/blog/skryte-vady) (odpovědnost prodávajícího za skryté vady)
- [Na co si dát pozor při koupi bytu — ČSOB Pojišťovna](https://www.csobpoj.cz/blog/na-co-si-dat-pozor-pri-koupi-bytu) (fond oprav, technický stav, měsíční náklady)
- [Ceník inspekce nemovitostí — stavnemovitosti.cz](https://stavnemovitosti.cz/cenik-stavnemovitosti-cz-profesionalni-inspekce-a-kontrola-nemovitosti/) (ceny 5 000 až 8 000 Kč u bytu, délka inspekce, termovize)
- [Technická inspekce nemovitosti před koupí — Jakub Žižka](https://www.jakubzizka.cz/technicka-inspekce-nemovitosti-pred-koupi/) (rozsah technické kontroly)
- Interní: [Katastr nemovitostí 2026: konec anonymního nahlížení](https://radek-vetrovsky.cz/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni)
- Interní: [Rezervační smlouva a úschova kupní ceny](https://radek-vetrovsky.cz/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026) (poplatek 3 až 5 %, úschova od cca 3 000 Kč)
- Interní: [Energetický štítek (PENB) při prodeji nemovitosti](https://radek-vetrovsky.cz/blog/penb-pri-prodeji-nemovitosti-2026) (zpřísnění metodiky 2025)
- Interní: [Cenová mapa Příbram 2026](https://radek-vetrovsky.cz/blog/cenova-mapa-pribram-2026) (ceny bytů, charakter zástavby podle čtvrtí)
- Interní: servisní stránka [Koupě nemovitosti Příbram](https://radek-vetrovsky.cz/sluzby/koupe-nemovitosti-pribram) (due diligence, prověření LV, advokátní úschova, vyjednání slevy)
- K ověření pro lokální sekci: územní plán města Příbram a evidence poddolovaných území ČGS (Česká geologická služba), radonová mapa ČR
