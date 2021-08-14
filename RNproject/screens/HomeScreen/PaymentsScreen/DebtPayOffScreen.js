import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import firebase from "firebase/app";
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';


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


function DebtPayOffScreen(props) {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [selectedMember, setSelectedMember] = useState("select");
  const [loading, setLoading] = useState(false);

  const items = [];
  let members = props.red.apartment.members;
  let currentUser = props.red.username;

  for (var key in members) {
    if (members[key] !== currentUser) {
      items.push(<Picker.Item label={members[key]} value={key} key={key} />)
    }
  }



  function checkForm() {
    if ((description !== "") && (amount !== "") && (selectedMember !== "select")) {
      if ((!isNaN(amount)) && (parseInt(amount, 10) > 0)) {
        //the form is ok
        sendPayOff();
      } else {
        Alert.alert('Attention', 'Please insert a valid amount',
          [{ text: "Ok" }],
          { cancelable: true }
        )
      }
    } else {
      Alert.alert('Attention', 'Please complete all the fields to continue',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function sendPayOff() {
    setLoading(true);
    var newPayOff = firebase.functions().httpsCallable('payments-newPayOff');
    newPayOff({
      description: description,
      amount: parseInt(amount, 10),
      apartment: props.red.apartment.name,
      member: selectedMember
    }).then((result) => {
      navigation.dispatch(state => {
        // Remove old stock management screen
        const routes = state.routes.filter(r => r.name !== 'Payments');
  
        //reset navigation state
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
      navigation.navigate("Payments");
      setLoading(false);
      setDescription('');
      setAmount(0);
    })
    
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.main}>
          <Picker
            mode="dialog"
            selectedValue={selectedMember}
            onValueChange={(itemValue) =>
              setSelectedMember(itemValue)
            }>
            <Picker.Item label="Select a member" value="select"/>
            {items}
          </Picker>
          <TextInput
            style={styles.input}
            label="Description"
            mode='flat'
            value={description}
            onChangeText={description => setDescription(description)}
            left={<TextInput.Icon name="message-text-outline" />}
          />
          <TextInput
            label="Paid off amount"
            mode='flat'
            style={{fontSize:17}}
            value={amount}
            onChangeText={amount => setAmount(amount)}
            left={<TextInput.Icon name="cash" />}
            right={<TextInput.Icon name="currency-eur" size={20} />}
          />
          <View style={styles.container}>
            <View style={styles.rectFiller}></View>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => checkForm()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 15,
  },
  input: {
    marginVertical: 20,
    fontSize: 17
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  rectFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rect: {
    width: 100,
    height: 46,
    backgroundColor: "#f4511e",
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "FuturaPTBold"
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(DebtPayOffScreen);
