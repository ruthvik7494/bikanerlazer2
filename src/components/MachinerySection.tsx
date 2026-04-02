import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import machine1 from '@/assets/machine-1.jpg';
import machineEngraver from '@/assets/machine-engraver.jpg';
import machineRouter from '@/assets/machine-router.jpg';
import machine3d from '@/assets/machine-3dprinter.jpg';

interface MachineSpec {
  label: string;
  value: string;
}

interface MachineData {
  image: string;
  name: string;
  subtitle: string;
  specs: MachineSpec[];
  features: string[];
  techDetails: {
    description: string;
    items: MachineSpec[];
  };
}



const MachinerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [machines, setMachines] = useState<MachineData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        // Fetch products in 'machinery' category
        const res = await fetch(
          `${siteUrl}/wp-json/wc/v3/products?category=16&consumer_key=${key}&consumer_secret=${secret}&_embed`,
          { cache: 'no-store' }
        );
        console.log("responsemain", res);
        if (res.ok) {
          const data = await res.json();
          console.log("response2", data);
          const mappedMachines = data.map((product: any) => {
            // Helper to get meta values by key
            const getMeta = (key: string) => product.meta_data?.find((m: any) => m.key === key)?.value;
            
            // Helpful log to see the actual content of your fields
            console.log(`Values for ${product.name}:`, {
              sub: getMeta('machine_subtitle'),
              feat: getMeta('machine_features'),
              specs: getMeta('tech_specs'),
              overview: getMeta('Overview') || getMeta('overview'), // Handle case sensitivity
              img: getMeta('machine_image')
            });

            // 1. Map Overview from ACF "overview" field (Label: Value format)
            const acfOverview = getMeta('Overview') || getMeta('overview');
            const specs = acfOverview
              ? String(acfOverview).split(/\r?\n/).map((line: string) => {
                const [label, ...valueParts] = line.split(':');
                return {
                  label: label?.trim() || "",
                  value: valueParts.join(':')?.trim() || ""
                };
              }).filter((item: any) => item.label !== "")
              : (product.attributes?.map((attr: any) => ({
                  label: attr.name,
                  value: attr.options[0]
                })) || []);

            // 2. Parse Features from ACF (stored in meta_data)
            const acfFeatures = getMeta('machine_features');
            const features = acfFeatures
              ? String(acfFeatures).split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean)
              : [];

            // 3. Parse Tech Specs from ACF (stored in meta_data)
            const acfTechSpecs = getMeta('tech_specs');
            const techItems = acfTechSpecs
              ? String(acfTechSpecs).split(/\r?\n/).map((line: string) => {
                const [label, ...valueParts] = line.split(':');
                return {
                  label: label?.trim() || "",
                  value: valueParts.join(':')?.trim() || ""
                };
              }).filter((item: any) => item.label !== "")
              : [];

            const machineImg = getMeta('machine_image');
            // If machineImg is a number (ID), it's not a valid URL.
            const validMachineImg = machineImg && isNaN(Number(machineImg)) ? machineImg : null;

            return {
              // Priority: acf_image URL -> standard WC featured image
              image: validMachineImg || product.images?.[0]?.src || '',
              name: getMeta('machine_name') || product.name,
              subtitle: getMeta('machine_subtitle') || '',
              specs: specs,
              features: features,
              techDetails: {
                description: getMeta('tech_description') || product.short_description?.replace(/<[^>]*>?/gm, '') || "",
                items: techItems
              }
            };
          });

          setMachines(mappedMachines);
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return (
    <section id="machinery" ref={containerRef} className="relative py-16 md:py-24 bg-gradient-section overflow-hidden">
      <motion.div
        className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        style={{ y: bgY }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="space-y-12 md:space-y-16">
          {loading ? (
            <div className="py-20 text-center uppercase tracking-[0.3em] text-xs font-bold text-muted-foreground animate-pulse">
              Syncing Machinery Data...
            </div>
          ) : machines.length > 0 ? (
            machines.map((machine, i) => (
              <MachineCard key={machine.name} machine={machine} index={i} />
            ))
          ) : (
            <div className="py-20 text-center uppercase tracking-[0.2em] text-xs font-bold text-muted-foreground">
              No machines found in the gallery.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const MachineAccordion = ({ machine }: { machine: MachineData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: 'Overview',
      show: machine.specs.length > 0,
      content: (
        <div className="space-y-6 py-6 px-6 bg-zinc-50/80 border border-border/40 rounded-2xl mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {machine.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between items-center border-b border-border/40 pb-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium">{spec.label}</span>
                <span className="font-display font-bold text-sm tracking-tight">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Features',
      show: machine.features.length > 0,
      content: (
        <div className="py-6 px-6 bg-zinc-50/80 border border-border/40 rounded-2xl mb-6">
          <ul className="space-y-3">
            {machine.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Technical Specification',
      show: machine.techDetails.description.trim() !== "" || machine.techDetails.items.length > 0,
      content: (
        <div className="py-6 px-6 bg-zinc-50/80 border border-border/40 rounded-2xl mb-6">
          <div className="space-y-6">
            {machine.techDetails.description.trim() !== "" && (
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-4">
                "{machine.techDetails.description}"
              </p>
            )}
            {machine.techDetails.items.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {machine.techDetails.items.filter((_, i) => i < 2).map((item) => (
                    <div key={item.label}>
                      <h5 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">{item.label}</h5>
                      <p className="text-xs font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {machine.techDetails.items.filter((_, i) => i >= 2).map((item) => (
                    <div key={item.label}>
                      <h5 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">{item.label}</h5>
                      <p className="text-xs font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  ].filter(item => item.show);

  return (
    <div className="mt-8">
      {items.map((item, idx) => (
        <div key={item.title} className="border-t border-border/80 first:border-t-0">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full py-6 flex justify-between items-center group transition-all"
          >
            <span className={`font-display text-sm font-bold tracking-[0.2em] uppercase transition-all ${openIndex === idx ? 'text-primary' : 'text-foreground/70 group-hover:text-primary'}`}>
              {item.title}
            </span>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0, color: openIndex === idx ? 'hsl(var(--primary))' : 'currentColor' }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground"
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="overflow-hidden"
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="border-t border-border/80 mb-6" />
      <Button 
        variant="default"
        className="w-full py-7 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        onClick={() => {
          const whatsappUrl = `https://wa.me/919166562244?text=${encodeURIComponent(`I want to know more about ${machine.name}`)}`;
          window.open(whatsappUrl, '_blank');
        }}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Enquire More
      </Button>
    </div>
  );
};

const MachineCard = ({ machine, index }: { machine: MachineData; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-start`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 w-full self-start">
        <div className="relative overflow-hidden rounded-sm shadow-elevated group">
          <motion.img
            src={machine.image}
            alt={machine.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={600}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-laser-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>

      <div className="flex-1 w-full">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{machine.name}</h3>
        <p className="font-body text-primary font-medium mt-2 text-sm tracking-wider uppercase opacity-80">{machine.subtitle}</p>

        <MachineAccordion machine={machine} />
      </div>
    </motion.div>
  );
};

export default MachinerySection;
