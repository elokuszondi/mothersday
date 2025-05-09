import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { tributeData } from '../data/tributeData';
import PhotoGallery from '../components/PhotoGallery';
import MessageSection from '../components/MessageSection';
import LegacySection from '../components/LegacySection';
import CommentSection from '../components/CommentSection';
import MediaUpload from '../components/MediaUpload';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

const KhuluPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const khulu = tributeData.find(person => person.id === 'khulu');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!khulu) {
    return <div className="container-custom py-20 text-center">Tribute not found</div>;
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 to-lavender-500/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7148670/pexels-photo-7148670.jpeg')] bg-cover bg-center opacity-20 z-[-1]"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-white/70 px-4 py-2 rounded-full">
              <Heart className="text-rose-500" size={20} />
              <span className="text-rose-600 font-medium">Special Tribute</span>
              <Heart className="text-rose-500" size={20} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Our Beloved Khulu
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700">
              The heart of our home, our pillar of strength, and the woman who filled our childhood with love and wisdom.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Special Section - The Heart of Our Home */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif text-center mb-8">The Heart of Our Home</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="sticky top-24">
                    <img 
                      src={khulu.imageSrc} 
                      alt={khulu.name}
                      className="rounded-lg shadow-lg mb-6 w-full aspect-[3/4] object-cover"
                    />
                    
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <Star className="text-gold-400" size={18} />
                      <span>{khulu.relation}</span>
                      <Star className="text-gold-400" size={18} />
                    </div>

                    {currentUser && (
                      <div className="mt-6">
                        <MediaUpload
                          tributeId={khulu.id}
                          currentUser={currentUser}
                          onUploadComplete={() => {}}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    In the tapestry of our family, Khulu's golden thread weaves through every memory, holding us together 
                    with her boundless love. From her kitchen filled with aromas that welcomed us home, to her wisdom that 
                    guided us through life's challenges, she has been our constant north star.
                  </p>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    As the matriarch of our family, Khulu raised us with both tender care and unwavering strength. She taught 
                    us the value of hard work, the importance of forgiveness, and the power of unconditional love. Her laugh 
                    could light up the darkest room, and her embrace was a sanctuary where we always found peace.
                  </p>
                  
                  <div className="bg-cream-50 p-6 rounded-lg border-l-4 border-gold-300">
                    <h3 className="font-serif text-xl mb-3 text-gold-800">Khulu's Kitchen Wisdom</h3>
                    <p className="text-gray-700 italic">
                      "The kitchen is where we learn the most important lessons - patience, sharing, and the taste of love."
                    </p>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Every family gathering centered around Khulu's kitchen, where pots bubbled with traditional recipes passed 
                    down through generations. As we watched her hands work deftly, she would share stories of our ancestors, 
                    ensuring that our heritage would live on through us.
                  </p>
                  
                  <div className="bg-rose-50 p-6 rounded-lg border-l-4 border-rose-300">
                    <h3 className="font-serif text-xl mb-3 text-rose-800">A Grandmother's Legacy</h3>
                    <p className="text-gray-700 italic">
                      "A family's strength is measured by how tightly they hold each other in times of trouble."
                    </p>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Through joys and sorrows, celebrations and challenges, Khulu has been our family's cornerstone. Her 
                    resilience in the face of life's hardships taught us to stand tall, her generosity showed us how to 
                    give freely, and her faith inspired our own spiritual journeys.
                  </p>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    This tribute is but a small token of the immeasurable gratitude we feel for the woman who has given us 
                    so much. Khulu, your love has been the greatest gift of our lives.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Quotes Section */}
      <section className="section bg-cream-50">
        <div className="container-custom">
          <h2 className="text-3xl font-serif text-center mb-8">In Her Words</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {khulu.quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md border border-cream-200"
              >
                <div className="relative">
                  <svg 
                    className="absolute -top-4 -left-4 h-8 w-8 text-rose-300 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div className="font-serif italic text-gray-700 text-lg">
                    "{quote.text}"
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Photo Gallery */}
      <PhotoGallery imageSrc={khulu.imageSrc} name={khulu.name} />
      
      {/* Legacy Section */}
      <LegacySection traits={khulu.traits} name={khulu.name} />
      
      {/* Messages Section */}
      <MessageSection memories={khulu.memories} />

      {/* Comments Section */}
      <div className="container-custom">
        <CommentSection tributeId={khulu.id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default KhuluPage;