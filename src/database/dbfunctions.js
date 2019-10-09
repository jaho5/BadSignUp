import Firebase from "../components/Firebase";

let firebase = new Firebase();

function addToDb(path, item) {
  firebase.db.ref(path).set(item);
}

function removeFromDb(path) {
  firebase.db.ref(path).remove();
}

function getCourtPlayers(courtNum,setFunc) {
  let data;
  firebase.db.ref(`court-${courtNum}`).on('value', function(snapshot) {
    data = snapshot.val();
    console.log(data);
    setFunc(data);
  });;
  return data;
}

export {addToDb, removeFromDb, getCourtPlayers};