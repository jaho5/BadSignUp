import React, { useState, useEffect } from 'react';
import './App.css';
import Court from './components/Court';
// import { FirebaseContext } from './components/Firebase';
import { turnOnFirebase, removeFromDb, addUser, clearCourt } from './database/dbfunctions';
import Login from './components/Login';

function App() {
  //removeFromDb('/');
  const [viewCourt, setViewCourt] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [courtPlayers, setCourtPlayers] = useState([]);

  const showCourtView = (courtNum) => {
    setViewCourt(true);
    turnOnFirebase(courtNum, setCourtPlayers);
  }
  
  const setLogin = (e) => {
    if (e) e.preventDefault();
    setShowLogin(!showLogin);
  }

  useEffect(() => {
    if(localStorage.pid) {
      console.log(localStorage.pid);
      addUser(localStorage.pid);
    }
  }, [])

  const courts = [];

  for(let i=1; i<7; i++) {
    courts.push(<Court key={i} className={`court-${i}`} courtNum={i} sendData={showCourtView} login={setLogin}/>);
  }

  const clearCourts = () => {
    for(let i=1;i<7;i++) {
      clearCourt(i);
    }
  }

  return (
      <div className="grid-container">
        <Login show={showLogin} close={setLogin}/>
        <div className="header">
          BadSignUp
          <button onClick={setLogin}>login</button>
        </div>
        
        <div className="courts">
          {courts}
        </div>
        
        <div className="court-view" style={{visibility:viewCourt?'visible':'hidden'}}>
          <h1>Court</h1>
          {courtPlayers.map((player, i) => (
            <div key={i}>{i+1}. {player}</div>
          ))}
        </div>
        <button onClick={clearCourts}>Clear Courts</button>
      </div>
  );
}


export default App;
