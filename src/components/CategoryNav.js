import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CategoryNav({ categories }) {
  const location = useLocation();

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 py-6 px-4 justify-center">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/decor/${category.id}`}
                className={`flex flex-col items-center min-w-[120px] group ${
                  location.pathname.includes(category.id) ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <div className={`w-28 h-28 rounded-full border-2 p-1 mb-3 ${
                  location.pathname.includes(category.id) 
                    ? 'border-pink-500' 
                    : 'border-gray-300 group-hover:border-pink-300'
                }`}>
                  {category.items[0] && (
                    <img
                      src={category.items[0].imageUrl}
                      alt={category.id}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                <span className="text-sm font-medium truncate w-28 text-center">
                  {category.id.replace(/-/g, ' ')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;