import React, { useState, Component } from "react";
import { TextInput, View, StyleSheet, ScrollView } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, ToggleButton } from 'react-native-paper';
import { List, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import InputSpinner from "react-native-input-spinner";
import CupertinoButtonInfo from "../../LoginScreen/Components/CupertinoButtonInfo";

const firebase = require("firebase");
require("firebase/functions");


function CreateTimetable(props) {
  let [checked, setChecked] = useState([])
  let [startDate, setStartDate] = useState()
  let [endDate, setEndDate] = useState()
  let [period, setPeriod] = useState()
  let [description, setDescription] = useState('')

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

      for (i = 1; i < checked.length; i++) {
        if (checked[i]) {
          sanityFlag = true;
          timetable.members.push(members[i - 1]);
        }
      }
      //TODO handle error
      if (!sanityFlag) return;
    }
    //TODO handle errors here (show an error message for instance?)
    if (startDate === undefined || endDate === undefined || period === undefined || description === undefined) return;

    console.log("Input sano, procedo con chiamata")
    console.log(timetable.members)
    createTimetablecall({ input: timetable, apartment: props.red.apartment.name })
      //TODO handle the result (modal with a success/error message?)
      .then((result) => {
        var res = result.data.text;
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
      left={props => <Checkbox
        status={checked[0] ? 'checked' : 'unchecked'}
        onPress={() => toggleEveryone(0)}
      />}
    >
    </List.Item>
  )

  return (
    <ScrollView style={styles.container}>
      <List.Subheader style={styles.involving}>Create a new timetable</List.Subheader>
      {items}
      <List.Item
        key={items.length}
        title={"Starting from"}
        left={props => <DatePicker
          style={{ width: 200 }}
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
        left={props => <DatePicker
          style={{ width: 200 }}
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
              marginLeft: 36
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
        title={"Period"}
        left={props => <InputSpinner
          max={30}
          min={1}
          continuity={true}
          step={1}
          colorMax={'#f4511e'}
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
            placeholder={"Description"}
            style={styles.inputStyle}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cupertinoButtonInfo: {
    height: 60,
    width: 220
  },
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
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
  involving: {
    fontFamily: "sans-serif-medium",
    color: "#121212",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 70
  },

});

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CreateTimetable);