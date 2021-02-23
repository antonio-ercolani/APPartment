import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CupertinoButtonInfo9 from "./CupertinoButtonInfo9";
import CupertinoButtonInfo10 from "./CupertinoButtonInfo10";

function JoinCreateScreen({navigation}) {

  function navigate(to){
    if (to === 'new') navigation.navigate('CreateApartmentScreen');
    if (to === 'join') navigation.navigate('RegistrationCompletedScreen');
  }
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <CupertinoButtonInfo9
          style={styles.cupertinoButtonInfo9}
          onClick={navigate}
        ></CupertinoButtonInfo9>
        <CupertinoButtonInfo10
          style={styles.cupertinoButtonInfo10}
          onClick={navigate}
        ></CupertinoButtonInfo10>
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
    width: 199,
    height: 498,
    justifyContent: "space-around",
    alignSelf: "center"
  },
  cupertinoButtonInfo9: {
    height: 152,
    width: 197
  },
  cupertinoButtonInfo10: {
    height: 156,
    width: 199
  }
});

export default JoinCreateScreen;
