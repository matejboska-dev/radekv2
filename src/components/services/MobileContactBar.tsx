import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

/** Spodní lišta pro mobil: hlavní CTA a telefon. Stejný vzhled jako na stránkách služeb. */
export default function MobileContactBar({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <>
      <div className="h-24 lg:hidden" aria-hidden="true" />
      <nav aria-label="Rychlý kontakt" className="service-mobile-contact fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg gap-3">
          <Link className="service-button min-w-0 flex-1 px-3 text-xs" to={href} onClick={onClick}>{label}</Link>
          <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary px-5 text-sm font-bold text-primary" href="tel:+420721855854"><Phone className="h-4 w-4" aria-hidden="true" />Zavolat</a>
        </div>
      </nav>
    </>
  );
}
