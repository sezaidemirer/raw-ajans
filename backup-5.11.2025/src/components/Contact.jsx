import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Instagram, Linkedin, Youtube, Twitter, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/rawajans", color: "hover:text-magenta" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/rawajans", color: "hover:text-primary" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/rawajans", color: "hover:text-cyan" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/rawajans", color: "hover:text-magenta" }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@rawajans.com", label: t('contact.email') },
    { icon: Phone, text: "+90 (536) 261 37 36", label: t('contact.phone') },
    { icon: MapPin, text: t('contact.locationText'), label: t('contact.location') }
  ];

  return (
    <section 
      id="contact" 
      ref={ref} 
      className="relative py-32 px-4 overflow-hidden bg-dark"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-dark-gray border border-gray-800 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-magenta/20 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-gray-500 mb-2 font-poppins uppercase tracking-wider">
                  {info.label}
                </p>
                <p className="font-inter text-white font-medium">
                  {info.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-full bg-dark-gray border border-gray-800 text-gray-400 ${social.color} transition-all duration-300 group`}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="mailto:hello@rawajans.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-magenta to-cyan text-white font-poppins font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            {t('contact.startProject')}
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 pt-12 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-montserrat font-bold text-3xl gradient-text mb-2">
                Raw Ajans
              </h3>
              <p className="font-inter text-gray-500 text-sm">
                {t('contact.tagline')}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <nav className="flex gap-6">
                <a href="#about" className="font-inter text-gray-400 hover:text-primary transition-colors duration-300">
                  {t('navbar.about')}
                </a>
                <a href="#services" className="font-inter text-gray-400 hover:text-primary transition-colors duration-300">
                  {t('navbar.services')}
                </a>
                <a href="#showcase" className="font-inter text-gray-400 hover:text-primary transition-colors duration-300">
                  {t('navbar.work')}
                </a>
                <a href="#contact" className="font-inter text-gray-400 hover:text-primary transition-colors duration-300">
                  {t('navbar.contact')}
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-inter text-gray-600 text-sm">
              {t('contact.copyright')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>
    </section>
  );
};

export default Contact;


