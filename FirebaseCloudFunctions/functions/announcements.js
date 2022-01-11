const admin = require('firebase-admin');
const functions = require("firebase-functions");

//adds a new announcement
exports.newAnnouncement = functions.https.onCall((data, context) => {

    var announcement = data.announcement;
    var currentUserUid = context.auth.uid;
    var apartmentName = data.apartment;

    if (!this.verifyInputAnnouncement(announcement, apartmentName)) return false;
  
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

    if (!this.verifyInputAnnouncement(announcement)) return;

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

  exports.verifyInputAnnouncementTrigger = function(announcement) { 

    if (announcement.announcement === undefined || announcement.announcement === null) return false;
    if (announcement.member === undefined || announcement.member === null) return false;
    if (announcement.timestamp === undefined || announcement.timestamp === null) return false;

    const timestamp = new RegExp('^[0-9]+$');

    if (!timestamp.test(announcement.timestamp)) return false;

    return true;
    
  };

  exports.verifyInputAnnouncement = function(announcement, apartment) { 
    
    if (announcement === undefined || announcement === null || announcement === "") return false;
    if (apartment === undefined || apartment === null || apartment === "") return false;
    
    if (!(typeof announcement === 'string' || announcement instanceof String)) return false;
    if (!(typeof apartment === 'string' || apartment instanceof String)) return false;

    return true;
    
  };
  
  
 
  