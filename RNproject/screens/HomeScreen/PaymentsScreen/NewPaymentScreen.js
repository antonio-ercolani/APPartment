import React, { useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import firebase from "firebase/app";
const paymentsFormUtils = require("./paymentsFormUtils")


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

  //used by the stock management when you add a payment in items removal 
  const defaultDescription = route.params.defaultDescription;

  const [description, setDescription] = useState(defaultDescription);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);


  function createPayment() {
    if (paymentsFormUtils.checkMissingValuesPayment(description, amount)) {
      if (paymentsFormUtils.checkAmountCorrectness(amount)) {
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

  function countMembers() {
    var counter = 0;
    var members = props.red.apartment.members;
    for (var key in members) {
      counter++;
    }
    return counter;
  }

  function sendPayment() {
    membersNum = countMembers();
    setLoading(true);
    var newPayment = firebase.functions().httpsCallable('payments-newPayment');
    newPayment({ description: description, amount: parseInt(amount, 10), apartment: props.red.apartment.name, membersNum : membersNum })
      .then((result) => {
        //if you come from stock management we have to 
        //return to the stock management screen
        let nextScreen = '';
        if (defaultDescription === '') {
          nextScreen = 'Payments';
        } else {
          nextScreen = 'StockManagement';
        }
        navigation.pop(1)
        navigation.navigate(nextScreen);
        setLoading(false);
      })


  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            label="Description"
            multiline={true}

            mode='flat'
            value={description}
            onChangeText={description => setDescription(description)}
            left={<TextInput.Icon name="message-text-outline" />}
          />
          <TextInput
            label="Amount"
            style={{ fontSize: 17 }}
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
              onPress={() => createPayment()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
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
    marginVertical: 20,
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
