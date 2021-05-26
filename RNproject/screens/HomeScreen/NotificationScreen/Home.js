import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { initialize } from '../Redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/database";

require('firebase/auth')

//PER IL REFRESH 
//https://reactnative.dev/docs/refreshcontrol

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


var initialized = false;

function Home(props) {

  const [notifications, setNotifications] = useState([]);
  const items = [];
  const [renderList, setRenderList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  items.push();


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
                  firebase.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
                  .then(result => {
                    setModalVisible(false)
                    setNotifications(result);
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
    <ScrollView>
      <View>
      <Modal
          animationType='none'
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />
          </View>
        </Modal>
        {renderList}
      </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:20
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
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  announcement: {
    marginRight: 25,
    fontFamily: "sans-serif-light",
  },
  announcementDescription: {
    fontSize: 12,
    fontFamily: "sans-serif-light",

  }
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