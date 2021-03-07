import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingsScreen from './SettingsScreen/SettingsScreen';
import AccessCodeScreen from './SettingsScreen/AccessCodeScreen/AccessCodeScreen';
//import EditCredentialsScreen from './SettingsScreen/EditCredentialsScreen/EditCredentialsScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
        <Text>
          <Icon name="bug" size={30} color="#900" />
        </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Access code" component={AccessCodeScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function SchermataProva() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          showLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            /*
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'md-browsers' : 'md-browsers';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'md-browsers' : 'md-browsers';
            }
            */
            // You can return any component that you like here!
            return <Icon name='gear' size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
  );
}