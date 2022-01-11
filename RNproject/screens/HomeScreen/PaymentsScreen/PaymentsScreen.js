import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { RefreshControl, StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List } from 'react-native-paper';



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

var balanceColor = 'rgba(64,144,120,1)';

var totalDebt = 0;

function PaymentsScreen(props) {
  const navigation = useNavigation();
  const [debts, setDebts] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  let apartmentName = props.red.apartment.name;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  var findDebts = firebase.functions().httpsCallable('payments-findDebts');

  function callGetDebts() {
    findDebts({ apartment: apartmentName })
    .then((result) => {
      var res = JSON.parse(result.data);
      setDebts(res);
      setLoading(false);
    });
  }

  useEffect(() => {
    callGetDebts();
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
          balanceColor = "#188547"
        } else {
          console.log(totalDebt);
          balanceColor = "#c92626"
        }



        //per l'indice delle key che viene aumentato
        //alla fine del for each
        i = i - 1;

      } else if (amount < 0) {
        items.push(
          <List.Item
            key={i}
            descriptionStyle={styles.memberD}
            title={props.red.apartment.members[debt.uid]}
            left={props => <List.Icon color="#c92626" icon="arrow-down-thick" />}
            titleStyle={styles.member}
            description={"You are in debt of " + Math.abs(parseFloat(amount).toFixed(2)) + "€"}
            right={props =>
              <Text style={[styles.amount, { color: "#c92626" }]} >{Math.abs(parseFloat(amount).toFixed(2))} €</Text>
            }
          ></List.Item>);

      } else if (amount > 0) {
        items.push(
          <List.Item
            key={i}
            titleStyle={styles.member}
            descriptionStyle={styles.memberD}
            title={props.red.apartment.members[debt.uid]}
            left={props => <List.Icon color="#188547" icon="arrow-up-thick" />}
            right={props => <Text style={[styles.amount, { color: "#188547" }]}>{Math.abs(parseFloat(amount).toFixed(2))} €</Text>}
            description={"You have to receive " + Math.abs(parseFloat(amount).toFixed(2)) + "€"}
          ></List.Item>);

      } else {
        //amount = 0 
        items.push(
          <List.Item
            key={i}
            titleStyle={styles.member}
            descriptionStyle={styles.memberD}
            title={props.red.apartment.members[debt.uid]}
            left={props => <List.Icon icon="check-bold" />}
            right={props => <Text style={styles.amount}>OK</Text>}
          ></List.Item>);
      }
      i = i + 1;
    })
    if (debts.length !== 0) {
      items.push(
        <View key={i + 1} >
          <View style={styles.separator1}></View>
          <List.Item
            key={i}
            title="BALANCE"
            titleStyle={styles.title}
            left={props => <List.Icon icon="scale-balance" />}
            right={props => <Text style={[styles.amount, { color: balanceColor }]}>{Math.abs(parseFloat(totalDebt).toFixed(2))} €</Text>}
          ></List.Item>
        </View>
      )
    }
    setRenderList(items);
  }, [debts])


  function goToNewPayment() {
    navigation.navigate('NewPayment', { defaultDescription: '' });
  }

  function goToDebtPayOff() {
    navigation.navigate('DebtPayOff');
  }

  return (
    <ScrollView
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={callGetDebts}
    />
    }
    >
      <View style={styles.main}>
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
          <View style={[styles.separator, { marginTop: 30, marginBottom: 30 }]}></View>
          {renderList}
          {loading && <ActivityIndicator size="large" color="#f4511e"/>}
        </PaperProvider>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '4%',
    marginRight: '4%',
  },
  amount: {
    fontSize: 22,
    marginRight: 20,
    marginTop: 15,
    color: "#636363",
    fontFamily: 'FuturaPTDemi'
  },
  separator: {
    width: 270,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#6b6b6b",
    borderRadius: 34,
  },
  separator1: {
    width: '92%',
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#6b6b6b",
    borderRadius: 34,
  },
  badge: {
    alignSelf: 'center',
  },
  overallBalanceContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    backgroundColor: '#f4511e',
    width: 120,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: 270,
    alignSelf: 'center'
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "FuturaPTBold",
    marginLeft: 12
  },
  balanceTitle: {
    textAlign: "center",
    fontFamily: "FuturaPTBold",
    fontSize: 25,
    marginBottom: 10,
    color: "#f4511e"
  },
  member: {
    fontSize: 20
  },
  memberD: {
    fontSize: 15
  },
  title: {
    fontSize: 19
  },
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(PaymentsScreen);
