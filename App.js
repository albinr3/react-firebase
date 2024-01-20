// Import necessary modules and components
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';
import { decode, encode } from 'base-64';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

// Polyfill for global base64 encoding and decoding
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

// Create a stack navigator
const Stack = createStackNavigator();

// Main component function
export default function App() {
  // State variables to manage loading and user information
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Effect hook to handle user authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes using Firebase Auth
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (userData) => {
      if (userData) {
        // If user data is available, set the user state and log user information
        setUser(userData);
      } else {
        // If no user data, log that no one is logged in
        console.log("No one is logged in");
      }
      
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures that useEffect runs once on mount

  // If still loading, return an empty fragment
  if (loading) {
    return <></>;
  }

  // Render the navigation container with stack navigator based on user authentication status
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        {/* Home screen with user data passed as props */}
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} extraData={user}/>}
        </Stack.Screen>
        {/* Login screen */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Registration screen */}
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}