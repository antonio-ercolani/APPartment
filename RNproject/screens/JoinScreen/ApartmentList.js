import React, { useState } from 'react';
import {FlatList, Animated, Easing, Text, TextInput, Modal, View, StyleSheet, TouchableHighlight} from 'react-native';

const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");

var firebaseConfig = {
  apiKey: "AIzaSyBMqZAgePy_40-jXRQMpcHvK76HqPmZUxU",
  authDomain: "dima-52e16.firebaseapp.com",
  databaseURL: "https://dima-52e16.firebaseio.com",
  projectId: "dima-52e16",
  storageBucket: "dima-52e16.appspot.com",
  messagingSenderId: "330401771086",
  appId: "1:330401771086:web:447a4b8a9f8bb157175d1f"
}; 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default ApartmentList = (props) => {
    [apartment, setApartment] = useState(false);

    return (
    <FlatList 
        data={props.apartments}
        keyExtractor={(item) => item}
        renderItem={({index, item}) => {
           return (<ApartmentRow navigation={props.navigation} apartment={item}/>)
        }}
    
    />);
}

var checkCode = firebase.functions().httpsCallable('checkCode');

function check(code, apartment, navigation, animatedValue) {
    if (code.length < 6) return;
    checkCode({ code: code, apartment: apartment })
    .then((result) => {
        var res = result.data.text;
        if (res === "ok") {
            setModalVisible(false);
            navigation.navigate('RegistrationCompletedScreen')
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
        Animated.timing(animatedValue, {toValue: 1.5, duration: 35, easing: Easing.linear, useNativeDriver: true}),
        Animated.timing(animatedValue, {toValue: -1.5, duration: 70, easing: Easing.linear, useNativeDriver: true}),
        Animated.timing(animatedValue, {toValue: 1.5, duration: 70, easing: Easing.linear, useNativeDriver: true}),
        Animated.timing(animatedValue, {toValue: -1.5, duration: 70, easing: Easing.linear, useNativeDriver: true}),
        Animated.timing(animatedValue, {toValue: 0.0, duration: 35, easing: Easing.linear, useNativeDriver: true})

      ]).start(); 
    }

ApartmentRow = (props) => {
  [modalVisible, setModalVisible] = useState(false);
  [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
    return (
        <View>
          <TouchableHighlight activeOpacity={0.8} underlayColor="white" onPress={() => {setModalVisible(true); setApartment(props.apartment)}}>
              <View style={styles.container}>
                  <Text style={styles.title}>{props.apartment}</Text>
              </View> 
        </TouchableHighlight>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Animated.View style={{transform: [{
                rotate: animatedValue.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-0.1rad', '0.1rad']
                })
                },{ perspective: 1000 }]}}>
                  <TextInput
                  style={styles.input}
                  placeholder="Code"
                  maxLength={6}
                  onChangeText={(code) => {check(code.toUpperCase(), apartment, props.navigation, animatedValue)}}
                  />
                </Animated.View>
              </View>
            </View>
          </Modal>
        </View>
             
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(249,99,70,1)",
        flex: 1,
        marginTop:13,
        marginBottom:13,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
      modalView: {
        margin: 20,
        width:200,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        fontSize: 30,
        fontWeight: "500",
        color: "#fff"
    },
    input: {
        height: 50,
        margin: 5,
        fontSize: 28
      }
   
});