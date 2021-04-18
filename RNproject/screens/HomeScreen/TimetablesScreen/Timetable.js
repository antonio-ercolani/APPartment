import React, { useState, Component, useEffect } from "react";
import { View, Alert, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
require("firebase/functions");
import { useNavigation } from '@react-navigation/native';

const firebase = require("firebase");
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4511e',
  },
  //fonts: configureFonts(fontConfig),

};


function Timetable(props) {
  const navigation = useNavigation();
  const [timetables, setTimetables] = useState([]);
  const [list, setList] = useState([]);


  var getTimetables = firebase.functions().httpsCallable('timetables-getTimetables');
  var deleteTimetable = firebase.functions().httpsCallable('timetables-deleteTimetables');

  const apartment = props.red.apartment.name;

  var key = 0;
  function getKey() {
    key = key + 1;
    return key;
  }

  function getNames(members) {
    var items = []
    for (const [chiave, value] of Object.entries(members)) {
      items.push(chiave)
    }
    return items;
  }

  function callGetTimetables() {
    getTimetables({ apartment: apartment })
      .then((result) => JSON.parse(result.data))
      .then((result) => {
        if (result != undefined || result != null) {
          var IDs = Object.keys(result);
          var tt = []
          IDs.forEach(function (id) {
            result[id].key = id;
            tt.push(result[id]);
          });
        }
        setTimetables(tt)
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    callGetTimetables();
  }, []);

  useEffect(() => {
    var interm = [...timetables];
    var res = [];

    interm.forEach((item) => {
      if (item.date == undefined) {
        res.push(
          <List.Accordion
            key={getKey()}
            titleNumberOfLines={10}
            title={item.description}
            left={props => <List.Icon {...props} icon="calendar-month" />}>
            <List.Item key={getKey()} title={"Start date:  " + item.startDate}
              left={props => <View style={{ paddingLeft: 56 }}></View>}
              right={props => <TouchableOpacity onPress={() => removeEvent(item.key)}><List.Icon {...props} icon="trash-can-outline" /></TouchableOpacity>}
            />
            <List.Item key={getKey()} title={"End date:  " + item.endDate} />
            <List.Item key={getKey()} title={"Period:  " + item.period + " days"} />
            <List.Item key={getKey()} title={"Members:  " + getNames(item.members)} />
          </List.Accordion>
      );
      } else {
        res.push(
          <List.Accordion
            key={getKey()}
            titleNumberOfLines={10}
            title={item.description}
            left={props => <List.Icon {...props} icon="calendar" />}>
            <List.Item key={getKey()} title={"Date:  " + item.date}
              left={props => <View style={{ paddingLeft: 56 }}></View>}
              right={props => <TouchableOpacity onPress={() => removeEvent(item.key)}><List.Icon {...props} icon="trash-can-outline" /></TouchableOpacity>}
            />
            <List.Item key={getKey()} title={"Author:  " + item.author} />
          </List.Accordion>
      );
      }
    });
    setList(res);
  }, [timetables]);


  function removeEvent(key) {
    Alert.alert('Delete event', 'Do you want to remove the event/timetable?',
      [
        {
          text: "YES",
          onPress: () => {
            deleteTimetable({ apartment: apartment, key: key }).then(() => {
              callGetTimetables();
            });
          }
        },
        {
          text: "NO",
        }
      ],
      { cancelable: true }
    )
  }

  function goToTimetableCreation() {
    navigation.navigate('Timetable creation')
  }

  function goToCreateSingleEvent() {
    navigation.navigate('Create event')
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>

        <View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToTimetableCreation()}>
              <Text style={styles.buttonText}>CREATE TIMETABLE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToCreateSingleEvent()}>
              <Text style={styles.buttonText}>CREATE EVENT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.separator, { marginTop: 45, marginBottom: 25 }]}></View>


        <View style={styles.container}>
          <View style={styles.list}>
            <List.Subheader style={styles.header}>Current Timetables</List.Subheader>
            {list}
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 35,
    alignSelf: "stretch",
    flex: 0.09,
    padding: 15
  },
  icon1: {
    width: 75,
    height: 75,
    backgroundColor: "#f4511e",
    borderRadius: 7,
    marginRight: 45,
    marginBottom: 40,
    marginLeft: 45,
    alignItems: "center",
    paddingLeft: 6,
  },
  icon2: {
    width: 75,
    height: 75,
    backgroundColor: "#f4511e",
    borderRadius: 7,
    marginRight: 45,
    marginBottom: 40,
    marginLeft: 45,
    alignItems: "center",
    paddingLeft: 2
  },
  separator: {
    width: 290,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#8F8F8F"
  },
  list: {
    alignSelf: "stretch",
    flex: 0.91
  },
  header: {
    fontFamily: "sans-serif-medium",
    color: "#121212",
    fontSize: 20,

    marginLeft: 80
  },
  button: {
    backgroundColor: '#f4511e',
    width: '40%',
    height: 70,
    borderRadius: 10,
    justifyContent: "center",

  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    marginLeft: 12
  },
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(Timetable);