import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Updated import
import { getVenueById } from '../utils/firebase';
import format from 'date-fns/format';
import { collection, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar-override.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useShortlist } from '../contexts/ShortlistContext';
import PhoneVerification from '../components/PhoneVerification';
import { setRedirectUrl } from '../utils/auth';
import 'swiper/css/effect-coverflow';
import BookingCalendar from '../components/vanue-detail/BookingCalendar';
import AboutSection from '../components/vanue-detail/AboutSection';
import GalleryModal from '../components/vanue-detail/GalleryModal';
import VideoGallery from '../components/vanue-detail/VideoGallery';
import TrustSection from '../components/vanue-detail/TrustSection';
import FeaturesAndAmenitiesAccordion from '../components/vanue-detail/FeaturesAndAmenitiesAccordion';
import FacilitiesAndFoodFaq from '../components/vanue-detail/FacilitiesAndFoodFaq';

// New helper to slugify a string
const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-'); 

function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userDetails } = useAuth();
  const { shortlistedVenues, addToShortlist, removeFromShortlist } = useShortlist();
  const isShortlisted = shortlistedVenues.some(v => v.id === id);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [hasEnquired, setHasEnquired] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [previousWeddings, setPreviousWeddings] = useState([]);
  const [activeImage, setActiveImage] = useState(0); // Initialize with 0 instead of null

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
      if (!data) {
        setLoading(false);
        console.error("Venue not found:", id);
        // Optionally set an error state or navigate to a NotFound page
        return;
      }
      setVenue(data);
      // After venue loads, ensure URL slug is based on venue name
      if (data) {
        const newSlug = slugify(data.name);
        if (!location.pathname.includes(newSlug)) {
          navigate(`/venue/${newSlug}`, { replace: true });
        }
      }
      setLoading(false);
    };
    fetchVenue();
  }, [id, navigate, location.pathname]);

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

  // Add effect to update activeImage when venue changes
  useEffect(() => {
    if (venue?.media?.length > 0) {
      setActiveImage(0); // Set to first image when venue loads
    }
  }, [venue]);

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

  // Define motion variants for the hero section
  const heroVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.02 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F6F6] to-[#EDD498]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#9A2143] border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (showPhoneVerification) {
    return <PhoneVerification onComplete={() => setShowPhoneVerification(false)} />;
  }

  // Add a guard for null venue
  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F6F6F6] to-[#EDD498]">
        <p className="text-xl font-semibold text-[#9A2143]">Venue not found</p>
      </div>
    );
  }

  return (
    <>
      {venue && (
        <Helmet>
          <title>{venue.name} - Venue Details</title>
          <meta name="description" content={venue.about} />
          <link rel="canonical" href={`${window.location.origin}/venue/${slugify(venue.name)}`} />
        </Helmet>
      )}
      <div className="min-h-screen bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] py-12 px-4 relative">
        <style>{styles}</style>
        <div className="max-w-7xl mx-auto">
          {/* Video Slider - Moved to top */}
          {previousWeddings.length > 0 && <VideoGallery previousWeddings={previousWeddings} venueId={id} />}
          {/* Hero Section with Main Image */}
          <motion.div 
            variants={heroVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[var(--primary-light)] rounded-2xl shadow-2xl overflow-hidden mb-8"
          >
            <div className="relative h-[60vh]">
              <motion.img 
                src={venue?.media?.[activeImage] || '/fallback-image.jpg'}  // Updated to include optional chaining and fallback
                alt={venue?.name || 'Venue Image'}
                className="w-full h-full object-cover"
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/70 via-transparent to-transparent flex items-end">
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>
                    {venue.name}
                  </h1>
                  <p className="text-xl text-white/90">{venue.shortAddress}</p>
                </div>
                {/* Digital overlay effect */}
                <motion.div 
                  className="absolute top-4 right-4 text-sm text-white font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                </motion.div>
              </div>
              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-8 right-8 px-6 py-3 bg-white/90 text-[var(--primary-dark)] rounded-lg hover:bg-white transition-colors duration-200 shadow-lg"
              >
                View All Photos
              </button>
            </div>
          </motion.div>

          {/* Gallery Modal */}
          <AnimatePresence>
            {showGallery && (
              <GalleryModal media={venue.media} onClose={() => setShowGallery(false)} />
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
                className="bg-[#F6F6F6] rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                {/* Updated grid layout for key features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Price Per Plate</p>
                    <p className="text-2xl font-bold text-[#9A2143]">₹{venue.pricePerPlate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Guest Capacity</p>
                    <p className="text-2xl font-bold text-[#1E2742]">{venue.guestSpace}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Rating</p>
                    <p className="text-2xl font-bold text-[#BFA054]">4.8/5</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Available Rooms</p>
                    <p className="text-2xl font-bold text-[#9A2143]">{venue.roomsAvailable || 'N/A'}</p>
                  </div>
                </div>

                
          
                {/* Room Prices */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Double Room</p>
                    <p className="text-2xl font-bold text-[#9A2143]">₹{venue.doubleRoomPrice}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl text-center">
                    <p className="text-sm font-medium text-[#1E2742] mb-1">Extra Bed</p>
                    <p className="text-2xl font-bold text-[#9A2143]">₹{venue.extraBedPrice}</p>
                  </div>
                </div>
              </motion.div>



              {/* New Features & Amenities Accordion */}
              <FeaturesAndAmenitiesAccordion 
                facilities={venue.facilities} 
                amenities={venue.amenities} 
              />


            

              {/* About Section */}
              <AboutSection about={venue.about} />

              

              {/* Booking Calendar */}
              <BookingCalendar 
                selectedDates={selectedDates} 
                handleDateSelect={handleDateSelect} 
                events={events} 
              />

              
              
            </div>
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <button
                className={`w-full mt-4 ${
                  isShortlisted
                    ? 'bg-[#9EA1AB] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#9A2143] to-[#BFA054] hover:from-[#BFA054] hover:to-[#EDD498]'
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
              {/* Menu Section */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#F6F6F6] rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>Menu Packages</h2>
                <div className="space-y-6">
                  {venue?.menus?.map((menu, index) => (
                    <div 
                      key={index} 
                      className="bg-[#EDD498] rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 bg-[#F6F6F6] cursor-pointer flex justify-between items-center"
                        onClick={() => toggleMenu(index)}
                      >
                        <h3 className="text-xl font-semibold text-[#9A2143]">{menu.name}</h3>
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
                          <div className="prose max-w-none text-[#1E2742] whitespace-pre-wrap">
                            {menu.items}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
          {/* Trust Section */}
          <div className="mt-8">
            <TrustSection />
        
          </div>
          {/* Interactive FAQs */}
          <div className="bg-[var(--accent-3)] rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-[var(--primary-dark)] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {(venue.faqs || []).map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left"
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-serif text-[var(--primary-dark)] pr-8">
                          {faq.question}
                        </h3>
                        <motion.span
                          animate={{ rotate: activeFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[var(--primary-main)]"
                        >
                          ▼
                        </motion.span>
                      </div>
                      
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Facilities & Food Options FAQs */}
          <FacilitiesAndFoodFaq 
            facilities={venue.facilities} 
            foodTypes={venue.foodTypes} 
          />
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full px-4 max-w-sm mx-auto space-y-4">
          <button 
            className={`w-full ${
              hasEnquired 
                ? 'bg-[#9EA1AB] cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#9A2143] to-[#BFA054] hover:from-[#BFA054] hover:to-[#EDD498]'
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
      </div>
    </>
  );
}

export default VenueDetail;
