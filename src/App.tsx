import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";

// Lazy-loaded routes for code splitting
const OdhadNemovitosti = lazy(() => import("./pages/OdhadNemovitosti"));
const GDPR = lazy(() => import("./pages/GDPR"));
const ZpracovaniOsobnichUdaju = lazy(() => import("./pages/ZpracovaniOsobnichUdaju"));
const BlogOceneniNemovitosti = lazy(() => import("./pages/BlogOceneniNemovitosti"));
const Prodano = lazy(() => import("./pages/Prodano"));
const RadekVetrovskyPribram = lazy(() => import("./pages/RadekVetrovskyPribram"));
const BlogInvesticniNemovitosti = lazy(() => import("./pages/BlogInvesticniNemovitosti"));
const BlogProdatNemovitost = lazy(() => import("./pages/BlogProdatNemovitost"));
const BlogExkluzivniSmlouva = lazy(() => import("./pages/BlogExkluzivniSmlouva"));
const BlogDanZProdejeBytu = lazy(() => import("./pages/BlogDanZProdejeBytu"));
const BlogZdedenaNemovitost = lazy(() => import("./pages/BlogZdedenaNemovitost"));
const BlogCenovaMapaPribram = lazy(() => import("./pages/BlogCenovaMapaPribram"));
const BlogPenb = lazy(() => import("./pages/BlogPenb"));
const BlogRezervaceUschova = lazy(() => import("./pages/BlogRezervaceUschova"));
const BlogHypoteky = lazy(() => import("./pages/BlogHypoteky"));
const BlogKatastr = lazy(() => import("./pages/BlogKatastr"));
const BlogPronajem = lazy(() => import("./pages/BlogPronajem"));
const BlogDanZNemovitosti = lazy(() => import("./pages/BlogDanZNemovitosti"));
const BlogProdejGarsonky = lazy(() => import("./pages/BlogProdejGarsonky"));
const BlogNovostavby = lazy(() => import("./pages/BlogNovostavby"));
const BlogHypotecniSazby = lazy(() => import("./pages/BlogHypotecniSazby"));
const BlogNaCoPozorKoupe = lazy(() => import("./pages/BlogNaCoPozorKoupe"));
const BlogProdatRodinnyDum = lazy(() => import("./pages/BlogProdatRodinnyDum"));
const BlogKolikSiMuzuDovolit = lazy(() => import("./pages/BlogKolikSiMuzuDovolit"));
const Clanky = lazy(() => import("./pages/Clanky"));
const ProdejNemovitosti = lazy(() => import("./pages/ProdejNemovitosti"));
const PronajemNemovitosti = lazy(() => import("./pages/PronajemNemovitosti"));
const KoupeNemovitosti = lazy(() => import("./pages/KoupeNemovitosti"));

const queryClient = new QueryClient();

/** Plynulé scrollování + úklid ScrollTriggerů při změně route. */
const MotionLayer = () => {
  useSmoothScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MotionLayer />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prodano" element={<Prodano />} />
            <Route path="/clanky" element={<Clanky />} />
            <Route path="/odhad-nemovitosti" element={<OdhadNemovitosti />} />
            <Route path="/blog/jak-spravne-ocenit-nemovitost" element={<BlogOceneniNemovitosti />} />
            <Route path="/blog/5-tipu-pro-rychlejsi-prodej-bytu" element={<Navigate to="/sluzby/prodej-nemovitosti-pribram" replace />} />
            <Route path="/blog/pruvodce-hypotekou-pro-zacatecniky" element={<Navigate to="/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram" replace />} />
            <Route path="/blog/investicni-nemovitosti-pribram" element={<BlogInvesticniNemovitosti />} />
            <Route path="/blog/prodat-nemovitost-pribram-bez-realitky-nebo-s-maklerem" element={<BlogProdatNemovitost />} />
            <Route path="/blog/exkluzivni-smlouva-s-maklerem" element={<BlogExkluzivniSmlouva />} />
            <Route path="/blog/dan-z-prodeje-bytu-pribram-2026" element={<BlogDanZProdejeBytu />} />
            <Route path="/blog/jak-prodat-zdedenu-nemovitost-pribram" element={<BlogZdedenaNemovitost />} />
            <Route path="/blog/cenova-mapa-pribram-2026" element={<BlogCenovaMapaPribram />} />
            <Route path="/blog/penb-pri-prodeji-nemovitosti-2026" element={<BlogPenb />} />
            <Route path="/blog/rezervacni-smlouva-uschova-kupni-ceny-pribram-2026" element={<BlogRezervaceUschova />} />
            <Route path="/blog/hypoteky-cerven-2026-dopad-na-prodej-pribram" element={<BlogHypoteky />} />
            <Route path="/blog/katastr-nemovitosti-2026-konec-anonymniho-nahlizeni" element={<BlogKatastr />} />
            <Route path="/blog/pronajem-bytu-pribram-2026" element={<BlogPronajem />} />
            <Route path="/blog/dan-z-nemovitosti-pribram-2026" element={<BlogDanZNemovitosti />} />
            <Route path="/blog/prodej-garsonky-maleho-bytu-pribram-2026" element={<BlogProdejGarsonky />} />
            <Route path="/blog/novostavby-pribram-2026-kde-se-stavi" element={<BlogNovostavby />} />
            <Route path="/blog/hypotecni-sazby-pribram-mesicni-prehled" element={<BlogHypotecniSazby />} />
            <Route path="/blog/na-co-si-dat-pozor-koupe-nemovitosti-pribram" element={<BlogNaCoPozorKoupe />} />
            <Route path="/blog/jak-prodat-rodinny-dum-pribram" element={<BlogProdatRodinnyDum />} />
            <Route path="/blog/kolik-si-muzu-dovolit-hypoteka-pribram" element={<BlogKolikSiMuzuDovolit />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/zpracovani-osobnich-udaju" element={<ZpracovaniOsobnichUdaju />} />
            <Route path="/radek-vetrovsky-realitni-makler-pribram" element={<RadekVetrovskyPribram />} />
            <Route path="/sluzby/prodej-nemovitosti-pribram" element={<ProdejNemovitosti />} />
            <Route path="/sluzby/pronajem-nemovitosti-pribram" element={<PronajemNemovitosti />} />
            <Route path="/sluzby/koupe-nemovitosti-pribram" element={<KoupeNemovitosti />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
