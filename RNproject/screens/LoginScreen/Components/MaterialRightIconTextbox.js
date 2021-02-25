import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function MaterialRightIconTextbox1(props) {

  let [text, setText] = useState('');

  useEffect(() => {
    props.updateText(text)
  })


  return (
    <View style={[styles.container, props.style]}>
      <TextInput 
      placeholder={props.secureEntry? "password" : "e-mail"} 
      style={styles.inputStyle}
      onChangeText={setText}
      secureTextEntry={props.secureEntry}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 16,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8
  }
});

export default MaterialRightIconTextbox1;
