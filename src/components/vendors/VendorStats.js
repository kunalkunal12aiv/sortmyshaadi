import React from 'react';
import { FiUsers, FiCheckCircle, FiDollarSign, FiClock, FiXCircle } from 'react-icons/fi';

function VendorStats({ vendors }) {
  const stats = {
    total: vendors.length,
    booked: vendors.filter(v => v.status === 'booked').length,
    pending: vendors.filter(v => v.status === 'pending').length,
    declined: vendors.filter(v => v.status === 'declined').length,
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon={FiUsers} 
        label="Total Vendors" 
        value={stats.total}
        color="text-blue-600"
      />
      <StatCard 
        icon={FiCheckCircle} 
        label="Booked" 
        value={stats.booked}
        color="text-green-600"
      />
      <StatCard 
        icon={FiClock} 
        label="Pending" 
        value={stats.pending}
        color="text-yellow-600"
      />
      <StatCard 
        icon={FiXCircle} 
        label="Declined" 
        value={stats.declined}
        color="text-red-600"
      />
    </div>
  );
}

export default VendorStats;
