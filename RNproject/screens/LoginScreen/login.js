import React, { useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

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

function Login({ navigation }) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [errorMessage, setErrorMessage] = useState('');



  var hasApartment = firebase.functions().httpsCallable('hasApartment');

  function login() {
    console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(() => {
        hasApartment().then((result) => {
          if (result.data.text === "yes") {
            navigation.navigate('HomeScreen')
          } else if (result.data.text === "no") {
            navigation.navigate('JoinCreateScreen');
          } else {
            console.log('error, hasApartment returned neither yer nor no');
          }
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(errorMessage);
      });
  }

  function register() {
    navigation.navigate('RegistrationScreen');
  }

  function hidePassword(password) {
    var len = password.length;
    var res = '';
    for (let i = 0; i < len; i++) {
      res = res.concat('*');
    }
    return res;
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <PaperProvider theme={theme}>
          <View style={styles.margin}>
            <Text style={styles.login}>APPartment</Text>
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
              onChangeText={password => setPassword(password)}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <View>
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => login()}>
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => register()}>
                  <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
              </View>
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
    alignSelf: "center",
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
    width: 175,
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
    flexDirection: 'column',
    justifyContent: "space-between",
    height: 200,
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

export default Login;
