import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVenueById } from '../utils/firebase';
import Calendar from '../components/calendar/calendar';
import format from 'date-fns/format';
import { collection, onSnapshot, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar-override.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useShortlist } from '../contexts/ShortlistContext';
import PhoneVerification from '../components/PhoneVerification';
import { setRedirectUrl } from '../utils/auth';
import 'swiper/css/effect-coverflow';

function VenueDetail() {
  const { id } = useParams();
  const { currentUser, userDetails } = useAuth(); // Change from user to currentUser to match AuthContext
  const { shortlistedVenues, addToShortlist, removeFromShortlist } = useShortlist();
  const isShortlisted = shortlistedVenues.some(v => v.id === id);
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
  const [showGallery, setShowGallery] = useState(false);
  const [previousWeddings, setPreviousWeddings] = useState([]);
  const [showPreviousWeddings, setShowPreviousWeddings] = useState(false);
  const [selectedWedding, setSelectedWedding] = useState(null);

  const checkPreviousEnquiry = useCallback(async () => {
    if (!currentUser || !venue) return;

    const enquiriesRef = collection(db, 'users', currentUser.uid, 'enquiries');
    const q = query(
      enquiriesRef,
      where('venueId', '==', id)
    );

    try {
      const querySnapshot = await getDocs(q);
      setHasEnquired(!querySnapshot.empty);
    } catch (error) {
      console.error('Error checking enquiries:', error);
    }
  }, [currentUser, venue, id]);

  useEffect(() => {
    const checkAuth = async () => {
      if (currentUser && userDetails && !userDetails.phoneVerified) {
        setRedirectUrl(window.location.pathname);
        setShowPhoneVerification(true);
      }
    };

    checkAuth();
  }, [currentUser, userDetails]);

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

  useEffect(() => {
    const fetchPreviousWeddings = async () => {
      const venueDoc = await getDoc(doc(db, 'venues', id));
      if (venueDoc.exists()) {
        setPreviousWeddings(venueDoc.data().previousWeddings || []);
      }
    };
    fetchPreviousWeddings();
  }, [id]);

  const handleEnquiry = async () => {
    if (!currentUser) {
      setRedirectUrl(window.location.pathname);
      navigate('/signin');
      return;
    }

    if (!userDetails?.phoneVerified) {
      setShowPhoneVerification(true);
      return;
    }

    try {
      await addDoc(collection(db, 'enquiries'), {
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userEmail: currentUser.email,
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

  const handleShortlist = () => {
    if (!currentUser) {
      setRedirectUrl(window.location.pathname);
      navigate('/signin');
      return;
    }

    if (isShortlisted) {
      removeFromShortlist(id);
    } else {
      addToShortlist(venue);
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

  const GalleryModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95"
    >
      <div className="relative h-full">
        <button 
          className="absolute top-4 right-4 text-white p-2 z-50 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => setShowGallery(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full overflow-y-auto py-16" onClick={(e) => e.stopPropagation()}>
          <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {venue.media.map((url, index) => (
                <motion.img
                  key={index}
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const VideoGallery = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Previous Celebrations</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {previousWeddings.map((wedding, index) => (
            <div 
              key={index}
              className="flex-none relative cursor-pointer group w-[225px] h-[400px]"
              onClick={() => navigate(`/wedding-events/${id}`)}
            >
              <video
                className="w-full h-full object-cover rounded-lg"
                src={wedding.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold">{wedding.title}</h3>
                  <p className="text-sm text-white/80">{wedding.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
  
  
  

  const PreviousWeddingsModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
    >
      <div className="min-h-screen">
        <button 
          className="fixed top-4 right-4 text-white p-2 z-50 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => setShowPreviousWeddings(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="max-w-7xl mx-auto p-4 py-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Wedding Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousWeddings.map((wedding, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <div className="aspect-video relative">
                  <video
                    className="w-full h-full object-cover"
                    src={wedding.videoUrl}
                    controls
                    muted
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white/80 text-sm">{wedding.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{wedding.title}</h3>
                  <p className="text-white/80 mb-6">{wedding.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {wedding.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Wedding ${imgIndex + 1}`}
                        className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const styles = `
    .wedding-slider {
      padding: 20px 0;
    }
    
    .wedding-slider .swiper-slide {
      width: 300px;
      height: 534px; /* 9:16 ratio */
    }
    
    @media (max-width: 640px) {
      .wedding-slider .swiper-slide {
        width: 200px;
        height: 356px;
      }
    }
  `;

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 relative">
      <style>{styles}</style>
      <div className="max-w-7xl mx-auto">
        {/* Video Slider - Moved to top */}
        {previousWeddings.length > 0 && <VideoGallery />}
        {/* Hero Section with Main Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="relative h-[60vh]">
            <img 
              src={venue.media[activeImage]} 
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">{venue.name}</h1>
                  <p className="text-xl text-white/90">{venue.shortAddress}</p>
                </div>
                <button
                  onClick={() => setShowGallery(true)}
                  className="px-6 py-3 bg-white/90 text-gray-900 rounded-lg hover:bg-white transition-colors duration-200"
                >
                  View All Photos
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Modal */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center"
              onClick={() => setShowGallery(false)}
            >
              <div className="relative w-full">
                <button 
                  className="absolute top-4 right-4 text-white p-2 z-50"
                  onClick={() => setShowGallery(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="max-w-7xl mx-auto p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venue.media.map((url, index) => (
                      <motion.img
                        key={index}
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-80 object-cover rounded-lg cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rest of the content */}
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

            
            <BookingCalendar />
          </div>
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            
              {/* Menu Section */}
        <button
          className={`w-full mt-4 ${
            isShortlisted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
          } text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200`}
          onClick={handleShortlist}
        >
          {!currentUser 
            ? 'Sign in to Shortlist'
            : isShortlisted 
              ? 'Added to Shortlist' 
              : 'Add to Shortlist'
          }
        </button>
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

      {/* Quick Actions */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full px-4 max-w-sm mx-auto space-y-4">
        <button 
          className={`w-full ${
            hasEnquired 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
          } text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200`}
          onClick={handleEnquiry}
          disabled={hasEnquired}
        >
          {!currentUser 
            ? 'Sign in to Enquire'
            : hasEnquired 
              ? 'Already Enquired' 
              : 'Enquire Now'
          }
        </button>
        
        
      </div>


      {/* Modals */}
      <AnimatePresence>
        {showGallery && <GalleryModal />}
        {showPreviousWeddings && <PreviousWeddingsModal />}
      </AnimatePresence>
    </div>
  );
}

export default VenueDetail;

