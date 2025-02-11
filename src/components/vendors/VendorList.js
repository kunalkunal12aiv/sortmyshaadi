import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';

function VendorList({ vendors, onDelete, onEdit }) {
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredVendors = filterCategory === 'all' 
    ? vendors 
    : vendors.filter(v => v.category === filterCategory);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="all">All Categories</option>
          {/* Add your vendor categories here */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                <p className="text-sm text-gray-500">{vendor.category}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(vendor)} className="text-blue-600 hover:text-blue-800">
                  <FiEdit2 />
                </button>
                <button onClick={() => onDelete(vendor.id)} className="text-red-600 hover:text-red-800">
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-pink-600 font-semibold">₹{vendor.price?.toLocaleString()}</p>
              {vendor.website && (
                <a 
                  href={vendor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FiExternalLink /> Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorList;
