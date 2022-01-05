import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Modal, ActivityIndicator, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import {API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, STORAGE_BUCKET, SEND_ID, APP_ID} from "@env"

// Required for side-effects
require("firebase/functions");


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


export default function CreateApartmentScreen({ navigation }) {
  let [apartmentName, setApartmentName] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let [modalVisible, setModalVisible] = useState(false);

  var call = firebase.functions().httpsCallable('createApartment');

  function createApartment() {
    setModalVisible(true)
    call({ text: apartmentName }).then((result) => {
      setModalVisible(false)
      var receivedMessage = result.data.text;
      if (receivedMessage === 'ok') {
        navigation.navigate('HomeScreen');
      } else if (receivedMessage === 'notUnique')
        setErrorMessage('This name already exists, please try another');
    });

  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <PaperProvider theme={theme}>
          <View style={styles.margin}>
            <Text style={styles.login}>{'CREATE'}</Text>
            <Text style={styles.login1}>{'APARTMENT'}</Text>
            <TextInput
              style={styles.input}
              label="apartment name"
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
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <ActivityIndicator size="large" color="#afafaf" style={{ marginTop: 450 }}/>
            </Modal>
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
    alignSelf: "center",
    fontSize: 35,
    color: "white",
    color: "white",
    fontFamily: 'FuturaPTBold'
  },
  login1: {
    alignSelf: "center",
    fontSize: 35,
    color: "white",
    color: "white",
    marginBottom: 40,
    fontFamily: 'FuturaPTBold'
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
    fontSize: 20,
    color: "black",
    fontFamily: 'FuturaPTBold',
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

