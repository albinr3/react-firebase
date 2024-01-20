import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, TextInput, FlatList} from 'react-native'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { signOut } from "firebase/auth";
import styles from './styles'
import { collection, setDoc, getDocs, doc, query, where, orderBy, serverTimestamp} from "firebase/firestore"; 



export default function HomeScreen(props) {
  const navigation = props.navigation;
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const userID = props.extraData.uid
  const notesCollection = collection(FIREBASE_DB, 'notes');

// Applying useEffect to retrieve all the notes from the database
useEffect(() => {
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
      console.error('Error fetching notes:', error);
    }
  };

  fetchData(); // Call the asynchronous function inside useEffect
}, []); // Empty dependency array means this effect runs once when the component mounts

const onAddButtonPress = async () => {
  if (noteText && noteText.length > 0) {
    const timestamp = serverTimestamp()
    // May need to provide the id of the new note here
    const newNote = {
      text: noteText,
      authorID: userID,
      createdAt: timestamp,
    };

    try {
      await setDoc(doc(notesCollection), newNote);

      // Update the state to include the new note
      setNotes(previousNotes => [
        // Assuming you want the new note to be at the beginning (most recent)
        { id: notesCollection.id, ...newNote },
        ...previousNotes
      ]);

    } catch (error) {
      // Handle errors here
      console.error('Error adding new note:', error);
    }

    // Clear the text input field
    setNoteText('');
  }
}

const functionSignOut = () => {
  signOut(FIREBASE_AUTH).then(() => {
    // Sign-out successful.
    console.log("Sign out successful");
    navigation.navigate("Login");
  }).catch((error) => {
    // An error happened.
    console.error('Sign-out error:', error);
  });
}

const renderEntity = ({ item, index }) => {
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