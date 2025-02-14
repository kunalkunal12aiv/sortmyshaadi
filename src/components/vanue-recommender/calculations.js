import { getVenues } from '../../utils/firebase';
export const calculateVenueRecommendations = async (formData) => {
  const { totalBudget, guestCount, stayDuration, adjustedExtraBeds, doubleRooms } = formData;

  const minAccommodation = totalBudget * 0.45;
  const maxAccommodation = totalBudget * 0.55;

  const allVenues = await getVenues();
  
  const processedVenues = allVenues.map(venue => {
    const doubleRoomPrice = parseFloat(venue.doubleRoomPrice) || 0;
    const extraBedPrice = parseFloat(venue.extraBedPrice) || 0;

    const roomCost = doubleRoomPrice * doubleRooms;
    const extraBedCost = extraBedPrice * adjustedExtraBeds;
    const totalStayCost = (roomCost + extraBedCost) * stayDuration;

    return {
      ...venue,
      doubleRooms,
      extraBeds: adjustedExtraBeds,
      roomCost,
      extraBedCost,
      totalCost: totalStayCost,
      isWithinBudget: totalStayCost >= minAccommodation && totalStayCost <= maxAccommodation
    };
  });

  return {
    recommendedVenues: processedVenues.filter(venue => venue.isWithinBudget),
    otherVenues: processedVenues.filter(venue => !venue.isWithinBudget),
    budgetBreakdown: {
      minAccommodation,
      maxAccommodation,
      remainingBudget: totalBudget - maxAccommodation,
      doubleRooms,
      extraBeds: adjustedExtraBeds,
      stayDuration,
      totalGuests: guestCount
    }
  };
};
