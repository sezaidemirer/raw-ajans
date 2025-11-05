import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0); // Index olarak tutuyoruz

  const categories = [
    t('blog.categories.all'),
    t('blog.categories.creative'),
    t('blog.categories.social'),
    t('blog.categories.ai'),
    t('blog.categories.marketing')
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Creative Branding",
      excerpt: "Discover how artificial intelligence is revolutionizing the creative industry and what it means for your brand's future.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      category: "AI & Tech",
      author: "Sarah Johnson",
      date: "Nov 1, 2024",
      readTime: "5 min read",
      color: "from-cyan to-blue-500"
    },
    {
      id: 2,
      title: "Social Media Trends That Will Dominate 2025",
      excerpt: "Stay ahead of the curve with these emerging social media trends that will shape the digital landscape.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      category: "Social Media",
      author: "Mike Chen",
      date: "Oct 28, 2024",
      readTime: "4 min read",
      color: "from-magenta to-pink-600"
    },
    {
      id: 3,
      title: "Building a Brand Identity That Resonates",
      excerpt: "Learn the essential elements of creating a powerful brand identity that connects with your audience.",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
      category: "Creative",
      author: "Emma Davis",
      date: "Oct 25, 2024",
      readTime: "6 min read",
      color: "from-primary to-purple-600"
    },
    {
      id: 4,
      title: "Performance Marketing: Data-Driven Success",
      excerpt: "Maximize your ROI with proven performance marketing strategies backed by analytics and insights.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Marketing",
      author: "Alex Turner",
      date: "Oct 22, 2024",
      readTime: "7 min read",
      color: "from-purple-600 to-primary"
    },
    {
      id: 5,
      title: "Content Creation Tips for Maximum Engagement",
      excerpt: "Master the art of creating content that captures attention and drives meaningful engagement.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      category: "Social Media",
      author: "Lisa Park",
      date: "Oct 20, 2024",
      readTime: "5 min read",
      color: "from-pink-600 to-magenta"
    },
    {
      id: 6,
      title: "Automated Workflows: The Future is Now",
      excerpt: "Streamline your creative process with AI-powered automation tools and workflows.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      category: "AI & Tech",
      author: "David Kim",
      date: "Oct 18, 2024",
      readTime: "6 min read",
      color: "from-cyan to-primary"
    }
  ];

  const categoryMapping = ['All', 'Creative', 'Social Media', 'AI & Tech', 'Marketing'];
  
  const filteredPosts = (activeCategory === 0
    ? blogPosts 
    : blogPosts.filter(post => post.category === categoryMapping[activeCategory]))
    .slice(0, 3); // Sadece ilk 3 yazıyı göster

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-x-hidden overflow-y-visible bg-dark" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pr-0" style={{ overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-5xl md:text-7xl mb-6">
            <span className="gradient-text">{t('blog.title')}</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-inter font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-primary to-magenta text-white shadow-lg shadow-primary/50'
                  : 'bg-dark-gray text-gray-400 hover:text-white hover:bg-mid-gray border border-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-dark-gray to-mid-gray rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${post.color} text-white text-sm font-inter font-semibold shadow-lg`}>
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-2xl text-white group-hover:gradient-text transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-inter text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>

                  <motion.button
                    className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${post.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    {t('blog.readMore')}
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </motion.button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${post.color} blur-2xl transition-opacity duration-500`}
                style={{ zIndex: -1 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-magenta to-cyan text-white font-poppins font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05, gap: '1rem' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t('blog.viewAll')}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan via-primary to-magenta"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: -1 }}
            />
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
};

export default Blog;

