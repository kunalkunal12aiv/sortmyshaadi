import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    <ul className="nav-links flex items-center space-x-8">
      <li className="relative group text-white">
        <Link to="/venues" onClick={onClick} className="text-white text-sm hover:text-gray-200 py-2">
          Hotel Deals
        </Link>
        
      </li>
      <li className="relative group">
        <Link to="/dashboard" onClick={onClick} className="text-white text-sm hover:text-gray-200 py-2">
          DIY Tools
        </Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-[#db2777] shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Dashboard</Link>
            <Link to="/guest-list" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Guest List</Link>
            <Link to="/checklist" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Checklist</Link>
            <Link to="/vendors" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Vendors</Link>
            <Link to="/saved" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Saved</Link>
            <Link to="/timeline" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Timeline</Link>
            <Link to="/budget" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Budget</Link>
            <Link to="/website-builder" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">Wedding Website</Link>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="#" onClick={onClick} className="text-white text-sm hover:text-gray-200 py-2">
          Artists & Activities
        </Link>
        <div className="absolute left-0 top-full hidden group-hover:flex bg-[#db2777] shadow-lg rounded-lg p-4 w-max z-50">
          <div className="grid grid-cols-2 gap-4">
            <span className="block px-4 py-2 text-white">DJs (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Photographers (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Makeup Artists (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Mehendi Artists (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Gifting Vendors (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Baaraat (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Vintage Cars (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Choreographers (Coming Soon)</span>
            <span className="block px-4 py-2 text-white">Hospitality Teams (Coming Soon)</span>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="/decor" onClick={onClick} className="text-white text-sm hover:text-gray-200 py-2">
          Decor Budgeting
        </Link>
        
      </li>
      
    </ul>
  );

  return (
    <>
      <Helmet>
        <title>Navbar - Sort My Shaadi</title>
        <meta name="description" content="Navigation bar for Sort My Shaadi" />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <div className="w-full bg-[#db2777]">
        <nav className="px-6 py-4 w-full border-b border-white/10"> {/* Removed shadow-lg and navbar class, added border */}
          <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
            <div className="flex items-center space-x-10">
              <Link to="/" className="nav-brand">
                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white whitespace-nowrap">
                  Sort My Shaadi
                </h1>
              </Link>
              <div className="hidden md:block">
                <NavLinks />
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-[#b91c1c]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg 
                className="w-6 h-6 text-white" 
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
                  <Link to="/signin" className="btn-primary text-white border border-white">Sign In</Link>
                  <Link to="/signup" className="btn-primary bg-white text-[#db2777] hover:bg-gray-200 border border-white">Sign Up</Link>
                  <Link 
                    to="/venue-owner/auth" 
                    className="px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
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
                      loading="lazy"
                    />
                    <span className="text-white">{displayName}</span>
                  </button>

                  {/* Desktop Profile Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#db2777] rounded-md shadow-lg py-1">
                      <Link to="/profile" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">
                        Profile
                      </Link>
                      {userDetails?.role === 'admin' && (
                        <Link to="/calendar-manager" className="block px-4 py-2 text-white hover:bg-[#b91c1c]">
                          Calendar Manager
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-white hover:bg-[#b91c1c]"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                className="fixed inset-0 bg-[#000000] z-40 md:hidden"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed right-0 top-0 h-full w-64 bg-[#db2777] shadow-lg z-50 md:hidden"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-[#b91c1c]"
                    >
                      <svg 
                        className="w-6 h-6 text-white" 
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
                    <div className="mb-6 p-4 bg-[#b91c1c] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-medium text-white">{displayName}</p>
                          <p className="text-sm text-gray-200">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation */}
                  <div className="mobile-nav-links">
                    <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="mt-auto p-4 border-t border-gray-200">
                    {!currentUser ? (
                      <div className="space-y-2">
                        <Link 
                          to="/signin" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full py-2 px-4 text-center bg-white text-[#db2777] rounded-lg hover:bg-gray-200"
                        >
                          Sign In
                        </Link>
                        <Link 
                          to="/signup"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full py-2 px-4 text-center border border-white text-white rounded-lg hover:bg-[#b91c1c]"
                        >
                          Sign Up
                        </Link>
                        <Link 
                          to="/venue-owner/auth"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full py-2 px-4 text-center bg-[#b91c1c] text-white rounded-lg"
                        >
                          Register Venue
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={handleSignOut}
                        className="w-full py-2 px-4 text-center bg-[#b91c1c] text-white rounded-lg"
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
      </div>
    </>
  );
}

export default Navbar;