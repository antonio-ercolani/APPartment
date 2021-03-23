import React, { useState,Component } from "react";
import { View, Alert, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { List,Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
import Icon from 'react-native-vector-icons/Ionicons'

//selezionare se coinvolge tutti o solo alcuni, descrizione, periodo
//inizio e fine e periodicità

function CreateTimetable(props) {
  let [checked, setChecked] = useState([])
  const items = [];
  var i=0;
  const members = props.red.apartment.members;
  for (var member in members) {
    if (Object.prototype.hasOwnProperty.call(members, member)) {
        items.push(
          <Text key={i}>{member}</Text>
        )
        i++;
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.involving}>Involving </Text>
      {items}
      <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
      <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  involving: {
    fontFamily: "sans-serif-medium",   
    color: "#121212",
    fontSize: 20,
    marginTop: 70,
    marginLeft: 129
  }
});

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps) (CreateTimetable);