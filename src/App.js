import React, { useState, useEffect } from 'react';
import './App.css';
import Court from './components/Court';
import Form from './components/Form.js';
import {socketHandler} from './clientsocket';

function App() {

  const courts = [];
  const [display, setDisplay] = useState();
  const [players, setPlayers] = useState([]);

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('name')!==null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPartner, setShowPartner] = useState(false);

  function updateCourtView(courtNum) {
    setDisplay(courtNum);
    socketHandler.changeDisplay(courtNum, setPlayers);
    fetch(`/court/${courtNum}`)
    .then(res => res.json())
    .then(playerList => setPlayers([...playerList]));
  }

  for(let i=1; i<7; i++) {
    courts.push(<Court key={i} 
                       className={`court-${i}`} 
                       courtNum={i} 
                       onClick={()=>updateCourtView(i)}
                       login={setShowLogin}
                />);
  }

  return (
    <div>
      <Form title='Login'
            inputs={['Name','PID','Partner']}
            req={new Set(['Name','PID'])}
            setFunc={{Name:n=>{
                        localStorage.setItem('name',n)
                        if(n) setLoggedIn(true);
                      },
                      PID:id=>localStorage.setItem('pid',id), 
                      Partner:p=>{
                        socketHandler.socket.emit('partner', {
                          id: localStorage.pid || 0,
                          courtNum: localStorage.courtNum,
                          partner: p
                        });
                        localStorage.setItem('partner',p)
                      }
                    }}
            show={showLogin}
            setShow={setShowLogin}
            />
        <Form title='Change Partner'
              inputs={['Partner']}
              setFunc={{Partner:p=> {
                  socketHandler.socket.emit('partner', {
                    id: localStorage.pid || 0,
                    courtNum: localStorage.courtNum,
                    partner: p
                  });
                  localStorage.setItem('partner',p)
                }
              }}
              show={showPartner}
              setShow={setShowPartner}
        />
      <div className="grid-container">
        <div className="header">
          BadSignUp
          <a style={{float:'right'}} onClick={()=>{
            if(loggedIn) {
                localStorage.clear()
                setLoggedIn(false)
              } else {
                setShowLogin(true)
              }
            }}>
            {!loggedIn?'Login':'Logout'}
          </a>
          {localStorage.getItem('name') && 
            <a style={{float:'right'}} 
               onClick={()=>setShowPartner(!showPartner)}>Partner </a>
          }
        </div>
        
        <div className="courts">
          {courts}
        </div>
        
        <div className="court-view">
          <h1>Court {display}</h1>
          <div className='courtview-items'>
          {players.map((player, index) => (
            <div key={index}>{index+1}. {player}</div>
          ))}
          </div>
        </div>
        <button>Clear Courts</button>
      </div>
    </div>
  );
}


export default App;
