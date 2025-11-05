import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
      title: "Creative Production",
      category: "Production"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      title: "Brand Campaign",
      category: "Branding"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
      title: "Digital Strategy",
      category: "Strategy"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=800&q=80",
      title: "Film Production",
      category: "Film"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      title: "AI Innovation",
      category: "Technology"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      title: "Social Media",
      category: "Social"
    }
  ];

  // Navigate to next/previous image
  const goToNext = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % galleryImages.length;
      setSelectedIndex(nextIndex);
      setSelectedImage(galleryImages[nextIndex]);
    }
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      const prevIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedIndex(prevIndex);
      setSelectedImage(galleryImages[prevIndex]);
    }
  };

  // Keyboard navigation and prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage === null || selectedIndex === null) {
      // Modal kapalı, scroll'u tekrar etkinleştir
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      return;
    }

    // Modal açık, body scroll'unu tamamen devre dışı bırak
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%';
    document.documentElement.style.height = '100%';
    
    // Tüm scrollable container'ları kilitle
    const allScrollableElements = document.querySelectorAll('main, .relative.bg-dark');
    const originalStyles = new Map();
    
    allScrollableElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        originalStyles.set(el, {
          overflow: el.style.overflow || '',
          position: el.style.position || '',
          width: el.style.width || '',
          height: el.style.height || ''
        });
        el.style.overflow = 'hidden';
        el.style.position = 'fixed';
        el.style.width = '100%';
        el.style.height = '100%';
      }
    });
    
    // Window scroll'u da engelle
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
    document.addEventListener('scroll', preventScroll, { passive: false, capture: true });

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
        setSelectedIndex(null);
      }
    };

    // Wheel event'ini engelle (mouse scroll)
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Touch move event'ini engelle (mobile scroll)
    const handleTouchMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Scroll event'ini engelle
    const handleScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: false, capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('touchmove', handleTouchMove, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
      
      // Cleanup: scroll'u tekrar etkinleştir
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      
      // Tüm scrollable container'ları kilidi aç
      allScrollableElements.forEach((el) => {
        if (el instanceof HTMLElement && originalStyles.has(el)) {
          const original = originalStyles.get(el);
          el.style.overflow = original.overflow;
          el.style.position = original.position;
          el.style.width = original.width;
          el.style.height = original.height;
        }
      });
      
      window.removeEventListener('scroll', preventScroll, { capture: true });
      document.removeEventListener('scroll', preventScroll, { capture: true });
      
      window.scrollTo(0, scrollY);
    };
  }, [selectedImage, selectedIndex, galleryImages, goToPrev, goToNext]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-gray to-dark opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-6xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Photo Gallery - Single Row Horizontal Scroll */}
        <div className="mt-20 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw] aspect-video overflow-hidden rounded-2xl cursor-pointer bg-dark-gray border border-gray-800 hover:border-primary transition-all duration-500"
                onClick={() => {
                  setSelectedImage(image);
                  setSelectedIndex(index);
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Image */}
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: 'center center' }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10">
                  <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-2xl">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-white bg-primary/80 backdrop-blur-sm rounded-full">
                      {image.category}
                    </span>
                    <h3 className="font-poppins font-bold text-xl text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-magenta/20 to-cyan/20 blur-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox Modal - Independent Popup via Portal */}
        {typeof window !== 'undefined' && createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg"
            onClick={() => {
              setSelectedImage(null);
              setSelectedIndex(null);
            }}
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onScroll={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            style={{ 
              touchAction: 'none', 
              overscrollBehavior: 'none',
              overflow: 'hidden',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              margin: 0,
              padding: 0,
              zIndex: 9999,
              pointerEvents: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full mx-auto px-4"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedIndex(null);
                }}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-10 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

                  {/* Image - 1920x1080 (16:9) Aspect Ratio Container */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-dark-gray shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage.id}
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                  </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="font-poppins font-bold text-2xl text-white mb-2">
                  {selectedImage.title}
                </h3>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-primary/80 backdrop-blur-sm rounded-full">
                  {selectedImage.category}
                </span>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-inter">
                {selectedIndex !== null ? `${selectedIndex + 1} / ${galleryImages.length}` : ''}
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
        )}

        {/* Decorative elements */}
        <motion.div
          className="absolute -left-20 top-1/2 w-64 h-64 bg-primary rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-20 w-64 h-64 bg-magenta rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default About;


