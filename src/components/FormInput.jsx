import React from 'react';

function FormInput({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={`
          w-full px-4 py-3 rounded-lg border transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-pink-500'}
          focus:outline-none focus:ring-2 focus:border-transparent
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default FormInput;
