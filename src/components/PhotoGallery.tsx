import React from 'react';
import { motion } from 'framer-motion';

interface PhotoGalleryProps {
  imageSrc: string;
  name: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ imageSrc, name }) => {
  // In a real implementation, this would use multiple images
  // For now, we'll create a gallery effect with a single image
  return (
    <div className="py-8">
      <h2 className="text-2xl font-serif mb-6 text-center">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`overflow-hidden rounded-lg shadow-md ${
              index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'
            }`}
          >
            <img 
              src={imageSrc} 
              alt={`${name} - Photo ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-500 italic">
        Photo placeholders - add your personal photos here
      </p>
    </div>
  );
};

export default PhotoGallery;