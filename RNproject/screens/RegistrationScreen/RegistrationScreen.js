import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import "firebase/database";

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
var database = firebase.database();

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

  function createUser() {
    if (checkForm()) {
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database()
        .ref('/app/users/' + firebase.auth().currentUser.uid)
        .set({
        username : username,
        apartment : false
        })
        navigation.navigate('JoinCreateScreen');
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
      });
    } 
  }

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

  function checkForm() {
    if (username === '' || email === '' || password === '' || repeatPassword === "") {
      setErrorMessage('Please complete all fields to continue');
      return false;
    } else if (!re.test(email)){   
      setErrorMessage('Please insert a valid email');
      return false;
    } else if (password !== repeatPassword) {
      setErrorMessage('Those passwords didn\'t match, try again');
      return false;
    } else if (password.length < 6) {
      setErrorMessage('Your password must lenght at least 6 characters');
      return false;
    } else return true;
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
