import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
require('firebase/auth')
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
        <Text style={styles.buttonText}>{'NEW'}</Text>
        <Text style={styles.buttonText1}>{'APARTMENT'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('join')}>
        <Text style={styles.buttonText}>{'JOIN'}</Text>
        <Text style={styles.buttonText1}>{'APARTMENT'}</Text>
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
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "black",
    fontFamily: "FuturaPTBold",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText1: {
    fontSize: 20,
    color: "black",
    fontFamily: "FuturaPTBold",
    alignSelf: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: 'column',
    justifyContent: "space-around",
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
