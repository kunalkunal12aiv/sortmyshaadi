import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import VendorList from './VendorList';
import VendorForm from './VendorForm';
import VendorStats from './VendorStats'; // Import VendorStats

const vendorCategories = [
  "Photographer",
  "Videographer",
  "Caterer",
  "Decorator",
  "Makeup Artist",
  "DJ/Music",
  "Wedding Planner",
  "Transportation",
  "Florist",
  "Invitation Designer"
];

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [isAddingVendor, setIsAddingVendor] = useState(false);
  const { currentUser } = useAuth();

  const loadVendors = useCallback(async () => {
    try {
      const vendorsRef = collection(db, 'vendors');
      const q = query(vendorsRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      setVendors(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error loading vendors:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
        <button
          onClick={() => setIsAddingVendor(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Add Vendor
        </button>
      </div>

      <VendorStats vendors={vendors} /> {/* Use VendorStats */}

      {isAddingVendor && (
        <VendorForm 
          categories={vendorCategories}
          onClose={() => setIsAddingVendor(false)}
          onVendorAdded={loadVendors}
        />
      )}

      <VendorList 
        vendors={vendors} 
        categories={vendorCategories}
        onVendorUpdated={loadVendors}
      />
    </div>
  );
}

export default VendorManagement;
