import React from 'react';
import { Link } from 'react-router-dom';

function WebsiteDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wedding Website</h1>
      <nav className="space-y-3">
        <Link to="/website/edit" className="text-blue-600 underline">Edit Website</Link>
        <br />
        <Link to="/website/guestbook" className="text-blue-600 underline">RSVP & Guest Book</Link>
        <br />
        <Link to="/website/chat" className="text-blue-600 underline">Group Chat</Link>
      </nav>
      {/* ...additional dashboard content... */}
    </div>
  );
}

export default WebsiteDashboard;
