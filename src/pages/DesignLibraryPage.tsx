import Navbar from '@/components/Navbar';
// import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import heroDesigns from '@/assets/hero-designs.png';

interface DesignProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
}

const DesignLibraryPage = () => {
  const [designs, setDesigns] = useState<DesignProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        // NOTE: Category ID of your "Designs" parent category from WordPress
        const designsCategoryId = 22;

        const res = await fetch(
          `${siteUrl}/wp-json/wc/v3/products?category=${designsCategoryId}&consumer_key=${key}&consumer_secret=${secret}&_embed&per_page=100`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((p: any) => ({
            id: p.id,
            title: p.name,
            category: p.categories.find((c: any) => c.id !== designsCategoryId)?.name || 'Design',
            image: p.images?.[0]?.src || '',
            desc: p.short_description?.replace(/<[^>]*>?/gm, '') || ''
          }));
          setDesigns(mapped);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[450px] flex items-center overflow-hidden text-left">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroDesigns}
            alt="Design Library Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="font-body text-sm tracking-[0.4em] uppercase text-primary font-bold block mb-4">
              Our Patterns
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white leading-tight italic-accent">
              Design <span className="text-primary italic">Library</span>
            </h1>
            <p className="font-body text-lg text-white/80 max-w-xl leading-relaxed">
              Explore our collection of precision-engineered vector designs, expertly crafted for industrial-grade cutting and engraving.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Design Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="py-20 text-center uppercase tracking-[0.3em] text-xs font-bold text-muted-foreground animate-pulse">
              Syncing Design Library...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {designs.map((design, i) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/design/${design.id}`}>
                    <div className="relative overflow-hidden rounded-3xl aspect-square shadow-elevated border border-border group-hover:border-primary/50 transition-colors duration-500">
                      {design.image && (
                        <img
                          src={design.image}
                          alt={design.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full text-black shadow-lg">
                          <Search className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-start justify-between">
                      <div>
                        <span className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2 block">
                          {design.category} Template
                        </span>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {design.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-1">
                          {design.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && designs.length === 0 && (
            <div className="text-center py-20 grayscale opacity-50">
              <p className="font-body text-sm uppercase tracking-widest">No designs found in the library.</p>
            </div>
          )}
        </div>
      </section>

      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default DesignLibraryPage;
