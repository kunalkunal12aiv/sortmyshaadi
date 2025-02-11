import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import BrandedHeader from './BrandedHeader';
import BrandedFooter from './BrandedFooter';

function WebsiteTemplate({ content }) {
  const { slug } = useParams();
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add debug logs
  console.log('Received content:', content);
  console.log('Current slug:', slug);

  // RSVP STATE
  const [rsvpName, setRsvpName] = useState('');
  const [matchedGuest, setMatchedGuest] = useState(null);
  const [showConfirmActions, setShowConfirmActions] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (content) {
          console.log('Setting content from props:', content);
          setWebsiteData(content);
        } else if (slug) {
          console.log('Fetching data for slug:', slug);
          const websiteDoc = await getDoc(doc(db, 'websites', slug));
          if (websiteDoc.exists()) {
            const data = websiteDoc.data();
            console.log('Fetched data:', data);
            setWebsiteData(data);
          }
        }
      } catch (error) {
        console.error('Error loading website:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [content, slug]);

  // Debug current state
  console.log('Current websiteData:', websiteData);
  console.log('Loading state:', loading);

  // RSVP Handlers
  const handleRSVPInput = (e) => {
    setRsvpName(e.target.value);
    // Lookup in guestList (assuming websiteData.guestList exists)
    if (websiteData && websiteData.guestList) {
      const guest = websiteData.guestList.find(g =>
        g.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setMatchedGuest(guest || null);
    }
  };

  const updateGuestStatus = async (status) => {
    if (!matchedGuest) return;
    try {
      // Update the guest status in Firestore (simulate via local state for demo)
      setWebsiteData(prev => ({
        ...prev,
        guestList: prev.guestList.map(g =>
          g.id === matchedGuest.id ? { ...g, status } : g
        )
      }));
      setShowConfirmActions(false);
      setRsvpName('');
      setMatchedGuest(null);
    } catch (error) {
      console.error("Error updating guest status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wedding website...</p>
        </div>
      </div>
    );
  }

  // Use default config so all sections show if not specified
  const sectionsConfig = websiteData?.sections || {
    hero: true,
    story: true,
    events: true,
    gallery: true,
    timeline: true,
    giftRegistry: true,
    rsvp: true,
  };

  return (
    <div className="min-h-screen">
      <BrandedHeader />
      
      {/* Hero Section */}
      {sectionsConfig.hero && websiteData && (
        <section 
          className="h-screen bg-cover bg-center relative" 
          style={{ 
            backgroundImage: `url(${websiteData.heroImage || 'https://source.unsplash.com/1600x900/?wedding'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">{websiteData.coupleNames || "Couple Names"}</h1>
              <p className="text-2xl">{websiteData.weddingDate || "Wedding Date"}</p>
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      {sectionsConfig.story && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img 
                src={websiteData.storyImage || 'https://source.unsplash.com/800x600/?couple'} 
                alt="Our Story" 
                className="rounded-lg shadow-lg"
              />
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {websiteData.storyText || "Share your love story here..."}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Section without inline editing */}
      {sectionsConfig.events && websiteData.events && websiteData.events.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Wedding Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {websiteData.events.map((event, index) => (
                <div key={event.id || index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">{event.name || 'Event Name'}</h3>
                  <p className="text-gray-600 mb-2">{event.date || 'Date'}</p>
                  <p className="text-gray-600 mb-4">{event.time || 'Time'}</p>
                  <p className="text-gray-700">{event.venue || 'Venue'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {sectionsConfig.gallery && websiteData.gallery?.images?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {websiteData.gallery.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {sectionsConfig.timeline && websiteData.timeline && websiteData.timeline.events && websiteData.timeline.events.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              {websiteData.timeline.events.map((event, index) => (
                <div key={index} className="flex mb-8">
                  <div className="w-32 text-right pr-8 text-gray-500">{event.date}</div>
                  <div className="flex-1 border-l-2 border-pink-200 pl-8 pb-8">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Registry Section */}
      {sectionsConfig.giftRegistry && websiteData.giftRegistry && websiteData.giftRegistry.items && websiteData.giftRegistry.items.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Gift Registry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {websiteData.giftRegistry.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                  <img src={item.image} alt={item.name} className="w-32 h-32 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" 
                     className="text-pink-600 hover:text-pink-700">
                    View Item
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section with Guest Lookup and Status Update */}
      {sectionsConfig.rsvp && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">RSVP</h2>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={rsvpName}
                onChange={handleRSVPInput}
                placeholder="Enter your name"
                className="w-full px-4 py-2 mb-4 border rounded-lg"
              />
              {matchedGuest ? (
                <div className="mb-4">
                  <p className="text-lg">Found: {matchedGuest.name}</p>
                  {!showConfirmActions ? (
                    <button onClick={() => setShowConfirmActions(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">This is me</button>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <p className="text-lg">Will you be attending?</p>
                      <div className="flex justify-center space-x-4">
                        <button onClick={() => updateGuestStatus('confirmed')} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                          I'll Be There
                        </button>
                        <button onClick={() => updateGuestStatus('declined')} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                          Can't Make It
                        </button>
                      </div>
                      <button onClick={() => { setShowConfirmActions(false); setMatchedGuest(null); setRsvpName(''); }} className="text-gray-600 underline">Not my name</button>
                    </div>
                  )}
                </div>
              ) : (
                rsvpName && <p className="text-gray-500">No matching guest found</p>
              )}
            </div>
          </div>
        </section>
      )}

      <BrandedFooter />
    </div>
  );
}

export default WebsiteTemplate;
