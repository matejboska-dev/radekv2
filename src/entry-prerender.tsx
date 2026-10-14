import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Prodano from '@/pages/Prodano';
import Clanky from '@/pages/Clanky';
import OdhadNemovitosti from '@/pages/OdhadNemovitosti';
import BlogOceneniNemovitosti from '@/pages/BlogOceneniNemovitosti';
import BlogInvesticniNemovitosti from '@/pages/BlogInvesticniNemovitosti';
import BlogProdatNemovitost from '@/pages/BlogProdatNemovitost';
import BlogExkluzivniSmlouva from '@/pages/BlogExkluzivniSmlouva';
import BlogDanZProdejeBytu from '@/pages/BlogDanZProdejeBytu';
import BlogZdedenaNemovitost from '@/pages/BlogZdedenaNemovitost';
import BlogCenovaMapaPribram from '@/pages/BlogCenovaMapaPribram';
import BlogPenb from '@/pages/BlogPenb';
import BlogRezervaceUschova from '@/pages/BlogRezervaceUschova';
import BlogHypoteky from '@/pages/BlogHypoteky';
import BlogKatastr from '@/pages/BlogKatastr';
import BlogPronajem from '@/pages/BlogPronajem';
import BlogDanZNemovitosti from '@/pages/BlogDanZNemovitosti';
import BlogProdejGarsonky from '@/pages/BlogProdejGarsonky';
import BlogNovostavby from '@/pages/BlogNovostavby';
import BlogHypotecniSazby from '@/pages/BlogHypotecniSazby';
import BlogNaCoPozorKoupe from '@/pages/BlogNaCoPozorKoupe';
import BlogProdatRodinnyDum from '@/pages/BlogProdatRodinnyDum';
import BlogKolikSiMuzuDovolit from '@/pages/BlogKolikSiMuzuDovolit';
import BlogProdejNemovitostiKrokZaKrokem from '@/pages/BlogProdejNemovitostiKrokZaKrokem';
import GDPR from '@/pages/GDPR';
import ZpracovaniOsobnichUdaju from '@/pages/ZpracovaniOsobnichUdaju';
import RadekVetrovskyPribram from '@/pages/RadekVetrovskyPribram';
import LokalitaPribram from '@/pages/LokalitaPribram';

// Content routes prerendered at build time. Keep in sync with the routes in App.tsx.
export const prerenderRoutes = [
  { path: '/prodano', Component: Prodano },
  { path: '/clanky', Component: Clanky },
  { path: '/odhad-nemovitosti', Component: OdhadNemovitosti },
  { path: '/blog/jak-spravne-ocenit-nemovitost', Component: BlogOceneniNemovitosti },
  { path: '/blog/investicni-nemovitosti-pribram', Component: BlogInvesticniNemovitosti },
  { path: '/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem', Component: BlogProdatNemovitost },
  { path: '/blog/exkluzivni-smlouva-s-maklerem', Component: BlogExkluzivniSmlouva },
  { path: '/blog/dan-z-prodeje-bytu-pribram-2026', Component: BlogDanZProdejeBytu },
  { path: '/blog/jak-prodat-zdedenu-nemovitost-pribram', Component: BlogZdedenaNemovitost },
  { path: '/blog/cenova-mapa-pribram-2026', Component: BlogCenovaMapaPribram },
  { path: '/blog/penb-pri-prodeji-nemovitosti-2026', Component: BlogPenb },
  { path: '/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026', Component: BlogRezervaceUschova },
  { path: '/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram', Component: BlogHypoteky },
  { path: '/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni', Component: BlogKatastr },
  { path: '/blog/pronajem-bytu-pribram-2026', Component: BlogPronajem },
  { path: '/blog/dan-z-nemovitosti-pribram-2026', Component: BlogDanZNemovitosti },
  { path: '/blog/prodej-garsonky-maleho-bytu-pribram-2026', Component: BlogProdejGarsonky },
  { path: '/blog/novostavby-pribram-2026-kde-se-stavi', Component: BlogNovostavby },
  { path: '/blog/hypotecni-sazby-pribram-mesicni-prehled', Component: BlogHypotecniSazby },
  { path: '/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram', Component: BlogNaCoPozorKoupe },
  { path: '/blog/jak-prodat-rodinny-dum-pribram', Component: BlogProdatRodinnyDum },
  { path: '/blog/kolik-si-muzu-dovolit-hypoteka-pribram', Component: BlogKolikSiMuzuDovolit },
  { path: '/blog/prodej-nemovitosti-pribram-krok-za-krokem', Component: BlogProdejNemovitostiKrokZaKrokem },
  { path: '/gdpr', Component: GDPR },
  { path: '/zpracovani-osobnich-udaju', Component: ZpracovaniOsobnichUdaju },
  { path: '/radek-vetrovsky-realitni-makler-pribram', Component: RadekVetrovskyPribram },
  { path: '/lokality/pribram', Component: LokalitaPribram },
];

/** Mounts a page in the (jsdom) document so route effects set head metadata and JSON-LD,
 * then resolves once effects have flushed. The caller reads document.head and #root. */
export async function mountRoute(path: string, Component: React.ComponentType, container: HTMLElement) {
  const root = createRoot(container);
  flushSync(() => root.render(createElement(MemoryRouter, { initialEntries: [path] }, createElement(Component))));
  await new Promise(resolve => setTimeout(resolve, 400));
  return () => root.unmount();
}
