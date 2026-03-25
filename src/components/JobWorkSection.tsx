import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import serviceLaser from '@/assets/service-laser.jpg';
import serviceEngraver from '@/assets/service-engraver.jpg';
import serviceRouter from '@/assets/service-router.jpg';
import service3d from '@/assets/service-3dprint.jpg';

const services = [
  {
    image: serviceLaser,
    title: 'CNC Laser Cutting',
    description: 'Precision fiber laser cutting for metals with tolerances up to ±0.01mm',
  },
  {
    image: serviceEngraver,
    title: 'Laser Engraver',
    description: 'Detailed engraving on metal, wood, acrylic & more with photographic precision',
  },
  {
    image: serviceRouter,
    title: 'Wood Router',
    description: 'CNC wood routing for intricate patterns, furniture components & architectural details',
  },
  {
    image: service3d,
    title: '3D Printing',
    description: 'Industrial-grade additive manufacturing for rapid prototyping & production parts',
  },
];

const JobWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="job-work" ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="font-body text-sm tracking-[0.3em] uppercase text-primary font-medium"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              01 — Job Work
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crafted with
              <br />
              <span className="text-gradient-laser">laser precision</span>
            </motion.h2>
          </motion.div>

          <motion.button
            className="group/btn flex items-center gap-2 font-display text-xs font-bold tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors pb-2 border-b border-primary/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore Services
            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Service Cards - 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-card">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-surface-elevated">
                    {service.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-surface-elevated/70 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Laser accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-laser-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobWorkSection;
