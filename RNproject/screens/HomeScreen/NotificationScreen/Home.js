import React from "react";
import { Button,  View, Text } from "react-native";
import {initialize} from '../Redux/actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { bindActionCreators } from 'redux';

import firebase from "firebase/app";
import "firebase/database";

require('firebase/auth')

var initialized = false;

function Home(props) {
  if (!initialized) {
    initialized = true;

    var initial_state = {
      username: "",
      apartment: ""
    };

    firebase.database().ref('/app/users/' + firebase.auth().currentUser.uid)
    .get().then(function(snapshot) {
      if (snapshot.exists()) {
        initial_state.username = snapshot.val().username
        var apartment = snapshot.val().apartment
        firebase.database().ref('/app/apartments/' + apartment)
          .get().then(function(snapshot) {
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
              })
              
            }
      
          })
      }
    })

    
    
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
        <Text style={{fontSize:30}}>
          {props.red.apartment.name}
          <Icon name="bug" size={30} color="#900" />
        </Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
}


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