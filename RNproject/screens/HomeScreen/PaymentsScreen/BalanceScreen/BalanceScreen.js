import * as React from 'react';
import { Component, useState } from "react";
import { View, Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Button, configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';
import { List } from 'react-native-paper';

var balanceColor = 'rgba(64,144,120,1)';

var totalDebt = 0;
var i = 0;

function BalanceScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const items = [];
  const debts = route.params.debts;

  //find a better way for generating the keys

  //pesante da computare???
  debts.forEach((debt) => {
    var amount = debt.amount.toString();
    if (debt.uid === "Total debt") {
      totalDebt = amount;

      if (totalDebt >= 0) {
        console.log(totalDebt)
        balanceColor = "rgba(64,144,120,1)"
      } else {
        console.log(totalDebt);
        balanceColor= "rgba(167,41,60,1)"
      }
      //set the color of the overall balance banner 
      

      //per l'indice delle key che viene aumentato
      //alla fine del for each
      i = i - 1 ;

    } else if (amount < 0) {
      items.push(
        <List.Item
          key={i}
          title={props.red.apartment.members[debt.uid]}
          left={props => <List.Icon color="rgba(167,41,60,1)" icon="arrow-down-thick"/>}
          description={"You are in debt of " + Math.abs(amount) + "€"}
          right={props => 
            <Text style={styles.amount}>{amount} €</Text>
          }
        ></List.Item>);

    } else if (amount > 0) {
      items.push(
        <List.Item
          key={i}
          title={props.red.apartment.members[debt.uid]}
          left={props => <List.Icon color="rgba(64,144,120,1)" icon="arrow-up-thick"/>}
          right={props => <Text style={styles.amount}>{amount} €</Text>}
          description={"You have to receive " + Math.abs(amount) + "€"}
        ></List.Item>);

    } else {
      //amount = 0 
      items.push(
        <List.Item
          key={i}
          title={props.red.apartment.members[debt.uid]}
          left={props => <List.Icon icon="check-bold"/>}
          right={props => <Text style={styles.amount}>OK</Text>}
        ></List.Item>);
    }
    i = i + 1;
  })

  items.push(
    <View key={i+1}>
      <View style={styles.separator}></View>
      <View style={[styles.container,  { backgroundColor: balanceColor }]}>
        <Text style={styles.containerText}>Overall balance</Text>
        <Text style={styles.containerTextTotalDebt}>{totalDebt > 0 ? '+' : ''}{totalDebt} €</Text>
      </View>
    </View>
  )

  return (
    <PaperProvider>
      <View>
        {items}
      </View>
    </PaperProvider>
  );
}

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(BalanceScreen);

const styles = StyleSheet.create({
  amount: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "bold", 
    marginTop: 15,
    color: "#636363",
  },
  separator: {
    width: 290,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#8F8F8F"
  },
  badge: {
    alignSelf: 'center',
  },
  container: {
    marginTop: 40,
    alignSelf: 'center',
    borderRadius: 150,
    height: 80,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 15,
  },
  containerText: {
    fontSize: 17,
    fontFamily: "sans-serif-medium",
    color: "#fff"
  },
  containerTextTotalDebt: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    color: "#fff"
  }
})