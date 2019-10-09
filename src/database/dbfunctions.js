import Firebase from "../components/Firebase";

let firebase = new Firebase();

function addToDb(path, item) {
  firebase.db.ref(path).set(item);
}

function addUser(user) {
  firebase.db.ref('users').once('value').then(function(snapshot) {
    if(snapshot.val()) {
      firebase.db.ref('users').set([...snapshot.val(), user]);
    } else {
      firebase.db.ref('users').set([user]);
    }
  });
}

function removeFromDb(path) {
  firebase.db.ref(path).remove();
}

function clearCourt(n) {
  firebase.db.ref(`court-${n}`).set([]);
}

function turnOnFirebase (courtNum, setFunc) {
  firebase.db.ref(`court-${courtNum}`).on('value', function(snapshot) {
    let data = snapshot.val();
    console.log(data);
    if(data) {
      setFunc(data);
    } else {
      setFunc([]);
    }
  });;
}


export {turnOnFirebase, addToDb, removeFromDb, addUser, clearCourt};