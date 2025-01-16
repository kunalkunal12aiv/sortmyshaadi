import React from 'react';

function FeaturedVendors() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Top Wedding Vendors
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="/images/photographer.jpg" 
              alt="Photography" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Photography</h3>
              <p className="text-gray-600">Find the perfect photographer</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="/images/venue.jpg" 
              alt="Venues" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Venues</h3>
              <p className="text-gray-600">Discover dream locations</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src="/images/catering.jpg" 
              alt="Catering" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Catering</h3>
              <p className="text-gray-600">Explore delicious menus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVendors;
