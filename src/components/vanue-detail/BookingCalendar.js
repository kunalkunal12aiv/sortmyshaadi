import React from 'react';
import Calendar from '../calendar/calendar';
import { motion } from 'framer-motion';
import format from 'date-fns/format';

const BookingCalendar = ({ selectedDates, handleDateSelect, events }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-2xl p-6 mt-8 max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300 border border-[var(--primary-light)]"
  >
    <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Book Your Dates</h2>
  
    <div className="w-full md:w-4/5 mx-auto">
      <Calendar
        onDateSelect={handleDateSelect}
        selectedDates={selectedDates}
        events={events}
        isManager={false}
      />
    </div>

    {selectedDates.length > 0 && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 bg-[var(--accent-3)]/20 p-4 rounded-lg border-t border-[var(--primary-main)]"
      >
        {selectedDates.map((date, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <p className="text-[#1E2742]">{format(date, 'PPP')}</p>
            <button 
              onClick={() => handleDateSelect(date)}
              className="text-[#9A2143] hover:text-[#BFA054]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <button className="mt-4 w-full bg-gradient-to-r from-[#9A2143] to-[#BFA054] text-white py-2 px-4 rounded-lg hover:from-[#BFA054] hover:to-[#EDD498] transition-all duration-200">
          Confirm Booking ({selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'})
        </button>
      </motion.div>
    )}
  </motion.div>
);

export default BookingCalendar;
