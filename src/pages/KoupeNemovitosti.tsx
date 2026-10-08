import ServicePage from '@/components/services/ServicePage';
import { serviceContent } from '@/data/services';

export default function KoupeNemovitosti() {
  return <ServicePage service={serviceContent.koupe} />;
}
