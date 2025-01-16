import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function PhoneVerification({ onComplete }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { user, setUserDetails } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        phoneNumber: phoneNumber,
        phoneVerified: true
      });
      setUserDetails(prev => ({ ...prev, phoneNumber, phoneVerified: true }));
      onComplete();
    } catch (error) {
      setError('Failed to update phone number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Phone Number</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Verify Phone Number
          </button>
        </form>
      </div>
    </div>
  );
}

export default PhoneVerification;
