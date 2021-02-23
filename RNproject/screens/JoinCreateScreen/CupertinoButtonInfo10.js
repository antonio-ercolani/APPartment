import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo10(props) {
  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      onPress={() =>  props.onClick('join')}>
        <Text style={styles.join2}>JOIN</Text>
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
  join2: {
    color: "#fff",
    fontSize: 33,
    textAlign: "center"
  }
});

export default CupertinoButtonInfo10;
