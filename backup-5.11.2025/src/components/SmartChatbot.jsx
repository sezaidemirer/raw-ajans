import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SmartChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, i18n } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // İlk açılışta karşılama mesajı
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(t('chatbot.welcome'));
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text) => {
    const botMessage = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setMessages(prev => [...prev, userMessage]);
  };

  // Web sitesi bilgi bankası
  const knowledgeBase = {
    tr: {
      services: {
        creative: {
          name: "Raw Creative",
          details: "Markalama, film yönetimi, fotoğrafçılık ve hikaye anlatımı konusunda uzmanlık. Marka kimliği oluşturma, video prodüksiyonu, profesyonel fotoğraf çekimleri ve görsel hikaye anlatımı yapıyoruz.",
          items: ["Marka Kimliği & Strateji", "Film & Video Prodüksiyonu", "Fotoğrafçılık & Sanat Yönetimi", "Görsel Hikaye Anlatımı"]
        },
        social: {
          name: "Raw Social",
          details: "Sosyal medya yönetimi, içerik oluşturma ve influencer pazarlama. Markanızın sosyal medyadaki varlığını güçlendiriyor, etkileşim oranlarını artırıyor ve topluluk oluşturuyoruz.",
          items: ["Sosyal Medya Stratejisi", "İçerik Üretimi & Yönetimi", "Influencer Ortaklıkları", "Topluluk Etkileşimi"]
        },
        ai: {
          name: "Raw AI",
          details: "AI destekli markalama, otomatik iş akışları ve yaratıcı zeka sistemleri. Yapay zeka ile markanızı geleceğe taşıyor, süreçlerinizi otomatikleştiriyor ve veri odaklı kararlar almanızı sağlıyoruz.",
          items: ["AI Destekli Markalama", "Otomatik İş Akışları", "Yaratıcı Zeka", "Veri Odaklı İçgörüler"]
        },
        ads: {
          name: "Raw Ads",
          details: "Performans pazarlama, kampanya stratejisi, medya satın alma ve analitik. ROI odaklı reklam kampanyaları yönetiyoruz, hedef kitlenize ulaşmanızı ve satışlarınızı artırmanızı sağlıyoruz.",
          items: ["Performans Pazarlama", "Kampanya Stratejisi", "Medya Satın Alma & Planlama", "Analitik & Optimizasyon"]
        }
      },
      projects: [
        { name: "Marka Evrimi", category: "Markalama & Kimlik", desc: "Kapsamlı marka yenileme projesi" },
        { name: "Sosyal Kampanya", category: "Sosyal Medya", desc: "Viral sosyal medya kampanyası" },
        { name: "AI Entegrasyonu", category: "Teknoloji", desc: "AI destekli otomasyon sistemi" },
        { name: "Ürün Lansmanı", category: "Reklamcılık", desc: "360 derece ürün lansmanı" },
        { name: "Dijital Deneyim", category: "Web Tasarım", desc: "İnteraktif web deneyimi" },
        { name: "Görsel Hikaye", category: "Fotoğrafçılık", desc: "Profesyonel fotoğraf serisi" }
      ],
      blog: [
        { title: "AI'ın Yaratıcı Markalaşmadaki Geleceği", category: "AI & Tech" },
        { title: "2025'e Damga Vuracak Sosyal Medya Trendleri", category: "Social Media" },
        { title: "Rezonans Yaratan Marka Kimliği Oluşturma", category: "Creative" },
        { title: "Performans Pazarlama: Veri Odaklı Başarı", category: "Marketing" },
        { title: "Maksimum Etkileşim İçin İçerik Üretim İpuçları", category: "Social Media" },
        { title: "Otomatik İş Akışları: Gelecek Şimdi", category: "AI & Tech" }
      ]
    },
    en: {
      services: {
        creative: {
          name: "Raw Creative",
          details: "Expertise in branding, film direction, photography and storytelling. We create brand identities, video production, professional photography and visual storytelling.",
          items: ["Brand Identity & Strategy", "Film & Video Production", "Photography & Art Direction", "Visual Storytelling"]
        },
        social: {
          name: "Raw Social",
          details: "Social media management, content creation and influencer marketing. We strengthen your brand's social media presence, increase engagement rates and build communities.",
          items: ["Social Media Strategy", "Content Creation & Management", "Influencer Partnerships", "Community Engagement"]
        },
        ai: {
          name: "Raw AI",
          details: "AI-powered branding, automated workflows and creative intelligence systems. We take your brand to the future with AI, automate your processes and enable data-driven decisions.",
          items: ["AI-Powered Branding", "Automated Workflows", "Creative Intelligence", "Data-Driven Insights"]
        },
        ads: {
          name: "Raw Ads",
          details: "Performance marketing, campaign strategy, media buying and analytics. We manage ROI-focused ad campaigns, help you reach your target audience and increase sales.",
          items: ["Performance Marketing", "Campaign Strategy", "Media Buying & Planning", "Analytics & Optimization"]
        }
      },
      projects: [
        { name: "Brand Evolution", category: "Branding & Identity", desc: "Comprehensive brand renewal project" },
        { name: "Social Campaign", category: "Social Media", desc: "Viral social media campaign" },
        { name: "AI Integration", category: "Technology", desc: "AI-powered automation system" },
        { name: "Product Launch", category: "Advertising", desc: "360-degree product launch" },
        { name: "Digital Experience", category: "Web Design", desc: "Interactive web experience" },
        { name: "Visual Story", category: "Photography", desc: "Professional photo series" }
      ],
      blog: [
        { title: "The Future of AI in Creative Branding", category: "AI & Tech" },
        { title: "Social Media Trends That Will Dominate 2025", category: "Social Media" },
        { title: "Building a Brand Identity That Resonates", category: "Creative" },
        { title: "Performance Marketing: Data-Driven Success", category: "Marketing" },
        { title: "Content Creation Tips for Maximum Engagement", category: "Social Media" },
        { title: "Automated Workflows: The Future is Now", category: "AI & Tech" }
      ]
    }
  };

  const kb = knowledgeBase[i18n.language];

  // Akıllı cevap sistemi
  const getSmartResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Selamlama
    if (msg.match(/\b(merhaba|selam|hey|hi|hello)\b/)) {
      return i18n.language === 'tr'
        ? "Merhaba! 👋 Raw Ajans AI Asistanı'na hoş geldiniz. Size nasıl yardımcı olabilirim?\n\n💡 Size şunlar hakkında bilgi verebilirim:\n• Hizmetlerimiz (Creative, Social, AI, Ads)\n• Projelerimiz ve çalışmalarımız\n• Blog içeriklerimiz\n• İletişim bilgileri"
        : "Hello! 👋 Welcome to Raw Ajans AI Assistant. How can I help you?\n\n💡 I can inform you about:\n• Our services (Creative, Social, AI, Ads)\n• Our projects and work\n• Blog content\n• Contact information";
    }

    // Genel hizmetler sorusu
    if (msg.match(/\b(hizmet|servis|service|ne yapıyor|what do you do|offer)\b/)) {
      const services = Object.values(kb.services);
      const serviceList = services.map((s, i) => 
        `${i+1}. **${s.name}** - ${s.items.join(', ')}`
      ).join('\n\n');
      
      return i18n.language === 'tr'
        ? `Raw Ajans olarak 4 ana hizmet kategorisinde çalışıyoruz:\n\n${serviceList}\n\n🎯 Hangi hizmet hakkında daha detaylı bilgi almak istersiniz?`
        : `Raw Ajans works in 4 main service categories:\n\n${serviceList}\n\n🎯 Which service would you like to know more about?`;
    }

    // Creative hizmeti
    if (msg.match(/\b(creative|yaratıcı|kreatif|marka|brand|film|video|fotoğraf|photo)\b/)) {
      const s = kb.services.creative;
      return i18n.language === 'tr'
        ? `🎨 **${s.name}**\n\n${s.details}\n\n📋 **Hizmetlerimiz:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n💼 Marka kimliğinizi oluşturmak veya yenilemek için bizimle iletişime geçebilirsiniz!`
        : `🎨 **${s.name}**\n\n${s.details}\n\n📋 **Our Services:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n💼 Contact us to create or renew your brand identity!`;
    }

    // Social media hizmeti
    if (msg.match(/\b(sosyal|social|medya|media|instagram|facebook|twitter|influencer|content|içerik)\b/)) {
      const s = kb.services.social;
      return i18n.language === 'tr'
        ? `📱 **${s.name}**\n\n${s.details}\n\n📋 **Hizmetlerimiz:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n🚀 Sosyal medya varlığınızı güçlendirmek için hazırız!`
        : `📱 **${s.name}**\n\n${s.details}\n\n📋 **Our Services:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n🚀 We're ready to strengthen your social media presence!`;
    }

    // AI hizmeti
    if (msg.match(/\b(ai|yapay zeka|artificial|intelligence|otomasyon|automation|otomatik)\b/)) {
      const s = kb.services.ai;
      return i18n.language === 'tr'
        ? `🤖 **${s.name}**\n\n${s.details}\n\n📋 **Hizmetlerimiz:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n⚡ AI ile markanızı geleceğe taşıyalım!`
        : `🤖 **${s.name}**\n\n${s.details}\n\n📋 **Our Services:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n⚡ Let's take your brand to the future with AI!`;
    }

    // Ads/Reklam hizmeti
    if (msg.match(/\b(reklam|ads|advertisement|kampanya|campaign|marketing|pazarlama|google ads|facebook ads)\b/)) {
      const s = kb.services.ads;
      return i18n.language === 'tr'
        ? `📊 **${s.name}**\n\n${s.details}\n\n📋 **Hizmetlerimiz:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n📈 Veri odaklı kampanyalarla satışlarınızı artıralım!`
        : `📊 **${s.name}**\n\n${s.details}\n\n📋 **Our Services:**\n${s.items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n📈 Let's increase your sales with data-driven campaigns!`;
    }

    // Projeler/Portfolio
    if (msg.match(/\b(proje|project|çalışma|portfolio|portfolyo|work|iş|örnek|example)\b/)) {
      const projectList = kb.projects.map((p, i) => 
        `${i+1}. **${p.name}** (${p.category})\n   ${p.desc}`
      ).join('\n\n');
      
      return i18n.language === 'tr'
        ? `💼 **Öne Çıkan Çalışmalarımız:**\n\n${projectList}\n\n🎨 Tüm projelerimizde "ham yaratıcılık" felsefesiyle hareket ediyor, markaların hikayelerini en etkili şekilde anlatıyoruz.\n\n📧 Detaylı portfolio için: hello@rawajans.com`
        : `💼 **Our Featured Work:**\n\n${projectList}\n\n🎨 In all our projects, we act with the philosophy of "raw creativity" and tell brands' stories in the most effective way.\n\n📧 For detailed portfolio: hello@rawajans.com`;
    }

    // Blog yazıları
    if (msg.match(/\b(blog|yazı|makale|article|içgörü|insight|trend)\b/)) {
      const blogList = kb.blog.map((b, i) => 
        `${i+1}. ${b.title} (${b.category})`
      ).join('\n');
      
      return i18n.language === 'tr'
        ? `📰 **Blog İçeriklerimiz:**\n\n${blogList}\n\n📚 Blog sayfamızda pazarlama, teknoloji ve yaratıcılık üzerine düzenli olarak içerik paylaşıyoruz.\n\n💡 Hangi konu ilginizi çekiyor?`
        : `📰 **Our Blog Content:**\n\n${blogList}\n\n📚 We regularly share content about marketing, technology and creativity on our blog.\n\n💡 Which topic interests you?`;
    }

    // Fiyat/Ücret
    if (msg.match(/\b(fiyat|ücret|price|cost|maliyet|ne kadar|how much|budget|bütçe)\b/)) {
      return i18n.language === 'tr'
        ? "💰 **Fiyatlandırma Hakkında:**\n\nHer proje benzersizdir ve fiyatlandırma ihtiyaçlarınıza göre özelleştirilir.\n\n📋 **Fiyatı Etkileyen Faktörler:**\n• Proje kapsamı ve süresi\n• Hizmet türü (Creative, Social, AI, Ads)\n• Ekip büyüklüğü ve kaynak ihtiyacı\n• Deliverable sayısı\n\n✨ **İlk danışmanlık görüşmesi ÜCRETSİZ!**\n\n📧 Özel teklif için: hello@rawajans.com\n📞 Telefon: +90 (536) 261 37 36"
        : "💰 **About Pricing:**\n\nEvery project is unique and pricing is customized to your needs.\n\n📋 **Factors Affecting Price:**\n• Project scope and duration\n• Service type (Creative, Social, AI, Ads)\n• Team size and resource needs\n• Number of deliverables\n\n✨ **First consultation is FREE!**\n\n📧 For custom quote: hello@rawajans.com\n📞 Phone: +90 (536) 261 37 36";
    }

    // İletişim
    if (msg.match(/\b(iletişim|contact|ulaş|reach|email|telefon|phone|adres|address|konum|location)\b/)) {
      return i18n.language === 'tr'
        ? "📧 **İletişim Bilgileri:**\n\n📬 **Email:** hello@rawajans.com\n📞 **Telefon:** +90 (536) 261 37 36\n📍 **Adres:** İstanbul - Bodrum\n\n🌐 **Sosyal Medya:**\n• Instagram: @rawajans\n• LinkedIn: /company/rawajans\n• Twitter: @rawajans\n• YouTube: /rawajans\n\n✨ İlk görüşme ücretsiz, hemen iletişime geçin!"
        : "📧 **Contact Information:**\n\n📬 **Email:** hello@rawajans.com\n📞 **Phone:** +90 (536) 261 37 36\n📍 **Address:** Istanbul - Bodrum\n\n🌐 **Social Media:**\n• Instagram: @rawajans\n• LinkedIn: /company/rawajans\n• Twitter: @rawajans\n• YouTube: /rawajans\n\n✨ First meeting is free, contact us now!";
    }

    // Süreç/Process
    if (msg.match(/\b(süreç|process|nasıl|how|adım|step|başlangıç|start)\b/)) {
      return i18n.language === 'tr'
        ? "🎯 **Çalışma Sürecimiz:**\n\n**1. İlk Görüşme** (Ücretsiz)\n   • İhtiyaçlarınızı dinliyoruz\n   • Hedeflerinizi belirliyoruz\n   • Ön değerlendirme yapıyoruz\n\n**2. Strateji & Planlama**\n   • Detaylı analiz\n   • Özel strateji geliştirme\n   • Teklif sunumu\n\n**3. Yaratım & Uygulama**\n   • Tasarım ve içerik üretimi\n   • Düzenli geri bildirim\n   • Revizyon süreçleri\n\n**4. Lansman & Optimizasyon**\n   • Yayına alma\n   • Performans takibi\n   • Sürekli iyileştirme\n\n📧 Başlamak için: hello@rawajans.com"
        : "🎯 **Our Work Process:**\n\n**1. Initial Meeting** (Free)\n   • We listen to your needs\n   • Define your goals\n   • Initial evaluation\n\n**2. Strategy & Planning**\n   • Detailed analysis\n   • Custom strategy development\n   • Proposal presentation\n\n**3. Creation & Implementation**\n   • Design and content production\n   • Regular feedback\n   • Revision processes\n\n**4. Launch & Optimization**\n   • Going live\n   • Performance tracking\n   • Continuous improvement\n\n📧 To get started: hello@rawajans.com";
    }

    // Referans/Reference
    if (msg.match(/\b(referans|reference|müşteri|client|customer|başarı|success|case study)\b/)) {
      return i18n.language === 'tr'
        ? "🏆 **Başarı Hikayelerimiz:**\n\nRaw Ajans olarak çeşitli sektörlerden markalarla çalışıyoruz:\n\n✅ **Başarılı Projeler:**\n• Marka Evrimi - Tam marka yenileme\n• Viral Sosyal Kampanya - 2M+ erişim\n• AI Entegrasyon - %40 verimlilik artışı\n• Ürün Lansmanı - %300 satış artışı\n• Dijital Deneyim - Ödül kazanan web sitesi\n\n📊 **Ortalama Sonuçlar:**\n• %250 sosyal medya etkileşim artışı\n• %180 marka bilinirliği artışı\n• %320 ROI performansı\n\n💼 Detaylı case study'ler için bizimle iletişime geçin!"
        : "🏆 **Our Success Stories:**\n\nAt Raw Ajans, we work with brands from various sectors:\n\n✅ **Successful Projects:**\n• Brand Evolution - Complete brand renewal\n• Viral Social Campaign - 2M+ reach\n• AI Integration - 40% efficiency increase\n• Product Launch - 300% sales increase\n• Digital Experience - Award-winning website\n\n📊 **Average Results:**\n• 250% social media engagement increase\n• 180% brand awareness increase\n• 320% ROI performance\n\n💼 Contact us for detailed case studies!";
    }

    // Ekip/Team
    if (msg.match(/\b(ekip|team|kim|who|çalışan|employee|uzman|expert)\b/)) {
      return i18n.language === 'tr'
        ? "👥 **Ekibimiz:**\n\nRaw Ajans, yaratıcı düşünen, deneyimli ve tutkulu bir ekiple çalışıyor:\n\n🎨 **Yaratıcı Ekip:**\n• Art Director'ler\n• Grafik Tasarımcılar\n• Film Yönetmenleri\n• Fotoğrafçılar\n\n📱 **Dijital Ekip:**\n• Sosyal Medya Uzmanları\n• Content Creator'lar\n• Community Manager'lar\n\n💻 **Teknoloji Ekip:**\n• AI/ML Uzmanları\n• Web Developer'lar\n• Data Analyst'ler\n\n📊 **Strateji Ekip:**\n• Marketing Strategist'ler\n• Media Planner'lar\n• Performance Manager'lar\n\n💪 Birlikte harika işler çıkarıyoruz!"
        : "👥 **Our Team:**\n\nRaw Ajans works with a creative, experienced and passionate team:\n\n🎨 **Creative Team:**\n• Art Directors\n• Graphic Designers\n• Film Directors\n• Photographers\n\n📱 **Digital Team:**\n• Social Media Experts\n• Content Creators\n• Community Managers\n\n💻 **Technology Team:**\n• AI/ML Specialists\n• Web Developers\n• Data Analysts\n\n📊 **Strategy Team:**\n• Marketing Strategists\n• Media Planners\n• Performance Managers\n\n💪 Together we create amazing work!";
    }

    // Neden biz?
    if (msg.match(/\b(neden|why|fark|difference|özel|special|unique|farklı)\b/)) {
      return i18n.language === 'tr'
        ? "⭐ **Raw Ajans'ı Özel Kılan Nedir?**\n\n🎯 **Filtresiz Yaratıcılık**\n   Şablon çözümler değil, markanıza özel ham fikirler\n\n🤝 **Bütünsel Yaklaşım**\n   Creative, Social, AI ve Ads - hepsi bir arada\n\n📊 **Veri + Yaratıcılık**\n   İçgüdüyü verilerle birleştiriyoruz\n\n🚀 **Teknoloji Odaklı**\n   AI ve otomasyon ile geleceği bugünden yaşatıyoruz\n\n💎 **Kalite & Detay**\n   Her projede mükemmeliyetçi yaklaşım\n\n🎓 **Deneyimli Ekip**\n   Sektörün en iyi isimlerinden oluşan kadro\n\n✨ \"İçgüdüyle tasarlandı. Tutkuyla inşa edildi.\""
        : "⭐ **What Makes Raw Ajans Special?**\n\n🎯 **Unfiltered Creativity**\n   Not template solutions, but raw ideas unique to your brand\n\n🤝 **Holistic Approach**\n   Creative, Social, AI and Ads - all in one\n\n📊 **Data + Creativity**\n   We combine instinct with data\n\n🚀 **Technology Focused**\n   Living the future today with AI and automation\n\n💎 **Quality & Detail**\n   Perfectionist approach in every project\n\n🎓 **Experienced Team**\n   Staff consisting of the best names in the industry\n\n✨ \"Designed with instinct. Built with passion.\"";
    }

    // Teşekkür
    if (msg.match(/\b(teşekkür|sağol|thanks|thank you)\b/)) {
      return i18n.language === 'tr'
        ? "Rica ederim! 😊 Başka bir konuda yardımcı olabilir miyim?\n\n💡 **Size yardımcı olabileceğim konular:**\n• Hizmetlerimiz\n• Projelerimiz\n• Blog içeriklerimiz\n• İletişim\n• Çalışma sürecimiz"
        : "You're welcome! 😊 Can I help you with anything else?\n\n💡 **Topics I can help with:**\n• Our services\n• Our projects\n• Blog content\n• Contact\n• Work process";
    }

    // Blog detayları - AI içerik
    if (msg.match(/\b(ai.*blog|ai.*yazı|ai.*makale|ai.*trend|yapay zeka.*gelecek)\b/)) {
      return i18n.language === 'tr'
        ? "🤖 **AI ile İlgili Blog İçeriklerimiz:**\n\n1. **AI'ın Yaratıcı Markalaşmadaki Geleceği**\n   Yapay zekanın yaratıcı sektörü nasıl dönüştürdüğünü ve markanızın geleceği için ne anlama geldiğini keşfedin.\n\n2. **Otomatik İş Akışları: Gelecek Şimdi**\n   AI destekli otomasyon araçları ve iş akışlarıyla yaratıcı sürecinizi nasıl optimize edebileceğinizi öğrenin.\n\n🎯 AI çözümlerimiz hakkında daha fazla bilgi almak ister misiniz?"
        : "🤖 **Our AI-Related Blog Content:**\n\n1. **The Future of AI in Creative Branding**\n   Discover how AI is transforming the creative industry and what it means for your brand's future.\n\n2. **Automated Workflows: The Future is Now**\n   Learn how to optimize your creative process with AI-powered automation tools and workflows.\n\n🎯 Would you like to know more about our AI solutions?";
    }

    // Sosyal medya blog
    if (msg.match(/\b(sosyal.*trend|social.*trend|2025|sosyal medya.*gelecek)\b/)) {
      return i18n.language === 'tr'
        ? "📱 **Sosyal Medya Blog İçeriklerimiz:**\n\n1. **2025'e Damga Vuracak Sosyal Medya Trendleri**\n   Dijital ortamı şekillendirecek yeni trendlerle rakiplerinizin önünde olun.\n\n2. **Maksimum Etkileşim İçin İçerik Üretim İpuçları**\n   Dikkat çeken ve anlamlı etkileşim yaratan içerik oluşturma sanatında ustalaşın.\n\n🚀 Sosyal medya stratejinizi güçlendirmek için Raw Social hizmetlerimize göz atın!"
        : "📱 **Our Social Media Blog Content:**\n\n1. **Social Media Trends That Will Dominate 2025**\n   Stay ahead with emerging trends that will shape the digital landscape.\n\n2. **Content Creation Tips for Maximum Engagement**\n   Master the art of creating content that captures attention and drives meaningful engagement.\n\n🚀 Check out our Raw Social services to strengthen your social media strategy!";
    }

    // Varsayılan akıllı cevap
    const keywords = msg.split(' ').filter(w => w.length > 3);
    if (keywords.length > 0) {
      return i18n.language === 'tr'
        ? `Anladım, "${userMessage}" hakkında bilgi istiyorsunuz.\n\n💡 **Size yardımcı olabileceğim konular:**\n\n🎨 **Hizmetler:**\n• Creative (Marka, film, fotoğraf)\n• Social (Sosyal medya yönetimi)\n• AI (Yapay zeka çözümleri)\n• Ads (Dijital reklamcılık)\n\n💼 **Projeler & Portfolio**\n📰 **Blog İçerikleri**\n📧 **İletişim Bilgileri**\n💰 **Fiyatlandırma**\n🎯 **Çalışma Süreci**\n\nHangi konu hakkında daha fazla bilgi almak istersiniz?`
        : `I understand, you're asking about "${userMessage}".\n\n💡 **Topics I can help with:**\n\n🎨 **Services:**\n• Creative (Branding, film, photography)\n• Social (Social media management)\n• AI (Artificial intelligence solutions)\n• Ads (Digital advertising)\n\n💼 **Projects & Portfolio**\n📰 **Blog Content**\n📧 **Contact Information**\n💰 **Pricing**\n🎯 **Work Process**\n\nWhich topic would you like to know more about?`;
    }

    return t('chatbot.responses.default');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    addUserMessage(userMsg);
    setInputValue('');
    
    // Bot düşünüyor animasyonu
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = getSmartResponse(userMsg);
      addBotMessage(response);
    }, 800 + Math.random() * 700); // 0.8-1.5 saniye arası
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text) => {
    setInputValue('');
    addUserMessage(text);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const response = getSmartResponse(text);
      addBotMessage(response);
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
    setTimeout(() => {
      addBotMessage(t('chatbot.welcome'));
    }, 300);
  };

  const quickReplies = [
    { key: 'services', icon: '🎨', label: i18n.language === 'tr' ? 'Hizmetleriniz neler?' : 'What are your services?' },
    { key: 'portfolio', icon: '💼', label: i18n.language === 'tr' ? 'Çalışmalarınızı görebilir miyim?' : 'Can I see your work?' },
    { key: 'pricing', icon: '💰', label: i18n.language === 'tr' ? 'Fiyatlar ne kadar?' : 'What are your prices?' },
    { key: 'contact', icon: '📧', label: i18n.language === 'tr' ? 'İletişim bilgileri' : 'Contact info' }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary via-magenta to-cyan text-white shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-7 h-7" />
              {/* Pulse notification */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-8 z-50 w-[420px] max-h-[650px] bg-dark border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-magenta to-cyan p-5 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0"
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-poppins font-bold text-white text-base flex items-center gap-2">
                  Raw AI Assistant
                  <Sparkles className="w-4 h-4" />
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs font-inter truncate">
                    {i18n.language === 'tr' ? 'Akıllı Asistan' : 'Smart Assistant'}
                  </span>
                </div>
              </div>
              <motion.button
                onClick={clearMessages}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
                title={i18n.language === 'tr' ? 'Sohbeti Yenile' : 'Reset Chat'}
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-gray" style={{ maxHeight: '450px' }}>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-500 mt-10 px-4"
                >
                  <Bot className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="font-inter text-sm leading-relaxed">
                    {i18n.language === 'tr' 
                      ? 'Merhaba! Size hizmetlerimiz, projelerimiz ve blog içeriklerimiz hakkında bilgi verebilirim.' 
                      : 'Hello! I can inform you about our services, projects and blog content.'}
                  </p>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-br from-primary to-magenta' 
                      : 'bg-gradient-to-br from-cyan to-blue-500'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'bot'
                        ? 'bg-mid-gray text-gray-200 rounded-tl-none'
                        : 'bg-gradient-to-r from-primary to-magenta text-white rounded-tr-none'
                    }`}>
                      <p className="font-inter text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600 font-inter px-1">
                      {message.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-magenta flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-mid-gray px-6 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 bg-dark border-t border-gray-800"
              >
                <p className="text-xs text-gray-500 font-inter mb-2">
                  {i18n.language === 'tr' ? '💡 Hızlı Sorular:' : '💡 Quick Questions:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.key}
                      onClick={() => handleQuickReply(reply.label)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-2 bg-mid-gray hover:bg-gray-700 text-gray-300 text-xs font-inter rounded-xl transition-colors duration-200 flex items-center gap-2 justify-center"
                    >
                      <span>{reply.icon}</span>
                      <span className="truncate">{reply.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-dark border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-4 py-3 bg-dark-gray border border-gray-800 rounded-full text-white placeholder-gray-500 font-inter text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-magenta disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChatbot;

