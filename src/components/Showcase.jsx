import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Showcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();
  const [openVideoIndex, setOpenVideoIndex] = useState(null);

  const handleVideoClick = (videoId, index) => {
    if (videoId) {
      if (openVideoIndex === index) {
        // Aynı videoya tıklandıysa kapat
        setOpenVideoIndex(null);
      } else {
        // Yeni video aç
        setOpenVideoIndex(index);
      }
    }
  };

  const projectColors = [
    "from-primary to-purple-600",
    "from-magenta to-pink-600",
    "from-cyan to-blue-500",
    "from-purple-600 to-primary",
    "from-pink-600 to-magenta",
    "from-blue-500 to-cyan"
  ];

  const projectImages = [
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80"
  ];

  // Optional YouTube video IDs (set to undefined if not a video card)
  const projectVideos = [
    "SbDnJNV-UFQ", // First featured work video
    "O7EZHZUj6YY", // Second featured work video
    "2Kr6FoFg8LQ", // Third featured work video
    "mhg6UfNimzE", // Fourth featured work video
    "77ntngLR3nA", // Fifth featured work video
    "wZrwvZ8ZXdE" // Sixth featured work video
  ];

  const projects = [0, 1, 2, 3, 4, 5].map((index) => ({
    title: t(`showcase.projects.${index}.title`),
    category: t(`showcase.projects.${index}.category`),
    color: projectColors[index],
    image: projectImages[index],
    videoId: projectVideos[index]
  }));

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
    <section ref={ref} className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-dark via-dark-gray to-dark">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="gradient-text">{t('showcase.title')}</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t('showcase.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group cursor-pointer"
              onClick={() => handleVideoClick(project.videoId, index)}
            >
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-dark-gray border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
                
                {/* Media Container */}
                <div className="relative aspect-video overflow-hidden">
                  {project.videoId ? (
                    openVideoIndex === index ? (
                      // Video açık ise iframe göster
                      <div className="absolute inset-0">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={project.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <>
                        {/* YouTube Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="font-inter text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('showcase.cta', 'Want to see more? Let\'s start a conversation.')}
          </p>
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary via-magenta to-cyan text-white font-poppins font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>{t('showcase.viewPortfolio', 'View Full Portfolio')}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full opacity-10 blur-3xl"
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
    </section>
  );
};

export default Showcase;


