import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import CupertinoButtonInfo8 from "./Components/CupertinoButtonInfo8.js";



function RegistrationCompletedScreen({navigation}) {

  function navigate(){
    navigation.navigate('JoinCreateScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.loremIpsum}>Registration completed!</Text>
        <CupertinoButtonInfo8
          style={styles.cupertinoButtonInfo8}
          onClick={navigate}
        ></CupertinoButtonInfo8>
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
    width: 316,
    height: 221,
    justifyContent: "space-around",
    alignSelf: "center"
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 44,
    width: 316,
    textAlign: "center",
    fontSize: 27
  },
  cupertinoButtonInfo8: {
    height: 83,
    width: 222,
    alignSelf: "center"
  }
});

export default RegistrationCompletedScreen;
