const express = require('express');
const firebase = require('firebase/app');
require('firebase/database');
require('dotenv').config();

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
db = firebase.database();

let courtChanges=[0,0,0,0,0,0];
let courtTimers=[];

function timerUpdate(courtNum) {
    db.ref(`court-${courtNum}`).once('value').then(function(snapshot) {
        let first = true;
        snapshot.forEach(function(childSnapshot) {
            if(first) {
                db.ref(`court-${courtNum}/${childSnapshot.key}`).remove();
                first=false;
                return true;
            }
        });
    });

    courtChanges[courtNum-1]+=1;
    if(courtChanges[courtNum-1]>=12) {
        clearInterval(courtTimers[courtNum-1]);
    }
}

function populate() {
    for(let i=0;i<6;i++) {
        db.ref(`court-${i+1}`).once('value').then((snapshot) => {
            if(snapshot.val()) {
                db.ref(`court-${i+1}`).set([...(snapshot.val().filter(item=>item!=null)), {pid: Math.random()*20, name: Math.random()*20}]);
            } else {
                db.ref(`court-${i+1}`).set([ {pid: Math.random()*20, name:Math.random()*20} ]);
            }
        });
    }
}

const app = express();

app.post('/timer/:n', (req, res) => {
    const courtNum = req.params.n;
    courtTimers[req.params.n-1]=setInterval(()=>timerUpdate(courtNum),10000);
    res.send(`Started timer at: ${courtNum}`);
});

app.put('/timer/:n', (req, res) => {
    const courtNum = req.params.n;
    clearInterval(courtTimers[courtNum-1]);
    console.log(courtNum, 'cleared');
});

app.post('/populate', (req,res) => {
    populate();
    res.send('populating');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));