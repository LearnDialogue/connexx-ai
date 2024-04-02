import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyATgEuv1yyDGpxbZvKbvH7EzsJwiUITPww',
  authDomain: 'connexx-ai.firebaseapp.com',
  projectId: 'connexx-ai',
  storageBucket: 'connexx-ai.appspot.com',
  messagingSenderId: '282308260689',
  appId: '1:282308260689:web:1c09a4bd90adbdc4949970',
  measurementId: 'G-VVTEZRE24M',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

export default app;
