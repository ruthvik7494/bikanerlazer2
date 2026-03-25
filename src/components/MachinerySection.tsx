import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import machine1 from '@/assets/machine-1.jpg';
import machineEngraver from '@/assets/machine-engraver.jpg';
import machineRouter from '@/assets/machine-router.jpg';
import machine3d from '@/assets/machine-3dprinter.jpg';

const machines = [
  {
    image: machine1,
    name: 'CNC Laser Machine',
    subtitle: 'Fiber Laser Cutting System',
    specs: [
      { label: 'Power', value: '6000W' },
      { label: 'Cutting Area', value: '3000 × 1500mm' },
      { label: 'Speed', value: '120m/min' },
      { label: 'Accuracy', value: '±0.01mm' },
    ],
  },
  {
    image: machineEngraver,
    name: 'Laser Engraving Machines',
    subtitle: 'High-Precision Engraving System',
    specs: [
      { label: 'Power', value: '100W CO₂' },
      { label: 'Work Area', value: '1300 × 900mm' },
      { label: 'Resolution', value: '1000 DPI' },
      { label: 'Speed', value: '600mm/s' },
    ],
  },
  {
    image: machineRouter,
    name: 'CNC Wood Router',
    subtitle: 'Heavy-Duty Wood CNC System',
    specs: [
      { label: 'Spindle', value: '9KW HSD' },
      { label: 'Work Area', value: '2400 × 1200mm' },
      { label: 'Speed', value: '40m/min' },
      { label: 'Accuracy', value: '±0.05mm' },
    ],
  },
  {
    image: machine3d,
    name: '3D Printer (Military Grade)',
    subtitle: 'Industrial Metal 3D Printing',
    specs: [
      { label: 'Technology', value: 'SLM / FDM' },
      { label: 'Build Volume', value: '500 × 500 × 500mm' },
      { label: 'Layer Resolution', value: '20 microns' },
      { label: 'Materials', value: 'Ti / SS / Inconel' },
    ],
  },
];

const MachinerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="machinery" ref={containerRef} className="relative py-16 md:py-24 bg-gradient-section overflow-hidden">
      <motion.div
        className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        style={{ y: bgY }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-12 md:mb-16 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="font-body text-sm tracking-[0.3em] uppercase text-primary font-medium"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            02 — Machinery
          </motion.span>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Built for
            <br />
            <span className="text-gradient-laser">raw power</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {machines.map((machine, i) => (
            <MachineCard key={machine.name} machine={machine} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MachineCard = ({ machine, index }: { machine: typeof machines[0]; index: number }) => {
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(null);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 w-full">
        <div className="relative overflow-hidden rounded-sm shadow-elevated">
          <motion.img
            src={machine.image}
            alt={machine.name}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
            width={800}
            height={600}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-laser-glow" />
        </div>
      </div>

      <div className="flex-1 w-full">
        <h3 className="font-display text-3xl md:text-4xl font-bold">{machine.name}</h3>
        <p className="font-body text-muted-foreground mt-2 text-sm tracking-wide">{machine.subtitle}</p>

        <div className="mt-8 space-y-0 border-t border-border">
          {machine.specs.map((spec, si) => (
            <motion.div
              key={spec.label}
              className="flex justify-between items-center py-4 border-b border-border cursor-default"
              onHoverStart={() => setHoveredSpec(si)}
              onHoverEnd={() => setHoveredSpec(null)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1 + 0.3 }}
            >
              <span className="font-body text-sm text-muted-foreground">{spec.label}</span>
              <motion.span
                className="font-display text-lg font-bold"
                animate={{
                  color: hoveredSpec === si ? 'hsl(30, 95%, 52%)' : 'hsl(220, 15%, 12%)',
                  scale: hoveredSpec === si ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {spec.value}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {machine.name.includes('Military') && (
          <motion.button
            className="mt-10 bg-primary text-white px-8 py-3 rounded-sm font-display text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 group/btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            View Technical Specs
            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default MachinerySection;
