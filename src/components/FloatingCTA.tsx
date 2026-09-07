import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Mail, MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from './ui/button';

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Na mobilu řeší kontakt spodní lišta (MobileCTABar) – FloatingCTA se skryje přes CSS.
      // Na desktopu zobraz hned po malém odscrollování, ať má uživatel kontakt stále po ruce.
      setIsVisible(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleMainClick = () => {
    setIsExpanded(!isExpanded);
  };

  const contactOptions = [
    {
      icon: PhoneCall,
      label: 'Zavolat',
      href: 'tel:+420721855854',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: MessageSquare,
      label: 'SMS',
      href: 'sms:+420721855854',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:radek.vetrovsky@re-max.cz',
      color: 'bg-secondary hover:bg-secondary/90',
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 hidden lg:block"
        >
          <div className="relative">
            {/* Expanded options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-16 right-0 flex flex-col gap-3"
                >
                  {contactOptions.map((option, index) => (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full text-background shadow-lg ${option.color} whitespace-nowrap`}
                    >
                      <option.icon className="h-5 w-5" />
                      <span className="font-medium text-sm">{option.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main CTA */}
            <Button
              variant="floating"
              size="floating"
              onClick={handleMainClick}
              className="shadow-2xl"
              aria-label="Kontaktovat"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
              </motion.div>
            </Button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
