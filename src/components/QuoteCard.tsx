import React from 'react';
import { motion } from 'framer-motion';
import { QuoteType } from '../types';

interface QuoteCardProps {
  quote: QuoteType;
  index: number;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index }) => {
  // Different styles for variety
  const styles = [
    'bg-white border-rose-200',
    'bg-lavender-50 border-lavender-200',
    'bg-cream-50 border-cream-200',
  ];
  
  const styleIndex = index % styles.length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`quote-card ${styles[styleIndex]} transform transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="relative">
        <svg 
          className="absolute -top-4 -left-4 h-8 w-8 text-rose-300 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <div className="mb-4 text-lg font-serif italic text-gray-700">
          "{quote.text}"
        </div>
        {quote.attribution && (
          <div className="text-sm text-gray-500">— {quote.attribution}</div>
        )}
      </div>
    </motion.div>
  );
};

export default QuoteCard;