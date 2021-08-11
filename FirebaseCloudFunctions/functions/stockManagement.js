const admin = require('firebase-admin');
const functions = require("firebase-functions");

exports.removeItems = functions.https.onCall  ((data, context) => {
  var apartment = data.apartment;
  var removedItems = data.removedItems;
  const names = [];

  removedItems.forEach((element) => {
    names.push(element.name);  
    admin.database()
    .ref('/app/stockManagement/' + apartment + '/items/' + element.id).remove();
  })

  //register the removals (inglese?)
  //TODO 
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //MI SA CHE QUESTA COSA NON SERVE A NIENTE GUARDARCI
  //QUANDO SISTEMO COSE PER LA HOME NOTIFICATIONS 
  const ref = admin.database().ref('/app/stockManagement/' + apartment + '/removals').push();
  ref.set({
    member: context.auth.uid,
    items: names.join(', '),
    timestamp: Date.now()
  })

})

exports.numberMissingItems = functions.https.onCall((data, context) => {
  var apartment = data.apartment;
  return admin.database().ref("/app/stockManagement/" + apartment + "/items/").get()
    .then(function (snapshot) {

      if (snapshot.exists()) {
        let counter = 0;
        snapshot.forEach(() => {
          counter++;
        })
        return { number: counter }
      }
    });
});

exports.addHomeNotification = functions.database.ref('/app/stockManagement/{apartment}/items/{item}')
  .onCreate((snapshot, context) => {

    const missingItem = snapshot.val();
    const apartment = context.params.apartment;

    const ref = admin.database().ref('/app/homeNotifications/' + apartment).push();
    ref.set({
      description: missingItem.name,
      member: missingItem.member,
      type: "MissingItem",
      timestamp: missingItem.timestamp
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