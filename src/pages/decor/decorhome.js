import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CategoryNav from '../../components/CategoryNav';
import QuickViewModal from '../../components/QuickViewModal';
import CartIcon from '../../components/CartIcon';
import 'swiper/css';
import 'swiper/css/navigation';
import { Helmet } from 'react-helmet-async';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState({ show: false, item: null, categoryId: null, itemId: null });

  useEffect(() => {
    const fetchCategories = async () => {
      const decorCollection = collection(db, 'decor');
      const snapshot = await getDocs(decorCollection);
      const categoriesData = [];
      
      snapshot.forEach((doc) => {
        categoriesData.push({
          id: doc.id,
          items: doc.data().items?.slice(0, 10) || [],
        });
      });
      
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Décor Home - Sort My Shaadi</title>
        <meta name="description" content="Discover wedding decoration categories and curated designs for your special day." />
        <link rel="canonical" href={`${window.location.origin}/decor`} />
      </Helmet>
      <div className="min-h-screen bg-white">
        {!loading && <CategoryNav categories={categories} />}
        <div className="flex justify-end px-4 py-2 bg-white border-b">
          <CartIcon />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-12">Wedding Decorations</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600" />
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold capitalize">{category.id.replace(/-/g, ' ')}</h2>
                    <Link 
                      to={`/decor/${category.id}`}
                      className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  
                  <div className="overflow-hidden">
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={24}
                      slidesPerView={1.2}
                      breakpoints={{
                        640: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3.2 },
                        1024: { slidesPerView: 4.2 },
                      }}
                      className="!px-1"
                    >
                      {category.items.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-30 rounded-t-xl z-10">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setQuickView({ 
                                    show: true, 
                                    item, 
                                    categoryId: category.id, 
                                    itemId: index 
                                  });
                                }}
                                className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transform transition hover:scale-105"
                              >
                                Quick View
                              </button>
                            </div>
                            <Link 
                              to={`/decor/${category.id}/${index}`}
                              className="block group"
                            >
                              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="aspect-w-1 aspect-h-1 w-full">
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-t-xl"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="font-medium text-gray-900 group-hover:text-pink-600 truncate">
                                    {item.name}
                                  </h3>
                                  <p className="text-pink-600 font-semibold mt-1">
                                    Rs. {item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {quickView.show && (
          <QuickViewModal
            item={quickView.item}
            categoryId={quickView.categoryId}
            itemId={quickView.itemId}
            onClose={() => setQuickView({ show: false, item: null })}
          />
        )}
      </div>
    </>
  );
}

export default Home;
