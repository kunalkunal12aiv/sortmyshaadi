import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  GeoPoint,
  query,
  where
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
