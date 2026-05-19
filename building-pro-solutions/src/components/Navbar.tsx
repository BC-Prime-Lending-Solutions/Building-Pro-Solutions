import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Our Process', path: '/services' },
    { name: 'Contact', path: '/contact', special: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-luxury-black/95 backdrop-blur-md h-20' : 'bg-transparent h-24'} border-b border-white/10 px-6 md:px-12 flex items-center justify-between`}>
      <Link to="/" className="flex flex-col group">
        <span className="text-xl md:text-2xl font-serif tracking-tighter text-gold uppercase leading-none group-hover:text-white transition-colors">Building Pro</span>
        <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 uppercase ml-0.5 group-hover:text-gold transition-colors">Solutions / South Florida</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={`${link.special ? 'text-gold' : 'text-white/80'} ${location.pathname === link.path && !link.special ? 'text-white underline underline-offset-8 decoration-gold/50' : ''} hover:text-gold transition-colors`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-gold transition-colors relative z-[60]">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-screen bg-luxury-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-50"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
              >
                <Link 
                  to={link.path} 
                  className={`text-2xl font-serif uppercase tracking-widest ${link.special ? 'text-gold' : 'text-white'} hover:text-gold transition-colors`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
