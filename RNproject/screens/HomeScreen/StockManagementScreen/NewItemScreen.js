import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";
require('firebase/auth')
import { CommonActions } from '@react-navigation/native';


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


function NewItemScreen(props) {
  const navigation = useNavigation();
  const username = props.red.username;

  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(false);


  function checkForm() {
    if ((itemName !== "")) {
      //the form is ok
      addItem();
    } else {
      Alert.alert('Attention', 'Please insert an item',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }
/* TROVATA QUESTA FUNZIONE CHE ESISTE GIÀ, QUELLA GIUSTA È DOPO
  function addItem() {
    let currentUser = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items').push();
    ref.set({
      member: currentUser,
      name: itemName,
      timestamp: Date.now()
    });

    setItemName('');
    navigation.dispatch(state => {
      // Remove old stock management screen
      const routes = state.routes.filter(r => r.name !== 'StockManagement');

      //reset navigation state
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
    navigation.navigate("StockManagement");
  }
*/
  function addItem() {
    setLoading(true);
    var newMissingItem = firebase.functions().httpsCallable('stockManagement-newMissingItem');
    newMissingItem({
      item: itemName,
      apartment: props.red.apartment.name,
    }).then((result) => {
      setItemName('');
      navigation.pop(1);
      setLoading(false);
      navigation.navigate("StockManagement");
    });
  }


  return (
    <PaperProvider theme={theme}>
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          label="Item name"
          mode='flat'
          value={itemName}
          onChangeText={itemName => setItemName(itemName)}
          left={<TextInput.Icon name="bookmark-outline" />}
        />
        <View style={styles.container}>
          <View style={styles.rectFiller}></View>
          <TouchableOpacity
            style={styles.rect}
            onPress={() => checkForm()}>
            <Text style={styles.text}>ADD ITEM</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 160 }} />}
      </View>

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 25,
  },
  input: {
    fontSize: 17
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
    width: 100,
    height: 46,
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
  errorMessage: {
    color: "red",
    textAlign: "center"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(NewItemScreen);
