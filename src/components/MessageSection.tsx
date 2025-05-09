import React from 'react';
import { motion } from 'framer-motion';

interface MessageSectionProps {
  memories: string[];
}

const MessageSection: React.FC<MessageSectionProps> = ({ memories }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-serif mb-6 text-center">Loving Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`p-5 rounded-lg shadow-md ${
              index % 3 === 0 ? 'bg-rose-50 border-l-4 border-rose-300' : 
              index % 3 === 1 ? 'bg-lavender-50 border-l-4 border-lavender-300' :
              'bg-cream-50 border-l-4 border-cream-300'
            }`}
          >
            <p className="text-gray-700 font-medium">{memory}</p>
            <div className="flex items-center mt-4">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                E
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">From Elo</p>
                <p className="text-xs text-gray-500">Family</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessageSection;