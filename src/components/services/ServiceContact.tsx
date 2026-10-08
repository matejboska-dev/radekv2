import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceContent } from '@/data/services';
import { trackServiceEvent } from '@/lib/service-tracking';

export default function ServiceContact({ service }: { service: ServiceContent }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const phone = String(fields.get('phone') || '').trim();
    if (!name || !phone) { form.reportValidity(); return; }
    sending.current = true;
    setStatus('sending');
    try {
      // Load the existing integration only when a visitor submits the form.
      const { supabase, isSupabaseConfigured } = await import('@/integrations/supabase/client');
      if (!isSupabaseConfigured) throw new Error('Contact service unavailable');
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          formType: 'contact', name, phone,
          email: String(fields.get('email') || '').trim(),
          message: `${service.name} v Příbrami\n\n${String(fields.get('message') || '').trim()}`,
        },
      });
      if (error || data?.error || data?.success !== true) throw new Error('Contact request failed');
      trackServiceEvent('service_lead_submitted', service.id, 'contact_form');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <section id="konzultace" className="service-section scroll-mt-28">
      <div className="service-container">
        <div className="grid gap-10 rounded-3xl bg-primary p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <h2 className="service-heading text-white">{service.contactTitle}</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85">{service.contactText}</p>
            <div className="mt-6 max-w-lg border-l-2 border-secondary pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">Co bude po odeslání</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{service.nextStep}</p>
            </div>
            {service.id === 'prodej' && <Link to={service.primaryHref} onClick={() => trackServiceEvent('service_cta_click', service.id, 'contact_estimate')} className="service-button mt-7">Chci odhad zdarma <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>}
            <address className="mt-9 hidden space-y-4 not-italic lg:block">
              <p className="font-syne text-xl font-bold">Radek Větrovský</p>
              <a className="flex min-h-11 items-center gap-3 text-lg font-bold hover:underline" href="tel:+420721855854"><Phone className="h-5 w-5 shrink-0" aria-hidden="true" />+420 721 855 854</a>
              <a className="flex min-h-11 items-center gap-3 break-all text-sm text-white/85 hover:underline sm:text-base" href="mailto:radek.vetrovsky@re-max.cz"><Mail className="h-5 w-5 shrink-0" aria-hidden="true" />radek.vetrovsky@re-max.cz</a>
              <p className="text-sm leading-relaxed text-white/75">RE/MAX Power 2<br />Zahradnická 550, 261 01 Příbram III</p>
            </address>
          </div>
          <div className="min-w-0">
            {status === 'success' ? (
              <div role="status" className="flex h-full min-h-80 flex-col items-start justify-center">
                <Check className="mb-5 h-10 w-10" aria-hidden="true" />
                <h3 className="font-syne text-2xl font-bold">Děkuji za zprávu.</h3>
                <p className="mt-3 text-white/85">Ozvu se Vám a domluvíme další postup.</p>
                <button type="button" className="mt-6 min-h-11 underline underline-offset-4" onClick={() => setStatus('idle')}>Napsat další zprávu</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" aria-label={`Nezávazná konzultace: ${service.name}`} aria-busy={status === 'sending'}>
                <h3 className="font-syne text-xl font-bold">Napište mi svou představu</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="service-name" className="service-label">Jméno a příjmení</label><input className="service-input" id="service-name" name="name" autoComplete="name" required maxLength={120} placeholder="Vaše jméno" /></div>
                  <div><label htmlFor="service-phone" className="service-label">Telefon</label><input className="service-input" id="service-phone" name="phone" type="tel" autoComplete="tel" required pattern="[+0-9][0-9 ]{8,24}" title="Zadejte telefonní číslo s alespoň 9 znaky, případně s předvolbou +420." maxLength={25} placeholder="+420" /></div>
                </div>
                <div><label htmlFor="service-email" className="service-label">E-mail <span className="font-normal text-white/70">(nepovinné)</span></label><input className="service-input" id="service-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="vas@email.cz" /></div>
                <div><label htmlFor="service-message" className="service-label">S čím Vám mohu pomoci? <span className="font-normal text-white/70">(nepovinné)</span></label><textarea className="service-input min-h-28 resize-y" id="service-message" name="message" rows={4} maxLength={4000} placeholder={service.messagePlaceholder} /></div>
                {status === 'error' && <p role="alert" className="rounded-xl border border-white/40 p-4 text-sm leading-relaxed">Zprávu se nepodařilo odeslat. Vaše údaje zůstaly vyplněné. Zkuste to znovu nebo mi zavolejte na <a href="tel:+420721855854" className="font-bold underline">721 855 854</a>.</p>}
                <button className="service-button w-full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Odesílám…</> : <>Odeslat nezávaznou poptávku <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></>}</button>
                <p className="text-xs leading-relaxed text-white/75">Údaje použiji k vyřízení Vaší poptávky. Přečtěte si <Link className="text-white underline underline-offset-2" to="/zpracovani-osobnich-udaju">informace o zpracování osobních údajů</Link>.</p>
                <noscript><p className="text-sm">Pro odeslání formuláře zapněte JavaScript, nebo mě kontaktujte telefonicky či e-mailem.</p></noscript>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
