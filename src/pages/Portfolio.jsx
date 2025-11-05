import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const portfolioVideos = [
    {
      id: 1,
      videoId: "SbDnJNV-UFQ",
      title: t('showcase.projects.0.title'),
      category: t('showcase.projects.0.category')
    },
    {
      id: 2,
      videoId: "O7EZHZUj6YY",
      title: t('showcase.projects.1.title'),
      category: t('showcase.projects.1.category')
    },
    {
      id: 3,
      videoId: "2Kr6FoFg8LQ",
      title: t('showcase.projects.2.title'),
      category: t('showcase.projects.2.category')
    },
    {
      id: 4,
      videoId: "mhg6UfNimzE",
      title: t('showcase.projects.3.title'),
      category: t('showcase.projects.3.category')
    },
    {
      id: 5,
      videoId: "77ntngLR3nA",
      title: t('showcase.projects.4.title'),
      category: t('showcase.projects.4.category')
    },
    {
      id: 6,
      videoId: "wZrwvZ8ZXdE",
      title: t('showcase.projects.5.title'),
      category: t('showcase.projects.5.category')
    },
    {
      id: 7,
      videoId: "I-dplxqRGK8",
      title: t('showcase.projects.6.title'),
      category: t('showcase.projects.6.category')
    },
    {
      id: 8,
      videoId: "1iIUVwgUTFI",
      title: t('showcase.projects.7.title'),
      category: t('showcase.projects.7.category')
    },
    {
      id: 9,
      videoId: "dVLWWhTSdkA",
      title: t('showcase.projects.8.title'),
      category: t('showcase.projects.8.category')
    }
  ];

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
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Navigation */}
      <Navbar />
      
      {/* Header */}
      <div className="relative py-20 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-inter">{t('portfolio.back', 'Back to Home')}</span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-4">
              <span className="gradient-text">{t('portfolio.title', 'Portfolio')}</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-400 max-w-3xl">
              {t('portfolio.subtitle', 'Our creative work and projects')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section ref={ref} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-dark-gray border border-gray-800 hover:border-primary transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(video)}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-magenta/20 to-cyan/20 blur-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-video mb-6">
                <iframe
                  className="w-full h-full rounded-2xl shadow-2xl"
                  src={`https://www.youtube.com/embed/${selectedImage.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={selectedImage.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <p className="font-poppins font-semibold text-lg text-white">
                  {t('portfolio.director', 'Yönetmen: Sezai Demirer | Raw Ajans')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;

