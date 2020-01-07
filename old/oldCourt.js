import React, {useState, useEffect} from 'react';
import './Court.css';
import Queue from './Queue';
import { turnOnFirebase, addToCourt, removeFromCourt,removeChallenge } from '../database/dbfunctions';


export default function Court({className, courtNum, sendData, login}) {

  const [players, setPlayers] = useState({});
  const [challenging, setChallenging] = useState(false);
  useEffect(() => {
     turnOnFirebase(courtNum, setPlayers, setChallenging);
  }, []);

  const queueAction = () => {
    removeFromCourt().then(() => {
      if (localStorage.name) {
        // const newPlayers = [...players, localStorage.name];
        addToCourt(courtNum);
        //setPlayers(newPlayers);
        sendData(courtNum);
      } else {
        console.log('no name');
        login('login');
      }
    })
  }

  return (
    <div className={className}>
      <div onClick={()=>sendData(courtNum)}>Court {courtNum}: </div>
      <Queue players={players} onClick={()=>sendData(courtNum)}/>
      { challenging ? 
      <span><button onClick={removeChallenge}>WON</button><button onClick={()=> removeFromCourt().then(addToCourt(courtNum))}>lost</button></span>
      : 
      <button onClick={queueAction}>+</button>}
    </div>
  )
}
