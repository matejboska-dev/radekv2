# Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami – kompletní balíček pro radek-vetrovsky.cz

Připraveno podle struktury existujících článků (`BlogHypoteky.tsx`, `BlogProdejGarsonky.tsx`, `BlogInvesticniNemovitosti.tsx`). Slug: `kolik-si-muzu-dovolit-hypoteka-pribram`, cesta `/blog/kolik-si-muzu-dovolit-hypoteka-pribram`. Bez em dashů a spojovníků v textu (rozmezí přes „až", jinak čárka nebo spojka). Oslovení vykáním s velkým „Vy/Vás/Vám".

**Kontext a účel:** Buyer side protějšek k trackeru [aktuální hypoteční sazby](/blog/hypotecni-sazby-pribram-mesicni-prehled) a k článku [hypoteky-cerven-2026](/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram) (ten je pro prodávající). Tento článek učí kupujícího spočítat si, na jak drahou nemovitost v Příbrami reálně dosáhne, podle příjmu, vlastních úspor, věku a stávajících závazků. Přivádí kupující k odborné pomoci s výběrem a financováním přes [/sluzby/koupe-nemovitosti-pribram](/sluzby/koupe-nemovitosti-pribram). Silně propojuje na cenovou mapu, novostavby a garsonky (převod „dostupná částka" na „co si za ni v Příbrami koupím").

**Rozlišení od existujícího obsahu (bez kanibalizace):**
- Tracker sazeb cílí na „aktuální hypoteční sazby". Tento článek cílí na „kolik si můžu dovolit", „výpočet hypotéky podle příjmu", „maximální hypotéka". Jiný keyword, jiný záměr.
- Článek hypoteky-cerven-2026 je pro prodávající a je bodová analýza. Tento je pro kupující a je evergreen návod.
- Vzájemně provázat všechny tři jako cluster „financování nemovitosti v Příbrami".

**Poznámka k datům (ověřit k datu publikace, platí k 3. září 2026):**
- Aktuální sazba pro modelové výpočty: nabízená ~5,4 % (Swiss Life Hypoindex srpen 2026), sjednaná ~4,9 % (ČBA Hypomonitor červenec 2026). Do publikace srovnat s trackerem.
- Pravidla ČNB: LTV 80 % (90 % do 36 let), DTI a DSTI pro vlastní bydlení deaktivované od 2024, banky drží interní DSTI 40 až 45 %; investiční hypotéky od 1. 4. 2026 LTV 70 %, DTI 7. Před publikací ověřit, že ČNB limity mezitím znovu nezapnula.

---

## Template

**Doporučeno:** `how-to-guide` („jak spočítat dosažitelnou hypotéku ve 4 krocích"), s velkým podílem modelových příkladů a jednoduchou logikou výpočtu. Sekundárně prvky `faq-knowledge`.

**Template soubor:** `skills/blog/templates/how-to-guide.md`

---

## Target Keywords

- **Primary:** `kolik si můžu dovolit hypotéku` (celostátní, střední až vysoký objem; konkurence srovnávače a kalkulačky; lokální diferenciace přes „co si za to koupím v Příbrami")
- **Secondary:** `výpočet hypotéky podle příjmu`, `maximální výše hypotéky`, `na jakou hypotéku dosáhnu`, `kolik si můžu půjčit na byt`, `dostupná hypotéka`, `bonita na hypotéku`
- **Long tail / lokální:** `kolik stojí byt v Příbrami hypotéka`, `hypotéka podle příjmu 2026`, `splátka hypotéky kolik čistého příjmu`
- **Questions (People Also Ask, nebylo přímo ověřeno v SERP):**
  - „Jaký příjem potřebuji na hypotéku 4 miliony?"
  - „Kolik procent příjmu může jít na splátku hypotéky?"
  - „Kolik vlastních peněz potřebuji k hypotéce?"
  - „Do kolika let musí být hypotéka splacená?"
  - „Pomůže spolužadatel k vyšší hypotéce?"
  - „Kolik si půjčím na byt v Příbrami s příjmem 45 000 Kč?"

## Search Intent

**Informační** s vysokým komerčním potenciálem, blízko transakčnímu. Uživatel má nějaký příjem a úspory a chce vědět jedno číslo: „na co dosáhnu". Chce jednoduchý výpočet, ne finanční přednášku, a pak potvrzení, jestli mu to stačí na konkrétní typ bydlení v Příbrami. Rychlá odpověď nahoře musí dát vzoreček (kolik příjmu na splátku, kolik vlastních zdrojů, kolik let) a jeden konkrétní příklad převedený na příbramský byt.

## Content Parameters

- **Word count:** 2 000 až 2 600 slov (návod + modelové příklady + lokální převod)
- **Reading level:** laik, každý pojem vysvětlit (LTV, DSTI, DTI, bonita, fixace, anuita, spolužadatel, LTI)
- **Formát:** TSX komponenta `BlogKolikSiMuzuDovolit.tsx`, prvky jako v `BlogHypoteky.tsx` (stat karty, sloupcové grafy, tabulka scénářů) a `BlogProdejGarsonky.tsx` (MortgageStats grid)
- **H2 sekcí:** 7 až 8
- **Obrázky:** 1 hero (kalkulačka, rozpočet, klíče, pár u stolu), zbytek vlastní grafika
- **Grafy/vizuály:** 3 až 4 (tabulka „příjem → maximální splátka → přibližná výše úvěru → přibližná kupní cena", sloupcový „co si za dostupnou částku koupím v Příbrami" napojený na cenovou mapu, stat karty s limity ČNB, volitelně vliv doby splatnosti a spolužadatele na dostupnou částku)
- **FAQ:** 5 položek
- **Datum:** „Aktualizováno: [měsíc rok]"

## Recommended Title

**Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami**

Alternativy:
1. Na jakou hypotéku dosáhnu a co si za ni koupím v Příbrami (2026)
2. Výpočet hypotéky podle příjmu: kolik dáte za byt nebo dům v Příbrami

Meta title (do 60 znaků): `Kolik si můžu dovolit? Výpočet hypotéky pro Příbram`

## Meta Description

`Jak si spočítat dosažitelnou hypotéku podle příjmu, úspor a věku. Limity ČNB 2026 (LTV 80 a 90 %), pravidlo DSTI a modelové příklady převedené na ceny bytů a domů v Příbrami.`

## TL;DR Draft (blok „Rychlá odpověď")

> **Rychlá odpověď:** Dosažitelnou hypotéku spočítáte ze čtyř vstupů. Za prvé: na splátku všech úvěrů by mělo jít maximálně zhruba 40 až 45 % čistého měsíčního příjmu (pravidlo DSTI, které si banky drží interně, i když ho ČNB pro vlastní bydlení plošně nevyžaduje). Za druhé: potřebujete vlastní zdroje alespoň 20 % z kupní ceny (LTV 80 %), žadatelé do 36 let na první vlastní bydlení až 10 % (LTV 90 %). Za třetí: celkové zadlužení by nemělo přesáhnout zhruba osminásobek čistého ročního příjmu (DTI). Za čtvrté: hypotéka musí být splacená do 70 až 75 let věku nejstaršího žadatele, běžná splatnost je 30 let. Příklad: čistý příjem domácnosti 60 000 Kč, žádné jiné úvěry, splátka do zhruba 24 000 Kč, při sazbě kolem 5,4 % a splatnosti 30 let to odpovídá úvěru přibližně 4 mil. Kč. S vlastními 20 % je to kupní cena kolem 5 mil. Kč, za což v Příbrami pořídíte byt 3+1 nebo menší dům mimo centrum. Spolužadatel a delší splatnost dostupnou částku zvýší, jiné splátky a věk ji snižují.

## Information Gain Opportunities

- **[ORIGINAL DATA / vlastní kalkulace]:** Tabulka „příjem → dostupná hypotéka → co si za to koupím v Příbrami" pro 4 až 5 profilů domácností (jednotlivec 40 000, pár 60 000, pár 90 000, rodina 110 000 Kč čistého) při aktuální sazbě a splatnosti 30 let, s převodem na konkrétní příbramský produkt (garsonka / 2+1 / 3+1 / řadový dům / samostatný dům). Srovnávače dělají obecnou kalkulačku, nikdo nedělá lokální převod.
- **[UNIQUE INSIGHT]:** „Limit není sazba, limit je splátka." Ukázat, jak stejný příjem unese jinou kupní cenu podle sazby (4,0 % vs. 5,4 %) a jak dražší hypotéky za rok 2026 zúžily dostupnost, konkrétně o kolik korun kupní ceny.
- **[UNIQUE INSIGHT]:** Proč Příbram vychází jako rozumná volba i při drahých hypotékách: nižší kupní cena znamená nižší jistinu a splátku, takže na příbramský byt 3+1 dosáhne domácnost, která by v Praze nedosáhla ani na 2+kk. Doložit čísly.
- **[UNIQUE INSIGHT]:** Časté chyby ve vlastním výpočtu: lidé zapomínají na rezervu na vedlejší náklady koupě (daň z nemovitosti, pojištění, fond oprav, návrh na vklad, případně rekonstrukce), počítají s hrubým místo čistého příjmu, nezapočítají leasing nebo kreditku, nebo počítají s nereálně nízkou sazbou.
- **[PERSONAL EXPERIENCE]** jen pokud Radek doplní: jak často kupující v jeho zakázkách zjistí až u banky, že dosáhnou na míň, než čekali, a jak tomu předchází předschválení. Bez doložení psát obecně.

## Content Outline

### Úvod
- Hook: většina lidí začne hledat nemovitost dřív, než ví, kolik jim banka půjčí, a pak se zklame.
- Problém: dostupná hypotéka není jedno číslo z kalkulačky, závisí na příjmu, úsporách, věku a závazcích, a limituje ji splátka, ne sazba.
- Slib: jednoduchý výpočet ve čtyřech krocích a převod výsledku na konkrétní bydlení v Příbrami.
- Box Rychlá odpověď za úvod.

### H2: Čtyři čísla, která rozhodují: DSTI, LTV, DTI a doba splatnosti
- **Answer-first:** „Dostupnou hypotéku určuje splátka jako podíl příjmu (DSTI), poměr úvěru k ceně nemovitosti (LTV), celkové zadlužení k ročnímu příjmu (DTI) a maximální doba splácení daná věkem."
- Každý ukazatel vysvětlit jednou větou a číslem:
  - **DSTI:** kolik procent čistého měsíčního příjmu spolykají všechny splátky. ČNB ho pro vlastní bydlení plošně nevyžaduje, banky si drží interně 40 až 45 %.
  - **LTV:** kolik z ceny kryje úvěr. Max 80 %, u žadatelů do 36 let na první bydlení až 90 %. Investiční nemovitost jen 70 % od dubna 2026.
  - **DTI:** celkový dluh k čistému ročnímu příjmu, doporučení kolem 8 (7 u investičních).
  - **Doba splatnosti:** hypotéka splacená do 70 až 75 let nejstaršího žadatele, běžně 30 let, delší splatnost snižuje splátku, ale zvyšuje celkový přeplatek.
- **Vizuál:** stat karty (jako `MortgageStats` v `BlogProdejGarsonky.tsx`): LTV 80/90 %, DSTI ~40 až 45 %, DTI ~8, splatnost do 70 až 75 let.
- Odkaz na [aktuální hypoteční sazby](/blog/hypotecni-sazby-pribram-mesicni-prehled).

### H2: Krok 1: Kolik unese Váš příjem (výpočet splátky)
- **Answer-first:** „Vezměte čistý měsíční příjem domácnosti, odečtěte splátky stávajících úvěrů a z toho, co zbývá, počítejte maximálně 40 až 45 % na splátku hypotéky."
- Co se počítá do příjmu (mzda, dlouhodobé OSVČ příjmy podle daňového přiznání, rodičovská jen omezeně, některé banky part time a nájem z jiné nemovitosti).
- Co snižuje: spotřebák, leasing, kreditní karta a kontokorent (banka počítá i nevyčerpaný rámec), počet vyživovaných dětí (životní minimum).
- Příklad výpočtu splátky pro tři profily.

### H2: Krok 2: Ze splátky na výši úvěru
- **Answer-first:** „Z maximální splátky, aktuální sazby a doby splatnosti se přes anuitní vzorec dopočítá výše úvěru. Při sazbě kolem 5,4 % a 30 letech odpovídá splátce 20 000 Kč úvěr zhruba 3,4 mil. Kč."
- **Vizuál:** tabulka „splátka → výše úvěru" pro sazby 4,5 %, 5,0 %, 5,4 % a splatnosti 25 a 30 let.
- Ukázat citlivost na sazbu: stejná splátka unese při 4,5 % vyšší úvěr než při 5,4 %, rozdíl v kupní ceně jsou stovky tisíc.
- **Key stat:** modelová splátka 3,5 mil. Kč na 25 let při aktuální nabízené sazbě = 21 327 Kč (Swiss Life Hypoindex, srpen 2026); průměrná velikost nové hypotéky v ČR 4,59 mil. Kč (ČBA Hypomonitor 2026).

### H2: Krok 3: Kolik vlastních peněz potřebujete (LTV)
- **Answer-first:** „K výši úvěru přidejte vlastní zdroje. Standardně 20 % z kupní ceny, do 36 let na první bydlení stačí 10 %."
- Co se počítá jako vlastní zdroje (úspory, stavební spoření, dar od rodičů, prodej jiné nemovitosti, družstevní podíl jen omezeně).
- Nezapomenout na rezervu nad rámec akontace: daň z nemovitosti, pojištění nemovitosti (banka ho vyžaduje), návrh na vklad 2 000 Kč, odhad nemovitosti pro banku, případně provize a rekonstrukce.
- **Key stat:** investiční nemovitost (koupě k pronájmu, třetí a další) potřebuje od 1. 4. 2026 vlastních 30 % (LTV 70 %); odkaz na [investiční nemovitosti Příbram](/blog/investicni-nemovitosti-pribram).

### H2: Krok 4: Co si za dostupnou částku koupíte v Příbrami
- **Answer-first:** „Sečtěte výši úvěru a vlastní zdroje, to je Vaše maximální kupní cena. V Příbrami je za ni citelně víc bydlení než v Praze."
- **Vizuál:** hlavní tabulka článku: 4 až 5 profilů domácností → dostupná kupní cena → konkrétní příbramský produkt (garsonka, 2+1, 3+1, řadový dům, samostatný dům).
- Napojení na ceny: byty v Příbrami 60 000 až 100 000 Kč/m², novostavby od 130 000, garsonky 100 000 až 140 000, rodinné domy ve Středočeském kraji kolem 70 000 Kč/m². Odkazy na [cenovou mapu](/blog/cenova-mapa-pribram-2026), [novostavby](/blog/novostavby-pribram-2026-kde-se-stavi), [prodej garsonky](/blog/prodej-garsonky-maleho-bytu-pribram-2026), [jak prodat rodinný dům](/blog/jak-prodat-rodinny-dum-pribram) (pro ceny domů).
- **Key stat / insight:** domácnost, která v Praze dosáhne na 2+kk, v Příbrami dosáhne na 3+1 nebo menší dům; dojezd do Prahy Smíchov autobusem zhruba hodinu.

### H2: Jak dostupnou částku zvýšit (legálně a rozumně)
- **Answer-first:** „Dostupnost zvednete spolužadatelem, delší splatností, konsolidací drahých úvěrů před žádostí, vyšší akontací nebo lepší nabídkou banky přes hypotečního specialistu."
- Spolužadatel: druhý příjem výrazně pomůže, ale svazuje oba; možnost přizvat rodiče jen jako spoludlužníky.
- Delší splatnost: nižší splátka, ale vyšší celkový přeplatek a limit věku.
- Vyčištění závazků: zrušit nevyužívanou kreditku a kontokorent před žádostí.
- Nespoléhat na „počkám na nižší sazbu": mezitím rostou ceny nemovitostí (v 1. pololetí 2026 v mnoha regionech dvouciferně meziročně).
- **Vizuál (volitelně):** sloupce „vliv na dostupnou částku": +spolužadatel, +5 let splatnosti, minus kreditní karta, minus jiná splátka.

### H2: Časté chyby ve vlastním výpočtu
- **Answer-first:** „Nejčastější omyly: počítat s hrubým místo čistého příjmu, s nereálně nízkou sazbou, zapomenout na kreditku a leasing a nepočítat s rezervou na vedlejší náklady koupě."
- Krátký seznam s vysvětlením každé chyby.
- Doporučení: nechat si udělat předschválení hypotéky ještě před hledáním nemovitosti a před podpisem rezervace; odkaz na [na co si dát pozor při koupi](/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram) a [rezervační smlouvu](/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026).

### Klíčové body k zapamatování
- Dostupnou hypotéku limituje splátka, ne sazba: na splátky všech úvěrů počítejte maximálně 40 až 45 % čistého příjmu.
- Vlastní zdroje: 20 % z ceny standardně, 10 % pro žadatele do 36 let na první bydlení, 30 % pro investiční nemovitost.
- Celkové zadlužení by nemělo přesáhnout zhruba osminásobek čistého ročního příjmu.
- Hypotéka musí být splacená do 70 až 75 let, běžná splatnost je 30 let.
- Při sazbě kolem 5,4 % a splatnosti 30 let odpovídá splátce 20 000 Kč úvěr zhruba 3,4 mil. Kč.
- Za stejnou dostupnou částku koupíte v Příbrami výrazně víc bydlení než v Praze.
- Dostupnost zvýší spolužadatel, delší splatnost a vyčištění drahých úvěrů; sníží ji jiné splátky a věk.
- Nejčastější chyba je počítat s hrubým příjmem, nízkou sazbou a bez rezervy na vedlejší náklady.

### FAQ (viz FAQ SCHEMA)

### Shrnutí a co dělat dál
- 2 odstavce: rekapitulace čtyř kroků; nabídka, že Radek s kupujícím projde dostupnou částku i výběr nemovitosti v Příbrami a doporučí hypotečního specialistu.
- CTA na `/sluzby/koupe-nemovitosti-pribram`.

### Disclaimer (kurzívou)
„Článek má informativní charakter a vychází z pravidel a sazeb k srpnu 2026. Uvedené výpočty jsou ilustrační, konkrétní výši hypotéky vždy určí banka podle bonity žadatele, typu příjmu a své aktuální nabídky. Doporučujeme konzultaci s hypotečním specialistou. Autor neodpovídá za škody vzniklé na základě interpretace tohoto textu bez odborné konzultace."

### Přečtěte si také
- Hypoteční sazby a Příbram: aktuální přehled (aktualizováno měsíčně)
- Cenová mapa Příbram 2026: kolik stojí nemovitosti v jednotlivých čtvrtích?
- Na co si dát pozor při koupi bytu nebo domu v Příbrami

## Statistics to Include

| # | Statistika / fakt | Zdroj | Období | Sekce |
|---|-------------------|-------|--------|-------|
| 1 | Banky si interně drží DSTI kolem 40 až 45 % čistého příjmu, přestože ČNB limit pro vlastní bydlení od 2024 plošně nevyžaduje | najemnebokoupe.cz; hyponamiru.cz | 2026 | H2: Čtyři čísla / Krok 1 |
| 2 | LTV max 80 %, do 36 let na první bydlení až 90 %; investiční nemovitost od 1. 4. 2026 jen 70 % | ČNB; najemnebokoupe.cz | 2026 | H2: Čtyři čísla / Krok 3 |
| 3 | DTI doporučení kolem 8násobku čistého ročního příjmu (7 u investičních) | ČNB; hyponamiru.cz | 2026 | H2: Čtyři čísla |
| 4 | Banky nenastaví splácení za hranici 70 až 75 let věku nejstaršího žadatele | usetreno.cz; fingo.cz | 2026 | H2: Čtyři čísla |
| 5 | Modelová splátka 3,5 mil. Kč / 25 let / LTV 80 % = 21 327 Kč při nabízené sazbě | Swiss Life Hypoindex | srpen 2026 | Krok 2 |
| 6 | Nabízená sazba ~5,42 % (Swiss Life Hypoindex), sjednaná ~4,90 % (ČBA Hypomonitor) | Swiss Life Hypoindex; ČBA Hypomonitor | srpen / červenec 2026 | Krok 2 |
| 7 | Průměrná velikost nové hypotéky v ČR 4,59 mil. Kč | ČBA Hypomonitor | 2026 YTD | Krok 2 |
| 8 | Ceny bytů v Příbrami 60 000 až 100 000 Kč/m², novostavby od 130 000, garsonky 100 000 až 140 000 | interní cenová mapa a článek o garsonkách | 2026 | Krok 4 |
| 9 | Rodinné domy Středočeský kraj ~70 000 Kč/m², +6,5 % r/r | Hypoindex.cz / Deloitte Real Index | květen 2026 | Krok 4 |
| 10 | Ceny bytů v 1. pololetí 2026 v mnoha regionech rostly dvouciferně meziročně navzdory drahým hypotékám | Hypoindex.cz; tomaskopa.cz | 2026 | H2: Jak dostupnost zvýšit |
| 11 | Kolek za návrh na vklad 2 000 Kč; banka vyžaduje pojištění nemovitosti a odhad | interní článek o rezervační smlouvě | 2026 | Krok 3 |

## Evidence-Backed Section Plan

| Sekce | Hlavní tvrzení | Podpůrný důkaz | Zdroj |
|-------|----------------|----------------|-------|
| Čtyři čísla | Dostupnost určují DSTI, LTV, DTI, věk | konkrétní hodnoty limitů | ČNB, hypoteční poradny |
| Krok 1: Příjem | Na splátku max 40 až 45 % čistého | interní limity bank | najemnebokoupe.cz, hyponamiru.cz |
| Krok 2: Výše úvěru | Limit je splátka, ne sazba | tabulka splátka → úvěr podle sazby | anuitní výpočet + Swiss Life Hypoindex |
| Krok 3: Vlastní zdroje | 20 %, resp. 10 % do 36 let, 30 % investiční | pravidla LTV | ČNB |
| Krok 4: Co koupím v Příbrami | Za stejnou částku víc bydlení než v Praze | ceny bytů a domů v Příbrami vs. Praha | interní cenová mapa, Hypoindex.cz |
| Jak dostupnost zvýšit | Spolužadatel a splatnost pomůžou, čekání na sazbu ne | růst cen nemovitostí 2026 | Hypoindex.cz |
| Časté chyby | Hrubý příjem, nízká sazba, bez rezervy | výčet a vysvětlení | syntéza poradenských zdrojů |

## Cover Image

| Varianta | Detail |
|----------|--------|
| Foto | Unsplash/Pexels: „budget calculator couple", „mortgage planning table", „house keys savings" |
| Generované SVG | Jednoduchý vzoreček na gradientu („čistý příjem × 40 % = splátka") s titulkem; sanitizovat nebo rastrovat |
| Rozměr | 1200 x 630 (OG) |
| Uložení | `src/assets/kolik-si-muzu-dovolit-pribram.webp` nebo externí URL podle konvence |

## Visual Element Plan

| # | Typ | Data | Sekce |
|---|-----|------|-------|
| 1 | Stat karty (grid 4) | LTV 80/90 %, DSTI ~40 až 45 %, DTI ~8, splatnost do 70 až 75 let | H2: Čtyři čísla |
| 2 | Tabulka | splátka → výše úvěru pro sazby 4,5 / 5,0 / 5,4 % a splatnosti 25 / 30 let | Krok 2 |
| 3 | Hlavní tabulka článku | profil domácnosti → dostupná kupní cena → co za to koupím v Příbrami | Krok 4 |
| 4 (volitelně) | Sloupcový graf | vliv spolužadatele / delší splatnosti / kreditní karty na dostupnou částku | H2: Jak dostupnost zvýšit |

## Competitive Gaps to Exploit

1. Srovnávače nabízejí obecnou kalkulačku bez lokálního převodu. Nikdo neříká „s tímhle příjmem koupíte v Příbrami konkrétně tohle".
2. Většina článků neukazuje citlivost dostupné částky na sazbu (o kolik korun kupní ceny přišel kupující kvůli zdražení hypoték v roce 2026).
3. Chybí propojení „dostupná hypotéka → ceny v Příbrami → co si koupím" na jednom místě.
4. Autentický hlas makléře, který vidí, jak často kupující dosáhnou na míň, než čekali (pokud Radek doplní). E-E-A-T výhoda.
5. Aktuálnost 2026 (sazby, pravidla ČNB, ceny) vs. starší kalkulačkové články.

## Internal Link Architecture

- **Odkazovat NA (z tohoto článku):**
  1. [Hypoteční sazby a Příbram: aktuální přehled](/blog/hypotecni-sazby-pribram-mesicni-prehled) — anchor: „aktuální hypoteční sazby a jejich vývoj"
  2. [Cenová mapa Příbram 2026](/blog/cenova-mapa-pribram-2026) — anchor: „ceny bytů v jednotlivých čtvrtích Příbrami"
  3. [Novostavby v Příbrami 2026](/blog/novostavby-pribram-2026-kde-se-stavi) — anchor: „ceny nových bytů v Příbrami"
  4. [Prodej garsonky a malého bytu v Příbrami 2026](/blog/prodej-garsonky-maleho-bytu-pribram-2026) — anchor: „kolik stojí nejmenší byty v Příbrami"
  5. [Jak prodat rodinný dům v Příbrami](/blog/jak-prodat-rodinny-dum-pribram) — anchor: „ceny rodinných domů v regionu"
  6. [Investiční nemovitosti Příbram](/blog/investicni-nemovitosti-pribram) — anchor: „přísnější limity pro investiční hypotéky"
  7. [Na co si dát pozor při koupi nemovitosti v Příbrami](/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram) — anchor: „mít financování jisté před rezervací"
  8. [Rezervační smlouva a úschova kupní ceny](/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026) — anchor: „co se stane, když nezískáte hypotéku"
  9. [Zastoupení kupujícího při koupi nemovitosti v Příbrami](/sluzby/koupe-nemovitosti-pribram) — anchor: „výběr nemovitosti i pomoc s financováním"
- **Odkazovat Z (přidat odkaz na tento nový článek):**
  1. [hypotecni-sazby-pribram-mesicni-prehled](/blog/hypotecni-sazby-pribram-mesicni-prehled) — anchor: „kolik si reálně můžete půjčit"
  2. [hypoteky-cerven-2026-dopad-na-prodej-pribram](/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram) — sekce o kupujících, anchor: „jak si spočítat dosažitelnou hypotéku"
  3. [cenova-mapa-pribram-2026](/blog/cenova-mapa-pribram-2026) — anchor: „na jakou cenu dosáhnete s hypotékou"
  4. [prodej-garsonky-maleho-bytu-pribram-2026](/blog/prodej-garsonky-maleho-bytu-pribram-2026) — anchor: „kolik si můžete dovolit půjčit"
  5. [novostavby-pribram-2026-kde-se-stavi](/blog/novostavby-pribram-2026-kde-se-stavi) — anchor: „spočítejte si dosažitelnou hypotéku"
  6. [/sluzby/koupe-nemovitosti-pribram](/sluzby/koupe-nemovitosti-pribram) — sekce o financování, anchor: „jak spočítat, na co dosáhnete"
- **Pillar napojení:** hub „financování nemovitosti v Příbrami" (tracker sazeb + tento článek + hypoteky-cerven-2026)
- **Pozice v clusteru:** Spoke (informační), párový s trackerem sazeb

## E-E-A-T Signals to Include

- **Zkušenost:** jak často kupující v Radkových zakázkách zjistí u banky nižší dostupnou částku, než čekali, a jak tomu předchází předschválení (jen pokud Radek doplní konkrétní pozorování).
- **Odbornost:** realitní makléř RE/MAX Power 2, výběr nemovitosti a koordinace financování jako součást zastoupení kupujícího.
- **Autorita:** citace ČNB, ČBA Hypomonitor, Swiss Life Hypoindex, zavedené hypoteční poradny; jasné datum.
- **Důvěryhodnost:** ilustrační výpočty označené jako ilustrační, doporučení hypotečního specialisty, žádné partnerské odkazy na konkrétní banku, upozornění na rezervu na vedlejší náklady.

## Distribution Plan

- **Reddit:** r/czech, r/Praha, r/penize (pokud existuje), r/fican. Hodnotový komentář v postech „kolik si můžu dovolit půjčit", sdílet tabulku profilů.
- **YouTube:** video „Kolik si můžu dovolit? Výpočet hypotéky za 4 kroky" (6 až 8 min), kalkulace na obrazovce, převod na příbramský byt; thumbnail „Na jakou hypotéku dosáhnu?".
- **LinkedIn:** post s hlavní tabulkou profilů a jednou větou o Příbrami vs. Praze; cílit na mladé domácnosti a lidi stěhující se z Prahy.
- **Email:** newsletter s odkazem na kalkulaci a nabídkou konzultace, předmět „Kolik Vám banka půjčí a co za to koupíte v Příbrami", CTA na článek a na zastoupení kupujícího.
- **Twitter/X:** vlákno: (1) vzoreček ve 4 krocích, (2) limit je splátka, ne sazba, (3) tabulka splátka → úvěr podle sazby, (4) co koupíte v Příbrami za 5 mil., (5) časté chyby. Hashtagy #hypotéky #bydlení #Příbram.

---

## META

**Meta title:** `Kolik si můžu dovolit? Výpočet hypotéky pro Příbram`
**Meta description:** `Jak si spočítat dosažitelnou hypotéku podle příjmu, úspor a věku. Limity ČNB 2026 (LTV 80 a 90 %), pravidlo DSTI a modelové příklady převedené na ceny bytů a domů v Příbrami.`
**URL slug:** `kolik-si-muzu-dovolit-hypoteka-pribram`
**Canonical path:** `/blog/kolik-si-muzu-dovolit-hypoteka-pribram`

---

## FAQ SCHEMA

```
const faqItems = [
  {
    q: 'Kolik procent příjmu může jít na splátku hypotéky?',
    a: 'Banky si v roce 2026 interně drží pravidlo, že na splátky všech úvěrů dohromady (DSTI) by mělo jít maximálně zhruba 40 až 45 % čistého měsíčního příjmu domácnosti, i když ČNB tento limit pro hypotéky na vlastní bydlení od roku 2024 plošně nevyžaduje. Pokud tedy máte čistý příjem 60 000 Kč a žádné jiné úvěry, počítejte se splátkou hypotéky do zhruba 24 000 Kč.',
  },
  {
    q: 'Kolik vlastních peněz potřebuji k hypotéce v roce 2026?',
    a: 'Standardně minimálně 20 % z kupní ceny (maximální LTV 80 %). Žadatelé do 36 let, kteří kupují první vlastní bydlení, mohou dosáhnout na LTV až 90 %, tedy vlastní zdroje 10 %. Pro investiční nemovitost (třetí a další nebo koupě k pronájmu) platí od 1. dubna 2026 přísnější limit LTV 70 %, tedy vlastních 30 %. Nad rámec akontace počítejte s rezervou na daň z nemovitosti, pojištění, odhad a návrh na vklad.',
  },
  {
    q: 'Jaký příjem potřebuji na hypotéku 4 miliony Kč?',
    a: 'Orientačně: úvěr 4 mil. Kč na 30 let při sazbě kolem 5,4 % znamená splátku přibližně 22 000 až 23 000 Kč měsíčně. Aby splátka nepřesáhla 45 % čistého příjmu a banka měla rezervu, potřebuje domácnost čistý měsíční příjem zhruba od 50 000 Kč výše a žádné velké jiné splátky. Konkrétní částku vždy posoudí banka podle typu příjmu, počtu dětí a stávajících závazků.',
  },
  {
    q: 'Do kolika let musí být hypotéka splacená?',
    a: 'Banky nastavují splatnost tak, aby úvěr byl splacený nejpozději v 70 až 75 letech věku nejstaršího žadatele. Běžná splatnost je 30 let, maximum obvykle 30 až 40 let podle banky a věku. Delší splatnost snižuje měsíční splátku, a tím zvyšuje dosažitelnou částku, zároveň ale roste celkový přeplatek na úrocích.',
  },
  {
    q: 'Co si za dosažitelnou hypotéku koupím v Příbrami?',
    a: 'Za kupní cenu kolem 3 mil. Kč pořídíte v Příbrami garsonku nebo menší byt, kolem 4 až 5 mil. Kč byt 2+1 až 3+1 podle lokality a stavu, kolem 6 až 9 mil. Kč řadový nebo menší samostatný dům mimo centrum. Ceny bytů v Příbrami se pohybují mezi 60 000 a 100 000 Kč za m², novostavby od 130 000 Kč za m². Za stejnou částku je v Příbrami výrazně víc bydlení než v Praze, kde ceny bytů startují nad 140 000 Kč za m².',
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
  "headline": "Kolik si můžu dovolit? Jak spočítat dosažitelnou hypotéku v Příbrami",
  "description": "Výpočet dosažitelné hypotéky podle příjmu, úspor a věku. Limity ČNB 2026 a modelové příklady převedené na ceny bytů a domů v Příbrami.",
  "image": "https://radek-vetrovsky.cz/assets/kolik-si-muzu-dovolit-pribram.webp",
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
    "@id": "https://radek-vetrovsky.cz/blog/kolik-si-muzu-dovolit-hypoteka-pribram"
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
    { "@type": "ListItem", "position": 3, "name": "Kolik si můžu dovolit? Výpočet hypotéky pro Příbram" }
  ]
}
```

---

## AUTHOR BOX

> **O autorovi**
>
> Radek Větrovský je realitní makléř působící pod značkou RE/MAX Power 2 v Příbrami a Praze. Zastupuje kupující při koupi bytů a domů v Příbrami a okrese, včetně výběru nemovitosti podle rozpočtu a koordinace financování s hypotečním specialistou.
>
> - 📞 [+420 721 855 854](tel:+420721855854)
> - ✉️ [radek.vetrovsky@re-max.cz](mailto:radek.vetrovsky@re-max.cz)
> - 🌐 Zahradnická 550, 261 01 Příbram III — [radek-vetrovsky.cz](https://radek-vetrovsky.cz)

---

## CTA

> ### Chcete vědět, na jakou nemovitost v Příbrami reálně dosáhnete?
>
> Projdu s Vámi dostupnou částku, doporučím hypotečního specialistu a pomůžu vybrat nemovitost, která sedne do rozpočtu i do Vašich plánů.
>
> **[Domluvit konzultaci zdarma](/sluzby/koupe-nemovitosti-pribram)** &nbsp; **[📞 +420 721 855 854](tel:+420721855854)**

---

## ASSETS (poznámka pro implementaci, není součástí publikovaného textu)

- Nová komponenta `BlogKolikSiMuzuDovolit.tsx`, routa v `App.tsx` (`/blog/kolik-si-muzu-dovolit-hypoteka-pribram`), záznam do `allArticles` v `src/components/Blog.tsx`.
- Recyklovat komponenty z `BlogHypoteky.tsx` (stat karty, sloupcové grafy, tabulky scénářů) a `MortgageStats` z `BlogProdejGarsonky.tsx`.
- Navrhované vlastní vizuály (jen návrh):
  1. Grid stat karet s limity ČNB.
  2. Tabulka splátka → výše úvěru podle sazby a splatnosti.
  3. Hlavní tabulka profil domácnosti → dostupná cena → příbramský produkt.
  4. Volitelný sloupcový graf vlivu spolužadatele a splatnosti.
- Zvážit jednoduchou interaktivní mini kalkulačku (příjem, úspory, věk, jiné splátky → orientační dostupná částka) jako React komponentu; pokud ano, výsledek vždy označit jako orientační a nesbírat žádná osobní data.
- Hero obrázek do `src/components/Blog.tsx` (`kolikSiMuzuDovolitImage`).
- Přidat zpětné odkazy z trackeru sazeb, `BlogHypoteky.tsx`, `BlogCenovaMapaPribram.tsx`, `BlogProdejGarsonky.tsx`, `BlogNovostavby.tsx`, `/sluzby/koupe-nemovitosti-pribram` (viz Internal Link Architecture).
- **Před psaním finálního textu ověřit:** aktuální sazby (sladit s trackerem), že ČNB neobnovila plošné limity DSTI/DTI, a přepočet všech ilustračních splátek anuitním vzorcem (zaokrouhlit na stovky Kč, stejně jako v `BlogHypoteky.tsx`).

---

## ZDROJE (ověřeno 3. září 2026, sazby před publikací sladit s trackerem)

- [Kolik potřebuji vlastních peněz na hypotéku? LTV, příjem a limity ČNB 2026 — najemnebokoupe.cz](https://najemnebokoupe.cz/clanky/kolik-vlastnich-penez-na-hypoteku.html) (LTV 80/90 %, DTI 8, interní DSTI bank 40 až 45 %)
- [Na jak vysokou hypotéku dosáhnete? — Ušetřeno.cz](https://www.usetreno.cz/clanky/jak-vysokou-mi-daji-hypoteku/) (příjem, bonita, věk a doba splácení do 70 až 75 let)
- [Kalkulačka: na jak vysokou hypotéku dosáhnete podle příjmu — FinGO.cz](https://www.fingo.cz/blog/hypoteka-podle-prijmu/) (výpočet podle příjmu, spolužadatel)
- [Pravidla a podmínky pro hypotéky 2026 — hyponamiru.cz](https://www.hyponamiru.cz/nova-pravidla-pro-hypoteky-od-1-4-2022/) (limity ČNB, DTI, DSTI, LTV)
- [ČNB doporučuje přísnější limity pro investiční hypotéky — Česká národní banka](https://www.cnb.cz/cs/cnb-news/tiskove-zpravy/CNB-doporucuje-prisnejsi-limity-pro-investicni-hypoteky.-Kapitalove-rezervy-se-nemeni/) (LTV 70 %, DTI 7 od 1. 4. 2026)
- [Swiss Life Hypoindex srpen 2026 — FXstreet.cz](https://www.fxstreet.cz/zpravodajstvi-205651.html) (nabízená sazba 5,42 %, modelová splátka 21 327 Kč za 3,5 mil. na 25 let)
- [Průměrná úroková sazba nových hypoték — ČBA Monitor](https://www.cbamonitor.cz/statistika/prumerna-urokova-sazba-novych-hypotek) (sjednaná sazba 4,90 % červenec 2026, průměrná velikost hypotéky 4,59 mil. Kč)
- [Realitní trh v roce 2026: proč byty dál zdražují — Tomáš Kopa](https://tomaskopa.cz/blog/realitni-trh-2026-ceny-bytu-najmy-vyvoj/) (dvouciferný meziroční růst cen bytů navzdory drahým hypotékám)
- Interní: [Hypoteční sazby a Příbram: aktuální přehled](https://radek-vetrovsky.cz/blog/hypotecni-sazby-pribram-mesicni-prehled) (aktuální sazby, pravidla ČNB)
- Interní: [Cenová mapa Příbram 2026](https://radek-vetrovsky.cz/blog/cenova-mapa-pribram-2026) (ceny bytů 60 000 až 100 000 Kč/m², Praha od 140 000)
- Interní: [Prodej garsonky a malého bytu v Příbrami 2026](https://radek-vetrovsky.cz/blog/prodej-garsonky-maleho-bytu-pribram-2026) (garsonky 100 000 až 140 000 Kč/m², model splátky)
- Interní: [Novostavby v Příbrami 2026](https://radek-vetrovsky.cz/blog/novostavby-pribram-2026-kde-se-stavi) (novostavby od 130 000 Kč/m²)
- Interní: [Hypotéky červen 2026 a dopad na prodej v Příbrami](https://radek-vetrovsky.cz/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram) (metodika, ilustrační výpočet splátky, pravidla ČNB)

**Poznámka k výpočtům:** Všechny ilustrační splátky a přepočty „splátka → výše úvěru" jsou vlastní anuitní kalkulace autora, ne převzatá statistika. Při psaní ověřit, sladit sazby s trackerem a zaokrouhlit konzistentně (na stovky Kč u splátek, na statisíce u kupních cen).
