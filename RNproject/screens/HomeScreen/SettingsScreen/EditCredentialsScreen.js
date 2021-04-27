import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import "firebase/database";

require('firebase/auth')

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
    primary: 'black',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};

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
      <ScrollView>
        <PaperProvider theme={theme}>
          <View style={styles.margin}>
            <Text style={styles.login}>Edit Credentials</Text>
            <TextInput
              style={styles.input}
              label="email"
              mode='flat'
              value={email}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
              style={styles.input}
              label="password"
              mode='flat'
              value={password}
              secureTextEntry
              onChangeText={password => setPassword(password)}
            />
            <TextInput
              style={styles.input}
              label="repeat password"
              mode='flat'
              value={repeatPassword}
              secureTextEntry
              onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => resetCredentials()}>
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>

          </View>
        </PaperProvider>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 40,
  },
  login: {
    fontSize: 35,
    color: "white",
    alignSelf: "center",
    color: "#f4511e",
    marginBottom: 40,
    fontFamily:'FuturaPTBold'
  },
  input: {
    height: 60,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: '#f4511e',
    width: 175,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: 'FuturaPTBold',
    alignSelf: "center",
    color: "white"
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
    color: "black",
    marginTop: 10,
  }
});
export default EditCredentialsScreen;
