import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TributePersonType } from '../types';

interface TributeCardProps {
  person: TributePersonType;
  index: number;
}

const TributeCard: React.FC<TributeCardProps> = ({ person, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="tribute-card group"
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={person.imageSrc} 
          alt={person.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white font-serif text-xl mb-1">{person.name}</h3>
          <p className="text-rose-100 text-sm">{person.relation}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {person.description}
        </p>
        <Link 
          to={person.id === 'khulu' ? `/khulu` : `/tribute/${person.id}`}
          className="inline-block text-rose-500 hover:text-rose-600 text-sm font-medium transition-colors duration-300"
        >
          Read Tribute
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default TributeCard;