import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import { Reveal } from '@/components/anim/Reveal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          formType: 'contact',
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Zpráva odeslána!",
        description: "Ozvu se vám co nejdříve.",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Send email error:', err);
      toast({
        title: "Chyba při odesílání",
        description: "Zkuste to prosím znovu nebo mě kontaktujte telefonicky.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Phone, label: 'Telefon', value: '+420 721 855 854', href: 'tel:+420721855854' },
    { icon: Mail, label: 'E-mail', value: 'radek.vetrovsky@re-max.cz', href: 'mailto:radek.vetrovsky@re-max.cz' },
    { icon: MapPin, label: 'Adresa', value: 'Zahradnická 550, 261 01 Příbram III', href: 'https://maps.google.com/?q=Zahradnická+550+Příbram' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Editorial Asymmetric Header */}
        <Reveal className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 md:mb-16 pb-6 border-b border-border/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                07 — KONTAKT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase tracking-tight text-foreground leading-[1.05]">
              Pojďme si <br className="hidden sm:block" />
              promluvit
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed lg:pb-1">
              Neváhejte mě kontaktovat. Rád vám pomohu najít to pravé řešení
              pro vaši nemovitost.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <Reveal variant="fromLeft" className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Kontaktní údaje
              </h3>
              
              <address className="space-y-5 not-italic" itemScope itemType="https://schema.org/Person">
                <meta itemProp="name" content="Radek Větrovský" />
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Adresa' ? '_blank' : undefined}
                    rel={item.label === 'Adresa' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 group"
                    itemProp={item.label === 'Telefon' ? 'telephone' : item.label === 'E-mail' ? 'email' : undefined}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-foreground group-hover:text-secondary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground group-hover:text-secondary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </address>
            </div>

            {/* RE/MAX Branding */}
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Působím pod značkou</p>
              <p className="text-xl font-bold text-foreground">RE/MAX Power 2</p>
              <p className="text-sm text-muted-foreground mt-1">Příbram</p>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.2318881760402!2d14.008383976248709!3d49.68760587145661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b0f30d7642547%3A0x3ec84469efa46763!2zUmFkZWsgVsSbdHJvdnNrw70g4oCTIFJlYWxpdG7DrSBtYWtsw6nFmSBSRS9NQVg!5e0!3m2!1sen!2scz!4v1772011043944!5m2!1sen!2scz"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa kanceláře RE/MAX Příbram"
                className="w-full"
              />
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal variant="fromRight" delay={0.12} className="lg:col-span-3">
            <div id="contact-form" className="glass-card rounded-2xl p-6 md:p-8 shadow-lg scroll-mt-24">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Napište mi
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Děkuji za zprávu!</h4>
                  <p className="text-muted-foreground">Ozvu se vám co nejdříve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Jméno a příjmení
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jan Novák"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+420 123 456 789"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      E-mail <span className="text-muted-foreground font-normal">(nepovinné)</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jan@email.cz"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      Zpráva
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Jak vám mohu pomoci?"
                      required
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Odesílám...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Odeslat zprávu
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Odesláním souhlasíte se{' '}
                    <a href="/zpracovani-osobnich-udaju" className="underline hover:text-foreground transition-colors">
                      zpracováním osobních údajů
                    </a>{' '}
                    v souladu s{' '}
                    <a href="/gdpr" className="underline hover:text-foreground transition-colors">
                      zásadami GDPR
                    </a>.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
