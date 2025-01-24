import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Debug logging
    console.log('Current user:', currentUser);
    console.log('User details:', userDetails);
  }, [currentUser, userDetails]);

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
    <ul className="nav-links">
      <li><Link to="/" onClick={onClick}>Home</Link></li>
      <li><Link to="/venues" onClick={onClick}>Venues</Link></li>
      <li><Link to="/budget-calculator" onClick={onClick}>Budget</Link></li>
      <li><Link to="/decor" onClick={onClick}>Decor</Link></li>
      <li><Link to="/add-venue" onClick={onClick}>Add Venue</Link></li>
    </ul>
  );

  return (
    <>
      <nav className="navbar bg-white shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="nav-brand">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
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
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
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
              <Link to="/signin" className="btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
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
                <span className="text-gray-700">{displayName}</span>
              </button>

              {/* Desktop Profile Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  {userDetails?.role === 'admin' && (
                    <Link to="/calendar-manager" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Calendar Manager
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-pink-600">Menu</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
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
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{displayName}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}
                <div className="mobile-nav-links">
                  <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* Mobile Auth Buttons */}
                <div className="mt-auto p-4 border-t">
                  {!currentUser ? (
                    <div className="space-y-2">
                      <Link 
                        to="/signin" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-2 px-4 text-center bg-pink-600 text-white rounded-lg"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-2 px-4 text-center border border-pink-600 text-pink-600 rounded-lg"
                      >
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="w-full py-2 px-4 text-center bg-gray-100 text-gray-700 rounded-lg"
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