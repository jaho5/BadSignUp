import React, {useState, useEffect} from 'react';
import './Court.css';
import Queue from './Queue';

export default function Court({className, courtNum, sendData}) {
  
  const [players, setPlayers] = useState(["jason","sunny","kenneth"]);
  
  useEffect(()=>{
    console.log("hello");
  });

  const addToQueue = () => {
    // localStorage.removeItem("lastname");
    if (localStorage.lastname) {
      const newPlayers = [...players, localStorage.lastname];
      setPlayers(newPlayers);
    } else {
      console.log('no lastname');
    }
  }

  const displayCourt = () => {

  }

  return (
    <div className={className}>
      <div>Court {courtNum}: </div>
      <Queue players={players} onClick={sendData(players)}/>
      <button onClick={addToQueue}>+</button>
    </div>
  )
}
