import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import "firebase/database";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
};


function StockManagementScreen(props) {
  const navigation = useNavigation(); 
  
  function goToNewItem() {
    navigation.navigate('NewItem');
  }

  function goToMissingList() {
    firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items/').get()
    .then((snapshot) => {
      navigation.navigate('MissingList',{items:snapshot.val()})
    })
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
      navigation.navigate('RemoveItems',{items:vett})
    })
  }

  return (
    <PaperProvider theme={theme}>
      <View>
        <List.Item
          title="Report missing item"
          description="Insert a new missing item"
          left={props => <List.Icon icon="plus-circle-outline" />}
          onPress={() => goToNewItem()}
        />
        <List.Item
          title="Missing items list"
          description="Check the list of missing items"
          left={props => <List.Icon icon="shopping" />}
          onPress={() => goToMissingList()}
        />
        <List.Item
          title="Remove items"
          description="Remove purchased items from the missing list"
          left={props => <List.Icon icon="cart-remove" />}
          onPress={() => goToRemoveItems()}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(StockManagementScreen);
