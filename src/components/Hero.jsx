import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useTranslation();

  const slideColors = [
    {
      gradientFrom: "from-primary",
      gradientVia: "via-magenta",
      gradientTo: "to-cyan",
      blob1Color: "bg-primary",
      blob2Color: "bg-magenta",
      blob3Color: "bg-cyan"
    },
    {
      gradientFrom: "from-purple-600",
      gradientVia: "via-primary",
      gradientTo: "to-pink-600",
      blob1Color: "bg-purple-600",
      blob2Color: "bg-primary",
      blob3Color: "bg-pink-600"
    },
    {
      gradientFrom: "from-magenta",
      gradientVia: "via-pink-600",
      gradientTo: "to-primary",
      blob1Color: "bg-magenta",
      blob2Color: "bg-pink-600",
      blob3Color: "bg-primary"
    },
    {
      gradientFrom: "from-cyan",
      gradientVia: "via-blue-500",
      gradientTo: "to-primary",
      blob1Color: "bg-cyan",
      blob2Color: "bg-blue-500",
      blob3Color: "bg-primary"
    }
  ];

  const slides = [0, 1, 2, 3].map((index) => ({
    title: t(`hero.slides.${index}.title`),
    description: t(`hero.slides.${index}.description`),
    buttonText: t(`hero.slides.${index}.button`),
    ...slideColors[index]
  }));

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`blob1-${currentSlide}`}
            className={`blob ${currentSlideData.blob1Color} w-96 h-96 top-20 left-20`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`blob2-${currentSlide}`}
            className={`blob ${currentSlideData.blob2Color} w-80 h-80 bottom-20 right-40`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, 40, 0],
              x: [0, -30, 0],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`blob3-${currentSlide}`}
            className={`blob ${currentSlideData.blob3Color} w-72 h-72 top-1/2 right-20`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -25, 0],
              x: [0, 15, 0],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop only (center) */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 md:px-4 max-w-6xl mx-auto pt-16 md:pt-0 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.h1 
              className="font-montserrat font-bold text-2xl sm:text-3xl md:text-6xl lg:text-8xl xl:text-9xl gradient-text whitespace-pre-line px-2 leading-tight md:leading-normal"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {currentSlideData.title}
            </motion.h1>

            <motion.p
              className="font-inter text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 md:px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentSlideData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 md:pt-0"
            >
              <button
                onClick={handleScrollToContact}
                className={`group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r ${currentSlideData.gradientFrom} ${currentSlideData.gradientVia} ${currentSlideData.gradientTo} text-white font-poppins font-semibold text-sm md:text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <span className="relative z-10">{currentSlideData.buttonText}</span>
                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2" />
                
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.gradientTo} ${currentSlideData.gradientVia} ${currentSlideData.gradientFrom}`}
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators with Navigation Arrows (Mobile) */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-3 md:gap-3 z-20">
          {/* Left Arrow - Mobile only */}
          <button
            onClick={prevSlide}
            className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>

          {/* Dots */}
          <div className="flex gap-2 md:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? `w-8 h-2 md:w-12 md:h-3 bg-gradient-to-r ${currentSlideData.gradientFrom} ${currentSlideData.gradientTo}`
                    : 'w-2 h-2 md:w-3 md:h-3 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow - Mobile only */}
          <button
            onClick={nextSlide}
            className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          key={currentSlide}
          className={`h-full bg-gradient-to-r ${currentSlideData.gradientFrom} ${currentSlideData.gradientTo}`}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${(currentSlide / slides.length) * 100}%` : "100%" }}
          transition={{
            duration: isPaused ? 0 : 5,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default Hero;


