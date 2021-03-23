import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonDanger1(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => {props.creditPressed()}}>
      <Text style={styles.debt}>DEBT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  debt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: "roboto-700"
  }
});

export default CupertinoButtonDanger1;
