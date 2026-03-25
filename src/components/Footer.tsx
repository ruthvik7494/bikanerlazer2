import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground py-16 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="font-display text-2xl font-bold">
            <span>BIKANER</span>
            <span className="text-primary">LASER</span>
          </div>
          <p className="font-body text-secondary-foreground/60 text-sm mt-3 max-w-xs">
            Industrial laser cutting & CNC solutions engineered for perfection.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-secondary-foreground/40 mb-4">Services</h4>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
              <li>Laser Cutting</li>
              <li>CNC Machining</li>
              <li>Custom Design</li>
              <li>Bulk Orders</li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-secondary-foreground/40 mb-4">Company</h4>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground/70">
              <li>About</li>
              <li>Portfolio</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-secondary-foreground/40">
          © 2026 BikanerLaser. All rights reserved.
        </p>
        <p className="font-body text-xs text-secondary-foreground/40">
          Precision engineered with passion.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
