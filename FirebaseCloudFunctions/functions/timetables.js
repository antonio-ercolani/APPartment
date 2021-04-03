const admin = require('firebase-admin');
const functions = require("firebase-functions");


//creates a timetable in the database
exports.createTimetable = functions.https.onCall((data, context) => {
  var input = data.input;
  var apartment = data.apartment
  var members = data.input.members;

  var timetableKey = admin.database()
    .ref('/app/timetables/' + apartment).push().key;


  //sanitization of input
  if (input.description === undefined || input.startDate === undefined ||
       input.endDate === undefined || input.period === undefined || members === undefined) 
       return;
  
  admin.database().ref('/app/timetables/' + apartment + '/' + timetableKey).
    set({
      description: input.description,
      startDate: input.startDate,
      endDate: input.endDate,
      period: input.period
    });

    for (i = 0; i<members.length; i++) {
      admin.database().ref('/app/timetables/' + apartment + '/' + timetableKey
        + '/members/' + members[i]).set({
          isIncluded: true
        })
    }
  return { text: "OK"}

});

exports.getTimetables = functions.https.onCall((data, context) => {

  var apartment = data.apartment;
  var res = []

  return admin.database()
  .ref("/app/timetables/" + apartment + "/").get()
  .then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnaphot) {
          res.push(childSnaphot);
        });
      }
      return JSON.stringify(res);
  });

});