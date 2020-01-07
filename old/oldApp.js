import React, { useState, useEffect } from 'react';
import './App.css';
import Court from './components/Court';
// import { FirebaseContext } from './components/Firebase';
import { turnOnFirebase, clearCourt } from './database/dbfunctions';
import Login from './components/Login';

function PartnerForm({className, show, close}) {
  const [partner, setPartner] = useState('');

  const changePartner = e => {
    e.preventDefault();
    sessionStorage.setItem('partner', partner);
    close();
  }

  if(show!=='partner') {
    return null;
  }

  return (
    <form className={className} onSubmit={changePartner}>
      <input type='text' onChange={e=>setPartner(e.target.value)}></input>
      <input type='submit'></input>
    </form>
  )
}

function App() {
  //removeFromDb('/');
  const [viewCourt, setViewCourt] = useState(0);
  const [modal, setModal] = useState('');
  const [courtPlayers, setCourtPlayers] = useState([]);

  const showCourtView = (courtNum) => {
    setViewCourt(courtNum);
    turnOnFirebase(courtNum, setCourtPlayers, ()=>{});
  }
  
  const setLogin = (modalType) => {
    setModal(modalType);
  }

  const closeModal = e => {
    if (e) e.preventDefault();
    setModal('');
  }

  useEffect(() => {
    if(localStorage.pid) {
      // addUser(localStorage.pid);
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

  const changePartner = () => {
  }

  const timertest = () => {
    console.log('test');
  }

  return (
    <div style={{visibility:!modal?'visible':'hidden'}}>
      <PartnerForm className='login-modal' show={modal} close={closeModal}/>
      <Login className="login-modal" show={modal} close={closeModal}/>
      <div className="grid-container">
        <div className="header">
          BadSignUp
          <button onClick={()=>setLogin('login')}>{modal !== 'login' ? 'login' : 'logout'}</button>
          <button onClick={()=>setLogin('partner')}>Change Partner</button>
        </div>
        
        <div className="courts">
          {courts}
        </div>
        
        <div className="court-view" style={{visibility:viewCourt>0?'visible':'hidden'}}>
          <h1>Court {viewCourt}</h1>
          {courtPlayers.filter(p=>p!=null).map((player, i) => (
            <div key={i}>{i+1}. {player.name}</div>
          ))}
        </div>
        <button onClick={clearCourts}>Clear Courts</button>
      </div>
    </div>
  );
}


export default App;
