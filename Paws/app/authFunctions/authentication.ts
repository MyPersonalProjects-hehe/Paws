import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';

export const signUserWithGmail = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    return result.user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
