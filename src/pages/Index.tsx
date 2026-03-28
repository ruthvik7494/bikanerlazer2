import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import JobWorkSection from '@/components/JobWorkSection';
import MachinerySection from '@/components/MachinerySection';
import DesignLibrary from '@/components/DesignLibrary';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import { Wrench, Cpu, BookOpen } from 'lucide-react';

const categories = [
  { icon: Wrench, title: "Job Work", desc: "Custom laser cutting & engraving services", path: "/job-work" },
  { icon: Cpu, title: "Machinery", desc: "Industrial CNC & laser machines for sale", path: "/machinery" },
  { icon: BookOpen, title: "Design Library", desc: "Browse thousands of ready-made designs", path: "/design-library" },
];

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <HeroSection />
      
      {/* CATEGORIES */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeading label="What We Offer" title="Explore Our Categories" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={cat.path}
                  className="group block h-full bg-card rounded-2xl border border-border p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover-lift"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-foreground mb-3">{cat.title}</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <JobWorkSection />
      <MachinerySection />
      <DesignLibrary />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
