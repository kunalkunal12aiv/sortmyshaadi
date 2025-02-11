import React from 'react';
import { Link, useParams } from 'react-router-dom';

function WebsiteDashboard() {
  const { siteName } = useParams(); // siteName could be your custom website name

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <header className="py-12 text-center">
        <h1 className="text-5xl font-bold">Welcome to {siteName || "Your Wedding Website"}</h1>
        <p className="mt-4 text-2xl">Celebrate your love story with style</p>
        <Link to={`/sites/${siteName || "default"}/edit`} className="mt-8 inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105">
          Edit Website
        </Link>
      </header>
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-purple-600 p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg">Share your beautiful journey here...</p>
          </div>
          <div className="bg-white text-purple-600 p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Event Details</h2>
            <p className="text-lg">Include timings, venue info, and more...</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WebsiteDashboard;
