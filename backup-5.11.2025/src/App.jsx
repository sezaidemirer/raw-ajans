import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import SmartChatbot from './components/SmartChatbot';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cursor follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth scroll behavior - hash'i URL'den kaldır
  useEffect(() => {
    // Sayfa yüklendiğinde hash varsa kaldır
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Hash değişikliklerini engelle
    const handleHashChange = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Scroll sonrası hash'i URL'den kaldır
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname);
          }, 100);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (isLoading) {
    return <Loading onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative bg-dark text-white overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'auto' }}>
      {/* Custom Cursor Glow */}
      <motion.div
        className="cursor-glow hidden md:block"
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'auto' }}>
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="services"><Services /></div>
        <div id="showcase"><Showcase /></div>
        <div id="blog"><Blog /></div>
        <Contact />
      </main>


      {/* Back to top button */}
      <motion.button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            window.history.replaceState(null, '', window.location.pathname);
          }, 100);
        }}
        className="fixed bottom-8 left-8 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-magenta text-white shadow-lg hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>

      {/* Smart AI Chatbot - Knowledge Based */}
      <SmartChatbot />
    </div>
  );
}

export default App;

