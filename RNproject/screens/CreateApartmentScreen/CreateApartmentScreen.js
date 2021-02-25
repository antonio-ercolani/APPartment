import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialRightIconTextbox6 from "./Components/MaterialRightIconTextbox6";
import CupertinoButtonInfo from "./Components/CupertinoButtonInfo";

function CreateApartmentScreen({navigation}) {

  let [apartmentName, setApartmentName] = setState('');

  function navigate() {
    navigation.navigate('JoinCreateScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.createNewApartment}>Create new apartment</Text>
        <MaterialRightIconTextbox6
          style={styles.materialRightIconTextbox6}
          updateText={setApartmentName}
        ></MaterialRightIconTextbox6>
        <CupertinoButtonInfo
          style={styles.cupertinoButtonInfo1}
          onClick={createApartment}
        ></CupertinoButtonInfo>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  group: {
    width: 357,
    height: 481,
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center"
  },
  createNewApartment: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 27,
    height: 33,
    width: 267
  },
  materialRightIconTextbox6: {
    height: 102,
    width: 281,
    borderWidth: 9,
    borderColor: "rgba(249,99,70,1)",
    borderRadius: 100
  },
  cupertinoButtonInfo1: {
    width: 220,
    height: 60
  }
});

export default CreateApartmentScreen;
