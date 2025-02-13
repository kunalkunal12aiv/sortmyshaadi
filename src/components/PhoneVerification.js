import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, firestore } from '../firebase';

function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSavePhoneNumber = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await firestore.collection('users').doc(user.uid).update({
          phoneNumber: phoneNumber,
        });
        navigate(from);
      } else {
        setError('No user is currently signed in.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Phone Verification</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="+1234567890"
        />
        <button onClick={handleSavePhoneNumber} className="w-full bg-blue-500 text-white p-2 rounded">
          Save Phone Number
        </button>
      </div>
    </div>
  );
}

export default PhoneVerification;
