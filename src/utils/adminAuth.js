import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const checkAdminRole = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() && userSnap.data().role === 'admin';
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};
