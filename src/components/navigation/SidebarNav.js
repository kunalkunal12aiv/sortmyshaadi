import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiHome, FiUsers, FiCheckSquare, FiShoppingBag, 
  FiHeart, FiCalendar, FiDollarSign, FiSettings, 
  FiLogOut, FiUser, FiGlobe, FiEdit 
} from 'react-icons/fi';

function SidebarNav() {
  const [isHovering, setIsHovering] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Guest List', icon: FiUsers, path: '/guest-list' },
    { name: 'Checklist', icon: FiCheckSquare, path: '/checklist' },
    { name: 'Vendors', icon: FiShoppingBag, path: '/vendors' },
    { name: 'Saved Items', icon: FiHeart, path: '/saved' },
    { name: 'Timeline', icon: FiCalendar, path: '/timeline' },
    { name: 'Budget', icon: FiDollarSign, path: '/budget' },
    {
      name: 'Wedding Website',
      icon: FiGlobe,
      subItems: [
        { name: 'Website Builder', icon: FiEdit, path: '/website-builder' },
        { name: 'Preview Site', icon: FiGlobe, path: '/sites/preview' }
      ]
    },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
    { name: 'Profile', icon: FiUser, path: '/profile' },
  ];

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ease-in-out
        ${isHovering ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4 flex-shrink-0">
        <Link to="/" className="flex items-center justify-center md:justify-start">
          
          {isHovering && <span className="ml-2 text-lg font-semibold">Sort My Shaadi</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                // Render dropdown for items with subitems
                <>
                  <div
                    onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                    className="flex items-center py-2 px-4 space-x-3 rounded-md cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <item.icon className="h-5 w-5" />
                    {isHovering && (
                      <>
                        <span>{item.name}</span>
                        <span className="ml-auto">▼</span>
                      </>
                    )}
                  </div>
                  {isHovering && expandedItem === item.name && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="flex items-center py-2 px-4 space-x-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Render regular menu item
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-4 space-x-3 rounded-md
                    ${location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {isHovering && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleSignOut}
          className="flex items-center py-2 px-4 space-x-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <FiLogOut className="h-5 w-5" />
          {isHovering && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

export default SidebarNav;
