import React, { Component, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(249,99,70,1)',
  },
  //fonts: configureFonts(fontConfig),

};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function AnnouncementsScreen(props) {
  const navigation = useNavigation(); 
  const [announcements, setAnnouncements] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  items.push();
  let apartmentName = props.red.apartment.name;

  //set announcements 
  useEffect(() => {
    firebase.database().ref('/app/announcements/' + apartmentName).orderByChild('timestamp').once('value')
    .then (result => {
      setAnnouncements(result);
    })
  }, []);

  useEffect(() => {
    var i = 0;
    announcements.forEach((child) => {
      var announcement = child.val();

      var timestamp = new Date(announcement.timestamp);
      var day = timestamp.getDate();
      var month = timestamp.getMonth() + 1;
      var year = timestamp.getFullYear();

      /* Nel caso serva prendere ora e minuti dal timestamp
      var hour = timestamp.getHours();
      var minutes = timestamp.getMinutes();
      */
      var dateDayMonth = day + ' ' + monthNames[month];
      var dateYear = year;

      items.push(
        <List.Item
          key={i}
          titleStyle = {styles.announcement}
          descriptionStyle = {styles.announcementDescription}
          title={announcement.announcement}
          titleNumberOfLines={10}
          description= {'Inserted by' + ' ' + props.red.apartment.members[announcement.member]}
          right={props => 
              <Text style={styles.date}>{dateDayMonth}</Text>
          }
          onPress = {() => removeAnnouncement(
            //The logged user owns the announcement?
            props.red.apartment.members[announcement.member] === props.red.username, child.key)}
        />
      )
      i++;
    })
   
    setRenderList(items);
  }, [announcements])

  

  function remove(key) {
    var removeAnnouncement = firebase.functions().httpsCallable('announcements-removeAnnouncement');
    removeAnnouncement({ apartment: props.red.apartment.name, removedAnnouncement: key })
      .then((result) => {
        //error handling
      })
  }
  

  function removeAnnouncement(owns, key) {
    if (owns) {
      Alert.alert('Announcement removal', 'Are you sure you want to remove this announcement?',
        [
          {
            text: "YES",
            onPress: () => remove(key)
          },
          {
            text: "NO",
          }
        ],
        { cancelable: true }
      )
    } else {
      Alert.alert('Alert', 'You cannot remove an announcement posted by another memeber',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function goToNewAnnouncement() {
    navigation.navigate('NewAnnouncement');
  }

  return (
    <ScrollView>
      <PaperProvider theme={theme}>
    
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNewAnnouncement()}>
            <Text style={styles.buttonText}>NEW{'\n'}ANNOUNCEMENT</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.separator, { marginTop: 30, marginBottom: 30 }]}></View>
        {renderList.reverse()}
      </PaperProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 15,
    marginRight: 20,
    fontWeight: "bold", 
    marginTop: 15,
    fontFamily: "sans-serif-light",

  },
  separator: {
    width: 290,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#8F8F8F"
  },
  badge: {
    alignSelf: 'center',
  },
  containerText: {
    fontSize: 17,
    fontFamily: "sans-serif-medium",
    color: "#fff"
  },
  title: {
    fontWeight: "bold",
    color: "#f4511e",
    fontFamily: "sans-serif-medium"
  },
  button: {
    backgroundColor: '#f4511e',
    width: '60%',
    alignSelf: 'center',
    height: 70,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    textAlign:"center",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  announcement : {
    marginRight: 25,
    fontFamily: "sans-serif-light",
  },
  announcementDescription: {
    fontSize: 12,
    fontFamily: "sans-serif-light",

  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(AnnouncementsScreen);
