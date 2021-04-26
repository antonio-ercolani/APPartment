import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import firebase from "firebase/app";

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


function NewPaymentScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const defaultDescription = route.params.defaultDescription;

  const [description, setDescription] = useState(defaultDescription);
  const [amount, setAmount] = useState('');


  function checkForm() {
    if ((description !== "") && (amount !== "")) {
      if ((!isNaN(amount)) && (parseInt(amount, 10) > 0)) {
        //the form is ok
        sendPayment();
      } else {
        Alert.alert('Attention', 'Please insert a valid amount',
          [{ text: "Ok" }],
          { cancelable: true }
        )
      }
    } else {
      Alert.alert('Attention', 'Please complete all the fields to continue',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function sendPayment() {
    var newPayment = firebase.functions().httpsCallable('payments-newPayment');
    newPayment({ description: description, amount: parseInt(amount, 10), apartment: props.red.apartment.name })
      .then((result) => {
        //error handling 
      })
    navigation.navigate('Payments');
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            label="Description"
            multiline= {true}
            mode='flat'
            value={description}
            onChangeText={description => setDescription(description)}
            left={<TextInput.Icon name="message-text-outline" />}
          />
          <TextInput
            label="Amount"
            mode='flat'
            value={amount}
            onChangeText={amount => setAmount(amount)}
            left={<TextInput.Icon name="cash" />}
            right={<TextInput.Icon name="currency-eur" size={20} />}
          />
          <View style={styles.container}>
            <View style={styles.rectFiller}></View>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => checkForm()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 5,
  },
  input: {
    marginVertical: 20
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
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "FuturaPTBold"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(NewPaymentScreen);
