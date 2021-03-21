import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View } from "react-native";
import CupertinoButtonSuccess1 from "./components/CupertinoButtonSuccess1";
import CupertinoButtonDanger1 from "./components/CupertinoButtonDanger1";
import CupertinoButtonLight from "./components/CupertinoButtonLight";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';

function PaymentsScreen(props) {
  const navigation = useNavigation(); 

  function goToCredit() {
    var findDebts = firebase.functions().httpsCallable('findDebts');
    let apartmentName = props.red.apartment.name;
    //get the current user credits
    findDebts({ apartment: apartmentName })
      .then((result) => {
        var res = JSON.parse(result.data);
        console.log(res);
        navigation.navigate('Credit',{debts:res})
      })
  }


  return (
    <View style={styles.container}>
      <View style={styles.group2}>
        <View style={styles.group}>
          <CupertinoButtonSuccess1
            style={styles.cupertinoButtonSuccess1}
            creditPressed={goToCredit}
          ></CupertinoButtonSuccess1>
          <CupertinoButtonDanger1
            style={styles.cupertinoButtonDanger1}
          ></CupertinoButtonDanger1>
        </View>
        <CupertinoButtonLight
          style={styles.cupertinoButtonLight}
        ></CupertinoButtonLight>
      </View>
    </View>
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
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(PaymentsScreen);
