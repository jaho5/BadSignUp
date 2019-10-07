import React, {useState, useEffect} from 'react';
import './Court.css';
import Queue from './Queue';
import PlayerContext from '../App';

export default function Court({className, courtNum, sendData}) {
  
  const [players, setPlayers] = useState(["jason","sunny","kenneth"]);
  

  // useEffect(()=>{
  //   console.log(players);
  //   // sendData(players)
  // });

  const addToQueue = () => {
    if (localStorage.name) {
      const newPlayers = [...players, localStorage.name];
      setPlayers(newPlayers);
      sendData(newPlayers);
    } else {
      console.log('no name');
    }
    //localStorage.removeItem("name");
  }

  const displayCourt = () => {

  }

  return (
    <div className={className}>
      <div onClick={()=>sendData(players)}>Court {courtNum}: </div>
      <Queue players={players} onClick={()=>sendData(players)}/>
      <button onClick={addToQueue}>+</button>
    </div>
  )
}
