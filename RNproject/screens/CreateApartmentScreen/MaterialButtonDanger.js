import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonDanger(props) {
  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      onPress={() => {props.onClick()}}>
      <Text style={styles.letsGo}>LET&#39;S GO!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  letsGo: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "roboto-500"
  }
});

export default MaterialButtonDanger;
