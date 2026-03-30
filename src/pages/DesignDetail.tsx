import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft, ZoomIn } from 'lucide-react';
import designTree from '@/assets/design-tree.png';
import designMandala from '@/assets/design-mandala.png';
import designWaves from '@/assets/design-waves.png';

export const designs = [
  { 
    id: 'tree-of-life',
    title: 'Tree of Life', 
    category: 'Nature', 
    image: designTree, 
    desc: 'Intricate branches and roots representing unity and growth.',
    technical: 'Best for: 1.5mm - 3mm Stainless Steel or Acrylic.',
    size: 'Standard size: 600mm x 600mm'
  },
  { 
    id: 'golden-mandala',
    title: 'Golden Mandala', 
    category: 'Geometric', 
    image: designMandala, 
    desc: 'Complex geometric patterns perfect for wall decor or lighting fixtures.',
    technical: 'Best for: 1mm - 2mm Brass or Powder-coated mild steel.',
    size: 'Standard size: 800mm x 800mm'
  },
  { 
    id: 'modern-waves',
    title: 'Modern Waves', 
    category: 'Abstract', 
    image: designWaves, 
    desc: 'Abstract wave patterns suitable for privacy screens and room dividers.',
    technical: 'Best for: 2.5mm+ Aluminum or Wood.',
    size: 'Standard size: 1200mm x 2400mm'
  },
];

import { jsPDF } from 'jspdf';

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const design = designs.find(d => d.id === id);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!design) return;
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        if (!siteUrl || !key || !secret) {
          console.error("Missing WC credentials in .env");
          setIsPdfLoading(false);
          return;
        }

        console.log(`Searching for product: ${design.title}`);
        const res = await fetch(
          `${siteUrl}/wp-json/wc/v3/products?search=${encodeURIComponent(design.title)}&consumer_key=${key}&consumer_secret=${secret}`,
          { cache: 'no-store' }
        );
        
        if (res.ok) {
          const data = await res.json();
          console.log(`Found ${data.length} products matching "${design.title}"`);
          
          if (data && data.length > 0) {
            // Find the first product that truly matches or just use the first result
            const product = data[0]; 
            const pdfMeta = product.meta_data?.find((m: any) => m.key === 'product_pdf_file');
            
            if (pdfMeta && pdfMeta.value) {
              const attachmentId = pdfMeta.value;
              console.log(`Found PDF attachment ID: ${attachmentId}`);
              
              const mediaRes = await fetch(`${siteUrl}/wp-json/wp/v2/media/${attachmentId}`, { cache: 'no-store' });
              if (mediaRes.ok) {
                const mediaData = await mediaRes.json();
                if (mediaData.source_url) {
                  // Rewrite URL to use local proxy to avoid CORS on download
                  const proxiedUrl = mediaData.source_url.replace('https://admin.sacredsouls.in', siteUrl);
                  console.log(`PDF URL (proxied): ${proxiedUrl}`);
                  setPdfUrl(proxiedUrl);
                }
              }
            } else {
              console.warn("Product found but no 'product_pdf_file' metadata exists.");
            }
          } else {
            console.warn(`No products found in WooCommerce for search: ${design.title}`);
          }
        } else {
          console.error("WooCommerce API returned an error:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsPdfLoading(false);
      }
    };

    fetchProduct();
  }, [design]);

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Design Not Found</h1>
          <Button onClick={() => navigate('/design-library')}>Back to Library</Button>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!pdfUrl) {
      alert("There is no PDF available in the database for this product.");
      return;
    }

    try {
      console.log("Starting PDF download handler...");
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF file via proxy");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${design.title.replace(/\s+/g, '_')}_spec.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      console.log("Download triggered successfully.");
    } catch (error) {
      console.error("Blob download failed, falling back to new window:", error);
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.button
          onClick={() => navigate('/design-library')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Display */}
          <motion.div 
            className="rounded-3xl overflow-hidden bg-card border border-border group relative aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={design.image} 
              alt={design.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-white h-12 w-12" />
            </div>
          </motion.div>

          {/* Details Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-body text-sm tracking-[0.3em] uppercase text-primary font-medium block mb-4">
              {design.category} Design
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {design.title}
            </h1>
            
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              {design.desc}
            </p>

            <div className="space-y-6 mb-12">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                <h3 className="font-display font-bold text-lg mb-2">Technical Specifications</h3>
                <p className="font-body text-sm text-foreground/80">{design.technical}</p>
                <p className="font-body text-sm text-foreground/80 mt-1">{design.size}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownload}
                disabled={isPdfLoading}
                className="py-7 px-10 rounded-2xl flex items-center gap-3 text-lg font-bold shadow-xl shadow-primary/20"
              >
                <FileDown className="h-5 w-5" />
                {isPdfLoading ? "Checking File..." : "Download PDF"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/#contact')}
                className="py-7 px-10 rounded-2xl text-lg font-bold"
              >
                Inquire about this design
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DesignDetail;
