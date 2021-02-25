import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function MaterialRightIconTextbox6(props) {

  let [text, setText] = useState('');

  useEffect(() => { props.updateText(text) })

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        placeholder="   APARTMENT NAME"
        secureTextEntry={false}
        style={styles.inputStyle}
        onChangeText={setText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 9,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 16,
    fontSize: 20,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    textAlign: "center"
  }
});

export default MaterialRightIconTextbox6;