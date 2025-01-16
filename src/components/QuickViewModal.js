import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function QuickViewModal({ item, categoryId, itemId, onClose }) {
  const { addToCart, user } = useCart();

  const handleAddToCart = () => {
    if (!user) {
      window.location.href = '/signin';
      return;
    }
    if (addToCart(item)) {
      // Show success notification
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-2">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
            <p className="text-xl text-pink-600 font-bold mb-6">
              Rs. {item.price.toLocaleString()}
            </p>
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
              >
                Add to Cart
              </button>
              <Link
                to={`/decor/${categoryId}/${itemId}`}
                className="block w-full text-center py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
