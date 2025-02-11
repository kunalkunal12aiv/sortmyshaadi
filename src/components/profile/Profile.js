import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    partnerEmail: '',
    partnerStatus: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');

  const loadProfile = useCallback(async () => {
    try {
      const profileRef = collection(db, 'profiles');
      const q = query(profileRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const profileData = snapshot.docs[0].data();
        setProfile({
          displayName: profileData.displayName,
          email: profileData.email,
          partnerEmail: profileData.partnerEmail || '',
          partnerStatus: profileData.partnerStatus || 'Not Invited'
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const invitePartner = async () => {
    try {
      const profileRef = collection(db, 'profiles');
      const q = query(profileRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docRef = doc(db, 'profiles', snapshot.docs[0].id);
        await updateDoc(docRef, {
          partnerEmail: inviteEmail,
          partnerStatus: 'Pending'
        });
        setProfile((prevProfile) => ({
          ...prevProfile,
          partnerEmail: inviteEmail,
          partnerStatus: 'Pending'
        }));
        setInviteEmail('');
      }
    } catch (error) {
      console.error('Error inviting partner:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={profile.displayName}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Invite Partner</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Partner Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter partner's email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <button
            onClick={invitePartner}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Invite Partner
          </button>
          {profile.partnerEmail && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Partner Email: {profile.partnerEmail}</p>
              <p className="text-sm text-gray-600">Status: {profile.partnerStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
