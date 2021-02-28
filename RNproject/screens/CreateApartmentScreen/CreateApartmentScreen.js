import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialStackedLabelTextbox from "./Components/MaterialStackedLabelTextbox";
import MaterialButtonDanger from "./Components/MaterialButtonDanger";
import firebase from "firebase/app";


// Required for side-effects
require("firebase/functions");


require('firebase/auth')

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




export default function CreateApartmentScreen({navigation}) {
  let[apartmentName, setApartmentName] = useState('');
  let[errorMessage, setErrorMessage] = useState('');

  function createApartment() {
    
    call({ text: apartmentName }).then((result) => {
      var receivedMessage = result.data.text;
      if (receivedMessage === 'ok') {
        navigation.navigate('RegistrationCompletedScreen');
      } else if (receivedMessage === 'notUnique')
        setErrorMessage('This name already exists, please try another');
    });
    
    }

  var call = firebase.functions().httpsCallable('functionProva');

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.apartmentCreation}>APARTMENT CREATION</Text>
        <MaterialStackedLabelTextbox
          style={styles.materialStackedLabelTextbox}
          updateText = {setApartmentName}
        ></MaterialStackedLabelTextbox>
        <Text style={{color : 'white'}}>{errorMessage}</Text>
        <MaterialButtonDanger
          onClick = {createApartment}
          style={styles.materialButtonDanger1}
        ></MaterialButtonDanger>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,99,70,1)",
    justifyContent: "center"
  },
  group: {
    width: 318,
    height: 563,
    justifyContent: "space-between",
    alignSelf: "center"
  },
  apartmentCreation: {
    fontFamily: "roboto-300",
    color: "rgba(255,255,255,1)",
    height: 106,
    width: 318,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  materialStackedLabelTextbox: {
    height: 81,
    width: 327
  },
  materialButtonDanger1: {
    height: 73,
    width: 230,
    backgroundColor: "rgba(249,99,70,1)",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignSelf: "center"
  }
});

