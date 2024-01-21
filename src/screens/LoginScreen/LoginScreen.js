import React, { useState } from 'react'
import { Image, ActivityIndicator, Text, TextInput, Pressable, View } from 'react-native'
//import { KeyboardAdwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import {doc, getDoc} from "firebase/firestore"; 
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  }
  const onLoginPress = async () => {
    // Activate loading animation
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      const docRef = doc(FIREBASE_DB, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const user = docSnap.data()
        navigation.navigate('Home', {user})
        setEmail("");
        setPassword("");
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      alert('User and password are incorrect or user does not exist');
      console.error('Error when logging in', error);
    } finally{
      // Desactivar la animación de carga, ya sea que haya tenido éxito o no
      setIsLoading(false);
    };
  }
  
  return (
    <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* Display loading indicator or registration button based on isLoading state */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <Pressable
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </Pressable>
        )}
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      
    </View>
  )
}