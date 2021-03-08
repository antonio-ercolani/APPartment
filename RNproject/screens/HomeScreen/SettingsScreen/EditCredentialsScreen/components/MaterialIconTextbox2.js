import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function MaterialIconTextbox2(props) {
  let [text, setText] = useState('');
  useEffect(() => { props.updateText(text) })
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="lock" style={styles.iconStyle}></Icon>
      <TextInput
        placeholder="repeat password"
        style={styles.inputStyle}
        onChangeText={setText} 
        secureTextEntry={true}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    color: "rgba(249,99,70,1)",
    fontSize: 24,
    paddingLeft: 8
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8
  }
});

export default MaterialIconTextbox2;
