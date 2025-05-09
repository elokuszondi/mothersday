import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';
import { Link } from 'react-router-dom';
import TributeCard from '../components/TributeCard';
import QuoteCard from '../components/QuoteCard';
import { tributeData } from '../data/tributeData';
import { quotes } from '../data/quotes';

const Home: React.FC = () => {
  // Get Khulu as the featured tribute
  const khulu = tributeData.find(person => person.id === 'khulu');
  
  // Get other tributes
  const otherTributes = tributeData.filter(person => person.id !== 'khulu');
  
  // Select a few quotes for the homepage
  const featuredQuotes = quotes.slice(0, 6);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-lavender-500/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5759235/pexels-photo-5759235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20 z-[-1]"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Flower className="text-rose-400" size={24} />
              <Heart className="text-rose-500" size={28} />
              <Flower className="text-rose-400" size={24} />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gradient">
              To the Women Who Raised Us with Love
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-700">
              Celebrating the wisdom, strength, and endless love of the extraordinary women who shaped our lives.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/khulu"
                className="btn btn-primary"
              >
                Meet Khulu
              </Link>
              <a
                href="#tributes"
                className="btn btn-secondary"
              >
                View All Tributes
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-serif mb-6">From Our Hearts</h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="mb-4">
                Every family has its pillars—the women whose love forms the foundation that holds us together. 
                This tribute site is my way of celebrating these extraordinary women who have given us not just life, 
                but the wisdom, strength, and love that shapes who we are.
              </p>
              <p className="mb-4">
                From Khulu, our beloved grandmother whose kitchen was the heart of our childhood, to our aunts who 
                each brought their unique gifts into our lives—these are the women who taught us what it means to love, 
                to persevere, and to cherish family above all.
              </p>
              <p className="italic font-serif text-rose-600">
                With endless gratitude and love,<br />
                — Elo & Cousins
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Tribute - Khulu */}
      {khulu && (
        <section className="section bg-rose-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif mb-2">Our Beloved Khulu</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The heart of our home, our pillar of strength, and the woman who filled our childhood with love and wisdom.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src={khulu.imageSrc} 
                  alt={khulu.name} 
                  className="rounded-lg shadow-lg w-full object-cover aspect-[4/5]"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-2xl font-serif mb-4 text-rose-600">The Heart of Our Home</h3>
                <p className="text-gray-700 mb-6">
                  In the tapestry of our family, Khulu's golden thread weaves through every memory, holding us together 
                  with her boundless love. From her kitchen filled with aromas that welcomed us home, to her wisdom that 
                  guided us through life's challenges, she has been our constant north star.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">In Her Words:</h4>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-rose-300 italic text-gray-700">
                    "{khulu.quotes[0].text}"
                  </div>
                </div>
                
                <Link
                  to="/khulu"
                  className="btn btn-primary self-start"
                >
                  Read Khulu's Full Tribute
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      
      {/* Quotes Section */}
      <section className="section bg-cream-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-2">Words From The Heart</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fragments of wisdom, love, and memories that capture the essence of these extraordinary women.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* All Tributes Section */}
      <section id="tributes" className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-2">Our Tributes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each of these remarkable women has contributed uniquely to our lives, leaving an indelible mark on our hearts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tributeData.map((person, index) => (
              <TributeCard key={person.id} person={person} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;