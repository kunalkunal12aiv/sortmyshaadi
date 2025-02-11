import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi';

function ImageUpload({ onUploadComplete, section, currentImageUrl = '' }) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onUploadComplete(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="button"
          onClick={handleUrlSubmit}
          className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center justify-center"
        >
          <FiImage className="mr-2" />
          Use Image URL
        </button>
      </div>

      {/* Preview current image if exists */}
      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Current Image:</p>
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="max-w-full h-auto rounded-lg shadow-sm"
            style={{ maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
