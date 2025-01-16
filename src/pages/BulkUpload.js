import React, { useState } from 'react';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function BulkUpload() {
  const [bulkData, setBulkData] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [uploadType, setUploadType] = useState('newCollection'); // or 'singleDocument'
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const cleanPrice = (priceString) => {
    // Remove 'Rs.', commas, and any whitespace
    return parseFloat(priceString.replace(/Rs\.|,|\s/g, '')) || 0;
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    
    try {
      const rows = bulkData.trim().split('\n');
      
      if (uploadType === 'newCollection') {
        // Create new collection with multiple documents
        const newCollection = collection(db, collectionName);
        
        for (let row of rows) {
          const [name, price, imageUrl] = row.split('\t');
          await addDoc(newCollection, {
            name: name.trim(),
            price: cleanPrice(price.trim()),
            imageUrl: imageUrl.trim(),
            createdAt: new Date()
          });
        }
      } else {
        // Add all data to single document
        const docRef = doc(db, 'decor', documentId);
        const items = rows.map(row => {
          const [name, price, imageUrl] = row.split('\t');
          return {
            name: name.trim(),
            price: cleanPrice(price.trim()),
            imageUrl: imageUrl.trim()
          };
        });
        
        await setDoc(docRef, {
          items,
          createdAt: new Date()
        });
      }

      setNotification({
        show: true,
        message: 'Data uploaded successfully!',
        type: 'success'
      });
      setBulkData('');
      setCollectionName('');
      setDocumentId('');
      
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      setNotification({
        show: true,
        message: error.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-8 px-8">
          <h1 className="text-3xl font-extrabold text-white">Bulk Upload Decor Data</h1>
          <p className="mt-2 text-pink-100">Paste your Excel data (tab-separated)</p>
        </div>

        <form onSubmit={handleBulkUpload} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="newCollection"
                  checked={uploadType === 'newCollection'}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="mr-2"
                />
                New Collection
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="singleDocument"
                  checked={uploadType === 'singleDocument'}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="mr-2"
                />
                Single Document
              </label>
            </div>

            {uploadType === 'newCollection' ? (
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter collection name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            ) : (
              <input
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                placeholder="Enter document ID"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            )}

            <label className="block text-sm font-medium text-gray-700">
              Paste Data (Format: Name[tab]Price[tab]ImageURL)
            </label>
            <textarea
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Floral Centerpiece	2500	https://example.com/image1.jpg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
          >
            Upload Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default BulkUpload;