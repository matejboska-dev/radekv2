import type { ServiceId } from '@/data/services';

export type ServiceEvent = 'service_cta_click' | 'service_phone_click' | 'service_lead_submitted';

/** GTM dataLayer events contain only service and placement, never form values. */
export function trackServiceEvent(event: ServiceEvent, service: ServiceId, placement: string) {
  if (typeof window === 'undefined') return;
  const trackedWindow = window as Window & { dataLayer?: Record<string, string>[] };
  trackedWindow.dataLayer ??= [];
  trackedWindow.dataLayer.push({ event, service, placement, page_path: window.location.pathname });
}
