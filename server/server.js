const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/venue-recommendations', (req, res) => {
  console.log('Received request:', req.body);
  const { totalBudget, guestCount, checkInDate, checkOutDate } = req.body;

  // Mock venue data with more realistic sample data
  const mockVenues = [
    {
      id: 1,
      name: "Royal Palace Hotel",
      shortAddress: "Mumbai, Maharashtra",
      pricePerPlate: 2500,
      guestSpace: 500,
      media: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1"],
    },
    {
      id: 2,
      name: "Golden Tulip Resort",
      shortAddress: "Lonavala, Maharashtra",
      pricePerPlate: 2000,
      guestSpace: 300,
      media: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1"],
    },
    {
      id: 3,
      name: "Riverside Retreat",
      shortAddress: "Pune, Maharashtra",
      pricePerPlate: 1800,
      guestSpace: 400,
      media: ["https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1"],
    }
  ];

  const venues = mockVenues.filter(venue => 
    venue.guestSpace >= parseInt(guestCount) &&
    venue.pricePerPlate * parseInt(guestCount) <= parseInt(totalBudget)
  );

  console.log('Filtered venues:', venues);

  const response = {
    recommendedVenues: venues.slice(0, 2),
    otherVenues: venues.slice(2),
    budgetBreakdown: {
      venue: Math.round(totalBudget * 0.4),
      catering: Math.round(totalBudget * 0.3),
      decoration: Math.round(totalBudget * 0.2),
      other: Math.round(totalBudget * 0.1)
    }
  };

  console.log('Sending response:', response);
  res.json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
