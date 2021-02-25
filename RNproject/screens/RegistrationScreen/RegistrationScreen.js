import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CupertinoButtonInfo from "./Components/CupertinoButtonInfo.js";
import MaterialRightIconTextbox3 from "./MaterialRightIconTextbox3.js";
import MaterialRightIconTextbox4 from "./MaterialRightIconTextbox4.js";
import MaterialRightIconTextbox5 from "./MaterialRightIconTextbox5.js";
import MaterialRightIconTextbox6 from "./MaterialRightIconTextbox6.js";
import firebase from "firebase/app";
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


function RegistrationScreen({navigation}) {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [errorMessage, setErrorMessage] = useState('');

  function createUser() {
    if (checkForm()) {
     console.log("lozio");
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database()
        .ref('/app/users/' + firebase.auth().currentUser.uid)
        .set({
        username : username
        })
        navigation.navigate('RegistrationCompletedScreen');
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
    <View style={styles.container}>
      <View style={styles.group3}>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo}
          onSignUp={createUser}
        ></CupertinoButtonInfo>
        <View style={styles.group2}>
          <MaterialRightIconTextbox6 
            style={styles.materialRightIconTextbox3} 
            updateText={setUsername}
          ></MaterialRightIconTextbox6>
          <MaterialRightIconTextbox3 
            style={styles.materialRightIconTextbox3} 
            updateText={setEmail}
          ></MaterialRightIconTextbox3>
          <MaterialRightIconTextbox4
            style={styles.materialRightIconTextbox4}
            updateText={setPassword}
          ></MaterialRightIconTextbox4>
          <MaterialRightIconTextbox5
            style={styles.materialRightIconTextbox5}
            updateText={setRepeatPassword}
          ></MaterialRightIconTextbox5>
          <Text></Text>
          <Text style={{color : 'red'}}>{errorMessage}</Text>
        </View>
        <Text style={styles.createNewAccount}>Create new account</Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({      
  container: {
    flex: 1,
    justifyContent: "center"
  },
  group3: {
    width: 301,
    height: 518,
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  cupertinoButtonInfo: {
    width: 220,
    height: 60
  },
  group2: {
    width: 301,
    height: 204,
    justifyContent: "space-between"
  },
  materialRightIconTextbox3: {
    height: 40,
    width: 300
  },
  materialRightIconTextbox4: {
    height: 40,
    width: 300
  },
  materialRightIconTextbox5: {
    height: 40,
    width: 300
  },
  createNewAccount: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 27
  }
});

export default RegistrationScreen;
