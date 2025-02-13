import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import '../styles/navbar.css';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar() {
  const { currentUser, userDetails } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setShowProfileMenu(false);
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const profilePhoto = userDetails?.photoURL || currentUser?.photoURL || '/default-avatar.png';
  const displayName = userDetails?.displayName || currentUser?.displayName || 'User';

  const NavLinks = ({ onClick }) => (
    <ul className="nav-links flex space-x-8">
      <li className="relative group">
        <Link to="/venues" onClick={onClick}>Hotel Deals</Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-1 gap-4">
            <Link to="/venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hotel Deals</Link>
            <Link to="/budget-calculator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Budget Calculator</Link>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="/dashboard" onClick={onClick}>DIY Tools</Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
            <Link to="/guest-list" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Guest List</Link>
            <Link to="/checklist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Checklist</Link>
            <Link to="/vendors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Vendors</Link>
            <Link to="/saved" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Saved</Link>
            <Link to="/timeline" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Timeline</Link>
            <Link to="/budget" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Budget</Link>
            <Link to="/website-builder" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wedding Website</Link>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="#" onClick={onClick}>Artists & Activities</Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-2 gap-4">
            <span className="block px-4 py-2 text-gray-700">DJs (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Photographers (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Makeup Artists (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Mehendi Artists (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Gifting Vendors (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Baaraat (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Vintage Cars (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Choreographers (Coming Soon)</span>
            <span className="block px-4 py-2 text-gray-700">Hospitality Teams (Coming Soon)</span>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="/decor" onClick={onClick}>Decor Budgeting</Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-1 gap-4">
            <Link to="/decor" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Decor Budgeting</Link>
          </div>
        </div>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="navbar bg-[#F6F6F6] shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="nav-brand">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E2742]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E2742] to-[#9A2143]">
                Sort My Shaadi
              </span>
            </h1>
          </Link>
          <div className="hidden md:block ml-10">
            <NavLinks />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-[#E0E0E0]"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!currentUser ? (
            <>
              <Link to="/signin" className="btn-secondary text-[#1E2742]">Sign In</Link>
              <Link to="/signup" className="btn-primary bg-[#9A2143] text-white hover:bg-[#BFA054]">Sign Up</Link>
              <Link 
                to="/venue-owner/auth" 
                className="px-4 py-2 border-2 border-[#1E2742] text-[#1E2742] rounded-lg hover:bg-[#EDD498] transition-colors"
              >
                Register Venue
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2"
              >
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-[#1E2742]">{displayName}</span>
              </button>

              {/* Desktop Profile Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F6F6F6] rounded-md shadow-lg py-1">
                  <Link to="/profile" className="block px-4 py-2 text-[#1E2742] hover:bg-[#EDD498]">
                    Profile
                  </Link>
                  {userDetails?.role === 'admin' && (
                    <Link to="/calendar-manager" className="block px-4 py-2 text-[#1E2742] hover:bg-[#EDD498]">
                      Calendar Manager
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-[#1E2742] hover:bg-[#EDD498]"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 h-full w-64 bg-[#F6F6F6] shadow-lg z-50 md:hidden"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-[#1E2742]">Menu</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-[#EDD498]"
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile User Profile */}
                {currentUser && (
                  <div className="mb-6 p-4 bg-[#E0E0E0] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{displayName}</p>
                        <p className="text-sm text-[#9EA1AB]">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}
                <div className="mobile-nav-links">
                  <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* Mobile Auth Buttons */}
                <div className="mt-auto p-4 border-t border-[#9EA1AB]">
                  {!currentUser ? (
                    <div className="space-y-2">
                      <Link 
                        to="/signin" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-2 px-4 text-center bg-[#9A2143] text-white rounded-lg hover:bg-[#BFA054]"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-2 px-4 text-center border border-[#1E2742] text-[#1E2742] rounded-lg hover:bg-[#EDD498]"
                      >
                        Sign Up
                      </Link>
                      <Link 
                        to="/venue-owner/auth"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-2 px-4 text-center bg-[#EDD498] text-[#1E2742] rounded-lg"
                      >
                        Register Venue
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="w-full py-2 px-4 text-center bg-[#EDD498] text-[#1E2742] rounded-lg"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;