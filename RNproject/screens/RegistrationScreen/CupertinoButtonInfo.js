import React, { Component, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo(props) {

  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      onPress={() => {props.onSignUp()}}
      ><Text style={styles.signUp}
      >SIGN UP</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(249,99,70,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  signUp: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center"
  }
});

export default CupertinoButtonInfo;
