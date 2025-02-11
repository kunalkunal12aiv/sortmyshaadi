import React from 'react';

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-gray-600">You do not have permission to access this page.</p>
    </div>
  );
}

export default Unauthorized;
