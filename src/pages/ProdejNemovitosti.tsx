import ServicePage from '@/components/services/ServicePage';
import { serviceContent } from '@/data/services';

export default function ProdejNemovitosti() {
  return <ServicePage service={serviceContent.prodej} />;
}
