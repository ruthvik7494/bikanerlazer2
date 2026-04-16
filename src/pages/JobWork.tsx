import Navbar from '@/components/Navbar';
// import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroJobWork from '@/assets/hero-job-work.png';

interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
  category: string;
  badge?: string;
}

const JobWork = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobWorkData = async () => {
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        // NOTE: Replace '25' with the actual Category ID of your "Job Work" parent category from WordPress
        const jobWorkParentId = 17;

        const res = await fetch(
          `/wp-json/wc/v3/products?category=${jobWorkParentId}&consumer_key=${key}&consumer_secret=${secret}&_embed&per_page=100`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const data = await res.json();

          const mappedProducts = data.map((product: any) => {
            // Helper to get ACF metadata
            const getMeta = (key: string) => product.meta_data?.find((m: any) => m.key === key)?.value;

            // Find the sub-category (ignoring the main Job Work parent)
            const subCategory = product.categories.find((c: any) => c.id !== jobWorkParentId)?.name || 'General';

            return {
              id: product.id,
              title: product.name,
              // Priority: ACF short desc -> WooCommerce short desc -> empty
              desc: getMeta('job_short_desc') || product.short_description?.replace(/<[^>]*>?/gm, '') || '',
              image: product.images?.[0]?.src || '',
              category: subCategory,
              // Priority: ACF badge -> WooCommerce first tag -> empty
              badge: getMeta('product_badge') || product.tags?.[0]?.name || ''
            };
          });

          setProducts(mappedProducts);

          // Dynamically generate category filters from the fetched products
          const uniqueSubCats = ['All', ...new Set(mappedProducts.map((p: any) => p.category))];
          setCategories(uniqueSubCats as string[]);
        }
      } catch (error) {
        console.error("Error fetching Job Work products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobWorkData();
  }, []);

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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">Loading Services...</p>
            </div>
          ) : (
            <>
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
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
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
                          onClick={() => {
                            const message = `Hello Bikaner Laser, I am interested in your job work: ${product.title}`;
                            window.open(`https://wa.me/919166562244?text=${encodeURIComponent(message)}`, '_blank');
                          }}
                        >
                          Enquire Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-body">No products found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default JobWork;
