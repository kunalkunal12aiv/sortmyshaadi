import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BudgetForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      totalBudget: '',
      guestCount: '',
      checkInDate: '',
      checkOutDate: '',
      adjustedExtraBeds: null,
      doubleRooms: 0
    }
  );

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

  const handleSubmit = () => {
    const stayDuration = calculateStayDuration();
    const cleanedBudget = Number(formData.totalBudget.replace(/,/g, ''));
    onSubmit({ ...formData, totalBudget: cleanedBudget, stayDuration });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-lg p-4 max-w-md mx-auto text-sm">
      <form className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Total Wedding Budget (₹)</label>
            <input
              type="text"
              value={formData.totalBudget}
              onChange={(e) => {
                const rawVal = e.target.value.replace(/,/g, '');
                if (!isNaN(rawVal)) {
                  const formatted = rawVal ? Number(rawVal).toLocaleString('en-IN') : '';
                  setFormData({ ...formData, totalBudget: formatted });
                }
              }}
              className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Budget"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Number of Guests</label>
            <input
              type="number"
              value={formData.guestCount}
              onChange={handleGuestChange}
              className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Guests"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Rooms</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.doubleRooms || ''}
                onChange={(e) => handleRoomChange(e.target.value)}
                className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {formData.guestCount && (
                <div className="text-xs text-gray-600">
                  Suggested: {calculateAccommodation(formData.guestCount).doubleRooms}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Extra Beds</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.adjustedExtraBeds || ''}
                onChange={(e) => handleExtraBedChange(e.target.value)}
                className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {formData.guestCount && (
                <div className="text-xs text-gray-600">
                  Suggested: {calculateAccommodation(formData.guestCount).extraBeds}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Check-in Date</label>
            <ReactDatePicker
              selected={formData.checkInDate ? new Date(formData.checkInDate) : null}
              onChange={(date) =>
                setFormData(prev => ({
                  ...prev,
                  checkInDate: date.toISOString().split('T')[0],
                  checkOutDate: prev.checkOutDate && new Date(prev.checkOutDate) <= date ? '' : prev.checkOutDate
                }))
              }
              minDate={new Date()} // checkin cannot be in the past
              dateFormat="yyyy-MM-dd"
              className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholderText="Check-in"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E2742] mb-1">Check-out Date</label>
            <ReactDatePicker
              selected={formData.checkOutDate ? new Date(formData.checkOutDate) : null}
              onChange={(date) =>
                setFormData(prev => ({
                  ...prev,
                  checkOutDate: date.toISOString().split('T')[0]
                }))
              }
              minDate={
                formData.checkInDate
                ? new Date(new Date(formData.checkInDate).getTime() + 86400000)
                : new Date(new Date().getTime() + 86400000)
              } // checkout must be later than checkin
              dateFormat="yyyy-MM-dd"
              className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholderText="Check-out"
              disabled={!formData.checkInDate}
            />
          </div>
        </div>
        {calculateStayDuration() > 0 && (
          <div className="text-xs text-gray-600 text-center">
            Duration: {calculateStayDuration()} nights
          </div>
        )}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg text-base font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
        >
          Sort Hotels
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;