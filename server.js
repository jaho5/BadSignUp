const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

import {Queue} from './queueds';

// let courts=[[],[],[],[],[],[]];
let courts=[];
for(let i=0; i<6; i++) {
    courts.push(new Queue());
}

let courtChanges=[0,0,0,0,0,0];
let courtTimers=[];

function findID(courtNum, challengerNum) {
    return courts[courtNum-1].q[challengerNum-1].id
    // return new Promise(function(resolve, reject) {
    //     resolve(courts[courtNum-1].list()[challengerNum-1].id);
    //     reject('not found');
    // });
}

function challengeUpdate(courtNum, id, won) {
    let removeId;
    if(!won) {
        removeId=id
        // person = courts[courtNum-1].remove(id);
    } else {
        if(id === findID(courtNum, 1)) {
            // person = 
            removeId=findID(courtNum, 2);
            // console.log(courts[courtNum-1].remove(findID(courtNum, 2)));

        } else {
            removeId=findID(courtNum,1)
            // person = courts[courtNum-1].remove(findID(courtNum,1));

        }
    }

    courts[courtNum-1].remove(removeId)
        .then(person => courts[courtNum-1].push(person))
        .then(()=>io.emit(`court${courtNum}`, courts[courtNum-1].list()))
        .catch(error => console.log('nothing removed'))
    // courts[courtNum-1].push(person);
}

function timerUpdate(courtNum) {
    //remove first guy from court
    courts[courtNum-1].moveFrontToBack();
    io.emit(`court${courtNum}`, courts[courtNum-1].list());

    //stop timer if ticked 12 times
    courtChanges[courtNum-1]+=1;
    if(courtChanges[courtNum-1]>=12) {
        clearInterval(courtTimers[courtNum-1]);
    }
}

app.post('/timer/:n', (req, res) => {
    const courtNum = req.params.n;
    if (courtTimers[req.params.n-1]===undefined) courtTimers[req.params.n-1]=setInterval(()=>timerUpdate(courtNum),10000);
    res.send(`Started timer at: ${courtNum}`);
});

app.delete('/timer/:n', (req, res) => {
    const courtNum = req.params.n;
    clearInterval(courtTimers[courtNum-1]);
    console.log(courtNum, 'cleared');
});

app.get(`/court/:n`, (req, res) => {
    res.send(courts[req.params.n-1].list());
});

app.get(`/challenge/:n`, (req,res) => {
    let q = courts[req.params.n-1]
    let challenge = false;
    if (q.q.length > 1) {
        challenge = req.query.id == q.q[0].id || req.query.id == q.q[1].id
    }
        // || req.query.id == q.q[1].id;
    res.send(challenge);
});

let playerDatabase = {}

io.on('connection', (socket) => {

    console.log('a connection!')
    socket.on('add', addInfo => {
        //add to queue
        if (addInfo.playerInfo.courtNum) courts[addInfo.playerInfo.courtNum-1].remove(addInfo.playerInfo.id).catch(err => console.log('dont worry'))
        courts[addInfo.courtNum-1].push(addInfo.playerInfo)

        //emit new lists
        if (addInfo.playerInfo.courtNum) io.emit(`court${addInfo.playerInfo.courtNum}`, courts[addInfo.playerInfo.courtNum-1].list());
        io.emit(`court${addInfo.courtNum}`, courts[addInfo.courtNum-1].list());

    });

    socket.on('challenge', challengeInfo => {
        challengeUpdate(challengeInfo.courtNum, challengeInfo.id, challengeInfo.won);
    });

    socket.on('partner', playerInfo => {
        partners[playerInfo.id]=playerInfo.partner;
        console.log(partners)
    });
});

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}`));
