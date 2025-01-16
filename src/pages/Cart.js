import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
          <Link to="/decor" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid gap-8">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-6 bg-white p-4 rounded-lg shadow-sm">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-pink-600 font-bold mt-2">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between text-xl font-bold mb-8">
            <span>Total:</span>
            <span>Rs. {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
          </div>
          <button className="w-full bg-pink-600 text-white py-4 rounded-lg text-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
