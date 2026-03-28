import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import mig21Tag from '@/assets/mig-21-tag.png';
import customNameplate from '@/assets/custom-nameplate.png';
import mandalaArt from '@/assets/mandala-art.png';
import decorativePanel from '@/assets/decorative-panel.png';
import acrylicAward from '@/assets/acrylic-award.png';
import customKeychains from '@/assets/custom-keychains.png';
import heroJobWork from '@/assets/hero-job-work.png';

const categories = ['All', 'Metal', 'Wood', 'Acrylic', 'Custom'];

const products = [
  {
    id: 1,
    title: 'MiG-21 Fishbed Tag',
    desc: 'Stainless steel laser-etched aviation tag with leather strap',
    image: mig21Tag,
    category: 'Metal',
    badge: 'Popular'
  },
  {
    id: 2,
    title: 'Executive Nameplate',
    desc: 'Premium walnut-finish laser-engraved desk nameplate for executives',
    image: customNameplate,
    category: 'Wood'
  },
  {
    id: 3,
    title: 'Precision Mandala Art',
    desc: 'High-density circular mandala cut with extreme precision',
    image: mandalaArt,
    category: 'Metal',
    badge: 'New'
  },
  {
    id: 4,
    title: 'Gold Floral Panel',
    desc: 'Intricate floral ornamental panel with gold-finish coating',
    image: decorativePanel,
    category: 'Wood'
  },
  {
    id: 5,
    title: 'Innovation Excellence Award',
    desc: 'Premium beveled acrylic award for corporate recognition',
    image: acrylicAward,
    category: 'Acrylic'
  },
  {
    id: 6,
    title: 'Custom Keychain Set',
    desc: 'Diverse collection of mixed material personalized keychains',
    image: customKeychains,
    category: 'Custom'
  }
];

const JobWork = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[450px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroJobWork} 
            alt="Job Work Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left"
          >
            <span className="font-body text-sm tracking-[0.4em] uppercase text-primary font-bold block mb-4">
              Precision Crafted
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Job Work <br />
              <span className="text-primary italic">Services</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              High-quality laser cutting and engraving solutions for professional-grade industrial and creative applications.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-surface-elevated rounded-2xl border border-border overflow-hidden flex flex-col hover-lift transition-all duration-300"
                >
                  <div className="relative aspect-[4/4] overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary px-3 py-1 font-body text-[10px] tracking-wider uppercase">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {product.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-6 flex-grow">
                      {product.desc}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-6 font-display font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary group-hover:shadow-md"
                    >
                      Inquire Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default JobWork;
