import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Alert, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";
require('firebase/auth')
import { connect } from 'react-redux';
import { useLinkProps, useNavigation, useRoute } from '@react-navigation/native';


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
    primary: '#f4511e',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};



function SettingsScreen(props) {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View>
          <List.Accordion
            title="Account"
            left={props => <List.Icon icon="account" />}>
            <List.Item
              title={props.red.username}
              description="Username" />
            <List.Item
              title={firebase.auth().currentUser.email}
              description="email" />
            <List.Item
              title="Edit"
              description="Modify email and password"
              onPress={() => navigation.navigate('Edit credentials')}
            />
          </List.Accordion>
          <List.Item
            title="Access code"
            left={props => <List.Icon icon="home-lock" />}
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
        </View>
      </PaperProvider>
    </ScrollView>
  );
}


const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(SettingsScreen);
