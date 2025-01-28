import React, { useState } from 'react';

function BudgetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    totalBudget: '',
    guestCount: '',
    checkInDate: '',
    checkOutDate: '',
    adjustedExtraBeds: null,
    doubleRooms: 0
  });

  const calculateAccommodation = (guests, rooms = null, beds = null) => {
    const doubleRooms = rooms || Math.ceil(guests / 2.3);
    const capacity = doubleRooms * 2;
    const extraBeds = beds || Math.max(0, guests - capacity);
    return { doubleRooms, extraBeds };
  };

  const handleGuestChange = (e) => {
    const guests = Number(e.target.value);
    const { doubleRooms, extraBeds } = calculateAccommodation(guests);
    setFormData({
      ...formData,
      guestCount: guests,
      doubleRooms,
      adjustedExtraBeds: extraBeds
    });
  };

  const handleRoomChange = (rooms) => {
    const newRooms = Number(rooms);
    const capacity = newRooms * 2;
    const extraBeds = Math.max(0, formData.guestCount - capacity);
    setFormData({
      ...formData,
      doubleRooms: newRooms,
      adjustedExtraBeds: extraBeds
    });
  };

  const handleExtraBedChange = (beds) => {
    const newBeds = Number(beds);
    const remainingGuests = formData.guestCount - newBeds;
    const newRooms = Math.ceil(remainingGuests / 2);
    setFormData({
      ...formData,
      doubleRooms: newRooms,
      adjustedExtraBeds: newBeds
    });
  };

  const calculateStayDuration = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinCheckoutDate = () => {
    if (!formData.checkInDate) return getCurrentDate();
    const nextDay = new Date(formData.checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setFormData(prev => {
      if (prev.checkOutDate && prev.checkOutDate <= newCheckInDate) {
        return {
          ...prev,
          checkInDate: newCheckInDate,
          checkOutDate: ''
        };
      }
      return {
        ...prev,
        checkInDate: newCheckInDate
      };
    });
  };

  const handleDateInput = (e) => {
    const input = e.target;
    const selectedDate = new Date(input.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      // Reset to today's date if past date selected
      input.value = getCurrentDate();
      return;
    }
  };

  const handleSubmit = () => {
    const stayDuration = calculateStayDuration();
    onSubmit({ ...formData, stayDuration });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enter Your Details</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Wedding Budget (₹)
          </label>
          <input
            type="number"
            value={formData.totalBudget}
            onChange={(e) => setFormData({...formData, totalBudget: Number(e.target.value)})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Enter your total budget"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            value={formData.guestCount}
            onChange={handleGuestChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Enter number of guests"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms 
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={formData.doubleRooms || ''}
                onChange={(e) => handleRoomChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {formData.guestCount && (
                <div className="text-sm text-gray-600">
                  Suggested: {calculateAccommodation(formData.guestCount).doubleRooms}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Beds
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={formData.adjustedExtraBeds || ''}
                onChange={(e) => handleExtraBedChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {formData.guestCount && (
                <div className="text-sm text-gray-600">
                  Suggested: {calculateAccommodation(formData.guestCount).extraBeds}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={formData.checkInDate}
              onChange={handleCheckInChange}
              onInput={handleDateInput}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min={getCurrentDate()}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out Date
            </label>
            <input
              type="date"
              value={formData.checkOutDate}
              onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min={getMinCheckoutDate()}
              disabled={!formData.checkInDate}
              required
            />
          </div>
        </div>

        {calculateStayDuration() > 0 && (
          <div className="text-sm text-gray-600">
            Duration: {calculateStayDuration()} nights
          </div>
        )}

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
        >
          Sort Hotels
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;