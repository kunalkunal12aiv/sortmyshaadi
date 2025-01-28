import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

function VenueOwnerProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: '',
    businessDocuments: []
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      const docRef = doc(db, 'venueOwners', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
      setLoading(false);
    };
    fetchProfile();
  }, [currentUser]);

  const handleImageUpload = async (file) => {
    const fileRef = ref(storage, `owner-profiles/${currentUser.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, 'venueOwners', currentUser.uid);
      await updateDoc(docRef, profile);
      setNotification({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setNotification({ type: 'error', message: error.message });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Venue Owner Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile({...profile, businessName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                  <input
                    type="text"
                    value={profile.ownerName}
                    onChange={(e) => setProfile({...profile, ownerName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = await handleImageUpload(file);
                      setProfile({...profile, profileImage: url});
                    }
                  }}
                  className="mt-1 block w-full"
                />
              </div>

              {notification && (
                <div className={`p-4 rounded-md ${
                  notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {notification.message}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueOwnerProfile;
