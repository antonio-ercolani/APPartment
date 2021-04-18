import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import "firebase/database";
import { DataTable } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
};


function StockManagementScreen(props) {
  const navigation = useNavigation();

  const items = [];
  const [renderList, setRenderList] = useState([]);
  const [missingItems, setMissingItems] = useState([]);

  const members = props.red.apartment.members;
  let name;
  let member;
  let date;
  let timestamp, day, month, year;

  useEffect(() => {
    firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items/').get()
      .then((result) => {
        setMissingItems(result.val());
      })
  }, []);

  useEffect(() => {if (missingItems.length !== 0) {
    items.push(
      
    )
  }
    if (missingItems.length !== 0) {
      items.push(
        <View key={1} >
          <View style={styles.separator}></View>
          <Text style={styles.missingItemsTitle}>MISSING ITEMS</Text>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Inserted by</DataTable.Title>
            <DataTable.Title numeric>Missing from</DataTable.Title>
          </DataTable.Header>
        </View>
      )
    }
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
    
    setRenderList(items);
  }, [missingItems])


  function goToNewItem() {
    navigation.navigate('NewItem');
  }

  function goToRemoveItems() {
    const vett = [];
    function Item(name, id) {
      this.name = name;
      this.id = id;
    }
    firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items/').get()
      .then((snapshot) => {
        snapshot.forEach(child => {
          vett.push(new Item(child.val().name, child.key));
        })
        navigation.navigate('RemoveItems', { items: vett })
      })
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNewItem()}>
            <Text style={styles.buttonText}>ADD {'\n'}ITEM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToRemoveItems()}>
            <Text style={styles.buttonText}>REMOVE {'\n'}ITEMS </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <DataTable>            
            {renderList}
          </DataTable>
        </View>

      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#f4511e',
    width: '40%',
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    marginLeft: 12
  },
  separator: {
    width: 290,
    alignSelf: 'center',
    height: 2,
    marginTop: 20,
    backgroundColor: "#8F8F8F"
  },
  missingItemsTitle: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "#f4511e",
    marginTop: 20
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(StockManagementScreen);
