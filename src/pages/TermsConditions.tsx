import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsConditions = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">Terms & Conditions</h1>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none font-body text-muted-foreground space-y-6">
            <p>Last updated: April 24, 2026</p>
            
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Terms</h2>
              <p>By accessing the website at https://bikanerlaser.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Bikaner Laser's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p>The materials on Bikaner Laser's website are provided on an 'as is' basis. Bikaner Laser makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p>In no event shall Bikaner Laser or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bikaner Laser's website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p>The materials appearing on Bikaner Laser's website could include technical, typographical, or photographic errors. Bikaner Laser does not warrant that any of the materials on its website are accurate, complete or current.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of Rajasthan, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
