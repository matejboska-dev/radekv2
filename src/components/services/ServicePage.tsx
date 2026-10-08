import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceContact from './ServiceContact';
import { services, SITE_URL, type ServiceContent } from '@/data/services';
import { setPageMeta } from '@/lib/seo';
import { getServiceSchema, serializeJsonLd } from '@/lib/service-seo';
import { trackServiceEvent } from '@/lib/service-tracking';
import aboutImage from '@/assets/radek-about.jpg';
import saleTynec from '@/assets/services/property-dum-tynec-nad-sazavou.jpg';
import saleBrodska from '@/assets/services/property-byt-brodska-pribram.jpg';
import saleZdabor from '@/assets/services/property-byt-zdabor-slunna-pribram.jpg';
import saleCertak from '@/assets/services/property-byt-certak-pribram.jpg';
import salePribram from '@/assets/services/property-dum-pribram.jpg';
import saleCechovska from '@/assets/services/property-byt-cechovska.jpg';
import './services.css';

const soldProperties = [
  { id: 15, title: 'Rodinný dům, Týnec nad Sázavou', detail: '234 m²', image: saleTynec },
  { id: 14, title: 'Byt 2+kk, Brodská', detail: 'Příbram · 54 m²', image: saleBrodska },
  { id: 13, title: 'Byt 2+kk, Zdaboř', detail: 'Příbram, Slunná · 45 m²', image: saleZdabor },
  { id: 11, title: 'Byt 2+1, Pod Čertovým pahorkem', detail: 'Příbram · 58 m²', image: saleCertak },
  { id: 2, title: 'Rodinný dům, Březové Hory', detail: 'Příbram, Rožmitálská · 141 m²', image: salePribram },
  { id: 8, title: 'Byt 2+kk, Čechovská', detail: 'Příbram · 47 m²', image: saleCechovska },
];

function PrimaryLink({ service, className = '', placement }: { service: ServiceContent; className?: string; placement: string }) {
  return <Link to={service.primaryHref} onClick={() => trackServiceEvent('service_cta_click', service.id, placement)} className={`service-button ${className}`}>{service.primaryLabel}<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>;
}

