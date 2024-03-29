import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { StyleSheet, RefreshControl, View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List } from 'react-native-paper';

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

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

function AnnouncementsScreen(props) {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  items.push();
  let apartmentName = props.red.apartment.name;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noAnnouncements, setNoAnnouncements] = useState(false);

  //set announcements 
  useEffect(() => {
    callGetAnnouncements();
  }, []);
  

  function callGetAnnouncements(){
    firebase.database().ref('/app/announcements/' + apartmentName).orderByChild('timestamp').once('value')
      .then(result => {
        if (result.exists()) {
          setAnnouncements(result);
          setLoading(false);
        } else {
          setAnnouncements([]);
          setNoAnnouncements(true);
          setLoading(false);
        }

      })
  }

  useEffect(() => {
    var i = 0;
    announcements.forEach((child) => {
      var announcement = child.val();

      var timestamp = new Date(announcement.timestamp);
      var day = timestamp.getDate();
      var month = timestamp.getMonth();
      var year = timestamp.getFullYear();

      var dateDayMonth = day + ' ' + monthNames[month];
      var dateYear = year;

      items.push(
        <List.Item
          key={i}
          titleStyle={styles.announcement}
          descriptionStyle={styles.announcementDescription}
          title={announcement.announcement}
          titleNumberOfLines={6}
          description={'Inserted by' + ' ' + props.red.apartment.members[announcement.member]}
          right={props =>
            <Text style={styles.date}>{dateDayMonth}</Text>
          }
          onPress={() => removeAnnouncement(
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
        setLoading(true);
        callGetAnnouncements();
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
      Alert.alert('Alert', 'You cannot remove an announcement posted by another member',
        [{ text: "Ok" }],
        { cancelable: true }
      )
    }
  }

  function goToNewAnnouncement() {
    navigation.navigate('NewAnnouncement');
  }

  return (
    <ScrollView
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={callGetAnnouncements}
    />
    }
    >
      <View style={styles.main}>
        <PaperProvider theme={theme}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToNewAnnouncement()}>
              <Text style={styles.buttonText}>NEW{'\n'}ANNOUNCEMENT</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.separator, { marginTop: 30, marginBottom: 10 }]}></View>
          {renderList.reverse()}
        </PaperProvider>
        {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
        {noAnnouncements &&
          <View style={styles.noAnnouncements}>
            <Text style={styles.noAnnouncementsText}>There are no announcements,</Text>
            <Text style={styles.noAnnouncementsText}>click on the button to add one!</Text>
          </View>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '1%',
    marginRight: '1%',
  },
  date:{
    fontSize: 15,
    marginRight: 20,
    fontWeight: "bold",
    marginTop: 15,
    fontFamily: "sans-serif-light",

  },
  separator: {
    width: 200,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#6b6b6b",
    borderRadius: 34,
  },
  badge: {
    alignSelf: 'center',
  },
  containerText: {
    fontSize: 17,
  },
  title: {
    color: "#f4511e",
  },
  button: {
    backgroundColor: '#f4511e',
    width: 200,
    alignSelf: 'center',
    height: 70,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontFamily: "FuturaPTBold",
  },
  announcement: {
    marginRight: 20,
    fontFamily: "FuturaPTMedium",
    fontSize:19
  },
  announcementDescription: {
    fontSize: 12,
  },
  noAnnouncements: {
    alignSelf: "center",
    marginTop: 40,
  },
  noAnnouncementsText: {
    fontFamily: "FuturaPTDemi",
    fontSize: 20
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(AnnouncementsScreen);
