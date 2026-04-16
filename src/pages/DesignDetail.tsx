import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PdfFile {
  name: string;
  url: string;
}

interface DesignData {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
  technical: string;
  size: string;
  pdfs: PdfFile[];
}

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState<DesignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesignData = async () => {
      if (!id) return;
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        // 1. Fetch the specific product by ID using relative path via proxy
        const res = await fetch(
          `${siteUrl}/wp-json/wc/v3/products/${id}?consumer_key=${key}&consumer_secret=${secret}`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const product = await res.json();
          const getMeta = (key: string) => product.meta_data?.find((m: any) => m.key === key)?.value;

          // 1. Filter out parent category (ID 22) to get the specific one (Nature, Abstract, etc.)
          const designsParentId = 22;
          const subCategory = product.categories?.find((c: any) => c.id !== designsParentId)?.name || 'Pattern';

          // 2. Fetch PDF Media URL
          const pdfAttachmentId = getMeta('product_pdf_file');
          const pdfs: PdfFile[] = [];

          if (pdfAttachmentId) {
            try {
              const mediaRes = await fetch(`${siteUrl}/wp-json/wp/v2/media/${pdfAttachmentId}`, { cache: 'no-store' });
              if (mediaRes.ok) {
                const mediaData = await mediaRes.json();
                if (mediaData.source_url) {
                  const proxiedUrl = mediaData.source_url;
                  pdfs.push({ name: "PDF Specification", url: proxiedUrl });
                }
              }
            } catch (err) { /* silent */ }
          }

          setDesign({
            id: product.id,
            title: product.name,
            category: subCategory,
            image: product.images?.[0]?.src || '',
            desc: product.description?.replace(/<[^>]*>?/gm, '') || product.short_description?.replace(/<[^>]*>?/gm, '') || '',
            technical: getMeta('design_technical'),
            size: getMeta('design_size'),
            pdfs: pdfs
          });
        }
      } catch (error) {
        console.error("Error fetching design detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignData();
  }, [id]);

  const handleView = (url: string) => {
    setViewingPdf(url);
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `${design?.title.replace(/\s+/g, '_')}_${fileName.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">Fetching Design Details...</p>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 font-display">Design Not Found</h1>
          <Button onClick={() => navigate('/design-library')} className="rounded-xl">Back to Library</Button>
        </div>
      </div>
    );
  }

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
            {design.image && (
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            )}
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
              {design.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {design.title}
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              {design.desc}
            </p>

            {design.technical || design.size ? <div className="space-y-6 mb-12">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                <h3 className="font-display font-bold text-lg mb-2">Technical Specifications</h3>
                <div className="font-body text-sm text-foreground/80 leading-relaxed">
                  {design.technical && <p className="mb-1">{design.technical}</p>}
                  {design.size && <p className="font-medium">Standard size: {design.size}</p>}
                </div>
              </div>
            </div> : null}

            <div className="space-y-4">
              {design.pdfs.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {design.pdfs.map((pdf, index) => (
                    <div key={index} className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => handleView(pdf.url)}
                        variant="secondary"
                        className="py-4 px-8 md:py-7 md:px-10 rounded-2xl flex items-center gap-3 text-base md:text-lg font-bold shadow-lg"
                      >
                        <ZoomIn className="h-5 w-5" />
                        View PDF
                      </Button>
                      <Button
                        onClick={() => handleDownload(pdf.url, pdf.name)}
                        className="py-4 px-8 md:py-7 md:px-10 rounded-2xl flex items-center gap-3 text-base md:text-lg font-bold shadow-xl shadow-primary/20"
                      >
                        <FileDown className="h-5 w-5" />
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 font-medium text-sm">
                  No technical documents available for this design yet.
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => {
                  const message = `Hello Bikaner Laser, I am interested in this design: ${design?.title}`;
                  window.open(`https://wa.me/919166562244?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="py-4 px-8 md:py-7 md:px-10 rounded-2xl text-base md:text-lg font-bold w-fit mt-4"
              >
                Enquire about this design
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PDF View Modal */}
      <Dialog open={!!viewingPdf} onOpenChange={(open) => !open && setViewingPdf(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-background">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>PDF Specification Preview</DialogTitle>
          </DialogHeader>
          <div className="flex-grow w-full h-[calc(90vh-80px)]">
            {viewingPdf && (
              <iframe
                src={`${viewingPdf}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DesignDetail;
