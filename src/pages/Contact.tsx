import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 lg:px-12 text-center mb-12"
        >
          <span className="font-body text-sm tracking-[0.3em] uppercase text-primary font-bold block mb-4">Get In Touch</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Contact Us</h1>
        </motion.div>
        
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
