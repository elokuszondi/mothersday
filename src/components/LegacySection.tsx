import React from 'react';
import { motion } from 'framer-motion';

interface LegacySectionProps {
  traits: string[];
  name: string;
}

const LegacySection: React.FC<LegacySectionProps> = ({ traits, name }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-serif mb-6 text-center">
        What We Love Most About {name}
      </h2>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {traits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`py-2 px-4 rounded-full ${
                index % 4 === 0 ? 'bg-rose-100 text-rose-800' :
                index % 4 === 1 ? 'bg-lavender-100 text-lavender-800' :
                index % 4 === 2 ? 'bg-cream-100 text-cream-800' :
                'bg-gold-100 text-gold-800'
              }`}
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegacySection;