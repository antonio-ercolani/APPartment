import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

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

const fontConfig = {
  default: {
    regular: {
      fontFamily: "LemonMilkRegular-X3XE2",
      fontWeight: "bold"
    },
    light: {
      fontFamily: "LemonMilkLight-owxMq",
      fontWeight: "bold"
    },
    thin: {
      fontFamily: "LemonMilkLight-owxMq",
      fontWeight: "bold"
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




export default function CreateApartmentScreen({ navigation }) {
  let [apartmentName, setApartmentName] = useState('');
  let [errorMessage, setErrorMessage] = useState('');

  function createApartment() {
    call({ text: apartmentName }).then((result) => {
      var receivedMessage = result.data.text;
      if (receivedMessage === 'ok') {
        navigation.navigate('HomeScreen');
      } else if (receivedMessage === 'notUnique')
        setErrorMessage('This name already exists, please try another');
    });

  }

  var call = firebase.functions().httpsCallable('functionProva');

  return (
    <View style={styles.main}>
      <ScrollView>
        <PaperProvider theme={theme}>
          <View style={styles.margin}>
            <Text style={styles.login}>{'CREATE\nAPARTMENT'}</Text>
            <TextInput
              style={styles.input}
              label="Apartment name"
              mode='flat'
              underlineColor="white"
              value={apartmentName}
              onChangeText={apartmentName => setApartmentName(apartmentName)}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => createApartment()}>
                <Text style={styles.buttonText}>CREATE APARTMENT</Text>
              </TouchableOpacity>
            </View>

          </View>
        </PaperProvider>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f4511e",
    flex: 1
  },
  margin: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 70,
  },
  login: {
    fontSize: 30,
    color: "white",
    color: "white",
    marginBottom: 40,
    fontFamily: "LemonMilkBoldItalic-PKZ3P"
  },
  input: {
    backgroundColor: '#f4511e',
    height: 60,
  },
  button: {
    backgroundColor: 'white',
    width: 240,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "black",
    fontFamily: "LemonMilkBold-gx2B3",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 50
  },
  separator: {
    alignSelf: "center",
    width: 175,
    height: 2,
    backgroundColor: "white",
    borderRadius: 34,
  },
  error: {
    color: "white",
    marginTop: 10,
  }
});

