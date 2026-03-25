import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import design1 from '@/assets/design-1.jpg';
import design2 from '@/assets/design-2.jpg';
import design3 from '@/assets/design-3.jpg';
import design4 from '@/assets/design-4.jpg';
import designLibrary from '@/assets/design-library.jpg';

const designs = [
  { image: design1, title: 'Tree of Life', category: 'Wall Art' },
  { image: design2, title: 'Geometric Mandala', category: 'Decorative' },
  { image: design3, title: 'Abstract Waves', category: 'Modern Art' },
  { image: design4, title: 'Industrial Nameplate', category: 'Signage' },
  { image: designLibrary, title: 'Pattern Collection', category: 'Panels' },
  { image: design1, title: 'Botanical Relief', category: 'Wall Art' },
];

const DesignLibrary = () => {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  return (
    <section id="designs" className="relative py-16 md:py-24 bg-gradient-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="font-body text-sm tracking-[0.3em] uppercase text-primary font-medium inline-block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            03 — Design Library
          </motion.span>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Infinite
            <br />
            <span className="text-gradient-laser">possibilities</span>
          </motion.h2>

          <motion.button
            className="mt-8 group/btn flex items-center gap-2 font-display text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            View Full Gallery
            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {designs.map((design, i) => (
            <motion.div
              key={i}
              className="group relative cursor-pointer overflow-hidden rounded-sm aspect-square bg-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setSelectedDesign(i)}
              whileHover={{ scale: 0.98 }}
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-xs tracking-widest uppercase text-primary">
                  {design.category}
                </span>
                <span className="font-display text-lg md:text-xl font-bold text-surface-elevated mt-1">
                  {design.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedDesign !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-surface-elevated/70 hover:text-surface-elevated z-10"
              onClick={() => setSelectedDesign(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              src={designs[selectedDesign].image}
              alt={designs[selectedDesign].title}
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute bottom-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-body text-xs tracking-widest uppercase text-primary">
                {designs[selectedDesign].category}
              </p>
              <p className="font-display text-2xl font-bold text-surface-elevated mt-1">
                {designs[selectedDesign].title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignLibrary;
