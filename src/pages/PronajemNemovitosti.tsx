import ServicePage from '@/components/services/ServicePage';
import { serviceContent } from '@/data/services';

export default function PronajemNemovitosti() {
  return <ServicePage service={serviceContent.pronajem} />;
}
