import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase';

function DecorGallery() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const decorCollection = collection(db, 'decor');
      const decorQuery = query(decorCollection, limit(4));
      const snapshot = await getDocs(decorQuery);
      const categoriesData = [];
      
      snapshot.forEach((doc) => {
        categoriesData.push({
          id: doc.id,
          name: doc.id.replace(/-/g, ' '),
          image: doc.data().items?.[0]?.imageUrl,
          count: doc.data().items?.length || 0
        });
      });
      
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A2143]"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1E2742] mb-4">
            Wedding Decor Collections
          </h2>
          <p className="text-xl text-[#9EA1AB]">
            Transform your venue with our stunning decor options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/decor/${category.id}`}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2742]/60 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white mb-2 capitalize">
                        {category.name}
                      </h3>
                      <p className="text-white/80">
                        {category.count}+ options
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/decor"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#9A2143] to-[#BFA054] text-white rounded-xl hover:from-[#BFA054] hover:to-[#EDD498] transform hover:scale-105 transition-all duration-200"
          >
            Explore All Decor Options
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default DecorGallery;