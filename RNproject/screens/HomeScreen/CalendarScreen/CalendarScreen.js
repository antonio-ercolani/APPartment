import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import firebase from "firebase/app";
require('firebase/auth')
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';




export default function CalendarScreen({ navigation }) {

  return (
        <Agenda/>
  );
}
