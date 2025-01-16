import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import '../styles/navbar.css';

function Navbar() {
  const { user, userDetails } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar bg-white shadow-lg px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="nav-brand text-xl font-bold text-pink-600">
          Sort my Shaadi
        </Link>
        
        <ul className="nav-links ml-10 flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/venues">Venues</Link></li>
          <li><Link to="/guest-list">Guest List</Link></li>
          <li><Link to="/budget-calculator">Budget</Link></li>
          <li><Link to="/timeline">Timeline</Link></li>
          <li><Link to="/add-venue">Add Venue</Link></li>
          <li><Link to="/decor">Decor</Link></li> {/* Add Decor link */}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/signin" className="btn-secondary">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2"
            >
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{user.displayName}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                {userDetails?.role === 'admin' && (
                  <Link
                    to="/calendar-manager"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
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
  );
}

export default Navbar;