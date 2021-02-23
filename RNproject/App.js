  
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './screens/RegistrationScreen/RegistrationScreen.js';
import RegistrationCompletedScreen from './screens/RegistrationCompletedScreen/RegistrationCompletedScreen';
import JoinCreateScreen from './screens/JoinCreateScreen/JoinCreateScreen';
import CreateApartmentScreen from './screens/CreateApartmentScreen/CreateApartmentScreen.js';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="RegistrationScreen">
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}  />
                <Stack.Screen name="RegistrationCompletedScreen" component={RegistrationCompletedScreen} />
                <Stack.Screen name="JoinCreateScreen" component={JoinCreateScreen}  />
                <Stack.Screen name="CreateApartmentScreen" component={CreateApartmentScreen}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}