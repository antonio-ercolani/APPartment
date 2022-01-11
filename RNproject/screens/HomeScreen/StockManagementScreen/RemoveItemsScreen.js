import React, { useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';
import {  DefaultTheme, Provider as PaperProvider, configureFonts, Checkbox } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";
require('firebase/auth')
import { DataTable } from 'react-native-paper';


const font = 'FuturaPTDemi';
const fontConfig = {
  default: {
    regular: {
      fontFamily: font,
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};



function RemoveItemsScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);

  const items = [];
  const missingItems = route.params.items;

  //initialize the hook array for the checkboxes
  let array = new Array(missingItems.length);
  array.fill(false);
  let [checked, setChecked] = useState(array);


  missingItems.map((item, index) => {
    items.push(
      <DataTable.Row key={index}>
        <DataTable.Cell>{item.name}</DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: "center" }}>
          <Checkbox
            status={checked[index] ? 'checked' : 'unchecked'}
            onPress={() => { toggle(index) }}
            color='#f4511e'
          />
        </DataTable.Cell>
      </DataTable.Row>)
  })

  function toggle(index) {
    let boxes;
    boxes = [...checked];
    boxes[index] = !boxes[index]
    setChecked(boxes);
  }

  function removeOrPayment() {
    const removedItems = [];
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) removedItems.push(missingItems[i]);
    }
    if (removedItems.length !== 0) {
      Alert.alert('Items Removal', 'Add a payment for the removed items?',
        [
          {
            text: "YES",
            onPress: () => {

              //build the payment description
              const names = [];
              removedItems.forEach((element) => {
                names.push(element.name);
              })
              let defaultDescription = 'Purchased ' + names.join(', ');
              navigation.navigate('NewPayment', { defaultDescription: defaultDescription });
              removeItems(removedItems,"addPayment");
            }
          },
          {
            text: "JUST REMOVE",
            onPress: () => {
              setLoading(true);
              removeItems(removedItems, 'justRemove');
            }
          }
        ],
        { cancelable: true }
      )
    } else {
      Alert.alert('Attention', 'Please select a product',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function removeItems(removedItems, origin) {
    var removeItems = firebase.functions().httpsCallable('stockManagement-removeItems');
    removeItems({ removedItems: removedItems, apartment: props.red.apartment.name })
      .then((result) => {
        setChecked([]);
        if (origin === "justRemove") {
          navigation.pop(1);
          navigation.navigate("StockManagement");
          setLoading(false);
        }
      })
  }


  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <View style={styles.main}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric>Tick the purchased items</DataTable.Title>
            </DataTable.Header>
            {items}
          </DataTable>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => removeOrPayment()}>
              <Text style={styles.text}>REMOVE ITEMS</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 10,
    marginBottom: 15
  },
  input: {
    marginVertical: 0
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  rectFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rect: {
    width: 135,
    height: 50,
    backgroundColor: "#f4511e",
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "FuturaPTBold"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(RemoveItemsScreen);
