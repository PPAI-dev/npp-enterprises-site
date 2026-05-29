/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award, 
  Home, 
  Layers, 
  Maximize, 
  DoorOpen, 
  Truck, 
  Building2,
  ArrowRight,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  ArrowUp
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
          mass: 0.5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,1) 0%, rgba(11,19,48,1) 100%)",
          opacity: 0.8,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-[1] opacity-20 hidden lg:block"
        animate={{
          x: x - 160,
          y: y - 160,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.4) 0%, rgba(245,166,35,0) 70%)",
        }}
      />
    </>
  );
};

// Premium Construction Images
const IMAGES = {
  logo: "/npp-logo.png",
  hero: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=2070",
  customHome: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075",
  remodel: "https://images.unsplash.com/photo-1556912177-859406b748ce?auto=format&fit=crop&q=80&w=2070",
  windows: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=2070",
  doors: "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7df?auto=format&fit=crop&q=80&w=2070",
  sitePrep: "https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&q=80&w=2070",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
  gallery: [
    "https://images.unsplash.com/photo-1600607687940-c52af0a09538?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1556912177-859406b748ce?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1507089947368-19c1da977535?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2070",
  ]
};

const Logo = ({ className = "h-14 w-auto object-contain" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/npp-logo.png"
        alt="NPP Enterprises"
        className={className}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const Lightbox = ({ 
  images, 
  index, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[], 
  index: number | null, 
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void
}) => {
  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/98 backdrop-blur-2xl p-4 md:p-12"
        >
          <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[110]">
            <div className="flex items-center space-x-6">
              <Logo className="h-12" />
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em]">Project Portfolio</span>
                <span className="text-white font-display font-bold text-xs uppercase tracking-widest">Image {index + 1} / {images.length}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 bg-white/5 border border-white/10 hover:border-brand-orange transition-colors flex items-center justify-center text-white group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
          <div className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video flex items-center justify-center group/main">
             <AnimatePresence mode="wait">
               <motion.img
                 key={index}
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 1.1, y: -20 }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 src={images[index]}
                 className="w-full h-full object-contain shadow-2xl relative z-10 brightness-110"
               />
             </AnimatePresence>
             <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-2 text-brand-orange/20">
               {[...Array(8)].map((_, i) => <div key={i} className="w-8 h-[2px] bg-current" />)}
             </div>
             <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-2 text-brand-orange/20">
               {[...Array(8)].map((_, i) => <div key={i} className="w-8 h-[2px] bg-current" />)}
             </div>
          </div>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-12 flex justify-between pointer-events-none z-[110]">
             <button 
              onClick={onPrev}
              className="pointer-events-auto w-16 h-24 bg-white/5 border-y border-r border-white/10 hover:border-tropical-teal hover:bg-tropical-teal/5 transition-all flex items-center justify-center text-white backdrop-blur-md group"
             >
               <ChevronLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
             </button>
             <button 
              onClick={onNext}
              className="pointer-events-auto w-16 h-24 bg-white/5 border-y border-l border-white/10 hover:border-tropical-teal hover:bg-tropical-teal/5 transition-all flex items-center justify-center text-white backdrop-blur-md group"
             >
               <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-12 flex space-x-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 transition-all duration-500 ${i === index ? 'bg-brand-orange scale-y-150 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 140;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[60] bg-brand-navy text-white p-4 shadow-[6px_6px_0px_rgba(245,166,35,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
          aria-label="Back to top"
        >
          <ArrowUp size={24} className="group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onNavigate }: { onNavigate: (page: 'home' | 'privacy' | 'terms') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="announcement-bar animate-pulse text-[10px] md:text-xs font-bold">
        ESTABLISHED 1997 | CUSTOM HOMES | REMODELS | WINDOWS | DOORS | SITE PREP | LICENSED & INSURED
      </div>
      <div className="bg-white text-slate-600 py-3 border-b border-slate-100 hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-6 h-10 flex justify-between items-center text-[11px] font-medium border-b border-transparent">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-4">
              <Phone size={12} className="text-brand-navy" />
              <div className="flex flex-col md:flex-row space-x-4">
                <span className="text-slate-500 font-mono font-bold uppercase tracking-widest">Office: <a href="tel:3305091506" className="text-brand-navy">330.509.1506</a></span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={12} className="text-brand-navy" />
              <span className="font-mono font-bold uppercase tracking-widest"><a href="mailto:Andrewgrischow@nppent.com" className="text-brand-navy">Andrewgrischow@nppent.com</a></span>
            </div>
          </div>
        </div>
      </div>
      <nav className={`w-full transition-all duration-500 ${isScrolled ? 'py-4 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl' : 'py-6 bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <a href="/" className="group flex items-center">
            <img src="/npp-logo.png" alt="NPP Enterprises" className="h-16 w-auto object-contain" />
          </a>
          <div className="hidden lg:flex items-center space-x-8 text-[12px] font-mono font-bold text-brand-navy uppercase tracking-widest leading-none">
            <button onClick={() => scrollTo('hero')} className="hover:text-brand-orange transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-orange pb-1">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-orange pb-1">About</button>
            <button onClick={() => scrollTo('services')} className="hover:text-brand-orange transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-orange pb-1">Services</button>
            <button onClick={() => scrollTo('gallery')} className="hover:text-brand-orange transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-orange pb-1">Portfolio</button>
            <button onClick={() => scrollTo('quote')} className="hover:text-brand-orange transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-orange pb-1">Contact</button>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={() => scrollTo('quote')} className="bg-brand-navy text-white py-4 px-10 hover:bg-brand-orange transition-all font-display font-black uppercase italic tracking-tighter shadow-[4px_4px_0px_rgba(245,166,35,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              GET A QUOTE
            </button>
          </div>
          <button className={`lg:hidden p-2 ${isScrolled ? 'text-white' : 'text-brand-dark'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-brand-dark border-b border-white/10 p-8 flex flex-col space-y-6 shadow-2xl overflow-hidden"
            >
              <button onClick={() => { scrollTo('hero'); setIsMobileMenuOpen(false); }} className="text-lg font-black uppercase tracking-widest text-left text-white">Home</button>
              <button onClick={() => { scrollTo('about'); setIsMobileMenuOpen(false); }} className="text-lg font-black uppercase tracking-widest text-left text-white">About Us</button>
              <button onClick={() => { scrollTo('services'); setIsMobileMenuOpen(false); }} className="text-lg font-black uppercase tracking-widest text-left text-white">Services</button>
              <button onClick={() => { scrollTo('gallery'); setIsMobileMenuOpen(false); }} className="text-lg font-black uppercase tracking-widest text-left text-white">Portfolio</button>
              <button onClick={() => { scrollTo('quote'); setIsMobileMenuOpen(false); }} className="btn-primary w-full text-center py-4">
                Free Consultation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const TrustCard = ({ icon: Icon, title, sub }: any) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center space-x-6 p-10 premium-card group cursor-default relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 text-brand-navy/10 font-mono text-[8px] uppercase tracking-widest">MODULE_ID: TR-0{Math.floor(Math.random() * 9)}</div>
    <div className="text-white bg-brand-navy p-5 rounded-none transition-all duration-500 group-hover:bg-brand-orange group-hover:text-brand-dark shadow-[4px_4px_0px_rgba(245,166,35,1)] group-hover:shadow-none translate-x-[-2px] translate-y-[-2px]">
      <Icon size={28} />
    </div>
    <div>
      <p className="text-brand-navy font-display font-black text-2xl uppercase italic leading-tight mb-1 group-hover:text-brand-orange transition-colors tracking-tighter">{title}</p>
      <p className="text-slate-500 text-[10px] uppercase font-mono font-bold tracking-[0.2em]">{sub}</p>
    </div>
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description, image, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover="hover"
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="premium-card group relative"
  >
    <div className="aspect-[16/10] image-zoom-container relative border-b-2 border-brand-navy">
      <div className="absolute inset-0 bg-brand-navy/40 group-hover:bg-brand-navy/10 transition-colors duration-700 z-10" />
      <img src={image} alt={title} className="w-full h-full object-cover grayscale mix-blend-overlay group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700" />
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-brand-navy px-4 py-2 font-mono text-[10px] text-white tracking-widest">S-0{index + 1}</div>
      </div>
      <div className="absolute bottom-8 left-8 z-20">
        <motion.div 
          variants={{
            hover: { 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }
            }
          }}
          className="bg-brand-orange p-5 rounded-none shadow-[4px_4px_0px_rgba(11,19,48,1)] text-white group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-500"
        >
          <Icon size={32} />
        </motion.div>
      </div>
    </div>
    <div className="p-12 relative z-10 bg-white">
      <h3 className="text-4xl font-display font-black text-brand-navy mb-6 leading-[0.9] group-hover:text-brand-orange transition-colors uppercase italic tracking-tighter">{title}</h3>
      <p className="text-slate-500 font-mono text-sm leading-relaxed mb-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500 border-l border-brand-navy/10 pl-6">{description}</p>
      <button onClick={() => scrollTo('quote')} className="btn-primary w-full text-sm">GET A QUOTE</button>
    </div>
  </motion.div>
);

// ─── Legal Page Sections ───────────────────────────────────────────────────────
const PRIVACY_SECTIONS = [
  { title: "1. Company Information", content: "NPP ENTERPRISES, INC. | 1002 Bayview Dr, Nokomis, FL 34275 | andrewgrischow@nppent.com | https://www.nppent.com" },
  { title: "2. Information We Collect", content: "We collect name, phone number, email address, and project details submitted via our contact form. We may also collect standard technical data such as IP address and browser type through analytics tools." },
  { title: "3. How We Use Your Information", content: "We use your information to respond to inquiries, schedule consultations, coordinate project details, send transactional SMS or email updates, send promotional messages if you have opted in, and improve our services." },
  { title: "4. SMS Opt-In and Messaging", content: "By submitting our contact form and checking the SMS consent checkbox, you agree to receive text messages from NPP ENTERPRISES, INC. Message frequency varies. Msg & data rates may apply. We do not sell, rent, share, or transfer your phone number or SMS opt-in data to any third party for marketing purposes. Reply STOP to unsubscribe, HELP for help." },
  { title: "5. Cookies and Tracking", content: "Our website may use cookies to analyze traffic and improve user experience. You may disable cookies in your browser settings." },
  { title: "6. Data Security", content: "We implement reasonable safeguards to protect your personal information. No method of internet transmission is 100% secure." },
  { title: "7. Your Rights", content: "You may request access, correction, or deletion of your data, and opt out of SMS at any time by replying STOP. Contact andrewgrischow@nppent.com to exercise these rights." },
  { title: "8. Third-Party Services", content: "We use third-party platforms such as CRM and analytics providers who are prohibited from using your data for their own marketing." },
  { title: "9. Children's Privacy", content: "Our services are not directed to individuals under 18. We do not knowingly collect data from minors." },
  { title: "10. Changes", content: "We may update this policy. Changes will be posted here with an updated effective date." },
  { title: "11. Contact", content: "NPP ENTERPRISES, INC. | 1002 Bayview Dr, Nokomis, FL 34275 | andrewgrischow@nppent.com" },
];

const TERMS_SECTIONS = [
  { title: "1. Acceptance of Terms", content: "By accessing https://www.nppent.com, you agree to these Terms of Service. If you do not agree, do not use this website." },
  { title: "2. Services Described", content: "NPP ENTERPRISES, INC. provides custom home building, commercial construction, and related contracting services in Florida. Website content is for inquiry purposes only and does not constitute a binding contract." },
  { title: "3. SMS Messaging Program", content: "By opting in via our contact form, you agree to receive SMS messages from NPP ENTERPRISES, INC. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe, HELP for help. Your phone number will not be sold or shared with third parties for marketing. SMS opt-in is available to individuals 18 years of age or older." },
  { title: "4. Carrier Liability Disclaimer", content: "Carriers are not liable for delayed or undelivered messages. Delivery is subject to network availability beyond our control." },
  { title: "5. Website Use", content: "You agree to use this site only for lawful purposes. Unauthorized access, spam, or illegal use is prohibited." },
  { title: "6. Intellectual Property", content: "All content on this website is the property of NPP ENTERPRISES, INC. and protected by applicable law. Unauthorized use is prohibited." },
  { title: "7. Disclaimer of Warranties", content: "This website is provided as-is without warranties of any kind. We do not warrant uninterrupted or error-free operation." },
  { title: "8. Limitation of Liability", content: "To the fullest extent permitted by law, NPP ENTERPRISES, INC. is not liable for indirect, incidental, or consequential damages from use of this site." },
  { title: "9. Privacy Policy", content: "Use of this site is also governed by our Privacy Policy, incorporated herein by reference." },
  { title: "10. Governing Law", content: "These terms are governed by Florida law. Disputes shall be resolved in Sarasota County, Florida." },
  { title: "11. Changes", content: "We may modify these terms at any time. Continued use after changes constitutes acceptance." },
  { title: "12. Contact", content: "NPP ENTERPRISES, INC. | 1002 Bayview Dr, Nokomis, FL 34275 | andrewgrischow@nppent.com" },
];

const LegalPage = ({ title, sections, onBack }: { title: string; sections: { title: string; content: string }[]; onBack: () => void }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center space-x-4">
        <img src="/npp-logo.png" alt="NPP Enterprises" className="h-10 w-auto" />
        <button onClick={onBack} className="text-sm text-brand-navy font-mono font-bold hover:text-brand-orange transition-colors uppercase tracking-widest">← Back to Site</button>
      </div>
      <div className="px-6 py-20 md:px-16 lg:px-32 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-yellow-400 uppercase mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">{title}</h1>
        <p className="text-gray-400 text-sm mb-12">Effective Date: May 29, 2025 | NPP ENTERPRISES, INC.</p>
        {sections.map(({ title: sTitle, content }) => (
          <div key={sTitle} className="mb-8">
            <h2 className="text-base font-bold uppercase tracking-widest text-yellow-400 mb-2 border-b border-yellow-400/20 pb-1">{sTitle}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Consent Checkbox Label ────────────────────────────────────────────────────
const ConsentLabel = ({ htmlFor, onNavigate }: { htmlFor: string; onNavigate: (page: 'privacy' | 'terms') => void }) => (
  <label htmlFor={htmlFor} className="text-[10px] text-slate-400 leading-tight">
    By submitting, I authorize NPP ENTERPRISES, INC. to send SMS messages to the number provided. Msg frequency varies. Msg & data rates may apply. Not a condition of purchase. Reply STOP to unsubscribe, HELP for help.{' '}
    <button type="button" onClick={() => onNavigate('privacy')} className="underline hover:text-brand-orange transition-colors">Privacy Policy</button>
    {' '}&amp;{' '}
    <button type="button" onClick={() => onNavigate('terms')} className="underline hover:text-brand-orange transition-colors">Terms of Service</button>.
  </label>
);

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');

  const nextImage = useCallback(() => {
    setSelectedImageIndex(prev => (prev === null ? 0 : (prev + 1) % IMAGES.gallery.length));
  }, []);

  const prevImage = useCallback(() => {
    setSelectedImageIndex(prev => (prev === null ? 0 : (prev - 1 + IMAGES.gallery.length) % IMAGES.gallery.length));
  }, []);

  if (currentPage === 'privacy') {
    return <LegalPage title="Privacy Policy" sections={PRIVACY_SECTIONS} onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'terms') {
    return <LegalPage title="Terms of Service" sections={TERMS_SECTIONS} onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen gritty-overlay">
      <Navbar onNavigate={setCurrentPage} />

      <Lightbox 
        images={IMAGES.gallery}
        index={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Luxury Custom Home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="technical-tag">Sector 01</div>
                <span className="text-brand-orange text-[10px] font-mono font-bold tracking-[0.4em] uppercase">Excellence in Craftsmanship</span>
              </div>
              <h1 className="text-5xl sm:text-7xl xl:text-9xl font-display font-black text-white tracking-tighter leading-[0.9] mb-10 uppercase italic">
                Custom <br />
                <span className="text-gradient-orange">Building.</span>
              </h1>
              <p className="text-slate-300 text-lg sm:text-xl max-w-xl mb-12 font-mono leading-relaxed opacity-90 border-l-2 border-brand-orange/30 pl-6">
                27+ years of structural precision. 20+ projects completed across the Gulf Coast. Licensed, insured, and built for Florida.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="form-box">
                <h3 className="text-3xl font-display font-bold text-brand-navy mb-2 tracking-tight">Get Your Free Consultation</h3>
                <p className="text-slate-500 text-sm mb-8 font-medium">Tell us about your project, we'll follow up today.</p>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                    <input type="text" placeholder="Last Name" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                    <input type="tel" placeholder="Phone Number" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                  </div>
                  <select className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-500 focus:border-brand-navy outline-none transition-colors rounded-lg">
                    <option>Select Service</option>
                    <option>Custom Home</option>
                    <option>Remodel</option>
                    <option>Window Install</option>
                    <option>Door Install</option>
                    <option>Site Prep</option>
                  </select>
                  <input type="text" placeholder="Project Zip Code" className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                  <div className="flex items-start space-x-3 py-2">
                    <input type="checkbox" className="mt-1" id="terms" />
                    <ConsentLabel htmlFor="terms" onNavigate={setCurrentPage} />
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 text-lg">GET A QUOTE</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative z-30 bg-white py-12 shadow-2xl">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4 border-r border-slate-100 last:border-0 pr-8">
              <div className="text-brand-navy p-3 bg-brand-navy/5"><Clock size={32} /></div>
              <div>
                <p className="text-brand-dark font-display font-black text-2xl tracking-tighter leading-none uppercase italic">25+ Years</p>
                <p className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-1">Craftsmanship Since 1997</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-slate-100 last:border-0 pr-8">
              <div className="text-brand-navy p-3 bg-brand-navy/5"><Award size={32} /></div>
              <div>
                <p className="text-brand-dark font-display font-black text-2xl tracking-tighter leading-none uppercase italic">Expert Care</p>
                <p className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-1">Licensed & Insured</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-slate-100 last:border-0 pr-8">
              <div className="text-brand-navy p-3 bg-brand-navy/5"><MapPin size={32} /></div>
              <div>
                <p className="text-brand-dark font-display font-black text-2xl tracking-tighter leading-none uppercase italic">Gulf Coast</p>
                <p className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-1">St. Pete down to Ft. Myers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-brand-navy p-3 bg-brand-navy/5"><ShieldCheck size={32} /></div>
              <div>
                <p className="text-brand-dark font-display font-black text-2xl tracking-tighter leading-none uppercase italic">100% Insured</p>
                <p className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-1">Maximum Liability Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-brand-dark overflow-hidden relative">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white/5 pb-10">
            <div>
              <div className="technical-tag mb-6">Service Index</div>
              <h3 className="text-5xl sm:text-8xl font-display font-black text-white tracking-tighter italic uppercase underline decoration-brand-orange/30 decoration-8 underline-offset-[-8px]">
                BUILDING <br />
                <span className="text-gradient-orange">SOLUTIONS.</span>
              </h3>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="text-brand-orange font-mono text-sm tracking-widest mb-2 font-bold">[ EST. 1997 ]</p>
              <div className="w-48 h-1 bg-brand-orange ml-auto" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <ServiceCard index={0} icon={Home} title="Custom Homes" description="Architectural excellence meet structural precision. We build luxury custom homes tailored to the Florida coastline." image={IMAGES.customHome} />
            <ServiceCard index={1} icon={Layers} title="Remodels" description="From high-end kitchens to multi-room transformations, we strip back the old and engineer the new." image={IMAGES.remodel} />
            <ServiceCard index={2} icon={Maximize} title="Windows" description="Impact-rated window systems designed for Florida's toughest conditions without sacrificing aesthetic." image={IMAGES.windows} />
            <ServiceCard index={3} icon={DoorOpen} title="Doors" description="Premium entry systems and sliding glass walls that merge indoor and outdoor living seamlessly." image={IMAGES.doors} />
            <ServiceCard index={4} icon={Truck} title="Site Prep" description="The foundation of every great build. Expert clearing, grading, and site engineering for complex projects." image={IMAGES.sitePrep} />
            <ServiceCard index={5} icon={Building2} title="Commercial" description="Specialized structural services and build-outs for premium commercial environments." image={IMAGES.commercial} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-0 border-2 border-brand-navy">
            <div className="lg:col-span-7 p-12 lg:p-24 bg-brand-navy flex flex-col justify-center">
              <div className="technical-tag mb-8 bg-brand-orange text-brand-navy">CORE ADVANTAGE</div>
              <h2 className="text-white text-5xl sm:text-7xl font-display font-black leading-[0.9] mb-12 uppercase italic tracking-tighter">
                Why NPP <br /><span className="text-brand-orange">Wins.</span>
              </h2>
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="border-l border-white/20 pl-6 py-2">
                    <p className="text-brand-orange font-mono text-xs tracking-widest uppercase mb-3 font-bold">01 / Experience</p>
                    <p className="text-white text-xl font-display font-bold uppercase">Since 1997</p>
                    <p className="text-slate-400 text-sm mt-2">Decades of Gulf Coast construction experience.</p>
                  </div>
                  <div className="border-l border-white/20 pl-6 py-2">
                    <p className="text-brand-orange font-mono text-xs tracking-widest uppercase mb-3 font-bold">02 / Guarantee</p>
                    <p className="text-white text-xl font-display font-bold uppercase">Pay When Thrilled</p>
                    <p className="text-slate-400 text-sm mt-2">Zero risk deployment. Final sign-off required.</p>
                  </div>
                  <div className="border-l border-white/20 pl-6 py-2">
                    <p className="text-brand-orange font-mono text-xs tracking-widest uppercase mb-3 font-bold">03 / Reliability</p>
                    <p className="text-white text-xl font-display font-bold uppercase">On-Time Pact</p>
                    <p className="text-slate-400 text-sm mt-2">Strict timelines. Documented accuracy.</p>
                  </div>
                  <div className="border-l border-white/20 pl-6 py-2">
                    <p className="text-brand-orange font-mono text-xs tracking-widest uppercase mb-3 font-bold">04 / Region</p>
                    <p className="text-white text-xl font-display font-bold uppercase">Florida Built</p>
                    <p className="text-slate-400 text-sm mt-2">Transferable 5-year structural warranty.</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 pt-10 border-t border-white/10">
                <button onClick={() => scrollTo('quote')} className="btn-primary bg-brand-orange text-brand-navy shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                  Verify Qualifications
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-[500px] lg:h-auto bg-slate-100 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-brand-navy/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img src="https://images.unsplash.com/photo-1556912177-859406b748ce?auto=format&fit=crop&q=80&w=2070" alt="Modern Kitchen" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
              <div className="absolute bottom-8 right-8 z-20 text-white font-mono text-[10px] tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">PROJECT_REF: 2024-K09</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="technical-tag mb-8 bg-brand-orange text-brand-navy font-black italic">Territory Report</div>
              <h3 className="text-6xl sm:text-8xl font-display font-black text-white tracking-tighter mb-8 italic uppercase">SERVING <br />THE GULF.</h3>
              <p className="text-slate-400 font-mono text-lg leading-relaxed mb-12 border-l-2 border-brand-orange/30 pl-6">
                Full mobilization capabilities across the Florida Gulf Coast. <span className="text-white">Headquarters: St. Petersburg.</span> Operations extending to Fort Myers and surrounding sectors.
              </p>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-brand-orange flex items-center justify-center text-brand-navy shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                  <MapPin size={32} />
                </div>
                <div>
                  <p className="text-white font-display font-bold text-2xl uppercase italic tracking-tight">Active Deployment</p>
                  <p className="text-brand-orange font-mono text-xs tracking-widest uppercase mt-1">St. Pete &gt;&gt; Ft. Myers</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["St. Petersburg","Clearwater","Sarasota","Bradenton","Venice","Englewood","Port Charlotte","Punta Gorda","Fort Myers","Cape Coral","Estero","Bonita Springs"].map((city) => (
                <div key={city} className="service-area-badge py-5">{city}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-brand-navy text-4xl sm:text-6xl font-display font-bold mb-6">See the Results for Yourself</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">We don't just talk about detail—we show it. Here are just a few kitchen remodels we've completed for local homeowners.</p>
          </motion.div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {IMAGES.gallery.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }} onClick={() => setSelectedImageIndex(i)} className="relative group overflow-hidden rounded-xl shadow-xl cursor-pointer aspect-video">
                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white"><Maximize size={24} /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-4">
              <div className="absolute inset-0 border-2 border-brand-navy -rotate-2" />
              <div className="absolute inset-0 bg-brand-orange/5 translate-x-4 translate-y-4 -z-10" />
              <img src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=2070" alt="Our Expertise" className="w-full h-full object-cover grayscale transition-transform duration-700 hover:grayscale-0 relative z-10" />
              <div className="absolute -bottom-8 -left-8 bg-brand-navy p-10 shadow-[10px_10px_0px_rgba(245,166,35,1)] z-20">
                <p className="text-brand-orange text-7xl font-display font-black leading-none mb-2">27+</p>
                <p className="text-white font-mono font-bold uppercase text-[9px] tracking-[.3em]">Operational Years</p>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <div className="technical-tag mb-8 bg-brand-navy text-white">NPP_DOSSIER</div>
            <h3 className="text-5xl sm:text-7xl font-display font-black text-brand-navy mb-10 tracking-tighter leading-none uppercase italic">
              ENGINEERING <br /><span className="text-gradient-orange italic">THE NEW.</span>
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 font-mono border-l border-brand-navy/20 pl-6">
              NPP Enterprises, LLC has been stripping back the old and engineering the new since 1997. We combine industrial structural precision with high-end architectural vision.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-10 border-t-2 border-brand-navy/5">
              <div>
                <p className="text-brand-navy text-5xl font-display font-black mb-2">1997</p>
                <p className="text-slate-400 font-mono font-bold uppercase text-[10px] tracking-[.3em]">Inception</p>
              </div>
              <div>
                <p className="text-brand-orange text-5xl font-display font-black mb-2">100%</p>
                <p className="text-slate-400 font-mono font-bold uppercase text-[10px] tracking-[.3em]">Mission Success</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Quote */}
      <section id="quote" className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
              <h2 className="text-6xl sm:text-8xl font-display font-bold tracking-tight text-white mb-10">
                Ready to <br /><span className="text-brand-orange italic">Build?</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed">Contact us today for a free design consultation. Our team is ready to help you plan your next premium project.</p>
              <div className="space-y-10">
                <div className="flex flex-col space-y-2">
                  <span className="text-brand-orange text-xs font-mono font-bold uppercase tracking-[0.4em]">Direct Line</span>
                  <a href="tel:3305091506" className="text-4xl font-display font-black text-white hover:text-brand-orange transition-colors uppercase italic tracking-tighter">330.509.1506</a>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-brand-orange text-xs font-mono font-bold uppercase tracking-[0.4em]">Email Us</span>
                  <a href="mailto:Andrewgrischow@nppent.com" className="text-3xl font-display font-black text-white hover:text-brand-orange transition-colors truncate uppercase italic tracking-tighter">Andrewgrischow@nppent.com</a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-white p-10 sm:p-14 rounded-2xl shadow-2xl relative z-10">
              <h3 className="text-4xl font-display font-bold text-brand-navy mb-10 text-center tracking-tight">Request a Quote</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                  <input type="text" placeholder="Last Name" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                  <input type="tel" placeholder="Phone Number" className="bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                </div>
                <select className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-500 focus:border-brand-navy outline-none transition-colors rounded-lg">
                  <option>Select Service</option>
                  <option>Custom Home</option>
                  <option>Remodel</option>
                  <option>Window Install</option>
                  <option>Door Install</option>
                  <option>Site Prep</option>
                  <option>Commercial</option>
                </select>
                <input type="text" placeholder="Project Zip Code" className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg" />
                <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-navy outline-none transition-colors rounded-lg resize-none" />
                <div className="flex items-start space-x-3 py-2">
                  <input type="checkbox" className="mt-1" id="terms2" />
                  <ConsentLabel htmlFor="terms2" onNavigate={setCurrentPage} />
                </div>
                <button type="submit" className="btn-primary w-full py-5 text-lg">GET A QUOTE</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 sm:gap-20 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-6 mb-10">
                <Logo className="h-12 md:h-16" />
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                NPP Enterprises, LLC provides premium custom homes, remodels, windows, doors, and site prep services across the Florida Gulf Coast since 1997.
              </p>
              <div className="flex space-x-6 mt-10">
                <a href="tel:3305091506" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-navy hover:text-brand-orange transition-colors"><Phone size={20} /></a>
                <a href="mailto:Andrewgrischow@nppent.com" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-navy hover:text-brand-orange transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-brand-navy font-bold uppercase text-[10px] tracking-[0.4em] mb-10">Services</p>
              <button onClick={() => scrollTo('services')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Custom Homes</button>
              <button onClick={() => scrollTo('services')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Remodels</button>
              <button onClick={() => scrollTo('services')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Windows & Doors</button>
              <button onClick={() => scrollTo('services')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Site Prep</button>
            </div>
            <div className="space-y-6">
              <p className="text-brand-navy font-bold uppercase text-[10px] tracking-[0.4em] mb-10">Quick Links</p>
              <button onClick={() => scrollTo('about')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Our Story</button>
              <button onClick={() => scrollTo('gallery')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Our Portfolio</button>
              <button onClick={() => scrollTo('quote')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Financing</button>
              <button onClick={() => scrollTo('quote')} className="block text-slate-500 hover:text-brand-orange transition-colors text-sm font-medium text-left">Get a Quote</button>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase font-bold">© 2026 NPP Enterprises, LLC. Licensed & Insured Construction.</p>
            <div className="flex space-x-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-brand-orange transition-colors">Privacy Policy</button>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-brand-orange transition-colors">Terms</button>
              <button onClick={() => scrollTo('quote')} className="hover:text-brand-orange transition-colors">Licenses</button>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
      <CustomCursor />
    </div>
  );
}


