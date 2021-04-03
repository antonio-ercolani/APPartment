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
  const ref = admin.database().ref('/app/stockManagement/' + apartment + '/removals').push();
  ref.set({
    member: context.auth.uid,
    items: names.join(', '),
    timestamp: Date.now()
  })

})