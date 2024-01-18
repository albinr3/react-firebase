import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { setPersistence } from 'firebase/auth';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Inicializar Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Aquí inicializamos AUTH con la configuración específica para React Native o web.
const auth = initializeAuth(FIREBASE_APP, {
  persistence: ['ios', 'android'].includes(Platform.OS)
    ? getReactNativePersistence(ReactNativeAsyncStorage)
    : browserLocalPersistence,
});

export const FIREBASE_AUTH = auth;

// Ya no es necesario el setPersistence aquí debido a que lo configuramos durante la inicialización.
