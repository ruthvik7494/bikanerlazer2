import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, MapPin, Phone, User, Mail, ShieldCheck, PhoneCall } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PaymentSuccessModal from '@/components/PaymentSuccessModal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  altPhone: z.string().regex(/^[0-9]{10}$/, "Alternate phone must be 10 digits").optional().or(z.literal("")),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City name is too short"),
  state: z.string().min(2, "State name is too short"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits")
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutState {
  product: {
    id: number;
    title: string;
    price: string;
    image: string;
  };
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      altPhone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  useEffect(() => {
    if (!state?.product) {
      toast.error("No product selected for checkout");
      navigate('/job-work');
    }
  }, [state, navigate]);

  if (!state?.product) return null;

  const { product } = state;

  const onPaymentSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      let orderId = '';
      let amount = product.price;

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      if (isLocal) {
        orderId = 'order_mock_' + Math.random().toString(36).substr(2, 9);
      } else {
        const response = await fetch('/create-order.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: product.price })
        });
        const order = await response.json();
        if (!order.id) throw new Error("Failed to create order");
        orderId = order.id;
        amount = (order.amount / 100).toString();
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SjAIb6nDVRbYFy',
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Bikaner Laser",
        description: `Purchase: ${product.title}`,
        image: "/logo.png",
        order_id: isLocal ? null : orderId,
        handler: async function (response: any) {
          // Trigger WooCommerce Order Creation & Email
          try {
            await fetch('/complete-order.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                alt_phone: data.altPhone,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                product_title: product.title,
                amount: amount
              })
            });
          } catch (err) {
            console.error("WooCommerce sync failed:", err);
          }

          setSuccessPaymentId(response.razorpay_payment_id);
          setIsModalOpen(true);
          setIsProcessing(false);
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone
        },
        notes: {
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          altPhone: data.altPhone || 'N/A'
        },
        theme: {
          color: "#f97316"
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment initialization failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Services</span>
        </motion.button>

        <h1 className="font-display text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-foreground">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-elevated rounded-2xl md:rounded-3xl border border-border p-5 md:p-8 shadow-sm"
            >
              <form onSubmit={handleSubmit(onPaymentSubmit)} className="space-y-8 md:space-y-10">
                {/* Contact Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                      <User size={18} className="md:size-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-display">Personal Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={cn("text-xs md:text-sm", errors.name ? "text-destructive" : "")}>Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          {...register('name')}
                          className={cn("pl-10 h-11 md:h-12 rounded-xl text-sm md:text-base", errors.name && "border-destructive focus-visible:ring-destructive")}
                        />
                      </div>
                      {errors.name && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className={cn("text-xs md:text-sm", errors.email ? "text-destructive" : "")}>Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          {...register('email')}
                          type="email" 
                          className={cn("pl-10 h-11 md:h-12 rounded-xl text-sm md:text-base", errors.email && "border-destructive focus-visible:ring-destructive")}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className={cn("text-xs md:text-sm", errors.phone ? "text-destructive" : "")}>Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          {...register('phone')}
                          className={cn("pl-10 h-11 md:h-12 rounded-xl text-sm md:text-base", errors.phone && "border-destructive focus-visible:ring-destructive")}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="altPhone" className="text-xs md:text-sm">Alternate Phone (Optional)</Label>
                      <div className="relative">
                        <PhoneCall className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          {...register('altPhone')}
                          className="pl-10 h-11 md:h-12 rounded-xl text-sm md:text-base"
                        />
                      </div>
                      {errors.altPhone && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.altPhone.message}</p>}
                    </div>
                  </div>
                </section>

                {/* Address Info */}
                <section className="pt-8 border-t border-border/50">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary">
                      <MapPin size={18} className="md:size-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-display">Shipping Address</h2>
                  </div>

                  <div className="space-y-5 md:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address" className={cn("text-xs md:text-sm", errors.address ? "text-destructive" : "")}>Full Address *</Label>
                      <Textarea 
                        {...register('address')}
                        className={cn("min-h-[100px] rounded-xl p-4 text-sm md:text-base", errors.address && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.address && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className={cn("text-xs md:text-sm", errors.city ? "text-destructive" : "")}>City *</Label>
                        <Input 
                          {...register('city')}
                          className={cn("h-11 md:h-12 rounded-xl text-sm md:text-base", errors.city && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.city && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.city.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className={cn("text-xs md:text-sm", errors.state ? "text-destructive" : "")}>State *</Label>
                        <Input 
                          {...register('state')}
                          className={cn("h-11 md:h-12 rounded-xl text-sm md:text-base", errors.state && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.state && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.state.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className={cn("text-xs md:text-sm", errors.pincode ? "text-destructive" : "")}>Pincode *</Label>
                        <Input 
                          {...register('pincode')}
                          className={cn("h-11 md:h-12 rounded-xl text-sm md:text-base", errors.pincode && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.pincode && <p className="text-[10px] md:text-xs text-destructive mt-1">{errors.pincode.message}</p>}
                      </div>
                    </div>
                  </div>
                </section>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-6 md:py-8 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 group"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm md:text-lg">Initializing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 md:gap-3">
                      <CreditCard size={20} className="md:size-6 group-hover:rotate-12 transition-transform shrink-0" />
                      <span className="truncate">Proceed to Pay ₹{product.price}</span>
                    </div>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-[10px] md:text-sm bg-muted/30 py-3 md:py-4 rounded-xl md:rounded-2xl border border-border/50">
                  <ShieldCheck size={14} className="md:size-[18px] text-green-500 shrink-0" />
                  <span>Secure checkout powered by Razorpay</span>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-2xl md:rounded-3xl border border-border p-5 md:p-8 lg:sticky lg:top-32 shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-display">Order Summary</h2>
              
              <div className="flex gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-border/50">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden bg-white border border-border p-1.5 md:p-2 shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground leading-tight mb-1 truncate text-sm md:text-base">{product.title}</h3>
                  <p className="text-xs text-muted-foreground italic">Service Item</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex justify-between text-muted-foreground font-body text-xs md:text-sm">
                  <span>Price</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-body text-xs md:text-sm">
                  <span>GST (Included)</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-body text-xs md:text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium font-display tracking-wider">FREE</span>
                </div>
                <div className="flex justify-between text-lg md:text-xl font-bold text-foreground pt-3 md:pt-4 border-t border-border font-display">
                  <span>Total</span>
                  <span className="text-primary italic font-bold">₹{product.price}</span>
                </div>
              </div>


            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      <PaymentSuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate('/job-work');
        }}
        paymentId={successPaymentId}
        productName={product.title}
        amount={product.price}
      />
    </div>
  );
};

export default Checkout;
