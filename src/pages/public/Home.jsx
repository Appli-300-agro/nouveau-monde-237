import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Truck, ShieldCheck, Clock, LayoutDashboard, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, CATEGORIES } from '../../data/mockData';
import ProductCard from '../../components/ui/ProductCard';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

// --- Particules Background ---
const ParticlesBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          opacity: Math.random()
        }}
        animate={{
          y: [null, Math.random() * 100 + "%"],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: Math.random() * 15 + 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    ))}
  </div>
);

// --- Animated Section Wrapper ---
const AnimatedSection = ({ children, className, id }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
};

// --- Tilt Wrapper ---
const TiltWrapper = ({ children, className }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 4);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const sectorsRef = useRef(null);
  const scrollToSectors = (e) => {
    e.preventDefault();
    sectorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const slides = [
    {
      title: <>L'avenir de <br /> <span className="text-primary-light italic">l'Agriculture</span></>,
      subtitle: "Semences, Matériel Agricole et Solutions Durables. La référence premium pour les pros et particuliers au Cameroun.",
      cta1: { label: "Catalogue", link: "/catalogue", icon: true },
      cta2: { label: "Expertise", link: "/contact" },
      icon: "☀️",
      iconLabel: "Solutions Solaires"
    },
    {
      title: <>Votre Partenaire <br /> <span className="text-primary-light italic">Stratégique</span></>,
      subtitle: "nouveau.monde.237 accompagne le développement industriel et domestique avec des solutions innovantes et durables.",
      cta1: { label: "À Propos", link: "/a-propos", icon: false },
      cta2: { label: "Nos Secteurs", link: "#secteurs", action: scrollToSectors },
      icon: "🏢",
      iconLabel: "Expertise Pro"
    },
    {
      title: <>Une Équipe <br /> <span className="text-primary-light italic">Dédiée</span></>,
      subtitle: "Besoin d'un devis personnalisé ou d'une assistance technique ? Nos experts vous répondent sous 24h.",
      cta1: { label: "Contact", link: "/contact", icon: true },
      cta2: { label: "WhatsApp", link: "https://wa.me/237600000000" },
      icon: "📞",
      iconLabel: "Support 24/7"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-x-hidden relative">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left no-print" 
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden text-white bg-secondary-dark">
        <ParticlesBackground />
        
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16"
            >
              {/* Content */}
              <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left order-2 lg:order-1">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 md:space-y-6">
                  <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tighter">
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-light max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light opacity-90">
                    {slides[currentSlide].subtitle}
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to={slides[currentSlide].cta1.link} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-white text-primary hover:scale-105 transition-all shadow-xl h-14 md:h-16 px-8 md:px-10 border-none text-base md:text-lg">
                      {slides[currentSlide].cta1.label}
                      {slides[currentSlide].cta1.icon && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                  </Link>
                  {slides[currentSlide].cta2.action ? (
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg backdrop-blur-md"
                      onClick={slides[currentSlide].cta2.action}
                    >
                      {slides[currentSlide].cta2.label}
                    </Button>
                  ) : (
                    <Link to={slides[currentSlide].cta2.link} className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg backdrop-blur-md">
                        {slides[currentSlide].cta2.label}
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-[280px] sm:max-w-md lg:max-w-xl perspective-1000 order-1 lg:order-2">
                <TiltWrapper className="glass-card p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden group">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="relative z-10 text-center space-y-4 sm:space-y-8">
                        <motion.div 
                          className="bg-white/10 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] inline-flex backdrop-blur-2xl border border-white/20 shadow-inner"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-4xl sm:text-7xl drop-shadow-2xl">{slides[currentSlide].icon}</span>
                        </motion.div>
                        <div className="space-y-1 sm:space-y-2">
                            <h3 className="text-xl sm:text-3xl font-heading font-bold tracking-tight">{slides[currentSlide].iconLabel}</h3>
                            <div className="h-1 w-8 sm:w-12 bg-white/20 mx-auto rounded-full" />
                        </div>
                    </div>
                </TiltWrapper>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center lg:justify-start gap-4 mt-16">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="group p-2"
              >
                <div className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-16 bg-white" : "w-4 bg-white/30 group-hover:bg-white/50"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Truck} 
            title="Service Express" 
            description="Une expérience culinaire livrée chez vous ou à savourer sur place. avec calcul en temps réel."
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Paiement Sécurisé" 
            description="Transactions certifiées via MoMo, OM ou Carte Bancaire. Sécurité maximale."
          />
          <FeatureCard 
            icon={Clock} 
            title="Support Premium" 
            description="Une équipe dédiée et un assistant IA disponible 24/7 pour vos besoins techniques."
          />
        </div>
      </AnimatedSection>

      {/* Featured Products */}
      <AnimatedSection className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
                <h2 className="text-5xl font-heading font-bold text-secondary-dark tracking-tighter">Sélection Vedette</h2>
                <p className="text-secondary text-lg font-light">Le meilleur de l'innovation technologique et du confort.</p>
            </div>
            <Link to="/catalogue" className="group flex items-center text-primary font-bold text-lg hover:text-primary/80 transition-colors">
                Voir toute la collection 
                <div className="ml-3 p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard 
                      product={product} 
                      onAddToCart={() => addToCart(product)} 
                  />
                </motion.div>
            ))}
        </div>
      </AnimatedSection>

      {/* Categories Grid */}
      <div ref={sectorsRef}>
        <AnimatedSection className="container mx-auto px-4 bg-slate-50/50 py-16 md:py-24 rounded-[3rem] md:rounded-[4rem] border border-slate-100">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary-dark tracking-tighter uppercase">Nos Solutions</h2>
                <div className="h-1 w-16 md:h-1.5 md:w-20 bg-primary mx-auto rounded-full" />
                <p className="text-secondary text-lg md:text-xl font-light pt-4 px-4">L'art de la gastronomie et du service d'exception.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {CATEGORIES.map((cat, idx) => {
                    const themes = {
                        'Plats Signatures': { icon: "🥘", color: "from-orange-400 to-red-500" },
                        'Entrées': { icon: "🥗", color: "from-green-400 to-emerald-600" },
                        'Boissons': { icon: "🍷", color: "from-blue-400 to-indigo-600" },
                        'Desserts': { icon: "🍰", color: "from-pink-400 to-rose-500" }
                    };
                    const theme = themes[cat] || { icon: "🍽️", color: "from-slate-400 to-slate-600" };
                    return <CategoryCard key={idx} title={cat} {...theme} />;
                })}
            </div>
        </AnimatedSection>
      </div>

      {/* Modern CTA */}
      <AnimatedSection className="container mx-auto px-4 mb-20">
        <motion.div 
          className="relative bg-secondary-dark rounded-[3rem] md:rounded-[4rem] p-10 md:p-32 overflow-hidden text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.005 }}
        >
             <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-purple-500/20"
                animate={{ 
                    background: [
                        "radial-gradient(circle at 0% 0%, rgba(0,86,179,0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(0,86,179,0.15) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(0,86,179,0.15) 0%, transparent 50%)"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
             />
             
             <div className="relative z-10 space-y-8 md:space-y-10">
                <h2 className="text-3xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-tight">
                    Un projet <span className="text-primary italic">gastronomique</span> ?
                </h2>
                <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                    De la réception privée au banquet d'entreprise, nos chefs conçoivent vos menus de demain.
                </p>
                <div className="flex justify-center pt-6 md:pt-10">
                    <motion.div
                      animate={{ boxShadow: ["0 0 0px rgba(0,86,179,0)", "0 0 40px rgba(0,86,179,0.4)", "0 0 0px rgba(0,86,179,0)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="rounded-full w-full sm:w-auto"
                    >
                        <Link to="/devis">
                            <Button size="lg" className="rounded-full h-16 md:h-20 px-8 md:px-16 text-lg md:text-2xl bg-primary hover:bg-primary/90 border-none shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                                Demander un devis
                            </Button>
                        </Link>
                    </motion.div>
                </div>
             </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

// --- Helper Components ---

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div 
        variants={itemVariants}
        whileHover={{ y: -15, transition: { duration: 0.4, ease: "easeOut" } }}
        className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[6rem] -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-700" />
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-10 group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
            <Icon className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold mb-5 text-secondary-dark tracking-tight">{title}</h3>
        <p className="text-secondary leading-relaxed font-light text-lg">{description}</p>
        <div className="mt-10 flex items-center text-primary font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            En savoir plus <ChevronRight className="w-4 h-4" />
        </div>
    </motion.div>
);

const CategoryCard = ({ title, icon, color }) => (
    <Link to={`/catalogue?category=${title}`} className="group block">
        <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`aspect-square rounded-[3rem] flex flex-col items-center justify-center gap-8 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] bg-gradient-to-br ${color} p-10 relative overflow-hidden`}
        >
            <motion.div 
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.span 
              className="text-6xl drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {icon}
            </motion.span>
            <span className="font-bold text-center leading-tight text-white text-lg drop-shadow-md">
                {title}
            </span>
        </motion.div>
    </Link>
);

export default Home;