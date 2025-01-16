import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCart } from '../../contexts/CartContext';
import CartIcon from '../../components/CartIcon';  // Add this import at the top

function DetailPage() {
  const { categoryId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, user } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'decor', categoryId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setItem(docSnap.data().items[itemId]);
      }
      setLoading(false);
    };

    fetchItem();
  }, [categoryId, itemId]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (addToCart(item)) {
      // Show success notification
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.name,
          text: `Check out this wedding decoration: ${item.name}`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        // Show copy success notification
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600" />
      </div>
    );
  }

  if (!item) return <div>Item not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="flex justify-end px-4 py-2 bg-white border-b">
        <CartIcon />
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-2xl text-pink-600 font-bold mb-6">
              Rs. {item.price.toLocaleString()}
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-600">
                {item.description || 'Beautiful wedding decoration item perfect for your special day.'}
              </p>
            </div>
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
              >
                Add to Cart
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
