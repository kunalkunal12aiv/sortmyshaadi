import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiUsers, FiCheckSquare, FiShoppingBag, FiHeart, FiCalendar, FiDollarSign } from 'react-icons/fi';
import DashboardStats from '../components/dashboard/DashboardStats';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import RecentActivity from '../components/dashboard/RecentActivity';
import BudgetOverview from '../components/dashboard/BudgetOverview';

function Dashboard() {
  const { currentUser } = useAuth();

  const menuItems = [
    {
      title: 'Guest List',
      icon: FiUsers,
      link: '/guest-list',
      description: 'Manage your wedding guests',
      color: 'bg-blue-500'
    },
    {
      title: 'Checklist',
      icon: FiCheckSquare,
      link: '/checklist',
      description: 'Track wedding tasks',
      color: 'bg-green-500'
    },
    {
      title: 'Vendors',
      icon: FiShoppingBag,
      link: '/vendors',
      description: 'Manage your vendors',
      color: 'bg-purple-500'
    },
    {
      title: 'Saved Items',
      icon: FiHeart,
      link: '/saved',
      description: 'View saved inspirations',
      color: 'bg-pink-500'
    },
    {
      title: 'Timeline',
      icon: FiCalendar,
      link: '/timeline',
      description: 'Wedding day schedule',
      color: 'bg-yellow-500'
    },
    {
      title: 'Budget',
      icon: FiDollarSign,
      link: '/budget',
      description: 'Track expenses',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser.displayName || 'there'}!
          </h1>
          <p className="text-gray-600">Manage your wedding planning all in one place.</p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DashboardStats />
            <UpcomingTasks />
          </div>
          <div className="space-y-8">
            <BudgetOverview />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
