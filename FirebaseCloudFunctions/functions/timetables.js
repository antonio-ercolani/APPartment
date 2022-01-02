const admin = require('firebase-admin');
const functions = require("firebase-functions");

exports.deleteEvents = functions.database.ref('/app/timetables/{apartment}/{timetable}')
.onDelete((snapshot, context) => {

  const apartment = context.params.apartment;
  const timetableid = context.params.timetable;

  return admin.database().ref('/app/events/' +apartment+'/').get()
  .then((yearSnapshot) => {
    if (!yearSnapshot.exists()) return;
    yearSnapshot.forEach((monthSnaphot) => {
      monthSnaphot.forEach((daySnapshot) => {
        daySnapshot.forEach((ttSnapshot) => {
          ttSnapshot.forEach((ev) =>{
            var event = ev.val();
            if (event.timetableKey == timetableid) {
              admin.database().ref('/app/events/' + apartment + '/' + monthSnaphot.key + '/' + 
              daySnapshot.key + '/' + ttSnapshot.key + '/' + ev.key + '/').remove();
            }
          })
        });
      });
    });

  });

});

exports.deleteSingleEvent = functions.database.ref('/app/singleEvents/{apartment}/{event}')
.onDelete((snapshot, context) => { 


  const apartment = context.params.apartment;
  const eventId = context.params.event;

  let d = new Date(Date.parse(snapshot.val().date))
  return admin.database().ref('/app/events/'+apartment+'/'+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate()+'/').get()
    .then((snapshot) => {
      snapshot.forEach((childSnaphot) => {
        if (childSnaphot.val().timetableKey == eventId) 
        admin.database().ref('/app/events/'+apartment+'/'+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate()+'/'+childSnaphot.key).remove();
      });
    })

});

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
          const date = {
            year : currDate.getFullYear(),
            month : currDate.getMonth(),
            day : currDate.getDate()
          }
          const ev = {
            description : timetable.description,
            member : members[i]
          }
          writeEvent(ev, date, apartment, false, timetableid);
          currDate.setDate(currDate.getDate() + period)
          i = (i+1) % members.length;
        }
        
      })
  });



//writes the event in the database
function writeEvent(event, date, apartment, isSingle, timetableid) {
  var key = admin.database().ref('/app/events/'+ apartment + '/' + date.year + '/' 
    + date.month + '/' + date.day).push().key;

    admin.database().ref('/app/events/'+ apartment + '/' + date.year + '/' 
    + date.month + '/' + date.day + '/' + key)
    .set({
      event: event.description,
      member: event.member,
      isSingle : isSingle,
      timetableKey: timetableid
    })
}

exports.createSingleEvents = functions.database.ref('/app/singleEvents/{apartment}/{event}')
  .onCreate((snapshot, context) => {

    const apartment = context.params.apartment;
    const eventId = context.params.event;

    const event = snapshot.val();

    var d = new Date();
    d.setTime(Date.parse(event.date));

    const date = {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    }

    const ev = {
      member: event.author,
      description: event.description
    }

    writeEvent(ev, date, apartment, true, eventId);

  });

exports.newSingleEvent =  functions.https.onCall((data, context) => {
  var input = data.input;
  var apartment = data.apartment;

  if (!this.verifyInputSingleEvent(input, apartment)) return;

  var eventKey = admin.database()
  .ref('/app/singleEvents/' + apartment).push().key;

  admin.database().ref('/app/singleEvents/' + apartment + '/' + eventKey).
    set({
      description: input.description,
      date: input.date,
      author: input.author,
    });

    return {text: "ok"}
  

});


//creates a timetable in the database
exports.createTimetable = functions.https.onCall((data, context) => {
  var input = data.input;
  var apartment = data.apartment;
  var members = data.input.members;

    //sanitization of input
  if (!this.verifyInputTimetable(input, apartment)) return;

  var timetableKey = admin.database()
    .ref('/app/timetables/' + apartment).push().key;
  
  const memb = {};
  
  for (const key of members) {
    memb[key] = {isIncluded: true};
  }
  
  admin.database().ref('/app/timetables/' + apartment + '/' + timetableKey).
    set({
      description: input.description,
      startDate: input.startDate,
      members: memb,
      endDate: input.endDate,
      period: input.period
    });

    
  return { text: "OK"}

});



