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
    .then(function (snapshot) {
      if (snapshot.exists()) {
        if (snapshot.val().apartment === false) {
          return { text: "no" }
        } else {
          return { text: "yes" }
        }
      }
    })
});

//called by create apartment
//TODO CAMBIARE IL NOME 
//SE NON C'È NESSUN APPARTAMENTO FA CASINO CONTROLLARE 
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

  if (insertedName.length < 3) return { text: "tooShort" }
  console.log("received name: " + insertedName);


  return admin.database()
    .ref().child("app").child("apartments").get()
    .then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          if (insertedName === childSnapshot.key) {
            isUnique = false;
          }
        });
        if (isUnique === true) {

          //add the new apartment
          admin.database()
            .ref('/app/apartments/' + insertedName)
            .set({
              code: generateRandomString(),
              locked: false
            });

          //add the admin member to the created apartment
          admin.database()
            .ref('/app/apartments/' + insertedName + '/members/' + uid)
            .set({
              isAdmin: true
            });

          //add the apartment name in the user
          admin.database()
            .ref('/app/users/' + uid)
            .update({
              apartment: insertedName
            });

          return { text: "ok" }
        } else {
          return { text: "notUnique" }
        }
      }
    });
});

exports.searchApartment = functions.https.onCall((data, context) => {
  var insertedName = data.text;
  var res = [];

  if (insertedName.length < 2) return;

  return admin.database()
    .ref().child("app").child("apartments").get()
    .then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.key.includes(insertedName)) {
            res.push(childSnapshot.key)
          }
        });
        return JSON.stringify(res);
      }
    });
});

//TODO quanto appartemento è locked non accetto utenti
//nanno commenta cosa fa la roba plis 
//add the user to the apartment 
//called when a user join an apartment 
exports.checkCode = functions.https.onCall((data, context) => {
  var code = data.code;
  var apartment = data.apartment;

  return admin.database().ref('/app/apartments/' + apartment + '/code').get()
    .then(function (snapshot) {
      if (snapshot.exists()) {
        if (snapshot.val() === code) {

          admin.database()
            .ref('/app/apartments/' + apartment + '/members/' + context.auth.uid)
            .set({
              isAdmin: false
            });

          admin.database()
            .ref('/app/users/' + context.auth.uid)
            .update({
              apartment: apartment
            });

          initializePayments(apartment, context.auth.uid);

          return { text: "ok" }
        }
      }
      return { text: "ko" }
    })

});


function initializePayments(apartmentName, currentUserUid) {

  //for each member of the apartment != from the current 
  //that has just joined we initialize the debts 
  admin.database()
    .ref('/app/apartments/' + apartmentName + '/members/').get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {

          //for each member != current 
          //initialize the debt to the 
          if (childSnapshot.key !== currentUserUid) {

            admin.database()
              .ref('/app/payments/' + apartmentName + '/debts/' + currentUserUid + '/' + childSnapshot.key).update({
                amount: 0
              });

            admin.database()
              .ref('app/payments/' + apartmentName + '/debts/' + childSnapshot.key + '/' + currentUserUid).update({
                amount: 0
              })
          }
        })
      }
    })
}


//find all the debts of a given user 
exports.findDebts = functions.https.onCall  ((data, context) => {
  var apartment = data.apartment;
  var uid;
  var amount, debt;
  var res = [];
  var totalDebt = 0;

  function Debt(name, amount) {
    this.uid = uid;
    this.amount = amount;
  }

  return admin.database()
    .ref('/app/payments/' + apartment + '/debts/' + context.auth.uid).get().then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        uid = childSnapshot.key;
        amount = childSnapshot.val().amount;
        debt = new Debt(uid, amount);
        res.push(debt);
        totalDebt = totalDebt + amount;
      })
      //the last element is the total debt 
      uid = "Total debt";
      debt = new Debt(uid,totalDebt);
      res.push(debt);
      return JSON.stringify(res);
    })
});

//gets an hashMap uid - usernames 
exports.getHashMap = functions.https.onCall  (async (data, context) => {
  var apartment = data.apartment;
  var name;
  var res = [];
  function User(uid, username) {
    this.uid = uid;
    this.username = username;
  }
  console.log(apartment);

  members = await admin.database()
    .ref('/app/apartments/' + apartment + '/members/').get();

  return admin.database()
    .ref('/app/users/').get().then( (usernames) => {

      members.forEach((childMember) => {
        usernames.forEach((childUsername) => {
          if (childUsername.key === childMember.key) {
            name = childUsername.val().username;
            user = new User(childUsername.key, name);
            console.log(User);
            res.push(user);          }
        })
      })
      return JSON.stringify(res);}
    )
});


function usernameFromUid(uid) {
  return admin.database()
    .ref('/app/users/').get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          if (uid === childSnapshot.key) {
            return childSnapshot.val().username;
          }
        })
      } else {
        return null;
      }
    })
}

  




