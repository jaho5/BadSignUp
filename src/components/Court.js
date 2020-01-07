import React, {useState, useEffect} from 'react';
import './Court.css';
import socketIOClient from "socket.io-client";

const socket = socketIOClient('localhost:5000/');

export default function Court({className, courtNum, onClick, login}) {


  const [players, setPlayers] = useState([]);
  const [challenging, setChallenging] = useState(false);

  useEffect(()=>{

    fetch(`/court/${courtNum}`)
      .then(res => res.json())
      .then(playerList => setPlayers(playerList));

    socket.on(`court${courtNum}`, playerList => {
      setPlayers(playerList)
    });
    
  },[])

  useEffect(() => {
    fetch(`/challenge/${courtNum}?id=${localStorage.pid || 0}`)
      .then(res => res.json())
      .then(challenge => setChallenging(challenge));
  },[players]);
      
  const queueAction = () => {

    if(!localStorage.name) {
      login(true)
    } else {
      socket.emit('add', {
        courtNum: courtNum, 
        playerInfo: {
          id:localStorage.pid || 0, 
          name:localStorage.name || 'Name not set',
          courtNum: localStorage.courtNum
        }
      });
      localStorage.setItem('courtNum',courtNum);
  
      if(courtNum>2) {
        fetch(`/timer/${courtNum}`, {method: 'POST'});
      }
    }

  }

  const challengeUpdate = (won) => {
    socket.emit('challenge', {
      courtNum: courtNum,
      id: localStorage.pid || 0,
      won: won
    });
  }

  return (
    <div className={className} onClick={onClick}>
      <div className='court-title'>Court {courtNum} </div>
      {/* <Queue players={players} onClick={()=>sendData(courtNum)}/> */}
      <div>
      {players.slice(0,2).map((player,index) => (
        <div key={index}>{player}</div>
      ))}
      {players.length>2 && <div>... and {players.length-2} more.</div>}
      </div>
      {(localStorage.courtNum==1 || localStorage.courtNum==2) && challenging
      ?<div className='queue-button'><button className='pure-button challenge-button' onClick={()=>challengeUpdate(true)}>Won</button> <button className='pure-button challenge-button' style={{float:'right'}} onClick={()=>challengeUpdate(false)}>Lost</button></div>
      :<button className='pure-button' onClick={queueAction}>+</button>}
    </div>
  )
}
