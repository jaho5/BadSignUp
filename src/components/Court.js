import React, {useState, useEffect} from 'react';
import './Court.css';
import Queue from './Queue';
import { addToDb, getCourtPlayers } from '../database/dbfunctions';

export default function Court({className, courtNum, sendData}) {
  
  const [players, setPlayers] = useState([]);

  //getCourtPlayers(courtNum,setPlayers);
  // useEffect(() => {
  //   console.log(players);
  // })

  const queueAction = () => {
    if (localStorage.name) {
      const newPlayers = [...players, localStorage.name];
      addToDb(`court-${courtNum}`,newPlayers);
      setPlayers(newPlayers);
      sendData(courtNum);
    } else {
      console.log('no name');
    }
    //localStorage.removeItem("name");
  }

  return (
    <div className={className}>
      <div onClick={()=>sendData(courtNum)}>Court {courtNum}: </div>
      <Queue players={players} onClick={()=>sendData(courtNum)}/>
      <button onClick={queueAction}>+</button>
    </div>
  )
}
