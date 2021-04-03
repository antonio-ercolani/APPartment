import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
  //fonts: configureFonts(fontConfig),

};




function PaymentsScreen(props) {
  const navigation = useNavigation(); 
  const items = [];
  items.push();

  function goToBalance() {
    var findDebts = firebase.functions().httpsCallable('payments-findDebts');
    let apartmentName = props.red.apartment.name;
    //get the current user credits
    findDebts({ apartment: apartmentName })
      .then((result) => {
        var res = JSON.parse(result.data);
        console.log(res);
        
        navigation.navigate('Balance',{debts:res})
      })
      
  }

  function goToNewPayment() {
    navigation.navigate('NewPayment',{defaultDescription:''});
  }

  function goToDebtPayOff() {
    navigation.navigate('DebtPayOff');
  }

  return (
    <PaperProvider theme={theme}>
      <View>
        <List.Item
          title="Balance"
          description="Check out your debts"
          left={props => <List.Icon icon="scale-balance" />}
          onPress={() => goToBalance()}
        />
        <List.Item
          title="Add new payment"
          description="Register a new purchase"
          left={props => <List.Icon icon="credit-card-plus" />} 
          onPress={() => goToNewPayment()}
        />
        <List.Item
          title="Debt pay off"
          description="Register a debt pay off"
          left={props => <List.Icon icon="equal-box" />} 
          onPress={() => goToDebtPayOff()}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group2: {
    width: 277,
    height: 155,
    marginTop: 30,
    alignSelf: "center"
  },
  group: {
    width: 272,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 2
  },
  cupertinoButtonSuccess1: {
    height: 70,
    width: 120,
    backgroundColor: "rgba(64,144,120,1)"
  },
  cupertinoButtonDanger1: {
    height: 70,
    width: 120,
    backgroundColor: "rgba(167,41,60,1)",
    borderRadius: 5
  },
  cupertinoButtonLight: {
    height: 57,
    backgroundColor: "rgba(249,99,70,1)",
    borderRadius: 5,
    marginTop: 27
  },
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(PaymentsScreen);
