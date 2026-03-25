import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import aboutFacility from '@/assets/about-facility.png';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';
import team4 from '@/assets/team-4.jpg';

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const stats = [
    { label: 'Projects Delivered', value: 5000, suffix: '+' },
    { label: 'Turnaround Time', value: 24, suffix: 'hrs' },
    { label: 'Years of Legacy', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 200, suffix: '+' },
  ];

  const team = [
    { image: team1, name: 'Bissa', designation: 'Founder' },
    { image: team2, name: 'Ankit Bissa', designation: 'Technical Director' },
    { image: team3, name: 'Rahul Soni', designation: 'Production Head' },
    { image: team4, name: 'Priya Sharma', designation: 'Head of Design' },
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-24 bg-gradient-section overflow-hidden">
      {/* Decorative */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-24">
          {/* Left: Image Container */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group overflow-hidden rounded-sm shadow-2xl">
              <img 
                src={aboutFacility} 
                alt="Precision Laser Facility" 
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 border-l-2 border-primary pl-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display text-white font-bold text-lg tracking-wide uppercase">Precision Excellence</p>
                <p className="font-body text-white/60 text-xs tracking-widest mt-1 uppercase">Since 1972</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-bold">
                01 — About BikanerLaser
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-6 leading-[1.1] text-foreground">
                Pioneering
                <br />
                precision since
                <br />
                <span className="text-gradient-laser">1972</span>
              </h2>
              
              <div className="mt-10 space-y-6">
                <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
                  For over five decades, BikanerLaser has been at the forefront of precision manufacturing in India. 
                  What started as a small workshop has grown into a state-of-the-art facility equipped 
                  with the latest CNC technology.
                </p>
                <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
                  Our commitment to quality and innovation has made us the trusted partner for industries 
                  ranging from defense to high-end architecture, delivering excellence with every cut.
                </p>
              </div>

              {/* Stats Grid integrated into right column for tight design */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12 pt-10 border-t border-border">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl md:text-4xl font-black text-primary">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2 font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 md:mt-24">
          <motion.div
            className="mb-12 md:mb-16 text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-bold">
              Our Professionals
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]">
              Meet our <span className="text-gradient-laser">team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group relative flex flex-col md:block overflow-hidden rounded-sm bg-card md:bg-transparent"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 md:opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Desktop Title Overlay */}
                  <div className="hidden md:block absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="font-body text-xs tracking-widest uppercase text-primary font-bold">{member.designation}</p>
                  </div>
                </div>
                
                {/* Mobile Title (Below Image) */}
                <div className="md:hidden p-4 bg-card border-t border-border/50">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="font-body text-[10px] tracking-widest uppercase text-primary font-bold">{member.designation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
