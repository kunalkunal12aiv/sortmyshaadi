import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const destinations = [
  {
    name: "Beach Weddings",
    image: "/assets/beach-wedding.jpg",
    link: "/venues?type=beach"
  },
  {
    name: "Garden Weddings",
    image: "/assets/garden-wedding.jpg",
    link: "/venues?type=mountain"
  },
  {
    name: "Luxury Weddings",
    image: "/assets/luxury-resort.jpg",
    link: "/venues?type=city"
  },
  {
    name: "Palace Weddings",
    image: "/assets/palace-wedding.jpeg",
    link: "/venues?type=countryside"
  }
];

function DestinationTypes() {
  return (
    <div className="py-20 relative overflow-hidden bg-[#ffffff] text-[#1f2937]">
      {/* Background with subtle texture */}
      <div className="absolute inset-0 bg-[var(--accent-3)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Explore Wedding Destinations
          </h2>
          <p className="text-xl text-[#6b7280]">
            Find the perfect setting for your special day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={destination.link}>
                <div className="group relative rounded-2xl overflow-hidden shadow-lg bg-[#fce4ec]">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-serif text-[#1f2937] mb-2 capitalize">
                      {destination.name}
                    </h3>
                    <p className="text-[#1f2937]/80 text-sm">
                      Discover unique venues
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default DestinationTypes;
