import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function EditWeddingSite() {
  const { siteName } = useParams();
  const [content, setContent] = useState({
    title: '',
    tagline: '',
    about: ''
  });

  const handleChange = (e) => {
    setContent({...content, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save content to your backend (e.g. Firestore) under the site identifier (siteName)
    console.log("Updated Website:", content);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">Edit Your Wedding Website</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-purple-600 font-semibold mb-2">Website Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={content.title} 
              onChange={handleChange} 
              placeholder="Enter Your Title" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tagline" className="block text-purple-600 font-semibold mb-2">Tagline</label>
            <input 
              type="text" 
              id="tagline" 
              name="tagline" 
              value={content.tagline} 
              onChange={handleChange} 
              placeholder="Enter a catchy tagline" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="about" className="block text-purple-600 font-semibold mb-2">About Us</label>
            <textarea
              id="about"
              name="about"
              value={content.about}
              onChange={handleChange}
              placeholder="Tell your story"
              rows="6"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105">
              Save Changes
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to={`/sites/${siteName || "default"}`} className="text-purple-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditWeddingSite;
