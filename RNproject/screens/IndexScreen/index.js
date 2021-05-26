import React, { useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

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
} else {
  firebase.app();
}

function Index({ navigation }) {

  const [loading, setLoading] = useState(true);

  //Questa funzione viene triggerata solo se l'utente
  //è già loggato
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user is logged');
      hasApartment().then((result) => {
        if (result.data.text === "yes") {
          navigation.navigate('HomeScreen')
        } else if (result.data.text === "no") {
          navigation.navigate('JoinCreateScreen');
        } else {
          console.log('error, hasApartment returned neither yer nor no');
        }
      });
    } else {
      navigation.navigate("Login")
    }
  });


  var hasApartment = firebase.functions().httpsCallable('hasApartment');

  
  return (
    <View style={styles.main}>
          <View style={styles.center}>
            <Text style={styles.login}>APPartment</Text>
            {loading && <ActivityIndicator size="large" color="white" style={{marginTop: 90}}/>}
          </View>
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f4511e",
    flex: 1,
    justifyContent: 'center'
  },
  login: {
    fontSize: 60,
    color: "white",
    color: "white",
    fontFamily: 'FuturaPTCondBoldOblique',
  },
  center: {
    alignItems: 'center'
  }
});

export default Index;
