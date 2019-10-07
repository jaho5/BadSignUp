import React, {useState, useEffect} from 'react';
import './Court.css';
import Queue from './Queue';

export default function Court({className, courtNum, sendData}) {
  
  const [players, setPlayers] = useState(["jason","sunny","kenneth"]);
  
  useEffect(()=>{
    console.log("hello");
  });

  const addToQueue = () => {
    if (localStorage.name) {
      const newPlayers = [...players, localStorage.name];
      setPlayers(newPlayers);
    } else {
      console.log('no name');
    }
    //localStorage.removeItem("name");
  }

  const displayCourt = () => {

  }

  return (
    <div className={className}>
      <div >Court {courtNum}: </div>
      <Queue players={players} onClick={()=>sendData(players)}/>
      <button onClick={addToQueue}>+</button>
    </div>
  )
}
