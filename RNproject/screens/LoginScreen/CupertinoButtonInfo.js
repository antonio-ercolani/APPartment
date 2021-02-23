import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo(props) {
  return (
    <TouchableOpacity 
    style={[styles.container, props.style]}
    onPress={props.pressFunc}    
    >
      <Text style={styles.textBox}>{props.text}</Text>
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
  textBox: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    alignSelf: "center",
    width: 100,
    height: 20
  }
});

export default CupertinoButtonInfo;
