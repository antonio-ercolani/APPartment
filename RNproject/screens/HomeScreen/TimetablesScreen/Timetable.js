import React, { Component } from "react";
import { View, Alert, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';



function Timetable() {
  const navigation = useNavigation(); 

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Timetable creation')} style={styles.icon1}>
            <Icon size={64} name='add' color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon2}>
            <Icon style={styles.icon} size={64} name='trash' color="white"></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 35,
    alignSelf: "stretch",
    flex: 0.09,
    padding: 15
  },
  icon1: {
    width: 75,
    height: 75,
    backgroundColor: "#f4511e",
    borderRadius: 7,
    marginRight: 45,
    marginBottom: 40,
    marginLeft: 45,
    alignItems: "center",
    paddingLeft: 6,
  },
  icon2: {
    width: 75,
    height: 75,
    backgroundColor: "#f4511e",
    borderRadius: 7,
    marginRight: 45,
    marginBottom: 40,
    marginLeft: 45,
    alignItems: "center",
    paddingLeft: 2
  },
  list: {
    backgroundColor: "rgba(122,120,120,1)",
    marginTop: 35,
    alignSelf: "stretch",
    flex: 0.91
  }
});


export default Timetable;