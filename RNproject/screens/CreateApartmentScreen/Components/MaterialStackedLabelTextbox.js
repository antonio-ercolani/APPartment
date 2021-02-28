import React, { Component, useEffect, useState} from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialStackedLabelTextbox(props) {
  let [text, setText] = useState('');
  useEffect(() => { props.updateText(text) })
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.apartmentName}>Apartment name</Text>
      <TextInput 
        placeholder="" 
        style={styles.inputStyle}
        onChangeText={setText}
        ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent"
  },
  apartmentName: {
    fontFamily: "roboto-300",
    fontSize: 20,
    textAlign: "left",
    color: "rgba(255,255,255,1)",
    opacity: 0.6,
    paddingTop: 8,
    left: 0,
    width: 188,
    top: 0,
    height: 31
  },
  inputStyle: {
    color: "#000",
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    color : "white"
  }
});

export default MaterialStackedLabelTextbox;
