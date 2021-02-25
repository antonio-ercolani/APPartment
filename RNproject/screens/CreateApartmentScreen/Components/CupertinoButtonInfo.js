import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo(props) {
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
    backgroundColor: "rgba(249,99,70,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  letsGo: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center"
  }
});

export default CupertinoButtonInfo;
