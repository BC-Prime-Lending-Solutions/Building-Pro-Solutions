import { Building2, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-luxury-black border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-max">
               <Building2 className="text-gold w-6 h-6 group-hover:scale-110 transition-transform" />
               <span className="text-lg font-serif font-bold tracking-widest text-white uppercase italic group-hover:text-gold transition-colors">
                Building Pro
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building Pro Solutions is the region's leader in turnkey luxury construction and development.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/buildingprosolution?igsh=MXJsZXkxazcwcGJlbQ==" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
               <li><Link to="/services" className="text-slate-400 hover:text-gold text-sm transition-colors">Services</Link></li>
               <li><Link to="/portfolio" className="text-slate-400 hover:text-gold text-sm transition-colors">Portfolio</Link></li>
               <li><Link to="/contact" className="text-slate-400 hover:text-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {['Luxury Homes', 'Commercial Hubs', 'Permit Help', 'Design/Build', 'Maintenance', 'Pools & Renovations'].map((item) => (
               <li key={item}>
                <Link to="/services" className="text-slate-400 hover:text-gold text-sm transition-colors">{item}</Link>
               </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Weekly Updates</h4>
            <p className="text-slate-400 text-sm mb-4">Join our newsletter for luxury design trends.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-3 text-sm w-full focus:outline-none focus:border-gold/50 transition-colors text-white" />
              <button className="bg-gold text-luxury-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} Building Pro Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-slate-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-slate-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
