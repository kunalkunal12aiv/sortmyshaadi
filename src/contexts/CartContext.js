import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import Notification from '../components/Notification';  // Add this import

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // Load cart from localStorage if user is logged in
      if (user) {
        const savedCart = localStorage.getItem(`cart_${user.uid}`);
        if (savedCart) setCart(JSON.parse(savedCart));
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (item) => {
    if (!user) return false;
    
    const newCart = [...cart, { ...item, addedAt: new Date().toISOString() }];
    setCart(newCart);
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(newCart));
    setNotification({ message: 'Added to cart!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    return true;
  };

  const removeFromCart = (itemIndex) => {
    const newCart = cart.filter((_, index) => index !== itemIndex);
    setCart(newCart);
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(newCart));
    setNotification({ message: 'Item removed from cart', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, user }}>
      {children}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
