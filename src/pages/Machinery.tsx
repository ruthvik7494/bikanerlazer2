import Navbar from '@/components/Navbar';
import MachinerySection from '@/components/MachinerySection';
// import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import heroMachinery from '@/assets/hero-machinery.png';

const Machinery = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[450px] flex items-center overflow-hidden text-left">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroMachinery}
            alt="Machinery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-body text-sm tracking-[0.4em] uppercase text-primary font-bold block mb-4">
              Advanced Technology
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Industrial <br />
              <span className="text-primary italic">Machinery</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              High-performance CNC laser machines and industrial equipment designed for high-precision, professional-grade production.
            </p>
          </motion.div>
        </div>
      </div>
      <MachinerySection />
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default Machinery;
