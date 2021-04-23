import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
require('firebase/auth')
import { useNavigation} from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
  },
  //fonts: configureFonts(fontConfig),

};

function NewAnnouncementScreen(props) {
  const navigation = useNavigation();

  const [announcement, setAnnouncement] = useState('');

  function checkForm() {
    if ((announcement !== "")) {
      sendNewAnnouncement();
  } else {
    Alert.alert('Alert', 'Please fill the form to continue',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function sendNewAnnouncement() {
    var newAnnouncement = firebase.functions().httpsCallable('announcements-newAnnouncement');
    newAnnouncement({ announcement: announcement, apartment: props.red.apartment.name })
      .then((result) => {
        //error handling 
      })
    navigation.navigate('Announcements');
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            label="Description"
            mode='flat'
            multiline= {true}
            value={announcement}
            onChangeText={announcement => setAnnouncement(announcement)}
            left={<TextInput.Icon name="message-text-outline" />}
          />
          <View style={styles.container}>
            <View style={styles.rectFiller}></View>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => checkForm()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
  },
  input: {
    marginVertical: 20
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  rectFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rect: {
    width: 100,
    height: 46,
    backgroundColor: "#f4511e",
    marginTop: 20,
    borderRadius: 3,
    justifyContent: "center",
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "sans-serif-medium"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(NewAnnouncementScreen);