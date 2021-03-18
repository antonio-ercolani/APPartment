import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function AccessCodeScreen(props) {
  let[code, setCode] = useState(props.red.apartment.code);
  let[show, setShow] = useState(false);

  function changeShow() {
    show ? setShow(false) : setShow(true);
  }

  /*
  var getCode = function (){
    firebase.database()
    .ref("app/apartments/"+apartmentName+"/code/").get()
    .then(function(snapshot) {
        if (snapshot.exists()) {
            setCode(snapshot.val());
        } else {
            //error
        }
    })
  }();
  */

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.loremIpsumStack}>
          <Text style={styles.text} >{show ? code : '. . . . . .'}</Text>
        </View>
        <View style={styles.icon2Stack}>
          {show ?
            <FontAwesomeIcon
              name="unlock-alt"
              style={styles.icon2}
              onPress= {changeShow}
            ></FontAwesomeIcon>
          :
            <FontAwesomeIcon 
              name="lock" 
              style={styles.icon3}
              onPress = {changeShow}
            ></FontAwesomeIcon>
          }
          <Text style={styles.holdTheLock}>Click the lock to reveal the code</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  group: {
    width: 225,
    height: 445,
    alignSelf: "center"
  },
  loremIpsum: {
    top: 0,
    left: 35,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 112,
    width: 156
  },
  text: {
    top: 22,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 67,
    width: 225,
    textAlign: "center",
    fontSize: 55,
    fontWeight: "bold"
  },
  loremIpsumStack: {
    width: 225,
    height: 121
  },
  icon2: {
    top: 2,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 200,
    left: 7
  },
  icon3: {
    top: 0,
    left: 7,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 200,
  },
  holdTheLock: {
    top: 200,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 45,
    width: 137,
    textAlign: "center",
    fontSize: 17
  },
  icon2Stack: {
    width: 138,
    height: 245,
    marginTop: 79,
    marginLeft: 44
  }
});

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(AccessCodeScreen);