export default function ServicePage({ service }: { service: ServiceContent }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const cleanup = setPageMeta(service.title, service.description, service.path, new URL(service.image, SITE_URL).href, 'website');
    const homeSchema = document.getElementById('site-schema');
    const previousType = homeSchema?.getAttribute('type');
    homeSchema?.setAttribute('type', 'application/json');
    return () => {
      cleanup();
      if (previousType) homeSchema?.setAttribute('type', previousType);
    };
  }, [service]);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    const trackPhoneClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href^="tel:"]');
      if (!link?.closest('.service-page')) return;
      const placement = link.closest('.service-mobile-contact') ? 'mobile_bar'
        : link.closest('header') ? 'header'
        : link.closest('footer') ? 'footer'
        : link.closest('#konzultace') ? 'contact' : 'hero';
      trackServiceEvent('service_phone_click', service.id, placement);
    };
    document.addEventListener('click', trackPhoneClick);
    return () => document.removeEventListener('click', trackPhoneClick);
  }, [service.id]);

  return (
    <div className="service-page min-h-screen bg-background">
      <script type="application/ld+json" data-service-schema={service.id} dangerouslySetInnerHTML={{ __html: serializeJsonLd(getServiceSchema(service)) }} />
      <a href="#service-main" className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-xl focus:bg-background focus:p-4">Přejít k obsahu</a>
      <Header staticContent serviceCta={{ href: service.primaryHref, label: service.id === 'prodej' ? 'Odhad zdarma' : 'Domluvit konzultaci', onClick: () => trackServiceEvent('service_cta_click', service.id, 'header') }} />
      <main id="service-main">
        <section className="service-hero bg-primary pb-10 pt-28 text-white sm:pb-14 sm:pt-32">
          <div className="service-container">
            <nav aria-label="Drobečková navigace" className="mb-8 text-xs text-white/75 sm:mb-10 sm:text-sm">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li><Link className="hover:text-white hover:underline" to="/">Domů</Link></li><li aria-hidden="true">/</li>
                <li><Link className="hover:text-white hover:underline" to="/#services">Služby</Link></li><li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">{service.name}</li>
              </ol>
            </nav>
            <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/75">{service.number} — {service.label} · RE/MAX Power 2</p>
                <h1 className="service-hero-title font-syne font-extrabold uppercase">{service.name}<span className="mt-3 block font-arvo text-[0.52em] font-normal normal-case tracking-[-0.02em] text-white/85">v Příbrami a okolí</span></h1>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{service.intro}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <PrimaryLink service={service} placement="hero" />
                  <a className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:underline" href="tel:+420721855854"><Phone className="h-4 w-4" aria-hidden="true" />721 855 854</a>
                </div>
                <p className="mt-3 text-xs text-white/75">{service.primaryNote}</p>
              </div>
              <figure className="relative min-w-0">
                <img src={service.image} alt={service.imageAlt} width={1920} height={1071} {...{ fetchpriority: 'high' }} className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-3xl lg:aspect-[5/6] lg:max-h-[530px]" style={{ objectPosition: service.imagePosition }} />
                <figcaption className="absolute bottom-4 left-4 right-4 rounded-xl bg-primary/95 px-5 py-4 text-sm font-bold leading-relaxed sm:bottom-5 sm:left-5 sm:right-5">{service.promise}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <nav aria-label="Realitní služby" className="border-b border-border bg-background">
          <div className="service-container grid grid-cols-3">
            {services.map(item => <Link key={item.id} to={item.path} aria-current={item.id === service.id ? 'page' : undefined} className={`service-tab ${item.id === service.id ? 'border-secondary text-secondary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}><span className="hidden text-xs sm:inline">{item.number}</span>{item.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>)}
          </div>
        </nav>

        <aside className="border-b border-border bg-muted/50" aria-label="Zkušenost klienta">
          <div className="service-container grid gap-4 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">Zkušenost klienta · Google recenze</p>
              <blockquote className="mt-2 font-arvo text-base leading-relaxed sm:text-lg">„{service.proof.quote}“</blockquote>
              <p className="mt-2 text-sm text-muted-foreground">{service.proof.author} · {service.proof.context}</p>
            </div>
            <a href="https://maps.app.goo.gl/vNQZSSixjfp8rZCu9" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">Všechny recenze na Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </aside>

        <section className="service-section" id="rozsah">
          <div className="service-container">
            <div className="service-section-intro"><h2 className="service-heading">{service.overviewTitle}</h2><p className="service-lead">{service.overview}</p></div>
            <div className="grid gap-8 md:grid-cols-3 md:gap-7 lg:gap-10">
              {service.features.map((feature, i) => <article key={feature.title} className="border-t border-border pt-6"><div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary"><Check className="h-5 w-5" aria-hidden="true" /></div><h3 className="font-syne text-xl font-bold leading-snug lg:text-2xl">{service.benefits[i]}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{feature.text}</p></article>)}
            </div>
            <a href="#postup" className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">Jak bude spolupráce probíhat <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </section>

        <section className="service-section scroll-mt-28 bg-muted" id="postup">
          <div className="service-container grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5"><h2 className="service-heading">{service.processTitle}</h2><p className="service-lead mt-6">{service.processIntro}</p><PrimaryLink service={service} className="mt-8" placement="process" /></div>
            <ol className="divide-y divide-border border-y border-border lg:col-span-7">
              {service.steps.map((step, i) => <li key={step.title} className="flex gap-5 py-7 sm:gap-7"><span className="pt-1 font-syne text-lg font-bold text-secondary" aria-hidden="true">0{i + 1}</span><div><h3 className="font-syne text-xl font-bold leading-snug">{step.title}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{step.text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <div className="service-section-intro"><h2 className="service-heading">{service.detailTitle}</h2><p className="service-lead">{service.detailIntro}</p></div>
            <div className="grid gap-6 md:grid-cols-3">
              {service.checks.map(item => <article className="rounded-2xl border border-border p-6 sm:p-7" key={item.title}><h3 className="font-syne text-xl font-bold leading-snug">{item.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p></article>)}
            </div>
          </div>
        </section>

        {service.id === 'prodej' && <section className="service-section bg-muted/50" aria-labelledby="sold-heading"><div className="service-container"><div className="service-section-intro"><h2 id="sold-heading" className="service-heading">Konkrétní dokončené prodeje.</h2><p className="service-lead">Podívejte se na vybrané byty a domy z mého portfolia. U každé nemovitosti najdete její lokalitu, výměru a fotografii. O průběhu podobného prodeje Vám rád řeknu při konzultaci.</p></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{soldProperties.map(property => <Link key={property.id} to={`/prodano#nemovitost-${property.id}`} className="group overflow-hidden rounded-2xl border border-border bg-background"><div className="relative overflow-hidden"><img src={property.image} alt={property.title} width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1.5 text-xs font-bold uppercase">Prodáno</span></div><div className="p-5"><h3 className="font-syne text-lg font-bold group-hover:text-secondary">{property.title}</h3><p className="mt-2 text-sm text-muted-foreground">{property.detail}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">Zobrazit v portfoliu <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></div></Link>)}</div><Link to="/prodano" className="mt-8 inline-flex min-h-11 items-center gap-3 font-bold text-primary underline-offset-4 hover:underline">Všechny prodané nemovitosti <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link></div></section>}

        <section className="service-section border-y border-border" aria-labelledby="local-heading">
          <div className="service-container grid items-center gap-9 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5"><img src={aboutImage} alt="Radek Větrovský, realitní makléř RE/MAX Power 2" width={800} height={900} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-3xl lg:aspect-[4/5]" /></div>
            <div className="lg:col-span-7"><h2 id="local-heading" className="service-heading">Místní znalost. Osobní spolupráce.</h2><p className="mt-6 text-lg font-bold">Radek Větrovský · RE/MAX Power 2</p><p className="mt-4 leading-relaxed text-muted-foreground">{service.localText}</p><p className="mt-4 leading-relaxed text-muted-foreground">Od první konzultace máte přímý kontakt na člověka, který Vaši situaci zná. Rozsah spolupráce, odměnu i další postup si ujasníme předem.</p><Link to="/radek-vetrovsky-realitni-makler-pribram" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-primary hover:underline">Více o mně <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section className="service-section" id="faq">
          <div className="service-container grid items-start gap-9 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5"><h2 className="service-heading">Na co se často ptáte.</h2><p className="service-lead mt-6">{service.name} v Příbrami: praktické odpovědi před začátkem spolupráce.</p><a href="#konzultace" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-secondary hover:underline">Mám jinou otázku <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
            <div className="divide-y divide-border border-y border-border lg:col-span-7">{service.faqs.map((faq, i) => <details key={faq.q} className="service-faq group" open={i === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-syne text-base font-bold sm:text-lg"><h3 className="font-syne text-inherit font-bold leading-snug">{faq.q}</h3><ChevronDown className="h-5 w-5 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="max-w-prose pb-6 pr-7 leading-relaxed text-muted-foreground">{faq.a}</p></details>)}</div>
          </div>
        </section>

        <ServiceContact key={service.id} service={service} />

        <section className="service-section bg-muted" aria-labelledby="reading-heading"><div className="service-container"><h2 id="reading-heading" className="service-heading max-w-2xl">Připravte se na další krok.</h2><div className="mt-9 grid gap-7 md:grid-cols-3">{service.articles.map(article => <Link key={article.href} to={article.href} className="group border-t border-border py-6"><h3 className="flex items-start justify-between gap-5 font-syne text-xl font-bold group-hover:text-secondary">{article.title}<ArrowUpRight className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" /></h3><p className="mt-3 leading-relaxed text-muted-foreground">{article.text}</p></Link>)}</div><div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"><span className="text-sm text-muted-foreground">Další služby:</span>{services.filter(item => item.id !== service.id).map(item => <Link key={item.id} to={item.path} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-secondary">{item.name}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>)}</div></div></section>
      </main>
      <Footer staticContent />
      <div className="h-24 lg:hidden" aria-hidden="true" />
      <nav aria-label="Rychlý kontakt" className="service-mobile-contact fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-md lg:hidden"><div className="mx-auto flex max-w-lg gap-3"><Link className="service-button min-w-0 flex-1 px-3 text-xs" to={service.primaryHref} onClick={() => trackServiceEvent('service_cta_click', service.id, 'mobile_bar')}>{service.id === 'prodej' ? 'Odhad zdarma' : 'Domluvit konzultaci'}</Link><a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary px-5 text-sm font-bold text-primary" href="tel:+420721855854"><Phone className="h-4 w-4" aria-hidden="true" />Zavolat</a></div></nav>
    </div>
  );
}
