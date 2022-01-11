import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import "firebase/database";
const settingFormUtils = require('./settingFormUtils')
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
    if (settingFormUtils.checkForm(email, password, repeatPassword)) {
      var user = firebase.auth().currentUser;
  
      user.updatePassword(password).then(function() {
        navigation.navigate('Settings');
      }).catch(function(error) {
        console.log(error);
      });
      
    }
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
