import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import styles from './styles'

export default function HomeScreen(props) {
  const navigation = props.navigation;
  const userID = props.extraData.uid
  const functionSignOut = ()=> {
    signOut(FIREBASE_AUTH).then(() => {
      // Sign-out successful.
      console.log("sign out sucessfull")
      navigation.navigate("Login")
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <View>
      <Pressable 
      onPress={() => functionSignOut()}
      style={styles.button}>
        <Text style={styles.buttonTitle}>Sign Out</Text>
      </Pressable>
    </View>
  )
}