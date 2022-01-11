import * as React from 'react';
import { List } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
require('firebase/auth')

const font = 'FuturaPTMedium';
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
    primary: '#f4511e',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};

const fSize = 24;


export default function ServicesScreen({ navigation }) {

  return (
    <PaperProvider theme={theme}>
      <View>
        <List.Item
          title="Payments"
          titleStyle={{fontSize:fSize}}
          left={props => <List.Icon icon="cash-multiple" />}
          onPress={() => navigation.navigate('Payments')}
        />
        <List.Item
          title="Timetables"
          titleStyle={{fontSize:fSize}}
          left={props => <List.Icon icon="calendar-month-outline" />} 
          onPress={() => navigation.navigate('Timetables')}
        />
        <List.Item
          title="Stock Management"
          titleStyle={{fontSize:fSize}}
          left={props => <List.Icon icon="format-list-checks" />} 
          onPress={() => navigation.navigate('StockManagement')}
        />
        <List.Item
          title="Announcements"
          titleStyle={{fontSize:fSize}}
          left={props => <List.Icon icon="message-alert-outline" />} 
          onPress={() => navigation.navigate('Announcements')}
        />

      </View>
    </PaperProvider>
  );

}
