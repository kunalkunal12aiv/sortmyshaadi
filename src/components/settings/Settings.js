import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Settings() {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    weddingDate: '',
    venue: '',
    notifications: true,
    theme: 'light',
    emailUpdates: true
  });

  useEffect(() => {
    loadSettings();
  }, [currentUser]);

  const loadSettings = async () => {
    try {
      const settingsRef = doc(db, 'userSettings', currentUser.uid);
      const snapshot = await getDoc(settingsRef);
      
      if (snapshot.exists()) {
        setSettings(snapshot.data());
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const settingsRef = doc(db, 'userSettings', currentUser.uid);
      await updateDoc(settingsRef, settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Wedding Date</label>
          <input
            type="date"
            value={settings.weddingDate}
            onChange={(e) => setSettings({ ...settings, weddingDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            type="text"
            value={settings.venue}
            onChange={(e) => setSettings({ ...settings, venue: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Enable Notifications</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.emailUpdates}
            onChange={(e) => setSettings({ ...settings, emailUpdates: e.target.checked })}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Email Updates</label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
