import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    projectId: process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: process.env.EXPO_PUBLIC_appId,
    measurementId: process.env.EXPO_PUBLIC_measurementId
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = firebaseConfig;
