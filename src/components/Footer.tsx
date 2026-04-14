import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-primary">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr] gap-12 lg:gap-16 mb-16 items-start">
        {/* Column 1: Brand & About */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <img src={logo} alt="Bikaner Laser Logo" className="h-14 w-auto object-contain" />
            </div>
            <div className="font-display text-2xl md:text-2xl font-bold flex items-center gap-2 tracking-tight">
              <span className="text-white">BIKANER</span>
              <span className="text-primary italic">LASER</span>
            </div>
          </div>
          <p className="font-body text-sm text-gray-400 leading-relaxed max-w-sm">
            BIKANERLASER delivers precision, innovation, and expertise in high-quality industrial laser cutting, engraving, and solutions for global manufacturing.
          </p>

        </div>

        {/* Column 2: Quick Links / Services */}
        <div className="lg:pt-2">
          <h4 className="font-display text-primary text-sm font-bold uppercase tracking-[0.2em] mb-8">Services</h4>
          <ul className="space-y-4 font-body text-sm text-gray-400">
            <li>
              <Link to="/job-work" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                Job Work
              </Link>
            </li>
            <li>
              <Link to="/machinery" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                Machinery
              </Link>
            </li>
            <li>
              <Link to="/design-library" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                Designs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div className="lg:pt-2">
          <h4 className="font-display text-primary text-sm font-bold uppercase tracking-[0.2em] mb-8">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary transition-colors">
                <MapPin className="text-primary" size={20} />
              </div>
              <div className="font-body text-sm text-gray-400">
                <span className="text-white font-bold block mb-1">HQ Address:</span>
                Magan Bissa Bhawan, Chowkhunti,<br />Bikaner, Rajasthan, 334001<br />India
              </div>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary transition-colors">
                <Phone className="text-primary" size={20} />
              </div>
              <div className="font-body text-sm text-gray-400">
                +91 91665 62244
              </div>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary transition-colors">
                <Mail className="text-primary" size={20} />
              </div>
              <div className="font-body text-sm text-gray-400">
                adventurebissa@gmail.com
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="font-body text-xs text-gray-500">
          © 2026 BikanerLaser. All rights reserved.
        </p>
        <p className="font-body text-xs text-gray-500 italic">
          Precision engineered with passion.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
