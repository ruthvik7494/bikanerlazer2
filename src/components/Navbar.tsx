import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const links = ['About', 'Job Work', 'Machinery', 'Designs', 'Contact'];

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

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="font-body text-sm font-medium text-white/80 hover:text-white transition-colors relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              {link}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-sm font-body text-sm font-medium hover:opacity-90 transition-opacity"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Get a Quote
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
