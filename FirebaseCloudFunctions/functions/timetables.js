const admin = require('firebase-admin');
const functions = require("firebase-functions");
const { ref } = require('firebase-functions/lib/providers/database');

//create the events associated to a timetable
exports.createEvents = functions.database.ref('/app/timetables/{apartment}/{timetable}')
  .onCreate((snapshot, context) => {

    const apartment = context.params.apartment;
    const timetableid = context.params.timetable;

    const timetable = snapshot.val();
    const members = [];

    var startDate = new Date();
    startDate.setTime(Date.parse(timetable.startDate));

    var endDate = new Date();
    endDate.setTime(Date.parse(timetable.endDate));


    const period = timetable.period;

    return admin.database().ref('/app/timetables/' +apartment+'/'+timetableid+ '/members').get()
      .then((snapshot) => {
        snapshot.forEach((childSnaphot) => {
          members.push(childSnaphot.key);
        })
        if (endDate < startDate) return;
        var i = 0;
        var currDate = new Date(startDate.getTime());
        while (currDate < endDate) {
          console.log("Inside while loop")
          const date = {
            year : currDate.getFullYear(),
            month : currDate.getMonth(),
            day : currDate.getDate()
          }
          const ev = {
            description : timetable.description,
            member : members[i]
          }
          writeEvent(ev, date, apartment);
          currDate.setDate(currDate.getDate() + period)
          i = (i+1) % members.length;
        }
        
      })
  });



//writes the event in the database
function writeEvent(event, date, apartment) {
  var key = admin.database().ref('/app/events/'+ apartment + '/' + date.year + '/' 
    + date.month + '/' + date.day).push().key;

    admin.database().ref('/app/events/'+ apartment + '/' + date.year + '/' 
    + date.month + '/' + date.day + '/' + key)
    .set({
      event: event.description,
      member: event.member
    })
}





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

exports.getEvents = functions.https.onCall((data, context) => {

  var apartment = data.apartment;
  var date = data.date;
  var res;

  return admin.database()
  .ref("/app/events/" + apartment + '/' + date.year + '/' + date.month).get()
  .then(function (snapshot) {
    if (snapshot.exists()) {
        res = snapshot;
    }
    return JSON.stringify(res);
  });

});