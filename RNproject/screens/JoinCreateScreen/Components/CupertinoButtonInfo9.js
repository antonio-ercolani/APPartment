import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo9(props) {
  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      onPress={() =>  props.onClick('new')}>
        <Text style={styles.new2}>NEW</Text>
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
  new2: {
    color: "#fff",
    fontSize: 33,
    fontFamily: "roboto-500",
    textAlign: "center"
  }
});

export default CupertinoButtonInfo9;
