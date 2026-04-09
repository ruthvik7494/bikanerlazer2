import { motion } from 'framer-motion';
import heroImage from '@/assets/laser-machine-desktop.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-foreground flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Laser machine cutting metal"
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart Machines.
          </motion.h1>
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-laser leading-[1.1] mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unstoppable Support.
          </motion.h1>

          <motion.p
            className="font-body text-base md:text-lg text-white/70 max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            CNC Laser Cutting, Engraving, Wood Routing & 3D Printing — Since 1972.
            Precision solutions engineered for perfection.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >

            <button
              onClick={() => {
                const message = `Hello Bikaner Laser, I would like to get in touch for an inquiry.`;
                window.open(`https://wa.me/919166562244?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="font-display text-base font-bold text-white hover:text-primary transition-colors flex items-center gap-2 group tracking-wider uppercase border-b border-white/20 hover:border-primary pb-1"
            >
              Get in Touch
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
