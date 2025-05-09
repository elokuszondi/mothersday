import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Flower } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-50 border-t border-rose-100 py-12">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-2 mb-4">
            <Flower className="text-rose-400" size={20} />
            <Heart className="text-rose-500" size={20} />
            <Flower className="text-rose-400" size={20} />
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <p className="text-gray-600 mb-4">
              This tribute site is dedicated to the incredible women who raised us with love, 
              shaped our lives with wisdom, and continue to inspire us every day.
            </p>
            <p className="font-serif italic text-rose-700">
              "The legacy of a mother is reflected in the lives she touches."
            </p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">
              Home
            </Link>
            <Link to="/khulu" className="text-gray-600 hover:text-rose-500 transition-colors duration-300">
              Khulu
            </Link>
          </div>
          
          <div className="border-t border-rose-100 pt-8 w-full">
            <p className="flex items-center justify-center text-sm text-gray-500">
              <span>Built with love by Elo & Cousins</span>
              <Heart className="text-rose-400 mx-1" size={12} />
              <span>{new Date().getFullYear()}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;