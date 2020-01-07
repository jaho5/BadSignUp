import React from 'react'
import '../App.css'

export default function Queue({players, onClick}) {
  return (
    <div onClick={onClick}>
      {/* {players.slice(0,3).map((player,i) => (
        <div key={i}>{i+1}. {player.name}</div>
      ))} */}
      {Object.keys(players).slice(0,3).map((key,index) => (
        <div key={index}>{players[key].name}</div>
      ))}
    </div>  
  )
}
