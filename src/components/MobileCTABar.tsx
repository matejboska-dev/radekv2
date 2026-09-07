import { motion } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PHONE_HREF = 'tel:+420721855854';

/**
 * Trvalá spodní lišta na mobilu – lokální služba se prodává telefonem.
 * Levý button vytáčí přímo (1 tap), pravý scrolluje / naviguje na formulář.
 * Skryté na desktopu (tam řeší kontakt FloatingCTA + hlavička).
 */
const MobileCTABar = () => {
  const navigate = useNavigate();

  const goToForm = () => {
    const form =
      document.querySelector('#contact-form') ||
      document.querySelector('#odhad-form-card') ||
      document.querySelector('#odhad-form') ||
      document.querySelector('#contact');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact-form');
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={PHONE_HREF}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/25 active:scale-[0.98] transition-transform"
        >
          <Phone className="h-4 w-4" />
          Zavolat
        </a>
        <button
          type="button"
          onClick={goToForm}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-foreground/80 bg-transparent px-4 py-3 text-sm font-bold text-foreground active:scale-[0.98] transition-transform"
        >
          <MessageSquare className="h-4 w-4" />
          Napsat
        </button>
      </div>
    </motion.div>
  );
};

export default MobileCTABar;
