import React, { useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
require('firebase/auth')
import { useNavigation} from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import firebase from "firebase/app";
const announcementFormUtils = require('./announcementFormUtils')

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

function NewAnnouncementScreen(props) {
  const navigation = useNavigation();

  const [announcement, setAnnouncement] = useState('');
  const [loading, setLoading] = useState(false);


  function createAnnouncement() {
    if (announcementFormUtils.checkForm(announcement)) {
      setLoading(true);
      sendNewAnnouncement();
  } else {
    Alert.alert('Attention', 'Please fill the form to continue',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function sendNewAnnouncement() {
    var newAnnouncement = firebase.functions().httpsCallable('announcements-newAnnouncement');
    newAnnouncement({ announcement: announcement, apartment: props.red.apartment.name })
      .then((result) => {
        navigation.pop(1);
        navigation.navigate("Announcements");
        setAnnouncement('');
        setLoading(false);
      }).catch((err) => {
        console.log(err)
      });
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
              onPress={() => createAnnouncement()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 5,
  },
  input: {
    marginVertical: 20,
    fontSize: 17
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
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "FuturaPTBold"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(NewAnnouncementScreen);
