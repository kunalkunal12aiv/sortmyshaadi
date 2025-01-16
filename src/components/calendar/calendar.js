import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isValid } from 'date-fns';

const Calendar = ({ onDateSelect, onResetDate, selectedDates = [], isManager = false, events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventType, setEventType] = useState('Peak Demand'); // Add this for manager mode
  const [eventTitle, setEventTitle] = useState('');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Helper function to safely parse dates
  const parseDateValue = (dateValue) => {
    if (!dateValue) return null;
    
    // If it's already a Date object and valid
    if (dateValue instanceof Date && isValid(dateValue)) {
      return dateValue;
    }

    // If it's a Firestore Timestamp
    if (dateValue?.toDate instanceof Function) {
      const date = dateValue.toDate();
      return isValid(date) ? date : null;
    }

    // If it's a string or number
    const parsed = new Date(dateValue);
    return isValid(parsed) ? parsed : null;
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = parseDateValue(event.date);
      return eventDate && format(eventDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });
  };

  const getDayStyle = (day) => {
    const isSelected = selectedDates.some(date => {
      const parsedDate = parseDateValue(date);
      return parsedDate && format(parsedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });

    const dayEvents = getEventsForDay(day);
    const baseStyle = `
      relative aspect-square p-1 sm:p-2 rounded-xl text-center
      transition-all duration-200 transform
      focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
    `;

    if (isSelected) {
      return `${baseStyle} bg-gradient-to-r from-pink-600 to-purple-600 text-white scale-95`;
    }

    if (dayEvents.length > 0) {
      // If there are multiple events, use a gradient background
      if (dayEvents.some(e => e.type === 'Fully Booked')) {
        return `${baseStyle} bg-[#D3D3D3] hover:bg-[#C3C3C3]`;
      }
      if (dayEvents.some(e => e.type === 'Low Demand')) {
        return `${baseStyle} bg-[#d9fdef] hover:opacity-90`;
      }
      return `${baseStyle} bg-gradient-to-br from-[#f0c3b9] to-[#f9f0bf] hover:opacity-90`;
    }

    return `${baseStyle} hover:bg-pink-50 active:scale-95`;
  };

  const getDayContent = (day) => {
    const dayEvents = getEventsForDay(day);
    
    return (
      <div className="w-full h-full relative">
        <div className="flex justify-between absolute top-0 left-0 right-1">
          <div className="flex gap-0 sm:gap-5 top-1/2 transform -translate-y-1/2">
            {dayEvents.some(e => e.type === 'Peak Demand' || e.type === 'High Demand') && (
              <span role="img" aria-label="fire" className="text-xs sm:text-md">🔥</span>
            )}
            {dayEvents.some(e => e.type === 'Auspicious Date') && (
              <span role="img" aria-label="sparkle" className="text-xs sm:text-md">✨</span>
            )}
          </div>
          {isManager && dayEvents.length > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onResetDate(day);
              }}
              className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
              title="Reset this date"
            >
              ×
            </div>
          )}
        </div>
        <span className="text-sm sm:text-lg font-semibold mt-2 sm:mt-3 block">{format(day, 'd')}</span>
        {dayEvents.map((event, idx) => (
          event.title && (
            <span key={idx} className="absolute bottom-0 sm:bottom-1 left-1 right-1 text-[8px] sm:text-[10px] truncate text-gray-600">
              {event.title}
            </span>
          )
        ))}
      </div>
    );
  };
  const handleDateClick = (day) => {
    if (isManager) {
      onDateSelect(day, eventType, eventTitle);
      setEventTitle(''); // Reset title after adding
    } else {
      onDateSelect(day);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button 
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {isManager && (
          <div className="mb-4 space-y-2">
            <select 
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option>Peak Demand</option>
              <option>High Demand</option>
              <option>Low Demand</option>
              <option>Auspicious Date</option>
              <option>Fully Booked</option>
            </select>
            <input
              type="text"
              placeholder="Event Title (optional)"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {monthDays.map((day, idx) => (
            <button
              key={idx}
              onClick={() => handleDateClick(day)}
              className={getDayStyle(day)}
            >
              {getDayContent(day)}
            </button>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f0c3b9] rounded-full"></div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">Peak/High Demand 🔥</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#d9fdef] rounded-full"></div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">Low Demand</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#FFD700] rounded-full"></div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">Auspicious Date ✨</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#D3D3D3] rounded-full"></div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">Fully Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;