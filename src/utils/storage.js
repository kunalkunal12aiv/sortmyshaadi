import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file, path) => {
  try {
    const fileId = uuidv4();
    const extension = file.name.split('.').pop();
    const fileName = `${fileId}.${extension}`;
    const fullPath = `${path}/${fileName}`;
    
    const storageRef = ref(storage, fullPath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
