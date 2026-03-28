import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  className?: string;
  centered?: boolean;
}

const SectionHeading = ({ label, title, className = '', centered = false }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <motion.span
        className="font-body text-sm tracking-[0.3em] uppercase text-primary font-medium inline-block"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-[1.1]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i !== title.split('\n').length - 1 && <br />}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
