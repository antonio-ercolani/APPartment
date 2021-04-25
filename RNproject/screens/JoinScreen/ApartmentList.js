import React, { useState } from 'react';
import { Animated, Easing, Text, Modal, View, StyleSheet, TouchableHighlight } from 'react-native';
import { List, TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");


const font = 'FuturaPTDemi';
const fontConfig = {
  default: {
    regular: {
      fontFamily: font,
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};

export default ApartmentList = (props) => {
  [apartment, setApartment] = useState(false);
  [modalVisible, setModalVisible] = useState(false);
  [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

  let list = props.apartments;
  let res = [];
  if (list != undefined) {
    list.forEach((item, idx) => {
      res.push(
        <List.Item
          key={idx}
          title={item}
          titleStyle={[styles.title, {marginRight:15}]}
          borderRadius={100}
          onPress={() => { setModalVisible(true); setApartment(item) }}
        >
        </List.Item>
      )
    })
  }


  return (
    <View>{res}
    <PaperProvider theme={theme}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView,{
              transform: [{
                rotate: animatedValue.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ['-0.1rad', '0.1rad']
                })
              }, { perspective: 1000 }]
            }]}>
              <TextInput
                style={styles.input}
                label="Code"
                maxLength={6}
                onChangeText={(code) => { check(code.toUpperCase(), apartment, props.navigation, animatedValue) }}
              />
            </Animated.View>
        </View>
      </Modal></PaperProvider></View>);
}

var checkCode = firebase.functions().httpsCallable('checkCode');

function check(code, apartment, navigation, animatedValue) {
  if (code.length < 6) return;
  console.log(code);
  console.log(apartment);
  checkCode({ code: code, apartment: apartment })
    .then((result) => {
      var res = result.data.text;
      if (res === "ok") {
        setModalVisible(false);
        navigation.navigate('HomeScreen')
      } else {
        handleAnimation(animatedValue);
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
}

function handleAnimation(animatedValue) {

  Animated.sequence([
    Animated.timing(animatedValue, { toValue: 1.5, duration: 35, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: -1.5, duration: 70, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: 1.5, duration: 70, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: -1.5, duration: 70, easing: Easing.linear, useNativeDriver: true }),
    Animated.timing(animatedValue, { toValue: 0.0, duration: 35, easing: Easing.linear, useNativeDriver: true })

  ]).start();
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 13,
    marginBottom: 13,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height:120,
    width:180,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 36,
    fontWeight: "500",
    color: "#fff",
    alignSelf: "center"
  },
  input: {
    flex: 1,
    alignSelf:'stretch',
    fontSize:30,
    backgroundColor:'white'
  }

});