import React, { Component } from 'react';
import './App.css';
import Court from './components/Court';

//localStorage.setItem("lastname", "Smith");

function showCourtView (courtData) {
  console.log(courtData);
}

class App extends Component {

  
  render() {
    return (
      <div className="grid-container">
        
        <div className="courts">
          
          <Court className="court-1" courtNum="1" sendData={showCourtView}/>
          <Court className="court-2" courtNum="2"/>
          <Court className="court-3" courtNum="3"/>
          <Court className="court-4" courtNum="4"/>
          <Court className="court-5" courtNum="5"/>
          <Court className="court-6" courtNum="6"/>
        </div>
        
        <div className="court-view"></div>
      </div>
    );
  }
}

export default App;
