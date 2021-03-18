import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MaterialRightIconTextbox from "./Components/MaterialRightIconTextbox";
import CupertinoButtonInfo from "./Components/CupertinoButtonInfo";
import firebase from "firebase/app";

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

function Login({navigation}) {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [errorMessage, setErrorMessage] = useState('');


  function updateEmail(text) {
    setEmail(text);
  }

  function updatePassword(text) {
    setPassword(text);
  }

  var hasApartment = firebase.functions().httpsCallable('hasApartment');

  function login() {
    firebase.auth().signInWithEmailAndPassword( "riccardo1.nannini@mail.polimi.it", "Ciccio1234")
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

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Image
          source={require("../../assets/images/home-icon.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <MaterialRightIconTextbox
          style={styles.materialRightIconTextbox}
          updateText={updateEmail}
        ></MaterialRightIconTextbox>
        <MaterialRightIconTextbox
          style={styles.materialRightIconTextbox}
          updateText={updatePassword}
          secureEntry={true}
        ></MaterialRightIconTextbox>
        <Text style={{color : 'red'}}>{errorMessage}</Text>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo}
          text="SIGN IN"
          pressFunc={login}
        ></CupertinoButtonInfo>
        <View style={styles.separator}></View>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo}
          text="SIGN UP"
          pressFunc={register}
        ></CupertinoButtonInfo>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group: {
    width: 312,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 124,
    marginTop: 100,
    alignSelf: "center"
  },
  image: {
    width: 150,
    height: 150
  },
  materialRightIconTextbox: {
    height: 40,
    width: 300
  },
  cupertinoButtonInfo: {
    height: 60,
    width: 220
  },
  separator: {
    width: 270,
    height: 2,
    backgroundColor: "rgba(155,150,150,1)"
  },
});

export default Login;
