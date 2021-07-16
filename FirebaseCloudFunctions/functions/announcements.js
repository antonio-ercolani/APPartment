const admin = require('firebase-admin');
const functions = require("firebase-functions");

//adds a new announcement
//TODO ERROR HANDLING 
exports.newAnnouncement = functions.https.onCall((data, context) => {
    var announcement = data.announcement;
    var currentUserUid = context.auth.uid;
    var apartmentName = data.apartment;
  
    const ref = admin.database().ref('/app/announcements/' + apartmentName).push();
    ref.set({
      member: currentUserUid,
      announcement: announcement,
      timestamp: Date.now()
    })  
  });

  
  exports.removeAnnouncement = functions.https.onCall  ((data, context) => {
    var apartment = data.apartment;
    var removedAnnouncement = data.removedAnnouncement;
  
    admin.database()
    .ref('/app/announcements/' + apartment  + '/' + removedAnnouncement).remove();

  })

  const MAX_HOME_NOTIFICATIONS = 12;

  exports.addHomeNotification = functions.database.ref('/app/announcements/{apartment}/{announcement}')
  .onCreate((snapshot, context) => {

    const announcement = snapshot.val();
    const apartment = context.params.apartment;

    const ref = admin.database().ref('/app/homeNotifications/' + apartment).push();
    ref.set({
      description: announcement.announcement,
      member: announcement.member,
      type: "Announcements",
      timestamp: announcement.timestamp
    }).then(() => {
      admin.database().ref('/app/homeNotifications/' + apartment).orderByChild('timestamp').once('value')
      .then((result) => {
        console.log(Object.keys(result.val()).length)
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
  
  
 
  