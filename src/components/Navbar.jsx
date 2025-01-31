import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav>
      <div 
        className="h-1 bg-pink-600 fixed top-0 left-0 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Existing navbar content */}
    </nav>
  );
}

export default Navbar;
