import firebase from "firebase/app";
import "firebase/database";

  var config = {
    apiKey: "AIzaSyBMqZAgePy_40-jXRQMpcHvK76HqPmZUxU",
    authDomain: "dima-52e16.firebaseapp.com",
    databaseURL: "https://dima-52e16.firebaseio.com",
    storageBucket: "dima-52e16.appspot.com"
  };


  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  function writeUserData() {
    firebase.database().ref('app/messages/').set({
      username: "prova",
    });
  };
  writeUserData();
