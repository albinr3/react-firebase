import React, { useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { collection, addDoc, doc, getDocs} from "firebase/firestore"; 



export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }
  
  const onRegisterPress = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const uid = userCredential.user.uid;
        const dataUser = {
          id: uid,
          email,
          fullName
        };
        const addUser = await addDoc(collection(FIREBASE_DB, "users"), {
          dataUser
        }); 
        navigation.navigate('Home', {user: dataUser})      
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error("Error al crear usuario", error);
        // ..
      });
    
  }

  const onNav = () => {
    navigation.navigate('Home');
  }
  //consultar base de datos
 // const onConsultPress = async () => {
    // try {
    //   const querySnapshot = await getDocs(collection(FIREBASE_DB, "users"));
  
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
    //   });
    // } catch (error) {
    //   console.error("Error al consultar la base de datos:", error);
    // }
  //}
  
  return (
    <View style={styles.container}>
      
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Pressable
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => onNav()}>
          <Text style={styles.buttonTitle}>navegar</Text>
        </Pressable>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
     
    </View>
  )
}