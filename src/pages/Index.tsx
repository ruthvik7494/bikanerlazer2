import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import JobWorkSection from '@/components/JobWorkSection';
import MachinerySection from '@/components/MachinerySection';
import DesignLibrary from '@/components/DesignLibrary';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <HeroSection />
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