exports.getTimetables = functions.https.onCall(async (data, context) => {

  var apartment = data.apartment;
  var res = []

  var snapshot = await admin.database()
    .ref("/app/timetables/" + apartment + "/").get();

  if (snapshot.exists()) {
    res = snapshot.val();
  }

  return admin.database().ref("/app/singleEvents/" + apartment + "/").get()
  .then(function (secondSnapshot) {

    if (secondSnapshot.exists()) {
      res = { ...res, ...secondSnapshot.val() }
    }
    return JSON.stringify(res);

  })
});


exports.deleteTimetables = functions.https.onCall(async(data, context) => {

  var apartment = data.apartment;
  var key = data.key;

  await admin.database().ref('/app/singleEvents/' + apartment + '/' + key + '/').remove();
  return admin.database().ref('/app/timetables/' + apartment + '/' + key + '/').remove();
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

exports.getDayEvents = functions.https.onCall((data, context) => {
  var apartment = data.apartment;
  var date = data.date;
  var res = {}


  return admin.database()
  .ref("/app/events/" + apartment + '/' + date.year + '/' + date.month + '/' + date.day).get()
  .then(function (snapshot) {

    if (snapshot.exists()) {
      res = Object.keys(snapshot.val()).length;
    } else {
      res = 0;
    }

    return JSON.stringify(res);
  });
});

function stringifyArray(array) {
  
  var stringified = "";
  array.forEach((element) => {
    stringified = stringified + ", " + element;
  });

  return stringified.slice(2);
}

exports.addHomeNotification = functions.database.ref('/app/timetables/{apartment}/{timetable}')
  .onCreate((snapshot, context) => {

    const timetable = snapshot.val();
    const apartment = context.params.apartment;
    const ref = admin.database().ref('/app/homeNotifications/' + apartment).push();
    ref.set({
      description: timetable.description,
      member: stringifyArray(Object.keys(timetable.members)),
      type: "Timetable",
      timestamp: Date.now()
    }).then(() => {
      admin.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
      .then((result) => {
        if (Object.keys(result.val()).length === MAX_HOME_NOTIFICATIONS) {
          //non ho trovato altro modo di eliminare il primo elemento 
          // soltanto il forEach mantiene l'ordinamento dell'orderbychild
          //e non esiste un break per il for each
          var first = true;
          result.forEach((child) => {
            if (first === true) {
              admin.database().ref('/app/homeNotifications/' + apartment + '/' + child.key).remove();
              first = false;
            } else {
              first = false;
            }
          });
        }
      })
    });
  });

  exports.addHomeNotificationEvent = functions.database.ref('/app/singleEvents/{apartment}/{timetable}')
  .onCreate((snapshot, context) => {

    const event = snapshot.val();
    const apartment = context.params.apartment;
    const ref = admin.database().ref('/app/homeNotifications/' + apartment).push();
    ref.set({
      description: event.description,
      member: event.author,
      type: "Event",
      timestamp: Date.now()
    }).then(() => {
      admin.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
      .then((result) => {
        if (Object.keys(result.val()).length === MAX_HOME_NOTIFICATIONS) {
          //non ho trovato altro modo di eliminare il primo elemento 
          // soltanto il forEach mantiene l'ordinamento dell'orderbychild
          //e non esiste un break per il for each
          var first = true;
          result.forEach((child) => {
            if (first === true) {
              admin.database().ref('/app/homeNotifications/' + apartment + '/' + child.key).remove();
              first = false;
            } else {
              first = false;
            }
          });
        }
      })
    });
  });

  exports.verifyInputSingleEvent = function(data, apartment) {
    if (apartment === undefined || apartment === null || apartment === "") return false;
    if (!(typeof apartment === 'string' || apartment instanceof String)) return false;

    if (data === undefined || data === null | data.author === undefined 
      || data.description === undefined || data.date === undefined) return false;

    return true;
  }
  
  exports.verifyInputTimetable = function(data, apartment) {
    if (apartment === undefined || apartment === null || apartment === "") return false;

    if (!(typeof apartment === 'string' || apartment instanceof String)) return false;

    if (data.description === undefined || data.startDate === undefined ||
      data.endDate === undefined || data.period === undefined || data.members === undefined) return false;

    const isANumber = new RegExp('^[0-9]+$');

    if (!isANumber.test(data.period)) return false;

    return true;
  }