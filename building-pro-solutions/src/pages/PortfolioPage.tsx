import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SEO } from '../components/SEO';

export const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Interior Design', 'Commercial', 'Development', 'Outdoor & Pools'];

  const projects = [
    {
      title: 'The Coral Gables Estate',
      category: 'Residential',
      description: 'A 12,000 sq ft mediterranean-style custom home in Coral Gables featuring marble finishes and a private deep-water dock.',
      image: '/images/portfolio-manor.png',
      alt: 'Custom home construction in Coral Gables, South Florida — BP Solutions Florida general contractor',
    },
    {
      title: 'Brickell High-Rise Penthouse',
      category: 'Interior Design',
      description: 'Ultra-modern 54th-floor penthouse remodel in Brickell with floor-to-ceiling glass and custom Italian cabinetry.',
      image: '/images/portfolio-penthouse.png',
      alt: 'Luxury penthouse remodel in Brickell Miami by BP Solutions Florida construction company',
    },
    {
      title: 'Boca Raton Marina Club',
      category: 'Commercial',
      description: 'Commercial waterfront development in Boca Raton featuring a multi-level clubhouse and premium yacht slips.',
      image: '/images/portfolio-marina.png',
      alt: 'Commercial construction project Boca Raton marina club by BP Solutions Florida',
    },
    {
      title: 'South Beach Modernism',
      category: 'Development',
      description: 'Sustainable luxury boutique condos in South Beach integrating tropical greenery and smart-home technology.',
      image: '/images/portfolio-boutique.png',
      alt: 'South Beach luxury condo development by BP Solutions Florida design-build contractor',
    },
    {
      title: 'Infinity Oceanfront Pool',
      category: 'Outdoor & Pools',
      description: 'Custom-built infinity edge pool in South Florida overlooking the ocean, with integrated LED lighting and sun shelf.',
      image: '/images/portfolio-pool.png',
      alt: 'Custom infinity pool construction South Florida by BP Solutions Florida pool builder',
    },
    {
      title: 'Tropical Luxury Patio',
      category: 'Outdoor & Pools',
      description: 'Modern patio design in South Florida seamlessly blending indoor and outdoor living with a glowing fire pit.',
      image: '/images/portfolio-patio.png',
      alt: 'Luxury outdoor patio construction South Florida by BP Solutions Florida remodeling contractor',
    },
    {
      title: 'Chef-Grade Summer Kitchen',
      category: 'Outdoor & Pools',
      description: 'High-end outdoor kitchen installation with marble countertops, stainless steel appliances, and custom cabinetry.',
      image: '/images/portfolio-bbq.png',
      alt: 'Outdoor summer kitchen construction South Florida by BP Solutions Florida general contractor',
    }
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-charcoal">
      <SEO
        title="South Florida Construction & Remodeling Portfolio | BP Solutions Florida"
        description="Explore BP Solutions Florida's portfolio of custom homes, commercial construction, pool building, and remodeling projects across Miami-Dade, Broward, and Palm Beach."
        canonical="/portfolio"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block underline underline-offset-8 decoration-gold/30">Completed Projects</span>
            <h1 className="text-5xl md:text-7xl text-white font-serif mb-12">South Florida <span className="italic text-slate-400">Construction</span> Portfolio</h1>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-white/5 pb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase tracking-[0.2em] font-bold transition-all relative py-2 ${filter === cat ? 'text-gold' : 'text-white/50 hover:text-white'}`}
                >
                  {cat}
                  {filter === cat && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden aspect-[16/10] rounded-sm cursor-pointer border border-white/5 hover:border-gold/30 transition-all duration-500"
                >
                  <OptimizedImage
                    src={project.image}
                    alt={project.alt || project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-luxury-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-gold text-xs uppercase tracking-widest mb-2 block font-bold">{project.category}</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{project.title}</h3>
                    <p className="text-white/80 text-sm mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-gold text-luxury-black px-6 py-3 text-xs font-bold uppercase tracking-widest gold-shimmer opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                        View Project
                      </button>
                      <div className="h-0.5 flex-1 bg-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
