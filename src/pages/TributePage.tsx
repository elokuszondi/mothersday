import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tributeData } from '../data/tributeData';
import PhotoGallery from '../components/PhotoGallery';
import MessageSection from '../components/MessageSection';
import LegacySection from '../components/LegacySection';
import CommentSection from '../components/CommentSection';
import MediaUpload from '../components/MediaUpload';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface TributePageProps {
  personId: string;
}

const TributePage: React.FC<TributePageProps> = ({ personId }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const person = tributeData.find(p => p.id === personId);
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  if (!person) {
    return <div className="container-custom py-20 text-center">Tribute not found</div>;
  }
  
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender-500/20 to-rose-500/20 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-[-1]" 
          style={{ backgroundImage: `url(${person.imageSrc})` }}
        ></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
              {person.name}
            </h1>
            
            <p className="text-xl mb-8 text-rose-600 font-medium">
              {person.relation}
            </p>
            
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
              {person.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <img 
                    src={person.imageSrc} 
                    alt={person.name}
                    className="rounded-lg shadow-lg mb-6 w-full aspect-[3/4] object-cover"
                  />
                  
                  <div className="bg-lavender-50 p-4 rounded-lg border border-lavender-100">
                    <h3 className="font-serif text-lg mb-3 text-center">Words of Wisdom</h3>
                    <div className="italic text-gray-700 text-sm">
                      "{person.quotes[0].text}"
                    </div>
                  </div>

                  {currentUser && (
                    <div className="mt-6">
                      <MediaUpload
                        tributeId={person.id}
                        currentUser={currentUser}
                        onUploadComplete={() => {}}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h2 className="text-2xl font-serif mb-6">{person.name}'s Story</h2>
                
                <div className="prose prose-lg text-gray-700 mb-8">
                  <p>
                    Some people leave a mark on your life that time cannot erase. {person.name} is one such person, 
                    whose influence has shaped our lives in countless beautiful ways.
                  </p>
                  
                  <p>
                    As our {person.relation.toLowerCase()}, {person.name} brought a unique energy and wisdom that made 
                    our childhood richer and our adult lives more meaningful. {person.description}
                  </p>
                  
                  <div className="bg-cream-50 p-4 rounded-lg border-l-4 border-cream-300 my-6">
                    <p className="italic">
                      "Family is the treasure that grows more precious with time, and {person.name} is one of our greatest gems."
                    </p>
                  </div>
                  
                  <p>
                    Through the years, we've collected countless memories with {person.name} - moments of laughter, 
                    learning, comfort, and joy that we will carry in our hearts forever.
                  </p>
                </div>
                
                <div className="bg-rose-50 p-6 rounded-lg shadow-sm mb-8">
                  <h3 className="font-serif text-xl mb-4">Special Memories</h3>
                  <ul className="space-y-2">
                    {person.memories.map((memory, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-6 w-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mr-3 mt-1">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{memory}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {person.quotes.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {person.quotes.slice(1).map((quote, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg ${
                          index % 2 === 0 
                            ? 'bg-lavender-50 border-l-4 border-lavender-300' 
                            : 'bg-cream-50 border-l-4 border-cream-300'
                        }`}
                      >
                        <p className="italic text-gray-700">"{quote.text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Photo Gallery */}
      <PhotoGallery imageSrc={person.imageSrc} name={person.name} />
      
      {/* Legacy Section */}
      <LegacySection traits={person.traits} name={person.name} />
      
      {/* Messages Section */}
      <MessageSection memories={person.memories} />

      {/* Comments Section */}
      <div className="container-custom">
        <CommentSection tributeId={person.id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default TributePage;