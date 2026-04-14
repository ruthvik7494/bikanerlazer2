import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from '@/assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Force the scrolled (solid) look on pages that don't have a dark hero section
  // Like the Design Detail page (any path starting with /design/ but not the library itself)
  const isTransparentPage = ['/', '/job-work', '/machinery', '/design-library'].includes(location.pathname);
  const isSolid = scrolled || !isTransparentPage;

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const links = [
    { name: 'About', path: '/#about' },
    { name: 'Job Work', path: '/job-work' },
    { name: 'Machinery', path: '/machinery' },
    { name: 'Designs', path: '/design-library' },
    { name: 'Contact', path: '/#contact' }
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {links.map((link, i) => {
        const isHash = link.path.startsWith('/#');
        const isActive = location.pathname === link.path && !isHash;
        
        return (
          <motion.div
            key={link.name}
            initial={mobile ? { opacity: 0, x: -10 } : { opacity: 0, y: -10 }}
            animate={mobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className={mobile ? "w-full" : ""}
          >
            <Link
              to={link.path}
              className={`font-body text-sm font-medium transition-all duration-300 relative block ${
                mobile 
                  ? "text-foreground/80 hover:text-foreground text-lg py-4 border-b border-border w-full" 
                  : isSolid ? "text-foreground/80 hover:text-primary" : "text-white/80 hover:text-white"
              } ${isActive ? "text-primary hover:text-primary font-boldScale" : ""}`}
              onClick={() => mobile && setOpen(false)}
            >
              {link.name}
            </Link>
          </motion.div>
        );
      })}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className={mobile ? "mt-6" : ""}
      >
        <button
          onClick={() => {
            const message = `Hello Bikaner Laser, I would like to get a quote.`;
            window.open(`https://wa.me/919166562244?text=${encodeURIComponent(message)}`, '_blank');
            if (mobile) setOpen(false);
          }}
          className={`bg-primary text-primary-foreground px-5 py-2 rounded-sm font-body text-sm font-medium hover:opacity-90 transition-opacity inline-block ${
            mobile ? "w-full text-center text-lg py-3" : ""
          }`}
        >
          Get a Quote
        </button>
      </motion.div>
    </>
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4"
      animate={{ 
        backgroundColor: isSolid ? "rgba(255, 255, 255, 0.98)" : "rgba(220, 15, 12, 0)",
        backdropFilter: isSolid ? "blur(10px)" : "none",
        boxShadow: isSolid ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        color: isSolid ? "#000000" : "#ffffff"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo(0,0)}>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-all duration-300 ${!isSolid ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" : ""}`}>
              <img 
                src={logo} 
                alt="Bikaner Laser Logo" 
                className="h-10 md:h-12 w-auto object-contain flex-shrink-0" 
              />
            </div>
            <div className="font-display text-lg md:text-xl font-bold tracking-tight whitespace-nowrap">
              <span className={isSolid ? "text-foreground" : "text-white"}>BIKANER</span>
              <span className="text-gradient-laser ml-1">LASER</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className={`${isSolid ? "text-foreground" : "text-white"} p-2`} aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background flex flex-col pt-16">
              <NavLinks mobile />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
