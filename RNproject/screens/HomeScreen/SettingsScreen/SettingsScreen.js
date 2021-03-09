import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Alert,TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import firebase from "firebase/app";
require('firebase/auth')

export default function SettingsScreen({ navigation }) {
  const { colors } = useTheme();

    return (
      <View>
        <List.Accordion 
          title="Account"
          titleStyle={{color : "black"}}
          left={props => <List.Icon icon="account" />}>
            <List.Item 
              title="Tony"
              description="Username"/>
            <List.Item 
              title="tony@mail.it"
              description="email"/>
            <List.Item 
              title="Edit"
              left={props => <List.Icon icon="pencil"/>}
              onPress = {() => navigation.navigate('Edit credentials')}
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
          onPress = {() => navigation.navigate('Access code')}
        />
        <List.Item
          title="Logout"
          left={props => <List.Icon icon="logout" />}
          onPress={() =>
            Alert.alert('Logout','Please confirm',
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
    );
}
