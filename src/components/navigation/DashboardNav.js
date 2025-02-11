import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiHome, FiUsers, FiCheckSquare, FiShoppingBag, 
  FiHeart, FiCalendar, FiDollarSign, FiSettings, 
  FiMenu, FiX, FiLogOut 
} from 'react-icons/fi';

function DashboardNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Guest List', icon: FiUsers, path: '/guest-list' },
    { name: 'Checklist', icon: FiCheckSquare, path: '/checklist' },
    { name: 'Vendors', icon: FiShoppingBag, path: '/vendors' },
    { name: 'Saved Items', icon: FiHeart, path: '/saved' },
    { name: 'Timeline', icon: FiCalendar, path: '/timeline' },
    { name: 'Budget', icon: FiDollarSign, path: '/budget' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium
                    ${isActive(item.path)
                      ? 'border-b-2 border-pink-500 text-gray-900'
                      : 'text-gray-500 hover:border-b-2 hover:border-gray-300'
                    }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <button
                onClick={logout}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 text-base font-medium
                  ${isActive(item.path)
                    ? 'bg-pink-50 border-l-4 border-pink-500 text-pink-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
            >
              <FiLogOut className="mr-4 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default DashboardNav;
