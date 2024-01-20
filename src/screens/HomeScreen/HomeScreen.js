import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, TextInput, FlatList} from 'react-native'
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import styles from './styles'
import { collection, setDoc, getDocs, doc, query, where, orderBy, serverTimestamp} from "firebase/firestore"; 



export default function HomeScreen(props) {
  const navigation = props.navigation;
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const userID = props.extraData.uid
  const notesCollection = collection(FIREBASE_DB, 'notes');

//here we apply useEffect to get all the notes from the database
  useEffect( ()=> {
    const fetchData = async () => {
      try {
        const notesCollection = collection(FIREBASE_DB, 'notes');
        const q = query(notesCollection, where("authorID", "==", userID), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No documents found in the "notes" collection.');
        return;
      }

      const newNotes = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      setNotes(newNotes);
      
      console.log('Notes:', newNotes);
    } catch (error) {
      // Handle errors
    }
  };

    fetchData(); // Call the asynchronous function inside useEffect
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const onAddButtonPress = async () => {
    if (noteText && noteText.length > 0) {
      const timestamp = serverTimestamp()
      // Puede que necesite proporcionar el id de la nueva nota aquí
      const newNote = {
        text: noteText,
        authorID: userID,
        createdAt: timestamp,
      };

      try {
        await setDoc(doc(notesCollection), newNote);
  
        // Actualización del estado para incluir la nueva nota
        setNotes(previousNotes => [
          // Suponiendo que desea que la nueva nota esté al principio (más reciente)
          { id: notesCollection.id, ...newNote },
          ...previousNotes
        ]);
  
      } catch (error) {
        // Manejar errores aquí
      }
  
      // Limpiar el campo de texto
      setNoteText('');
    }
  }
  const functionSignOut = ()=> {
    signOut(FIREBASE_AUTH).then(() => {
      // Sign-out successful.
      console.log("sign out sucessfull")
      navigation.navigate("Login")
    }).catch((error) => {
      // An error happened.
    });
  }

  const renderEntity = ({item, index}) => {
    return (
        <View style={styles.entityContainer}>
            <Text style={styles.entityText}>
                {index}. {item.text}
            </Text>
        </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new note"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setNoteText(text)}
          value={noteText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      { notes && (
        <View style={styles.listContainer}>
          <FlatList
            data={notes}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}

      <Pressable 
      onPress={() => functionSignOut()}
      style={styles.button}>
        <Text style={styles.buttonTitle}>Sign Out</Text>
      </Pressable>
    </View>
  )
}