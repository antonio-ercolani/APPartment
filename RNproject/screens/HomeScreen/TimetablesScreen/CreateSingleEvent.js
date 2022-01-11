import React, { useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, Modal, View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from "firebase/app";
import DatePicker from 'react-native-datepicker';
import { checkFormSingleEvent } from "./timetableFormUtils";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
  },
};

function CreateSingleEvent(props) {
  const navigation = useNavigation();

  const apartment = props.red.apartment.name;
  const username = props.red.username;

  const [selectedDate, setSelectedDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  function createSingleEvent() {
    if (checkFormSingleEvent(eventDescription, selectedDate)) {
      newSingleEvent();
    } else {
      Alert.alert('Alert', 'Please complete the form',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }
  

  function newSingleEvent() {
    let input = {
      author: username, 
      date: selectedDate,
      description: eventDescription
    }
    setModalVisible(true)
    let send = firebase.functions().httpsCallable('timetables-newSingleEvent');
    send({ apartment : apartment, input: input })
      .then((result) => {
        setModalVisible(false)
        navigation.pop(1);
        navigation.navigate("Timetable");
      })
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
        <View style={styles.main}>
          <TextInput
            style={styles.input}
            label="Event Description"
            multiline= {true}
            mode='flat'
            value={eventDescription}
            onChangeText={eventDescription => setEventDescription(eventDescription)}
            left={<TextInput.Icon name="card-text-outline" />}
          />

          <DatePicker
            style={{ width: '100%', marginTop: 10}}
            date={selectedDate}
            mode="date"
            placeholder="Tap here to select the event date"
            format="YYYY-MM-DD"
            minDate="2021-03-01"
            maxDate="2022-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderWidth: 0
              }
            }}
            onDateChange={(date) => { setSelectedDate(date) }}
          />


          <View style={styles.container}>
            <View style={styles.rectFiller}></View>
            <TouchableOpacity
              style={styles.rect}
              onPress={() => createSingleEvent()}>
              <Text style={styles.text}>CONFIRM</Text>
            </TouchableOpacity>
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />
          </View>
        </Modal>
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
  },
  input: {
    marginVertical: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
    borderRadius: 3,
    justifyContent: "center",
    marginBottom: 30
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "sans-serif-medium"
  },
  picker: {
    width: 300,
    
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CreateSingleEvent);
