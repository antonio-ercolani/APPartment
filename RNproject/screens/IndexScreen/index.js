import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import { DefaultTheme, configureFonts } from 'react-native-paper';
import {API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, STORAGE_BUCKET, SEND_ID, APP_ID} from "@env"

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
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJ_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SEND_ID,
  appId: APP_ID
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
