import Firebase from "../components/Firebase";

let firebase = new Firebase();

function getPlayerCourtIndex(courtNum) {
  return firebase.db.ref(`court-${courtNum}`).once('value').then(function(snapshot) {
    let key = null;
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.val().pid === localStorage.pid) {
        key = childSnapshot.key;
        return true;
      }
    });
    return key;
  });
}

function getCourtNum() {
  return firebase.db.ref(`users/${localStorage.pid}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

function removeFromCourt() {
  return getCourtNum().then(courtNum => {
    return getPlayerCourtIndex(courtNum).then(index => {
      return firebase.db.ref(`court-${courtNum}/${index}`).remove();
    });
  });
}
    
function getChallengerIndex(courtNum) {
  return firebase.db.ref(`court-${courtNum}`).once('value').then(function(snapshot) {
    let key = null;
    let i=0;
    snapshot.forEach(function(childSnapshot) {
      if(!(childSnapshot.val().pid === localStorage.pid)) {
        key = childSnapshot.key;
      }
      i+=1
      if(i==2) {
        return true;
      }
    });
    return key;
  });  
}

function removeChallenge() {
  getCourtNum().then(courtNum => {
    getChallengerIndex(courtNum).then(index => {
        firebase.db.ref(`court-${courtNum}/${index}`).remove();        
    })
  });    

}

function addToCourt(courtNum) {
  firebase.db.ref(`court-${courtNum}`).once('value').then((snapshot) => {
    if(snapshot.val()) {
      firebase.db.ref(`court-${courtNum}`).set([...(snapshot.val().filter(item=>item!=null)), {pid: localStorage.pid, name:`${localStorage.name}|${sessionStorage.partner}`}]);
    } else {
      fetch(`/timer/${courtNum}`,{method:'put'});
      if(courtNum !== 1 && courtNum !== 2) {
        fetch(`/timer/${courtNum}`,{method:'post'});
      }
      firebase.db.ref(`court-${courtNum}`).set([ {pid: localStorage.pid, name:`${localStorage.name}|${sessionStorage.partner}`} ]);
    }
  });
  firebase.db.ref(`users/${localStorage.pid}`).set(courtNum);
}

function addToDb(path, item) {
  firebase.db.ref(path).set(item);
}

function addUser(user) {
  firebase.db.ref(`users/${user.pid}`).once('value', (snapshot) => {
    if(!snapshot.exists()) {
      firebase.db.ref(`users/${user.pid}`).set(0);
    }
  });
  
}

function removeFromDb(path) {
  firebase.db.ref(path).remove();
}

function clearCourt(n) {
  firebase.db.ref(`court-${n}`).set([]);
}

function checkChallengers() {
  return getCourtNum().then(courtNum => {
    if(courtNum===1 || courtNum==2) {
      return getPlayerCourtIndex(courtNum).then(index => {
        // console.log(index)
        if(index==0 || index==1) {
          return true
        } else {
          return false
        }
      })
    } else {
      return false
    }
  })
}

function challengeCourt() {
  
}

function turnOnFirebase (courtNum, setFunc, challenging) {
  firebase.db.ref(`court-${courtNum}`).on('value', function(snapshot) {
    let data = snapshot.val();
    getCourtNum().then( cn => {
      if( (courtNum===1 || courtNum===2)) {
        checkChallengers().then(playingChallenge => {
          challenging(playingChallenge && cn===courtNum)
        })
      }
      if(data) {
        setFunc(data);
      } else {
        setFunc([]);
      }
    })
    
  });;
}

export {turnOnFirebase, addToDb, removeFromDb, addUser, clearCourt, getPlayerCourtIndex, addToCourt, removeFromCourt, removeChallenge};