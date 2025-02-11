import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import WebsiteTemplate from '../../components/website-builder/WebsiteTemplate';
import ImageUpload from '../../components/website-builder/ImageUpload';
import BrandedHeader from '../../components/website-builder/BrandedHeader';
import BrandedFooter from '../../components/website-builder/BrandedFooter';

function WebsiteBuilder({ slug, content }) {
  // Default sections configuration
  const defaultSections = {
    hero: true,
    story: true,
    events: true,
    gallery: true,
    timeline: true,
    giftRegistry: true,
    rsvp: true
  };

  const { currentUser } = useAuth();
  const [websiteData, setWebsiteData] = useState({
    slug: '',
    coupleNames: '',
    weddingDate: '',
    heroImage: '',
    storyImage: '',
    storyText: '',
    rsvpInstructions: '',
    events: [
      { name: '', date: '', time: '', venue: '', id: '1' }
    ],
    theme: {
      primaryColor: '#FF4081',
      secondaryColor: '#9C27B0',
      fontFamily: 'Inter'
    },
    createdAt: null,
    updatedAt: null,
    sections: defaultSections,
    gallery: { images: [] },
    timeline: { events: [] },
    giftRegistry: { items: [] }
  });
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Event editing state and handlers
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEventData, setEditingEventData] = useState({});
  // New state for accordion
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setActiveAccordion(prev => prev === section ? null : section);
  };

  useEffect(() => {
    loadWebsiteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadWebsiteData = async () => {
    try {
      setLoading(true);
      const websitesRef = collection(db, 'websites');
      const q = query(websitesRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const websiteDoc = snapshot.docs[0];
        setWebsiteData(websiteDoc.data());
        setIsPublished(true);
      }
    } catch (error) {
      console.error('Error loading website data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!websiteData.slug) {
      alert('Please enter a website URL first');
      return;
    }
    try {
      const slugDoc = await getDoc(doc(db, 'website-slugs', websiteData.slug));
      if (slugDoc.exists() && slugDoc.data().userId !== currentUser.uid) {
        alert('This URL is already taken. Please choose another one.');
        return;
      }
      await setDoc(doc(db, 'websites', websiteData.slug), {
        ...websiteData,
        userId: currentUser.uid,
        updatedAt: new Date(),
        createdAt: websiteData.createdAt || new Date()
      });
      await setDoc(doc(db, 'website-slugs', websiteData.slug), {
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setIsPublished(true);
      alert('Website saved successfully!');
    } catch (error) {
      console.error('Error saving website:', error);
      alert('Error saving website. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // New helper functions for gallery inputs
  const updateGalleryImage = (index, newUrl) => {
    const images = websiteData.gallery?.images ?? [];
    images[index] = newUrl;
    handleInputChange('gallery', { images });
  };

  const addGalleryInput = () => {
    const images = websiteData.gallery?.images ?? [];
    handleInputChange('gallery', { images: [...images, ''] });
  };

  const toggleSection = (sectionName) => {
    setWebsiteData(prev => ({
      ...prev,
      sections: {
        ...(prev.sections || defaultSections),
        [sectionName]: !(prev.sections?.[sectionName] ?? defaultSections[sectionName])
      }
    }));
  };

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setEditingEventData({ ...event });
  };

  const handleEventInputChange = (e) => {
    setEditingEventData({
      ...editingEventData,
      [e.target.name]: e.target.value
    });
  };

  const updateEvent = async () => {
    try {
      // Replace with your actual update logic if needed
      await updateDoc(doc(db, 'websites', websiteData.slug), { /* update logic here */ });
      setWebsiteData(prev => ({
        ...prev,
        events: prev.events.map(ev => ev.id === editingEventId ? editingEventData : ev)
      }));
      setEditingEventId(null);
      setEditingEventData({});
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const cancelEdit = () => {
    setEditingEventId(null);
    setEditingEventData({});
  };

  // New helper functions for timeline events
  const updateTimelineEvent = (index, field, value) => {
    const events = websiteData.timeline?.events ?? [];
    events[index] = { ...events[index], [field]: value };
    handleInputChange('timeline', { events });
  };

  const addTimelineEvent = () => {
    const events = websiteData.timeline?.events ?? [];
    handleInputChange('timeline', { events: [...events, { date: '', title: '', description: '' }] });
  };

  // New helper functions for gift registry items
  const updateGiftRegistryItem = (index, field, value) => {
    const items = websiteData.giftRegistry?.items ?? [];
    items[index] = { ...items[index], [field]: value };
    handleInputChange('giftRegistry', { items });
  };

  const addGiftRegistryItem = () => {
    const items = websiteData.giftRegistry?.items ?? [];
    handleInputChange('giftRegistry', { items: [...items, { name: '', description: '', image: '', link: '' }] });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Website Builder...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Website URL remains outside accordion */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Website URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  sortmyshaadi.com/sites/
                </span>
                <input
                  type="text"
                  value={websiteData.slug || ''}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border focus:ring-pink-500 focus:border-pink-500"
                  placeholder="mydreamwedding"
                />
              </div>
            </div>
          </div>

          {/* Accordion Form for sections */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {/* Hero Section Accordion */}
            <div className="border-b pb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('hero')}
                className="w-full text-left font-bold text-xl text-gray-800"
              >
                Hero Section
              </button>
              {activeAccordion === 'hero' && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={websiteData.coupleNames || ''}
                    onChange={(e) => handleInputChange('coupleNames', e.target.value)}
                    placeholder="Couple Names"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <input
                    type="date"
                    value={websiteData.weddingDate || ''}
                    onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                    <ImageUpload
                      onUploadComplete={(url) => handleInputChange('heroImage', url)}
                      currentImageUrl={websiteData.heroImage}
                      section="hero"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Our Story Section Accordion */}
            <div className="border-b pb-4 mt-6">
              <button
                type="button"
                onClick={() => toggleAccordion('story')}
                className="w-full text-left font-bold text-xl text-gray-800"
              >
                Our Story Section
              </button>
              {activeAccordion === 'story' && (
                <div className="mt-4 space-y-4">
                  <textarea
                    value={websiteData.storyText || ''}
                    onChange={(e) => handleInputChange('storyText', e.target.value)}
                    rows={4}
                    placeholder="Tell your story here..."
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Image</label>
                    <ImageUpload
                      onUploadComplete={(url) => handleInputChange('storyImage', url)}
                      currentImageUrl={websiteData.storyImage}
                      section="story"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Section Accordion */}
            <div className="border-b pb-4 mt-6">
              <button
                type="button"
                onClick={() => toggleAccordion('gallery')}
                className="w-full text-left font-bold text-xl text-gray-800">
                Gallery Section
              </button>
              {activeAccordion === 'gallery' && (
                <div className="mt-4 space-y-4">
                  {(websiteData.gallery?.images ?? []).map((img, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => updateGalleryImage(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGalleryInput}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Input
                  </button>
                </div>
              )}
            </div>

            {/* Timeline Section Accordion */}
            <div className="border-b pb-4 mt-6">
              <button 
                type="button" 
                onClick={() => toggleAccordion('timeline')} 
                className="w-full text-left font-bold text-xl text-gray-800">
                Timeline Section
              </button>
              {activeAccordion === 'timeline' && (
                <div className="mt-4 space-y-4">
                  {(websiteData.timeline?.events ?? []).map((event, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <div className="mb-2">
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) => updateTimelineEvent(index, 'date', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                          placeholder="Date"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => updateTimelineEvent(index, 'title', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                          placeholder="Event Title"
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          value={event.description}
                          onChange={(e) => updateTimelineEvent(index, 'description', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                          placeholder="Event Description"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTimelineEvent}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Event
                  </button>
                </div>
              )}
            </div>

            {/* Gift Registry Section Accordion */}
            <div className="border-b pb-4 mt-6">
              <button 
                type="button" 
                onClick={() => toggleAccordion('giftRegistry')} 
                className="w-full text-left font-bold text-xl text-gray-800">
                Gift Registry Section
              </button>
              {activeAccordion === 'giftRegistry' && (
                <div className="mt-4 space-y-4">
                  {(websiteData.giftRegistry?.items ?? []).map((item, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateGiftRegistryItem(index, 'name', e.target.value)}
                        placeholder="Item Name"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => updateGiftRegistryItem(index, 'description', e.target.value)}
                        placeholder="Item Description"
                        rows="2"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => updateGiftRegistryItem(index, 'image', e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => updateGiftRegistryItem(index, 'link', e.target.value)}
                        placeholder="Item Link"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGiftRegistryItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Item
                  </button>
                </div>
              )}
            </div>

            {/* RSVP Section Accordion */}
            <div className="border-b pb-4 mt-6">
              <button type="button" onClick={() => toggleAccordion('rsvp')} className="w-full text-left font-bold text-xl text-gray-800">
                RSVP Section
              </button>
              {activeAccordion === 'rsvp' && (
                <div className="mt-4 space-y-4">
                  <textarea
                    value={websiteData.rsvpInstructions}
                    onChange={(e) => handleInputChange('rsvpInstructions', e.target.value)}
                    placeholder="Enter RSVP instructions"
                    rows="3"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              )}
            </div>

            {/* ...Additional accordion items for other sections if needed... */}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                {isPublished ? 'Update Website' : 'Publish Website'}
              </button>
            </div>
          </form>

          {/* Wedding Events Section remains unchanged */}
          {websiteData.events && websiteData.events.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Edit Wedding Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {websiteData.events.map((event, index) => (
                  <div key={event.id || index} className="bg-white p-6 rounded-lg shadow-lg">
                    {editingEventId === event.id ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={editingEventData.name}
                          onChange={handleEventInputChange}
                          className="mb-2 p-2 border rounded"
                          placeholder="Event Name"
                        />
                        <input
                          type="text"
                          name="date"
                          value={editingEventData.date}
                          onChange={handleEventInputChange}
                          className="mb-2 p-2 border rounded"
                          placeholder="Date"
                        />
                        <input
                          type="text"
                          name="time"
                          value={editingEventData.time}
                          onChange={handleEventInputChange}
                          className="mb-2 p-2 border rounded"
                          placeholder="Time"
                        />
                        <input
                          type="text"
                          name="venue"
                          value={editingEventData.venue}
                          onChange={handleEventInputChange}
                          className="mb-2 p-2 border rounded"
                          placeholder="Venue"
                        />
                        <div className="flex space-x-2">
                          <button onClick={updateEvent} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                          <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{event.name || 'Event Name'}</h3>
                        <p className="text-gray-600 mb-2">{event.date || 'Date'}</p>
                        <p className="text-gray-600 mb-4">{event.time || 'Time'}</p>
                        <p className="text-gray-700">{event.venue || 'Venue'}</p>
                        <button onClick={() => handleEditClick(event)} className="mt-2 text-sm text-blue-600">Edit</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Preview Section remains unchanged */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <WebsiteTemplate 
                content={websiteData}
                key={JSON.stringify(websiteData)}
              />
            </div>
          </div>
        </div>
      </main>
      <BrandedFooter />
    </div>
  );
}

export default WebsiteBuilder;
