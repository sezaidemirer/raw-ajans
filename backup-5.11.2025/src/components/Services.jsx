import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Camera, Users, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const services = [
    {
      icon: Camera,
      title: t('services.items.creative.title'),
      description: t('services.items.creative.description'),
      details: [0, 1, 2, 3].map(i => t(`services.items.creative.details.${i}`)),
      color: "from-primary to-purple-600",
      glowColor: "rgba(168,85,247,0.3)",
      number: "01",
      image: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=800&q=80" // Film production backstage/behind the scenes
    },
    {
      icon: Users,
      title: t('services.items.social.title'),
      description: t('services.items.social.description'),
      details: [0, 1, 2, 3].map(i => t(`services.items.social.details.${i}`)),
      color: "from-magenta to-pink-600",
      glowColor: "rgba(255,0,128,0.3)",
      number: "02",
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80" // Multiple social media icons/apps
    },
    {
      icon: Sparkles,
      title: t('services.items.ai.title'),
      description: t('services.items.ai.description'),
      details: [0, 1, 2, 3].map(i => t(`services.items.ai.details.${i}`)),
      color: "from-cyan to-blue-500",
      glowColor: "rgba(0,255,255,0.3)",
      number: "03",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" // AI/Digital brain neural network
    },
    {
      icon: TrendingUp,
      title: t('services.items.ads.title'),
      description: t('services.items.ads.description'),
      details: [0, 1, 2, 3].map(i => t(`services.items.ads.details.${i}`)),
      color: "from-purple-600 to-primary",
      glowColor: "rgba(168,85,247,0.3)",
      number: "04",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" // Analytics/data/ads
    }
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden bg-dark">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services - Full Width Alternating Layout */}
        <div className="space-y-12 md:space-y-20">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                  
                  {/* Icon & Visual Section */}
                  <motion.div 
                    className="w-full md:w-1/2 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-dark-gray to-mid-gray border border-gray-800">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-dark/40" />
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 mix-blend-multiply group-hover:opacity-30 transition-opacity duration-500`} />
                      </div>
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${service.glowColor} 0%, transparent 70%)`
                        }}
                      />

                      {/* Decorative particles */}
                      <motion.div
                        className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} opacity-30 blur-3xl`}
                        animate={{
                          scale: [1, 1.5, 1],
                          x: [0, 20, 0],
                          y: [0, -20, 0]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className={`absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-30 blur-2xl`}
                        animate={{
                          scale: [1, 1.3, 1],
                          x: [0, -15, 0],
                          y: [0, 15, 0]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 space-y-6">
                    {/* Service Number */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <span className={`font-montserrat font-black text-6xl md:text-7xl bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}>
                        {service.number}
                      </span>
                      <div className={`h-1 flex-1 bg-gradient-to-r ${service.color} rounded-full`} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      className="font-poppins font-bold text-4xl md:text-5xl text-white group-hover:gradient-text transition-all duration-300"
                    >
                      {service.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      className="font-inter text-lg md:text-xl text-gray-400 leading-relaxed"
                    >
                      {service.description}
                    </motion.p>

                    {/* Details List */}
                    <motion.ul
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      className="space-y-3"
                    >
                      {service.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-3 text-gray-300 font-inter"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.color}`} />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Learn More Button */}
                    <motion.button
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      className={`group/btn mt-6 flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r ${service.color} text-white font-inter font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      whileHover={{ gap: '1rem' }}
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>

                {/* Bottom divider line */}
                {index < services.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 + 0.7 }}
                    className={`mt-12 md:mt-20 h-px bg-gradient-to-r ${service.color} opacity-20`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;


