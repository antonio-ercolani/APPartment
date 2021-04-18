import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';

//TODO 
// ELIMINARE BALANCE E TUTTI I RIMANDI VISTO CHE È 
// STAT INCLUSA IN QUESTA SCHERMATA 

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
  //fonts: configureFonts(fontConfig),

};

var balanceColor = 'rgba(64,144,120,1)';

var totalDebt = 0;


function PaymentsScreen(props) {
  const navigation = useNavigation(); 
  const [debts, setDebts] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  items.push();
  let apartmentName = props.red.apartment.name;


  var findDebts = firebase.functions().httpsCallable('payments-findDebts');

  useEffect(() => {
    findDebts({ apartment: apartmentName })
    .then((result) => {
      var res = JSON.parse(result.data);
      setDebts(res);
    })
  }, []);

  useEffect(() => {
    let i = 0;
    if (debts.length !== 0) items.push(<Text key={i} style={styles.balanceTitle}>PERSONAL BALANCE</Text>);
    i++;
    debts.forEach((debt) => {
      var amount = debt.amount.toString();
      if (debt.uid === "Total debt") {
        totalDebt = amount;
  
        if (totalDebt >= 0) {
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
              <Text style={[styles.amount,{ color: "rgba(167,41,60,1)"}]} >{amount} €</Text>
            }
          ></List.Item>);
  
      } else if (amount > 0) {
        items.push(
          <List.Item
            key={i}
            title={props.red.apartment.members[debt.uid]}
            left={props => <List.Icon color="rgba(64,144,120,1)" icon="arrow-up-thick"/>}
            right={props => <Text style={[styles.amount,{ color: "rgba(64,144,120,1)"}]}>{amount} €</Text>}
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
    if (debts.length !== 0) {
      items.push(
        <View key={i + 1} >
          <View style={styles.separator}></View>
          <List.Item
            key={i}
            title="OVERALL BALANCE"
            titleStyle={styles.title}
            left={props => <List.Icon icon="scale-balance" />}
            right={props => <Text style={[styles.amount, { color: balanceColor }]}>{totalDebt} €</Text>}
          ></List.Item>
        </View>
      )
    }
    setRenderList(items);
  }, [debts])

  function goToBalance() {
    var findDebts = firebase.functions().httpsCallable('payments-findDebts');
    let apartmentName = props.red.apartment.name;
    //get the current user credits
    findDebts({ apartment: apartmentName })
      .then((result) => {
        var res = JSON.parse(result.data);        
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
    <ScrollView>
      <PaperProvider theme={theme}>
    
        <View>
          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => goToNewPayment()}>
              <Text style={styles.buttonText}>NEW PAYMENT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => goToDebtPayOff()}>
              <Text style={styles.buttonText}>DEBT {'\n'}PAY OFF</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.separator,{marginTop: 30, marginBottom: 30}]}></View>
        

        {renderList}
      </PaperProvider>
    </ScrollView>
  );
}

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
  containerText: {
    fontSize: 17,
    fontFamily: "sans-serif-medium",
    color: "#fff"
  },
  containerTextTotalDebt: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    color: "#fff"
  },
  overallBalance: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold", 
    color: "#636363",
    justifyContent: "center",
    flex: 1
  },
  overallBalanceContainer: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    color: "#f4511e",
    fontFamily: "sans-serif-medium"
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
  balanceTitle: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "#f4511e"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(PaymentsScreen);
