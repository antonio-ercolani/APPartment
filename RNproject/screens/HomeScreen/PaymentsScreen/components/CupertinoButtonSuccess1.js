import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonSuccess1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => {props.creditPressed()}}>
      <Text style={styles.credit}>CREDIT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CD964",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  credit: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: "roboto-700"
  }
});

export default CupertinoButtonSuccess1;
