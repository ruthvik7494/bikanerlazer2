import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-gradient-section overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Contact Info and Header */}
          <div className="flex-1">
            <motion.div
              className="text-left mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-bold inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                04 — Get In Touch
              </motion.span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]">
                Let's build
                <br />
                the <span className="text-gradient-laser">future</span>
              </h2>
              <p className="font-body text-muted-foreground mt-8 text-base md:text-lg leading-relaxed max-w-md">
                Share your vision and we'll turn it into precision-cut reality. 
                Every project starts with a conversation about excellence.
              </p>

              {/* Contact Details */}
              <div className="mt-12 space-y-6">
                <div>
                  <p className="font-body text-[10px] tracking-widest uppercase text-white/40 mb-1">Office Address</p>
                  <p className="font-body text-foreground">Industrial Area, Phase II, Bikaner, Rajasthan</p>
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-widest uppercase text-white/40 mb-1">Direct Line</p>
                  <p className="font-body text-foreground text-xl font-bold">+91 94141 12345</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="flex-1">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-surface-elevated/50 backdrop-blur-sm rounded-sm p-8 md:p-12 shadow-2xl border border-white/5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                    Service
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="laser">Laser Cutting</option>
                    <option value="cnc">CNC Machining</option>
                    <option value="custom">Custom Design</option>
                    <option value="bulk">Bulk Order</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                  Project Details
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="mt-10 bg-[#c8102e] text-white px-10 py-4 rounded-sm font-display text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#a00d25] transition-all shadow-lg hover:shadow-red-900/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Inquiry
                <Send size={16} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
