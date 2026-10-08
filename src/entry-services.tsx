import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import ServicePage from '@/components/services/ServicePage';
import { services } from '@/data/services';

export function renderServices() {
  return services.map(service => ({
    service,
    html: renderToString(<StaticRouter location={service.path}><ServicePage service={service} /></StaticRouter>),
  }));
}
