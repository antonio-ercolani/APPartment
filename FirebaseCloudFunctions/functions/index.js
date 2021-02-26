const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//TODO CONTROLLO UNICITÀ NOME APPARTAMENTO E CREAZIONE SOLO SE UTENTE NON HA GIA APPARTAMENTO
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
admin.initializeApp();
  

exports.functionProva = functions.https.onCall((data, context) => {
  var insertedName = data.text;
  var isUnique = true;
  var uid = context.auth.uid;

  function generateRandomString() {
    var sRnd = '';
    var sChrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    for (var i = 0; i < 6; i++) {
      var randomPoz = Math.floor(Math.random() * sChrs.length);
      sRnd += sChrs.substring(randomPoz, randomPoz + 1);
    }
    return sRnd;
  }

  
  return admin.database()
  .ref().child("app").child("apartments").get()
  .then(function(snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot) {
        if (insertedName === childSnapshot.key) {
          console.log('Hanno matchato');
          isUnique = false;
        }
      });
      if (isUnique === true) {
        admin.database()
        .ref('/app/apartments/' + insertedName)
        .set({
        uid : context.auth.uid,    //logged user id 
        code : generateRandomString()
        });
        return { text: "ok"}
      } else {
        return { text: "notUnique"}
      }
    }
  });
});
  
  

 