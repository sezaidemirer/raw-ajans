import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Showcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { t } = useTranslation();

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
    "dQw4w9WgXcQ", // sample video id
    "kXYiU_JCYtU",
    "3JZ_D3ELwOQ",
    undefined,
    undefined,
    undefined
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
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-dark-gray border border-gray-800 hover:border-gray-700 transition-all duration-500 shadow-xl hover:shadow-2xl">
                
                {/* Media Container (YouTube or Image) */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* YouTube Video (if provided) */}
                  {project.videoId ? (
                    <div className="absolute inset-0">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1&playsinline=1`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  {/* Dark Gradient Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={hoveredIndex === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4"
                  >
                    <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-poppins font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm`}>
                      {project.category}
                    </span>
                  </motion.div>

                  {/* External Link Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredIndex === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Title at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3
                      className="font-poppins font-bold text-2xl md:text-3xl text-white mb-2"
                      initial={{ y: 10, opacity: 0.8 }}
                      animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    {/* View Project Text */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex items-center gap-2 text-white/90 font-inter text-sm"
                    >
                      <span>{t('showcase.viewProject', 'View Project')}</span>
                      <motion.div
                        animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
                />
              </div>

              {/* Number Badge (Optional) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-dark border-2 border-gray-800 flex items-center justify-center z-10"
              >
                <span className={`font-montserrat font-black text-lg bg-gradient-to-br ${project.color} bg-clip-text text-transparent`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
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


