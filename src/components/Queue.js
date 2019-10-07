import React, {useState} from 'react'

export default function Queue({players, onClick}) {

  return (
    <div onClick={onClick}>
      {players.slice(0,4).map((player,i) => (
        <div key={i}>{i+1}. {player}</div>
      ))}
    </div>  
  )
}
