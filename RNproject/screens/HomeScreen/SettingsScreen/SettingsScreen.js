import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Alert,TouchableOpacity, StyleSheet, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";
require('firebase/auth')

/*
const fontConfig = {
  default: {
    regular: {
      fontWeight: 'normal',
      fontSize:12,
      //backgroundColor: 'white'
    },
  },
};
*/


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
  //fonts: configureFonts(fontConfig),

};




export default function SettingsScreen({ navigation }) {

  return (
    <PaperProvider theme={theme}>
      <View>
        <List.Accordion
          title="Account"
          left={props => <List.Icon icon="account"/>}>
          <List.Item
            title="Tony"
            description="Username" />
          <List.Item
            title="tony@mail.it"
            description="email" />
          <List.Item
            title="Edit"
            left={props => <List.Icon icon="pencil" />}
            onPress={() => navigation.navigate('Edit credentials')}
          />
        </List.Accordion>
        <List.Item
          title="Apartment settings"
          description=""
          left={props => <List.Icon icon="home" />}
        />
        <List.Item
          title="Access code"
          left={props => <List.Icon icon="security" />}
          onPress={() => navigation.navigate('Access code')}
        />
        <List.Item
          title="Logout"
          left={props => <List.Icon icon="logout" />}
          onPress={() =>
            Alert.alert('Logout', 'Please confirm',
              [
                {
                  text: "CONFIRM",
                  onPress: () => {
                    firebase.auth().signOut().then(() => {
                      navigation.navigate('Login');
                    }).catch((error) => {
                      //logout error
                    });
                  }
                },
                {
                  //non fa niente
                  text: "CANCEL",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
              ],
              { cancelable: true }
            )
          }
        />
        <Text style={styles.text}>Copyright © nomeapp</Text>
        <Text style={styles.text1}>CEOs and Founders</Text>
        <Text style={styles.text1}>Antonio Ercolani {'&'} Riccardo Nannini</Text>
      </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginTop: 90,
    fontSize: 13,
    fontFamily: "sans-serif",
    color: "#000000"
  },
  text1: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 13,
    fontFamily: "sans-serif",
    color: "#000000"
  },
})