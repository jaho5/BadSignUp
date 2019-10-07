import React, { useState } from 'react';
import './App.css';
import Court from './components/Court';

localStorage.setItem("name", "Smith");


function App() {

  const [viewCourt, setViewCourt] = useState(false);
  const [courtPlayers, setCourtPlayers] = useState([]);
  
  const showCourtView = (courtData) => {
    setViewCourt(true);
    setCourtPlayers(courtData);
    console.log(courtData);
  }
  
  return (
    <div className="grid-container">

      <div className="header">
        BadSignUp
      </div>
      
      <div className="courts">
        <Court className="court-1" courtNum="1" sendData={showCourtView}/>
        <Court className="court-2" courtNum="2" sendData={showCourtView}/>
        <Court className="court-3" courtNum="3" sendData={showCourtView}/>
        <Court className="court-4" courtNum="4" sendData={showCourtView}/>
        <Court className="court-5" courtNum="5" sendData={showCourtView}/>
        <Court className="court-6" courtNum="6" sendData={showCourtView}/>
      </div>
      
      <div className="court-view" style={{visibility:viewCourt?'visible':'hidden'}}>
        <h1>Court</h1>
        {courtPlayers.map((player, i) => (
          <div key={i}>{i+1}. {player}</div>
        ))}
      </div>
    </div>
  );
}


export default App;
