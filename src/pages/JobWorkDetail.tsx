import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, ShoppingCart, ZoomIn } from 'lucide-react';

interface JobWorkProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
  longDesc: string;
  badge?: string;
  price?: string;
}

const JobWorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<JobWorkProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        const siteUrl = import.meta.env.VITE_WC_URL;
        const key = import.meta.env.VITE_WC_CONSUMER_KEY;
        const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

        const res = await fetch(
          `${siteUrl}/wp-json/wc/v3/products/${id}?consumer_key=${key}&consumer_secret=${secret}`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const data = await res.json();
          const getMeta = (key: string) => {
            const meta = data.meta_data?.find((m: any) => 
              m.key.toLowerCase() === key.toLowerCase() || 
              m.key.toLowerCase() === `_${key.toLowerCase()}`
            );
            return meta?.value;
          };

          const jobWorkParentId = 17;
          const subCategory = data.categories.find((c: any) => c.id !== jobWorkParentId)?.name || 'General';

          setProduct({
            id: data.id,
            title: data.name,
            category: subCategory,
            image: data.images?.[0]?.src || '',
            desc: getMeta('job_short_desc') || data.short_description?.replace(/<[^>]*>?/gm, '') || '',
            longDesc: data.description || '',
            badge: getMeta('product_badge') || data.tags?.[0]?.name || '',
            price: getMeta('job_price') || data.price || ''
          });

          // DEBUG LOG
          console.log("Detailed Product Metadata:", data.meta_data);
        }
      } catch (error) {
        console.error("Error fetching job work detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 font-display">Product Not Found</h1>
          <Button onClick={() => navigate('/job-work')} className="rounded-xl">Back to Services</Button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!product?.price) {
      alert("Please contact us for pricing details before purchasing.");
      return;
    }

    try {
      let orderId = '';
      let amount = product.price;

      // 1. Detect if we are running locally or on the server
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      if (isLocal) {
        console.log("Local Dev Mode: Using mock order ID");
        orderId = 'order_mock_' + Math.random().toString(36).substr(2, 9);
      } else {
        // Create real order on Hostinger backend
        const response = await fetch('/create-order.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: product.price })
        });
        const order = await response.json();
        if (!order.id) throw new Error("Failed to create order");
        orderId = order.id;
        amount = (order.amount / 100).toString(); // Use the amount confirmed by server
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_ShGAH4bFKjd1as',
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Bikaner Laser",
        description: `Purchase: ${product.title}`,
        image: "/logo.png",
        order_id: isLocal ? null : orderId, // Razorpay allows null order_id for simple local tests
        handler: function (response: any) {
          alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#f97316"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment gateway is temporarily unavailable. Redirecting to WhatsApp...");
      handleWhatsApp('buy'); // Fallback to WhatsApp if payment fails
    }
  };

  const handleWhatsApp = (type: 'enquire' | 'buy') => {
    const text = type === 'enquire' 
      ? `Hello Bikaner Laser, I am interested in your job work: ${product.title}`
      : `Hello Bikaner Laser, I want to buy this job work: ${product.title}`;
    window.open(`https://wa.me/919166562244?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.button
          onClick={() => navigate('/job-work')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Display */}
          <motion.div
            className="rounded-3xl overflow-hidden bg-white border border-border group relative aspect-square p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            {product.badge && (
              <Badge className="absolute top-6 left-6 bg-primary px-4 py-1.5 font-body text-[10px] tracking-[0.2em] uppercase">
                {product.badge}
              </Badge>
            )}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-primary h-12 w-12" />
            </div>
          </motion.div>

          {/* Details Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-body text-sm tracking-[0.3em] uppercase text-primary font-bold block mb-4">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              {product.title}
            </h1>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.desc}
            </p>

            {product.price && (
              <div className="flex items-center gap-4 mb-10">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">Starting Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl md:text-5xl font-bold text-primary italic">₹{product.price}</span>
                    <span className="font-body text-sm text-muted-foreground font-medium">/ unit</span>
                  </div>
                </div>
              </div>
            )}

            {product.longDesc && (
              <div className="prose prose-zinc dark:prose-invert max-w-none mb-12 font-body text-foreground/80 border-t border-border pt-8" 
                   dangerouslySetInnerHTML={{ __html: product.longDesc }} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleWhatsApp('enquire')}
                className="py-7 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold border-2 transition-all duration-300 hover:bg-primary/5"
              >
                <MessageCircle className="h-5 w-5" />
                Enquire Now
              </Button>
              {product.price && (
                <Button
                  onClick={handlePayment}
                  className="py-7 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary/90"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Buy Now
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobWorkDetail;
