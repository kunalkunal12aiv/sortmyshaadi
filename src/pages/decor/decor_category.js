import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import CategoryNav from '../../components/CategoryNav';
import CartIcon from '../../components/CartIcon';
import QuickViewModal from '../../components/QuickViewModal';
import { Helmet } from 'react-helmet-async';

function CategoryPage() {
  const { categoryId } = useParams();
  const slug = categoryId.replace(/-/g, ' ');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState({ show: false, item: null, itemId: null });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all categories for nav
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

      // Fetch current category items
      const docRef = doc(db, 'decor', categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItems(docSnap.data().items || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <Helmet>
        <title>{slug} Décor - Sort My Shaadi</title>
        <meta name="description" content={`Explore exquisite ${slug} décor designs curated for modern weddings.`} />
        <link rel="canonical" href={`${window.location.origin}/decor/${categoryId}`} />
      </Helmet>
      <div className="min-h-screen bg-white">
        {!loading && <CategoryNav categories={categories} />}
        <div className="flex justify-end px-4 py-2 bg-white border-b">
          <CartIcon />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 capitalize">{categoryId.replace(/-/g, ' ')}</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-30 rounded-t-xl z-10">
                    <button
                      onClick={() => setQuickView({ 
                        show: true, 
                        item, 
                        itemId: index 
                      })}
                      className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transform transition hover:scale-105"
                    >
                      Quick View
                    </button>
                  </div>
                  <Link 
                    to={`/decor/${categoryId}/${index}`}
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
                        <h2 className="font-medium text-gray-900 group-hover:text-pink-600">
                          {item.name}
                        </h2>
                        <p className="text-pink-600 font-semibold mt-1">
                          Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {quickView.show && (
          <QuickViewModal
            item={quickView.item}
            categoryId={categoryId}
            itemId={quickView.itemId}
            onClose={() => setQuickView({ show: false, item: null })}
          />
        )}
      </div>
    </>
  );
}

export default CategoryPage;
