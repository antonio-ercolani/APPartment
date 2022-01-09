import React, { useEffect, useState } from "react";
  import { Modal, RefreshControl, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { initialize } from '../Redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";
import { useNavigation } from '@react-navigation/native';
import HomeCard from './HomeCard.js'


//PER IL REFRESH 
//https://reactnative.dev/docs/refreshcontrol

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

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


function Home(props) {

  const [notifications, setNotifications] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState("Balance");
  const [missingItems, setMissingItems] = useState("Missing Items");
  const [dayEvents, setDayEvents] = useState("Events today");


  const navigation = useNavigation();
  var findDebts = firebase.functions().httpsCallable('payments-findDebts');
  var findEvents = firebase.functions().httpsCallable('timetables-getDayEvents');
  var findMissingItems = firebase.functions().httpsCallable('stockManagement-numberMissingItems');



  items.push();

  function getBalance(apartment) {
    findDebts({apartment: apartment}).then((result) => {
      let res = JSON.parse(result.data);
      var amount = res[res.length-1].amount;
      if (amount >= 0) {
        setBalance("Balance +"+Math.abs(parseFloat(amount).toFixed(2))+"€");
      } else {
        setBalance("Balance "+Math.abs(parseFloat(amount).toFixed(2))+"€");
      }
    })
  };

  function getEvents(apartment) {

    var date = new Date();
    var dateObj = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }

    findEvents({apartment: apartment, date: dateObj}).then((result) => {
      let res = JSON.parse(result.data);
      setDayEvents(res + " Events today");
    });
  };

  function getMissingItems(apartment) {
    findMissingItems({apartment: apartment}).then((result) => {
      var res = result.data.number;
      setMissingItems("Missing items: " + res);
    }).catch((err) => {console.log(err)})
  }

  function getAnnouncements(apartment) {
    firebase.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
    .then(result => {
      setModalVisible(false);
      if (result.exists()) {
        setNotifications(result);
        setNoItems(false);
      } else {
        setNoItems(true);
      }
    });
  }

  function onRefresh() {
    getAnnouncements(props.red.apartment.name);
    getMissingItems(props.red.apartment.name);
    getBalance(props.red.apartment.name);
    getEvents(props.red.apartment.name);
  }

  useEffect(() => {
    var initial_state = {
      username: "",
      apartment: ""
    };

    firebase.database().ref('/app/users/' + firebase.auth().currentUser.uid)
      .get().then(function (snapshot) {
        if (snapshot.exists()) {
          initial_state.username = snapshot.val().username
          var apartment = snapshot.val().apartment
          firebase.database().ref('/app/apartments/' + apartment)
            .get().then(function (snapshot) {
              if (snapshot.exists()) {
                initial_state.apartment = snapshot.val()
                initial_state.apartment.name = apartment;

                //associates usernames to uids
                var getHashMap = firebase.functions().httpsCallable('getHashMap');
                getHashMap({ apartment: initial_state.apartment.name }).then((result) => {
                  var temp = JSON.parse(result.data);
                  temp.forEach((element) => {
                    var uid = element.uid;
                    var username = element.username;
                    initial_state.apartment.members[uid] = username;
                  })
                  props.initialize(initial_state);
                  console.log(initial_state)
                  navigation.setOptions({ title: initial_state.apartment.name });
                  getBalance(initial_state.apartment.name);
                  getMissingItems(initial_state.apartment.name);
                  getEvents(initial_state.apartment.name);
                  getAnnouncements(initial_state.apartment.name);
                })
              }
            })
        }
      })


  }, []);

  useEffect(() => {
    var i = 0;
    notifications.forEach((child) => {
      var notification = child.val();
      var timestamp = new Date(notification.timestamp);
      var day = timestamp.getDate();
      var month = timestamp.getMonth();

      /* Nel caso serva prendere ora e minuti dal timestamp
      var hour = timestamp.getHours();
      var minutes = timestamp.getMinutes();
      */
      var dateDayMonth = day + ' ' + monthNames[month];

      switch (notification.type) {
        case 'MissingItem':
          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={notification.description + ' is missing'}
              titleNumberOfLines={2}
              description={'Inserted by' + ' ' + props.red.apartment.members[notification.member]}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="close-octagon-outline" />}
            />
          );
          break;

        case 'Payment':
          var title = notification.description.split('+');

          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={title[1] + '€ paid for ' + title[0]}
              titleNumberOfLines={2}
              description={'Inserted by' + ' ' + props.red.apartment.members[notification.member]}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="cash-usd-outline" />}
            />
          );
          break;

        case 'Announcements':
          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={notification.description}
              titleNumberOfLines={2}
              description={'Inserted by' + ' ' + props.red.apartment.members[notification.member]}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="message-alert-outline" />}
            />
          );
          break;

        case 'Timetable':
          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={'Timetable \''+ notification.description+'\' created'}
              titleNumberOfLines={2}
              description={'Members: '+notification.member}
              descriptionNumberOfLines={2}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="calendar-month-outline" />}
            />
          );
          break;

          case 'Event':
          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={'Event \''+ notification.description+'\' created'}
              titleNumberOfLines={2}
              description={'Inserted by '+notification.member}
              descriptionNumberOfLines={2}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
          );
          break;

          case 'PayOff':

          var members = notification.member.split('+');
          var infos = notification.description.split('+');

          items.push(
            <List.Item
              key={i}
              titleStyle={styles.announcement}
              descriptionStyle={styles.announcementDescription}
              title={props.red.apartment.members[members[0]]+ ' paid ' + infos[1] + '€ to ' + props.red.apartment.members[members[1]]}
              titleNumberOfLines={2}
              right={props => <Text style={styles.date}>{dateDayMonth}</Text>}
              left={props => <List.Icon {...props} icon="cash-refund" />}
            />
          );
          break;
      }
      
      i++;
    })

    setRenderList(items.reverse());
  }, [notifications])


  return (
    <PaperProvider theme={theme}>
      <ScrollView
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        }
      >
        <View style={styles.containerCards}>
          <HomeCard title={balance} icon="cash-usd-outline" nav="payments"/>
          <HomeCard title={missingItems} icon="basket" nav="stockManagement"/>
        </View>
        <View style={styles.containerCards2}>
          <HomeCard title={dayEvents} icon="calendar-text" nav="calendar"/>
          <HomeCard title="Members" icon="account-group" nav="members"/>
        </View>
        <Modal
          animationType='none'
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 150 }} />
          </View>
        </Modal>
        <Text style={styles.title}>Notifications:</Text>
        {renderList}
        {noItems &&
              <View style={styles.noNotifications}>
                <Text style={styles.noNotificationsText}>There are no notifications yet!</Text>
              </View>
            }
      </ScrollView>
    </PaperProvider>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  
  title: {
    fontFamily: "FuturaPTDemi",
    marginLeft:15,
    fontSize:20
  },
  announcement: {
    marginRight: 25,
    fontFamily: "FuturaPTMedium",
    fontSize:19
  },
  announcementDescription: {
    fontSize: 14,
    fontFamily: "FuturaPTMedium",
  },
  containerCards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginLeft: 23,
    marginTop: 20
  },
  containerCards2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginLeft: 23,
    marginTop: 8,
    marginBottom: 30
  },
  noNotifications: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noNotificationsText: {
    fontFamily: "FuturaPTDemi",
    fontSize: 18,
    color:'#474545'
  },
});


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    initialize,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);