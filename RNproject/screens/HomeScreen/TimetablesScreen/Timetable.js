import React, { useState, useEffect } from "react";
import { View, RefreshControl, Alert, Modal, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
require("firebase/functions");
import { useNavigation } from '@react-navigation/native';

const firebase = require("firebase");
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
    primary: '#f4511e',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};

function Timetable(props) {
  const navigation = useNavigation();
  const [timetables, setTimetables] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);



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
          if (result.length == 0) {
            setNoItems(true);
          } else {
            setNoItems(false);
          }
          setLoading(false);

          var IDs = Object.keys(result);
          var tt = []
          IDs.forEach(function (id) {
            result[id].key = id;
            tt.push(result[id]);
          });
        } else {
          setNoItems(true);
          setLoading(false);
        }
        setModalVisible(false)
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
            titleNumberOfLines={1}
            titleStyle={{fontSize:19 ,fontFamily:"FuturaPTMedium"}}
            title={item.description}
            left={props => <List.Icon {...props} icon="calendar-month" />}>
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"Start date:  " + item.startDate}
              left={props => <View style={{ paddingLeft: 56 }}></View>}
              right={props => <TouchableOpacity onPress={() => removeEvent(item.key)}><List.Icon {...props} icon="trash-can-outline" /></TouchableOpacity>}
            />
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"End date:  " + item.endDate} />
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"Period:  " + item.period + " days"} />
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"Members:  " + getNames(item.members)} />
          </List.Accordion>
        );
      } else {
        res.push(
          <List.Accordion
            key={getKey()}
            titleNumberOfLines={1}
            titleStyle={{fontSize:19 ,fontFamily:"FuturaPTMedium"}}
            title={item.description}
            left={props => <List.Icon {...props} icon="calendar" />}>
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"Date:  " + item.date}
              left={props => <View style={{ paddingLeft: 56 }}></View>}
              right={props => <TouchableOpacity onPress={() => removeEvent(item.key)}><List.Icon {...props} icon="trash-can-outline" /></TouchableOpacity>}
            />
            <List.Item key={getKey()} titleStyle={styles.listFont} title={"Author:  " + item.author} />
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
            setModalVisible(true);
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
    <ScrollView
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={callGetTimetables}
    />
    }
    >
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
              <Text style={styles.buttonText2}>CREATE EVENT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.separator, { marginTop: 45, marginBottom: 25 }]}></View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />
          </View>
        </Modal>
        <View style={styles.container}>
          <View style={styles.list}>
            {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
            {list}
            {noItems &&
              <View style={styles.noAnnouncements}>
                <Text style={styles.noAnnouncementsText}>There are no timetables,</Text>
                <Text style={styles.noAnnouncementsText}>click on the button to add one!</Text>
              </View>
            }
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  listFont:{
    fontSize:17,
    fontFamily:'FuturaPTMedium'
  },
  separator: {
    width: 300,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#6b6b6b",
    borderRadius: 34,
  },
  list: {
    alignSelf: "stretch",
    flex: 0.91
  },
  button: {
    backgroundColor: '#f4511e',
    width: 140,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignSelf: 'center',
    width: 300,
    marginTop: 30
  },
  noAnnouncements: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noAnnouncementsText: {
    fontFamily: "FuturaPTDemi",
    fontSize: 20
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    marginLeft: 12
  },
  buttonText2: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    marginLeft: 12,
    marginRight:12
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(Timetable);