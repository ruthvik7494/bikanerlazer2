import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const links = ['About', 'Job Work', 'Machinery', 'Designs', 'Contact'];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {links.map((link, i) => (
        <motion.a
          key={link}
          href={`#${link.toLowerCase().replace(' ', '-')}`}
          className={`font-body text-sm font-medium transition-colors relative ${
            mobile 
              ? "text-foreground/80 hover:text-foreground text-lg py-4 border-b border-border w-full" 
              : "text-white/80 hover:text-white"
          }`}
          initial={mobile ? { opacity: 0, x: -10 } : { opacity: 0, y: -10 }}
          animate={mobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i }}
          onClick={() => mobile && setOpen(false)}
        >
          {link}
        </motion.a>
      ))}
      <motion.a
        href="#contact"
        className={`bg-primary text-primary-foreground px-5 py-2 rounded-sm font-body text-sm font-medium hover:opacity-90 transition-opacity ${
          mobile ? "mt-6 text-center text-lg py-3" : ""
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={() => mobile && setOpen(false)}
      >
        Get a Quote
      </motion.a>
    </>
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4"
      style={{ backgroundColor: `hsla(220, 15%, 12%, ${scrolled ? 0.95 : 0})` }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="font-display text-xl font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">BIKANER</span>
          <span className="text-gradient-laser">LASER</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-white p-2" aria-label="Toggle Menu">
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
