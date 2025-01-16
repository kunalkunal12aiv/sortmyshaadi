import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenueById } from '../utils/firebase';
import Calendar from '../components/calendar/calendar';
import format from 'date-fns/format';
import { collection, onSnapshot, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar-override.css';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PhoneVerification from '../components/PhoneVerification';
import { setRedirectUrl } from '../utils/auth';

function VenueDetail() {
  const { id } = useParams();
  const { user, userDetails } = useAuth();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [hasEnquired, setHasEnquired] = useState(false);

  const checkPreviousEnquiry = useCallback(async () => {
    if (!user || !venue) return;

    const enquiriesRef = collection(db, 'enquiries');
    const q = query(
      enquiriesRef,
      where('userId', '==', user.uid),
      where('venueId', '==', id)
    );

    const querySnapshot = await getDocs(q);
    setHasEnquired(!querySnapshot.empty);
  }, [user, venue, id]);

  useEffect(() => {
    if (!user) {
      // Save current URL before redirecting
      setRedirectUrl(window.location.pathname);
      navigate('/signin');
      return;
    }

    if (user && (!userDetails?.phoneVerified)) {
      setRedirectUrl(window.location.pathname);
      setShowPhoneVerification(true);
    }

    checkPreviousEnquiry();
  }, [user, userDetails, navigate, checkPreviousEnquiry]); // Add missing dependencies

  useEffect(() => {
    const fetchVenue = async () => {
      const data = await getVenueById(id);
      setVenue(data);
      setLoading(false);
    };
    fetchVenue();
  }, [id]);

  useEffect(() => {
    const eventsRef = collection(db, 'events');
    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const updatedEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(doc.data().date)
      }));
      setEvents(updatedEvents);
    });

    return () => unsubscribe();
  }, []);

  const handleEnquiry = async () => {
    if (!user || !userDetails?.phoneVerified) return;

    try {
      await addDoc(collection(db, 'enquiries'), {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhone: userDetails.phoneNumber,
        venueId: id,
        venueName: venue.name,
        selectedDates: selectedDates,
        createdAt: new Date()
      });

      setHasEnquired(true);
      alert('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const toggleMenu = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const handleDateSelect = (date) => {
    // Check if date is already selected
    const isDateSelected = selectedDates.some(
      selectedDate => format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (isDateSelected) {
      // Remove date if already selected
      setSelectedDates(prev => prev.filter(
        d => format(d, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')
      ));
    } else {
      // Add new date
      setSelectedDates(prev => [...prev, date]);
    }
  };

  const BookingCalendar = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 max-w-3xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Your Dates</h2>
    
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gray-50 p-4 rounded-lg"
        >
          {selectedDates.map((date, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <p className="text-gray-600">{format(date, 'PPP')}</p>
              <button 
                onClick={() => handleDateSelect(date)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button className="mt-4 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-200">
            Confirm Booking ({selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'})
          </button>
        </motion.div>
      )}
    </div>
  );

  const renderAboutSection = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About this Venue</h2>
      <div className="relative">
        <p className={`text-gray-600 leading-relaxed ${!isReadMore ? 'line-clamp-4' : ''}`}>
          {venue.about}
        </p>
        {venue.about.length > 300 && (
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="mt-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            {isReadMore ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (showPhoneVerification) {
    return <PhoneVerification onComplete={() => setShowPhoneVerification(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Main Image and Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            {/* Main Image */}
            <div className="md:w-2/3 relative h-[50vh]">
              <img 
                src={venue.media[activeImage]} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-4xl font-bold text-white mb-4">{venue.name}</h1>
                <p className="text-xl text-white/90">{venue.shortAddress}</p>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="md:w-1/3 p-4 bg-gray-900/5">
              <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto">
                {venue.media.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`View ${index + 1}`}
                    className={`h-32 w-full object-cover rounded-lg cursor-pointer transition duration-300
                      ${activeImage === index ? 'ring-4 ring-pink-500 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Key Features */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Price Per Plate</p>
                  <p className="text-2xl font-bold text-pink-600">₹{venue.pricePerPlate}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Guest Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{venue.guestSpace}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">4.8/5</p>
                </div>
              </div>
        
              {/* Room Prices */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Double Room</p>
                  <p className="text-2xl font-bold text-pink-600">₹{venue.doubleRoomPrice}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">Extra Bed</p>
                  <p className="text-2xl font-bold text-pink-600">₹{venue.extraBedPrice}</p>
                </div>
              </div>
            </motion.div>

            {/* About Section */}
            {renderAboutSection()}

            {/* Menu Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu Packages</h2>
              <div className="space-y-6">
                {venue?.menus?.map((menu, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="p-4 bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleMenu(index)}
                    >
                      <h3 className="text-xl font-semibold text-pink-600">{menu.name}</h3>
                      <svg 
                        className={`w-6 h-6 transform transition-transform ${expandedMenu === index ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {expandedMenu === index && (
                      <div className="p-6">
                        <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
                          {menu.items}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            <BookingCalendar />
          </div>
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <button 
                className={`w-full ${
                  hasEnquired 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                } text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200`}
                onClick={handleEnquiry}
                disabled={hasEnquired}
              >
                {hasEnquired ? 'Already Enquired' : 'Enquire Now'}
              </button>
            </div>

            {/* Interactive FAQs */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-600 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {venue.faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-pink-300 transition-all duration-300"
                  >
                    <div
                      className="p-5 bg-gradient-to-r from-gray-50 to-white cursor-pointer flex justify-between items-center group hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-pink-600 transition-colors duration-300">{faq.question}</h3>
                      <svg 
                        className={`w-6 h-6 transform transition-all duration-300 text-gray-400 group-hover:text-pink-600 ${activeFaq === index ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {activeFaq === index && (
                      <div className="p-5 text-sm bg-white border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default VenueDetail;

