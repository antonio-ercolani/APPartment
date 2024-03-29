import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Modal, ActivityIndicator, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import "firebase/database";
import {API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, STORAGE_BUCKET, SEND_ID, APP_ID} from "@env"
const formUtils = require('./registrationFormUtils.js')
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


function RegistrationScreen({navigation}) {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  let [modalVisible, setModalVisible] = useState(false);

  function createUser() {
    if (formUtils.checkForm(username, email, password, repeatPassword, setErrorMessage)) {
      setModalVisible(true);
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        setModalVisible(false)
        firebase.database()
        .ref('/app/users/' + firebase.auth().currentUser.uid)
        .set({
        username : username,
        apartment : false
        })
        navigation.replace('JoinCreateScreen');
      })
      .catch((error) => {
        setModalVisible(false)
        var errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
      });
    } 
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <PaperProvider theme={theme}>
          <View style={styles.margin}>
            <Text style={styles.login}>REGISTRATION</Text>
            <TextInput
              style={styles.input}
              label="username"
              mode='flat'
              underlineColor="white"
              value={username}
              onChangeText={username => setUsername(username)}
            />
            <TextInput
              style={styles.input}
              label="email"
              mode='flat'
              underlineColor="white"
              value={email}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
              style={styles.input}
              label="password"
              mode='flat'
              underlineColor="white"
              value={password}
              secureTextEntry
              onChangeText={password => setPassword(password)}
            />
            <TextInput
              style={styles.input}
              label="repeat password"
              mode='flat'
              underlineColor="white"
              value={repeatPassword}
              secureTextEntry
              onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => createUser()}>
                <Text style={styles.buttonText}>REGISTER</Text>
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
              <ActivityIndicator size="large" color="#afafaf" style={{ marginTop: 340 }}/>
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
    fontSize: 35,
    color: "white",
    alignSelf: "center",
    color: "white",
    marginBottom: 40,
    fontFamily:'FuturaPTBold'
  },
  input: {
    backgroundColor: '#f4511e',
    height: 60,
  },
  button: {
    backgroundColor: 'white',
    width: 175,
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

export default RegistrationScreen;
