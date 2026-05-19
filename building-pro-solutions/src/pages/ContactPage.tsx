import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

// ─── Cloudflare Worker endpoint ───────────────────────────────────────────────
const API_ENDPOINT = 'https://bp-solutions-florida.com/api/contact';

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  _honey: string; // honeypot — must stay empty
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const INPUT_BASE =
  'w-full bg-charcoal/50 border p-4 text-white focus:outline-none transition-colors text-sm placeholder:text-white/30';
const INPUT_OK    = 'border-white/10 focus:border-gold/50';
const INPUT_ERROR = 'border-red-500/50 focus:border-red-400';

// ─── Component ────────────────────────────────────────────────────────────────
export const ContactPage = () => {
  const EMPTY_FORM: FormData = {
    name:     '',
    email:    '',
    phone:    '',
    service:  'Luxury Residential Construction',
    message:  '',
    _honey:   '',
  };

  const [formData, setFormData]   = useState<FormData>(EMPTY_FORM);
  const [errors,   setErrors]     = useState<Partial<Record<keyof FormData, string>>>({});
  const [status,   setStatus]     = useState<Status>('idle');
  const [apiError, setApiError]   = useState('');

  // ── Client-side validation ─────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim())    e.name    = 'Full name is required';
    if (!formData.email.trim())   e.email   = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                  e.email   = 'Please enter a valid email';
    if (formData.phone && !/^[\d\s\-\+\(\)\.]{7,20}$/.test(formData.phone))
                                  e.phone   = 'Please enter a valid phone number';
    if (!formData.message.trim()) e.message = 'Project details are required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Form change handler ────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setApiError('');

    try {
      const res = await fetch(API_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        setFormData(EMPTY_FORM);
      } else {
        // Server returned field-level validation errors
        if (data.errors) setErrors(data.errors);
        setApiError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setApiError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  // ── Input class helper ─────────────────────────────────────────────────────
  const inputClass = (field: keyof FormData) =>
    `${INPUT_BASE} ${errors[field] ? INPUT_ERROR : INPUT_OK}`;

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="pt-24 min-h-screen bg-charcoal">
      <SEO
        title="Contact BP Solutions Florida | Get a Free Construction Estimate"
        description="Contact BP Solutions Florida for a free estimate on general contracting, home remodeling, design-build, commercial construction, and permit expediting in South Florida."
        canonical="/contact"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* ── Left: contact info ─────────────────────────────────────── */}
            <div>
              <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">
                South Florida General Contractor
              </span>
              <h1 className="text-5xl md:text-7xl text-white font-serif mb-8 leading-tight">
                Get a Free <br />
                <span className="italic text-slate-400 font-light underline decoration-gold/30 underline-offset-8">
                  Construction Estimate
                </span>
              </h1>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                Whether you are looking to build a custom waterfront villa or a
                commercial landmark, our team of experts is ready to guide you
                through every step of the process.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    title: 'Call Us',
                    value: '+1 (305) 555-0123',
                  },
                  {
                    icon: Mail,
                    title: 'Email Us',
                    value: 'admin@bp-solutions-florida.com',
                  },
                  {
                    icon: MapPin,
                    title: 'Headquarters',
                    value: 'Brickell Avenue, Miami, FL 33131',
                  },
                ].map(({ icon: Icon, title, value }) => (
                  <div key={title} className="flex items-start gap-6 group">
                    <div className="bg-gold/10 p-4 rounded-sm border border-gold/20 group-hover:bg-gold/20 transition-colors">
                      <Icon className="text-gold w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{title}</h4>
                      <p className="text-slate-400 text-base mt-1">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: form ────────────────────────────────────────────── */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-14 relative overflow-hidden shadow-2xl">

              {/* Success state */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={48} className="text-gold" />
                  </div>
                  <h3 className="text-4xl font-serif text-white">Message Received</h3>
                  <p className="text-slate-400 text-lg max-w-sm">
                    Thank you for reaching out. One of our luxury development
                    experts will contact you shortly to discuss your project.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mt-8 border border-gold/30 px-6 py-3 rounded-sm hover:bg-gold/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* ── Global error banner ── */}
                  {status === 'error' && apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 p-4 rounded-sm"
                    >
                      <AlertCircle size={18} className="text-red-400 shrink-0" />
                      <p className="text-red-400 text-sm">{apiError}</p>
                    </motion.div>
                  )}

                  {/* ── Row 1: Name + Email ── */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-bold">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass('name')}
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-bold">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass('email')}
                        placeholder="john@example.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Row 2: Phone + Service ── */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-bold">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass('phone')}
                        placeholder="+1 (305) 000-0000"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-bold">
                        Service Requested
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-charcoal border border-white/10 p-4 text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                      >
                        <option>Luxury Residential Construction</option>
                        <option>Commercial Development</option>
                        <option>Architectural Design</option>
                        <option>Permitting &amp; Consultation</option>
                        <option>Maintenance &amp; Financing</option>
                        <option>Pool Building &amp; Renovations</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* ── Message ── */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-bold">
                      Message / Project Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={inputClass('message')}
                      placeholder="Tell us about your project — location, size, timeline, budget..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* ── Honeypot (hidden from real users, bots fill this) ── */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="contact-honey">Leave this empty</label>
                    <input
                      id="contact-honey"
                      type="text"
                      name="_honey"
                      value={formData._honey}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* ── Submit ── */}
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gold text-luxury-black py-5 text-sm font-bold uppercase tracking-widest gold-shimmer hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="text-white/30 text-[10px] text-center uppercase tracking-widest">
                    <span className="text-red-400">*</span> Required fields
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
