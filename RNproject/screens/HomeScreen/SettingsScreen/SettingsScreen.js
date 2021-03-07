import * as React from 'react';
import { List } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

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
              //onPress = {() => navigation.navigate('Edit credentials')}
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
      </View>
    );
  }

