import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Alert, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";
require('firebase/auth')
import { connect } from 'react-redux';
import { useLinkProps, useNavigation, useRoute } from '@react-navigation/native';


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
const fSize2 = 21;


function SettingsScreen(props) {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View>
          <List.Accordion
            title="Account"
            titleStyle={{fontSize:fSize}}
            left={props => <List.Icon icon="account" />}>
            <List.Item
              titleStyle={{fontSize:fSize2}}            
              title={props.red.username}
              description="Username" />
            <List.Item
              title={firebase.auth().currentUser.email}
              titleStyle={{fontSize:fSize2}}
              description="email" />
            <List.Item
              title="Edit"
              titleStyle={{fontSize:fSize2}}
              description="Modify email and password"
              onPress={() => navigation.navigate('Edit credentials')}
            />
          </List.Accordion>
          <List.Item
            title="Access code"
            titleStyle={{fontSize:fSize}}
            left={props => <List.Icon icon="home-lock" />}
            onPress={() => navigation.navigate('Access code')}
          />
          <List.Item
            title="Logout"
            titleStyle={{fontSize:fSize}}
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
