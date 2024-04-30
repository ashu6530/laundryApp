import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAb6kh_I-85Dfw-UXfO14-YlY9O-CV6r6w",
  authDomain: "laundry-application-f6f7b.firebaseapp.com",
  projectId: "laundry-application-f6f7b",
  storageBucket: "laundry-application-f6f7b.appspot.com",
  messagingSenderId: "567256946845",
  appId: "1:567256946845:web:b4204d289d5bf11d225c74"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
const db = getFirestore();

export { auth, db };
