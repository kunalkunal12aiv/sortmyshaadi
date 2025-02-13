import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiCheckSquare,
  FiTruck,
  FiBookmark,
  FiClock,
  FiSettings,
  FiDollarSign,
  FiUser,
  FiMenu,
  FiX,
  FiLayout
} from 'react-icons/fi';

function SidebarNav() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/guest-list', icon: <FiUsers />, label: 'Guest List' },
    { path: '/checklist', icon: <FiCheckSquare />, label: 'Checklist' },
    { path: '/vendors', icon: <FiTruck />, label: 'Vendors' },
    { path: '/saved', icon: <FiBookmark />, label: 'Saved' },
    { path: '/timeline', icon: <FiClock />, label: 'Timeline' },
    { path: '/budget', icon: <FiDollarSign />, label: 'Budget' },
    { path: '/website-builder', icon: <FiLayout />, label: 'Wedding Website' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings' },
    { path: '/profile', icon: <FiUser />, label: 'Profile' }
  ];

  const isActive = (path) => location.pathname === path;

  const MobileToggle = () => (
    <button
      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      className="fixed bottom-4 left-4 z-50 bg-pink-600 text-white p-4 rounded-full shadow-lg md:hidden hover:bg-pink-700 transition-colors"
    >
      {isMobileNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );

  return (
    <>
      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r min-h-screen p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileToggle />
      
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileNavOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
            >
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-pink-100 text-pink-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SidebarNav;
