import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import AccessCodeScreen from './SettingsScreen/AccessCodeScreen/AccessCodeScreen';
import EditCredentialsScreen from './SettingsScreen/EditCredentialsScreen/EditCredentialsScreen';
import reducer from './Redux/reducer';
import Home from './NotificationScreen/Home';
import PaymentsScreen from './PaymentsScreen/PaymentsScreen'
import CalendarScreen from './CalendarScreen/CalendarScreen.js'
import CreditScreen from './PaymentsScreen/CreditScreen/CreditScreen'
import ServicesScreen from './ServicesScreen/ServicesScreen'
import Timetable from './TimetablesScreen/Timetable'



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
    </SettingsStack.Navigator>
  );
}

const PaymentsStack = createStackNavigator();
function PaymentsStackScreen() {
  return (
    <PaymentsStack.Navigator initialRouteName="Payments">
      <PaymentsStack.Screen name="Payments" component={PaymentsScreen}/>
      <PaymentsStack.Screen name="Credit" component={CreditScreen}/>
    </PaymentsStack.Navigator>
  )
}

const TimetablesStack = createStackNavigator();
function TimetablesStackScreen() {
  return (
    <PaymentsStack.Navigator initialRouteName="Timetable">
      <PaymentsStack.Screen name="Timetable" component={Timetable}/>
    </PaymentsStack.Navigator>
  )
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen() {
  return (
    <ServiceStack.Navigator initialRouteName="Services">
      <ServiceStack.Screen name="Services" component={ServicesScreen}/>
      <ServiceStack.Screen name="Payments" options={{ headerShown:false }} component={PaymentsStackScreen}/>
      <ServiceStack.Screen name="Timetables" options={{ headerShown:false }} component={TimetablesStackScreen}/>
    </ServiceStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();


function CoreScreen() {

  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          showLabel: false,
          tabBarIcon: ({ focused, color, size }) => {

            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'

              //lo tengo qui per questo focused magari servirà in futuro
              //iconName = focused ? 'md-browsers' : 'md-browsers';

            } else if (route.name === 'Settings') {
              iconName = 'settings';
            } else if (route.name === 'Services') {
              iconName = 'grid';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Services" component={ServiceStackScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </Provider >
  );
}


export default CoreScreen;