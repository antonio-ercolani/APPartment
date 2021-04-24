import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function JoinCreateScreen({ navigation }) {

  function navigate(to) {
    if (to === 'new') navigation.navigate('CreateApartmentScreen');
    if (to === 'join') navigation.navigate('JoinApartmentScreen');
  }
  return (
    <View style={styles.main}>

    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('new')}>
        <Text style={styles.buttonText}>NEW APARTMENT</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('join')}>
        <Text style={styles.buttonText}>JOIN APARTMENT</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f4511e",
    flex: 1,
    justifyContent: "center"
  },
  button: {
    backgroundColor: 'white',
    width: 210,
    height: 110,
    borderRadius: 10,
    justifyContent: "center",

  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "black",
    fontFamily: "LemonMilkBold-gx2B3",
    alignSelf: "center"
  },
  container: {
    flexDirection: 'column',
    justifyContent: "space-between",
    height: '50%',
    alignSelf: "center",
  },
  separator: {
    alignSelf: "center",
    width: 210,
    height: 2,
    backgroundColor: "white",
    borderRadius: 34,
  }
});

export default JoinCreateScreen;
