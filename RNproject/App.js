  
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen.js';
import JoinCreateScreen from './screens/JoinCreateScreen/JoinCreateScreen';
import CreateApartmentScreen from './screens/CreateApartmentScreen/CreateApartmentScreen.js';
import LoginScreen from './screens/LoginScreen/login.js';
import JoinApartmentScreen from './screens/JoinScreen/JoinScreen';
import HomeScreen from './screens/HomeScreen/HomeRootScreen';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}  />
                <Stack.Screen name="JoinCreateScreen" component={JoinCreateScreen}  />
                <Stack.Screen name="CreateApartmentScreen" component={CreateApartmentScreen}  />
                <Stack.Screen name="JoinApartmentScreen" component={JoinApartmentScreen}  />
                <Stack.Screen name="HomeScreen" component={HomeScreen}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}