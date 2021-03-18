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
        <List.Item
          title="Payments"
          left={props => <List.Icon icon="cash-multiple" />}
          onPress={() => navigation.navigate('Payments')}
        />
        <List.Item
          title="Calendar"
          //trova una icona per il calendario visto che comunque servirà a una certa
          //https://callstack.github.io/react-native-paper/icons.html
          //e clicca su "See the list of supported icons"
          left={props => <List.Icon icon="calendar-month-outline" />} 
          onPress={() => navigation.navigate('Calendar')}
        />
      </View>
    </PaperProvider>
  );
}
