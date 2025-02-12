import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

function SavedItems() {
  const [savedItems, setSavedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('inspiration'); // inspiration, cart, shortlist
  const { currentUser } = useAuth();
  const { cart } = useCart();

  const loadSavedItems = useCallback(async () => {
    try {
      const savedRef = collection(db, 'savedItems');
      const q = query(savedRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      setSavedItems(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error loading saved items:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    loadSavedItems();
  }, [loadSavedItems]);

  const renderContent = () => {
    switch(activeTab) {
      case 'cart':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-pink-600">₹{item.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'inspiration':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('inspiration')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'inspiration' 
              ? 'bg-pink-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Inspiration Board
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'cart' 
              ? 'bg-pink-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Cart Items ({cart.length})
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

export default SavedItems;
