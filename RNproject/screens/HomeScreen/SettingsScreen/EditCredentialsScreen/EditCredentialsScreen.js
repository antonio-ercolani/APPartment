import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIconTextbox from "./components/MaterialIconTextbox";
import MaterialIconTextbox1 from "./components/MaterialIconTextbox1";
import MaterialIconTextbox2 from "./components/MaterialIconTextbox2";
import MaterialButtonDanger1 from "./components/MaterialButtonDanger1";
import firebase from "firebase/app";
import "firebase/database";

require('firebase/auth')

function EditCredentialsScreen({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [errorMessage, setErrorMessage] = useState('');


  function resetCredentials() {
    if (checkForm()) {
      var user = firebase.auth().currentUser;
      user.updateEmail(email).then(function () {
      }).catch(function (error) {
        //handle error
      });
    
      user.updatePassword(password).then(function() {
      }).catch(function(error) {
        //handle error
      });
      navigation.navigate('Settings');
    }
  }

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

  function checkForm() {
    if ( email === '' || password === '' || repeatPassword === "") {
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
      <View style={styles.group2}>
        <Icon name="md-person" style={styles.icon}></Icon>
        <View style={styles.group}>
          <MaterialIconTextbox
            style={styles.materialIconTextbox}
            updateText={setEmail}
          ></MaterialIconTextbox>
          <MaterialIconTextbox1
            style={styles.materialIconTextbox1}
            updateText={setPassword}
          ></MaterialIconTextbox1>
          <MaterialIconTextbox2
            style={styles.materialIconTextbox2}
            updateText={setRepeatPassword}
          ></MaterialIconTextbox2>
        </View>
        <MaterialButtonDanger1
          style={styles.materialButtonDanger1}
          onResetCredentials={resetCredentials}
        ></MaterialButtonDanger1>
        <Text style={{color : 'red'}}>{errorMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  group2: {
    width: 267,
    height: 459,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center"
  },
  icon: {
    color: "rgba(155,155,155,1)",
    fontSize: 110,
    width: 105,
    height: 120
  },
  group: {
    width: 267,
    height: 161,
    justifyContent: "space-between"
  },
  materialIconTextbox: {
    height: 43,
    width: 267
  },
  materialIconTextbox1: {
    height: 43,
    width: 267
  },
  materialIconTextbox2: {
    height: 43,
    width: 267
  },
  materialButtonDanger1: {
    height: 50,
    width: 170,
    backgroundColor: "rgba(249,99,70,1)",
    borderRadius: 5
  }
});

export default EditCredentialsScreen;
