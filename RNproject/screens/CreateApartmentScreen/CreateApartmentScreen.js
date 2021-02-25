import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialRightIconTextbox7 from "./MaterialRightIconTextbox7";
import MaterialButtonDanger from "./MaterialButtonDanger";

export default function CreateApartmentScreen({navigation}) {
  let[apartmentName, setApartmentName] = useState('');
  let[errorMessage, setErrorMessage] = useState('');

  function createApartment() {
    console.log(apartmentName);
  }

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.createNewApartment}>Create new apartment</Text>
        <MaterialRightIconTextbox7
          style={styles.materialRightIconTextbox7}
          updateText = {setApartmentName}
        ></MaterialRightIconTextbox7>
        <MaterialButtonDanger
          style={styles.materialButtonDanger}
          onClick = {createApartment}
        ></MaterialButtonDanger>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center"
  },
  group: {
    width: 289,
    height: 401,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  createNewApartment: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 36,
    width: 289,
    fontSize: 27,
    textAlign: "center"
  },
  materialRightIconTextbox7: {
    height: 109,
    width: 251,
    borderWidth: 7,
    borderColor: "rgba(249,99,70,1)",
    borderRadius: 40,
    borderBottomWidth: 7
  },
  materialButtonDanger: {
    height: 67,
    width: 214,
    backgroundColor: "rgba(249,99,70,1)"
  }
});

