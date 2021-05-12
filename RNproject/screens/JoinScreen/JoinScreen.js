import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import ApartmentList from './ApartmentList';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';


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

const font = 'FuturaPTDemi';
const fontConfig = {
  default: {
    regular: {
      fontFamily: font,
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    text: 'white',
    placeholder: 'white'
  },
  fonts: configureFonts(fontConfig)
};

var searchApartment = firebase.functions().httpsCallable('searchApartment');

function search(text) {
  searchApartment({ text: text })
    .then((result) => (JSON.parse(result.data)))
    .then((result) => setApartments(result))
    .catch((error) => {
      console.log(error.message);
    })

}

function JoinScreen({navigation}) {
  [apartments, setApartments] = useState();


  return (
    <PaperProvider theme={theme}>
    <SafeAreaView  style={styles.container}>
      <View style={styles.margin}>
      <TextInput
        style={styles.input}
        label="Apartment name"
        onChangeText={(text) => {search(text)}}
      />
      <ApartmentList
        navigation={navigation}
        apartments={apartments}
      />
      </View>
    </SafeAreaView>
    </PaperProvider>
  ) 

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4511e",
    flex: 1
  },
  margin: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 25,
  },
  input: {
    backgroundColor: '#f4511e',
    height: 60,
    fontSize: 25,
    marginBottom:23
  }
})

export default JoinScreen;