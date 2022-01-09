import React, { useState, Component } from "react";
import { View, Alert, Modal, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import {TextInput, configureFonts, DefaultTheme, Provider as PaperProvider, ToggleButton } from 'react-native-paper';
import { List, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import { useNavigation } from '@react-navigation/native';
import InputSpinner from "react-native-input-spinner";
import CupertinoButtonInfo from "../../LoginScreen/Components/CupertinoButtonInfo";
import { CommonActions } from '@react-navigation/native';
import { checkFormTimetable } from "./timetableFormUtils";


const firebase = require("firebase");
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

function CreateTimetable(props) {
  const navigation = useNavigation();

  let [checked, setChecked] = useState([])
  let [startDate, setStartDate] = useState()
  let [endDate, setEndDate] = useState()
  let [period, setPeriod] = useState(1)
  let [description, setDescription] = useState()
  const [modalVisible, setModalVisible] = useState(false);


//---------------------------------------------------------------------------------------------------------
//Asyncronous call to the backend submitting the form for the creation of the timetable
//---------------------------------------------------------------------------------------------------------
function creationHandler() {
    var createTimetablecall = firebase.functions().httpsCallable('timetables-createTimetable');

    var timetable = {
      startDate: startDate,
      endDate: endDate,
      period: period,
      description: description,
      members: []
    };

    var members = [];
    const membersUID = props.red.apartment.members;
    
    //converts the object gathered from redux into an array
    for (const [chiave, value] of Object.entries(membersUID)) {
      members.push(value)
    }

    if (checked[0] === true) timetable.members = members;
    else {
      let sanityFlag = false;

      for (let i = 1; i < checked.length; i++) {
        if (checked[i]) {
          sanityFlag = true;
          timetable.members.push(members[i - 1]);
        }
      }
      if (!sanityFlag) {
        Alert.alert('Attention', 'Please insert a member',
          [{text: "Ok"}],
          { cancelable: true }
        )
        return;
      }
        
    }
    let checkInputResult = checkFormTimetable(startDate, endDate, period, description);
    let valid = checkInputResult[0];;
    let message = checkInputResult[1];
    
    if (!valid) {
      Alert.alert('Attention', message,
        [{text: "Ok"}],
        { cancelable: true }
      )
      return;
    }

    setModalVisible(true);
    createTimetablecall({ input: timetable, apartment: props.red.apartment.name })
      //TODO handle server side errors
      .then((result) => {
        //var res = result.data.text;
        setModalVisible(false)
        navigation.pop(1);
        navigation.navigate("Timetable");
      })


  }

  //Toggles the boolean value indicating the checkbox state at the
  // indicated index
  const toggle = (index) => {
    let boxes;
    boxes = [...checked];
    boxes[index] = !boxes[index]
    boxes[0] = false;
    setChecked(boxes)
  }

  
  //Called when "Everyone" is checked
  const toggleEveryone = (index) => {
    let boxes;
    boxes = [...checked];
    boxes[index] = !boxes[index]

    if (boxes[index] === true) {
      let i;
      for (i = 1; i < boxes.length; i++) {
        boxes[i] = false;
      }
    }

    setChecked(boxes)
  }

  var items = [];
  const membersUID = props.red.apartment.members;
  
  //converts the object gathered from redux into an array
  for (const [chiave, value] of Object.entries(membersUID)) {
    items.push(value)
  }

  //Creates a checkbox for every member of the apartment
  items = items.map((item, idx) =>
    <List.Item
      key={idx + 1}
      title={item}
      titleStyle={{fontSize:20}}
      left={props => <Checkbox
        status={checked[idx + 1] ? 'checked' : 'unchecked'}
        onPress={() => toggle(idx + 1)}
      />}
    >
    </List.Item>
  );

  //Inserts the checkbox 'Everyone' as the first element of the state array 'checked'
  items.unshift(
    <List.Item
      key={0}
      title={"Everyone"}
      titleStyle={{fontSize:20}}
      left={props => <Checkbox
        status={checked[0] ? 'checked' : 'unchecked'}
        onPress={() => toggleEveryone(0)}
      />}
    >
    </List.Item>
  )

  return (
    <ScrollView >
          <PaperProvider theme={theme}>

      <List.Subheader style={styles.involving}>Create a new timetable</List.Subheader>
      {items}
      <List.Item
        key={items.length}
        title={"Starting from"}
        titleStyle={{fontSize:20}}
        left={props => <DatePicker
          style={styles.datePickerStyle}
          date={startDate}
          mode="date"
          placeholder="Select date"
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
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { setStartDate(date) }}
        />}
      >
      </List.Item>
      <List.Item
        key={items.length + 1}
        title={"Ending in"}
        titleStyle={{fontSize:20}}
        left={props => <DatePicker
          style={styles.datePickerStyle}
          date={endDate}
          mode="date"
          placeholder="Select date"
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
            }
          }}
          onDateChange={(date) => {
            setEndDate(date)
          }}
        />}
      >
      </List.Item>

      <List.Item
        key={items.length + 2}
        style={styles.spinnerStyle}
        title={"Period"}
        titleStyle={{fontSize:20, marginLeft:10}}
        left={props => <InputSpinner
          max={30}
          min={1}
          continuity={true}
          step={1}
          skin='clean'
          colorMax={'#f4511e'}
          background={'#f4511e'}
          colorPress={'#bd3f19'}
          colorMin={'#f4511e'}
          colorLeft={'#f4511e'}
          colorRight={'#f4511e'}
          fontSize={23}
          value={period}
          onChange={(num) => { setPeriod(num) }}
        />}
      >
      </List.Item>
      <List.Item
        key={items.length + 3}
        left={props => <View style={[styles.container, props.style]}>
          <TextInput
            label={"Description"}
            mode='flat'
            style={styles.inputStyle}
            left={<TextInput.Icon name="comment-text-outline" />}
            onChangeText={(text) => { setDescription(text) }}
          ></TextInput>
        </View>}
      >
      </List.Item>
      <CupertinoButtonInfo
        style={styles.cupertinoButtonInfo}
        text="CONFIRM"
        pressFunc={creationHandler}
      ></CupertinoButtonInfo>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />
          </View>
        </Modal>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cupertinoButtonInfo: {
    height: 60,
    width: 220,
    alignSelf:'center',
    marginTop:30,
    marginBottom:30
  },
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  spinnerStyle: {
    marginTop:10,
    marginLeft:10
  },
  datePickerStyle: {
    marginTop:10,
    width:200,
    marginLeft:5
  },
  inputStyle: {
    fontSize: 18,
    alignSelf: "stretch",
    width:270,
    paddingLeft:10,
    marginLeft:10,
    marginTop:10
  },
  involving: {
    color: "#121212",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 55
  },

});

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CreateTimetable);