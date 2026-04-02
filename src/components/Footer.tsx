import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, Map } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-primary">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <div className="font-display text-3xl font-bold flex items-center gap-2">
            <span>BIKANER</span>
            <span className="text-primary italic">LASER</span>
            <span className="text-primary -ml-2 mb-4 text-xl">✨</span>
          </div>
          <p className="font-body text-sm text-gray-400 leading-relaxed max-w-sm">
            BIKANERLASER delivers precision, innovation, and expertise in high-quality industrial laser cutting, engraving, and solutions for global manufacturing.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary hover:text-black transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary hover:text-black transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary hover:text-black transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary hover:text-black transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="font-display text-primary text-lg font-bold uppercase tracking-wider mb-6">Services</h4>
          <ul className="space-y-3 font-body text-sm text-gray-400">
            <li className="hover:text-primary transition-colors cursor-pointer">Precision Laser Cutting</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Metal Fabrication</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Fiber Laser Engraving</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Tube Cutting Solutions</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Welding Services</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Automotive & Aerospace</li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-display text-primary text-lg font-bold uppercase tracking-wider mb-6">Company</h4>
          <ul className="space-y-3 font-body text-sm text-gray-400">
            <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Core Values</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Quality Assurance</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Global Reach</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Client Testimonials</li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="font-display text-primary text-lg font-bold uppercase tracking-wider mb-6">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div className="font-body text-sm text-gray-400">
                <span className="text-white font-bold block mb-1 underline-offset-4 decoration-primary/30">HQ Address:</span>
                Magan Bissa Bhawan, Chowkhunti,<br />Bikaner, Rajasthan, 334001<br />India
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-primary shrink-0" size={20} />
              <div className="font-body text-sm text-gray-400">
                +91 91665 62244
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-primary shrink-0" size={20} />
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
