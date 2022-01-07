const admin = require('firebase-admin');
const functions = require("firebase-functions");

exports.newMissingItem= functions.https.onCall((data, context) => {

  var currentUserUid = context.auth.uid;
  var apartment = data.apartment;
  var itemName = data.item;

  if (!(this.verifyInputItem(itemName, apartment))) return;

  var eventKey = admin.database()
  .ref('/app/stockManagement/' + apartment + "/items/").push().key;

  admin.database().ref('/app/stockManagement/' + apartment + '/items/' + eventKey).
  set({
    member: currentUserUid,
    name: itemName,
    timestamp: Date.now()
  }).then(() => {
    return {text: "ok"}
  })
});


exports.removeItems = functions.https.onCall  ((data, context) => {
  var apartment = data.apartment;
  var removedItems = data.removedItems;
  const names = [];

  if (!(this.verifyInputItem(removedItems, apartment))) return;

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
      let counter = 0;
      if (snapshot.exists()) {
        snapshot.forEach(() => {
          counter++;
        })
      }
      return { number: counter }
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

  exports.verifyInputItem = function(item, apartment) { 
    
    if (item === undefined || item === null || item === "") return false;
    if (apartment === undefined || apartment === null || apartment === "") return false;
    
    if (!(typeof item === 'string' || item instanceof String)) return false;
    if (!(typeof apartment === 'string' || apartment instanceof String)) return false;

    return true;
    
  };