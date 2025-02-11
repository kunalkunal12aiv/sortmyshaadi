export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { totalBudget, guestCount, checkInDate, checkOutDate } = req.body;
    // Ensure budget and guestCount are numbers:
    const totalBudgetNum = Number(totalBudget);
    const guestCountNum = Number(guestCount);

    // Verify you are querying the correct collection ("venues")
    const venuesSnapshot = await firestore.collection('venues')
      .where('guestSpace', '>=', guestCountNum)
      .where('pricePerPlate', '<=', totalBudgetNum / guestCountNum)
      .orderBy('pricePerPlate') // required for range queries
      // Removed limit to fetch all matching documents
      .get();

    const allVenues = venuesSnapshot.docs.map(doc => {
      const data = doc.data();
      // Optionally ensure numeric conversion if stored as strings:
      return { 
        id: doc.id, 
        ...data, 
        guestSpace: Number(data.guestSpace),
        pricePerPlate: Number(data.pricePerPlate)
      };
    });

    console.log('Total venues found:', allVenues.length);
    // Use allVenues to set recommendations
    const recommendedVenues = allVenues.slice(0, 3);
    const alternativeVenues = allVenues; 

    // Calculate budget breakdown
    const budgetBreakdown = {
      venue: totalBudget * 0.4,
      catering: totalBudget * 0.3,
      decoration: totalBudget * 0.2,
      other: totalBudget * 0.1
    };

    return res.status(200).json({
      recommendedVenues,
      alternativeVenues,
      budgetBreakdown
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
