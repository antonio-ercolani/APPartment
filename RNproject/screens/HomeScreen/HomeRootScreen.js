import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import AccessCodeScreen from './SettingsScreen/AccessCodeScreen/AccessCodeScreen';
import EditCredentialsScreen from './SettingsScreen/EditCredentialsScreen/EditCredentialsScreen';
import reducer from './Redux/reducer';
import Home from './NotificationScreen/Home';
import PaymentsScreen from './PaymentsScreen/PaymentsScreen'
import CalendarScreen from './CalendarScreen/CalendarScreen.js'



const store = createStore(reducer);


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}


const HomeStack = createStackNavigator();

function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" navigation={navigation} component={Home} />
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
      <SettingsStack.Screen name="Edit credentials" component={EditCredentialsScreen} />
      <SettingsStack.Screen name="Payments" component={PaymentsScreen} />
      <SettingsStack.Screen name="Calendar" component={CalendarScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();


function SchermataProva() {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}


export default SchermataProva;