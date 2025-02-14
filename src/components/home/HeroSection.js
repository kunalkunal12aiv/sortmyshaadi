import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function HeroSection() {
  const [budget, setBudget] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('');
  const [extraBeds, setExtraBeds] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();

  const calculateAccommodation = (guests) => {
    const doubleRooms = Math.ceil(guests / 2.3);
    const capacity = doubleRooms * 2;
    const extraBeds = Math.max(0, guests - capacity);
    return { doubleRooms, extraBeds };
  };

  const handleBudgetChange = (e) => {
    const rawVal = e.target.value.replace(/,/g, '');
    if (!isNaN(rawVal)) {
      const formatted = rawVal ? Number(rawVal).toLocaleString('en-IN') : '';
      setBudget(formatted);
    }
  };

  const handleGuestChange = (e) => {
    const newGuests = Number(e.target.value);
    setGuests(newGuests);
    const { doubleRooms, extraBeds } = calculateAccommodation(newGuests);
    setRooms(doubleRooms);
    setExtraBeds(extraBeds);
  };

  const handleSearch = () => {
    navigate(`/venues?budget=${budget}&guests=${guests}&rooms=${rooms}&extraBeds=${extraBeds}&checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  const formatDateForInput = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const today = formatDateForInput(new Date());
  const tomorrow = formatDateForInput(new Date().setDate(new Date().getDate() + 1));

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h2 className="text-2xl  md:text-4xl font-playfair text-white mb-4 leading-tight">
          Let's find the best hotel deals for you!
          </h2>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-white/20">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={budget}
                onChange={handleBudgetChange}
                placeholder="Total Wedding Budget"
                className="col-span-2 w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
              />
              <input
                type="number"
                value={guests}
                onChange={handleGuestChange}
                placeholder="No. of Guests"
                className="col-span-2 w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
              />
              <div>
                <label className="block text-white text-xs mb-1">Rooms</label>
                <input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Rooms"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
                />
                {guests && (
                  <div className="text-xs text-white">
                    Suggested: {calculateAccommodation(guests).doubleRooms}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-white text-xs mb-1">Extra Beds</label>
                <input
                  type="number"
                  value={extraBeds}
                  onChange={(e) => setExtraBeds(e.target.value)}
                  placeholder="Extra Beds"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
                />
                {guests && (
                  <div className="text-xs text-white">
                    Suggested: {calculateAccommodation(guests).extraBeds}
                  </div>
                )}
              </div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
                onKeyDown={(e) => e.preventDefault()}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
              />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || tomorrow}
                onKeyDown={(e) => e.preventDefault()}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#db2777] transition-all duration-300"
              />
            </div>
            <button
              onClick={handleSearch}
              className="mt-4 w-full px-6 py-2.5 bg-[#db2777] text-white rounded-xl hover:bg-[#db2777]/90 transition-all duration-300 shadow-lg shadow-[#db2777]/20 hover:shadow-[#db2777]/40 font-medium text-sm flex items-center justify-center gap-2"
            >
              <FaSearch className="text-xs" />
              Search
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export default HeroSection;