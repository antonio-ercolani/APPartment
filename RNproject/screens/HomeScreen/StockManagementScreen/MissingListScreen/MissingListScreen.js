import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";
require('firebase/auth')
import { DataTable } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
  },
  //fonts: configureFonts(fontConfig),

};
//TODOTODOTODOTODOTODOTODOTODOTODO
//TODO SE NON CI SONO MISSING ITEMS DICO CHE NON CE NE SONO?
//O LASCIO LA LISTA VUOTA?
function MissingListScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const items = [];
  const missingItems = route.params.items;
  const members = props.red.apartment.members;

  let name;
  let member;
  let date;
  let timestamp, day, month, year; 

  for (var key in missingItems) {
    name = missingItems[key].name;
    member = members[missingItems[key].member];

    timestamp = new Date(missingItems[key].timestamp);
    day = timestamp.getDate();
    month = timestamp.getMonth() + 1;
    year = timestamp.getFullYear();
    date = day + '/' + month + '/' + year;

    items.push(
      <DataTable.Row key={key}>
        <DataTable.Cell>{name}</DataTable.Cell>
        <DataTable.Cell numeric>{member}</DataTable.Cell>
        <DataTable.Cell numeric>{date}</DataTable.Cell>
      </DataTable.Row>)
  }



  return (
    <PaperProvider theme={theme}>
      <ScrollView>
      <View style={styles.main}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Inserted by</DataTable.Title>
            <DataTable.Title numeric>Missing from</DataTable.Title>
          </DataTable.Header>
          {items}

        </DataTable>
      </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(MissingListScreen);
