import { motion } from 'motion/react';
import { Building2, Paintbrush, Hammer, ShieldCheck, ChevronRight, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage = () => {
  const services = [
    {
      title: 'Luxury Architecture',
      desc: 'Collaborative architectural design that maximizes waterfront views and modern South Florida aesthetics.',
      icon: Paintbrush,
    },
    {
      title: 'Custom Construction',
      desc: 'Precision building techniques specialized for high-end residential and multi-million dollar estates.',
      icon: Hammer,
    },
    {
      title: 'Permit Management',
      desc: 'Navigating the complex permitting landscape of Miami-Dade, Broward, and Palm Beach counties.',
      icon: Building2,
    },
    {
      title: 'Property Maintenance',
      desc: 'Long-term care solutions for your luxury investment, ensuring your property remains in pristine condition.',
      icon: ShieldCheck,
    },
    {
      title: 'Pool Building & Renovations',
      desc: 'Custom-designed luxury pools, infinity edges, and comprehensive renovations for your outdoor oasis.',
      icon: Waves,
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-luxury-black">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">Our Expertise</span>
              <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight">
                Comprehensive Solutions for Your <br />
                <span className="italic text-slate-400 font-light">Development Needs</span>
              </h1>
            </div>
            <div className="text-slate-400 md:max-w-xs text-base leading-relaxed border-l-2 border-gold/30 pl-4">
              We handle everything from the initial draft to the final coat of paint, specializing in high-end South Florida developments.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-charcoal/40 backdrop-blur-md p-10 group border border-white/10 hover:border-gold/50 hover:bg-charcoal transition-all duration-500 relative overflow-hidden flex flex-col min-h-[400px]"
              >
                <span className="text-gold font-serif italic text-4xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                <div className="flex items-center gap-4 mb-6">
                   <service.icon className="text-gold w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                   <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-white/70 text-base leading-relaxed mb-10 flex-1 font-light group-hover:text-white/90 transition-colors">
                  {service.desc}
                </p>
                <Link to="/contact" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-white transition-colors group/link mt-auto">
                  Enquire <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-gold/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
