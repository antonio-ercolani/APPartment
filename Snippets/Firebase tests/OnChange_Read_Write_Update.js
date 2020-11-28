import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


import firebase from "firebase/app";
import "firebase/database";


export default App = () => {
    let [changedAge, setChangedAge] = useState(0);
    useEffect(() => {
        const onValueChange = firebase.database()
          .ref(`/users/u2`)
          .on('value', snapshot => {
            setChangedAge(snapshot.val().age)
            console.log('Tony now is: ', snapshot.val().age);
          });
        })
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:50}}>Tony now is {changedAge}</Text>
        </SafeAreaView>
    )
}


var firebaseConfig = {
    apiKey: "AIzaSyBMqZAgePy_40-jXRQMpcHvK76HqPmZUxU",
    authDomain: "dima-52e16.firebaseapp.com",
    databaseURL: "https://dima-52e16.firebaseio.com",
    projectId: "dima-52e16",
    storageBucket: "dima-52e16.appspot.com",
    messagingSenderId: "330401771086",
    appId: "1:330401771086:web:447a4b8a9f8bb157175d1f"
  }; 


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

   

  // Get a reference to the database service
  var database = firebase.database();

  function writeUserData() {
    firebase.database().ref('users/u2/').set({
      age: "22",
      name: "tony", 
      surname: "maccherony"
    });
  };
  //writeUserData();


  /*
  function read() {
      firebase.database().
      ref('/users/u2/')
      .on('value', snapshot => {
          console.log('Something changed')
      })
  }
  */

  
  function update() {
      firebase.database()
      .ref('users/u2/')
      .update({
          name:"Antonio",
          surname:"Ercolani"
      })
  }
  //update();
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center', // primary axis
      alignItems: 'center' // secondary axis
    },
    text: {
      fontWeight: "500",
      fontSize: 20
    },
    red: {
      color: "red"
    },
    generator: {
      alignItems: 'center',
    }
  });
