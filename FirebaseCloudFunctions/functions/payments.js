const admin = require('firebase-admin');
const functions = require("firebase-functions");


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
  


//adds a new payment
//updates the debt of the user that adds the payment
//TODO ERROR HANDLING 
exports.newPayment = functions.https.onCall((data, context) => {
    var description = data.description;
    var amount = data.amount;
    var currentUserUid = context.auth.uid;
    var apartmentName = data.apartment;
  
    //update debts
    admin.database()
      .ref('/app/payments/' + apartmentName + '/debts/').get().then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //aggiorno i debiti dellutente che ha inserito il payment
          if(childSnapshot.key === currentUserUid) {
            childSnapshot.forEach((child_ChildSnapshot) => {
              previousDebt = child_ChildSnapshot.val().amount;
              newDebt = previousDebt + amount;
              admin.database()
                .ref('/app/payments/' + apartmentName + '/debts/' + childSnapshot.key + '/' + child_ChildSnapshot.key).update({
                  amount: newDebt
                });
            })
          } else {
            //aggiorno i debiti degli altri utenti verso l'utente che ha inserito il payment
            console.log(childSnapshot.key);
            console.log(childSnapshot.val());
  
            var previousDebt;
            childSnapshot.forEach((child) => {
              if (child.key === currentUserUid) {
                previousDebt = child.val().amount;
              }
            })
  
            newDebt = parseInt(previousDebt, 10) - amount;
            admin.database()
              .ref('/app/payments/' + apartmentName + '/debts/' + childSnapshot.key + '/' + currentUserUid).update({
                amount: newDebt
              });
          }
        })
      })
  
    //register the payment
    const ref = admin.database().ref('/app/payments/' + apartmentName + '/payments').push();
    ref.set({
      member: currentUserUid,
      description: description,
      amount: amount,
      timestamp: Date.now()
    })
  
  
  });
  
  //update debts following a pay off 
  //TODO ERROR HANDLING 
  exports.newPayOff = functions.https.onCall((data, context) => {
    var description = data.description;
    var amount = data.amount;
    var currentUserUid = context.auth.uid;
    var apartmentName = data.apartment;
    //member (uid) that has received money from the current user
    var memberUid = data.member;
    var previousDebt;
    var newDebt;
  
    //update debts
    admin.database()
      .ref('/app/payments/' + apartmentName + '/debts/').get().then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
  
          //aggiorno i debiti dellutente che ha pagato il debito
          if (childSnapshot.key === currentUserUid) {
            childSnapshot.forEach((child) => {
              if (child.key === memberUid) {
                previousDebt = child.val().amount;
              }
            })
            newDebt = parseInt(previousDebt, 10) + amount;
            admin.database()
              .ref('/app/payments/' + apartmentName + '/debts/' + childSnapshot.key + '/' + memberUid).update({
                amount: newDebt
              });
          }
  
          //aggiorno i debiti dell'utente che ha ricevuto il danaro
          if (childSnapshot.key === memberUid) {
            childSnapshot.forEach((child) => {
              if (child.key === currentUserUid) {
                previousDebt = child.val().amount;
              }
            })
            newDebt = parseInt(previousDebt, 10) - amount;
            admin.database()
              .ref('/app/payments/' + apartmentName + '/debts/' + childSnapshot.key + '/' + currentUserUid).update({
                amount: newDebt
              });
          }
        })
      });
  
    //register the payoff
    const ref = admin.database().ref('/app/payments/' + apartmentName + '/payOffs').push();
    ref.set({
      from: currentUserUid,
      to: memberUid,
      description: description,
      amount: amount,
      timestamp: Date.now()
    })
  });
  