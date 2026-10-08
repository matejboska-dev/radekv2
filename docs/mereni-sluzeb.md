# Měření tří podstránek služeb

Web posílá do stávajícího `dataLayer` pro GTM tyto události. Zatím jde o signály připravené v kódu; aby se objevily v GA4, je potřeba je namapovat v kontejneru GTM a publikovat jeho změny.

| Událost | Kdy nastane | Význam |
| --- | --- | --- |
| `service_cta_click` | Kliknutí na hlavní CTA v hlavičce, hero, postupu, kontaktní části nebo mobilní liště | Zájem, nikoli dokončená poptávka |
| `service_phone_click` | Kliknutí na telefonní odkaz na podstránce | Pokus o zavolání, nikoli potvrzený hovor |
| `service_lead_submitted` | Až po potvrzeném úspěchu odeslání formuláře | Dokončená poptávka |

Každá událost obsahuje `service` (`prodej`, `pronajem`, `koupe`), `placement` a `page_path`. Neobsahuje jméno, telefon, e-mail ani text zprávy. Prodejní CTA přidává do URL odhadu `zdroj=sluzba-prodej`, aby úspěšné odeslání formuláře odhadu bylo přiřazeno stránce prodeje.

V GTM vytvořte spouštěč typu Custom Event pro každé z uvedených jmen a příslušné GA4 Event tagy. Jako klíčovou událost v GA4 označte pouze `service_lead_submitted`; telefonní kliknutí sledujte odděleně. Po nasazení ověřte události v GTM Preview a GA4 DebugView na všech třech podstránkách, včetně selhání formuláře (to událost dokončené poptávky vyslat nesmí).
