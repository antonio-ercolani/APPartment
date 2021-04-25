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




export default function ServicesScreen({ navigation }) {

  return (
    <PaperProvider theme={theme}>
      <View>
        <List.Item
          title="Payments"
          left={props => <List.Icon icon="cash-multiple" />}
          onPress={() => navigation.navigate('Payments')}
        />
        <List.Item
          title="Timetables"
          //trova una icona per il calendario visto che comunque servirà a una certa
          //https://callstack.github.io/react-native-paper/icons.html
          //e clicca su "See the list of supported icons"
          left={props => <List.Icon icon="calendar-month-outline" />} 
          onPress={() => navigation.navigate('Timetables')}
        />
        <List.Item
          title="Stock Management"
          left={props => <List.Icon icon="format-list-checks" />} 
          onPress={() => navigation.navigate('StockManagement')}
        />
        <List.Item
          title="Announcements"
          left={props => <List.Icon icon="message-alert-outline" />} 
          onPress={() => navigation.navigate('Announcements')}
        />
      </View>
    </PaperProvider>
  );
}
