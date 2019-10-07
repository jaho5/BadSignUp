import React, { Component } from 'react';
import './App.css';
import Court from './components/Court';

localStorage.setItem("name", "Smith");


class App extends Component {
  
  showCourtView = (courtData) => {
    console.log(courtData);
  }
  
  render() {
    return (
      <div className="grid-container">
        
        <div className="courts">
          
          <Court className="court-1" courtNum="1" sendData={this.showCourtView}/>
          <Court className="court-2" courtNum="2" sendData={this.showCourtView}/>
          <Court className="court-3" courtNum="3" sendData={this.showCourtView}/>
          <Court className="court-4" courtNum="4" sendData={this.showCourtView}/>
          <Court className="court-5" courtNum="5" sendData={this.showCourtView}/>
          <Court className="court-6" courtNum="6" sendData={this.showCourtView}/>
        </div>
        
        <div className="court-view"></div>
      </div>
    );
  }
}

export default App;
