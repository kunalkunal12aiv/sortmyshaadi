import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getVenueById, updateVenue } from '../utils/firebase';

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const initialState = useMemo(() => ({
    name: '',
    shortAddress: '',
    media: [''],
    pricePerPlate: '',
    guestSpace: '',
    about: '',
    faqs: [{ question: '', answer: '' }],
    menus: [{ name: '', items: '' }],
    latitude: '',
    longitude: '',
    doubleRoomPrice: '',
    extraBedPrice: '',
    decorImages: [''],
    menu: '',
    facilities: {
      catering: '',
      alcohol: '',
      decoration: '',
      dj: ''
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
    roomsAvailable: '',
    availableAreas: [] // <-- New field added
  }), []);

  const [venueData, setVenueData] = useState(initialState);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(id); // Ensure getVenueById is imported and used to fetch data
        // Merge fetched data with initialState to include new fields
        setVenueData({
          ...initialState,
          ...data,
          facilities: {
            ...initialState.facilities,
            ...data.facilities
          },
          foodTypes: {
            ...initialState.foodTypes,
            ...data.foodTypes
          },
          amenities: {
            ...initialState.amenities,
            ...data.amenities
          },
          seating: {
            ...initialState.seating,
            ...data.seating
          },
          availableAreas: data.availableAreas || initialState.availableAreas
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id, initialState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVenue(id, venueData);
      setNotification({
        show: true,
        message: 'Venue updated successfully!',
        type: 'success'
      });
      setTimeout(() => navigate('/manage-venues'), 2000); // updated redirect path
    } catch (error) {
      setNotification({
        show: true,
        message: error.message,
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-extrabold text-white">Edit Venue</h1>
              <p className="mt-2 text-pink-100">Update venue details</p>
            </div>
            <Link 
              to="/venues" 
              className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200 font-semibold"
            >
              View All Venues
            </Link>
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Short Address</label>
                <input
                  type="text"
                  value={venueData.shortAddress}
                  onChange={(e) => setVenueData({...venueData, shortAddress: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Guest Capacity</label>
                <input
                  type="text"
                  value={venueData.guestSpace}
                  onChange={(e) => setVenueData({...venueData, guestSpace: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Room Pricing */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Room Pricing</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Single Room Price (₹)</label>
                <input
                  type="number"
                  value={venueData.singleRoomPrice}
                  onChange={(e) => setVenueData({...venueData, singleRoomPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Double Room Price (₹)</label>
                <input
                  type="number"
                  value={venueData.doubleRoomPrice}
                  onChange={(e) => setVenueData({...venueData, doubleRoomPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Extra Room Price (₹)</label>
                <input
                  type="number"
                  value={venueData.extraBedPrice}
                  onChange={(e) => setVenueData({...venueData, extraBedPrice: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Menu Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Menus</h2>
              <button
                type="button"
                onClick={() => setVenueData({
                  ...venueData,
                  menus: [...venueData.menus, { name: '', items: '' }]
                })}
                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition duration-200"
              >
                Add Menu
              </button>
            </div>
            {venueData.menus.map((menu, index) => (
              <div key={index} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="Menu Name"
                  value={menu.name}
                  onChange={(e) => {
                    const newMenus = [...venueData.menus]
                    newMenus[index].name = e.target.value
                    setVenueData({...venueData, menus: newMenus})
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Menu Items"
                  value={menu.items}
                  onChange={(e) => {
                    const newMenus = [...venueData.menus]
                    newMenus[index].items = e.target.value
                    setVenueData({...venueData, menus: newMenus})
                  }}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          {/* Menu Details Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Menu Items and Description</label>
            <textarea
              value={venueData.menu}
              onChange={(e) => setVenueData({ ...venueData, menu: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
              placeholder="List your menu items and details here..."
            />
          </div>

          {/* Facilities Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
            {['catering', 'alcohol', 'decoration', 'dj'].map((key) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Policy
                </label>
                <div className="space-y-2">
                  {['inhouse', 'outside-allowed', 'outside-only'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={venueData.facilities[key] === option}
                        onChange={(e) =>
                          setVenueData({
                            ...venueData,
                            facilities: { ...venueData.facilities, [key]: e.target.value }
                          })
                        }
                        className="text-pink-600"
                      />
                      <span>
                        {option === 'inhouse'
                          ? `In-house ${key.charAt(0).toUpperCase() + key.slice(1)} Only`
                          : option === 'outside-allowed'
                          ? `Outside ${key.charAt(0).toUpperCase() + key.slice(1)} Allowed`
                          : `Outside ${key.charAt(0).toUpperCase() + key.slice(1)} Only`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Food Types Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Food Types</h2>
            <div className="flex space-x-6">
              {Object.entries(venueData.foodTypes).map(([type, checked]) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setVenueData({
                        ...venueData,
                        foodTypes: { ...venueData.foodTypes, [type]: e.target.checked }
                      })
                    }
                    className="text-pink-600"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(venueData.amenities).map(([amenity, checked]) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setVenueData({
                        ...venueData,
                        amenities: { ...venueData.amenities, [amenity]: e.target.checked }
                      })
                    }
                    className="text-pink-600"
                  />
                  <span className="capitalize">{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Seating Capacity Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Seating Capacity</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Minimum Capacity</label>
                <input
                  type="number"
                  value={venueData.seating.minCapacity}
                  onChange={(e) =>
                    setVenueData({
                      ...venueData,
                      seating: { ...venueData.seating, minCapacity: e.target.value }
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Minimum Capacity"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Maximum Capacity</label>
                <input
                  type="number"
                  value={venueData.seating.maxCapacity}
                  onChange={(e) =>
                    setVenueData({
                      ...venueData,
                      seating: { ...venueData.seating, maxCapacity: e.target.value }
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Maximum Capacity"
                />
              </div>
            </div>
          </div>

          {/* Rooms Available Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Rooms Available</label>
            <input 
              type="text"
              value={venueData.roomsAvailable}
              onChange={(e) => setVenueData({ ...venueData, roomsAvailable: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
              placeholder="86 - 171"
            />
          </div>

          {/* FAQs Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
              <button
                type="button"
                onClick={() => setVenueData({
                  ...venueData,
                  faqs: [...venueData.faqs, { question: '', answer: '' }]
                })}
                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition duration-200"
              >
                Add FAQ
              </button>
            </div>
            {venueData.faqs.map((faq, index) => (
              <div key={index} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => {
                    const newFaqs = [...venueData.faqs];
                    newFaqs[index].question = e.target.value;
                    setVenueData({...venueData, faqs: newFaqs});
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => {
                    const newFaqs = [...venueData.faqs];
                    newFaqs[index].answer = e.target.value;
                    setVenueData({...venueData, faqs: newFaqs});
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            ))}
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  value={venueData.longitude}
                  onChange={(e) => setVenueData({...venueData, longitude: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Available Areas Section */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Available Areas</h2>
            {venueData.availableAreas.map((area, index) => (
              <div key={index} className="border p-4 rounded-xl space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text"
                    value={area.title}
                    onChange={(e) => {
                      const newAreas = [...venueData.availableAreas];
                      newAreas[index].title = e.target.value;
                      setVenueData({ ...venueData, availableAreas: newAreas });
                    }}
                    className="w-full px-4 py-3 rounded-lg border"
                    placeholder="Area Title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Seating</label>
                  <input 
                    type="text"
                    value={area.seating}
                    onChange={(e) => {
                      const newAreas = [...venueData.availableAreas];
                      newAreas[index].seating = e.target.value;
                      setVenueData({ ...venueData, availableAreas: newAreas });
                    }}
                    className="w-full px-4 py-3 rounded-lg border"
                    placeholder="Seating Capacity"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Floating</label>
                  <input 
                    type="text"
                    value={area.floating}
                    onChange={(e) => {
                      const newAreas = [...venueData.availableAreas];
                      newAreas[index].floating = e.target.value;
                      setVenueData({ ...venueData, availableAreas: newAreas });
                    }}
                    className="w-full px-4 py-3 rounded-lg border"
                    placeholder="Floating Amount"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio"
                        name={`area-type-${index}`}
                        value="indoor"
                        checked={area.type === 'indoor'}
                        onChange={(e) => {
                          const newAreas = [...venueData.availableAreas];
                          newAreas[index].type = e.target.value;
                          setVenueData({ ...venueData, availableAreas: newAreas });
                        }}
                        className="text-pink-600"
                      />
                      <span>Indoor</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="radio"
                        name={`area-type-${index}`}
                        value="outdoor"
                        checked={area.type === 'outdoor'}
                        onChange={(e) => {
                          const newAreas = [...venueData.availableAreas];
                          newAreas[index].type = e.target.value;
                          setVenueData({ ...venueData, availableAreas: newAreas });
                        }}
                        className="text-pink-600"
                      />
                      <span>Outdoor</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setVenueData({
                  ...venueData,
                  availableAreas: [...venueData.availableAreas, { title: '', seating: '', floating: '', type: '' }]
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Available Area
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVenue;
