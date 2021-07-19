import React, { useEffect, useState } from "react";
  import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { initialize } from '../Redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";
import { useNavigation } from '@react-navigation/native';
import HomeCard from './HomeCard.js'


//PER IL REFRESH 
//https://reactnative.dev/docs/refreshcontrol

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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
        setBalance("Balance +"+amount+"$");
      } else {
        setBalance("Balance "+amount+"$");
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
      let res = JSON.parse(result.data);
      console.log(res);
    })
    
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
                  getBalance(initial_state.apartment.name);
                  getMissingItems(initial_state.apartment.name);
                  getEvents(initial_state.apartment.name);
                  firebase.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
                    .then(result => {
                      navigation.setOptions({ title: initial_state.apartment.name });
                      setModalVisible(false);
                      if (result.exists()) {
                        setNotifications(result);
                        setNoItems(false);
                      } else {
                        setNoItems(true);
                      }
                    })
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
      var month = timestamp.getMonth() + 1;
      var year = timestamp.getFullYear();

      /* Nel caso serva prendere ora e minuti dal timestamp
      var hour = timestamp.getHours();
      var minutes = timestamp.getMinutes();
      */
      var dateDayMonth = day + ' ' + monthNames[month];

      items.push(
        <List.Item
          key={i}
          titleStyle={styles.announcement}
          descriptionStyle={styles.announcementDescription}
          title={notification.description}
          titleNumberOfLines={10}
          description={'Inserted by' + ' ' + props.red.apartment.members[notification.member]}
          right={props =>
            <Text style={styles.date}>{dateDayMonth}</Text>
          }
        />
      )
      i++;
    })

    setRenderList(items.reverse());
  }, [notifications])


  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <View style={styles.containerCards}>
          <HomeCard title={balance} icon="cash-usd-outline"/>
          <HomeCard title={missingItems} icon="basket"/>
        </View>
        <View style={styles.containerCards2}>
          <HomeCard title={dayEvents} icon="calendar-text"/>
          <HomeCard title="Apartment members" icon="account-group"/>
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
    marginTop: 30
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