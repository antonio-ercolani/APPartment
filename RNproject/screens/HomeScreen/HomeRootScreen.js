import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import AccessCodeScreen from './SettingsScreen/AccessCodeScreen';
import EditCredentialsScreen from './SettingsScreen/EditCredentialsScreen';
import reducer from './Redux/reducer';
import Home from './NotificationScreen/Home';
import PaymentsScreen from './PaymentsScreen/PaymentsScreen'
import CalendarScreen from './CalendarScreen/CalendarScreen.js'
import ServicesScreen from './ServicesScreen/ServicesScreen'
import Timetable from './TimetablesScreen/Timetable'
import CreateTimetable from './TimetablesScreen/CreateTimetable'
import NewPaymentScreen from './PaymentsScreen/NewPaymentScreen.js';
import DebtPayOffScreen from './PaymentsScreen/DebtPayOffScreen.js';
import StockManagementScreen from './StockManagementScreen/StockManagementScreen';
import NewItemScreen from './StockManagementScreen/NewItemScreen';
import RemoveItemsScreen from './StockManagementScreen/RemoveItemsScreen';
import AnnouncementsScreen from './AnnouncementsScreen/AnnouncementsScreen';
import NewAnnouncementScreen from './AnnouncementsScreen/NewAnnouncementScreen';
import CreateSingleEvent from './TimetablesScreen/CreateSingleEvent';

const store = createStore(reducer);


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}


const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
        headerLeft: null
      }}>
      <HomeStack.Screen name="Home" navigation={navigation} component={Home} options={{ title: 'Home' }}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Access code" component={AccessCodeScreen} options={{ title: 'Settings' }} />
      <SettingsStack.Screen name="Edit credentials" component={EditCredentialsScreen} options={{ title: 'Settings' }} />
    </SettingsStack.Navigator>
  );
}

const PaymentsStack = createStackNavigator();

function PaymentsStackScreen() {
  return (
    <PaymentsStack.Navigator initialRouteName="Payments"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <PaymentsStack.Screen name="Payments" component={PaymentsScreen} />
      <PaymentsStack.Screen options={{ title: 'New Payment' }} name="NewPayment" component={NewPaymentScreen} />
      <PaymentsStack.Screen options={{ title: 'Debt Pay Off' }} name="DebtPayOff" component={DebtPayOffScreen} />
    </PaymentsStack.Navigator>
  )
}

const AnnouncementsStack = createStackNavigator();

function AnnouncementsStackScreen() {
  return (
    <AnnouncementsStack.Navigator initialRouteName="Announcements"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <AnnouncementsStack.Screen name="Announcements" component={AnnouncementsScreen} />
      <AnnouncementsStack.Screen options={{ title: 'New Announcement' }} name="NewAnnouncement" component={NewAnnouncementScreen} />
    </AnnouncementsStack.Navigator>
  )
}

const StockManagementStack = createStackNavigator();

function StockManagementStackScreen() {
  return (
    <StockManagementStack.Navigator initialRouteName="StockManagement"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <StockManagementStack.Screen name="StockManagement" component={StockManagementScreen} />
      <StockManagementStack.Screen options={{ title: 'New Missing Item' }} name="NewItem" component={NewItemScreen} />
      <StockManagementStack.Screen options={{ title: 'Remove Items' }} name="RemoveItems" component={RemoveItemsScreen} />
      <StockManagementStack.Screen options={{ title: 'New Payment' }} name="NewPayment" component={NewPaymentScreen} />
    </StockManagementStack.Navigator>
  )
}

const TimetablesStack = createStackNavigator();
function TimetablesStackScreen() {
  return (
    <TimetablesStack.Navigator initialRouteName="Timetable"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <TimetablesStack.Screen name="Timetable" component={Timetable} />
      <TimetablesStack.Screen name="Timetable creation" component={CreateTimetable} />
      <TimetablesStack.Screen name="Create event" component={CreateSingleEvent} />
    </TimetablesStack.Navigator>
  )
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen() {
  return (
    <ServiceStack.Navigator initialRouteName="Services"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 23,
          fontFamily: 'FuturaPTBold'
        },
      }}>
      <ServiceStack.Screen name="Services" component={ServicesScreen} />
      <ServiceStack.Screen name="Payments" options={{ headerShown: false }} component={PaymentsStackScreen} />
      <ServiceStack.Screen name="StockManagement" options={{ headerShown: false }} component={StockManagementStackScreen} />
      <ServiceStack.Screen name="Timetables" options={{ headerShown: false }} component={TimetablesStackScreen} />
      <ServiceStack.Screen name="Announcements" options={{ headerShown: false }} component={AnnouncementsStackScreen} />
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
          activeTintColor: '#f4511e',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontFamily: "FuturaPTBold"
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Services" component={ServiceStackScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </Provider >
  );
}


export default CoreScreen;