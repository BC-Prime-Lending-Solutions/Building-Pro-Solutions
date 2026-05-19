import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SEO } from '../components/SEO';

export const Home = () => {
  return (
    <>
      <SEO
        title="BP Solutions Florida | General Contractor & Construction Company in South Florida"
        description="BP Solutions Florida provides design-build, remodeling, permitting, and construction services across South Florida for residential and commercial projects."
        canonical="/"
      />
      <Hero />
      <GeometricTrustBar />
      <SocialShowcase />
      <AreaSection />
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Background with Grid Layout */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div style={{ y: bgY }} className="h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-1 p-1">
            <div className="bg-charcoal border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-tropical-teal/10 to-transparent"></div>
              <span className="text-[100px] md:text-[150px] font-serif text-white/5 select-none -rotate-12 uppercase tracking-tighter">Estate</span>
            </div>
            <div className="bg-charcoal border border-white/5 relative overflow-hidden hidden md:block">
              <div className="absolute inset-0 bg-gold/5"></div>
              <div className="w-full h-full border-l-4 border-t-4 border-gold/20 m-8"></div>
              <OptimizedImage
                src="/images/hero-mansion.png"
                alt="Luxury custom home construction by BP Solutions Florida, a leading general contractor in South Florida"
                className="absolute inset-0 w-full h-full opacity-30 filter grayscale"
              />
            </div>
            <div className="bg-charcoal border border-white/5 flex flex-col justify-end p-8 hidden md:flex">
              <div className="h-1/2 w-1 bg-gradient-to-t from-gold to-transparent mb-4"></div>
              <span className="text-[80px] font-serif text-white/5 select-none font-bold">BPS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center px-6 md:px-16 md:max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y: textY }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold"></div>
            <span className="uppercase text-gold tracking-[0.4em] text-xs font-bold">Licensed General Contractor · South Florida</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] mb-8 text-white drop-shadow-lg">
            <span className="block">South Florida's</span>
            <span className="block text-gold">General Contractor</span>
            <span className="block italic">&amp; Construction Experts</span>
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed mb-10 font-light border-l-2 border-tropical-teal pl-6">
            From luxury waterfront mansions to high-rise developments, Building Pro Solutions delivers turnkey architectural and construction excellence across Miami, Boca Raton, and the Palm Beaches.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gold text-luxury-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold/80 transition-all relative group overflow-hidden">
              <span className="relative z-10">Request Consultation</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            </button>
            <button className="border border-white/20 px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all backdrop-blur-sm text-white">
              View Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      {/* Side Info Panel */}
      <div className="absolute right-0 bottom-0 w-1/3 h-[60%] bg-charcoal/80 backdrop-blur-md border-l border-t border-white/10 p-10 flex flex-col justify-between hidden lg:flex z-20">
        <div className="space-y-6">
          {[
            { id: '01', title: 'Waterfront Estates', desc: 'Custom residential projects optimized for coastal living.' },
            { id: '02', title: 'Commercial Dev', desc: 'Modern high-rises and mixed-use spaces in Brickell.' },
            { id: '03', title: 'Outdoor Living', desc: 'Rooftop terraces, infinity pools, and tropical landscaping.' }
          ].map((item) => (
            <div key={item.id} className="flex items-start gap-4 group">
              <span className="text-gold font-serif italic text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{item.id}</span>
              <div>
                <h4 className="text-xs uppercase tracking-widest mb-1 text-white/90 font-bold">{item.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-white/50 uppercase tracking-tighter mb-1">Estimated Value Managed</span>
            <span className="text-xl md:text-2xl font-serif text-gold">$1.2B+</span>
          </div>
          <div className="h-10 w-10 border border-gold rounded-full flex items-center justify-center animate-pulse">
            <div className="h-2 w-2 bg-gold rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GeometricTrustBar = () => {
  return (
    <section className="h-auto py-6 md:h-24 md:py-0 w-full bg-charcoal border-t border-white/10 flex flex-col md:flex-row items-center px-6 md:px-12 justify-between z-20 gap-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left w-full md:w-auto">
        <span className="text-xs uppercase tracking-widest text-gold font-bold">Exclusive Service Areas:</span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs uppercase tracking-widest text-white/60 font-medium">
          <span>Miami</span>
          <span className="text-tropical-teal hidden md:inline">•</span>
          <span>Brickell</span>
          <span className="text-tropical-teal hidden md:inline">•</span>
          <span>Fort Lauderdale</span>
          <span className="text-tropical-teal hidden md:inline">•</span>
          <span>Boca Raton</span>
          <span className="text-tropical-teal hidden md:inline">•</span>
          <span>Palm Beach</span>
        </div>
      </div>
      <div className="flex gap-6 md:gap-10 shrink-0 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase tracking-tighter text-white/50">Licensing</span>
          <span className="text-xs text-white/90 font-bold">FL-GC #192038</span>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase tracking-tighter text-white/50">Warranty</span>
          <span className="text-xs text-white/90 font-bold">Lifetime Structural</span>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase tracking-tighter text-white/50">Financing</span>
          <span className="text-xs text-tropical-teal font-bold uppercase tracking-widest">In-House</span>
        </div>
      </div>
    </section>
  );
};

const SocialShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const posts = [
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-penthouse.png', label: 'On-Site Progress' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-manor.png', label: 'Luxury Interiors' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-boutique.png', label: 'Coastal Design' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-marina.png', label: 'Project Reveal' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-pool.png', label: 'Infinity Pool' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-patio.png', label: 'Luxury Patio' },
    { platform: 'Instagram', handle: '@buildingprosolution', url: 'https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==', image: '/images/portfolio-bbq.png', label: 'Summer Kitchen' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <section className="py-24 bg-luxury-black border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Construction Portfolio</span>
            <h2 className="text-4xl md:text-5xl text-white font-serif">South Florida <span className="italic text-white/50">Construction</span> Projects</h2>
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gold hover:text-luxury-black transition-all">
              Instagram
            </a>
            <a href="#" className="bg-white/5 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gold hover:text-luxury-black transition-all">
              TikTok
            </a>
          </div>
        </div>

        <div className="relative w-full">
          <motion.div
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * 16}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {posts.map((post, i) => (
              <a
                key={i} href={post.url} target="_blank" rel="noopener noreferrer"
                className="group relative aspect-[4/5] md:aspect-[16/9] w-full shrink-0 overflow-hidden bg-charcoal border border-white/5 hover:border-gold/30 transition-colors block"
              >
                <OptimizedImage
                  src={post.image}
                  alt={post.label}
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase tracking-tighter">{post.platform[0]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6 bg-gold" />
                      <span className="text-sm uppercase tracking-widest text-gold font-bold">{post.label}</span>
                    </div>
                    <p className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">{post.handle}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center bg-gold/10 backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-gold border-y-[8px] border-y-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-gold/30 m-3 transition-all duration-500" />
              </a>
            ))}
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-500 ${currentIndex === i ? 'w-8 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AreaSection = () => {
  const areas = ['Miami', 'Miami Beach', 'Brickell', 'Coral Gables', 'Coconut Grove', 'Pinecrest', 'Fort Lauderdale', 'Boca Raton', 'Delray Beach', 'West Palm Beach', 'Palm Beach'];
  return (
    <section className="py-24 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">Service Area Coverage</span>
            <h2 className="text-4xl md:text-6xl text-white font-serif mb-8">General Contractor Serving <br /><span className="text-slate-400 italic">Miami-Dade, Broward &amp; Palm Beach</span></h2>
            <p className="text-slate-400 mb-12 text-lg">
              BP Solutions Florida delivers licensed general contracting, design-build, and remodeling services across Miami-Dade, Broward, and Palm Beach counties — bringing premium construction expertise to every South Florida community.
            </p>
            <div className="flex flex-wrap gap-4">
              {areas.map((area, i) => (
                <div key={i} className="flex items-center gap-2 bg-charcoal/50 border border-white/5 py-3 px-6 rounded-full hover:border-gold/40 hover:bg-charcoal transition-colors">
                  <MapPin size={16} className="text-gold" />
                  <span className="text-sm font-medium text-slate-300">{area}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/10 blur-[120px] rounded-full" />
            <motion.div
              initial={{ rotate: 10, scale: 0.9 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative glass-card p-4 rotate-2 hover:rotate-0 transition-transform duration-700"
            >
              <OptimizedImage
                src="/images/area-skyline.png"
                alt="Miami-Dade and Broward County skyline — BP Solutions Florida service area for general contracting and construction"
                className="w-full h-auto rounded-sm"
              />
              <div className="mt-6 p-4">
                <p className="text-white text-xl font-serif">Building the Future of Modern Coastal Living.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
