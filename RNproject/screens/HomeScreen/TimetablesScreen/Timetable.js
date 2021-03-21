import * as React from 'react';
import { View, Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';

function Timetable() {
 
  return (
    <PaperProvider>
      <View>
        <Text>Timetable screen</Text>
      </View>
    </PaperProvider>
  );
}


export default Timetable;