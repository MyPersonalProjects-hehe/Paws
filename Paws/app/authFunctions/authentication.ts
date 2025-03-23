import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
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

export const registerUser = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result.user);
    return result.user;
  } catch (error) {
    console.log(error);
  }
};
