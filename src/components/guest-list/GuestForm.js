import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiSend } from 'react-icons/fi';

function GuestForm({ onSubmit, onCancel }) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    side: 'bride',
    group: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const guestData = {
      ...formData,
      userId: currentUser.uid,
      status: 'pending',
      createdAt: new Date()
    };

    // Pass the data to GuestList (which calls addDoc) instead of duplicating addDoc here.
    onSubmit(guestData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Side</label>
            <select
              value={formData.side}
              onChange={(e) => setFormData({ ...formData, side: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="bride">Bride's Side</option>
              <option value="groom">Groom's Side</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Group</label>
            <input
              type="text"
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
            disabled={isSubmitting}
          >
            <FiSend className="w-5 h-5" />
            Add Guest
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuestForm;
