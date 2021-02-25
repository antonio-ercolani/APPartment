const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//TODO CONTROLLO UNICITÀ NOME APPARTAMENTO E CREAZIONE SOLO SE UTENTE NON HA GIA APPARTAMENTO
const admin = require('firebase-admin');
admin.initializeApp();

exports.functionProva = functions.https.onCall((data, context) => {
  var receivedText = data.text;
  
  admin.database()
    .ref('/app/apartments/' + receivedText)
    .set({
      name : true
    })

});
