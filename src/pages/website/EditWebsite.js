import React, { useState } from 'react';

function EditWebsite() {
  const [content, setContent] = useState({
    title: '',
    welcomeMessage: ''
  });

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const saveContent = (e) => {
    e.preventDefault();
    // TODO: Save content to Firestore under couple's website settings
    console.log('Saving website content:', content);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Website</h1>
      <form onSubmit={saveContent}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter site title" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Welcome Message</label>
          <textarea
            name="welcomeMessage"
            value={content.welcomeMessage}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter welcome message"
          />
        </div>
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
      {/* ...any additional fields... */}
    </div>
  );
}

export default EditWebsite;
