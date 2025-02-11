import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { currentUser, setUserDetails } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const updatedData = {
        phoneNumber: phoneNumber,
        phoneVerified: true
      };
      
      await updateDoc(userRef, updatedData);
      
      // Update user details in context
      setUserDetails(prev => ({
        ...prev,
        ...updatedData
      }));

      // Navigate to return URL or home
      const returnUrl = location.state?.returnUrl || '/';
      navigate(returnUrl);
    } catch (error) {
      console.error('Error updating phone:', error);
      setError('Failed to update phone number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          One Last Step!
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please verify your phone number to continue
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
          >
            Verify & Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default PhoneVerification;
