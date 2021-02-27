
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import ApartmentList from './ApartmentList';

const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");

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

var searchApartment = firebase.functions().httpsCallable('searchApartment');

function search(text) {
  var res = [];
  if(text.length<4) return;
  firebase.database()
  .ref().child("app").child("apartments").get()
  .then(function(snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.key.includes(text)) {
          console.log('Hanno matchato '+ text + ' ' + childSnapshot.key);
          res.push(childSnapshot.key);
        }
      });
    console.log(res)
    }
  });

  /*searchApartment({ text: text })
    .then((result) => (result.json())
    .then((result) => setApartments(result)))
    .catch((error) => {
      console.log(error.message);
    })*/
}

export default JoinScreen = ({navigation}) => {
  [apartments, setApartments] = useState([]);

  return (
    <SafeAreaView  style={styles.container}>
      <View style={{height:12}}></View>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={(text) => {search(text)}}
      />
      <ApartmentList
        apartments={apartments}
      />
    </SafeAreaView>
  ) 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
    height: 50,
    margin: 5,
    fontSize: 20
  }
})