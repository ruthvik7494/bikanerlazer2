import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">Cancellation & Refund Policy</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none font-body text-muted-foreground space-y-6">
            <p>Last updated: April 24, 2026</p>
            
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Cancellation Policy</h2>
              <p>Since we provide custom laser cutting and engraving services, cancellations are only possible if the production process has not yet started. To cancel an order, please contact us immediately at +91 91665 62244.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Refund Eligibility</h2>
              <p>We offer refunds under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If the product received is damaged or defective upon arrival.</li>
                <li>If the service provided significantly differs from the agreed specifications.</li>
                <li>If the order is cancelled before production begins.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Non-Refundable Items</h2>
              <p>Custom-made products that meet the agreed-upon specifications are not eligible for refunds or returns once the production is complete.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Refund Process</h2>
              <p>Once your return/refund request is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment (via Razorpay) within 5-7 business days.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Shipping Policy</h2>
              <p>Shipping costs for returning items are the responsibility of the customer unless the item was damaged or defective upon arrival. Shipping times may vary based on your location within India.</p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
