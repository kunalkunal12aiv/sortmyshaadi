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
    <div className="py-20 relative overflow-hidden">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-3)] to-[var(--primary-light)] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[var(--primary-dark)] mb-4">
            Curated Wedding Themes
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Discover our handpicked collection of exquisite decor inspirations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={`/decor/${category.id}`}>
                <div className="group relative rounded-2xl overflow-hidden bg-white shadow-lg">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-serif text-white mb-2 capitalize">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.count}+ designs available
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <Link
            to="/decor"
            className="inline-block px-8 py-4 bg-[var(--primary-main)] text-[var(--primary-dark)] 
              rounded-xl font-serif hover:bg-[var(--accent-1)] hover:text-white
              transform hover:scale-105 transition-all duration-300"
          >
            Explore All Themes
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default DecorGallery;