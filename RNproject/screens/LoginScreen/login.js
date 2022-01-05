import React, { useState } from "react";
import { StyleSheet, View, Modal, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, STORAGE_BUCKET, SEND_ID, APP_ID } from "@env"

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

function Login({ navigation }) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [errorMessage, setErrorMessage] = useState('');
  let [modalVisible, setModalVisible] = useState(false);

  var hasApartment = firebase.functions().httpsCallable('hasApartment');

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
    }
  });


  function login() {
    setModalVisible(true)
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        setModalVisible(false)
        hasApartment().then((result) => {
          if (result.data.text === "yes") {
            navigation.navigate('HomeScreen')
          } else if (result.data.text === "no") {
            navigation.navigate('JoinCreateScreen');
          } else {
            setModalVisible(false);
            console.log('error, hasApartment returned neither yer nor no');
          }
        });
      })
      .catch((error) => {
        setModalVisible(false);
        setErrorMessage(error.message);
        console.log(errorMessage);
      });

  }

  function register() {
    navigation.navigate('RegistrationScreen');
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
              secureTextEntry
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
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <ActivityIndicator size="large" color="#afafaf" style={{ marginTop: 330 }}/>
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
    fontSize: 60,
    color: "white",
    alignSelf: "center",
    color: "white",
    marginBottom: 40,
    fontFamily: 'FuturaPTCondBoldOblique'
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
