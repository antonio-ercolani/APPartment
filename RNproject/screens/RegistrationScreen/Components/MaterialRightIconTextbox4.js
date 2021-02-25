import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function MaterialRightIconTextbox4(props) {
  
  let [text, setText] = useState('');
    useEffect(() => {
      props.updateText(text);
  })

  return (
    <View style={[styles.container, props.style]}>
      <TextInput placeholder="password" style={styles.inputStyle}
        onChangeText={setText}
        secureTextEntry={true}
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
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingRight: 8
  }
});

export default MaterialRightIconTextbox4;
