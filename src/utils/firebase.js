import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  GeoPoint,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

export const addVenue = async (venueData) => {
  try {
    const venuesCollection = collection(db, 'venues');
    return await addDoc(venuesCollection, {
      ...venueData,
      location: new GeoPoint(Number(venueData.latitude), Number(venueData.longitude)),
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding venue:', error);
    throw error;
  }
};

export const getVenues = async () => {
  const venuesCollection = collection(db, 'venues');
  const venueSnapshot = await getDocs(venuesCollection);
  return venueSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getVenueById = async (id) => {
  const venueRef = doc(db, 'venues', id);
  const venueSnap = await getDoc(venueRef);
  if (venueSnap.exists()) {
    return {
      id: venueSnap.id,
      ...venueSnap.data()
    };
  }
  throw new Error('Venue not found');
};

export const updateVenue = async (id, venueData) => {
  try {
    const venueRef = doc(db, 'venues', id);
    await updateDoc(venueRef, {
      ...venueData,
      location: new GeoPoint(Number(venueData.latitude), Number(venueData.longitude)),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error;
  }
};

export const getHotelDetails = async () => {
  try {
    const venuesRef = collection(db, "venues");
    const q = query(venuesRef, where("decorImages", "!=", null));
    const querySnapshot = await getDocs(q);
    const venues = [];
    querySnapshot.forEach((doc) => {
      venues.push({ id: doc.id, ...doc.data() });
    });
    return venues;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
};

export async function queryVenues(criteria) {
  try {
    const { totalBudget, guestCount } = criteria;
    console.log('Querying with criteria:', { totalBudget, guestCount });
    
    const venuesRef = collection(db, 'venues');
    const querySnapshot = await getDocs(venuesRef);
    const venues = [];
    const alternativeVenues = [];
    
    querySnapshot.forEach((doc) => {
      const venueData = doc.data();
      const venue = {
        id: doc.id,
        ...venueData
      };
      
      const maxBudgetPerPlate = Math.floor(parseInt(totalBudget) / parseInt(guestCount));
      
      // Check exact matches
      if (venue.maxGuestCapacity >= parseInt(guestCount) &&
          venue.pricePerPlate <= maxBudgetPerPlate) {
        venues.push(venue);
      } 
      // Check for alternatives (20% over budget OR up to 20% under capacity)
      else if (
        (venue.pricePerPlate <= maxBudgetPerPlate * 1.2) ||
        (venue.maxGuestCapacity >= parseInt(guestCount) * 0.8)
      ) {
        alternativeVenues.push(venue);
      }
    });

    // Sort both arrays by price and rating
    const sortByPriceAndRating = (a, b) => {
      if (a.rating !== b.rating) return b.rating - a.rating;
      return a.pricePerPlate - b.pricePerPlate;
    };

    venues.sort(sortByPriceAndRating);
    alternativeVenues.sort(sortByPriceAndRating);

    console.log('Found venues:', {
      recommended: venues.length,
      alternatives: alternativeVenues.length
    });

    return {
      recommendedVenues: venues.slice(0, 3),
      otherVenues: venues.slice(3),
      alternativeVenues: alternativeVenues.slice(0, 6),
      totalResults: venues.length + alternativeVenues.length
    };
  } catch (error) {
    console.error('Error querying venues:', error);
    throw error;
  }
}

export const getCities = async () => {
  try {
    const venuesRef = collection(db, 'venues');
    const querySnapshot = await getDocs(venuesRef);
    const cities = new Set();
    
    querySnapshot.forEach(doc => {
      const venue = doc.data();
      const city = venue.shortAddress?.split(',').pop()?.trim();
      if (city) cities.add(city);
    });

    return Array.from(cities).sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const saveChat = async (userId, chatData) => {
  try {
    const chatsRef = collection(db, 'chats');
    const chatDoc = await addDoc(chatsRef, {
      userId,
      messages: chatData.messages,
      answers: chatData.answers,
      recommendations: chatData.recommendations,
      createdAt: new Date(),
      lastUpdated: new Date()
    });
    return chatDoc.id;
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
};

export async function getUserChats(userId) {
  try {
    // Updated query: added a secondary orderBy for '__name__'
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      orderBy('lastUpdated', 'desc'),
      orderBy('__name__', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('getUserChats error:', error);
    throw error;
  }
}

// NOTE: After saving changes, deploy your indexes with:
//    firebase deploy --only firestore:indexes

export const deleteChat = async (chatId) => {
  try {
    const chatRef = doc(db, 'chats', chatId);
    await deleteDoc(chatRef);
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
};
