import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo8(props) {
  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      onPress={() => {props.onClick()}}>
        <Text style={styles.clickHereToLogin}>TAP HERE TO LOGIN</Text>
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
  clickHereToLogin: {
    color: "#fff",
    fontSize: 17
  }
});

export default CupertinoButtonInfo8;
