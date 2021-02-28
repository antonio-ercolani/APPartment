const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
admin.initializeApp();



//called by the login screen
//checks if the user is already in an apartment 
exports.hasApartment = functions.https.onCall((data, context) => {
  return admin.database()
  .ref().child("app").child("users").child(context.auth.uid).get()
  .then(function(snapshot) {
    if (snapshot.exists()) {
      if (snapshot.val().apartment === false) {
        return { text : "no"}
      } else {
        return { text : "yes"}
      }
    }
  })
});
  
//called by create apartment
//TODO CAMBIARE IL NOME 
exports.functionProva = functions.https.onCall((data, context) => {
  var insertedName = data.text;
  var isUnique = true;

  function generateRandomString() {
    var sRnd = '';
    var sChrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    for (var i = 0; i < 6; i++) {
      var randomPoz = Math.floor(Math.random() * sChrs.length);
      sRnd += sChrs.substring(randomPoz, randomPoz + 1);
    }
    return sRnd;
  }
  
  if (insertedName.length < 3) return { text: "tooShort"}
  console.log("received name: " + insertedName);


  return admin.database()
  .ref().child("app").child("apartments").get()
  .then(function(snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot) {
        if (insertedName === childSnapshot.key) {
          isUnique = false;
        }
      });
      if (isUnique === true) {
        
        //add the new apartment
        admin.database()
        .ref('/app/apartments/' + insertedName)
        .set({
          uid : context.auth.uid,    //logged user id 
          code : generateRandomString(),
          locked : false
        });

        //add the apartment name in the user
        admin.database()
        .ref('/app/users/' + context.auth.uid)
        .update({
          apartment : insertedName
        });

        return { text: "ok"}
      } else {
        return { text: "notUnique"}
      }
    }
  });
});

exports.searchApartment = functions.https.onCall((data, context) => {
  var insertedName = data.text;
  var uid = context.auth.uid;
  var res = [];

  if (insertedName.length < 2) return;

  return admin.database()
  .ref().child("app").child("apartments").get()
  .then(function(snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.key.includes(insertedName)) {
          res.push(childSnapshot.key)
        }
      });
    return JSON.stringify(res);
    }
  });
});

exports.checkCode = functions.https.onCall((data, context) => {
  var code = data.code;
  var apartment = data.apartment;
  
  return admin.database().ref('/app/apartments/' + apartment + '/code').get()
  .then(function(snapshot) {
    if(snapshot.exists()) {
      if (snapshot.val() === code) return { text: "ok"}
    }
    return { text: "ko"} 
  })

});
  
  

 