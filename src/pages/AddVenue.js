import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addVenue, getHotelDetails } from '../utils/firebase';

function AddVenue() {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const initialState = {
    name: '',
    shortAddress: '',
    media: [''],  // Initialize with empty array containing one empty string
    pricePerPlate: '',
    guestSpace: '',
    about: '',
    menus: [{ name: '', items: '' }],
    latitude: '',
    longitude: '',
    decorImages: [''],  // Initialize with empty array containing one empty string
    menu: '',  // Add this field
    facilities: {
      catering: '', // 'inhouse', 'outside-allowed', 'outside-only'
      alcohol: '', // 'inhouse', 'outside-allowed', 'outside-only'
      decoration: '', // 'inhouse', 'outside-allowed', 'outside-only'
      dj: '', // 'inhouse', 'outside-allowed', 'outside-only'
    },
    foodTypes: {
      vegetarian: false,
      nonVegetarian: false,
      vegan: false
    },
    amenities: {
      acEventSpace: false,
      acDiningHall: false,
      dressingRoom: false,
      restaurantCatering: false,
      electricityBackup: false,
      barServices: false,
      lightingSound: false,
      poolsideSpace: false
    },
    seating: {
      minCapacity: '',
      maxCapacity: ''
    },
    roomPrice: '',
    extraBedPrice: '',
  };

  const [venueData, setVenueData] = useState(initialState);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelDetails = await getHotelDetails();
        if (hotelDetails && hotelDetails.length > 0) {
          const firstHotel = hotelDetails[0];
          setVenueData((prevData) => ({
            ...prevData,
            name: firstHotel.name || '',
            media: firstHotel.gallery || [''],
            decorImages: firstHotel.decorImages || ['']
          }));
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        // Initialize with default values if fetch fails
        setVenueData((prevData) => ({
          ...prevData,
          media: [''],
          decorImages: ['']
        }));
      }
    };

    fetchHotelDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVenue(venueData);
      setNotification({
        show: true,
        message: 'Venue added successfully!',
        type: 'success'
      });
      setVenueData(initialState);
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      setNotification({
        show: true,
        message: error.message,
        type: 'error'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    }
  };

  const menuSection = (
    <div className="bg-gray-50 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Menu Details</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Menu Items and Description</label>
        <textarea
          value={venueData.menu}
          onChange={(e) => setVenueData({...venueData, menu: e.target.value})}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
          placeholder="List your menu items and details here..."
        />
      </div>
    </div>
  );

  const notificationComponent = notification.show && (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {notification.message}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {notificationComponent}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-8 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Add New Venue</h1>
              <p className="mt-2 text-pink-100">Enter venue details to list on Sort my Shaadi</p>
            </div>
            <div className="flex gap-4">
              <Link 
                to={`/add-previous-weddings/${venueData.id}`}
                className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50"
              >
                Add Previous Weddings
              </Link>
              <Link 
                to="/calendar-manager" 
                className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200 font-semibold"
              >
                Calendar Manager
              </Link>
              <Link 
                to="/bulk-upload" 
                className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200 font-semibold"
              >
                Bulk Upload
              </Link>
              <Link 
                to="/manage-venues" 
                className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200 font-semibold"
              >
                View All Venues
              </Link>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Info Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Venue Name</label>
                <input
                  type="text"
                  value={venueData.name}
                  onChange={(e) => setVenueData({...venueData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Royal Palace"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Short Address</label>
                <input
                  type="text"
                  value={venueData.shortAddress}
                  onChange={(e) => setVenueData({...venueData, shortAddress: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Sector 15, Mumbai"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Media Gallery</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Media URLs (One per line)</label>
              <textarea
                value={venueData.media.join('\n')}
                onChange={(e) => setVenueData({...venueData, media: e.target.value.split('\n').filter(url => url.trim())})}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
              />
            </div>
          </div>

          {/* Decor Gallery Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Decor Gallery</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Decor Image URLs (One per line)</label>
              <textarea
                value={venueData.decorImages.join('\n')}
                onChange={(e) => setVenueData({...venueData, decorImages: e.target.value.split('\n').filter(url => url.trim())})}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="https://example.com/decor1.jpg
https://example.com/decor2.jpg"
              />
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Pricing & Capacity</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price Per Plate (₹)</label>
                <input
                  type="number"
                  value={venueData.pricePerPlate}
                  onChange={(e) => setVenueData({...venueData, pricePerPlate: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="2500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Guest Capacity</label>
                <input
                  type="text"
                  value={venueData.guestSpace}
                  onChange={(e) => setVenueData({...venueData, guestSpace: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="500-1000"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">About Venue</h2>
            <textarea
              value={venueData.about}
              onChange={(e) => setVenueData({...venueData, about: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
              placeholder="Describe your venue in detail..."
            />
          </div>

          {menuSection}

          {/* Facilities Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Catering Policy</label>
                <div className="space-y-2">
                  {['inhouse', 'outside-allowed', 'outside-only'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="catering"
                        value={option}
                        checked={venueData.facilities.catering === option}
                        onChange={(e) => setVenueData({
                          ...venueData,
                          facilities: { ...venueData.facilities, catering: e.target.value }
                        })}
                        className="text-pink-600"
                      />
                      <span>{option === 'inhouse' ? 'In-house Catering Only' : 
                            option === 'outside-allowed' ? 'Outside Catering Allowed' : 
                            'Outside Catering Only'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Similar radio groups for alcohol, decoration, and DJ */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Alcohol Policy</label>
                <div className="space-y-2">
                  {['inhouse', 'outside-allowed', 'outside-only'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="alcohol"
                        value={option}
                        checked={venueData.facilities.alcohol === option}
                        onChange={(e) => setVenueData({
                          ...venueData,
                          facilities: { ...venueData.facilities, alcohol: e.target.value }
                        })}
                        className="text-pink-600"
                      />
                      <span>{option === 'inhouse' ? 'In-house Alcohol Only' : 
                            option === 'outside-allowed' ? 'Outside Alcohol Allowed' : 
                            'Outside Alcohol Only'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Decoration Policy</label>
                <div className="space-y-2">
                  {['inhouse', 'outside-allowed', 'outside-only'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="decoration"
                        value={option}
                        checked={venueData.facilities.decoration === option}
                        onChange={(e) => setVenueData({
                          ...venueData,
                          facilities: { ...venueData.facilities, decoration: e.target.value }
                        })}
                        className="text-pink-600"
                      />
                      <span>{option === 'inhouse' ? 'In-house Decoration Only' : 
                            option === 'outside-allowed' ? 'Outside Decoration Allowed' : 
                            'Outside Decoration Only'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">DJ Policy</label>
                <div className="space-y-2">
                  {['inhouse', 'outside-allowed', 'outside-only'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="dj"
                        value={option}
                        checked={venueData.facilities.dj === option}
                        onChange={(e) => setVenueData({
                          ...venueData,
                          facilities: { ...venueData.facilities, dj: e.target.value }
                        })}
                        className="text-pink-600"
                      />
                      <span>{option === 'inhouse' ? 'In-house DJ Only' : 
                            option === 'outside-allowed' ? 'Outside DJ Allowed' : 
                            'Outside DJ Only'}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Food Types Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Food Types</h2>
            <div className="flex space-x-6">
              {Object.entries(venueData.foodTypes).map(([type, checked]) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setVenueData({
                      ...venueData,
                      foodTypes: { ...venueData.foodTypes, [type]: e.target.checked }
                    })}
                    className="text-pink-600"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(venueData.amenities).map(([amenity, checked]) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setVenueData({
                      ...venueData,
                      amenities: { ...venueData.amenities, [amenity]: e.target.checked }
                    })}
                    className="text-pink-600"
                  />
                  <span className="capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Seating Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Seating Capacity</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Minimum Capacity</label>
                <input
                  type="number"
                  value={venueData.seating.minCapacity}
                  onChange={(e) => setVenueData({...venueData, seating: {...venueData.seating, minCapacity: e.target.value}})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Minimum Capacity"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Maximum Capacity</label>
                <input
                  type="number"
                  value={venueData.seating.maxCapacity}
                  onChange={(e) => setVenueData({...venueData, seating: {...venueData.seating, maxCapacity: e.target.value}})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Maximum Capacity"
                />
              </div>
            </div>
          </div>

          {/* Room Pricing Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Room Pricing</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Room Price (₹)</label>
                <input
                  type="number"
                  value={venueData.roomPrice}
                  onChange={(e) => setVenueData({...venueData, roomPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Extra Bed Price (₹)</label>
                <input
                  type="number"
                  value={venueData.extraBedPrice}
                  onChange={(e) => setVenueData({...venueData, extraBedPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  value={venueData.latitude}
                  onChange={(e) => setVenueData({...venueData, latitude: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="18.5204"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  value={venueData.longitude}
                  onChange={(e) => setVenueData({...venueData, longitude: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="73.8567"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Add Venue
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVenue;

