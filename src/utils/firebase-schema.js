// Example venue document structure for Firestore
const venueSchema = {
  name: "Royal Palace Hotel",
  shortAddress: "Mumbai, Maharashtra",
  fullAddress: "123 Main Street, Andheri West, Mumbai, Maharashtra 400053",
  pricePerPlate: 2500,
  maxGuestCapacity: 500,
  minGuestRequirement: 100,
  rating: 4.5,
  totalReviews: 128,
  isAvailable: true,
  searchableText: '', // Concatenated searchable text
  amenities: [
    "parking",
    "garden",
    "pool",
    "ac",
    "wifi",
    "catering",
    "decoration",
    "room service",
    "banquet hall",
    "outdoor venue",
    "indoor venue",
    "lawn area"
  ],
  media: [
    "https://example.com/venue1.jpg",
    "https://example.com/venue2.jpg"
  ],
  coordinates: {
    latitude: 19.1234,
    longitude: 72.8765
  },
  availableDates: [
    "2024-03-15",
    "2024-03-16",
    // ... more dates
  ],
  packages: [
    {
      name: "Basic",
      pricePerPlate: 2500,
      includes: ["dinner", "basic decoration"]
    },
    {
      name: "Premium",
      pricePerPlate: 3500,
      includes: ["dinner", "premium decoration", "DJ"]
    }
  ],
  features: {
    hasSwimmingPool: true,
    hasParking: true,
    hasWifi: true,
    // ... other boolean features
  },
  contactInfo: {
    phone: "+91-9876543210",
    email: "bookings@royalpalace.com"
  }
};

// Example Firebase rules
const firestoreRules = `
service cloud.firestore {
  match /databases/{database}/documents {
    match /venues/{venueId} {
      allow read: true;
      allow write: false;
    }
  }
}
`;
